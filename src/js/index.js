import { makeSpans, colorHoverEffect } from "./spans.js";
import { chevronAnimation, animateButtonText } from "./chevronButton.js";
import { activateLinkOnScroll, setupNavTracking } from "./navActive.js";

document.addEventListener("DOMContentLoaded", () => {
  makeSpans("h1, h3");
  colorHoverEffect();
  chevronAnimation();
  animateButtonText();
  activateLinkOnScroll();
  setupNavTracking();
  initAnimatedTitle();
});
