// animation for the navigation menu to appear and disappear smoothly
// nb the scroll position is preserved when the menu is open due to the recorded scroll position in scrollPosition

// ---------------------------------------------- SAVED// animation for the burger icon to open and close the menu
import { animateBurger, handleBurgerHover } from "./iconMenuAnimation";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");
let scrollY = 0;

handleBurgerHover(); // Initialize burger hover effect

//handle the menu transition layer to have an animation when opening and closing the menu
const layer = document.querySelector(".menu-transition-layer");

function openTransition(callback) {
  layer.style.opacity = "1";
  gsap.set(layer, { yPercent: -100 });

  const tl = gsap.timeline({
    onComplete: () => {
      layer.style.opacity = 0;
    },
  });

  tl.fromTo(
    layer,
    {
      yPercent: -100,
    },
    {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }
  )
    .add(() => {
      if (callback) callback(); // display the menu at the end
    })
    .to(layer, {
      yPercent: 100,
      duration: 0.5,
      ease: "power2.inOut",
    });
}

function closeTransition(callback) {
  layer.style.opacity = "1";
  gsap.set(layer, { yPercent: 100 });
  const tl = gsap.timeline({
    onComplete: () => {
      layer.style.opacity = 0;
    },
  });
  tl.add(() => {
    burger.classList.remove("open");
    animateBurger(false);
  }, "+=0.18") // display the menu at the start
    .fromTo(
      layer,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }
    )
    .add(() => {
      closeMenu(); // Hide the menu at the start
    })
    .to(layer, {
      yPercent: -100,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .add(() => {
      if (callback) callback(); // Hide the menu at the end
    });
}

//----------------------rest of the code----------------------

function closeMenu() {
  if (!menu.classList.contains("visible")) return;

  menu.classList.add("no-transition");
  menu.classList.remove("visible");
  requestAnimationFrame(() => {
    menu.classList.remove("no-transition");
  });
  document.body.classList.remove("menu-open");
  burger.classList.remove("open");
  animateBurger(burger.classList.contains("visible"));

  const scrollPosition = parseInt(document.body.style.top || "0") * -1;
  document.body.style.position = "";
  document.body.style.top = "";

  document.documentElement.style.scrollBehavior = "auto"; // Disable smooth scroll temporarily
  window.scrollTo(0, scrollPosition);
  document.documentElement.style.scrollBehavior = ""; // Re-enable smooth scroll
}

burger.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.contains("visible");

  if (isOpen) {
    closeTransition(() => {});
  } else {
    scrollY = window.scrollY;
    openTransition(() => {
      menu.classList.add("no-transition");
      menu.classList.add("visible");
      requestAnimationFrame(() => {
        menu.classList.remove("no-transition");
      });
      document.body.classList.add("menu-open");
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    });
    requestAnimationFrame(() => {
      burger.classList.add("open");
      animateBurger(true);
    });
  }
});

// function that takes back the closeTransition function + // closeMenu function to avoid code duplication and inject just below in the closing usecases
function triggerClose() {
  closeTransition(() => {
    // closeMenu();
    burger.classList.remove("open");
    animateBurger(false);
  });
}

// Close the menu when clicking on a link
menuLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    triggerClose();
    setTimeout(() => {
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "instant" });
      }
    }, 600); // Delay to allow the menu to close before scrolling
  });
});

// Close the menu when clicking outside of it
document.addEventListener("click", (e) => {
  if (!menu.classList.contains("visible")) return;
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    triggerClose();
  }
});

// Toggle the menu when clicking on the burger icon
menu.addEventListener("click", (e) => {
  console.log("Menu clicked");
  e.stopPropagation();
  triggerClose();
});
