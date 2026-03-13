// Variabeln
const alph = ['a', 'b', 'c', 'd', 'e'];
let rotor1 = [2, 0, 4, 1, 3];
let rotor2 = [4, 1, 3, 0, 2];
let rotor3 = [2, 3, 0, 4, 1];
let i = 0;
let outputStr = '';

// HTML Elemente
const input = document.getElementById('inputE1');
const output = document.getElementById('outputE1');
const picsDiv = document.getElementById('pics');

// Funktion wird immer aufgerufen, wennn sich der Input verändert
input.oninput = encrypt;

// Rotordrehung
function stepRotor(rotor) {
    const lastElement = rotor.pop();
    rotor.unshift(lastElement);
    for (let x = 0; x < rotor.length; x++) {
        rotor[x] = (rotor[x] + 1) % 5;
    }
}

function encrypt() {
    let inputStr = this.value.toLowerCase();
    rotor1 = [2, 0, 4, 1, 3];
    rotor2 = [4, 1, 3, 0, 2];
    rotor3 = [2, 3, 0, 4, 1];
    outputStr = '';
    i = 0;

    // jeden Buchstaben verschlüsseln
    for (let k = 0; k < inputStr.length; k++) {
        let newChar = inputStr[k];

        // Rotordrehungen aufrufen
        if (k > 0){
            stepRotor(rotor1);

            if (k  % 5 === 0) {
                stepRotor(rotor2);
            }
        }

        if (alph.includes(newChar)) {
            // Buchstaben zu Zahl umwandeln
            let x = alph.indexOf(newChar);

            // durch die Rotoren
            let r1 = rotor1[x];
            let r2 = rotor2[r1];
            let r3 = rotor3[r2];

            // Zahl zu Buchstabe
            outputStr += alph[r3];
        } else {
            // falls ein falscher Buchstabe eingegeben wird
            outputStr += 'x';
        }

        i++;  // Index erhöhen
    }

    // output
    output.value = outputStr.toUpperCase();

    // Bilder Variabeln 
    let picRotor1, picRotor2, picRotor3;

    // Bild Rotor 1 
    switch (i % 5) {
        case 1: picRotor1 = `<img class="rotors" src="images/6_rotor1-1.png"></img>`; break;
        case 2: picRotor1 = `<img class="rotors" src="images/6_rotor1-2.png"></img>`; break;
        case 3: picRotor1 = `<img class="rotors" src="images/6_rotor1-3.png"></img>`; break;
        case 4: picRotor1 = `<img class="rotors" src="images/6_rotor1-4.png"></img>`; break;
        default: picRotor1 = `<img class="rotors" src="images/6_rotor1-5.png"></img>`; break;
    }

    // Bild Rotor 2 
    switch (Math.ceil(i / 5) % 5) {
        case 1: picRotor2 = `<img class="rotors" src="images/6_rotor2-1.png"></img>`; break;
        case 2: picRotor2 = `<img class="rotors" src="images/6_rotor2-2.png"></img>`; break;
        case 3: picRotor2 = `<img class="rotors" src="images/6_rotor2-3.png"></img>`; break;
        case 4: picRotor2 = `<img class="rotors" src="images/6_rotor2-4.png"></img>`; break;
        default: picRotor2 = `<img class="rotors" src="images/6_rotor2-5.png"></img>`; break;
    }

    // Bild Rotor 3 
    picRotor3 = `<img class="rotors" src="images/6_rotor3-1.png"></img>`;

    // das div-Element mit den neuen Bilder updaten
    picsDiv.innerHTML = `So wurde der letzte Buchstabe verschlüsselt: 
                        <table>
                            <td><img class="rotors" src="images/6_letters.png"></td>
                            <td>`+ picRotor1 +`</td>
                            <td>`+ picRotor2 +`</td>
                            <td>`+ picRotor3 +`</td>
                            <td><img class="rotors" src="images/6_letters.png"></td>
                        </table>`;
}
