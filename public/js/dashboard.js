// Maximum questions for each category
const maxScores = {
    pillars: 10,
    prophets: 10,
    quran: 10
};

// Load high scores from localStorage
function loadHighScores() {
    return JSON.parse(localStorage.getItem("islamicQuizHighScores")) || {
        pillars: 0,
        prophets: 0,
        quran: 0
    };
}

// Save a new score for a category if it's higher
// Call this **only when a quiz is finished**
function saveHighScore(category, score) {
    const scores = loadHighScores();

    // Convert raw score to percentage
    const percent = Math.min((score / maxScores[category]) * 100, 100);

    // Only update if new percentage is higher
    if (!scores[category] || percent > scores[category]) {
        scores[category] = percent;
        localStorage.setItem("islamicQuizHighScores", JSON.stringify(scores));
    }

    updateCharts(); // Refresh charts after saving
}

// Animate circular fill (0–100%)
// Animate circular fill (percentage 0–100%)
// function animateFill(chartId, percentage) {
//     const chart = document.getElementById(chartId);
//     const fill = chart.querySelector(".fill");
//     const inside = chart.querySelector(".inside-circle");

//     percentage = Math.min(percentage, 100); // cap at 100%

//     let current = 0;
//     clearInterval(chart.interval);

//     chart.interval = setInterval(() => {
//         if (current >= percentage) {
//             clearInterval(chart.interval);
//             inside.textContent = Math.round(percentage) + "%";
//         } else {
//             current++;
//             const deg = (current / 100) * 360;
//             fill.style.transform = `rotate(${deg}deg)`;
//             inside.textContent = Math.round(current) + "%";
//         }
//     }, 10);
// }
function animateFill(chartId, percentage) {
    const chart = document.getElementById(chartId);
    const fill = chart.querySelector(".fill");
    const inside = chart.querySelector(".inside-circle");

    percentage = Math.min(percentage, 100); // cap at 100%
    let current = 0;
    clearInterval(chart.interval);

    chart.interval = setInterval(() => {
        if (current >= percentage) {
            clearInterval(chart.interval);
            inside.textContent = Math.round(percentage) + "%";
        } else {
            current++;
            // Update conic-gradient background
            fill.style.background = `conic-gradient(#16d394 0deg ${current * 3.6}deg, #eee ${current * 3.6}deg 360deg)`;
            inside.textContent = Math.round(current) + "%";
        }
    }, 10);
}

// Update all charts
function updateCharts() {
    const scores = loadHighScores();

    animateFill("chart-pillars", scores.pillars || 0);
    animateFill("chart-prophets", scores.prophets || 0);
    animateFill("chart-quran", scores.quran || 0);

    // Overall progress as average
    const overall = Math.round(
        ((scores.pillars || 0) + (scores.prophets || 0) + (scores.quran || 0)) / 3
    );
    animateFill("chart-overall", overall);
}

// On page load, show stored percentages but **do not animate infinitely**
// On page load, show stored percentages and animate charts
document.addEventListener("DOMContentLoaded", () => {
    updateCharts(); // always run, even if some scores are 0
});

