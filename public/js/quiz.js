const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const explanationEl = document.getElementById("explanation");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

let index = 0;
let score = 0;
let selected = null;
let answered = false;
let timer;
let timeLeft = 10 * 60;

let quizFinished = false;

// Load category
const category = localStorage.getItem("selectedCategory");
const questions = questionBank[category];

startTimer();
loadQuestion();

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Time's up! Your score: ${score}/${questions.length}`);
            return;
        }
        timeLeft--;
        updateTimerDisplay();
    }, 1000);
}
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

function loadQuestion() {
    const q = questions[index];

    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    explanationEl.textContent = "";

    selected = null;
    answered = false;

    // Disable buttons initially
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50");

    nextBtn.disabled = true;
    nextBtn.classList.add("opacity-50");

    nextBtn.textContent = index === questions.length - 1 ? "Finish Quiz" : "Next Question";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className =
            "option bg-emerald-50 border border-emerald-300 rounded-xl py-2 px-3 text-left transition-all hover:scale-105";

        btn.onclick = () => {
            if (answered) return;

            selected = i;
            const correct = questions[index].correct;


            document.querySelectorAll(".option").forEach((b, idx) => {
                b.disabled = true;

                b.classList.remove("border-emerald-300", "border-red-600", "border-green-600", "border-4");

                if (idx === correct) {
                    b.classList.add("border-green-600", "border-4");
                } else if (idx === selected) {
                    b.classList.add("border-red-600", "border-4");
                }
            });

            // Enable Submit button
            submitBtn.disabled = false;
            submitBtn.classList.remove("opacity-50");

            // Set Next button text if last question
            if (index === questions.length - 1) nextBtn.textContent = "Finish Quiz";
        };

        optionsEl.appendChild(btn);
    });

}

submitBtn.onclick = () => {
    if (selected === null) return;

    const correct = questions[index].correct;
    const buttons = document.querySelectorAll(".option");

    // Disable all options after submission
    buttons.forEach((btn) => btn.disabled = true);
    if (selected === correct) score++;
    explanationEl.textContent = questions[index].explanation;
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-50");
    nextBtn.disabled = false;
    nextBtn.classList.remove("opacity-50");
    answered = true;
};
nextBtn.onclick = () => {
    if (index === questions.length - 1) {
        clearInterval(timer);
        quizFinished = true;

        // If user did not submit, force submit
        if (!answered && selected !== null) {
            const correct = questions[index].correct;
            if (selected === correct) score++;
            answered = true;
        }

        saveHighScore(category, score);
        showScoreModal();
        return;
    }

    // Normal guard for non-final questions
    if (!answered) return;

    index++;
    loadQuestion();
};
function showScoreModal() {
    if (!quizFinished) return;

    const existingOverlay = document.getElementById("scoreOverlay");
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement("div");
    overlay.id = "scoreOverlay";
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

    const modal = document.createElement("div");
    modal.className = "bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center animate-fadeIn";
    modal.style.width = "70%";
    modal.style.maxWidth = "320px";
    modal.style.minHeight = "250px";

    const scoreText = document.createElement("h2");
    scoreText.className = "text-xl font-bold mb-4 text-emerald-700 text-center";
    scoreText.textContent = `Your Score: ${score}/${questions.length}`;

    const againBtn = document.createElement("button");
    againBtn.className = "bg-emerald-300 text-white rounded-xl px-6 py-2 mb-3 w-2/3 hover:scale-105 transition-all";
    againBtn.textContent = "Again Quiz";
    againBtn.onclick = () => {
        document.body.removeChild(overlay);
        index = 0;
        score = 0;
        quizFinished = false;
        timeLeft = 10 * 60;
        startTimer();
        loadQuestion();
    };

    const switchBtn = document.createElement("button");
    switchBtn.className = "bg-emerald-300 text-white rounded-xl px-6 py-2 w-2/3 hover:scale-105 transition-all";
    switchBtn.textContent = "Switch Category";
    switchBtn.onclick = () => {
        window.location.href = "category.html";
    };
    const dashboardBtn = document.createElement("button");
    dashboardBtn.className = "bg-emerald-300 text-white rounded-xl px-6 py-2 w-2/3 hover:scale-105 transition-all mb-3";
    dashboardBtn.textContent = "📊 Dashboard";
    dashboardBtn.onclick = () => {
        window.location.href = "dashboard.html";
    };


    modal.appendChild(scoreText);
    modal.appendChild(dashboardBtn);
    modal.appendChild(againBtn);
    modal.appendChild(switchBtn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

}

// ---------- HIGH SCORE ----------
const maxScores = { pillars: 10, prophets: 10, quran: 10 };

function saveHighScore(category, score) {
    const scores = loadHighScores();
    const percent = Math.min((score / maxScores[category]) * 100, 100);
    if (!scores[category] || percent > scores[category]) {
        scores[category] = percent;
        localStorage.setItem("islamicQuizHighScores", JSON.stringify(scores));
    }
    updateCharts();
}

// ---------- HOME BUTTON ----------
const homeBtn = document.getElementById("home-btn");
if (homeBtn) {
    homeBtn.addEventListener("click", () => {

        window.location.href = "index.html";
    });
}
const dashboardBtn = document.getElementById("dashboard-btn");
if (dashboardBtn) {
    dashboardBtn.addEventListener("click", () => {
        window.location.href = "dashboard.html"; // your dashboard path
    })
}
const profileBtn = document.getElementById("profile-btn");
if (profileBtn) profileBtn.onclick = () => window.location.href = "profile.html";
function updateCharts() {
    // No charts on quiz page — prevent crash
}

function loadHighScores() {
    const stored = localStorage.getItem("islamicQuizHighScores");
    return stored ? JSON.parse(stored) : {};
}
