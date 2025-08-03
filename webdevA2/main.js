// Object containing all correct answers for the quiz
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

if (document.getElementById("Vibrato")) {
    document.getElementById("Vibrato").addEventListener("click", function () {
        ViolinVibrato.play();
    });
}

if (document.getElementById("NoVibrato")) {
    document.getElementById("NoVibrato").addEventListener("click", function () {
        ViolinNoVibrato.play();
    });
}

if (document.getElementById("Pizz")) {
    document.getElementById("Pizz").addEventListener("click", function () {
        ViolinPizz.play();
    });
}

// QUIZ FUNCTIONALITY
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
        else if (quizScore <= 20) scorebox.style.color = "orange";
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

// HAMBURGER MENU
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



// Rhythm Game
let points = 0;
let balls = [];

// Create a ball
function makeBall() {
  let ball = document.createElement('div');
  ball.className = 'note';
  ball.lane = Math.floor(Math.random() * 4);
  ball.style.left = (ball.lane * 100 + 10) + 'px';
  ball.style.top = '0px';

  // Adds a new html child element called ball to the parent (gameContainer)
  document.getElementById('gameContainer').appendChild(ball);

  //  Adds a new item (ball) to the end of the balls array.
  balls.push(ball);
}

// Move balls down
function moveBalls() {
  balls.forEach(function(ball, i) {
    ball.style.top = parseInt(ball.style.top) + 8 + 'px';
    if (parseInt(ball.style.top) > 600) {

    // Removes the HTML element (ball) from the DOM (the webpage structure).
      ball.remove();

      // removes 1 item from the balls array at position i.
      balls.splice(i, 1);
    }
  });
}

// Handle hits
function hit(lane) {
  // Flash button
  let button = document.querySelectorAll('.lane-button')[lane];
  button.style.background = 'red';
  setTimeout(function() { button.style.background = ''; }, 100);

  // Check for hits
  balls.forEach(function(ball, i) {
    let top = parseInt(ball.style.top);
    if (ball.lane === lane && top > 480 && top < 560) {
      points += 100;
      document.getElementById('score').textContent = 'Points: ' + points;
      ball.remove();
      balls.splice(i, 1);
    }
  });
}

// Keyboard controls
document.onkeydown = function(e) {
  if (e.key === 'd') hit(0);
  if (e.key === 'f') hit(1);
  if (e.key === 'j') hit(2);
  if (e.key === 'k') hit(3);
};

// For each button (btn), sets up a click handler that calls hit(i) with its index
document.querySelectorAll('.lane-button').forEach(function(btn, i) {
  btn.onclick = function() { hit(i); };
});

// Start game
setInterval(moveBalls, 20);
setInterval(makeBall, 1000);


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