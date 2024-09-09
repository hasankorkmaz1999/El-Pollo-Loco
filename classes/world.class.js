class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  healthBar = new HealthBar();  
  coinsBar = new CoinBar();    
  bottlesBar = new BottlesBar(); 
 

  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endbossBar = new EndbossStatusbar();
    this.draw();
    this.setWorld();
    this.level.enemies.forEach(enemy => {
      if (enemy instanceof Endboss) {
          enemy.world = this;  // Weise dem Endboss die World zu
      }
  });

    this.run();
    this.run2();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkthrowableObjects();
      
     
    }, 200);
  }

  run2() {
setInterval(() => {
  this.checkCollisionsWithBottles();
      this.checkCollisionsWithCoins();
  this.checkCollisionsWithChicken();
}, 50);

  }

 

  checkCollisionsWithChicken() {
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

  // Keine Kollisionserkennung für Endboss hier mehr
  
}




checkCollisions() {
  this.level.enemies.forEach((enemy) => {
    // Prüfen, ob das Huhn tot ist
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
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // Speichere den aktuellen Zustand
  this.ctx.save();
  
  // Verschiebe die Kamera für den scrollenden Effekt
  this.ctx.translate(this.camera_x, 0);
  
  // 1. Hintergrund zuerst
  this.addObjectsToMap(this.level.backgroundObjects);
  
  // 2. Wolken (falls sie über dem Hintergrund, aber unter den Spielobjekten sein sollen)
  this.addObjectsToMap(this.level.clouds);

  // 3. Münzen, Flaschen und andere interaktive Objekte
  this.addObjectsToMap(this.level.coins);
  this.addObjectsToMap(this.level.bottles);
  
  // 4. Verschiebe die Kamera zurück
  this.ctx.translate(-this.camera_x, 0);
  
  // 5. Statusleisten (immer im Vordergrund)
  this.addToMap(this.healthBar);
  this.addToMap(this.coinsBar);
  this.addToMap(this.bottlesBar);
  this.addToMap(this.endbossBar);


  // Verschiebe die Kamera wieder für die Spielfigur und Feinde
  this.ctx.translate(this.camera_x, 0);

  // 6. Charakter
  this.addToMap(this.character);

  // 7. Feinde
  this.addObjectsToMap(this.level.enemies);

  // 8. Wurfobjekte (über allem, was geworfen wird)
  this.addObjectsToMap(this.throwableObjects);
  
  // Restore den Zustand der Kamera
  this.ctx.restore();

  // Zeichne alles erneut in der nächsten Frame
  let self = this;
  requestAnimationFrame(function () {
      self.draw();
  });
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
