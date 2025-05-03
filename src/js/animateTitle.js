//-------------------------- part of the main title animation --------------------------
export function animateVariableFont() {
  const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; // Initialize real cursor position
  const mouse = { x: cursor.x, y: cursor.y }; // smoothed cursor position

  document.addEventListener("mousemove", (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  function createLetter(span) {
    return {
      span,
      update(mouse) {
        const rect = this.span.getBoundingClientRect();
        const dx = mouse.x - (rect.left + rect.width / 2);
        const dy = mouse.y - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const wght = Math.max(100, 900 - distance);
        const wdth = Math.min(151, 25 + distance / 100);
        const opsz = Math.min(144, 8 + distance / 10);

        this.span.style.fontVariationSettings = `'wght' ${wght.toFixed(
          0
        )}, 'wdth' ${wdth.toFixed(0)}, 'opsz' ${opsz.toFixed(0)}`;
      },
    };
  }

  const title = document.getElementById("po-title");
  if (!title) return;
  const letters = [];
  title.innerHTML = "";

  "Product Owner".split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    title.appendChild(span);
    letters.push(createLetter(span));
  });

  function animate() {
    mouse.x += (cursor.x - mouse.x) / 10;
    mouse.y += (cursor.y - mouse.y) / 10;

    letters.forEach((letter) => letter.update(mouse));
    requestAnimationFrame(animate);
  }
  animate();
}
