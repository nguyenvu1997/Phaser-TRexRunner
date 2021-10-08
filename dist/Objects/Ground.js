export class Ground extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height) {
        super(scene, x, width, height, y, 'ground');
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0, 1);
    }
    update() {
        this.tilePositionX += 6.7;
    }
}
