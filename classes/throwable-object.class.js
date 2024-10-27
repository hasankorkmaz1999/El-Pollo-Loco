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
    this.splash_sound.volume = 0.9;
    this.splash_sound.volume = 0.9;
    if (this.world.isMuted) {
      this.splash_sound.volume = 0;
    }
  }

  toggleMute(isMuted) {
    this.splash_sound.volume = isMuted ? 0 : 0.9;
  }

  adjustDirection() {
    if (this.world.character.otherDirection) {
      this.throwDirection = -10;
    } else {
      this.throwDirection = 10;
    }
  }

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

  rotation() {
    this.rotationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_THROWN);
    }, 80);
  }

  checkGroundCollision() {
    if (this.y >= 350 && !this.splashPlayed) {
      this.playSplashAnimation();
    }
  }

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

  checkEndbossCollision() {
    if (this.world.endboss) {
      const endbossHitbox = {
        x: this.world.endboss.x + this.world.endboss.width * 0.15,
        y: this.world.endboss.y + this.world.endboss.height * 0.1,
        width: this.world.endboss.width * 0.7,
        height: this.world.endboss.height * 0.9,
      };
      const bottleHitbox = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };
      if (
        bottleHitbox.x + bottleHitbox.width > endbossHitbox.x &&
        bottleHitbox.x < endbossHitbox.x + endbossHitbox.width &&
        bottleHitbox.y + bottleHitbox.height > endbossHitbox.y &&
        bottleHitbox.y < endbossHitbox.y + endbossHitbox.height
      ) {
        this.playSplashAnimation();
        this.world.endboss.hitEndboss();
      }
    }
  }

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

  remove() {
    let index = this.world.throwableObjects.indexOf(this);
    if (index > -1) {
      this.world.throwableObjects.splice(index, 1);
    }}
  static startCooldown() {
    ThrowableObject.cooldownActive = true;
    setTimeout(() => {
      ThrowableObject.cooldownActive = false;
    }, 700);
  }
  static canThrow() {
    return !ThrowableObject.cooldownActive;
  }
}
