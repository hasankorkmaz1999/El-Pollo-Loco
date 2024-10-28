/**
 * Represents a movable object in the game, such as the character, enemies, or items.
 * Extends from DrawableObject to include movement-related properties and methods.
 */
class MovableObject extends DrawableObject {
  /**
   * @type {number} Speed at which the object moves horizontally.
   */
  speed = 0.15;

  /**
   * @type {boolean} Indicates if the object is facing the opposite direction.
   */
  otherDirection = false;

  /**
   * @type {number} Vertical speed of the object, used for jumping and gravity.
   */
  speedY = 0;

  /**
   * @type {number} Acceleration for gravity, pulling the object downwards.
   */
  acceleration = 2.5;

  /**
   * @type {number} Timestamp of the last time the object was hit.
   */
  lastHit = 0;

  /**
   * @type {number} Index for dead animation frames.
   */
  deadAnimationIndex = 0;

  /**
   * @type {number} Counter for the collected bottles.
   */
  collectedBottles = 0;

  /**
   * @type {number} Counter for the collected coins.
   */
  collectedCoins = 0;

  /**
   * @type {Audio} Audio object for the hurt sound when hit.
   */
  hurt_sound = new Audio("audio/hurt.ogg");

  /**
   * Initializes a new instance of MovableObject and sets hurt sound volume.
   */
  constructor() {
    super();
    this.hurt_sound.volume = 0.2;
  }

  /**
   * Applies gravity to the object, reducing its vertical speed over time.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveground() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground level.
   * @returns {boolean} True if the object is above the ground or is throwable.
   */
  isAboveground() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 215;
    }
  }

 /**
 * Checks if this object is colliding with another specified object.
 * @param {MovableObject} mo - Another movable object to check collision with.
 * @returns {boolean} True if the objects are colliding.
 */
isColliding(mo) {
  if (mo instanceof Coins) {
    return this.isCollidingWithCoins(mo);
  }
  
  if (mo instanceof Bottles) {
    return this.isCollidingWithBottles(mo);
  }
  
  if (mo instanceof Chicken) {
    return this.isCollidingWithChicken(mo);
  }
  
  if (this instanceof Character) {
    return this.isCharacterCollidingWith(mo);
  }

  return this.isDefaultCollision(mo);
}

/**
 * Checks collision specifically with a Coins object.
 * @param {Coins} mo - The Coins object to check collision with.
 * @returns {boolean} True if colliding with the Coins object.
 */
isCollidingWithCoins(mo) {
  let hitboxOffsetX = mo.width * 0.55;
  let hitboxOffsetY = mo.height * 0.01;
  let hitboxWidth = mo.width * -0.1;
  let hitboxHeight = mo.height * 0.01;

  return (
    this.x + this.width > mo.x + hitboxOffsetX &&
    this.x < mo.x + hitboxOffsetX + hitboxWidth &&
    this.y + this.height > mo.y + hitboxOffsetY &&
    this.y < mo.y + hitboxOffsetY + hitboxHeight
  );
}

/**
 * Checks collision specifically with a Bottles object.
 * @param {Bottles} mo - The Bottles object to check collision with.
 * @returns {boolean} True if colliding with the Bottles object.
 */
isCollidingWithBottles(mo) {
  let hitboxOffsetX = mo.width * 0.8;
  let hitboxOffsetY = mo.height * 0.15;
  let hitboxWidth = mo.width * -0.7;
  let hitboxHeight = mo.height * 0.7;

  return (
    this.x + this.width > mo.x + hitboxOffsetX &&
    this.x < mo.x + hitboxOffsetX + hitboxWidth &&
    this.y + this.height > mo.y + hitboxOffsetY &&
    this.y < mo.y + hitboxOffsetY + hitboxHeight
  );
}

/**
 * Checks collision specifically with a Chicken object.
 * @param {Chicken} mo - The Chicken object to check collision with.
 * @returns {boolean} True if colliding with the Chicken object.
 */
isCollidingWithChicken(mo) {
  let hitboxOffsetX = mo.width * 0.5;
  let hitboxOffsetY = mo.height * 0.55;
  let hitboxWidth = mo.width * 0.1;
  let hitboxHeight = mo.height * 0.1;

  return (
    this.x + this.width > mo.x + hitboxOffsetX &&
    this.x < mo.x + hitboxOffsetX + hitboxWidth &&
    this.y + this.height > mo.y + hitboxOffsetY &&
    this.y < mo.y + hitboxOffsetY + hitboxHeight
  );
}

/**
 * Checks collision specifically for a Character object with another object.
 * @param {MovableObject} mo - The object to check collision with.
 * @returns {boolean} True if the Character is colliding with the object.
 */
isCharacterCollidingWith(mo) {
  let hitboxOffsetX = this.width * 0.6;
  let hitboxOffsetY = this.height * 0.15;
  let hitboxWidth = this.width * 0.6;
  let hitboxHeight = this.height * 0.7;

  return (
    this.x + hitboxOffsetX + hitboxWidth > mo.x &&
    this.x + hitboxOffsetX < mo.x + mo.width &&
    this.y + hitboxOffsetY + hitboxHeight > mo.y &&
    this.y + hitboxOffsetY < mo.y + mo.height
  );
}

/**
 * Checks for a default collision with another object when no specific case applies.
 * @param {MovableObject} mo - The object to check collision with.
 * @returns {boolean} True if there is a default collision with the object.
 */
isDefaultCollision(mo) {
  return (
    this.x + this.width > mo.x &&
    this.x < mo.x + mo.width &&
    this.y + this.height > mo.y &&
    this.y < mo.y + mo.height
  );
}


  /**
   * Increments the collected coin counter, capping at 100.
   */
  collectCoin() {
    this.collectedCoins++;
    if (this.collectedCoins > 100) {
      this.collectedCoins = 100;
    }
  }

  /**
   * Reduces the object's energy when hit, playing the hurt sound.
   */
  hit() {
    this.energy -= 2;
    this.hurt_sound.play();
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
    
  }

  /**
   * Increments the collected bottles counter, capping at 100.
   */
  collect() {
    this.collectedBottles += 1;
    if (this.collectedBottles > 100) {
      this.collectedBottles = 100;
    }
  }

  /**
   * Checks if the object is in a hurt state based on the last hit time.
   * @returns {boolean} True if the object is hurt.
   */
  isHurt() {
   
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1.5 && this.energy > 0;
  }

  /**
   * Moves the object to the right by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays an animation by cycling through an array of images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Initiates a jump by setting a positive vertical speed.
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Plays the dead animation by cycling through dead images.
   */
  playDeadAnimation() {
    if (this.deadAnimationIndex < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.deadAnimationIndex]];
      this.deadAnimationIndex++;
    } else {
      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
    }
  }
}
