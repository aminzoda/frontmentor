// Menu and navigation
const menuIcon = document.querySelector(".menu-icon");
const backdrop = document.querySelector(".backdrop");
const navLinks = document.querySelector(".nav-links");
const closeIcon = document.querySelector(".close-icon");

menuIcon.addEventListener("click", () => {
  backdrop.classList.add("active");
  navLinks.classList.add("active");
});

closeIcon.addEventListener("click", () => {
  backdrop.classList.remove("active");
  navLinks.classList.remove("active");
});

backdrop.addEventListener("click", () => {
  backdrop.classList.remove("active");
  navLinks.classList.remove("active");
});

// Image gallery
const mainImages = document.querySelectorAll(".default .main-img img");
const thumbnails = document.querySelectorAll(".default .thumb-list div");
const lightboxMainImages = document.querySelectorAll(".lightbox .main-img img");
const lightboxThumbnails = document.querySelectorAll(
  ".lightbox .thumb-list div"
);
const lightbox = document.querySelector(".lightbox");
const iconClose = document.querySelector(".icon-close");
const iconPrev = document.querySelector(".icon-prev");
const iconNext = document.querySelector(".icon-next");

let currentImageIndex = 0;

const changeImage = (index, mainImages, thumbnails) => {
  mainImages.forEach((img) => {
    img.classList.remove("active");
  });
  thumbnails.forEach((thumb) => {
    thumb.classList.remove("active");
  });

  mainImages[index].classList.add("active");
  thumbnails[index].classList.add("active");
  currentImageIndex = index;
};

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, mainImages, thumbnails);
  });
});

lightboxThumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

mainImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    changeImage(index, lightboxMainImages, lightboxThumbnails);
  });
});

iconPrev.addEventListener("click", () => {
  const newIndex =
    currentImageIndex <= 0 ? mainImages.length - 1 : currentImageIndex - 1;
  changeImage(newIndex, lightboxMainImages, lightboxThumbnails);
});

iconNext.addEventListener("click", () => {
  const newIndex =
    currentImageIndex >= mainImages.length - 1 ? 0 : currentImageIndex + 1;
  changeImage(newIndex, lightboxMainImages, lightboxThumbnails);
});

iconClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// Cart functionality
const countElement = document.querySelector(".count");
const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const addToCartButton = document.querySelector(".add-to-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const checkoutButton = document.querySelector(".checkout");
const cartCountElement = document.querySelector(".cart-count");

let count = 0;
let totalCartQuantity = 0;

const updateCount = (newCount) => {
  count = newCount;
  countElement.textContent = count;
};

minusButton.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plusButton.addEventListener("click", () => {
  updateCount(count + 1);
});

cartCountElement.addEventListener("click", () => {
  cartContainer.classList.toggle("active");
});

const updateTotalCartQuantity = () => {
  const cartItems = document.querySelectorAll(".cart-item");
  totalCartQuantity = Array.from(cartItems).reduce((total, item) => {
    return total + parseInt(item.dataset.quantity);
  }, 0);

  cartCountElement.innerHTML = `<span class="qty">${totalCartQuantity}</span>`;
};

const addItemToCart = (name, price, imageSrc) => {
  const totalPrice = count * price;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.dataset.quantity = count;
  cartItem.innerHTML = `
    <img src="${imageSrc}" alt="${name}" />
    <div class="item-details">
      <div>${name}</div>
      <div>
        <p>
          $${price.toFixed(2)} x ${count}
          <span class="total-price">$${totalPrice.toFixed(2)}</span>
        </p>
      </div>
    </div>
    <button class="delete-item">
      <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
        </defs>
        <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/>
      </svg>
    </button>
  `;

  cartItemsContainer.appendChild(cartItem);
  updateTotalCartQuantity();

  if (cartItemsContainer.classList.contains("empty")) {
    cartItemsContainer.classList.remove("empty");
    checkoutButton.classList.remove("empty");
  }

  const deleteButton = cartItem.querySelector(".delete-item");
  deleteButton.addEventListener("click", (event) => {
    const cartItemElement = event.target.closest(".cart-item");
    removeItemFromCart(cartItemElement);
  });
};

addToCartButton.addEventListener("click", () => {
  if (count === 0) return;
  const productName = document.querySelector(".main .product-name").textContent;
  const productPriceElement = document.querySelector(".main .current-price");
  const productPrice = parseFloat(
    productPriceElement.textContent.replace("$", "")
  );
  const productImageSrc = document
    .querySelector(".default.gallery .main-img img")
    .getAttribute("src");

  addItemToCart(productName, productPrice, productImageSrc);
  cartContainer.classList.add("active");
  updateCount(0);
});

const removeItemFromCart = (cartItem) => {
  cartItem.remove();
  updateTotalCartQuantity();

  if (cartItemsContainer.children.length === 1) {
    cartItemsContainer.classList.add("empty");
    checkoutButton.classList.add("empty");
  }
};
