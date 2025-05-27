// animation for the navigation menu to appear and disappear smoothly
// nb the scroll position is preserved when the menu is open due to the recorded scroll position in scrollPosition
import { animateBurger } from "./iconMenuAnimation";

let scrollY = 0;

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");

function closeMenu() {
  menu.classList.remove("visible");
  document.body.classList.remove("menu-open");
  burger.classList.toggle("open");
  animateBurger(burger.classList.contains("visible"));

  const scrollPosition = parseInt(document.body.style.top || "0") * -1;
  document.body.style.position = "";
  document.body.style.top = "";

  document.documentElement.style.scrollBehavior = "auto"; // Disable smooth scroll temporarily
  window.scrollTo(0, scrollPosition);
  document.documentElement.style.scrollBehavior = ""; // Re-enable smooth scroll
}

burger.addEventListener("click", () => {
  const isOpen = menu.classList.contains("visible");

  if (isOpen) {
    closeMenu();
    burger.classList.remove("open");
    animateBurger(false);
  } else {
    scrollY = window.scrollY;
    menu.classList.toggle("visible");
    document.body.classList.toggle("menu-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;

    burger.classList.add("open");
    animateBurger(true);
  }
});

// Close the menu when clicking on a link
menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Close the menu when clicking outside of it
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});
