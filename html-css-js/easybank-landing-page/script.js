const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".close");
const menu = document.querySelector(".menu");

let see = false;

if (hamburger) {
  hamburger.addEventListener("click", (event) => {
    hamburger.style.display = "none";
    closeIcon.style.display = "block";
    menu.style.transform = "translateX(0)";
  });
}

if (closeIcon) {
  closeIcon.addEventListener("click", (event) => {
    closeIcon.style.display = "none";
    hamburger.style.display = "block";
    menu.style.transform = "translateX(100%)";
  });
}
