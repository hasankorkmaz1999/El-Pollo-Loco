let canvas;
let world;
let keyboard = new Keyboard();

function toggleMute() {
    if (world) {
        world.toggleMute();
    }
}

function init() {
    canvas = document.getElementById('canvas');
    const initialLevel = createLevel();
    world = new World(canvas, keyboard, initialLevel);

    // Hintergrundsteuerungselemente anzeigen
}

function startNewGame() {
    document.getElementById('you-win-image').style.display = 'none';
    document.getElementById('you-lose-image').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('new-game-button').style.display = 'none';
   
    world.isGameOver = false;
    keyboard = new Keyboard();

    const newLevel = createLevel();
    console.log("Level erfolgreich erstellt:", newLevel);

    world = new World(canvas, keyboard, newLevel);

    world.isMuted = false;
    world.unmuteAllSounds();
    document.getElementById('mutebutton').textContent = '🔊';

   
}

function quitGame() {
    // Verstecke alle Overlays (You Win/You Lose und Quit-Button)
    document.getElementById('you-win-image').style.display = 'none';
    document.getElementById('you-lose-image').style.display = 'none';
    quitGameButton.style.display = 'none';  // Verstecke den Quit-Button

    // Zeige den Startbildschirm wieder an
    startscreen.style.display = 'block';  // Zeige den Startbildschirm an

    // Verstecke das Canvas, damit es nicht im Hintergrund sichtbar ist
    canvas.style.display = 'none';

    world.isMuted = false;
    world.unmuteAllSounds();
    document.getElementById('mutebutton').textContent = '🔊';

    // Hintergrundsteuerungselemente ausblenden
}



window.addEventListener('keydown', (event) => {
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

window.addEventListener('keyup', (event) => {
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
        [
            new Cloud()
        ],
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
            new Bottles()
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
            new Coins()
        ]
    );
}
