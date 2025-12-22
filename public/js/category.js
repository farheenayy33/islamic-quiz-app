document.addEventListener("DOMContentLoaded", () => {

    // Category buttons
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.dataset.category;
            localStorage.setItem("selectedCategory", category);
            window.location.href = "quiz.html";
        });
    });

    // Optional function to select category programmatically
    function selectCategory(categoryName) {
        localStorage.setItem("selectedCategory", categoryName);
        localStorage.removeItem("quizFinished"); // optional
        localStorage.removeItem("lastScore");
        window.location.href = "quiz.html";
    }

    // Dashboard button
    const dashboardBtn = document.getElementById("dashboard-btn");
    dashboardBtn?.addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });

    // Home button
    const homeBtn = document.getElementById("home-btn");
    homeBtn?.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Profile button
    const profileBtn = document.getElementById("profile-btn");
    profileBtn?.addEventListener("click", () => {
        window.location.href = "profile.html";
    });

});
