/**
 * Represents a background object in the game, such as scenery or static elements
 * that contribute to the visual background. Inherits from MovableObject.
 */
class BackgroundObject extends MovableObject {
    /** @type {number} Height of the background object. */
    height = 480;
  
    /** @type {number} Width of the background object. */
    width = 720;
  
    /**
     * Initializes a new background object with a specified image and x-coordinate.
     * Positions the object vertically at ground level based on its height.
     * 
     * @param {string} imagePath - The path to the image representing the background object.
     * @param {number} x - The x-coordinate for the background object's position.
     */
    constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 480 - this.height; // Positions the object at ground level
    }
  }
  