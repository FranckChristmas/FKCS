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

window.addEventListener("load", () => {
  setTimeout(() => {
    // set a timeout there because there is a conflict with DOM to be loaded and the text animation
    const projectTitle = [
      ...document.querySelectorAll(".projects-section-title[data-projects]"),
    ];

    projectTitle.forEach((title) => {
      splitTextToChars(title);
      console.log(
        "ScrollTrigger applied to:",
        title,
        "with text:",
        title.textContent
      );

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
            start: window.innerWidth < 600 ? "top 95%" : "center 50%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });
    ScrollTrigger.refresh();
  }, 300);
});
