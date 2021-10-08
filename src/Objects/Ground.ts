export class Ground extends Phaser.GameObjects.TileSprite{

    scene: Phaser.Scene

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number){
        super(scene, x, width, height, y, 'ground');
        this.scene = scene;
        this.scene.add.existing(this);
        this.setOrigin(0, 1)
    }

    update(){
        this.tilePositionX += 6.7;
    }
}