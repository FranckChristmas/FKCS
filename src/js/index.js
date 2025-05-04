import { makeSpans, colorHoverEffect } from "./spans.js";
import { chevronAnimation, animateButtonText } from "./chevronButton.js";
import { animateVariableFont, wordQualifiers } from "./animateTitle.js";
import { navAnimation } from "./navAnimation.js";
import { fetchProjects } from "./prismic.js";
import { renderProjects } from "./renderProjects.js";

document.addEventListener("DOMContentLoaded", async () => {
  colorHoverEffect();
  chevronAnimation();
  animateButtonText();
  wordQualifiers();
  navAnimation();
  const projects = await fetchProjects();
  renderProjects(projects);
  makeSpans("h1, h3");
  animateVariableFont();
  console.log("📦 Données projets Prismic :", projects);
});
