const accordingBtns = document.querySelectorAll(".accordion-btn");

accordingBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
        this.classList.toggle("active");
        const accordingDescription = this.nextElementSibling;
        const plusIcon = this.querySelector(".plus-icon");
        const minusIcon = this.querySelector(".minus-icon");

        if (accordingDescription.style.maxHeight) {
            accordingDescription.style.maxHeight = null;
            plusIcon.style.display = "block";
            minusIcon.style.display = "none";
        } else {
            accordingDescription.style.maxHeight =
            accordingDescription.scrollHeight + "px";
            plusIcon.style.display = "none";
            minusIcon.style.display = "block";
        }
    })
})
