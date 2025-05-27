// animation for the navigation menu to appear and disappear smoothly
// nb the scroll position is preserved when the menu is open due to the recorded scroll position in scrollPosition
import gsap from "gsap";
import { animateBurger } from "./iconMenuAnimation";

let scrollY = 0;

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");

//handle the menu transition layer to have an animation when opening and closing the menu
const layer = document.querySelector(".menu-transition-layer");

function openTransition(callback) {
  layer.style.opacity = "1";

  const tl = gsap.timeline({
    onComplete: () => {
      layer.style.opacity = "0";
    },
  });

  tl.fromTo(
    layer,
    {
      y: "-100%",
    },
    {
      y: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    }
  )
    .add(() => {
      if (callback) callback(); // Affiche le menu au milieu
    })
    .to(layer, {
      y: "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
}

function closeTransition(callback) {
  layer.style.opacity = "1";

  const tl = gsap.timeline({
    onComplete: () => {
      layer.style.opacity = "0";
    },
  });

  tl.fromTo(
    layer,
    {
      y: "-100%",
    },
    {
      y: "0%",
      duration: 0.5,
      ease: "power2.inOut",
    }
  )
    .add(() => {
      if (callback) callback(); // Cache le menu après la transition
    })
    .to(layer, {
      y: "100%",
      duration: 0.5,
      ease: "power2.inOut",
    });
}

function closeMenu() {
  menu.classList.add("no-transition");
  menu.classList.remove("visible");
  requestAnimationFrame(() => {
    menu.classList.remove("no-transition");
  });
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

// Toggle the menu when clicking on the burger icon
menu.addEventListener("click", (e) => {
  console.log("Menu clicked");
  e.stopPropagation();
  closeMenu();
});

burger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.contains("visible");

  if (isOpen) {
    closeTransition(() => {
      closeMenu();
      burger.classList.remove("open");
      animateBurger(false);
    });
  } else {
    scrollY = window.scrollY;
    openTransition(() => {
      menu.classList.add("no-transition");
      menu.classList.add("visible");
      requestAnimationFrame(() => {
        menu.classList.remove("no-transition");
      });
      document.body.classList.toggle("menu-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;

      burger.classList.add("open");
      animateBurger(true);
    });
  }
});

// Close the menu when clicking on a link
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });
});

// Close the menu when clicking outside of it
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    closeMenu();
  }
});
