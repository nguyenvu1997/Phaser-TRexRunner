import { Score } from "./Score.js";

export class GameOverScene extends Phaser.Scene {

    dino;
    ground;
    width: number;
    height: number;

    scoreText;
    highScoreText;
    

    score;
    highScore;

    constructor() {
        super("Game Over Scene")
        this.dino = undefined;
    }

    init(data: {}){
        this.scoreText = data['score']
        this.highScoreText = data['highScore']
        console.log(this.scoreText)
        console.log(this.highScoreText)
    }

    preload() {
        this.load.image('dino-hurt', 'assets/img/dino-hurt.png');
        this.load.image('restart', 'assets/img/restart.png');
        this.load.image('game-over', 'assets/img/game-over.png');
    }

    create() {
        this.width = this.game.config.width as number;
        this.height = this.game.config.height as number;

        this.dino = this.add.image(50, 560, 'dino-hurt')

        this.ground = this.add.tileSprite(0, this.height, this.width, 25, 'ground');
        this.ground.setOrigin(0, 1)

        this.score = this.createScore(16, 16, this.scoreText)
        this.highScore = this.createHighScore(this.width - 300, 16, this.highScoreText)

        const gameOver = this.add.image(800, 300, 'game-over')
        const restart = this.add.image(800, 350, 'restart')

        this.handleInput();
    }

    handleInput() {
        this.input.keyboard.on('keydown', function (event) {
            if (event.code == 'Space') {
                this.scene.start("Game Play Scene", {
                    highScore: this.highScore.getScore()
                })
            }
        }, this);
    }

    createHighScore(x: number, y: number, score: number) {
        const style = { fontSize: '32px', fill: '#000' }
        const label = new Score(this, x, y, score, style)

        this.add.existing(label)
        label.setScore("Highscore", 0)

        return label
    }

    createScore(x: number, y: number, score: number) {
        const style = { fontSize: '32px', fill: '#000' }
        const label = new Score(this, x, y, score, style)

        this.add.existing(label)
        label.setScore("Score", 0)

        return label
    }
}