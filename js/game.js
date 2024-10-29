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
 * Starts a new game, resetting relevant game states, UI elements, and mute status.
 */
function startNewGame() {
  hideGameOverScreens();
  resetGameState();
  initializeNewWorld();
  updateMuteButton();
}

/**
 * Hides game-over screens and overlay elements in preparation for a new game.
 */
function hideGameOverScreens() {
  document.getElementById("you-win-image").style.display = "none";
  document.getElementById("you-lose-image").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("new-game-button").style.display = "none";
}

/**
 * Resets the game state, including setting `isGameOver` to false and reinitializing the keyboard controls.
 */
function resetGameState() {
  world.isGameOver = false;
  keyboard = new Keyboard();
}

/**
 * Initializes a new level and world, preserving the current mute status.
 */
function initializeNewWorld() {
  const newLevel = createLevel();
  const isCurrentlyMuted = world.isMuted;
  world = new World(canvas, keyboard, newLevel);
  world.isMuted = isCurrentlyMuted;
  if (world.isMuted) {
    world.muteAllSounds();
  }
}

/**
 * Updates the mute button display based on the current mute status of the world.
 */
function updateMuteButton() {
  document.getElementById("mutebutton").textContent = world.isMuted
    ? "🔇"
    : "🔊";
  document.getElementById("mutebutton").style.display = "block";
}

/**
 * Exits the current game and returns to the start screen, hiding game UI elements.
 */
/**
 * Quits the game, hides game elements, and returns to the start screen.
 */
function quitGame() {
  hideGameOverScreens();
  hideGameUIElements();
  showStartScreen();
}

/**
 * Hides the game-over and overlay images, if they are displayed.
 */
function hideGameOverScreens() {
  document.getElementById("you-win-image").style.display = "none";
  document.getElementById("you-lose-image").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

/**
 * Hides various UI elements related to the game, such as the canvas, quit button, mute button, and HUD.
 */
function hideGameUIElements() {
  hideElementById("quit-game-button");
  hideElementById("canvas");
  hideElementById("mutebutton");
  hideElementById("hud");
}

/**
 * Shows the start screen element, allowing the player to start a new game.
 */
function showStartScreen() {
  const startScreen = document.getElementById("startscreen");
  if (startScreen) {
    startScreen.style.display = "block";
  }
}

/**
 * Helper function to hide an element by its ID, if it exists in the DOM.
 * @param {string} elementId - The ID of the element to hide.
 */
function hideElementById(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "none";
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
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png",-719),
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
      new BackgroundObject("img/5_background/layers/3_third_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/2_second_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/1_first_layer/1.png",719 * 2),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/2_second_layer/2.png",719 * 3),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png",719 * 3),
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
