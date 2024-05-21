document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const button = form.querySelector('[type="submit"]');

  const error = document.createElement("p");
  error.classList.add("error_text");
  error.textContent = "Please enter a valid email address."; // Define msg directly

  function checkEmail(e) {
    e.preventDefault();
    const email = form.querySelector('[type="email"]').value; // Scope to form
    if (!validateEmail(email)) {
      form.classList.add("error");
      if (!form.contains(error)) { // Check if error element is not already in the form
        form.insertBefore(error, button);
      }
    } else {
      form.classList.remove("error");
      if (form.contains(error)) { // Check if error element is in the form before removing
        form.removeChild(error);
      }
    }
    console.log(email);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  }

  form.addEventListener("submit", checkEmail);
});
