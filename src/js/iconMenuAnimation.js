import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

//function to animate the burger icon when clicked
// and morph the lines into a cross or back to the original state

const burger = document.querySelector(".burger");
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  if (burger.classList.contains("open")) {
    gsap.to(".line-1", {
      duration: 0.2,
      morphSVG: { shape: "M0 1L30 1" },
    });
    gsap.to(".line-2", {
      duration: 0.1,
      morphSVG: { shape: "M6 7L24 7" },
    });
    gsap.to(".line-3", {
      duration: 0.33,
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
});
