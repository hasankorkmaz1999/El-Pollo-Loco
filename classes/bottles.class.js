class Bottles  extends DrawableObject{

    y = 360;
    width = 70;
    height = 70;
    x = 250;

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    
    
     ];

    constructor() {
    super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = 200 + Math.random() * 1500;
    this.animate();
    
    }

    animate() {
       
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);

    },150);
    }
 



}