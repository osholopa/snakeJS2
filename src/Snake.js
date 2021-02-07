// @ts-nocheck
import Phaser from "phaser";

export default class Snake extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "snake_head");

    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCircle(150);
    this.setScale(0.1);
    this.snakeBody = scene.physics.add.group({
      key: "snake_body",
      frameQuantity: 0,
      setScale: { x: 0.1, y: 0.1 },
    });
    this.scene.anims.create({
      key: "eat",
      frames: [{ key: "snake_head" }, { key: "snake_head_1", duration: 50 }],
      frameRate: 8,
    });
    this.direction = "RIGHT";
    this.velocity = 100;
    this.score = 0;
    this.on("score", this.grow);
    this.sfx = scene.sound.add("crunch");
    this.play("eat");
  }

  setDirection(direction) {
    this.direction = direction;
  }

  grow() {
    this.score += 1000;
    this.velocity++;
    this.play("eat");
    this.sfx.play();
    document.getElementById("score").innerHTML = this.score;
    this.snakeBody.add(
      new Phaser.Physics.Arcade.Sprite(this.scene, 0, 0, "snake_body").setScale(
        0.1
      ),
      true
    );
  }

  move() {
    switch (this.direction) {
      case "RIGHT":
        this.setVelocityX(this.velocity);
        this.setVelocityY(0);
        this.setRotation(0);
        break;
      case "LEFT":
        this.setVelocityX(-this.velocity);
        this.setVelocityY(0);
        this.setRotation(2 * 1.57);
        break;
      case "UP":
        this.setVelocityY(-this.velocity);
        this.setVelocityX(0);
        this.setRotation(3 * 1.57);
        break;
      case "DOWN":
        this.setVelocityY(this.velocity);
        this.setVelocityX(0);
        this.setRotation(1 * 1.57);
        break;

      default:
        break;
    }

    for (let i = 0; i < this.snakeBody.getLength(); i++) {
      if (i === 0) {
        this.scene.physics.moveToObject(
          this.snakeBody.getChildren()[0],
          this,
          this.velocity * 0.9
        );
      } else {
        this.scene.physics.moveToObject(
          this.snakeBody.getChildren()[i],
          this.snakeBody.getChildren()[i - 1],
          this.velocity * 0.8 - i
        );
      }
    }
  }
}
