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

        const wght = Math.max(100, 300 - distance);
        const wdth = Math.min(120, 70 + distance / 200);
        const opsz = Math.min(144, 8 + distance / 10);
        const spacing = Math.min(0.5, distance / 1000);

        this.span.style.fontVariationSettings = `'wght' ${wght.toFixed(
          0
        )}, 'wdth' ${wdth.toFixed(0)}, 'opsz' ${opsz.toFixed(0)}`;
        this.span.style.marginRight = `${spacing}em`;
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
