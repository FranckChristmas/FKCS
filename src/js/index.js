// nob here are all the loaded module at the start of the app
import { makeSpans, colorHoverEffect } from "./spans.js";
import { chevronAnimation } from "./chevronButton.js";
import {
  animateVariableFont,
  animateVariableFont2,
  wordQualifiers,
} from "./animateTitle.js";
import { hover } from "./hoverEffect.js";
import { fetchProjects, fetchAboutMe } from "./prismic.js";
import { renderProjects } from "./renderProjects.js";
import { renderAbout } from "./renderAbout.js";
import { Tooltip } from "./tooltip.js";
import "./textAnimation.js";
import { closeMenu } from "./navAnimation.js";
import "./iconMenuAnimation.js";
import { importSocialsLinks } from "./importTemplates.js";
import { detectBrowser } from "./detectBrowser.js";

document.addEventListener("DOMContentLoaded", async () => {
  detectBrowser();
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
  hover();
  renderProjects(projects);
  renderAbout(aboutMe);
  importSocialsLinks(".menu-socials");
  importSocialsLinks(".footer-socials");

  makeSpans("h1");
  colorHoverEffect();
  animateVariableFont();
  animateVariableFont2();
});
document.querySelectorAll(".tooltip-animated").forEach((el) => {
  new Tooltip(el);
});
