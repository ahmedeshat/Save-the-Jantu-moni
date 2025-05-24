const questionsLevel1 = [
  { q: "What is Jantu Moni's favorite color?", options: ["Blue", "Pink", "Green", "Purple"], a: "Purple" },
  { q: "What food does Jantu Moni love?", options: ["Pizza", "Biryani", "Roast", "Sushi"], a: "Roast" },
  { q: "When is Jantu Moni's birthday?", options: ["October 16", "December 25", "January 1", "July 3"], a: "July 3" },
  { q: "What is Jantu Moni's hobby?", options: ["Travelling", "Singing", "Driving", "Dancing"], a: "Travelling" }
];

const questionsLevel2 = [
  { q: "Should a wife be kind and respectful to her husband?", options: ["Yes", "No"], a: "Yes" },
  { q: "Should a wife care for her husband's parents?", options: ["Yes", "No"], a: "Yes" },
  { q: "Should a wife support her husband in hard times?", options: ["Yes", "No"], a: "Yes" },
  { q: "Should a wife protect herself when husband is away?", options: ["Yes", "No"], a: "Yes" },
  { q: "Should a wife pray for her husband's success?", options: ["Yes", "No"], a: "Yes" },
  { q: "Should a wife talk to her husband politely?", options: ["Yes", "No"], a: "Yes" }
];

let currentAnswers = 0;
let currentQuestionIndex = 0;
let currentLevelId = "";
let currentQuestions = [];

function startGame() {
  hideAllScreens();
  showLevel("level1", questionsLevel1);
}

function showLevel(levelId, questions) {
  hideAllScreens();
  currentLevelId = levelId;
  currentQuestions = questions;
  currentQuestionIndex = 0;

  const container = document.getElementById(levelId);
  container.classList.remove("hidden");

  const questionDiv = container.querySelector(".question-set");
  questionDiv.innerHTML = "";
  createProgressBar(questionDiv, questions.length);
  showNextQuestion(questionDiv);
}

function hideAllScreens() {
  document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
}

function createProgressBar(container, total) {
  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";
  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar";
  progressBar.id = "progress-bar";
  progressContainer.appendChild(progressBar);
  container.appendChild(progressContainer);
}

function updateProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (bar) {
    const progress = (currentQuestionIndex / currentQuestions.length) * 100;
    bar.style.width = progress + "%";
  }
}

function showNextQuestion(container) {
  if (currentQuestionIndex >= currentQuestions.length) {
    hideAllScreens();
    if (currentLevelId === "level1") {
      currentAnswers += 4;
      showLevel("level2", questionsLevel2);
    } else {
      document.getElementById("level3").classList.remove("hidden");
    }
    return;
  }

  const item = currentQuestions[currentQuestionIndex];
  const wrapper = document.createElement("div");
  wrapper.className = "question-block";

  const question = document.createElement("p");
  question.textContent = item.q;
  wrapper.appendChild(question);

  item.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(btn, item.a, wrapper, container);
    wrapper.appendChild(btn);
  });

  container.appendChild(wrapper);
  updateProgressBar();
}

function handleAnswer(btn, correctAnswer, wrapper, container) {
  if (btn.textContent.toLowerCase() === correctAnswer.toLowerCase()) {
    btn.style.backgroundColor = "green";
    showFeedback(wrapper, "You are right!", "green");
    currentAnswers++;
    currentQuestionIndex++;
    updateProgressBar();
    setTimeout(() => {
      container.removeChild(wrapper);
      showNextQuestion(container);
    }, 1000);
  } else {
    btn.style.backgroundColor = "red";
    showFeedback(wrapper, "Wrong! Try again.", "red");
  }
}

function showFeedback(wrapper, text, color) {
  const feedback = document.createElement("div");
  feedback.textContent = text;
  feedback.style.color = color;
  wrapper.appendChild(feedback);
}

function acceptCommand1() {
  document.getElementById("command2").classList.remove("hidden");
}

function acceptCommand2() {
  hideAllScreens();
  document.getElementById("congratulations").classList.remove("hidden");
}
