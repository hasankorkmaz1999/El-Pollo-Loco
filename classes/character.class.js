/**
 * Represents the main character in the game.
 * Handles character movement, animations, and interactions with the world.
 * Inherits from MovableObject.
 */
class Character extends MovableObject {
  /** @type {number} Height of the character. */
  height = 200;

  /** @type {number} Initial x-coordinate position of the character. */
  x = 120;

  /** @type {number} Initial y-coordinate position of the character. */
  y = 215;

  /** @type {number} Width of the character. */
  width = 100;

  /** @type {number} Speed of the character. */
  speed = 10;

  /** @type {number} Energy level of the character, representing health points. */
  energy = 100;

  /** @type {string[]} Paths to the walking animation images. */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} Paths to the jumping animation images. */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} Paths to the death animation images. */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} Paths to the hurt animation images. */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} Paths to the idle animation images. */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} Paths to the sleeping animation images for long idle state. */
  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {World} Reference to the game world. */
  world;

  /**
   * Initializes a new character with idle and movement animations, gravity, and movement behaviors.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_SLEEP);
    this.applyGravity();
    this.animate();
  }

  /**
   * Manages character animations and movements by initializing separate intervals for
   * movement and state-based animations.
   */
  animate() {
    this.setupMovementAnimation();
    this.setupStateAnimation();
  }

  /**
   * Sets up an interval to handle character movements based on keyboard input
   * and adjusts the camera position.
   */
  setupMovementAnimation() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }
      if (this.world.keyboard.SPACE && !this.isAboveground()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Sets up an interval to manage the character's animation based on its current state,
   * such as dead, hurt, jumping, walking, or idle.
   */
  setupStateAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.playDeadAnimation();
        this.world.isGameOver = true;
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveground()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 150);
  }

  /**
   * Checks if the character has zero energy, marking it as dead.
   * @returns {boolean} True if the character is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Determines if the character is in a position to jump on a given chicken.
   * @param {Chicken} chicken - The chicken object to check collision with.
   * @returns {boolean} True if the character is jumping on the chicken, false otherwise.
   */
  isJumpingOn(chicken) {
    let horizontalOffset = this.width * 0.4;
    let verticalOffset = chicken.height * 0.2;

    return (
      this.speedY < 0 &&
      this.y + this.height < chicken.y + chicken.height - verticalOffset &&
      this.y + this.height > chicken.y &&
      this.x + this.width - horizontalOffset > chicken.x &&
      this.x + horizontalOffset < chicken.x + chicken.width
    );
  }
}
