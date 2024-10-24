document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
  const startscreen = document.getElementById('startscreen');
  const canvas = document.getElementById('canvas');
  const hud = document.getElementById('hud');
  const mutebutton = document.getElementById('mutebutton');
  
  // Funktion zur Erkennung von Touch-Geräten
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

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
      console.log("Starting game...");
      init();
      gameStarted = true;

      mutebutton.style.display = 'block'; 

      // Überprüfen, ob das Gerät im Hochformat oder Querformat ist
      if (window.innerHeight > window.innerWidth) {
        hud.style.display = 'none'; // Verstecke das HUD im Hochformat
        console.log("Device in portrait mode. HUD hidden.");
      } else {
        // Zeige das HUD nur auf Touch-Geräten an
        if (isTouchDevice()) {
          hud.style.display = 'block'; // Zeige das HUD im Querformat
          console.log("Touch device detected. HUD visible.");
        } else {
          hud.style.display = 'none'; // Verstecke das HUD auf Nicht-Touch-Geräten
          console.log("Non-touch device. HUD hidden.");
        }
      }
     
    } else {
      startNewGame(); // Neustart des Spiels, wenn es bereits gestartet wurde
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




function checkScreenOrientation() {
  const rotateMessage = document.getElementById('rotate-message');
  const startscreen = document.getElementById('startscreen');
  const canvas = document.querySelector('canvas');
  const hud = document.getElementById('hud');
  const h1 = document.getElementById('h1');
  const mutebutton = document.getElementById('mutebutton');
  const gamecontainer = document.getElementById('gamecontainer');
 
    
 
  if (window.innerHeight > window.innerWidth ) { // Hochformat (Portrait-Modus)
      rotateMessage.style.display = 'flex'; // Zeige die Rotate-Message
      // Verstecke nur die Sichtbarkeit, damit das Spiel weiterläuft
      gamecontainer.style.display = 'none';
     
  } else { 
    gameStarted = true;// Querformat (Landscape-Modus)
      rotateMessage.style.display = 'none'; // Verstecke die Rotate-Message
      // Stelle die Sichtbarkeit wieder her
      
      gamecontainer.style.display = 'flex';
      
  }
}

// Überprüfe die Bildschirmgröße beim Laden der Seite
checkScreenOrientation();

// Überprüfe die Bildschirmgröße bei Größenänderung oder Orientierung ändern
window.addEventListener('resize', checkScreenOrientation);
window.addEventListener('orientationchange', checkScreenOrientation);





















