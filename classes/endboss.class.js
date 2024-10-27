/**
 * Represents the Endboss enemy character in the game.
 * The Endboss is a specialized type of `MovableObject` with specific animations, attack logic, 
 * and health management.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    /** @type {number} The height of the Endboss. */
    height = 350;
    /** @type {number} The width of the Endboss. */
    width = 250;
    /** @type {number} The y-coordinate position of the Endboss. */
    y = 80;
    /** @type {number} The Endboss's health level. */
    energy = 100;
    /** @type {boolean} Indicates if the Endboss is hurt. */
    isHurt = false;
    /** @type {boolean} Indicates if the Endboss is dead. */
    isDeadEndboss = false;
    /** @type {boolean} Indicates if the Endboss is currently attacking. */
    isAttacking = false;
    /** @type {number} The movement speed of the Endboss. */
    speed = 50;
    /** @type {number} Time between attacks in milliseconds. */
    attackCooldown = 3000;
    /** @type {boolean} Tracks if the Endboss has spotted the character. */
    hasSeenCharacter = false;
    /** @type {string} Direction the Endboss is facing ("left" or "right"). */
    direction = "left";
    /** @type {number} X-offset for the Endboss's hitbox. */
    hitboxOffsetX = 70;
    /** @type {number} Y-offset for the Endboss's hitbox. */
    hitboxOffsetY = 50;
    /** @type {number} Width of the Endboss's hitbox. */
    hitboxWidth = 10;
    /** @type {number} Height of the Endboss's hitbox. */
    hitboxHeight = 340;
  
    /** Array of image paths for the Endboss's alert animation. */
    IMAGES_ALERT = [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
  
    /** Array of image paths for the Endboss's attack animation. */
    IMAGES_ATTACK = [
      "img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
  
    /** Array of image paths for the Endboss's walking animation. */
    IMAGES_WALKING = [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
  
    /** Array of image paths for the Endboss's hurt animation. */
    IMAGES_HURT = [
      "img/4_enemie_boss_chicken/4_hurt/G21.png",
      "img/4_enemie_boss_chicken/4_hurt/G22.png",
      "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];
  
    /** Array of image paths for the Endboss's death animation. */
    IMAGES_DEAD = [
      "img/4_enemie_boss_chicken/5_dead/G24.png",
      "img/4_enemie_boss_chicken/5_dead/G25.png",
      "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];
  
    /**
     * Initializes the Endboss with its images and animations.
     */
    constructor() {
      super().loadImage(this.IMAGES_ALERT[0]);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACK);
      this.x = 2450;
      this.otherDirection = false;
      this.animate();
      this.attack();
    }
  
    /**
     * Determines if the character is within sight range of the Endboss.
     * @returns {boolean} True if character is within sight range.
     */
    isInSight() {
      if (this.world && this.world.character) {
        let distanceToCharacter = Math.abs(this.world.character.x - this.x);
        let inSight = distanceToCharacter < 500 && distanceToCharacter > -1000;
        if (inSight) {
          this.hasSeenCharacter = true;
        }
        return inSight;
      }
      return false;
    }
  
    /**
     * Provides the hitbox details for collision detection.
     * @returns {Object} An object containing x, y, width, and height of the hitbox.
     */
    getHitbox() {
      return {
        x: this.x + this.hitboxOffsetX,
        y: this.y + this.hitboxOffsetY,
        width: this.hitboxWidth,
        height: this.hitboxHeight,
      };
    }
  
    /**
     * Controls the animations of the Endboss, depending on its state (e.g., attacking, hurt, etc.).
     */
    animate() {
      this.animationInterval = setInterval(() => {
        if (this.isDeadEndboss) {
          this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt) {
          this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
          this.playAttackAnimation();
        } else if (this.hasSeenCharacter) {
          this.walk();
          this.checkDirection();
        } else {
          this.playAnimation(this.IMAGES_ALERT);
        }
      }, 250);
    }
  
    /**
     * Plays the walking animation and moves the Endboss based on direction.
     */
    walk() {
      this.playAnimation(this.IMAGES_WALKING);
      this.x += this.direction === "left" ? -this.speed : this.speed;
    }
  
    /**
     * Updates the Endboss's direction based on the character's position.
     */
    checkDirection() {
      if (this.world.character) {
        if (this.x < this.world.character.x && this.direction === "left") {
          this.direction = "right";
          this.otherDirection = true;
        } else if (this.x > this.world.character.x && this.direction === "right") {
          this.direction = "left";
          this.otherDirection = false;
        }
      }
    }
  
    /**
     * Initiates attack actions if the character is in sight and Endboss is not dead.
     */
    attack() {
      setInterval(() => {
        if (this.isInSight() && !this.isDeadEndboss) {
          this.isAttacking = true;
          setTimeout(() => {
            this.isAttacking = false;
          }, 1000);
        }
      }, this.attackCooldown);
    }
  
    /**
     * Plays the attack animation sequence.
     */
    playAttackAnimation() {
      this.playAnimation(this.IMAGES_ATTACK);
    }
  
    /**
     * Reduces Endboss's energy, triggers hurt animation, and checks if it should die.
     */
    hitEndboss() {
      if (!this.isDeadEndboss) {
        this.energy -= 10;
        this.isHurt = true;
        this.updateEndbossStatusbar();
        setTimeout(() => {
          this.isHurt = false;
        }, 500);
        if (this.energy <= 0) {
          this.die();
        }
      }
    }
  
    /**
     * Handles the Endboss's death animation and triggers game-over state.
     */
    die() {
      if (!this.isDeadEndboss) {
        this.isDeadEndboss = true;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.removeFromWorld();
          this.world.isGameOver = true;
        }, 2000);
      }
    }
  
    /**
     * Updates the Endboss health status bar based on its remaining energy.
     */
    updateEndbossStatusbar() {
      if (this.world.endbossBar) {
        let healthPercentage = Math.max((this.energy / 100) * 100, 0);
        this.world.endbossBar.setPercentage(healthPercentage);
      }
    }
  
    /**
     * Removes the Endboss from the game world.
     */
    removeFromWorld() {
      this.isDeadEndboss = true;
    }
  }
  