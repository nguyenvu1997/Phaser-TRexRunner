/// <reference path="../node_modules/phaser/types/phaser.d.ts" />
import { OpenScene } from "./Scenes/OpenScene.js";
import { OverScene } from "./Scenes/OverScene.js";
import { PlayScene } from "./Scenes/PlayScene.js";
const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 800,
    parent: 'phaser-example',
    backgroundColor: "#FFF",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [OpenScene, PlayScene, OverScene]
};
var game = new Phaser.Game(config);
