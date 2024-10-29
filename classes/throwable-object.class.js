/**
 * The ThrowableObject class represents objects that can be thrown by the character,
 * such as bottles, with collision detection, splash effects, and cooldown control.
 * This class extends MovableObject.
 */
class ThrowableObject extends MovableObject {
  IMAGES_THROWN = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  splashPlayed = false;
  world;
  throwDirection = 10;
  splash_sound = new Audio("audio/splash.wav");

  static cooldownActive = false;

  /**
   * Constructs a new instance of the ThrowableObject class.
   * @param {number} x - The initial x-coordinate of the object.
   * @param {number} y - The initial y-coordinate of the object.
   * @param {World} world - The world instance to which this object belongs.
   */
  constructor(x, y, world) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_THROWN);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 50;
    this.world = world;
    this.adjustDirection();
    this.throw();
    this.rotation();
    this.splash_sound.volume = 0.6;
    if (this.world.isMuted) {
      this.splash_sound.volume = 0;
    }
  }

  /**
   * Toggles the mute state for the splash sound.
   * @param {boolean} isMuted - If true, mutes the splash sound; otherwise, unmutes it.
   */
  toggleMute(isMuted) {
    this.splash_sound.volume = isMuted ? 0 : 0.9;
  }

  /**
   * Adjusts the direction of the throw based on the character's facing direction.
   */
  adjustDirection() {
    if (this.world.character.otherDirection) {
      this.throwDirection = -10;
    } else {
      this.throwDirection = 10;
    }
  }

  /**
   * Initiates the throw by applying speed and gravity and checks for collisions.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.x += this.throwDirection;
      this.checkGroundCollision();
      this.checkChickenCollision();
      this.checkEndbossCollision();
    }, 25);
  }

  /**
   * Rotates the throwable object by cycling through rotation images.
   */
  rotation() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_THROWN);
    }, 80);
  }

  /**
   * Checks if the throwable object hits the ground and plays the splash animation if true.
   */
  checkGroundCollision() {
    if (this.y >= 350 && !this.splashPlayed) {
      this.playSplashAnimation();
    }
  }

  /**
   * Checks if the throwable object collides with chickens and "kills" them if true.
   */
  checkChickenCollision() {
    this.world.level.enemies.forEach((enemy) => {
      if (
        !(enemy instanceof Endboss) &&
        this.isColliding(enemy) &&
        !this.splashPlayed
      ) {
        this.playSplashAnimation();
        if (typeof enemy.die === "function") {
          enemy.die();
        }
      }
    });
  }

  /**
   * Checks if the throwable object collides with the endboss and damages it if true.
   */
  /**
   * Checks if the throwable object collides with the endboss and damages it if true.
   */
  checkEndbossCollision() {
    if (this.world.endboss) {
      const endbossHitbox = this.getEndbossHitbox();
      const bottleHitbox = this.getBottleHitbox();

      if (this.isCollision(bottleHitbox, endbossHitbox)) {
        this.handleEndbossCollision();
      }
    }
  }

  /**
   * Calculates and returns the hitbox area of the endboss.
   * @returns {Object} The hitbox of the endboss with x, y, width, and height properties.
   */
  getEndbossHitbox() {
    return {
      x: this.world.endboss.x + this.world.endboss.width * 0.15,
      y: this.world.endboss.y + this.world.endboss.height * 0.1,
      width: this.world.endboss.width * 0.7,
      height: this.world.endboss.height * 0.9,
    };
  }

  /**
   * Calculates and returns the hitbox area of the throwable object (bottle).
   * @returns {Object} The hitbox of the bottle with x, y, width, and height properties.
   */
  getBottleHitbox() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  /**
   * Determines if there is a collision between two hitboxes.
   * @param {Object} hitbox1 - The first hitbox with x, y, width, and height properties.
   * @param {Object} hitbox2 - The second hitbox with x, y, width, and height properties.
   * @returns {boolean} True if the hitboxes overlap, indicating a collision; otherwise, false.
   */
  isCollision(hitbox1, hitbox2) {
    return (
      hitbox1.x + hitbox1.width > hitbox2.x &&
      hitbox1.x < hitbox2.x + hitbox2.width &&
      hitbox1.y + hitbox1.height > hitbox2.y &&
      hitbox1.y < hitbox2.y + hitbox2.height
    );
  }

  /**
   * Handles the actions to take when the throwable object collides with the endboss.
   * Plays the splash animation and triggers the endboss's hit action.
   */
  handleEndbossCollision() {
    this.playSplashAnimation();
    this.world.endboss.hitEndboss();
  }

  /**
   * Plays the splash animation and sound, removes intervals, and deletes the object after animation.
   */
  playSplashAnimation() {
    if (!this.splashPlayed) {
      this.splashPlayed = true;
      this.splash_sound.play();
      clearInterval(this.throwInterval);
      clearInterval(this.rotationInterval);
      this.playAnimation(this.IMAGES_SPLASH);
      setTimeout(() => {
        this.remove();
      }, 600);
    }
  }

  /**
   * Removes the throwable object from the world.
   */
  remove() {
    let index = this.world.throwableObjects.indexOf(this);
    if (index > -1) {
      this.world.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Starts a cooldown period during which the object cannot be thrown.
   */
  static startCooldown() {
    ThrowableObject.cooldownActive = true;
    setTimeout(() => {
      ThrowableObject.cooldownActive = false;
    }, 700);
  }

  /**
   * Checks if a throwable object can be thrown based on cooldown status.
   * @returns {boolean} True if the object can be thrown, false otherwise.
   */
  static canThrow() {
    return !ThrowableObject.cooldownActive;
  }
}
