document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const navbar = document.querySelector("nav");
//   const openMenu = document.getElementById("menu-button");
//   const closeMenu = document.getElementById("menu-close");

//   openMenu.addEventListener("click", () => {
//     navbar.classList.add("open");
//   });

//   closeMenu.addEventListener("click", () => {
//     navbar.classList.remove("open");
//   });
// });
