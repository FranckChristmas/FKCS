import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function splitTextToChars(el, className = "char") {
  const text = el.textContent;
  el.innerHTML = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.classList.add(className);
    span.textContent = char === " " ? "\u00A0" : char;
    el.appendChild(span);
  });
}

const welcomeTitle = [
  ...document.querySelectorAll(".projects-section-title[data-projects]"),
];

welcomeTitle.forEach((title) => {
  splitTextToChars(title);

  const chars = title.querySelectorAll(".char");

  chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));

  gsap.fromTo(
    chars,
    {
      "will-change": "opacity, transform",
      opacity: 0,
      rotateX: () => gsap.utils.random(-120, 120),
      z: () => gsap.utils.random(-200, 200),
    },
    {
      ease: "none",
      opacity: 1,
      rotateX: 0,
      z: 0,
      stagger: 0.02,
      scrollTrigger: {
        trigger: title,
        start: "top 100%",
        end: "center 50%",
        scrub: true,
      },
    }
  );
});
