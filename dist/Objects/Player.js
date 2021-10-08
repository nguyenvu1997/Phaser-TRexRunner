export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dino-idle');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(true)
            .setGravityY(5000)
            .setBodySize(44, 92)
            .setDepth(1)
            .setOrigin(0, 1);
    }
    update() {
        if (this.body.deltaAbsY() > 0) {
            this.anims.stop();
            this.setTexture('dino', 0);
        }
        else {
            if (this.body.height <= 58) {
                this.play('dino-down-anim', true);
            }
            else {
                this.play('dino-run', true);
            }
        }
    }
}
