const formatScore = (text: string, score: number) => {
    return `${text}: ${score}`
}

export class Score extends Phaser.GameObjects.Text {

    score: number;
    scene: Phaser.Scene;
    text: string;

    constructor(scene: Phaser.Scene, x: number, y: number, score: number, text) {
        const style = { fontSize: '32px', fill: '#000' }
        super(scene, x, y, formatScore(text, score), style);
        this.scene = scene
        this.score = score;
        this.scene.add.existing(this);
    }

    update(text: string) {
        this.score += 1
        this.setText(formatScore(text, this.score))
    }

    getScore(): number{
        return this.score;
    }

}