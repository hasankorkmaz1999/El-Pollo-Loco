class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  deadAnimationIndex = 0; 
  collectedBottles = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveground() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveground() {
    if (this instanceof ThrowableObject) {
        return true;
    } else {
    return this.y < 125;
  }}

  

  isColliding(mo) {
    let hitboxOffsetX = mo.width * 0.7;  // Reduziere die Breite der Hitbox um 20%
    let hitboxOffsetY = mo.height * 0.7; // Reduziere die Höhe der Hitbox um 20%
    let hitboxWidth = mo.width * 0.6;    // Verbleibende 60% als tatsächliche Hitbox-Breite
    let hitboxHeight = mo.height * 0.6;  // Verbleibende 60% als tatsächliche Hitbox-Höhe

    return (
        this.x + this.width > mo.x + hitboxOffsetX &&       
        this.x < mo.x + hitboxOffsetX + hitboxWidth &&         
        this.y + this.height > mo.y + hitboxOffsetY &&      
        this.y < mo.y + hitboxOffsetY + hitboxHeight           
    );
}




  

  hit() {
    this.energy -= 2;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  collect() {
    
    this.collectedBottles += 1; 

    if (this.collectedBottles > 100) {
      this.collectedBottles = 100;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; //  Difference in s

    return timepassed < 1.5;
  }

 

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 30;
  }

  playDeadAnimation() {
    if (this.deadAnimationIndex < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.deadAnimationIndex]];  
      this.deadAnimationIndex++;  
    } else {
      this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];  
    }
  }

}
