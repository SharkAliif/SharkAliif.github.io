const CorrectAnswers = {
    //  EASY (1-10)
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

    //  MEDIUM (11-20) 
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

    // HARD (21-30) 
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

    // EXTREME (31-40) 
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

function CheckAns() {
    let score = 0;
    const questions = document.querySelectorAll("[name^='q']");

    // Reset all colors
    questions.forEach(input => input.parentElement.classList.remove("correct", "wrong"));

    // Use a Set to track questions checked
    const checkedQuestions = new Set();

    questions.forEach(input => {
        if (input.checked) {
            checkedQuestions.add(input.name);
            if (input.dataset.correct === "true") {
                score++;
                input.parentElement.classList.add("correct");
            } else {
                input.parentElement.classList.add("wrong");
                // Highlight the correct option in this question
                const correctInput = document.querySelector(`input[name="${input.name}"][data-correct="true"]`);
                if (correctInput) correctInput.parentElement.classList.add("correct");
            }
        }
    });

    const total = checkedQuestions.size;
    scorebox.textContent = `Score: ${score} / "${total}"`;
}

// Hamburger Menu js
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
hamBtn.addEventListener("click", toggleMenus);
function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}


const page1btn = document.querySelector("#btn1");
const page2btn = document.querySelector("#btn2");
const page3btn = document.querySelector("#btn3");
const page4btn = document.querySelector("#btn4");
const page5btn = document.querySelector("#btn5");

var allpages = document.querySelectorAll(".page");

function hideall() {
    for (let onepage of allpages) {
        onepage.style.display = "none";
    }
}

function show(pgno) {
    hideall();
    let onepage = document.querySelector("#page" + pgno);
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

hideall(); // Hide all pages on load



let note = document.getElementById("CrotchetNote");
let posX = 0;
let posY = 50;
let goingDown = true;

const notes = document.querySelectorAll(".floating-note");

notes.forEach((note, i) => {
    // Start at different vertical positions
    let posX = -100;
    let posY = 250 + i * 50;
    let goingDown = true;

    // Delay appearance and movement
    setTimeout(() => {
        note.style.opacity = 1;

        setInterval(() => {
            // Move right
            posX += 5;
            if (posX > window.innerWidth) posX = -100; // Moves the image out of screen to the left

            // Bounce up and down
            if (goingDown) {
                posY += 3;
                if (posY >= 330) goingDown = false;
            } else {
                posY -= 3;
                if (posY <= 270) goingDown = true;
            }

            // Apply position
            note.style.left = posX + "px";
            note.style.top = posY + "px";
        }, 30);
    }, i * 800); // each note starts later
});

const btnSubmit = document.querySelector("#btnSubmit");
const scorebox = document.querySelector("#scorebox");
btnSubmit.addEventListener("click", CheckAns);

const heightOutput = document.querySelector("#height");
const widthOutput = document.querySelector("#width");
function reportWindowSize() {
    heightOutput.textContent = window.innerHeight;
    widthOutput.textContent = window.innerWidth;
}
reportWindowSize();
window.addEventListener("resize", reportWindowSize);//when resize, update
report