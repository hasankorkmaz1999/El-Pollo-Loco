/**
 * Represents a collectible coin in the game.
 * Coins are animated and positioned randomly within specified bounds.
 * Extends the MovableObject class.
 */
class Coins extends MovableObject {
  /**
   * @static
   * @type {number}
   * Tracks the last X-position of the coin to ensure spacing between coins.
   */
  static lastX = 200;

  /** @type {number} Width of the coin image. */
  width = 100;

  /** @type {number} Height of the coin image. */
  height = 100;

  /**
   * @type {string[]} Paths to the images used for coin animation.
   * Images switch periodically to create a spinning effect.
   */
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Initializes a new coin, sets its position randomly within specified bounds,
   * and starts the coin animation.
   */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COINS);

    let minX = 200;
    let maxX = 1500;
    let minDistance = 300;
    let randomOffset = Math.random() * 100;

    // Set initial x-coordinate with a random offset and boundary check
    this.x = Coins.lastX + minDistance + randomOffset;
    if (this.x > maxX) {
      this.x = minX + Math.random() * (maxX - minX);
    }

    // Set random y-coordinate within a range
    this.y = 100 + Math.random() * 100;

    this.animate();
    Coins.lastX = this.x; // Update lastX to current position
  }

  /**
   * Animates the coin by cycling through images, creating a spinning effect.
   * Animation is set to change images every 150 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 150);
  }
}
