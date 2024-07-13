let checkBox = document.querySelector("#toggle");
let monthly = document.querySelectorAll(".price-monthly");
let yearly = document.querySelectorAll(".price-annually");

checkBox.addEventListener("change", function () {
  if (checkBox.checked) {
    yearly.forEach((price) => (price.style.display = "none"));
    monthly.forEach((price) => (price.style.display = "flex"));
  } else {
    yearly.forEach((price) => (price.style.display = "flex"));
    monthly.forEach((price) => (price.style.display = "none"));
  }
});
