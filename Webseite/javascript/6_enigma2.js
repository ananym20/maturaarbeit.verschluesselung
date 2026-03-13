// Variabeln
const alph2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let walze1 = [];
let walze2 = [];
let walze3 = [];
let ukwa = [4, 9, 12, 25, 0, 11, 24, 23, 21, 1, 22, 5, 2, 17, 16, 20, 14, 13, 19, 18, 15, 8, 10, 7, 6, 3];
let steckerbrett = [3, 1, 13, 0, 19, 11, 8, 7, 6, 21, 25, 5, 12, 2, 14, 20, 24, 17, 18, 4, 15, 9, 23, 22, 16, 10];
let z = 0;
let outputStr2 = '';
let wEinst1 = 0;
let wEinst2 = 0;
let wEinst3 = 0;

// Verknüpfung HTML
const eingabe = document.getElementById('eingabeEnigma');
const resultat = document.getElementById('resultatEnigma');

// Walzeneinstellungen
const wE1 = document.getElementById('options1');
const wE2 = document.getElementById('options2');
const wE3 = document.getElementById('options3');

// Verhindere das löschen von Buchstaben im Inputfeld, wie bei einer mechanischen Schreibmaschine 
document.getElementById('eingabeEnigma').addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
    }
});

// showResult wird immer wieder aufgerufen, wenn sich der Input verändert
eingabe.oninput = showResult;
wE1.oninput = updateWalzeneinstellungen;
wE2.oninput = updateWalzeneinstellungen;
wE3.oninput = updateWalzeneinstellungen;

// Funktion Walzendrehung
function stepWalze(walze) {
    const lastElement = walze.pop(); 
    walze.unshift(lastElement); 
    for (let x = 0; x < walze.length; x++) {
        walze[x] = (walze[x] + 1) % 26;
    }
}

// Walzen richtig einstellen
function startWalzen() {
    walze1 = [4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0, 8, 1, 17, 2, 9];
    walze2 = [0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 6, 25, 13, 15, 24, 5, 21, 14, 4];
    walze3 = [1, 3, 5, 7, 9, 11, 2, 15, 17, 19, 23, 21, 25, 13, 24, 4, 8, 22, 6, 0, 10, 12, 20, 18, 16, 14];
    for (let z = 0; z < wEinst1; z++) {
        stepWalze(walze1);
    }
    for (let z = 0; z < wEinst2; z++) {
        stepWalze(walze2);
    }
    for (let z = 0; z < wEinst3; z++) {
        stepWalze(walze3);
    }
}

// Walzeneinstellungen basierend auf Dropdownmenu
function updateWalzeneinstellungen() {
    wEinst1 = parseInt(wE1.value);
    wEinst2 = parseInt(wE2.value);
    wEinst3 = parseInt(wE3.value);
    startWalzen();
}

// Verschlüsselung
function showResult() {
    let inputStr2 = eingabe.value.toLowerCase();
    updateWalzeneinstellungen();

    if (inputStr2.length < outputStr2.length) {
        // Zeichen wurde gelöscht
        outputStr2 = outputStr2.slice(0, -1);
        z--;
    } else {
        // Neues Zeichen wurde hinzugefügt
        let newChar = inputStr2[inputStr2.length - 1];

        if (alph2.includes(newChar)) {
            // in Zahl umwandeln
            let x = alph2.indexOf(newChar);

            // Steckerbrett
            let stb = steckerbrett[x];

            // durch drei Walzen verschlüsseln
            let w1 = walze1[stb];
            let w2 = walze2[w1];
            let w3 = walze3[w2];
                
            // Umkehrwalze
            let u = ukwa[w3];

            // wieder durch die drei Walzen
            let w3z = walze3.indexOf(u);
            let w2z = walze2.indexOf(w3z);
            let w1z = walze1.indexOf(w2z);

            // wieder durchs steckerbrett
            let stbz = steckerbrett.indexOf(w1z);

            // in Buchstaben umwandeln
            outputStr2 += alph2[stbz];

            // Zähler für Walzen erhöhen
            z++;

            // Walzen Position bestimmen
            wEinst1 = (wEinst1 + 1) % 26;
        
            if ((z % 26) === 0){
                wEinst2 = (wEinst2 + 1) % 26;
            }
        
            if ((z % 676) === 0){
                wEinst3 = (wEinst3 + 1) % 26;
            }
            
            //Dropdownmenu aktualisieren
            wE1.value = wEinst1;
            wE2.value = wEinst2;
            wE3.value = wEinst3;

        } else {
            outputStr2 += ''; 
        }
    }

    // Aktualisierung vom Geheimtext
    resultat.value = outputStr2; 
}
