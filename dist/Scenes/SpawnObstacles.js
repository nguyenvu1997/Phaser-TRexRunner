export class SpawnObstacles {
    constructor(scene) {
        this.scene = scene;
        this.spawnTimer = 0;
        this.group = this.scene.physics.add.group();
    }
    getGroup() {
        return this.group;
    }
    spawn() {
        if (this.spawnTimer > 100) {
            let keys = ["enemy-bird", "obsticle-1", "obsticle-2", "obsticle-3", "obsticle-4", "obsticle-5", "obsticle-6"];
            let key = keys[Math.floor(Math.random() * keys.length)];
            this.obstacles = this.group.create(1600, 550, key)
                .setVelocityX(-500);
            this.spawnTimer = 0;
        }
        this.spawnTimer++;
        return this.obstacles;
    }
}
