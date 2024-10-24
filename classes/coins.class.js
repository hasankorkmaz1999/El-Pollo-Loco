class Coins extends MovableObject {
    static lastX = 200; 
    width = 100;
    height = 100; 
    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        
        let minX = 200;  
        let maxX = 1500;  
        let minDistance = 300;  
        let randomOffset = Math.random() * 100;    
        
        
        this.x = Coins.lastX + minDistance + randomOffset;

        
        if (this.x > maxX) {
            this.x = minX + Math.random() * (maxX - minX);  
        }
        
        this.y = 100 + Math.random() * 100; 
       
        this.animate();

       
        Coins.lastX = this.x;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 150);
    }
}
