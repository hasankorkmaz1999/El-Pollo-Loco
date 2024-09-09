class DrawableObject {
 
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
     
  }
  
  


  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);  // Verwende die festen Werte width und height
}

    drawFrame(ctx) {
      if (this instanceof Character) {
          // Individuelle Hitbox für den Charakter
          let hitboxOffsetX = this.width * 0.15;
          let hitboxOffsetY = this.height * 0.4;
          let hitboxWidth = this.width * 0.7;
          let hitboxHeight = this.height * 0.55;
          
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.strokeStyle = "red";  // Farbe für den Charakter
          ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
          ctx.stroke();
      } else if (this instanceof Coins) {
          // Individuelle Hitbox für Münzen
          let hitboxOffsetX = this.width * 0.3;
          let hitboxOffsetY = this.height * 0.3;
          let hitboxWidth = this.width * 0.4;
          let hitboxHeight = this.height * 0.4;
          
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.strokeStyle = "blue";  // Farbe für Münzen
          ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
          ctx.stroke();
      } else if (this instanceof Bottles) {
          // Individuelle Hitbox für Flaschen
          let hitboxOffsetX = this.width * 0.3;
          let hitboxOffsetY = this.height * 0.15;
          let hitboxWidth = this.width * 0.45;
          let hitboxHeight = this.height * 0.7;
          
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.strokeStyle = "green";  // Farbe für Flaschen
          ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
          ctx.stroke();
      }
  }
  
  
  
  
  

      loadImages(arr) {
        arr.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
      }

    

      
}