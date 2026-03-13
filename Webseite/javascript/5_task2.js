// Verknüpfung HTML
var button1 = document.getElementById("wrong1");
var button2 = document.getElementById("wrong2");
var button3 = document.getElementById("correct");
var button4 = document.getElementById("wrong4");

// Event-Listener
button1.addEventListener("click", wrongClick);
button2.addEventListener("click", wrongClick);
button3.addEventListener("click", correctClick);
button4.addEventListener("click", wrongClick);

// Funktionen für die Wahl der richtigen oder falschen Antwort
function correctClick() {
    alert("Korrekt!");
}

function wrongClick() {
    alert("Falsch, versuche es noch ein mal!");
}




