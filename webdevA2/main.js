/* jshint esversion: 5 */

var CorrectAnswers = {
    // EASY (1–10)
    q1: "Blowing",
    q2: "String vibrations",
    q3: "Harp",
    q4: "4",
    q5: "Double Bass",
    q6: "True", // Piano is technically a string-percussion hybrid
    q7: "Pizzicato",
    q8: "EADGBE",
    q9: "Violin",
    q10: "Grip strings",

    // MEDIUM (11–20)
    q11: "Spruce",
    q12: "Transmit vibrations",
    q13: "Sound projection",
    q14: "Pitch oscillation",
    q15: "Steel",
    q16: "Under chin",
    q17: "440Hz",
    q18: "Fretboard",
    q19: "Horsehair",
    q20: "Decorative",

    // HARD (21–30)
    q21: "Italy",
    q22: "Vivaldi",
    q23: "Japan",
    q24: "Japanese zither",
    q25: "Sympathetic strings",
    q26: "Python skin",
    q27: "Guitarrón",
    q28: "Sitar",
    q29: "Largest",
    q30: "Resonating body",

    // EXTREME (31–40)
    q31: "Pizzicato+arco",
    q32: "Acoustic howling",
    q33: "Biber",
    q34: "Gut",
    q35: "Sympathetic strings",
    q36: "Mozart",
    q37: "Left-hand pizz",
    q38: "Unplayed",
    q39: "String crossing",
    q40: "Tartini"
};

var ViolinVibrato = new Audio("audio/ViolinArcoVibratoAudio.mp3");
var ViolinNoVibrato = new Audio("audio/ViolinArcoNoVibratoAudio.mp3");
var ViolinPizz = new Audio("audio/ViolinPizzicatoAudio.mp3");

document.getElementById("Vibrato").addEventListener("click", function () {
    ViolinVibrato.play();
});

document.getElementById("NoVibrato").addEventListener("click", function () {
    ViolinNoVibrato.play();
});

document.getElementById("Pizz").addEventListener("click", function () {
    ViolinPizz.play();
});

var scorebox = document.querySelector("#scorebox");

function CheckAns() {
    var score = 0;

    // Remove old feedback classes
    var previousFeedback = document.querySelectorAll(".correct, .incorrect");
    for (var i = 0; i < previousFeedback.length; i++) {
        previousFeedback[i].classList.remove("correct", "incorrect");
    }

    // Check each question
    for (var num = 1; num <= 40; num++) {
        var selectedRadios = document.querySelector('input[name="q' + num + '"]:checked');
        if (selectedRadios) {
            var UserAnswer = selectedRadios.value;
            if (UserAnswer === CorrectAnswers["q" + num]) {
                score++;
                var parent = selectedRadios.closest("label") || selectedRadios.parentElement;
                parent.classList.add("correct");
            } else {
                var parentWrong = selectedRadios.closest("label") || selectedRadios.parentElement;
                parentWrong.classList.add("incorrect");
            }
        }
    }

    scorebox.innerHTML = score + " /40";

    if (score <= 10) {
        scorebox.style.color = "red";
    } else if (score <= 20) {
        scorebox.style.color = "orange";
    } else {
        scorebox.style.color = "green";
    }
}

var btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", CheckAns);

// Hamburger Menu
var hamBtn = document.querySelector("#hamIcon");
var menuItemsList = document.querySelector("nav ul");

hamBtn.addEventListener("click", toggleMenus);

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
    var i;
    for (i = 0; i < allpages.length; i++) {
        allpages[i].style.display = "none";
    }
}

function show(pgno) {
    hideall();
    var onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block";
}

page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
page5btn.addEventListener("click", function () {
    show(5);
});

hideall();
show(1); // Show first page by default

// Flip cards
var flipCard = document.querySelectorAll(".flip-card");

for (var j = 0; j < flipCard.length; j++) {
    flipCard[j].addEventListener("click", function () {
        this.classList.toggle("flipped");
    });
}

// Floating notes animation
var notes = document.querySelectorAll(".floating-note");

for (var k = 0; k < notes.length; k++) {
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
    })(notes[k], k);
}

// Window resize info
var heightOutput = document.querySelector("#height");
var widthOutput = document.querySelector("#width");

function reportWindowSize() {
    heightOutput.textContent = window.innerHeight;
    widthOutput.textContent = window.innerWidth;
}

reportWindowSize();
window.addEventListener("resize", function () {
    reportWindowSize();
});
