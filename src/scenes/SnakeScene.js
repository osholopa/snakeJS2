import Phaser from "phaser";
import Snake from "../Snake";
import Apple from "../Apple";

export default class SnakeScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("background", "images/background.png");
    this.load.image("snake_head", "images/snake_head.png");
    this.load.image("snake_head_1", "images/snake_head_1.png");
    this.load.image("snake_body", "images/snake_body.png");
    this.load.image("apple", "images/apple.png");
    this.load.audio("crunch", "audio/apple-crunch.wav");
  }

  create() {
    this.add.image(400, 300, "background").setScale(2);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.snake = new Snake(this, 20, 40);
    this.apple = new Apple(
      this,
      Phaser.Math.Between(0, 400),
      Phaser.Math.Between(0, 300)
    );
  }

  handleInput() {
    if (this.cursors.left.isDown) {
      this.snake.setDirection("LEFT");
    } else if (this.cursors.right.isDown) {
      this.snake.setDirection("RIGHT");
    }

    if (this.cursors.up.isDown) {
      this.snake.setDirection("UP");
    } else if (this.cursors.down.isDown) {
      this.snake.setDirection("DOWN");
    }
  }

  update() {
    this.snake.move();
    this.handleInput();
    this.physics.collide(this.snake, this.apple, function (snake, apple) {
      apple.emit("reset");
      snake.emit("score");
    });
    this.physics.world.wrap(this.snake);
  }
}
