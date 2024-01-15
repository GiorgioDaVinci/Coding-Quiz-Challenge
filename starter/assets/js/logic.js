// The event listener is triggered when the initial html file has been loaded
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  const timeDisplay = document.getElementById("time");
  const endScreen = document.getElementById("end-screen");
  const finalScoreDisplay = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  const highscoresList = document.getElementById("highscores");
  const feedbackContainer = document.getElementById("feedback");
  

  let currentQuestionIndex = 0; 
  let timer;
  let score = 0;
  let timeLeft = 60;

  function startQuiz() {
    startButton.parentElement.classList.add("hide");
    document.getElementById("questions").classList.remove("hide");
    showQuestion();
    startTimer();
  }
// This function shows the current question in the quiz
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;

    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", () => checkAnswer(index));
      choicesContainer.appendChild(button);
    });
  }
// This function checks the answer of the question is correct, else a ten second penalty is applied
  function checkAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choiceIndex === currentQuestion.correctIndex) {
      score++;
    } else {
      timeLeft -= 10;
    }
// this checks to see if there are anymore questions left, if there are none it ends the quiz, if not it advances to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  // This function starts the timer for the quiz until it elapses after 60 seconds
  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
      } else {
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timer);
    document.getElementById("questions").classList.add("hide");
    endScreen.classList.remove("hide");
    finalScoreDisplay.textContent = score;
  }

  function saveHighscore(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      highscores.push({ initials, score });
      localStorage.setItem("highscores", JSON.stringify(highscores));
      displayHighscores();
  
      feedbackContainer.textContent = "Highscore saved!";
    } else {
      feedbackContainer.textContent = "Please enter your initials.";
    }
  }
  
// This function displays the the score of each user entry for the quiz
  function displayHighscores() {
    const highscoresList = document.getElementById("highscores");
    if (highscoresList) {
      console.log("Element with ID 'highscores' found.");
      const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      highscores.sort((a, b) => b.score - a.score);
      highscoresList.innerHTML = "";
      highscores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.initials}: ${entry.score}`;
        highscoresList.appendChild(li);
      });
    } else {
      console.error("Element with ID 'highscores' not found.");
    }
  }
  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", function (event) {
    saveHighscore(event);
  });
});