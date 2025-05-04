import { makeSpans, colorHoverEffect } from "./spans.js";
import { chevronAnimation, animateButtonText } from "./chevronButton.js";
import { animateVariableFont, wordQualifiers } from "./animateTitle.js";
import { navAnimation } from "./navAnimation.js";
import { fetchProjects } from "./prismic.js";
import { renderProjects } from "./renderProjects.js";

document.addEventListener("DOMContentLoaded", async () => {
  chevronAnimation();
  animateButtonText();
  wordQualifiers();
  navAnimation();

  const projects = await fetchProjects();

  projects.sort((a, b) => {
    // Sort by start_date
    const dateA = new Date(a.data.start_date);
    const dateB = new Date(b.data.start_date);
    return dateB - dateA; // Sort in descending order
  });
  renderProjects(projects);
  makeSpans("h1, h3");
  colorHoverEffect();
  animateVariableFont();

  console.log("Prismic data :", projects);
});
