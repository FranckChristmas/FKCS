import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

export function animateBurger(isOpen) {
  if (isOpen) {
    gsap.to(".line-1", {
      duration: 0.2,
      ease: "expo.in",
      morphSVG: { shape: "M0 1L30 1" },
    });
    gsap.to(".line-2", {
      duration: 0.4,
      ease: "expo.in",
      morphSVG: { shape: "M6 7L24 7" },
    });
    gsap.to(".line-3", {
      duration: 0.2,
      ease: "expo.in",
      morphSVG: { shape: "M0 13H30" },
    });
  } else {
    gsap.to(".line-1", {
      duration: 0.2,
      morphSVG: { shape: "M1 10.1249L16.5157 1.00004" },
    });
    gsap.to(".line-2", {
      duration: 0.2,
      morphSVG: { shape: "M11 9.00024H29" },
    });
    gsap.to(".line-3", {
      duration: 0.3,
      morphSVG: { shape: "M12 4.00024L41.1534 11.0768" },
    });
  }
}

const burger = document.querySelector(".burger");

// when hovering the burger icon
burger.addEventListener("mouseenter", () => {
  if (!burger.classList.contains("open")) {
    gsap.to(".line-1", {
      duration: 0.2,
      ease: "expo.in",
      morphSVG: { shape: "M6 1L24 1" },
    });
    gsap.to(".line-2", {
      duration: 0.4,
      ease: "expo.in",
      morphSVG: { shape: "M0 7L30 7" },
    });
    gsap.to(".line-3", {
      duration: 0.2,
      ease: "expo.in",
      morphSVG: { shape: "M6 13H24" },
    });
  }
});

//when leaving the hover area
burger.addEventListener("mouseleave", () => {
  if (!burger.classList.contains("open")) {
    gsap.to(".line-1", {
      duration: 0.3,
      morphSVG: "M1 10.1249L16.5157 1.00004",
    });
    gsap.to(".line-2", {
      duration: 0.3,
      morphSVG: "M12 4.00024L41.1534 11.0768",
    });
    gsap.to(".line-3", { duration: 0.3, morphSVG: "M11 9.00024H29" });
  }
});
