// スタート画面のシーン
var startScene = new Phaser.Scene("startScene");

startScene.create = function () {
    // スタートボタン画像を表示する
    this.startButtonImage = this.add.image(400, 300, 'startButton');

    // キーをクリックするとゲームスタート
    this.input.keyboard.on('keydown', function(event) {
        this.scene.start('mainScene');
    }, this);
};
