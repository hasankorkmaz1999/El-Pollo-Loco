class Chicken extends MovableObject {
    y = 350;
    width = 65;
    height = 65;
    dead = false;
    energy = 100;
    isRemoved = false;  // Neue Eigenschaft hinzugefügt, um zu überprüfen, ob das Huhn bereits entfernt wurde

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
        if (!this.isRemoved) {  // Verhindert das doppelte Entfernen des Huhns
            this.dead = true;
            this.speed = 0;
            this.loadImage(this.IMAGES_DEAD[0]);  // Lade das Bild des toten Huhns
            this.stopAnimations();  // Stoppe die Animationen
            setTimeout(() => {
                this.removeFromWorld();  // Entferne das Huhn nach 1,5 Sekunden
            }, 1000);  // Warte 1,5 Sekunden, bevor das Huhn entfernt wird
        }
    }

    removeFromWorld() {
        if (this.world && this.world.level) {
            let index = this.world.level.enemies.indexOf(this);
            if (index > -1) {
                this.world.level.enemies.splice(index, 1);
                this.isRemoved = true;  // Markiere das Huhn als entfernt
            }
        } else {
            console.error('world oder level ist undefined in removeFromWorld');
        }
    }

    stopAnimations() {
        clearInterval(this.moveInterval);
        clearInterval(this.animationInterval);
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

    die() {
        if (!this.isRemoved) {  // Verhindert das doppelte Entfernen des kleinen Huhns
            this.dead = true;  
            this.speed = 0;    
            this.loadImage(this.IMAGES_DEAD[0]);  
            this.stopAnimations();  // Stoppe die Animationen
            setTimeout(() => {
                this.removeFromWorld();  // Entferne das kleine Huhn nach 1,5 Sekunden
            }, 1000);  // Warte 1,5 Sekunden
        }
    }
}
