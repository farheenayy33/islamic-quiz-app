// Fetch user info from localStorage
const userData = JSON.parse(localStorage.getItem("user"));

const name = userData?.name || "User";
const email = userData?.email || "user@example.com";

// Display username and email if elements exist
const usernameEl = document.getElementById("username");
if (usernameEl) usernameEl.textContent = name;

const emailEl = document.getElementById("email");
if (emailEl) emailEl.textContent = email;

// Generate avatar initials if element exists
const avatarEl = document.getElementById("avatar");
if (avatarEl) {
    const initials = name.split(" ").map(n => n[0].toUpperCase()).join("");
    avatarEl.textContent = initials;

    // Optional: Dynamic avatar background color based on first letter
    const colors = ["#16d394", "#34d399", "#10b981", "#059669", "#047857"];
    const firstLetter = initials[0];
    const colorIndex = firstLetter.charCodeAt(0) % colors.length;
    avatarEl.style.backgroundColor = colors[colorIndex];
}

// Button actions
function startQuiz() { window.location.href = "category.html"; }
function goDashboard() { window.location.href = "dashboard.html"; }

// Bottom bar navigation
const homeBtn = document.getElementById("home-btn");
if (homeBtn) homeBtn.onclick = () => window.location.href = "index.html";

const dashboardBtn = document.getElementById("dashboard-btn");
if (dashboardBtn) dashboardBtn.onclick = () => window.location.href = "dashboard.html";

const profileBtn = document.getElementById("profile-btn");
if (profileBtn) profileBtn.onclick = () => window.location.href = "profile.html";
