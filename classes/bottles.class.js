class Bottles extends DrawableObject {

    y = 350;
    width = 70;
    height = 70;
   

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
     ];

    constructor() {
        super();
        
        // Zufällige Auswahl zwischen den beiden Flaschen-Bildern
        let bottles = [];
        let previousX = 200;  // Anfangsposition für die erste Flasche
        let minDistance = 300;  // Mindestabstand zwischen den Flaschen
        
        for (let i = 0; i < 10; i++) {  // Beispiel: 10 Flaschen erstellen
            let randomOffset = Math.random() * 200;  // Zufälliger Versatz, um die Platzierung natürlicher zu machen
            let newX = previousX + minDistance + randomOffset;  // Setze die neue x-Position mit Abstand
            
            // Erstelle eine neue Flasche an der Position newX
            let bottle = new Bottles();
            bottle.x = newX;  // Setze die x-Position der Flasche
        
            bottles.push(bottle);  // Füge die Flasche zur Liste der Flaschen hinzu
            
            previousX = newX;  // Speiche
    }
    }
}
