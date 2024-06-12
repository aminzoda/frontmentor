document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links li");
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overflow = document.querySelector(".overflow");
  const mobileLinks = document.querySelectorAll(".mobile-links li");

  menuBtn.addEventListener("click", () => {
    const icon = document.querySelector(".mobile-menu-btn img");
    menuBtn.classList.toggle("active-btn");
    mobileMenu.classList.toggle("active-menu");
    overflow.classList.toggle("active-menu");
    if (menuBtn.classList.contains("active-btn")) {
      icon.src = "images/icon-close-menu.svg";
    } else {
      icon.src = "images/icon-menu.svg";
    }
  });

  const closeAllSubMenus = () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const subMenu = link.querySelector(".sub-menu");
      if (subMenu) subMenu.classList.remove("active-menu");
    });
    mobileLinks.forEach((link) => {
      link.classList.remove("active");
      const subMenu = link.querySelector(".mobile-sub");
      if (subMenu) subMenu.classList.remove("active-menu");
    });
  };

  navLinks.forEach((link) => {
    const subMenu = link.querySelector(".sub-menu");
    link.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents the event from bubbling up to document
      if (link.classList.contains("active")) {
        link.classList.remove("active");
        subMenu.classList.remove("active-menu");
      } else {
        closeAllSubMenus();
        link.classList.add("active");
        subMenu.classList.add("active-menu");
      }
    });
  });

  mobileLinks.forEach((link) => {
    const subMenu = link.querySelector(".mobile-sub");
    link.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents the event from bubbling up to document
      if (link.classList.contains("active")) {
        link.classList.remove("active");
        subMenu.classList.remove("active-menu");
      } else {
        closeAllSubMenus();
        link.classList.add("active");
        subMenu.classList.add("active-menu");
      }
    });
  });

  document.addEventListener("click", closeAllSubMenus); // Close all submenus when clicking outside
});
