class Coins extends MovableObject {
    static lastX = 200; 
    width = 100;
    height = 100; // Startpunkt der ersten Münze
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        
        let minX = 200;  // Mindestwert der X-Position
        let maxX = 1500;  // Maximalwert der X-Position
        let minDistance = 300;  // Mindestabstand zwischen den Münzen
        let randomOffset = Math.random() * 100;  // Zufälliger Versatz, um die Münzen unterschiedlich zu platzieren
        
        // Berechne die neue X-Position basierend auf der letzten Position und dem Mindestabstand
        this.x = Coins.lastX + minDistance + randomOffset;

        // Begrenze die X-Position innerhalb des festgelegten Bereichs
        if (this.x > maxX) {
            this.x = minX + Math.random() * (maxX - minX);  // Zufällige Position innerhalb des erlaubten Bereichs, wenn der Maximalwert überschritten wird
        }
        
        this.y = 100 + Math.random() * 100;  // Y-Position kannst du ebenfalls anpassen
       
        this.animate();

        // Aktualisiere die letzte X-Position für die nächste Münze
        Coins.lastX = this.x;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 150);
    }
}
