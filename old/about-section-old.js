// part to handle the animation on the about section
const aboutSection = document.querySelector("#about");
const allBlocks = aboutSection.querySelectorAll(".block");

const originalBases = {};
const originalFontSizes = {};

// unique key for each block
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
