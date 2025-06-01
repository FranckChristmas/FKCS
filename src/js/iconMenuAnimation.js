import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

export function animateBurger(isOpen) {
  if (isOpen) {
    gsap.to(".line-1", {
      duration: 0.21,
      ease: "power1.out",
      morphSVG: { shape: "M12 1L1.93715e-07 0.999999" },
    });
    gsap.to(".line-2", {
      duration: 0.22,
      ease: "popower1.out",
      morphSVG: { shape: "M12 4L1.93715e-07 4" },
    });
    gsap.to(".line-3", {
      duration: 0.23,
      ease: "popower1.out",
      morphSVG: { shape: "M12 7L1.93715e-07 7" },
    });
  } else {
    gsap.to(".line-1", {
      duration: 0.15,
      ease: "popower1.out",
      morphSVG: { shape: "M12 1L1.93715e-07 0.999999" },
    });
    gsap.to(".line-2", {
      duration: 0.18,
      ease: "popower1.out",
      morphSVG: { shape: "M15 2.5L3 2.5" },
    });
    gsap.to(".line-3", {
      duration: 0.21,
      ease: "popower1.out",
      morphSVG: { shape: "M18 4L6 4" },
    });
  }
}

// when hovering/leaving the burger icon
export function handleBurgerHover() {
  const burger = document.querySelector(".burger");

  burger.addEventListener("mouseenter", () => {
    if (!burger.classList.contains("open")) {
      gsap.to(".line-1", {
        duration: 0.1,
        ease: "power1.out",
        morphSVG: { shape: "M12 1L1.93715e-07 0.999999" },
      });
      gsap.to(".line-2", {
        duration: 0.15,
        ease: "power1.out",
        morphSVG: { shape: "M12 2.5L1.93715e-07 2.5" },
      });
      gsap.to(".line-3", {
        duration: 0.18,
        ease: "power1.out",
        morphSVG: { shape: "M12 4L1.93715e-07 4" },
      });
    }
  });

  burger.addEventListener("mouseleave", () => {
    if (!burger.classList.contains("open")) {
      gsap.to(".line-1", {
        duration: 0.2,
        ease: "power1.out",
        morphSVG: { shape: "M12 1L1.93715e-07 0.999999" },
      });
      gsap.to(".line-2", {
        duration: 0.25,
        ease: "power1.out",
        morphSVG: { shape: "M15 2.5L3 2.5" },
      });
      gsap.to(".line-3", {
        duration: 0.3,
        ease: "power1.out",
        morphSVG: { shape: "M18 4L6 4" },
      });
    }
  });
}
