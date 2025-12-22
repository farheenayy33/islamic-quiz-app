
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signupForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const user = localStorage.getItem("user");
    const signupModal = document.querySelector(".signup-modal");
    if (signupModal && user) {
        signupModal.classList.add("hidden");
    }
    
    if (!(form && nameInput && emailInput && passwordInput)) return;

    function createDisclaimer(text) {
        const div = document.createElement("div");
        div.textContent = text;
        div.classList.add("disclaimer");
        return div;
    }

    function wrapInput(input, disclaimer) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("input-wrapper");
        input.replaceWith(wrapper);
        wrapper.appendChild(input);
        wrapper.appendChild(disclaimer);
        return wrapper;
    }

    // Create disclaimers
    const nameDisc = createDisclaimer("Name: letters only, 3-20 characters, no space");
    const passDisc = createDisclaimer("Password: 6+ chars, include capital, number & special");
    const emailDisc = createDisclaimer("Enter a random email not personal");

    wrapInput(nameInput, nameDisc);
    wrapInput(passwordInput, passDisc);
    wrapInput(emailInput, emailDisc);

    // Regex patterns
    const nameRegex = /^[A-Za-z]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[^\s]{6,}$/;

    // Email disclaimer on hover/focus only
    emailInput.addEventListener("mouseover", () => emailDisc.classList.add("show"));
    emailInput.addEventListener("click", () => emailDisc.classList.remove("show"));
    emailInput.addEventListener("focus", () => emailDisc.classList.add("show"));
    emailInput.addEventListener("blur", () => emailDisc.classList.remove("show"));

    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;

        // Hide disclaimers initially
        nameDisc.classList.remove("show");
        passDisc.classList.remove("show");

        // Validate Name
        if (!nameRegex.test(nameInput.value)) {
            nameDisc.classList.add("show");
            valid = false;
        }

        if (!emailRegex.test(emailInput.value)) {
            alert("Please enter a valid email");
            valid = false;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            passDisc.classList.add("show");
            valid = false;
        }

        if (!valid) return;

        // Save user
        localStorage.setItem("user", JSON.stringify({
            name: nameInput.value,
            email: emailInput.value
        }));

        // Send to backend
        const formData = new FormData(form);
        fetch('Api/form.php', { method: 'POST', body: formData })

            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    alert("Signup successful!");
                    window.location.href = 'category.html';
                } else {
                    alert("Error storing in DB: " + data.message);
                }
            })
            .catch(err => console.error("Fetch error:", err));
    });
});


const homeBtn = document.getElementById("home-btn");
if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
const dashboardBtn = document.getElementById("dashboard-btn");
dashboardBtn?.addEventListener("click", () => {
    window.location.href = "dashboard.html";
})