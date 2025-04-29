// part that handle the color change of the letters in the h1 and h3 elements

function makeSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    let text = element.innerText.split("");
    let spans = text
      .map((letter) => {
        return `<span class="random-letter">${letter}</span>`;
      })
      .join("");
    element.innerHTML = spans;
  });
  const colors = [
    "var(--pink)",
    "var(--darkblue)",
    "var(--lightblue)",
    "var(--lightgreen)",
    "var(--yellow)",
  ];

  const letters = document.querySelectorAll(".random-letter");
  letters.forEach((letter) => {
    letter.addEventListener("mouseover", () => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      letter.style.color = randomColor;
    });

    letter.addEventListener("mouseout", () => {
      letter.style.color = "";
    });
  });
}
makeSpans("h1, h3");

// part contact button to ease the chevron animation

const button = document.querySelector(".chevron-button");
const track = document.querySelector(".chevron-track");
const svg = document.querySelector(".chevron-svg");
console.log("track:", track);
console.log("svg:", svg);
button.addEventListener("mouseenter", () => {
  track.classList.add("active");
});

button.addEventListener("mouseleave", () => {
  const handleTransitionEnd = (e) => {
    if (e.propertyName === "opacity") {
      track.classList.remove("active");
      svg.removeEventListener("transitionend", handleTransitionEnd);
    }
  };
  svg.addEventListener("transitionend", handleTransitionEnd);
});

//part animation of the of the text button

const buttonText = document.querySelector(".button-text");
const text = buttonText.textContent;
buttonText.innerHTML = ""; // empty the content of the button text

text.split("").forEach((char) => {
  const span = document.createElement("span");
  span.classList.add("char");
  span.textContent = char === " " ? "\u00A0" : char; // replace space with non-breaking space
  buttonText.appendChild(span);

  //ading a listener for each letter
  span.addEventListener("mouseenter", () => {
    span.classList.add("animate");
  });
  // remove class after animation
  span.addEventListener("animationend", () => {
    span.classList.remove("animate");
  });
});

// part to handle the animation on the about section

const aboutSection = document.querySelector("#about");
const allDivs = aboutSection.querySelectorAll(
  ".hello, .francois, .ideas, .into, .kickass"
);

// Stocker les valeurs initiales de flex-basis en vw
const originalBases = new Map();

allDivs.forEach((div) => {
  const computedStyle = getComputedStyle(div);
  const basisInPx = parseFloat(computedStyle.flexBasis);
  const screenWidth = window.innerWidth;
  const basisInVw = (basisInPx / screenWidth) * 100;
  originalBases.set(div, basisInVw);
});

aboutSection.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  allDivs.forEach((div) => {
    const rect = div.getBoundingClientRect();
    const divCenterX = rect.left + rect.width / 2;
    const divCenterY = rect.top + rect.height / 2;

    const dx = clientX - divCenterX;
    const dy = clientY - divCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const influenceRadius = 1000;
    const base = originalBases.get(div);
    const grow = Math.max(0, 1 - distance / influenceRadius);
    const newBasis = base + grow * 15;

    div.style.flexBasis = `${newBasis}vw`;
  });
});

aboutSection.addEventListener("mouseleave", () => {
  allDivs.forEach((div) => {
    const base = originalBases.get(div);
    div.style.flexBasis = `${base}vw`;
  });
});
