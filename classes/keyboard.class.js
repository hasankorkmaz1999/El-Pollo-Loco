class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
}

// Links-Taste
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
