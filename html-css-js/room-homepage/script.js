document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const nav = document.querySelector(".room__nav");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true" || false;
    menuBtn.setAttribute("aria-expanded", !expanded);
    nav.setAttribute("aria-hidden", expanded);
    menu.setAttribute("aria-expanded", !expanded);
  });

  const prevBtn = document.getElementById("slider-btn-left");
  const nextBtn = document.getElementById("slider-btn-right");
  const slides = document.querySelectorAll(".slider__section");
  const images = [
    "images/desktop-image-hero-1.jpg",
    "images/desktop-image-hero-2.jpg",
    "images/desktop-image-hero-3.jpg",
  ];
  const heroImage = document.querySelector(".room__section--hero-image");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
      slide.setAttribute("aria-hidden", i !== index);
    });
    heroImage.style.backgroundImage = `url(${images[index]})`;
  }

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Initial display
  showSlide(currentSlide);
});
