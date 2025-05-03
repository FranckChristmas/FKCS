export function animateVariableFont() {
  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: cursor.x, y: cursor.y };

  // listener to update the cursor position
  document.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  // listener to animate the letters
  function createLetter(span) {
    return {
      span,
      update(mouse) {
        const rect = this.span.getBoundingClientRect();
        const dx = mouse.x - (rect.left + rect.width / 2);
        const dy = mouse.y - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const wght = Math.max(100, 900 - distance * 5);
        const wdth = Math.min(120, 70 + distance / 200);
        const opsz = Math.min(144, 8 + distance / 10);
        // const spacing = Math.min(0.5, distance / 3000);

        this.span.style.fontVariationSettings = `'wght' ${wght.toFixed(
          0
        )}, 'wdth' ${wdth.toFixed(0)}, 'opsz' ${opsz.toFixed(0)}`;
        // this.span.style.marginRight = `${spacing}em`;
      },
    };
  }

  // select all elements with the class "variable-text"
  const elements = document.querySelectorAll(".variable-text");
  const allLetters = [];

  elements.forEach((el) => {
    const text = el.innerText;
    el.innerHTML = ""; // clear the text content

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      el.appendChild(span);
      allLetters.push(createLetter(span));
    });
  });

  // animate the letters
  // requestAnimationFrame is a method that tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint.
  function animate() {
    mouse.x += (cursor.x - mouse.x) / 10;
    mouse.y += (cursor.y - mouse.y) / 10;

    allLetters.forEach((letter) => letter.update(mouse));
    requestAnimationFrame(animate);
  }

  animate();
}

// ------------------- part for word qualifiers -----------------

export function wordQualifiers() {
  const container = document.getElementById("po-qualifier");

  const words = [
    "Agile",
    "creative",
    "assertive",
    "curious",
    "collaborative",
    "passionate",
    "dedicated",
    "proactive",
  ];
  let current = 0; // current word index

  const spans = words.map((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    if (index === 0) span.classList.add("in");
    container.appendChild(span);
    return span;
  });

  setInterval(() => {
    const currentWord = spans[current];
    const next = (current + 1) % spans.length;
    const nextWord = spans[next];

    currentWord.classList.remove("in");
    currentWord.classList.add("out");

    nextWord.classList.add("in");
    nextWord.classList.remove("out");

    current = next;
  }, 2000);
}
