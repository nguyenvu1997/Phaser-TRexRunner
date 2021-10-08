const formatScore = (text, score) => {
    return `${text}: ${score}`;
};
export class Score extends Phaser.GameObjects.Text {
    constructor(scene, x, y, score, text) {
        const style = { fontSize: '32px', fill: '#000' };
        super(scene, x, y, formatScore(text, score), style);
        this.scene = scene;
        this.score = score;
        this.scene.add.existing(this);
    }
    update(text) {
        this.score += 1;
        this.setText(formatScore(text, this.score));
    }
    getScore() {
        return this.score;
    }
}
