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
makeSpans("h1, h3, .hello-text, .francois-text");

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

//--------------------------part animation of the text contact button---------------------------

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
const allBlocks = aboutSection.querySelectorAll(".block");

const originalBases = {};
const originalFontSizes = {};

// Un identifiant unique par block
allBlocks.forEach((block, index) => {
  const key = `block-${index}`;
  block.dataset.key = key;

  const remBase = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const basis = getComputedStyle(block).flexBasis;
  originalBases[key] = parseFloat(basis) / remBase;

  const text = block.querySelector("span, p");
  if (text) {
    const computedSize = parseFloat(getComputedStyle(text).fontSize) / 10;
    originalFontSizes[key] = computedSize;
  }
});

let animationFrame;

aboutSection.addEventListener("mousemove", (e) => {
  if (animationFrame) cancelAnimationFrame(animationFrame);

  animationFrame = requestAnimationFrame(() => {
    const { clientX, clientY } = e;

    allBlocks.forEach((block) => {
      const rect = block.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const grow = Math.max(0, 1 - distance / 500);
      const extraWidth = grow * 10; // ajustable
      const key = block.dataset.key;
      const newBasis = originalBases[key] + extraWidth;
      block.style.flexBasis = `${newBasis}rem`;

      const text = block.querySelector("span, p");
      if (text) {
        const baseSize = originalFontSizes[key] || 3;
        const newFontSize = baseSize + grow * 1.5; // ajustable
        text.style.fontSize = `${newFontSize}rem`;
      }
    });
  });
});

aboutSection.addEventListener("mouseleave", () => {
  allBlocks.forEach((block) => {
    const key = block.dataset.key;
    block.style.flexBasis = `${originalBases[key]}rem`;

    const text = block.querySelector("span, p");
    if (text) {
      text.style.fontSize = `${originalFontSizes[key]}rem`;
    }
  });
});

//--------------------------part of the nav active link---------------------------

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".link");

function activateLinkOnScroll() {
  let scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // manage off-set due to the navbar
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", activateLinkOnScroll);
