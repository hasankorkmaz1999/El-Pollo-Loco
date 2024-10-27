document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const startscreen = document.getElementById("startscreen");
  const canvas = document.getElementById("canvas");
  const hud = document.getElementById("hud");
  const mutebutton = document.getElementById("mutebutton");

  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

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

  function hideStartScreen() {
    startscreen.style.display = "none";
    canvas.style.display = "block";
  }

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
        }} } else {
      startNewGame();
      if (isTouchDevice()) {
        hud.style.display = "block";
      }}}
});

function howToPlay() {
  let modal = document.getElementById("howtoplay-modal");
  modal.style.display = "block";
}

function closeHowToPlay() {
  let modal = document.getElementById("howtoplay-modal");
  modal.style.display = "none";
}

function showImprint() {
  let modal = document.getElementById("imprint-modal");
  modal.style.display = "block";
}

function closeImprint() {
  let modal = document.getElementById("imprint-modal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  let howToPlayModal = document.getElementById("howtoplay-modal");
  let imprintModal = document.getElementById("imprint-modal");

  if (event.target == howToPlayModal) {
    howToPlayModal.style.display = "none";
  } else if (event.target == imprintModal) {
    imprintModal.style.display = "none";
  }
};

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
