class Chicken extends MovableObject{
    y = 350;
    width = 65;
    height = 65;
    dead = false;
    energy = 100;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
       

        this.loadImages(this.IMAGES_WALKING);

        this.x = 700 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


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

    
   


    isDead() {
        return this.energy <= 0 || this.dead;  // Gibt true zurück, wenn das Huhn tot ist
      }
    
      die() {
        this.dead = true;
        this.speed = 0;
        this.loadImage(this.IMAGES_DEAD[0]);  // Lade das Bild des toten Huhns
      }

  

   
}

class smallChicken extends Chicken {
   height = 45;
   width = 45;
   y = 370;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];



    
    constructor() {
        super();
       

        this.loadImages(this.IMAGES_WALKING);

        this.x = 700 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

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

    
    stopAnimations() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
    }


    die() {
        this.dead = true;  
        this.speed = 0;    
        this.loadImage(this.IMAGES_DEAD[0]);  
    }
}