import { makeSpans, colorHoverEffect } from "./spans.js";
import { chevronAnimation, animateButtonText } from "./chevronButton.js";
import { animateVariableFont, wordQualifiers } from "./animateTitle.js";

document.addEventListener("DOMContentLoaded", () => {
  makeSpans("h1, h3");
  colorHoverEffect();
  chevronAnimation();
  animateButtonText();
  animateVariableFont();
  wordQualifiers();
});
