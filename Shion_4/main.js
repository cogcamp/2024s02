var mainScene = new Phaser.Scene("mainScene");

mainScene.create = function() {
    // 初期設定を実行する
    this.config();
    
    
    // ボール作成
    this.createBall();


    // パドル作成
    this.createPaddle();
    
    // スペースキーのクリックでボール発射
    this.input.keyboard.on('keydown-SPACE', function(event) {
        //ゲーム開始状態ならば
        if (this.paddle.isStart) {
            //ボール発射
            this.ball.setVelocity(this.ballSpeedX, this.ballSpeedY);
            this.paddle.isStart = false;
            var x = 0;
            
            x =this.paddle.x * 19 / 22 + this.paddleSpeed;
            this.paddle.x = Phaser.Math.Clamp(x, 52, 748);
        }
    }, this);
    
    // ブロック作成
    this.createBlocks();
    
    // ライフのテキスト表示
    this.lifeText = this.add.text(30, 460, 'ライフ：' + this.life + '頑張って！', {
        font: '20px Open Sans',
        fill: '#ff0000'
    });
    //テキスト
    this.TEXT = ''
    this.TEXT = this.add.text(30, 20, 'スペースキーでボールを発射　カーソルキーの左右でパドルを動かす' + this.TEXT, {
        font: '20px Open Sans',
        fill: '#ff0000'
    });
};

mainScene.update = function() {
    // ボールがシーンの最下部に到達した
    if (this.ball.y >= this.game.config.height - this.ball.width / 2 * 1.5) {
        this.failToHit();
    }
    
    // キーボードのカーソルオブジェクトを取得
    var cursors = this.input.keyboard.createCursorKeys();
    var x = 0; 
    //右カーソルをクリックすると
    if(cursors.right.isDown) {
        x = this.paddle.x + this.paddleSpeed;
        this.paddle.x = Phaser.Math.Clamp(x, 52, 748);
    }
    //左カーソルをクリックすると
    if(cursors.left.isDown) {
        x = this.paddle.x - this.paddleSpeed;
        this.paddle.x = Phaser.Math.Clamp(x, 52, 748);
    }
    
    //パドルの上にボールが乗っているなら
    if(this.paddle.isStart) {
        this.ball.setPosition(this.paddle.x, 520);
    }
};

mainScene.config = function() {
    // 背景色の設定
    this.cameras.main.setBackgroundColor('#cccccc');
    
    // パドルの移動速度
    this.paddleSpeed = 17;
    
    // ボール発射の加速度
    this.ballSpeedX = 0;
    this.ballSpeedY = -300;
    
    // ライフ
    this.life = 10;
};

mainScene.createBall = function() {
    // ボール作成
    this.ball = this.physics.add.image(400, 500, 'ball1');
    this.ball.setDisplaySize(16.5,16.5);
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
};

mainScene.createPaddle = function() {
     // パドル作成
    this.paddle = this.physics.add.image(400, 550, 'paddle1');
    this.paddle.setDisplaySize(100,15);
    this.paddle.setImmovable();
    this.paddle.isStart = true;
    this.physics.add.collider(this.paddle, this.ball, this.hitPaddle, null, this);
};

mainScene.hitPaddle = function (paddle, ball) {
    // ボールにX方向の角度を設定
    var diff = 0;
    if (ball.x < paddle.x) {
        //ボールがパドルの左側に衝突
        diff = paddle.x - ball.x;
        ball.setVelocityX(-10 * diff);
    } else if (ball.x > paddle.x) {
        //ボールがパドルの右側に衝突
        diff = ball.x -paddle.x;
        ball.setVelocityX(10 * diff);
    } else {
        //x方向の加速度はなし
        ball.setVelocityX(0);
    }
};

mainScene.createBlocks = function() {
    // 横20列、縦13行並べる
    //ブロックの色の配列
    var blockColors = [ 'red1', 'green1', 'yellow1', 'silver1', 'blue1', 'purple1', '', '', 'red1', 'green1', 'yellow1', 'silver1', 'blue1', 'purple1' ];
    
    //物理エンジン対象固定オブジェクトグループ作成
    this.blocks = this.physics.add.staticGroup();
    
    //縦に14行
    for(var i = 0; i < 14; i++) {
        if(i == 6) {
            continue;
        } else if(i == 7) {
            continue;
        }
        //横に22列
        for( var j = 0; j < 22; j++) {
            if(j == 6) {
                continue;
            } else if(j == 7) {
                continue;
            } else if(j == 14) {
                continue;
            } else if(j == 15) {
                continue;
            }
            var color = blockColors[i];
            var block =this.blocks.create(80 + j * 32 * 10 / 11, 80 + i * 16, color);
            block.setOrigin(0,0);
            block.setDisplaySize(32 * 10 / 11, 16);
            block.refreshBody();
        }
    }
    
    this.physics.add.collider(this.ball, this.blocks, this.hitBlock, null, this);
};

mainScene.hitBlock = function (ball, block) {
    // 衝突したブロックを削除
    block.destroy();
    // ブロックの残りを判定
    if (this.blocks.countActive() == 0) {
        // ブロックがなくなると、0.5秒後にゲームクリア
        this.time.addEvent({
            duration: 500,
            callback: this.gameClear,
            loop: false,
            callbackScope: this,
        });
    }
};

mainScene.gameClear = function() {
    // ゲームクリア
    alert("おめでとうございます");
    // スタートシーンに移動
    this.scene.start("startScene");
};

mainScene.failToHit =  function () {
    // ボールを打ち返すことに失敗
    this.ball.setVelocity(0);
    this.paddle.isStart = true;
    // ライフを減らす
    this.life--;
    this.lifeText.text = 'ライフ：' + this.life;
    // ライフが0になると
    if(this.life <= 0) {
        // 0.5秒後にゲームオーバー
        this.time.addEvent({
            duration: 500,
            callback: this.gameOver,
            loop: false,
            callbackScope: this,
        });
    }
};

mainScene.gameOver = function() {
    // ゲームオーバー
    alert("ゲームオーバー");
    // スタートシーンに移動
    this.scene.start("startScene");
};
