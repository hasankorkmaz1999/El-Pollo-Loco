class Endboss extends MovableObject {
    height = 350;
    width = 250;
    y = 80;
    energy = 100; // Energie für den Endboss
    isHurt = false;  // Zustand, ob der Endboss verletzt wurde
    isDeadEndboss = false;  // Zustand, ob der Endboss tot ist
    isAttacking = false;  // Zustand, ob der Endboss gerade angreift
    speed = 30.95;
    attackCooldown = 3000;  // Cooldown zwischen Angriffen in Millisekunden

    hitboxOffsetX = 70; // Manuelle Offset-Werte
    hitboxOffsetY = 50;
    hitboxWidth = 10;
    hitboxHeight = 340;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);

        this.x = 2500;
        this.animate();
        this.attack();  
    }

    isInSight() {
        if (this.world && this.world.character) {
            let distanceToCharacter = this.world.character.x - this.x;
            return distanceToCharacter < 500 && distanceToCharacter > -1000;
        }
        return false;  
    }

    getHitbox() {
        return {
            x: this.x + this.hitboxOffsetX,
            y: this.y + this.hitboxOffsetY,
            width: this.hitboxWidth,
            height: this.hitboxHeight
        };
    }

    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDeadEndboss) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.playAttackAnimation();  
            } else if (this.isInSight()) {
                this.walk();
            } else {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 250);
    }

    walk() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x -= this.speed;
    }
   
    attack() {
        setInterval(() => {
            if (this.isInSight() && !this.isDeadEndboss) {
                this.isAttacking = true;
                setTimeout(() => {
                    this.isAttacking = false;  
                }, 2000);  
            }
        }, this.attackCooldown);  
    }

    playAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);  
    }

    hitEndboss() {
        if (!this.isDeadEndboss) {
            this.energy -= 15;  
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
    
    die() {
        this.isDeadEndboss = true;  
        setTimeout(() => {
            clearInterval(this.animationInterval);  
            this.removeFromWorld(); 
            this.world.isGameOver = true;
        }, 2000);  
    }

    updateEndbossStatusbar() {
        if (this.world.endbossBar) {
            let healthPercentage = (this.energy / 100) * 100;  
            this.world.endbossBar.setPercentage(healthPercentage);
        }
    }

    removeFromWorld() {
        this.isDeadEndboss = true;
        console.log('Endboss aus der Welt entfernt');
    }
}
