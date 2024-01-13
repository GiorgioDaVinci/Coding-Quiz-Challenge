document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start");
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  const timeDisplay = document.getElementById("time");
  const endScreen = document.getElementById("end-screen");
  const finalScoreDisplay = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
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

  function checkAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (choiceIndex === currentQuestion.correctIndex) {
      score++;
    } else {
      timeLeft -= 10;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

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

  function saveHighscore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
      highscores.push({ initials, score });
      localStorage.setItem("highscores", JSON.stringify(highscores));
      displayHighscores();
    } else {
      feedbackContainer.textContent = "Please enter your initials.";
    }
  }

  function displayHighscores() {
    window.location.href = "highscores.html";
  }

  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveHighscore);
});