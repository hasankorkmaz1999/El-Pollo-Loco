/**
 * Represents a chicken enemy in the game.
 * The chicken moves left and can be set to a dead state when its energy is depleted.
 * Inherits from the MovableObject class.
 */
class Chicken extends MovableObject {
  /** @type {number} The y-coordinate position of the chicken. */
  y = 350;

  /** @type {number} Width of the chicken object. */
  width = 65;

  /** @type {number} Height of the chicken object. */
  height = 65;

  /** @type {boolean} Whether the chicken is dead. */
  dead = false;

  /** @type {number} The health or energy level of the chicken. */
  energy = 100;

  /** @type {boolean} Whether the chicken has been removed from the game world. */
  isRemoved = false;

  /** @type {string[]} Paths to the walking animation images. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** @type {string[]} Path to the image displayed when the chicken is dead. */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Initializes a new chicken object at a random position with random speed.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 800 + Math.random() * 1500;
    this.speed = 0.25 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Starts the movement and animation intervals for the chicken.
   * The chicken moves left and plays a walking animation if it's not dead.
   */
  animate() {
    this.moveInterval = setInterval(() => {
      if (!this.dead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (!this.dead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  /**
   * Checks if the chicken is dead based on its energy level.
   * @returns {boolean} True if the chicken is dead, otherwise false.
   */
  isDead() {
    return this.energy <= 0 || this.dead;
  }

  /**
   * Sets the chicken to a dead state, stops its movement, changes the image to the dead image,
   * and removes it from the game world after a short delay.
   */
  die() {
    if (!this.isRemoved) {
      this.dead = true;
      this.speed = 0;
      this.loadImage(this.IMAGES_DEAD[0]);
      this.stopAnimations();
      setTimeout(() => {
        this.removeFromWorld();
      }, 1000);
    }
  }

  /**
   * Removes the chicken from the game world by splicing it from the enemies array.
   */
  removeFromWorld() {
    if (this.world && this.world.level) {
      let index = this.world.level.enemies.indexOf(this);
      if (index > -1) {
        this.world.level.enemies.splice(index, 1);
        this.isRemoved = true;
      }
    } else {
      console.error("world or level is undefined in removeFromWorld");
    }
  }

  /**
   * Stops the movement and animation intervals for the chicken.
   */
  stopAnimations() {
    clearInterval(this.moveInterval);
    clearInterval(this.animationInterval);
  }
}

/**
 * Represents a small chicken enemy, a subclass of Chicken.
 * Has smaller dimensions and a different image set for animations.
 */
class smallChicken extends Chicken {
  /** @type {number} Height of the small chicken. */
  height = 45;

  /** @type {number} Width of the small chicken. */
  width = 45;

  /** @type {number} The y-coordinate position of the small chicken. */
  y = 370;

  /** @type {string[]} Paths to the walking animation images for the small chicken. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /** @type {string[]} Path to the image displayed when the small chicken is dead. */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Initializes a new small chicken object at a random position with random speed.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_WALKING);
    this.x = 700 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Sets the small chicken to a dead state, stops its movement, changes the image to the dead image,
   * and removes it from the game world after a short delay.
   */
  die() {
    if (!this.isRemoved) {
      this.dead = true;
      this.speed = 0;
      this.loadImage(this.IMAGES_DEAD[0]);
      this.stopAnimations();
      setTimeout(() => {
        this.removeFromWorld();
      }, 1000);
    }
  }
}
