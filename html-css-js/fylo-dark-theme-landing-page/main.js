document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("input[type='email']");

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Form submission handler
  if (form && emailInput) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = emailInput.value;

      if (validateEmail(email)) {
        alert(`Email ${email} successfully submitted!`);
        form.reset(); // Optional: Reset the form after successful submission
      } else {
        alert("Please enter a valid email address.");
      }
    });
  } else {
    console.error("Form or email input not found.");
  }
});
