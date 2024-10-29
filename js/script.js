document.addEventListener("DOMContentLoaded", () => {
  /**
   * Button to start the game.
   * @type {HTMLElement}
   */
  const startButton = document.getElementById("start-button");

  /**
   * Start screen element, shown initially.
   * @type {HTMLElement}
   */
  const startscreen = document.getElementById("startscreen");

  /**
   * Canvas element for game rendering.
   * @type {HTMLCanvasElement}
   */
  const canvas = document.getElementById("canvas");

  /**
   * HUD element that shows game information.
   * @type {HTMLElement}
   */
  const hud = document.getElementById("hud");

  /**
   * Mute button element to toggle sound.
   * @type {HTMLElement}
   */
  const mutebutton = document.getElementById("mutebutton");

  /**
   * Checks if the device is a touch device.
   * @returns {boolean} True if the device has touch support, false otherwise.
   */
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  /**
   * Boolean indicating whether the game has started.
   * @type {boolean}
   */
  let gameStarted = false;

  startButton.addEventListener("click", () => {
    hideStartScreen();
    startGame();
  });

  mutebutton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMute();
    mutebutton.blur();
  });

  mutebutton.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.code === "Enter") {
      event.preventDefault();
    }
  });

  /**
   * Hides the start screen and shows the game canvas.
   */
  function hideStartScreen() {
    startscreen.style.display = "none";
    canvas.style.display = "block";
  }

  /**
   * Initializes and starts the game if it has not already started.
   * Restarts the game if already started.
   */
  function startGame() {
    if (!gameStarted) {
      init();
      gameStarted = true;
      mutebutton.style.display = "block";
      if (window.innerHeight > window.innerWidth) {
        hud.style.display = "none";
      } else {
        if (isTouchDevice()) {
          hud.style.display = "block";
        } else {
          hud.style.display = "none";
        }
      }
    } else {
      startNewGame();
      if (isTouchDevice()) {
        hud.style.display = "block";
      }
    }
  }
});

/**
 * Displays the "How to Play" modal.
 */
function howToPlay() {
  let modal = document.getElementById("howtoplay-modal");
  modal.style.display = "block";
}

/**
 * Closes the "How to Play" modal.
 */
function closeHowToPlay() {
  let modal = document.getElementById("howtoplay-modal");
  modal.style.display = "none";
}

/**
 * Displays the imprint (legal information) modal.
 */
function showImprint() {
  let modal = document.getElementById("imprint-modal");
  modal.style.display = "block";
}

/**
 * Closes the imprint modal.
 */
function closeImprint() {
  let modal = document.getElementById("imprint-modal");
  modal.style.display = "none";
}

/**
 * Closes the modals if clicked outside the modal content area.
 * @param {MouseEvent} event - The mouse click event.
 */
window.onclick = function (event) {
  let howToPlayModal = document.getElementById("howtoplay-modal");
  let imprintModal = document.getElementById("imprint-modal");

  if (event.target == howToPlayModal) {
    howToPlayModal.style.display = "none";
  } else if (event.target == imprintModal) {
    imprintModal.style.display = "none";
  }
};

/**
 * Checks the screen orientation and adjusts the game container and rotate message display accordingly.
 */
function checkScreenOrientation() {
  const rotateMessage = document.getElementById("rotate-message");
  const gamecontainer = document.getElementById("gamecontainer");
  if (window.innerHeight > window.innerWidth) {
    rotateMessage.style.display = "flex";
    gamecontainer.style.display = "none";
  } else {
    gameStarted = true;
    rotateMessage.style.display = "none";
    gamecontainer.style.display = "flex";
  }
}

checkScreenOrientation();
window.addEventListener("resize", checkScreenOrientation);
window.addEventListener("orientationchange", checkScreenOrientation);
