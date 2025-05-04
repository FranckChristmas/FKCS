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

        const wght = Math.max(200, 1200 - distance * 2);
        const wdth = Math.min(120, 70 + distance / 200);
        const opsz = Math.min(144, 8 + distance / 10);
        const spacing = Math.min(1, distance / 1000);

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
    "Creative",
    "Assertive",
    "Curious",
    "Collaborative",
    "Passionate",
    "Dedicated",
    "Proactive",
  ];

  const wordArray = [];
  let current = 0;

  words.forEach((word, i) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "word";
    wordSpan.style.opacity = i === 0 ? 1 : 0;
    wordSpan.style.position = "absolute";

    const letters = [];
    word.split("").forEach((char) => {
      const span = document.createElement("span");
      span.className = "letter";
      span.textContent = char;
      wordSpan.appendChild(span);
      letters.push(span);
    });

    container.appendChild(wordSpan);
    wordArray.push(letters);
  });

  function changeWord() {
    const cw = wordArray[current];
    const next = (current + 1) % wordArray.length;
    const nw = wordArray[next];

    cw.forEach((_, i) => animateLetterOut(cw, i));

    nw.forEach((letter, i) => {
      letter.classList.remove("in", "out");
      letter.classList.add("behind");
      nw[0].parentElement.style.opacity = 1;
      animateLetterIn(nw, i);
    });
    nw.forEach((letter, i) => {
      setTimeout(() => {
        letter.classList.remove("behind");
        letter.classList.add("in");
      }, 200 + i * 60);
    });

    current = next;
  }

  function animateLetterOut(letters, i) {
    setTimeout(() => {
      letters[i].className = "letter out";
    }, i * 80);
  }

  function animateLetterIn(letters, i) {
    setTimeout(() => {
      letters[i].className = "letter in";
    }, 200 + i * 60);
  }

  changeWord();
  setInterval(changeWord, 4000);
}
