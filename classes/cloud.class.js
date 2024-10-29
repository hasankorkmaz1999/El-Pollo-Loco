/**
 * Represents a cloud object in the game, which moves across the screen.
 * Extends the MovableObject class to inherit movement properties.
 */
class Cloud extends MovableObject {
  /** @type {number} y-coordinate position of the cloud. */
  y = 20;

  /** @type {number} Height of the cloud image. */
  height = 300;

  /** @type {number} Width of the cloud image. */
  width = 450;

  /**
   * Initializes a new cloud instance, sets a random x-coordinate,
   * and starts the cloud's movement animation.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    /** @type {number} x-coordinate position of the cloud, randomized within a range. */
    this.x = Math.random() * 500;

    this.animate();
  }

  /**
   * Starts the cloud's movement animation, continuously moving it to the left.
   */
  animate() {
    this.moveLeft();
  }
}
