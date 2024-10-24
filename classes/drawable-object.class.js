class DrawableObject {
 
    img;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
     
  }
  
  


  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
}

    drawFrame(ctx) {
      if (this instanceof Character) {
         
          let hitboxOffsetX = this.width * 0.15;
          let hitboxOffsetY = this.height * 0.4;
          let hitboxWidth = this.width * 0.7;
          let hitboxHeight = this.height * 0.55;
          
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.strokeStyle = "red";  
          ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
          
      } else if (this instanceof Coins) {
         
          let hitboxOffsetX = this.width * 0.3;
          let hitboxOffsetY = this.height * 0.3;
          let hitboxWidth = this.width * 0.4;
          let hitboxHeight = this.height * 0.4;
          
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.strokeStyle = "blue";  
          ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
        
      } else if (this instanceof Bottles) {
         
          let hitboxOffsetX = this.width * 0.3;
          let hitboxOffsetY = this.height * 0.15;
          let hitboxWidth = this.width * 0.45;
          let hitboxHeight = this.height * 0.7;
          
          ctx.beginPath();
          ctx.lineWidth = "2";
          ctx.strokeStyle = "green";  
          ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
         
      }   else if (this instanceof Chicken) {
      
        let hitboxOffsetX = this.width * 0.1;
        let hitboxOffsetY = this.height * 0.1;
        let hitboxWidth = this.width * 0.9;
        let hitboxHeight = this.height * 0.9;
        
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = "orange";  
        ctx.rect(this.x + hitboxOffsetX, this.y + hitboxOffsetY, hitboxWidth, hitboxHeight);
       
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