

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

const navigationItems = document.querySelectorAll("#nav-links a");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});

function closeMenu() {

    navLinks.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}

navigationItems.forEach(link => {

    link.addEventListener("click", closeMenu);

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


const themeToggle = document.getElementById("theme-toggle");

const body = document.body;

try {

    if (localStorage.getItem("portfolio-theme") === "light") {
        body.classList.add("light-theme");
    }

} catch (error) {

    console.info("Theme preference storage is unavailable.");

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


themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    const currentTheme = body.classList.contains("light-theme")
        ? "light"
        : "dark";

    try {

        localStorage.setItem("portfolio-theme", currentTheme);

    } catch (error) {

        console.info("Theme preference could not be saved.");

    }

    updateThemeButton();

});



const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    currentObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}



const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    backToTop.classList.toggle(
        "visible",
        window.scrollY > 500
    );

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


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

    [nameInput, emailInput, messageInput].forEach(input => {

        input.classList.remove("invalid");

    });

    successMessage.textContent = "";

}


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    clearErrors();

    let isValid = true;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (name.length < 2) {

        nameError.textContent = "Please enter a valid name.";

        nameInput.classList.add("invalid");

        isValid = false;

    }


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
            "Your form is valid! Thank you for reaching out.";

        contactForm.reset();

    }

});