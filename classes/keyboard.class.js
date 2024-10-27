/**
 * The Keyboard class represents the state of keyboard inputs in the game.
 * It tracks the state (pressed or not) of various keys used for game controls.
 */
class Keyboard {
    /** @type {boolean} Indicates if the LEFT arrow key is pressed */
    LEFT = false;

    /** @type {boolean} Indicates if the RIGHT arrow key is pressed */
    RIGHT = false;

    /** @type {boolean} Indicates if the UP arrow key is pressed */
    UP = false;

    /** @type {boolean} Indicates if the DOWN arrow key is pressed */
    DOWN = false;

    /** @type {boolean} Indicates if the SPACE key (jump) is pressed */
    SPACE = false;

    /** @type {boolean} Indicates if the D key (throw) is pressed */
    D = false;
}


/**
 * Adds event listeners to handle mouse and touch events for in-game controls.
 * Sets corresponding properties in the Keyboard class based on user interactions
 * with buttons for movement and actions.
 */
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnLeft').addEventListener('mousedown', () => { keyboard.LEFT = true; });
    document.getElementById('btnLeft').addEventListener('mouseup', () => { keyboard.LEFT = false; });
    document.getElementById('btnLeft').addEventListener('touchstart', () => { keyboard.LEFT = true; });
    document.getElementById('btnLeft').addEventListener('touchend', () => { keyboard.LEFT = false; });

    document.getElementById('btnRight').addEventListener('mousedown', () => { keyboard.RIGHT = true; });
    document.getElementById('btnRight').addEventListener('mouseup', () => { keyboard.RIGHT = false; });
    document.getElementById('btnRight').addEventListener('touchstart', () => { keyboard.RIGHT = true; });
    document.getElementById('btnRight').addEventListener('touchend', () => { keyboard.RIGHT = false; });

    document.getElementById('btnJump').addEventListener('mousedown', () => { keyboard.SPACE = true; });
    document.getElementById('btnJump').addEventListener('mouseup', () => { keyboard.SPACE = false; });
    document.getElementById('btnJump').addEventListener('touchstart', () => { keyboard.SPACE = true; });
    document.getElementById('btnJump').addEventListener('touchend', () => { keyboard.SPACE = false; });

    document.getElementById('btnThrow').addEventListener('mousedown', () => { keyboard.D = true; });
    document.getElementById('btnThrow').addEventListener('mouseup', () => { keyboard.D = false; });
    document.getElementById('btnThrow').addEventListener('touchstart', () => { keyboard.D = true; });
    document.getElementById('btnThrow').addEventListener('touchend', () => { keyboard.D = false; });
});
