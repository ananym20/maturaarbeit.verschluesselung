// Variabeln
const xalph2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let xwalze1 = [];
let xwalze2 = [];
let xwalze3 = [];
let xwalze4 = [];
let xwalze5 = [];
let xukwa = [4, 9, 12, 25, 0, 11, 24, 23, 21, 1, 22, 5, 2, 17, 16, 20, 14, 13, 19, 18, 15, 8, 10, 7, 6, 3];
let xsteckerbrett = [3, 1, 13, 0, 19, 11, 8, 7, 6, 21, 25, 5, 12, 2, 14, 20, 24, 17, 18, 4, 15, 9, 23, 22, 16, 10];
let xz = 0;
let xoutputStr2 = '';
let xwEinst1 = 0;
let xwEinst2 = 0;
let xwEinst3 = 0;

// Verknüpfung HTML
const xeingabe = document.getElementById('2eingabeEnigma');
const xresultat = document.getElementById('2resultatEnigma');

// Walzenlagen HTML
const walzenlage1  = document.getElementById('walze1');
const walzenlage2 = document.getElementById('walze2');
const walzenlage3 = document.getElementById('walze3');

// Walzeneinstellungen HTML
const xwE1 = document.getElementById('2options1');
const xwE2 = document.getElementById('2options2');
const xwE3 = document.getElementById('2options3');

// Verhindere das Löschen von Buchstaben im Inputfeld
document.getElementById('2eingabeEnigma').addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
    }
});

// xshowResult/xuptdatewalzeneinstellungen wird aufgerufen, wenn sich der Input verändert
xeingabe.oninput = xshowResult;
xwE1.oninput = xupdateWalzeneinstellungen;
xwE2.oninput = xupdateWalzeneinstellungen;
xwE3.oninput = xupdateWalzeneinstellungen;
walzenlage1.oninput = xupdateWalzeneinstellungen;
walzenlage2.oninput = xupdateWalzeneinstellungen;
walzenlage3.oninput = xupdateWalzeneinstellungen;

// Funktion Walzendrehung
function xstepWalze(walze) {
    const lastElement = walze.pop(); 
    walze.unshift(lastElement); 
    for (let x = 0; x < walze.length; x++) {
        walze[x] = (walze[x] + 1) % 26;
    }
}

// Walzen richtig einstellen
function xstartWalzen() {
    stelle1 = ausgewaehlteWalze(walzenlage1.value);
    stelle2 = ausgewaehlteWalze(walzenlage2.value);
    stelle3 = ausgewaehlteWalze(walzenlage3.value);

    for (let z = 0; z < xwEinst1; z++) {
        xstepWalze(stelle1);
    }
    for (let z = 0; z < xwEinst2; z++) {
        xstepWalze(stelle2);
    }
    for (let z = 0; z < xwEinst3; z++) {
        xstepWalze(stelle3);
    }
}

function ausgewaehlteWalze(auswahl) {
    switch (auswahl) {
        case '1': return [4, 10, 12, 5, 11, 6, 3, 16, 21, 25, 13, 19, 14, 22, 24, 7, 23, 20, 18, 15, 0, 8, 1, 17, 2, 9];
        case '2': return [0, 9, 3, 10, 18, 8, 17, 20, 23, 1, 11, 7, 22, 19, 12, 2, 16, 6, 25, 13, 15, 24, 5, 21, 14, 4];
        case '3': return [1, 3, 5, 7, 9, 11, 2, 15, 17, 19, 23, 21, 25, 13, 24, 4, 8, 22, 6, 0, 10, 12, 20, 18, 16, 14];
        case '4': return [21, 25, 1, 17, 6, 8, 19, 24, 20, 15, 18, 3, 13, 7, 11, 23, 0, 22, 12, 9, 16, 14, 5, 4, 2, 10];
        case '5': return [9, 15, 6, 21, 14, 20, 12, 5, 24, 16, 1, 4, 13, 7, 25, 17, 3, 10, 0, 18, 23, 11, 8, 2, 19, 22];
        default: return [];
    }
}

// Walzeneinstellungen basierend auf Dropdownmenu
function xupdateWalzeneinstellungen() {
    const walze1 = walzenlage1.value;
    const walze2 = walzenlage2.value;
    const walze3 = walzenlage3.value;

    // Verhindere doppelte Auswahl
    const selectedWalzen = [walze1, walze2, walze3].filter(w => w !== "");  // Nur ausgewählte Walzen

    // Optionen in den Dropdown-Menüs aktualisieren
    const walzen = [walzenlage1, walzenlage2, walzenlage3];
     
    walzen.forEach(walze => {
        const options = walze.options;
        for (let i = 1; i < options.length; i++) { // i=1 überspringt den ersten "Bitte auswählen"-Eintrag
            options[i].disabled = selectedWalzen.includes(options[i].value) && walze.value !== options[i].value;
        }
    });

    xwEinst1 = parseInt(xwE1.value);
    xwEinst2 = parseInt(xwE2.value);
    xwEinst3 = parseInt(xwE3.value);
    xstartWalzen();
}

// Verschlüsselung
function xshowResult() {
    let xinputStr2 = xeingabe.value.toLowerCase();
    xupdateWalzeneinstellungen();

    if (xinputStr2.length < xoutputStr2.length) {
        // Zeichen wurde gelöscht
        xoutputStr2 = xoutputStr2.slice(0, -1);
        xz--;
    } else {
        // Neues Zeichen wurde hinzugefügt
        let xnewChar = xinputStr2[xinputStr2.length - 1];

        if (xalph2.includes(xnewChar)) {
            // in Zahl umwandeln
            let xx = xalph2.indexOf(xnewChar);

            // Steckerbrett
            let xstb = xsteckerbrett[xx];

            // durch drei Walzen verschlüsseln
            let xw1 = stelle1[xstb];
            let xw2 = stelle2[xw1];
            let xw3 = stelle3[xw2];
                
            // Umkehrwalze
            let xu = xukwa[xw3];

            // wieder durch die drei Walzen
            let xw3z = stelle3.indexOf(xu);
            let xw2z = stelle2.indexOf(xw3z);
            let xw1z = stelle1.indexOf(xw2z);

            // wieder durchs Steckerbrett
            let xstbz = xsteckerbrett.indexOf(xw1z);

            // in Buchstaben umwandeln
            xoutputStr2 += xalph2[xstbz];

            // Zähler für Walzen erhöhen
            xz++;

            // Walzen Position bestimmen
            xwEinst1 = (xwEinst1 + 1) % 26;
        
            if ((xz % 26) === 0){
                xwEinst2 = (xwEinst2 + 1) % 26;
            }
        
            if ((xz % 676) === 0){
                xwEinst3 = (xwEinst3 + 1) % 26;
            }
            
            // Dropdownmenu aktualisieren
            xwE1.value = xwEinst1;
            xwE2.value = xwEinst2;
            xwE3.value = xwEinst3;

        } else {
            xoutputStr2 += ''; 
        }
    }

    // Aktualisierung vom Geheimtext
    xresultat.value = xoutputStr2;    
}
