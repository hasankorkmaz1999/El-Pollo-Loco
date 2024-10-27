/**
 * Represents an object that can be drawn on the canvas.
 * This base class handles loading images and drawing them on the screen.
 */
class DrawableObject {
  /** @type {HTMLImageElement} Holds the current image object to be displayed. */
  img;
  
  /** 
   * @type {Object} Cache of preloaded images, with the image paths as keys.
   * Stores each loaded image for efficient reuse.
   */
  imageCache = {};
  
  /** @type {number} Tracks the index of the current image for animations. */
  currentImage = 0;

  /**
   * Loads a single image from the specified path and assigns it to `this.img`.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's image on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context on which to draw the image.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Preloads multiple images into the image cache for quicker access.
   * @param {string[]} arr - An array of image paths to be loaded into the cache.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
