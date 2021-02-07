import Phaser from "phaser";
import SnakeScene from "./scenes/SnakeScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [SnakeScene],
};

export default new Phaser.Game(config);
