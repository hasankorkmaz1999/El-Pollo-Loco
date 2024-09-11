class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  energy = 150;
  healthBar = new HealthBar();  
  coinsBar = new CoinBar();    
  bottlesBar = new BottlesBar(); 
  endboss = new Endboss();

  
  isGameOver = false;
  

  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endbossBar = new EndbossStatusbar();
    this.endboss.world = this;
    this.level.enemies.forEach(enemy => {
      enemy.world = this;
    });

    this.draw();
    this.setWorld();
    this.run();
    this.run2();

   
  }


 

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.moveInterval = setInterval(() => {
      if (!this.isGameOver) {
        this.checkCollisions();
        this.checkthrowableObjects();
        this.checkEndbossCollision();

      
      }
    }, 200);
  }

  run2() {
    this.animationInterval = setInterval(() => {
      if (!this.isGameOver) {
        this.checkCollisionsWithBottles();
        this.checkCollisionsWithCoins();
        this.checkCollisionsWithChickenOnJump();
       
      }
    }, 50);
  }

  checkEndbossCollision() {
    let endbossHitbox = this.endboss.getHitbox();
    
    
    if (this.character.x + this.character.width > endbossHitbox.x &&
        this.character.x < endbossHitbox.x + endbossHitbox.width &&
        this.character.y + this.character.height > endbossHitbox.y &&
        this.character.y < endbossHitbox.y + endbossHitbox.height) {

        let damage = 3;
        this.character.hit(damage);
        this.healthBar.setPercentage(this.character.energy);
    }
}


 

  checkCollisionsWithChickenOnJump() {
    this.level.enemies.forEach((chicken) => {
        if (this.character.isJumpingOn(chicken)) {
            console.log("Jumped on chicken!");
            chicken.die();  
        }
    });
}


  

checkthrowableObjects() {
  if (this.keyboard.D && this.character.collectedBottles > 0) {
    let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 80, this);
    this.throwableObjects.push(bottle);
    this.character.collectedBottles--;

    let totalBottles = 10; 
    let percentage = (this.character.collectedBottles / totalBottles) * 100;
    this.bottlesBar.setBottlesCollected(this.character.collectedBottles, totalBottles); 
  }

}




checkCollisions() {
  this.level.enemies.forEach((enemy) => {
  
    if (!enemy.isDead() && this.character.isColliding(enemy)) {
      this.character.hit();
      this.healthBar.setPercentage(this.character.energy);
    }
  });
}

  checkCollisionsWithBottles() {
    let totalBottles = 10;  
    this.level.bottles = this.level.bottles.filter((bottle) => {
        if (this.character.isColliding(bottle)) {
          
            this.character.collect(); 
            
            
            this.bottlesBar.setBottlesCollected(this.character.collectedBottles, totalBottles);  
            
            return false;  
        }
        return true;  
    });
}


checkCollisionsWithCoins() {
  let totalCoins = 10; 
  this.level.coins = this.level.coins.filter((coin) => {
      if (this.character.isColliding(coin)) {
        
          this.character.collectCoin();  

          
          let percentage = (this.character.collectedCoins / totalCoins) * 100;
          this.coinsBar.setPercentage(percentage);  

          return false;  
      }
      return true;  
  });
}


  

draw() {

  if (!this.isGameOver) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

   
   
    
    this.ctx.save();
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.coinsBar);
    this.addToMap(this.bottlesBar);
    this.addToMap(this.endbossBar);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.endboss);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.restore();
  }

 
  if (this.isGameOver) {
    if (this.character.isDead()) {
      document.getElementById('you-lose-image').style.display = 'block';
      document.getElementById('you-win-image').style.display = 'none';
    } else if (this.endboss.isDeadEndboss) {
      document.getElementById('you-win-image').style.display = 'block';
      document.getElementById('you-lose-image').style.display = 'none'; 
    }

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('new-game-button').style.display = 'block';
  }

  
  if (!this.isGameOver) {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}






  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }



  
}
