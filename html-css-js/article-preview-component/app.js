const socials = document.querySelector(".open-share");
const shareBtn = document.getElementById("share");
const removeShareBtn = document.getElementById("remove-share");

shareBtn.addEventListener("click", () => {
  socials.classList.toggle("clicked");
});

removeShareBtn.addEventListener("click", () => {
  socials.classList.remove("clicked");
});


