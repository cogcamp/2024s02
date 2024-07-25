// 画像読込のシーン
var loadScene = new Phaser.Scene("loadScene");

loadScene.preload = function() {
    // スタート画像
    this.load.image('gamestart', 'assets/images/gamestart.gif');
    // ゲームオーバー画像
    this.load.image('gameover', 'assets/images/gameover.png');
    // マップデータ
    this.load.tilemapTiledJSON('map', 'assets/data/map1.json');
    // マップ画像
    this.load.spritesheet('tiles', 'assets/images/tiles.png', {frameWidth: 70, frameHeight: 70});
    // コイン画像
    this.load.image('coin', 'assets/images/coin.png');
    // プレイヤーデータ
    this.load.atlas('player1', 'assets/images/player1.png', 'assets/data/player.json');
    this.load.atlas('player2', 'assets/images/player2.png', 'assets/data/player.json');
    this.load.atlas('player3', 'assets/images/player3.png', 'assets/data/player.json');
    this.load.atlas('player4', 'assets/images/player4.png', 'assets/data/player.json');
    this.load.atlas('player5', 'assets/images/player5.png', 'assets/data/player.json');
    // 敵画像
    this.load.image('enemy01', 'assets/images/enemy01.png');
    this.load.image('enemy02', 'assets/images/enemy02.png');
    this.load.image('enemy05', 'assets/images/enemy05.png');
    this.load.image('enemy07', 'assets/images/enemy07.png');
    this.load.image('enemy08', 'assets/images/enemy08.png');
    // ファイヤ画像
    this.load.image('fire', 'assets/images/fire.png');
};

loadScene.create = function() {
    // 読み込み完了後にstartSceneを起動
    this.scene.start("startScene");
};
