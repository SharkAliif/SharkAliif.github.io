
var CorrectAnswers = {
    // EASY (1–5)
    q1: "4",
    q2: "Double Bass",
    q3: "Pizzicato",
    q4: "EADGBE",
    q5: "Grip strings",

    // MEDIUM (6–10)
    q6: "Spruce",
    q7: "Transmit vibrations",
    q8: "Pitch oscillation",
    q9: "Fretboard",
    q10: "Horsehair",

    // HARD (11–15)
    q11: "Italy",
    q12: "Japan",
    q13: "Japanese zither",
    q14: "Python skin",
    q15: "Guitarrón",

    // EXTREME (16–20)
    q16: "Acoustic howling",
    q17: "Gut",
    q18: "Spruce",
    q19: "Unplayed",
    q20: "String crossing"
}

// Audio files for violin sounds
var ViolinVibrato = new Audio("audio/ViolinArcoVibratoAudio.mp3");
var ViolinNoVibrato = new Audio("audio/ViolinArcoNoVibratoAudio.mp3");
var ViolinPizz = new Audio("audio/ViolinPizzicatoAudio.mp3");

const violinSoundsDiv = document.querySelector('.ViolinSounds');

violinSoundsDiv.addEventListener('click', function (event) {
    const clicked = event.target;

    if (clicked.tagName === 'BUTTON') {
        if (clicked.id === 'Vibrato') {
            ViolinVibrato.play();
        } else if (clicked.id === 'NoVibrato') {
            ViolinNoVibrato.play();
        } else if (clicked.id === 'Pizz') {
            ViolinPizz.play();
        }
    }
});



const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");
let quizScore = 0;

function CheckAns() {
    quizScore = 0;

    // Clear old feedback
    let feedback = document.querySelectorAll(".correct, .incorrect");
    for (let i = 0; i < feedback.length; i++) {
        feedback[i].classList.remove("correct", "incorrect");
    }

    for (let i = 1; i <= 20; i++) {
        let key = "q" + i;
        let correct = CorrectAnswers[key];
        CheckOneQn(i, correct);
    }

    if (scorebox) {
        scorebox.innerHTML = "Score: " + quizScore + "/20";

        // Score coloring
        if (quizScore <= 10) scorebox.style.color = "red";
        else if (quizScore <= 15) scorebox.style.color = "orange";
        else scorebox.style.color = "green";
    }
}

function CheckOneQn(qnNo, CorrAns) {
    let selected = document.querySelector("input[name='q" + qnNo + "']:checked");
    if (selected) {
        let ans = selected.value;
        let parent = selected.closest("label") || selected.parentElement;

        if (ans === CorrAns) {
            quizScore++;
            parent.classList.add("correct");
        } else {
            parent.classList.add("incorrect");
        }
    }
}

if (btnSubmit) {
    btnSubmit.addEventListener("click", CheckAns);
}

// hamburger menu
var hamBtn = document.querySelector("#hamIcon");
var menuItemsList = document.querySelector("nav ul");

if (hamBtn && menuItemsList) {
    hamBtn.addEventListener("click", toggleMenus);
}

function toggleMenus() {
    menuItemsList.classList.toggle("menuShow");
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu";
    } else {
        hamBtn.innerHTML = "Open Menu";
    }
}

// PAGE NAVIGATION
var page1btn = document.querySelector("#btn1");
var page2btn = document.querySelector("#btn2");
var page3btn = document.querySelector("#btn3");
var page4btn = document.querySelector("#btn4");
var page5btn = document.querySelector("#btn5");
var allpages = document.querySelectorAll(".page");

function hideall() {
    for (var i = 0; i < allpages.length; i++) {
        allpages[i].style.display = "none";
    }
}

function show(pgno) {
    hideall();
    var onepage = document.querySelector("#page" + pgno);
    if (onepage) {
        onepage.style.display = "block";
    }
}

if (page1btn) page1btn.addEventListener("click", function () { show(1); });
if (page2btn) page2btn.addEventListener("click", function () { show(2); });
if (page3btn) page3btn.addEventListener("click", function () { show(3); });
if (page4btn) page4btn.addEventListener("click", function () { show(4); });
if (page5btn) page5btn.addEventListener("click", function () { show(5); });

if (allpages.length > 0) {
    hideall();
}

let points = 0;
let lives = 3;
let notes = [];
let isGameRunning = false;
let gameInterval;
let noteInterval;

const lanes = document.querySelectorAll('.lane');
const buttons = document.querySelectorAll('.lane-button');
const scoreText = document.getElementById('score');
const livesText = document.getElementById('lives');
const startBtn = document.getElementById('startBtn');

