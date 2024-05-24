document.addEventListener("DOMContentLoaded", () => {
  const shareMenu = document.getElementById("share-menu");
  const shareBtn = document.getElementById("share-btn");
  const removeShareBtn = document.getElementById("share-btn");

  shareBtn.addEventListener("click", () => {
    console.log("Share button clicked");
    shareMenu.classList.toggle("open");
  });
  removeShareBtn.addEventListener("click", () => {
    shareMenu.classList.remove("close");
  });
});