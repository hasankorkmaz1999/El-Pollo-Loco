/**
 * Base class for status bars, such as health, coins, bottles, and endboss.
 * Represents a visual status indicator in the game.
 */
class StatusBar extends DrawableObject {
  /**
   * The current percentage value displayed by the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates an instance of StatusBar.
   */
  constructor() {
    super();
  }

  /**
   * Sets the displayed percentage and updates the image accordingly.
   * @param {number} percentage - The percentage to set (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image to display based on the current percentage.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 2;
    } else if (this.percentage >= 10) {
      return 1;
    } else {
      return 0;
    }
  }
}

/**
 * Represents the health bar of the character.
 */
class HealthBar extends StatusBar {
  /**
   * Array of image paths for the health bar at different percentage levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = -10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
}

/**
 * Represents the coin collection status bar.
 */
class CoinBar extends StatusBar {
  /**
   * Array of image paths for the coin bar at different percentage levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 35;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the displayed percentage of collected coins and updates the image.
   * @param {number} percentage - The percentage of coins collected.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }
}

/**
 * Represents the bottle collection status bar.
 */
class BottlesBar extends StatusBar {
  /**
   * Array of image paths for the bottle bar at different percentage levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Number of collected bottles.
   * @type {number}
   */
  collectedBottles = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 10;
    this.y = 85;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Sets the number of collected bottles and updates the percentage.
   * @param {number} collectedBottles - The number of bottles collected.
   * @param {number} totalBottles - The total number of bottles.
   */
  setBottlesCollected(collectedBottles, totalBottles) {
    this.collectedBottles = collectedBottles;
    this.percentage = (collectedBottles / totalBottles) * 100;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Draws the bottles bar and displays the number of collected bottles.
   * @param {CanvasRenderingContext2D} ctx - The rendering context to draw on.
   */
  draw(ctx) {
    super.draw(ctx);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(
      `x ${this.collectedBottles}`,
      this.x + this.width / 2,
      this.y + this.height / 1.25
    );
  }
}

/**
 * Represents the health bar of the endboss.
 */
class EndbossStatusbar extends StatusBar {
  /**
   * Array of image paths for the endboss health bar at different percentage levels.
   * @type {string[]}
   */
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 500;
    this.y = -3;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Resolves the index of the image to display based on the current percentage for the endboss.
   * @returns {number} The index of the image in the IMAGES array.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 4;
    } else if (this.percentage >= 80) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
