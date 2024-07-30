var mainScene = new Phaser.Scene("mainScene");

// 初期設定
mainScene.config = function() {
    // プレイヤーの動く速度
    this.runSpeed = 300;
    // プレイヤーのジャンプパワー
    this.jumpPower = 500;
    // プレイヤーの画像
    this.playerImage = "player1";
    // ゲームオーバーフラグ
    this.isGameOver = false;
    // スコアの初期値
    this.score = 0;
    // 敵の配列
    this.enemyData = ['enemy01','enemy02','enemy05','enemy07','enemy08'];
    // 敵のスピードを設定する配列
    this.enemySpeed = [-100,-50,50,100];
    // カーソルを取得する
    this.cursors = this.input.keyboard.createCursorKeys();
};

mainScene.create = function () {
    // 初期設定
    this.config();
    
    // 背景色の設定
    this.cameras.main.setBackgroundColor('#99CCFF');
    
    // マップ表示
    this.createMap();
    
    // プレイヤー作成
    this.createPlayer();
    
    // UI作成
    
    
    // コイン作成
    
    
    // 敵作成
    
    
    // ファイヤーグループ作成
    
    
    // スペースキーでファイヤ発射
    this.input.keyboard.on('keydown-SPACE', function() {
        // ファイヤー発射
        this.shoot();
    }, this);
};

mainScene.update = function() {
    if(this.isGameOver) {
        return false;
    }
    
    
    
};

// マップ表示
mainScene.createMap = function() {
    // JSON形式のマップデータの読み込み　Tilemapオブジェクトの作成
    this.map = this.make.tilemap({key: 'map'});

    // タイル画像をマップデータに反映する　Tilesetオブジェクトの作成
    var groundTiles = this.map.addTilesetImage('tiles');
    // 地面レイヤー作成 DynamicTilemapLayerオブジェクト作成
    this.groundLayer = this.map.createDynamicLayer('World', groundTiles, 0, 0);
    
    // 衝突判定から除外したいタイルのインデックスを配列で指定する
    // -1は空のタイルなので衝突しない。それ以外は衝突する
    this.groundLayer.setCollisionByExclusion([-1]);

    // ゲームワールドの幅と高さの設定
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;

    // カメラの表示サイズの設定をする。マップのサイズがカメラの表示サイズ
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
};

mainScene.createPlayer = function() {
    // プレイヤースプライトの表示
    this.player = this.physics.add.sprite(50, 100, this.playerImage);
    
    // 衝突サイズの調整
    this.player.body.setSize(20,25);
    
    // プレイヤーのサイズ変更
    this.player.setDisplaySize(70,70);
    
    // プレイヤーの方向
    this.player.direction = 'right';
    
    // プレイヤーの衝突時のバウンス設定
    this.player.setBounce(0);
    // プレイヤーがゲームワールドの外に出ないように衝突させる
    this.player.setCollideWorldBounds(true);
    // プレイヤーが地面レイヤーと衝突する設定
    this.physics.add.collider(this.player, this.groundLayer);

    // プレイヤーの歩行アニメーション
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames(this.playerImage, {prefix: 'sprite', start: 7, end: 9}),
        frameRate: 10,
        repeat: -1
    });
    // プレイヤーの正面を向く状態のアニメーション
    this.anims.create({
        key: 'turn',
        frames: [{key: this.playerImage, frame: 'sprite1'}],
        frameRate: 10,
    });

    // カメラはプレイヤーを追跡する。プレイヤーの移動に合わせて、カメラが表示が移動する
    this.cameras.main.startFollow(this.player);
};

mainScene.createUI = function() {
    // 画面右上にスコアを表示する
    
    
    
};

mainScene.createCoin = function() {
    // コイン画像の読み込み
    
    
    
};

mainScene.collectCoin = function(sprite, tile) {
    // プレイヤーがコインに衝突
    
    
    
};

mainScene.createEnemyGroup = function() {
    // 敵グループ作成
    this.enemies = this.physics.add.group();
    // 敵はマップと衝突する
    this.physics.add.collider(this.enemies, this.groundLayer);
    // 敵はプレイヤーと衝突する
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    // 1秒ごとに、新しい敵を作成する
    this.enemyTimer = this.time.addEvent({
      delay: 1000,
      callback: this.createEnemy,
      loop: true,
      callbackScope: this
    });
};

mainScene.createEnemy = function() {
    // 敵を作成
    
    
    
};

mainScene.hitEnemy = function(player, enemy) {
    // プレイヤーが敵に衝突
    
    
    
};

mainScene.createFireGroup = function() {
    // プレイヤーの攻撃用ファイヤーグループ作成
    this.fireGroup = this.physics.add.group();
    this.physics.add.overlap(this.enemies, this.fireGroup,this.hitFire, null, this);
    this.physics.add.collider(this.fireGroup, this.groundLayer, this.hitFireGround, null, this);
};

mainScene.shoot = function() {
    // ファイヤーの作成
    
    
    
};

mainScene.hitFire = function(enemy, fire) {
    // ファイヤーと敵が衝突
    
    
    
};

mainScene.hitFireGround = function(fire, ground) {
    // ファイヤーと地面が衝突
    // ファイヤーの削除
    fire.destroy();
};

mainScene.gameOver = function() {
    // ゲームオーバー画面を表示
    var cameraPositionX = this.cameras.main.midPoint.x;
    var cameraPositionY = this.cameras.main.midPoint.y;
    var gameover = this.add.image(cameraPositionX, cameraPositionY, 'gameover');
    gameover.setDisplaySize(500,400);
    
    // クリックするとスタート画面に移動
    this.input.keyboard.on('keydown', function(event) {
        this.scene.start('startScene');
    }, this);
};
