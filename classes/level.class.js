class Level {
    enemies;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, bottles ) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }


    
}

let bottles = [];
let previousX = 200;  // Anfangsposition für die erste Flasche
let minDistance = 300;  // Mindestabstand zwischen den Flaschen

for (let i = 0; i < 10; i++) {  // Beispiel: 10 Flaschen erstellen
    let randomOffset = Math.random() * 200;  // Zufälliger Versatz
    let newX = previousX + minDistance + randomOffset;  // Berechne die neue x-Position
    
    // Erstelle eine neue Flasche und setze die x-Position
    let bottle = new Bottles();
    bottle.x = newX;  // Setze die neue Position
    
    bottles.push(bottle);  // Füge die Flasche zum Array hinzu
    previousX = newX;  // Speichere die Position der letzten Flasche
}
