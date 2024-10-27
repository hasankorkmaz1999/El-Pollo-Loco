/**
 * Level configuration for level 1.
 * Defines the enemies, clouds, background objects, collectible bottles, and coins for this level.
 * 
 * @constant {Level} level1
 */
const level1 = new Level(
   
    /** 
     * Enemies present in the level.
     * Includes regular and small chickens as obstacles.
     * @type {Array<Chicken|smallChicken>}
     */
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
        new smallChicken(),
    ],

    /** 
     * Clouds present in the level for atmospheric effect.
     * @type {Array<Cloud>}
     */
    [
        new Cloud()
    ],

    /** 
     * Background elements defining the scenic layers in the level.
     * Each element includes its respective image path and position.
     * @type {Array<BackgroundObject>}
     */
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
    ],

    /** 
     * Bottles to be collected within the level.
     * @type {Array<Bottles>}
     */
    [
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles(),
        new Bottles()
    ],

    /** 
     * Coins available for collection in the level.
     * @type {Array<Coins>}
     */
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins()
    ]
);