// Setup display
function initGame() {
    scoreText.textContent = 'Points: 0';
    livesText.textContent = 'Lives: 3';
}

// Create one falling note
function createNote() {
    if (!isGameRunning) return;

    let note = document.createElement('div');
    note.className = 'note';

    let lane = Math.floor(Math.random() * 4);
    note.laneIndex = lane;
    note.style.top = '0%';

    lanes[lane].appendChild(note);
    notes.push(note);
}

// Move all notes down
function moveNotes() {
    if (!isGameRunning) return;

    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let top = parseFloat(note.style.top);
        top += 1.35;
        note.style.top = top + '%';

        if (top > 100) {
            note.remove();
            
            //  removes the note at index i from the notes array to prevent it from being tracked invisibly again.
            notes.splice(i, 1); 
            i--;
            loseLife();
        }
    }
}

// Lose one life
function loseLife() {
    lives--;
    livesText.textContent = 'Lives: ' + lives;

    if (lives <= 0) {
        gameOver();
    }
}

// Game over
function gameOver() {
    stopGame();
    alert('Game Over! Score: ' + points);
}

// press
function hitLane(index) {
    if (!isGameRunning) return;

    // Add glow effect
    const btn = buttons[index];
    btn.classList.add('glow', `lane-${index}`);
    setTimeout(() => {
        btn.classList.remove('glow', `lane-${index}`);
    }, 150);

    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        let top = parseFloat(note.style.top);

        if (note.laneIndex === index && top > 80 && top < 90) {
            points += 100;
            scoreText.textContent = 'Points: ' + points;
            note.remove();
            notes.splice(i, 1);
            break;
        }
    }
}


// Start game
function startGame() {
    if (isGameRunning) return;

    points = 0;
    lives = 3;
    notes.forEach(function (n) { n.remove(); });
    notes = [];

    scoreText.textContent = 'Points: 0';
    livesText.textContent = 'Lives: 3';
    startBtn.textContent = 'Stop';

    isGameRunning = true;
    gameInterval = setInterval(moveNotes, 20);
    noteInterval = setInterval(createNote, 1000);
}

// Stop game
function stopGame() {
    if (!isGameRunning) return;

    isGameRunning = false;
    clearInterval(gameInterval);
    clearInterval(noteInterval);
    startBtn.textContent = 'Start';
}

// Toggle game
function toggleGame() {
    if (isGameRunning) stopGame();
    else startGame();
}

// Keyboard
document.addEventListener('keydown', function (e) {
    if (e.key === 'd') hitLane(0);
    if (e.key === 'f') hitLane(1);
    if (e.key === 'j') hitLane(2);
    if (e.key === 'k') hitLane(3);
});

// Mouse click
document.getElementById('gameContainer').addEventListener('click', function (e) {
    if (e.target.classList.contains('lane-button')) {
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i] === e.target) {
                hitLane(i);
                break;
            }
        }
    }
});

// Start button
startBtn.addEventListener('click', toggleGame);

// Init
initGame();




// FLIP CARDS
var flipCard = document.querySelectorAll(".flip-card");

for (var j = 0; j < flipCard.length; j++) {
    flipCard[j].addEventListener("click", function () {
        this.classList.toggle("flipped");
    });
}

// FLOATING NOTES ANIMATION
var floatingNotes = document.querySelectorAll(".floating-note"); // Renamed to avoid conflict

for (var k = 0; k < floatingNotes.length; k++) {
    (function (note, i) {
        var posX = -100;
        var posY = 250 + i * 50;
        var goingDown = true;

        setTimeout(function () {
            note.style.opacity = 1;

            setInterval(function () {
                posX += 5;
                if (posX > window.innerWidth) {
                    posX = -100;
                }

                if (goingDown) {
                    posY += 3;
                    if (posY >= 330) goingDown = false;
                } else {
                    posY -= 3;
                    if (posY <= 270) goingDown = true;
                }

                note.style.left = posX + "px";
                note.style.top = posY + "px";
            }, 30);
        }, i * 800);
    })(floatingNotes[k], k);
}

// WINDOW RESIZE INFO
var heightOutput = document.querySelector("#height");
var widthOutput = document.querySelector("#width");

function reportWindowSize() {
    if (heightOutput) heightOutput.textContent = window.innerHeight;
    if (widthOutput) widthOutput.textContent = window.innerWidth;
}

if (heightOutput && widthOutput) {
    reportWindowSize();
    window.addEventListener("resize", function () {
        reportWindowSize();
    });
}