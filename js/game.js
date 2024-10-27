/**
 * The main canvas element where the game is rendered.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * The main game world instance.
 * @type {World}
 */
let world;

/**
 * Tracks the current state of key presses.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Toggles the mute status of the game sounds.
 */
function toggleMute() {
  if (world) {
    world.toggleMute();
  }
}

/**
 * Initializes the game, setting up the canvas, initial level, and world.
 */
function init() {
  canvas = document.getElementById("canvas");
  const initialLevel = createLevel();
  world = new World(canvas, keyboard, initialLevel);
}

/**
 * Starts a new game, resetting relevant game states, UI elements, and muting.
 */
function startNewGame() {
  document.getElementById("you-win-image").style.display = "none";
  document.getElementById("you-lose-image").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("new-game-button").style.display = "none";

  world.isGameOver = false;
  keyboard = new Keyboard();

  const newLevel = createLevel();
  const isCurrentlyMuted = world.isMuted;

  world = new World(canvas, keyboard, newLevel);

  world.isMuted = isCurrentlyMuted;
  if (world.isMuted) {
    world.muteAllSounds();
    document.getElementById("mutebutton").textContent = "🔇";
  } else {
    document.getElementById("mutebutton").textContent = "🔊";
  }
  document.getElementById("mutebutton").style.display = "block";
}

/**
 * Exits the current game and returns to the start screen, hiding game UI elements.
 */
function quitGame() {
  document.getElementById("you-win-image").style.display = "none";
  document.getElementById("you-lose-image").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  if (document.getElementById("quit-game-button")) {
    document.getElementById("quit-game-button").style.display = "none";
  }
  if (document.getElementById("canvas")) {
    document.getElementById("canvas").style.display = "none";
  }
  if (document.getElementById("startscreen")) {
    document.getElementById("startscreen").style.display = "block";
  }
  if (document.getElementById("mutebutton")) {
    document.getElementById("mutebutton").style.display = "none";
  }
  if (document.getElementById("hud")) {
    document.getElementById("hud").style.display = "none";
  }
}

/**
 * Event listener for keydown events, updates `keyboard` state on key press.
 */
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (event.keyCode == 68) {
    keyboard.D = true;
  }
});

/**
 * Event listener for keyup events, updates `keyboard` state on key release.
 */
window.addEventListener("keyup", (event) => {
  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (event.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Creates a new level for the game with enemies, clouds, background objects, bottles, and coins.
 * @returns {Level} The newly created Level instance.
 */
function createLevel() {
  return new Level(
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
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObject("img/5_background/layers/air.png", 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObject("img/5_background/layers/air.png", 719),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 2
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 2
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 3
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 3
      ),
    ],
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
      new Bottles(),
    ],
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
      new Coins(),
    ]
  );
}
