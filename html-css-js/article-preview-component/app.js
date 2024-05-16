const socials = document.querySelector(".open-share");
const shareBtn = document.getElementById("share");
const removeShareBtn = document.getElementById("remove-share");

shareBtn.addEventListener("click", () => {
  socials.classList.toggle("clicked");
});

removeShareBtn.addEventListener("click", () => {
  socials.classList.remove("clicked");
});

function shareFacebook() {

  var url = "https://example.com";
  
  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url),
    "_blank"
  );
}

function shareTwitter() {
  var url = "https://example.com";

  var text = "Check out this cool website!";

  window.open(
    "https://twitter.com/intent/tweet?url=" +
      encodeURIComponent(url) +
      "&text=" +
      encodeURIComponent(text),
    "_blank"
  );
}

function sharePinterest() {
  var url = "https://example.com";

  var imageUrl = "https://example.com/image.jpg";

  var description = "Check out this cool website!";

  window.open(
    "https://www.pinterest.com/pin/create/button/?url=" +
      encodeURIComponent(url) +
      "&media=" +
      encodeURIComponent(imageUrl) +
      "&description=" +
      encodeURIComponent(description),
    "_blank"
  );
}
