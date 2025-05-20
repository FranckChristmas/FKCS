import { makeSpans, colorHoverEffect } from "./spans.js";
import { chevronAnimation } from "./chevronButton.js";
import {
  animateVariableFont,
  animateVariableFont2,
  wordQualifiers,
} from "./animateTitle.js";
import { NavFooterHover } from "./hoverEffect.js";
import { fetchProjects, fetchAboutMe } from "./prismic.js";
import { renderProjects } from "./renderProjects.js";
import { renderAbout } from "./renderAbout.js";
import { Tooltip } from "./tooltip.js";

document.addEventListener("DOMContentLoaded", async () => {
  chevronAnimation();
  // animateButtonText();
  wordQualifiers();

  const projects = await fetchProjects();
  const aboutMe = await fetchAboutMe();
  // console.log("🧠 projects complet :");
  // console.log(JSON.stringify(projects, null, 2));
  projects.sort((a, b) => {
    // Sort by start_date
    const dateA = new Date(a.data.start_date);
    const dateB = new Date(b.data.start_date);
    return dateB - dateA; // Sort in descending order
  });
  NavFooterHover();
  renderProjects(projects);
  renderAbout(aboutMe);
  makeSpans("h1, h3");
  colorHoverEffect();
  animateVariableFont();
  animateVariableFont2();
});
document.querySelectorAll(".tooltip-animated").forEach((el) => {
  new Tooltip(el);
});
