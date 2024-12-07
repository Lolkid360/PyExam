let questionBank = [];
let currentQuestion = null;
let selectedAnswer = null;
let numCorrect = 0;
let numAnswered = 0;

// DOM Elements
const fileInput = document.getElementById("fileInput");
const importBtn = document.getElementById("importBtn");
const resetBtn = document.getElementById("resetBtn");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const submitBtn = document.getElementById("submitBtn");
const questionText = document.getElementById("questionText");
const choiceButtons = document.querySelectorAll(".choice-btn");
const numCorrectDisplay = document.getElementById("numCorrect");
const numAnsweredDisplay = document.getElementById("numAnswered");

importBtn.addEventListener("click", importQuestions);
resetBtn.addEventListener("click", reset);
nextQuestionBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitAnswer);
choiceButtons.forEach(btn => btn.addEventListener("click", () => selectAnswer(btn)));

function importQuestions() {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      parseCSV(e.target.result);
      nextQuestion();
    };
    reader.readAsText(file);
  } else {
    alert("Please select a CSV file to import.");
  }
}

function parseCSV(data) {
  const rows = data.split("\n").map(row => row.split(","));
  questionBank = rows.slice(1).map(row => ({
    question: row[0],
    choices: [row[1], row[2], row[3], row[4]],
    answer: row[4].trim()
  }));
}

function nextQuestion() {
  if (questionBank.length > 0) {
    currentQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
    displayQuestion();
    submitBtn.disabled = false;
    nextQuestionBtn.disabled = true;
  }
}

function displayQuestion() {
  questionText.textContent = currentQuestion.question;
  currentQuestion.choices.forEach((choice, index) => {
    choiceButtons[index].textContent = `${String.fromCharCode(65 + index)}. ${choice}`;
    choiceButtons[index].classList.remove("selected");
  });
  selectedAnswer = null;
}

function selectAnswer(button) {
  choiceButtons.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
  selectedAnswer = button.textContent.split(". ")[1];
}

function submitAnswer() {
  if (selectedAnswer) {
    numAnswered++;
    if (selectedAnswer === currentQuestion.answer) {
      numCorrect++;
    }
    updateStats();
    submitBtn.disabled = true;
    nextQuestionBtn.disabled = false;
  } else {
    alert("Please select an answer.");
  }
}

function updateStats() {
  numCorrectDisplay.textContent = numCorrect;
  numAnsweredDisplay.textContent = numAnswered;
}

function reset() {
  numCorrect = 0;
  numAnswered = 0;
  updateStats();
  questionText.textContent = "Please import a question bank to begin.";
  submitBtn.disabled = true;
  nextQuestionBtn.disabled = true;
  choiceButtons.forEach(btn => btn.textContent = "");
}
