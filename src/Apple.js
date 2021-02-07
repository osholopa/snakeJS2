import Phaser from "phaser";

export default class Apple extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "apple");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setScale(0.1);
    this.setCollideWorldBounds(true);
    this.on("reset", this.reset);
  }

  reset() {
    this.setX(Phaser.Math.Between(0, 400));
    this.setY(Phaser.Math.Between(0, 300));
    this.setVelocityX(0);
    this.setVelocityY(0);
  }
}
