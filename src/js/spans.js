//------------------ part that create spans for each text letter -----------------

export function makeSpans(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    let text = element.innerText.split("");
    let spans = text
      .map((letter) => {
        if (letter === " ") {
          return `<span class="space">&nbsp;</span>`;
        }
        return `<span class="random-letter">${letter}</span>`;
      })
      .join("");
    element.innerHTML = spans;
  });
}

//------------------ part that handle colors on text letters -----------------
export function colorHoverEffect() {
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

makeSpans("h3, .hello-text, .francois-text, .company");
