/**
 * Represents a bottle object in the game, which can be collected by the character.
 * Inherits from DrawableObject.
 */
class Bottles extends DrawableObject {
    /** @type {number} The y-coordinate of the bottle's position on the ground. */
    y = 350;
  
    /** @type {number} Width of the bottle. */
    width = 70;
  
    /** @type {number} Height of the bottle. */
    height = 70;
  
    /** 
     * @type {string[]} Paths to the different bottle images for variety.
     * Bottles can appear in multiple forms, randomly selected at initialization.
     */
    IMAGES_BOTTLES = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
  
    /**
     * Initializes a new bottle object with a random image and random x-coordinate.
     */
    constructor() {
      super();
      const randomBottleImage =
        this.IMAGES_BOTTLES[
          Math.floor(Math.random() * this.IMAGES_BOTTLES.length)
        ];
      this.loadImage(randomBottleImage);
      this.x = 200 + Math.random() * 2000;
    }
  }
  