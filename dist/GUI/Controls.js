export class Control {
    constructor(scene) {
        this.scene = scene;
    }
    handleInput() {
        this.scene.input.keyboard.on('keydown', function (event) {
            if (event.code == 'Space') {
                if (!this.scene.dino.body.onFloor()) {
                    return;
                }
                this.scene.jumpSound.play();
                this.scene.dino.body.height = 92;
                this.scene.dino.body.offset.y = 0;
                this.scene.dino.setVelocityY(-2000);
            }
            if (event.code == 'KeyS' || event.code == 'ArrowDown') {
                if (!this.scene.dino.body.onFloor()) {
                    return;
                }
                this.scene.dino.body.height = 58;
                this.scene.dino.body.offset.y = 34;
            }
        });
        this.scene.input.keyboard.on('keyup', function (event) {
            if (event.code == 'KeyS' || event.code == 'ArrowDown') {
                if (!this.scene.dino.body.onFloor()) {
                    return;
                }
                this.scene.dino.body.height = 92;
                this.scene.dino.body.offset.y = 0;
            }
        });
    }
}
