// const menu = document.querySelector(".mobile nav");
// const hamburguer = document.querySelector("#hamburguer");
// const closeHamburguer = document.querySelector("#close-menu");
// const backdrop = document.querySelector("#backdrop");

// hamburguer.addEventListener("click", () => {
//   if (menu.getAttribute("class") == "dropOut") {
//     hamburguer.setAttribute("src", "images/icon-close.svg");
//     menu.classList.remove("dropOut");
//     menu.classList.add("dropIn");
//     backdrop.setAttribute("style", "display:flex");
//   } else {
//     hamburguer.setAttribute("src", "images/icon-hamburger.svg");
//     backdrop.setAttribute("style", "display:none");
//     menu.classList.remove("dropIn");
//     menu.classList.add("dropOut");
//   }
// });
async function fetchData() {
  try {
    let response = await fetch("https://github.com/aminzoda/desktop-tutorial");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
fetchData();
