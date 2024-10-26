class Bottles extends DrawableObject {
  y = 350;
  width = 70;
  height = 70;

  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

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
