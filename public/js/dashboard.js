const maxScores = {
    pillars: 10,
    prophets: 10,
    quran: 10
};
function loadHighScores() {
    return JSON.parse(localStorage.getItem("islamicQuizHighScores")) || {
        pillars: 0,
        prophets: 0,
        quran: 0
    };
}
function saveHighScore(category, score) {
    const scores = loadHighScores();
    const percent = Math.min((score / maxScores[category]) * 100, 100);
    if (!scores[category] || percent > scores[category]) {
        scores[category] = percent;
        localStorage.setItem("islamicQuizHighScores", JSON.stringify(scores));
    }

    updateCharts();
}
function animateFill(chartId, percentage) {
    const chart = document.getElementById(chartId);
    const fill = chart.querySelector(".fill");
    const inside = chart.querySelector(".inside-circle");

    percentage = Math.min(percentage, 100);
    let current = 0;
    clearInterval(chart.interval);
    chart.interval = setInterval(() => {
        if (current >= percentage) {
            clearInterval(chart.interval);
            inside.textContent = Math.round(percentage) + "%";
        } else {
            current++;
            fill.style.background = `conic-gradient(#16d394 0deg ${current * 3.6}deg, #eee ${current * 3.6}deg 360deg)`;
            inside.textContent = Math.round(current) + "%";
        }
    }, 10);
}

function updateCharts() {
    const scores = loadHighScores();

    animateFill("chart-pillars", scores.pillars || 0);
    animateFill("chart-prophets", scores.prophets || 0);
    animateFill("chart-quran", scores.quran || 0);

    const overall = Math.round(
        ((scores.pillars || 0) + (scores.prophets || 0) + (scores.quran || 0)) / 3
    );
    animateFill("chart-overall", overall);
}

document.addEventListener("DOMContentLoaded", () => {
    updateCharts();
});

