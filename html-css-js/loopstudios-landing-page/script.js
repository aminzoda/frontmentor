"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("open-btn");
  const closeBtn = document.getElementById("close-btn");
  const navBar = document.querySelector(".navbar-nav");

  const navbarToggle = () => navBar.classList.toggle("active");

  if (hamburger) {
    hamburger.addEventListener("click", navbarToggle);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", navbarToggle);
  }
});
