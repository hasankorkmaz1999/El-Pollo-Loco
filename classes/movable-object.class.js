class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
 
  lastHit = 0;
  deadAnimationIndex = 0; 
  collectedBottles = 0;
  collectedCoins = 0;

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
    return this.y < 215;
  }}

  

  isColliding(mo) {
    // Kollisions-Hitbox für Münzen
    if (mo instanceof Coins) {  
        let hitboxOffsetX = mo.width * 0.55;  // Gleiche Werte wie in drawFrame
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

    // Kollisions-Hitbox für Flaschen
    if (mo instanceof Bottles) {
        let hitboxOffsetX = mo.width * 0.8;  // Gleiche Werte wie in drawFrame
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

    if (mo instanceof Chicken) {
      let hitboxOffsetX = mo.width * 0.5;  // Passe den Wert je nach gewünschter Hitbox an
      let hitboxOffsetY = mo.height * 0.55;
      let hitboxWidth = mo.width * 0.1;    // Schmalere Hitbox
      let hitboxHeight = mo.height * 0.1;  // Schmalere Hitbox

      return (
          this.x + this.width > mo.x + hitboxOffsetX &&       
          this.x < mo.x + hitboxOffsetX + hitboxWidth &&         
          this.y + this.height > mo.y + hitboxOffsetY &&      
          this.y < mo.y + hitboxOffsetY + hitboxHeight
      );
  }

    // Kollisions-Hitbox für den Charakter
    if (this instanceof Character) {
      let hitboxOffsetX = this.width * 0.6;  // Symmetrische Anpassung für den Charakter
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

   
    // Standard-Kollisionsabfrage für alle anderen Objekte
    return (
        this.x + this.width > mo.x &&       
        this.x < mo.x + mo.width &&         
        this.y + this.height > mo.y &&      
        this.y < mo.y + mo.height
    );
}












collectCoin() {
  this.collectedCoins++;  
  if (this.collectedCoins > 100) {
      this.collectedCoins = 100;  
  }
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
    let timepassed = new Date().getTime() - this.lastHit; 
    timepassed = timepassed / 1000; 

    return timepassed < 1.5 && this.energy > 0;   
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
    this.speedY = 25;
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
