
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function () {
    // スタート画像
    this.load.image('startButton', 'assets/images/start.gif');

    // パドル画像
    this.load.image('paddle1','./assets/images/paddle1.png');
    this.load.image('paddle2','./assets/images/paddle2.png');

    // ブロック画像
    this.load.image('red1','./assets/images/red1.png');
    this.load.image('red2','./assets/images/red2.png');
    this.load.image('blue1','./assets/images/blue1.png');
    this.load.image('blue2','./assets/images/blue2.png');
    this.load.image('green1','./assets/images/green1.png');
    this.load.image('green2','./assets/images/green2.png');
    this.load.image('yellow1','./assets/images/yellow1.png');
    this.load.image('yellow2','./assets/images/yellow2.png');
    this.load.image('purple1','./assets/images/purple1.png');
    this.load.image('purple2','./assets/images/purple2.png');
    this.load.image('silver1','./assets/images/silver1.png');
    this.load.image('silver2','./assets/images/silver2.png');
    
    // ボール画像
    this.load.image('ball1','./assets/images/ball1.png');
    this.load.image('ball2','./assets/images/ball2.png');
};

loadScene.create = function() {
    // スタートシーンを自動的に開始します
    this.scene.start("startScene");
};
