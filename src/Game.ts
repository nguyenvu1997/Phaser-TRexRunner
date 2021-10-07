/// <reference path="../node_modules/phaser/types/phaser.d.ts" />

import { GameOverScene } from "./Scenes/GameOverScene.js";
import { GamePlayScene } from "./Scenes/GamePlayScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 600,
    pixelArt: true,
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    },
    scene: [GamePlayScene, GameOverScene]
  };

const game = new Phaser.Game(config);