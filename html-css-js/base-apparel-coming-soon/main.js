document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailForm");
  const email = document.getElementById("email");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let emailValue = email.value;
    if (validateEmail(emailValue)) {
      form.classList.remove("error");
    } else {
      form.classList.add("error");
    }
  });

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(String(email).toLowerCase());
  }
});
