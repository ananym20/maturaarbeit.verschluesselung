// Variablen und Verknüpfung HTML
const cipher = "jvyi xlk, ul yrjk uzv ertyiztyk vekjtyclvjjvck."; 
const decryptedElement = document.getElementById('message'); 
const shiftAmountElement = document.getElementById('inputShift'); 

// Event Listener -> Wert holen, Entschlüsselungsfunktion aufrufen
shiftAmountElement.oninput = function() {
    const shift = parseInt(shiftAmountElement.value); 
    decrypt(cipher, shift); 
};

// Buchstaben um eine bestimmte Anzahl Stellen verschieben
function shiftLetter(letter, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'; 
    const letterIndex = alphabet.indexOf(letter); 
    if (letterIndex === -1) {
        return letter; // Zeichen, die nicht im Alphabet vorkommen, unverändert lassen
    }
    let newIndex = (letterIndex - shift) % alphabet.length; // Neuer Index nach der Verschiebung
    if (newIndex < 0) {
        newIndex += alphabet.length; // Sicherstellen, dass der Index positiv ist
    }
    return alphabet[newIndex]; // Verschobener Buchstabe
}

// Funktion zur Entschlüsselung des Textes
function decrypt(cipher, shift) {
    let decryptedMessage = ''; 
    for (let i = 0; i < cipher.length; i++) {
        let currentLetter = cipher[i].toLowerCase(); 
        decryptedMessage += shiftLetter(currentLetter, shift); 
    }
    decryptedElement.innerText = decryptedMessage; // Entschlüsselte Nachricht anzeigen
}
