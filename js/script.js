// ==========================================================
// Din 4 mein yahan add hoga:
// 1. Contact form validation
// 2. Mobile menu toggle
// 3. Scroll-to-top button behavior
// Abhi ke liye sirf footer ka year auto-update kar rahe hain.
// ==========================================================

document.getElementById("year").textContent = new Date().getFullYear();

/* ==========================================================
   1. MOBILE MENU TOGGLE
   ========================================================== */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");

  // Icon switch: bars <-> xmark
  const icon = navToggle.querySelector("i");
  if (navMenu.classList.contains("show-menu")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Menu link pe click karte hi mobile menu apne aap band ho jaye
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ==========================================================
   2. SCROLL-TO-TOP BUTTON
   ========================================================== */
const scrollTopBtn = document.getElementById("scroll-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show-scroll");
  } else {
    scrollTopBtn.classList.remove("show-scroll");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================================
   3. CONTACT FORM VALIDATION
   ========================================================== */
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formSuccess = document.getElementById("form-success");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

function showError(input, errorEl, message) {
  input.closest(".form__group").classList.add("error");
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.closest(".form__group").classList.remove("error");
  errorEl.textContent = "";
}

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Name check
  if (nameInput.value.trim() === "") {
    showError(nameInput, nameError, "Please enter your name.");
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Email check
  if (emailInput.value.trim() === "") {
    showError(emailInput, emailError, "Please enter your email.");
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, emailError, "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Message check
  if (messageInput.value.trim() === "") {
    showError(messageInput, messageError, "Please write a short message.");
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, "Message should be at least 10 characters.");
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (isValid) {
    formSuccess.classList.add("show");
    form.reset();

    // Success message kuch second baad chhupa do
    setTimeout(() => {
      formSuccess.classList.remove("show");
    }, 4000);
  } else {
    formSuccess.classList.remove("show");
  }
});
