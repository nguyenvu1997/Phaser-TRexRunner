import { Animations } from "../GUI/Animations.js";
import { Control } from "../GUI/Controls.js";
import { Ground } from "../Objects/Ground.js";
import { Obstacles } from "../Objects/Obstacles.js";
import { Player } from "../Objects/Player.js";
import { Score } from "../Objects/Score.js";

export class PlayScene extends Phaser.Scene {

    dino: Player;
    control: Control;
    animations: Animations;
    ground: Ground;

    obstacles: Obstacles;

    jumpSound;
    hitSound;
    reachSound;

    width: number;
    height: number;

    score: Score;
    highScore: Score;
    highScoreText;

    obstaclesGroup;

    constructor() {
        super("Play Scene");

        this.dino = undefined;
        this.score = undefined;
    }

    preload() {
        this.load.audio('jump', 'assets/audio/jump.m4a');
        this.load.audio('hit', 'assets/audio/hit.m4a');
        this.load.audio('reach', 'assets/audio/reach.m4a');

        this.load.image('ground', 'assets/img/ground.png');
        this.load.image('dino-idle', 'assets/img/dino-idle.png');
        this.load.image('dino-hurt', 'assets/img/dino-hurt.png');
        this.load.image('restart', 'assets/img/restart.png');
        this.load.image('game-over', 'assets/img/game-over.png');
        this.load.image('cloud', 'assets/img/cloud.png');

        this.load.spritesheet('star', 'assets/img/stars.png', {
            frameWidth: 9, frameHeight: 9
        });

        this.load.spritesheet('moon', 'assets/img/moon.png', {
            frameWidth: 20, frameHeight: 40
        });

        this.load.spritesheet('dino', 'assets/img/dino-run.png', {
            frameWidth: 88,
            frameHeight: 94
        })

        this.load.spritesheet('dino-down', 'assets/img/dino-down.png', {
            frameWidth: 118,
            frameHeight: 94
        })

        this.load.spritesheet('enemy-bird', 'assets/img/enemy-bird.png', {
            frameWidth: 92,
            frameHeight: 77
        })

        this.load.image('obsticle-1', 'assets/img/cactuses_small_1.png')
        this.load.image('obsticle-2', 'assets/img/cactuses_small_2.png')
        this.load.image('obsticle-3', 'assets/img/cactuses_small_3.png')
        this.load.image('obsticle-4', 'assets/img/cactuses_big_1.png')
        this.load.image('obsticle-5', 'assets/img/cactuses_big_2.png')
        this.load.image('obsticle-6', 'assets/img/cactuses_big_3.png')
    }

    init(data) {
        this.highScoreText = data['highScore']
    }

    create() {
        // Get width & height in game
        this.width = this.game.config.width as number;
        this.height = this.game.config.height as number;

        // Controls
        this.control = new Control(this);
        this.control.handleInput();

        // Animations
        this.animations = new Animations(this);
        this.animations.initAnims();

        // Audio
        this.jumpSound = this.sound.add('jump', { volume: 0.5 });
        this.hitSound = this.sound.add('hit', { volume: 0.5 });
        this.reachSound = this.sound.add('reach', { volume: 0.5 });

        // Ground
        this.ground = new Ground(this, 0, 25, this.height, this.width);

        // Score
        this.score = new Score(this, 16, 16, 0, 'Score')
        if (this.highScoreText == undefined) {
            this.highScore = new Score(this, this.width - 300, 16, 0, 'Highscore')
        } else {
            this.highScore = new Score(this, this.width - 300, 16, this.highScoreText, 'Highscore')
        }

        // Obstacles
        this.obstacles = new Obstacles(this);
        this.obstaclesGroup = this.obstacles.getGroup();

        // Player
        this.dino = new Player(this, 300, this.height - 50);
        this.physics.add.collider(this.dino, this.obstaclesGroup, this.hitObstacle, null, this)

    }

    hitObstacle() {
        this.hitSound.play();
        this.scene.start("Over Scene", {
            score: this.score.getScore(),
            highScore: this.highScore.getScore()
        });
    }

    update() {
        this.dino.update();
        this.ground.update();
        this.score.update("Score");
        if (this.highScore.getScore() < this.score.getScore()) {
            this.highScore.update("Highscore")
        }

        this.obstacles.spawn();
    }

}