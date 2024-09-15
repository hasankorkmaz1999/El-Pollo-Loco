document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const startscreen = document.getElementById('startscreen');
    const canvas = document.getElementById('canvas');
  
    let gameStarted = false; // Variable zum Überprüfen, ob das Spiel bereits gestartet wurde
  
    startButton.addEventListener('click', () => {
      // Verstecke den Startbildschirm und zeige das Spiel
      hideStartScreen();
      startGame();
    });
  
    function hideStartScreen() {
      startscreen.style.display = 'none';
      canvas.style.display = 'block'; // Zeige das Canvas
    }
  
    function startGame() {
      if (!gameStarted) {
        // Starte das Spiel nur, wenn es noch nicht gestartet wurde
        init();
        gameStarted = true; // Markiere das Spiel als gestartet
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
    quitGameButton.style.display = 'none';  // Verstecke den Quit-Button

    // Zeige den Startbildschirm wieder an
    startscreen.style.display = 'block';  // Zeige den Startbildschirm an

    // Verstecke das Canvas, damit es nicht im Hintergrund sichtbar ist
    canvas.style.display = 'none';
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



function checkScreenOrientation() {
  const rotateMessage = document.getElementById('rotate-message');
  if (window.innerHeight > window.innerWidth) { // Höhe ist größer als Breite (Portrait-Modus)
      rotateMessage.style.display = 'block';
      // Verstecke andere Elemente
      document.getElementById('startscreen').style.display = 'none';
      document.querySelector('canvas').style.display = 'none';
      
  } else {
      rotateMessage.style.display = 'none';
      // Zeige andere Elemente an
      document.getElementById('startscreen').style.display = 'block';
     
    
  }
}

// Überprüfe die Bildschirmgröße beim Laden der Seite
checkScreenOrientation();

// Überprüfe die Bildschirmgröße bei Größenänderung
window.addEventListener('resize', checkScreenOrientation);
window.addEventListener('orientationchange', checkScreenOrientation);


