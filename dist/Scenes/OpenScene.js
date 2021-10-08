import { Ground } from "../Objects/Ground.js";
import { Player } from "../Objects/Player.js";
export class OpenScene extends Phaser.Scene {
    constructor() {
        super("Open Scene");
    }
    preload() {
        this.load.image('ground', 'assets/img/ground.png');
        this.load.image('dino-idle', 'assets/img/dino-idle.png');
    }
    create() {
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.dino = new Player(this, 300, 300);
        this.ground = new Ground(this, 0, 25, this.height, this.width);
        const style = { fontSize: '52px', fill: '#000', align: 'left' };
        this.add.text(this.width / 2 - 300, this.height / 2 - 100, 'PRESS SPACE TO START GAME', style);
        this.handleInput();
    }
    handleInput() {
        this.input.keyboard.on('keydown', function (event) {
            if (event.code == 'Space') {
                this.scene.start("Play Scene");
            }
        }, this);
    }
}
