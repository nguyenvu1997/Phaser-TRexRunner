const formatScore = (text: string, score: number) => {
    return `${text}: ${score}`
}

export class Score extends Phaser.GameObjects.Text
{
    score: number;

	constructor(scene, x, y, score, style)
	{
		super(scene, x, y, formatScore("", score), style)

		this.score = score
	}

	setScore(text, score)
	{
		this.score  += score
        this.setText(formatScore(text, this.score))
	}

	getScore(){
		return this.score;
	}
}