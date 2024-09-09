class StatusBar extends DrawableObject {
  percentage = 100;
  constructor() {
    super();
   
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];

  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
        return 0;
    }
  }

 

}

  


  class HealthBar extends StatusBar {
    IMAGES = [
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
      "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png"
    ];
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 10;
      this.y = -10;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
    }
  }
  

  class CoinBar extends StatusBar {

    IMAGES = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
  
    ];
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 10;
      this.y = 35;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }

    setPercentage(percentage) {
      
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
  }


  }

  
  class BottlesBar extends StatusBar {
    IMAGES = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
  
    collectedBottles = 0;  // Anzahl der gesammelten Flaschen
  
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 10;
      this.y = 85;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    setBottlesCollected(collectedBottles, totalBottles) {
      this.collectedBottles = collectedBottles;  // Speichere die Anzahl der gesammelten Flaschen
  
      // Berechne den Prozentsatz basierend auf der Anzahl der gesammelten Flaschen
      this.percentage = (collectedBottles / totalBottles) * 100;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    // Zeichne die BottlesBar und den Flaschenzähler
    draw(ctx) {
      // Zeichne die Statusbar (Bilder)
      super.draw(ctx);
  
      // Zeichne den Text für die Anzahl der Flaschen in die Statusleiste hinein
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";  // Text zentriert ausrichten
      ctx.fillText(`x ${this.collectedBottles}`, this.x + this.width / 2, this.y + this.height / 1.25);  // Text in die Mitte der Statusbar platzieren
    }
  }


  class EndbossStatusbar extends StatusBar {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = -3;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);  // Statusbar beginnt bei 100 %
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 4;  // Index 4 für 100% (letztes Bild im Array)
        } else if (this.percentage >= 80) {
            return 3;
        } else if (this.percentage >= 60) {
            return 2;
        } else if (this.percentage >= 40) {
            return 1;
        } else if (this.percentage >= 20) {
            return 0;
        } else {
            return 0;
        }
    }
}



 

 

 

  

 



