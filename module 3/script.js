
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navigationItems = document.querySelectorAll("#nav-links a");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

navigationItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

});


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

});

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("portfolio-theme");
} catch (error) {
    console.log("Theme storage is unavailable.");
}

if (savedTheme === "light") {
    body.classList.add("light-theme");
}

function updateThemeButton() {

    const isLight = body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
    );

}

updateThemeButton();


themeToggle.addEventListener("click", function () {

    body.classList.toggle("light-theme");

    const currentTheme = body.classList.contains("light-theme")
        ? "light"
        : "dark";

    try {
        localStorage.setItem("portfolio-theme", currentTheme);
    } catch (error) {
        console.log("Theme preference could not be saved.");
    }

    updateThemeButton();

});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const successMessage = document.getElementById("form-success");

function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    nameInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");
    messageInput.classList.remove("invalid");

    successMessage.textContent = "";

}



contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    clearErrors();

    let isValid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name.length < 2) {

        nameError.textContent = "Please enter a valid name.";
        nameInput.classList.add("invalid");

        isValid = false;

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        emailError.textContent = "Please enter a valid email address.";
        emailInput.classList.add("invalid");

        isValid = false;

    }

    if (message.length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        messageInput.classList.add("invalid");

        isValid = false;

    }

    if (isValid) {

        successMessage.textContent =
            "Your form is valid! Thank you for contacting me.";

        contactForm.reset();

    }

});
