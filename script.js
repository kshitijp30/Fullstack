const questions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: 1,
        explanation: "Mars looks red because its surface contains iron oxide."
    },
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Tool Multi Language",
            "HomeText Markup Language"
        ],
        answer: 0,
        explanation: "HTML stands for HyperText Markup Language."
    },
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "SQL", "Python"],
        answer: 1,
        explanation: "CSS controls the design and layout of web pages."
    },
    {
        question: "What is 12 multiplied by 8?",
        options: ["86", "96", "108", "88"],
        answer: 1,
        explanation: "12 multiplied by 8 equals 96."
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["constant", "let", "const", "fixed"],
        answer: 2,
        explanation: "The const keyword declares a block-scoped binding."
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;
let answered = false;
let wrongAnswers = [];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const countElement = document.getElementById("question-count");
const timerElement = document.getElementById("timer");
const progressFill = document.getElementById("progress-fill");
const messageElement = document.getElementById("message");
const explanationElement = document.getElementById("explanation");

const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    updateTimer();

    timer = setInterval(function () {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (!answered) {
                selectAnswer(-1);
            }
        }
    }, 1000);
}

function updateTimer() {
    timerElement.textContent =
        "00:" + String(timeLeft).padStart(2, "0");
}

function loadQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    countElement.textContent =
        `Question ${currentQuestion + 1}/${questions.length}`;

    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";
    messageElement.textContent = "Choose one answer.";
    explanationElement.textContent = "";
    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next";

    q.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent =
            String.fromCharCode(65 + index) + ". " + option;

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        optionsElement.appendChild(button);
    });

    startTimer();
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    clearInterval(timer);

    const q = questions[currentQuestion];
    const buttons = optionsElement.querySelectorAll(".option");

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === q.answer) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === q.answer) {
        score++;
        scoreElement.textContent = score;
        messageElement.textContent = "Correct answer!";
    } else {
        messageElement.textContent =
            selectedIndex === -1
                ? "Time is up!"
                : "Wrong answer! The correct answer is highlighted.";

        wrongAnswers.push({
            question: q.question,
            selected: selectedIndex === -1
                ? "No answer (time ran out)"
                : q.options[selectedIndex],
            correct: q.options[q.answer],
            explanation: q.explanation
        });
    }

    explanationElement.textContent = q.explanation;
    nextButton.disabled = false;
}

function showResults() {
    clearInterval(timer);

    quizScreen.hidden = true;
    resultScreen.hidden = false;

    countElement.textContent = "Quiz completed";
    timerElement.textContent = "--:--";
    progressFill.style.width = "100%";

    document.getElementById("final-score").textContent =
        `Your score: ${score}/${questions.length}`;

    const percentage = (score / questions.length) * 100;
    let rating;

    if (percentage >= 80) {
        rating = "Excellent work!";
    } else if (percentage >= 60) {
        rating = "Good job! Keep practising.";
    } else if (percentage >= 40) {
        rating = "Nice effort. Try again!";
    } else {
        rating = "Keep learning. You can do it!";
    }

    document.getElementById("rating").textContent = rating;
    document.getElementById("review-list").innerHTML = "";
}

function reviewWrongAnswers() {
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    if (wrongAnswers.length === 0) {
        reviewList.textContent = "Excellent! No wrong answers.";
        return;
    }

    wrongAnswers.forEach(function (item, index) {
        const div = document.createElement("div");
        div.className = "review-item";

        const title = document.createElement("strong");
        title.textContent = `${index + 1}. ${item.question}`;

        const selected = document.createElement("p");
        selected.textContent = `Your answer: ${item.selected}`;

        const correct = document.createElement("p");
        correct.textContent = `Correct answer: ${item.correct}`;

        const explanation = document.createElement("p");
        explanation.textContent = item.explanation;

        div.append(title, selected, correct, explanation);
        reviewList.appendChild(div);
    });
}

function restartQuiz() {
    clearInterval(timer);

    currentQuestion = 0;
    score = 0;
    wrongAnswers = [];

    scoreElement.textContent = "0";
    quizScreen.hidden = false;
    resultScreen.hidden = true;

    loadQuestion();
}

nextButton.addEventListener("click", function () {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", restartQuiz);

document.getElementById("play-again-btn")
    .addEventListener("click", restartQuiz);

document.getElementById("review-btn")
    .addEventListener("click", reviewWrongAnswers);

loadQuestion();

