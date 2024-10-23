document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const startscreen = document.getElementById('startscreen');
  const canvas = document.getElementById('canvas');

  let gameStarted = false; // Variable zum Überprüfen, ob das Spiel bereits gestartet wurde

  startButton.addEventListener('click', () => {
      // Verstecke den Startbildschirm und zeige das Canvas
      hideStartScreen();
      startGame();
  });

  function hideStartScreen() {
    startscreen.style.display = 'none'; // Verstecke den Startbildschirm
    canvas.style.display = 'block';     // Mache das Canvas sichtbar
  }

  function startGame() {
    if (!gameStarted) {
      // Starte das Spiel nur, wenn es noch nicht gestartet wurde
      init();
      gameStarted = true;
      document.getElementById('mute-button').style.display = 'block' // Markiere das Spiel als gestartet
    } else {
      // Neustart des Spiels, wenn es bereits gestartet wurde
      startNewGame();
    }
  }
});

  
  

  let quitGameButton = document.getElementById('quit-game-button'); 

  function quitGame() {
    // Verstecke alle Overlays (You Win/You Lose und Quit-Button)
    document.getElementById('you-win-image').style.display = 'none';
    document.getElementById('you-lose-image').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  
    // Verstecke das Canvas komplett (nicht nur visibility)
    document.getElementById('canvas').style.display = 'none';
    
    // Zeige den Startbildschirm wieder an
    document.getElementById('startscreen').style.display = 'flex'; // Stelle sicher, dass der Startscreen angezeigt wird
}

 

function howToPlay() {
  let modal = document.getElementById('howtoplay-modal');
  modal.style.display = 'block'; // Zeige das "How to Play"-Modal an
}

function closeHowToPlay() {
  let modal = document.getElementById('howtoplay-modal');
  modal.style.display = 'none'; // Verstecke das "How to Play"-Modal
}

function showImprint() {
  let modal = document.getElementById('imprint-modal');
  modal.style.display = 'block'; // Zeige das Imprint-Modal an
}

function closeImprint() {
  let modal = document.getElementById('imprint-modal');
  modal.style.display = 'none'; // Verstecke das Imprint-Modal
}

// Schließe das Modal, wenn der Benutzer außerhalb des Modals klickt
window.onclick = function(event) {
  let howToPlayModal = document.getElementById('howtoplay-modal');
  let imprintModal = document.getElementById('imprint-modal');
  
  if (event.target == howToPlayModal) {
      howToPlayModal.style.display = 'none';
  } else if (event.target == imprintModal) {
      imprintModal.style.display = 'none';
  }
}



