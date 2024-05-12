document.addEventListener("DOMContentLoaded", function () {
  const accordionBtns = document.querySelectorAll(".accordion-btn");

  accordionBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const isActive = this.classList.toggle("active");
      const accordionDescription = this.nextElementSibling;
      const [plusIcon, minusIcon] = this.querySelectorAll(
        ".plus-icon, .minus-icon"
      );

      plusIcon.style.display = isActive ? "none" : "block";
      minusIcon.style.display = isActive ? "block" : "none";
      accordionDescription.style.maxHeight = isActive
        ? accordionDescription.scrollHeight + "px"
        : null;

      accordionBtns.forEach(function (otherBtn) {
        if (otherBtn !== btn && otherBtn.classList.contains("active")) {
          otherBtn.classList.remove("active");
          otherBtn.querySelector(".plus-icon").style.display = "block";
          otherBtn.querySelector(".minus-icon").style.display = "none";
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });
    });
  });
});
