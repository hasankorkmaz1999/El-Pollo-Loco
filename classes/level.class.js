/**
 * The Level class defines the environment and objects within a game level,
 * including enemies, clouds, background elements, bottles, and coins.
 */
class Level {
  /** @type {Array} Holds the enemies present in the level */
  enemies;

  /** @type {Array} Holds the clouds within the level */
  clouds;

  /** @type {Array} Holds the background objects in the level */
  backgroundObjects;

  /** @type {Array} Holds the collectible bottles in the level */
  bottles;

  /** @type {Array} Holds the collectible coins in the level */
  coins;

  /** @type {number} The endpoint of the level along the X-axis */
  level_end_x = 2200;

  /**
   * Instantiates a new Level with specified enemies, clouds,
   * background objects, bottles, and coins.
   *
   * @constructor
   * @param {Array} enemies - The enemies present in the level.
   * @param {Array} clouds - The clouds in the level.
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {Array} bottles - The bottles that can be collected in the level.
   * @param {Array} coins - The coins that can be collected in the level.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
