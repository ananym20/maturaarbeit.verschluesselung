// Verknüpfung HTML
const slider = document.getElementById('range');
const sliderValue = document.getElementById('sliderValue');
const cipherAlphabet = document.getElementById('cipheralphabet');

// EventListener
slider.addEventListener('input', function() {
    sliderValue.textContent = this.value;
    updateCipherAlphabet(this.value);
});

function updateCipherAlphabet(shift) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var cipherAlphabetArray = [];

    // Verschlüsselung
    for (var i = 0; i < 26; i++) {
        var shiftedIndex = (i + parseInt(shift)) % alphabet.length;
        cipherAlphabetArray.push(alphabet[shiftedIndex].toUpperCase());
    }

    // Aufzeigen Klartextalphabet
    let tab1 = "<table class='table'>"; 
    let y = 0; 
    while(y < 26){
        tab1 = tab1 + "<td>" + alphabet[y] + "</td>";
        y+=1;
    }
    tab1 = tab1 + "</table>";

    // Aufzeigen Geheimtextalphabet
    let tab2 = "<table class='table'>"; 
    let x = 0; 
    while(x < 26){
        tab2 = tab2 + "<td>" + cipherAlphabetArray[x] + "</td>";
        x+=1;
    }
    tab2 = tab2 + "</table>";

    // Update HTML
    document.getElementById('cipheralphabet').innerHTML = tab1 + tab2;
}

updateCipherAlphabet(slider.value);
