// document.addEventListener("DOMContentLoaded", () => {
//     const startBtn = document.querySelector(".start-btn");
//     const user = localStorage.getItem("user");
//     const signupModal = document.querySelector(".signup-modal");
//     if (signupModal && user) {
//         signupModal.classList.add("hidden");
//     }
//     // if (startBtn) 
//     // startBtn.addEventListener("click", () => {
//     //     const user = localStorage.getItem("user");

//     //     if (user) {
//     //         window.location.href = "category.html";
//     //     } else {
//     //         window.location.href = "form.html";
//     //     }
//     // });

//     startBtn.addEventListener("click", () => {
//         const user = localStorage.getItem("user");

//         console.log("User:", user);

//         if (user) {
//             window.location.href = "category.html";
//         } else {
//             window.location.href = "form.html";
//         }
//     });


//     const homeBtn = document.getElementById("home-btn");
//     if (homeBtn) homeBtn.onclick = () => window.location.href = "index.html";
//     const dashboardBtn = document.getElementById("dashboard-btn");
//     dashboardBtn?.addEventListener("click", () => {
//         window.location.href = "dashboard.html"; // your dashboard page
//     });
//     const profileBtn = document.getElementById("profile-btn");
//     if (profileBtn) profileBtn.onclick = () => window.location.href = "profile.html";

// });



document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector(".start-btn");

    if (startBtn) {
        startBtn.addEventListener("click", () => {
            const storedUser = JSON.parse(localStorage.getItem("user") || "null");
            if (storedUser && storedUser.email) {
                // user exists → go to category page
                window.location.href = "category.html";
            } else {
                // no user → go to signup form
                window.location.href = "form.html";
            }
        });
    }

    const homeBtn = document.getElementById("home-btn");
    if (homeBtn) homeBtn.onclick = () => window.location.href = "index.html";

    const dashboardBtn = document.getElementById("dashboard-btn");
    dashboardBtn?.addEventListener("click", () => {
        window.location.href = "dashboard.html";
    });

    const profileBtn = document.getElementById("profile-btn");
    if (profileBtn) profileBtn.onclick = () => window.location.href = "profile.html";
});
