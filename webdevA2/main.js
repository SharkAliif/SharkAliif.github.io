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

// Page Navigation
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

if (page1btn) {
    page1btn.addEventListener("click", function () {
        show(1);
        clearClicked();
        page1btn.classList.add("CurrentlyClicked");
    });
}

if (page2btn) {
    page2btn.addEventListener("click", function () {
        show(2);
        clearClicked();
        page2btn.classList.add("CurrentlyClicked");
    });
}

if (page3btn) {
    page3btn.addEventListener("click", function () {
        show(3);
        clearClicked();
        page3btn.classList.add("CurrentlyClicked");
    });
}

if (page4btn) {
    page4btn.addEventListener("click", function () {
        show(4);
        clearClicked();
        page4btn.classList.add("CurrentlyClicked");
    });
}

if (page5btn) {
    page5btn.addEventListener("click", function () {
        show(5);
        clearClicked();
        page5btn.classList.add("CurrentlyClicked");
    });
}

function clearClicked() {
    if (page1btn) page1btn.classList.remove("CurrentlyClicked");
    if (page2btn) page2btn.classList.remove("CurrentlyClicked");
    if (page3btn) page3btn.classList.remove("CurrentlyClicked");
    if (page4btn) page4btn.classList.remove("CurrentlyClicked");
    if (page5btn) page5btn.classList.remove("CurrentlyClicked");
}


// stores all the quiz answers categorized by difficulty
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
};


// Audio handling for violin sounds which uses event delegation on parent div
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

// Quiz scoring logic which highlights correct/incorrect answers visually
function CheckAns() {
    quizScore = 0;

    // Clears previous feedback before checking new answers
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


// Fullscreen toggle functionality 
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);
function enterFullscreen() {
    document.documentElement.requestFullscreen();
}

function exitFullscreen() {
    document.exitFullscreen();
}


// Rhythm game variables and state management
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

// Note creation and movement logic
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
    function removeGlow() {
        btn.classList.remove('glow', `lane-${index}`);
    }

    setTimeout(removeGlow, 150);


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


// Start rythm game
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
    noteInterval = setInterval(createNote, 800);
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

// Game input handling uses both keyboard and mouse events
// Keyboard press
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



// Flip card animation - toggles 'flipped' class on click
var flipCard = document.querySelectorAll(".flip-card");

for (var j = 0; j < flipCard.length; j++) {
    flipCard[j].addEventListener("click", function () {
        this.classList.toggle("flipped");
    });
}

// Moving Note Animation
var floatingNotes = document.querySelectorAll(".floating-note");

for (let k = 0; k < 2 && k < floatingNotes.length; k++) {
    // Increase to make the note start more on the right side of the page
    let posX = -100;

    // Increase to make the note start more down
    let posY = 250 + k * 50;
    
    let goingDown = true;
    const note = floatingNotes[k];
    
    note.style.cursor = 'pointer';

    // Start animation after delay
    setTimeout(function() {
        var animationInterval = setInterval(function() {
            // Horizontal movement
            posX += 7.5; // Increase to Move faster horizontally
            if (posX > window.innerWidth) {
                posX = -100;
            }

            // Vertical movement
            if (goingDown) {
                posY += 3; // Increase to Move faster downwards
                if (posY >= 330) goingDown = false; // The max Y to go down to
            } else {
                posY -= 3; // Increase to Move faster upwards
                if (posY <= 270) goingDown = true; // The Min Y to go down to
            }

            // Sets the horizontal position of the note updates
            note.style.left = posX + "px";
             // Sets the Vertical position of the note updates
            note.style.top = posY + "px";
        }, 30); // interval of 30ms

        // Add click handler to move note
        note.onclick = function() {
            // Generates a random floating point number and sets it to the posX
            posX = Math.random() * 500;
        };
    }, k * 450); // The interval between the first and second note starting
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

// Show list on Button press

let i = 0;
const ViolinMakingSteps = document.querySelectorAll("#Steps li");
const StepButton = document.querySelector("#StepButton");

function NextStep() {
    if (i < ViolinMakingSteps.length) {
        ViolinMakingSteps[i++].style.display = "list-item";
    }

    else if (i = 11) {
        StepButton.style.display = "none";
    }
}

StepButton.addEventListener("click", NextStep);