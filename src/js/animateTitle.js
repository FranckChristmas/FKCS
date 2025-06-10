// ------------------- part for word qualifiers on the home-----------------
export function wordQualifiers() {
  const container = document.getElementById("po-qualifier");

  const words = [
    "agile.",
    "creative.",
    "Assertive.",
    "Curious.",
    "Team-player.",
    "Passionate.",
    "Dedicated.",
    "Proactive.",
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
      }, 340 + i * 130);
    });

    current = next;
  }

  function animateLetterOut(letters, i) {
    setTimeout(() => {
      letters[i].className = "letter out";
    }, i * 130);
  }

  function animateLetterIn(letters, i) {
    setTimeout(() => {
      letters[i].className = "letter in";
    }, 340 + i * 130);
  }

  changeWord();
  setInterval(changeWord, 3000);
}
