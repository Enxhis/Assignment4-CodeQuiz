// timer and counter variables
var count = 120;
//var score = 0;
var indexQ = 0;
var timeID;

// Variables to get DOM elements
var startBtn = document.querySelector("#startBtn");
var cancelBtn = document.querySelector("#cancelBtn");
var timer = document.querySelector("#timer");
var questionsEl = document.querySelector("#question");
var questionTitl = document.querySelector("#questionTitle");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submit");


// timer function 
function setTimer() {
    var interval = setInterval(function () {
        timer.innerHTML = count;
        count--;
        if (count === 0) {
            clearInterval(interval);
            document.getElementById("timer").innerHTML = 'Done';
        }
    }, 1000);
}

//Stop timer 
function stopTimer() {
    if (count <= 0) {
        clearInterval(count);
        // endQuiz()
    }
}

function cancel() {
    cancelBtn.addEventListener("click", function () {
        var $startScreenEl = $("#start-screen");
        $startScreenEl.attr("class", "hide");
        //var $header = $("<img>");
        $("main").prepend($('<img>', { src: 'Assets/Images/byeImg.png' }));
    });
}

// Start the game
function startQuiz() {
    questionsEl.setAttribute("class", "hide");

    //when clicked start, hides the screen
    startBtn.addEventListener("click", function () {
        var $startScreenEl = $("#start-screen");
        $startScreenEl.attr("class", "hide");
        // un-hide questions section
        questionsEl.removeAttribute("class");
        setTimer();
    });
    // call of function that takes care of questions
    getQuestion();
}

// get questions function
function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[indexQ];
    // update title with current question
    questionTitl.textContent = currentQuestion.question;

    // clears previous question choices
    choicesEl.innerHTML = "";

    // loops over choices
    currentQuestion.choices.forEach(function (choice, i) {
        // creates new button for every choice
        var choiceN = document.createElement("button");
        choiceN.setAttribute("class", "choice");
        choiceN.setAttribute("value", choice);

        choiceN.textContent = i + 1 + ". " + choice;

        //event listener to each choice
        choiceN.onclick = clickQuestion;

        // adds choices on page
        choicesEl.appendChild(choiceN);
    });
}

function clickQuestion() {
    // check if user guessed wrong
    if (this.value !== questions[indexQ].answer) {
        // subtracts time
        count -= 15;
        // set count to 0 so it doesn't decrease endlessly
        if (count < 0) {
            count = 0;
        }
        // display new time on page
        timer.textContent = count;
        feedbackEl.textContent = "Wrong Answer!";

    } else if (this.value === questions[indexQ].answer) {
        feedbackEl.textContent = "Correct Answer!";
    }
    // // right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    // move to next question
    indexQ++;

    // check if we've run out of questions
    if (indexQ === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}

function endQuiz() {
    // stop timer
    //clearInterval(count);
    stopTimer();

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = count;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

//HighScore
function highScore() {
    // get user's initials
    var init = initials.value.trim();
    //check if value from user is empty
    if (init !== "") {
        //get score from localstorage or  get an empty array if nothing is there
        var scores = JSON.parse(window.localStorage.getItem("scores")) || [];
    }
    // new score for user
    var newS = {
        score: count,
        init: init
    };
    // push in local storage
    scores.push(newS);
    window.localStorage.setItem("scores", JSON.stringify(scores)) || [];
    window.location.href = "highscores.html";
}

//Call of the function to start the game
startQuiz();
cancelBtn.onclick = cancel();
// submit initials
submitBtn.onclick = highScore;



