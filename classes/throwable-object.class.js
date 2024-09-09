class ThrowableObject extends MovableObject{

    IMAGES_THROWN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    splashPlayed = false; // Um sicherzustellen, dass die Splash-Animation nur einmal abgespielt wird
    world;  // Füge die world-Eigenschaft hinzu

    constructor(x, y, world){  // Füge world als Parameter hinzu
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_THROWN);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 50;
        this.world = world;  // Weise die world zu
        this.throw();
        this.rotation();
    }

    throw () {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
           this.x += 10;
           this.checkGroundCollision();
           this.checkChickenCollision();
           this. checkEndbossCollision() ;
        }, 25);
    }

    rotation () {
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
            if (!(enemy instanceof Endboss) && this.isColliding(enemy) && !this.splashPlayed) {
                this.playSplashAnimation();
                if (typeof enemy.die === 'function') {
                    enemy.die();  // Beispiel: Schaden am Chicken
                }
            }
        });
    }
    

    checkEndbossCollision() {
        const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
    
        if (endboss && this.isColliding(endboss) && !this.splashPlayed) {
            this.playSplashAnimation();
            endboss.hit();  // Endboss erleidet Schaden
        }
    }
    
    

    playSplashAnimation() {
        if (!this.splashPlayed) {  // Sicherstellen, dass die Animation nur einmal abgespielt wird
            this.splashPlayed = true;
            clearInterval(this.throwInterval);  // Stoppe die Bewegung
            clearInterval(this.rotationInterval);  // Stoppe die Rotation
            this.playAnimation(this.IMAGES_SPLASH);
            setTimeout(() => {
                this.remove();  // Entferne das Objekt nach der Animation
            }, 600);  // Die Dauer der Splash-Animation
        }
    }
    

    remove() {
        let index = this.world.throwableObjects.indexOf(this);
        if (index > -1) {
            this.world.throwableObjects.splice(index, 1);
        }
    }

    

}
