document.addEventListener("DOMContentLoaded", function () {
    const john = document.querySelector(".john");
    const tanya = document.querySelector(".tanya");
    const prev = document.querySelector(".prev__button");
    const next = document.querySelector(".next__button");
  
    john.classList.add("hide");
  
    const slideChange = () => {
      if (john.classList.contains("hide")) {
        john.classList.remove("hide");
        tanya.classList.add("hide");
      } else {
        tanya.classList.remove("hide");
        john.classList.add("hide");
      }
    };
  
    prev.addEventListener("click", slideChange);
    next.addEventListener("click", slideChange);
  });
  