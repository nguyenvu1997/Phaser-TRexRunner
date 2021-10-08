
export class Animations {
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    initAnims() {
        this.scene.anims.create({
            key: 'dino-run',
            frames: this.scene.anims.generateFrameNumbers('dino', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'dino-down-anim',
            frames: this.scene.anims.generateFrameNumbers('dino-down', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        })

        this.scene.anims.create({
            key: 'enemy-dino-fly',
            frames: this.scene.anims.generateFrameNumbers('enemy-bird', { start: 0, end: 1 }),
            frameRate: 6,
            repeat: -1
        })
    }
}