// variables to keep track of quiz state
var currentQuestionCount = 0;
var time = questions.length * 20;
var timer;

var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var optionsEl = document.getElementById("options");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

/* user clicks button to start quiz*/
startBtn.onclick = startQuiz;

/*submit high score*/
submitBtn.onclick = saveScore;


function startQuiz() {
  /*hide start screen*/
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  /* show questions*/
  questionsEl.removeAttribute("class");

  /* initialize timer */
  timer = setInterval(clock, 1000);
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  
  var currentQuestion = questions[currentQuestionCount];

  /* get new question*/
  var promptEl = document.getElementById("question-prompt");
  promptEl.textContent = currentQuestion.prompt;

  /* remove old question */
  optionsEl.innerHTML = "";

  /* loop for options */
  currentQuestion.options.forEach(function(option, i) {
    
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "options");
    choiceBtn.setAttribute("value", option);
    choiceBtn.textContent = i + 1 + ". " + option;
    choiceBtn.onclick = questionCheck;
    optionsEl.appendChild(choiceBtn);
  });
}

function questionCheck() {
  /* check if answer is incorrect/correct and give feedback */
  if (this.value !== questions[currentQuestionCount].answer) {
    time -= 20;

    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;

    feedbackEl.textContent = "Incorrect";
  } else {

    feedbackEl.textContent = "Correct!"
  }


  /*show then hide feedback*/
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  
  currentQuestionCount++;

  /* check for remaining questions*/
  if (currentQuestionCount === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  /* end timer */
  clearInterval(timer);

  /*show the final screen*/
  var finalScreenEl = document.getElementById("final-screen");
  finalScreenEl.removeAttribute("class");

  /*show final score*/
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clock() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveScore() {
  
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newestScore = 
    {
      score: time,
      initials: initials
    };

    highscores.push(newestScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    /* take to score page*/
    window.location.href = "scores.html";
  }
}










