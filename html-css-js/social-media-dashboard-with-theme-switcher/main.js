document.addEventListener("DOMContentLoaded", () => {
    let themeToggle = document.getElementById("toggle");
    let body = document.querySelector("body");
  
    if (themeToggle) {
      // Check the initial theme based on system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body.classList.add("dark-theme");
        themeToggle.checked = true;
      } else {
        themeToggle.checked = false;
      }
  
      // Add event listener for the theme toggle button
      themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        console.log("Dark theme toggled:", body.classList.contains("dark-theme"));
      });
  
      // Listen for changes in the system theme preference
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (e.matches) {
          body.classList.add("dark-theme");
          themeToggle.checked = true;
        } else {
          body.classList.remove("dark-theme");
          themeToggle.checked = false;
        }
      });
    } else {
      console.error('Toggle element not found');
    }
  });
  