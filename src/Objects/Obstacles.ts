
export class Obstacles {
    scene: Phaser.Scene;
    group: Phaser.Physics.Arcade.Group;
    spawnTimer: number;
    obstacles: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        this.group = this.scene.physics.add.group()
        this.spawnTimer = 0;
        this.obstacles = undefined;
    }

    getGroup() {
        return this.group
    }

    spawn() {
        if (this.spawnTimer > 100) {
            let keys = ["enemy-bird", "obsticle-1", "obsticle-2", "obsticle-3", "obsticle-4", "obsticle-5", "obsticle-6"]
            let key = keys[Math.floor(Math.random() * keys.length)];
            
            if (key == "enemy-bird") {
                let heightBirds = [ 750, 700 ]
                let heightBird = heightBirds[Math.floor(Math.random() * heightBirds.length)];
                this.obstacles = this.group.create(1600, heightBird, key)
                    .setVelocityX(-500)
                this.obstacles.play('enemy-dino-fly', true)
            } else {
                this.obstacles = this.group.create(1600, 750, key)
                    .setVelocityX(-500)
            }

            this.spawnTimer = 0;
        }

        this.spawnTimer++;
        return this.obstacles;
    }

}