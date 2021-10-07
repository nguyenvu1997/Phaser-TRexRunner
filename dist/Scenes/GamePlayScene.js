import { Score } from "./Score.js";
export class GamePlayScene extends Phaser.Scene {
    constructor() {
        super("Game Play Scene");
        GamePlayScene.score = undefined;
        this.obstacles = [];
        this.spawnTimer = 0;
        this.isAlive = true;
    }
    init(data) {
        this.highScoreText = data['highScore'];
        console.log(this.highScoreText);
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
        });
        this.load.spritesheet('dino-down', 'assets/img/dino-down.png', {
            frameWidth: 118,
            frameHeight: 94
        });
        this.load.spritesheet('enemy-bird', 'assets/img/enemy-bird.png', {
            frameWidth: 92,
            frameHeight: 77
        });
        this.load.image('obsticle-1', 'assets/img/cactuses_small_1.png');
        this.load.image('obsticle-2', 'assets/img/cactuses_small_2.png');
        this.load.image('obsticle-3', 'assets/img/cactuses_small_3.png');
        this.load.image('obsticle-4', 'assets/img/cactuses_big_1.png');
        this.load.image('obsticle-5', 'assets/img/cactuses_big_2.png');
        this.load.image('obsticle-6', 'assets/img/cactuses_big_3.png');
    }
    create() {
        GamePlayScene.group = this.physics.add.group();
        GamePlayScene.gameSpeed = 10;
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        // Add audio
        GamePlayScene.jumpSound = this.sound.add('jump', { volume: 0.2 });
        GamePlayScene.hitSound = this.sound.add('hit', { volume: 0.2 });
        GamePlayScene.reachSound = this.sound.add('reach', { volume: 0.2 });
        GamePlayScene.ground = this.add.tileSprite(0, this.height, this.width, 25, 'ground');
        GamePlayScene.ground.setOrigin(0, 1);
        GamePlayScene.dino = this.physics.add.sprite(0, this.height, 'dino-idle')
            .setCollideWorldBounds(true)
            .setGravityY(5000)
            .setBodySize(44, 92)
            .setDepth(1)
            .setOrigin(0, 1);
        // Obstacles
        // GamePlayScene.spawnObstacles = new SpawnObstacles(this);
        // Score & Highscore
        GamePlayScene.score = this.createScore(16, 16, 0);
        if (this.highScoreText == undefined) {
            GamePlayScene.highScore = this.createHighScore(this.width - 300, 16, 0);
        }
        else {
            GamePlayScene.highScore = this.createHighScore(this.width - 300, 16, this.highScoreText);
        }
        //Hit Obstacles
        this.physics.add.collider(GamePlayScene.dino, GamePlayScene.group, this.hitObstacles, null, this);
        // T-Rex Run
        this.initAnims();
        // Handle Input
        this.handleInput();
    }
    hitObstacles() {
        GamePlayScene.hitSound.play();
        this.scene.start("Game Over Scene", {
            score: GamePlayScene.score.getScore(),
            highScore: GamePlayScene.highScore.getScore()
        });
    }
    spawn() {
        if (this.spawnTimer > 100) {
            let keys = ["enemy-bird", "obsticle-1", "obsticle-2", "obsticle-3", "obsticle-4", "obsticle-5", "obsticle-6"];
            let key = keys[Math.floor(Math.random() * keys.length)];
            this.obstacles = GamePlayScene.group.create(1600, 550, key)
                .setVelocityX(-500);
            this.spawnTimer = 0;
        }
        this.spawnTimer++;
        // return this.obstacles;
    }
    createHighScore(x, y, score) {
        const style = { fontSize: '32px', fill: '#000' };
        const label = new Score(this, x, y, score, style);
        label.setScore("Highscore", 0);
        this.add.existing(label);
        return label;
    }
    createScore(x, y, score) {
        const style = { fontSize: '32px', fill: '#000' };
        const label = new Score(this, x, y, score, style);
        this.add.existing(label);
        return label;
    }
    createObstacles() {
        const bird = this.physics.add.sprite(500, this.height - 100, 'enemy-bird')
            .setBounce(0.2)
            .setCollideWorldBounds(true);
        return bird;
    }
    initAnims() {
        this.anims.create({
            key: 'dino-run',
            frames: this.anims.generateFrameNumbers('dino', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'dino-down-anim',
            frames: this.anims.generateFrameNumbers('dino-down', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemy-dino-fly',
            frames: this.anims.generateFrameNumbers('enemy-bird', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
        });
    }
    handleInput() {
        this.input.keyboard.on('keydown', function (event) {
            if (event.code == 'Space') {
                if (!GamePlayScene.dino.body.onFloor()) {
                    return;
                }
                GamePlayScene.jumpSound.play();
                GamePlayScene.dino.body.height = 92;
                GamePlayScene.dino.body.offset.y = 0;
                GamePlayScene.dino.setVelocityY(-2000);
            }
            if (event.code == 'KeyS' || event.code == 'ArrowDown') {
                if (!GamePlayScene.dino.body.onFloor()) {
                    return;
                }
                GamePlayScene.dino.body.height = 58;
                GamePlayScene.dino.body.offset.y = 34;
            }
        });
        this.input.keyboard.on('keyup', function (event) {
            if (event.code == 'KeyS' || event.code == 'ArrowDown') {
                if (!GamePlayScene.dino.body.onFloor()) {
                    return;
                }
                GamePlayScene.dino.body.height = 92;
                GamePlayScene.dino.body.offset.y = 0;
            }
        });
    }
    update() {
        // Update Score
        GamePlayScene.score.setScore("Score", 1);
        if (GamePlayScene.highScore.getScore() < GamePlayScene.score.getScore()) {
            GamePlayScene.highScore.setScore("Highscore", 1);
        }
        this.spawn();
        // GamePlayScene.spawnObstacles.spawn();
        GamePlayScene.ground.tilePositionX += GamePlayScene.gameSpeed;
        if (GamePlayScene.dino.body.deltaAbsY() > 0) {
            GamePlayScene.dino.anims.stop();
            GamePlayScene.dino.setTexture('dino', 0);
        }
        else {
            if (GamePlayScene.dino.body.height <= 58) {
                GamePlayScene.dino.play('dino-down-anim', true);
            }
            else {
                GamePlayScene.dino.play('dino-run', true);
            }
        }
    }
}
