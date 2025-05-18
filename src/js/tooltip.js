import { animate } from "animejs";

export class TooltipDori {
  constructor(tooltipSelector) {
    this.tooltip = document.querySelector(tooltipSelector);
    if (!this.tooltip) {
      console.error(`Tooltip not found: ${tooltipSelector}`);
      return;
    }
    this.base = this.tooltip.querySelector(".tooltip__base"); // Ajout important
    this.path = this.tooltip.querySelector("path");
    this.content = this.tooltip.querySelector(".tooltip__content");
    this.trigger = this.tooltip.querySelector(".tooltip__trigger");

    this.initEvents();
  }

  initEvents() {
    this.trigger.addEventListener("mouseenter", () => this.animateIn());
    this.trigger.addEventListener("mouseleave", () => this.animateOut());
  }

  animateIn() {
    // Animation de l'apparition du fond
    animate(this.base, {
      duration: 300,
      easing: "easeOutElastic(1 .6)",
      translateY: [20, 0],
      scale: [0.1, 1],
    });

    animate(this.base, {
      opacity: 1,
      easing: "linear",
      duration: 100,
    });

    // Animation du path (changement de forme)
    animate(this.path, {
      duration: 400,
      delay: 20,
      easing: "easeOutElastic",
      elasticity: 500,
      d: "M 22,74.2 22,202 C 22,202 82,202 103,202 124,202 184,202 184,202 L 200,219 216,202 C 216,202 274,202 297,202 320,202 378,202 378,202 L 378,74.2 C 378,74.2 318,73.7 200,73.7 82,73.7 22,74.2 22,74.2 Z",
    });

    // Animation du texte
    animate(this.content, {
      translateY: [20, 0],
      opacity: 1,
      duration: 300,
      easing: "easeOutQuad",
    });
  }

  animateOut() {
    // Animation de la disparition du fond
    animate(this.base, {
      duration: 200,
      easing: "easeInQuad",
      translateY: 20,
      scale: 0.2,
    });

    animate(this.base, {
      opacity: 0,
      delay: 20,
      duration: 100,
      easing: "linear",
    });

    // Animation du path (repli)
    animate(this.path, {
      duration: 200,
      easing: "easeInQuad",
      d: "M 22,108 22,236 C 22,236 64,216 103,212 142,208 184,212 184,212 L 200,229 216,212 C 216,212 258,207 297,212 336,217 378,236 378,236 L 378,108 C 378,108 318,83.7 200,83.7 82,83.7 22,108 22,108 Z",
    });

    // Animation du texte
    animate(this.content, {
      translateY: 20,
      opacity: 0,
      duration: 200,
      easing: "easeOutQuad",
    });
  }
}
