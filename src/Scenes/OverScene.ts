import { Score } from "../Objects/Score.js";

export class OverScene extends Phaser.Scene {

    dino: Phaser.GameObjects.Image;
    ground: Phaser.GameObjects.TileSprite;
    width: number;
    height: number;

    scoreText: number;
    highScoreText: number;
    score: Score;
    highScore: Score;

    constructor() {
        super("Over Scene")
        this.dino = undefined;
    }

    init(data: {}){
        this.scoreText = data['score']
        this.highScoreText = data['highScore']
    }

    preload() {
        this.load.image('dino-hurt', 'assets/img/dino-hurt.png');
        this.load.image('restart', 'assets/img/restart.png');
        this.load.image('game-over', 'assets/img/game-over.png');
    }

    create() {
        this.width = this.game.config.width as number;
        this.height = this.game.config.height as number;

        this.dino = this.add.image(350, this.height - 45, 'dino-hurt')

        this.ground = this.add.tileSprite(0, this.height, this.width, 25, 'ground');
        this.ground.setOrigin(0, 1)

        this.score = new Score(this, 16, 16, this.scoreText, 'Score')
        this.highScore = new Score(this, this.width - 300, 16, this.highScoreText, 'Highscore')

        const gameOver = this.add.image(800, 300, 'game-over')
        const restart = this.add.image(800, 350, 'restart')

        this.handleInput();
    }

    handleInput() {
        this.input.keyboard.on('keydown', function (event) {
            if (event.code == 'Space') {
                this.scene.start("Play Scene", {
                    highScore: this.highScore.getScore()
                })
            }
        }, this);
    }

}