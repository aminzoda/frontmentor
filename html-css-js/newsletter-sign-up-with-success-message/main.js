document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("email");
  const signupForm = document.getElementById("signup-form");
  const successMessage = document.getElementById("success-message");
  const dismissButton = document.getElementById("dismiss-button");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;

    if (validateEmail(email)) {
      signupForm.style.display = "none";
      successMessage.style.display = "block";
      emailInput.classList.remove("error");
      errorMessage.style.display = "none";
    } else {
      emailInput.classList.add("error");
      errorMessage.style.display = "block";
    }
  });

  dismissButton.addEventListener("click", () => {
    signupForm.style.display = "flex";
    successMessage.style.display = "none";
    form.reset();
    emailInput.classList.remove("error");
    errorMessage.style.display = "none";
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});
