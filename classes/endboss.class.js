class Endboss extends MovableObject {
    height = 350;
    width = 250;
    y = 80;
    energy = 100; // Energie für den Endboss
    isHurt = false;  // Zustand, ob der Endboss verletzt wurde
    isDeadEndboss = false;  // Zustand, ob der Endboss tot ist

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }
     
    animate() {
        this.animationInterval = setInterval(() => {
            if (this.isDeadEndboss) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);  // Reduziere das Intervall für Animationen
    }

    hit() {
        if (!this.isDeadEndboss) {
            this.energy -= 20;  // Endboss verliert 20 Energiepunkte
            this.isHurt = true;  // Setze den Endboss in den Hurt-Zustand

            // Aktualisiere die Endboss-Statusleiste, wenn er getroffen wird
            this.updateEndbossStatusbar();

            setTimeout(() => {
                this.isHurt = false;  // Nach einer kurzen Verzögerung verlässt der Endboss den Hurt-Zustand
            }, 500);  // Hurt-Animation dauert 0.5 Sekunden

            if (this.energy <= 0) {
                this.die();
            }
        }
    }

    die() {
        this.isDeadEndboss = true;  // Setze den Endboss in den Dead-Zustand
        // Lösche den Interval NICHT sofort, damit die Animation noch läuft.
        setTimeout(() => {
            clearInterval(this.animationInterval);  // Stoppe die Animationen erst nach der Dead-Animation
            this.removeFromWorld();  // Entferne den Endboss nach der Dead-Animation
        }, 2000);  // Lasse die Dead-Animation 2 Sekunden ablaufen, bevor der Endboss entfernt wird
    }

    removeFromWorld() {
        // Finde den Index des Endbosses in der Liste der Feinde (enemies)
        let index = this.world.level.enemies.indexOf(this);
        
        // Wenn der Endboss gefunden wurde, entferne ihn aus der Liste
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
            console.log('Endboss entfernt');  // Ausgabe zur Bestätigung
        }
    }
    

    updateEndbossStatusbar() {
        if (this.world.endbossBar) {
            let healthPercentage = (this.energy / 100) * 100;  // Berechne den aktuellen Prozentsatz der Energie
            this.world.endbossBar.setPercentage(healthPercentage);
        }
    }
    
}
