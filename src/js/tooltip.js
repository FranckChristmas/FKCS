import { animate, eases } from "animejs";

export class Tooltip {
  constructor(tooltipElement) {
    this.tooltip = tooltipElement;
    if (!this.tooltip) {
      console.error(`Tooltip not found: ${tooltipSelector}`);
      return;
    }
    this.base = this.tooltip.querySelector(".tooltip__base"); // Ajout important
    this.path = this.base.querySelector("path");
    this.content = this.tooltip.querySelector(".tooltip__content");
    this.trigger = this.tooltip.querySelector(".tooltip__trigger");

    this.initEvents();
  }

  initEvents() {
    this.trigger.addEventListener("mouseenter", () => this.animateIn());
    this.trigger.addEventListener("mouseleave", () => this.animateOut());
  }

  animateIn() {
    // background animation in
    animate(this.base, {
      duration: 800,
      ease: eases.outElastic(1, 0.38),
      translateY: [10, 0],
      scale: [0.5, 1],
      begin: () => {
        this.base.style.pointerEvents = "auto";
      },
    });

    animate(this.base, {
      opacity: 1,
      ease: "linear",
      duration: 100,
    });

    // path animation
    animate(this.path, {
      duration: 300,
      delay: 50,
      ease: eases.outElastic(1, 0.38),
      elasticity: 800,
      d: "M 22,74.2 22,202 C 22,202 82,202 103,202 124,202 184,202 184,202 L 200,219 216,202 C 216,202 274,202 297,202 320,202 378,202 378,202 L 378,74.2 C 378,74.2 318,73.7 200,73.7 82,73.7 22,74.2 22,74.2 Z",
    });

    // text animation
    animate(this.content, {
      translateY: [20, 0],
      opacity: 1,
      duration: 100,
      ease: eases.inQuad,
    });
  }

  animateOut() {
    // background animation out
    animate(this.base, {
      duration: 200,
      ease: eases.outQuad,
      translateY: 50,
      scale: 0.2,
      complete: () => {
        this.base.style.pointerEvents = "none";
      },
    });

    animate(this.base, {
      opacity: 0,
      ease: "linear",
      duration: 100,
    });

    // path animation
    animate(this.path, {
      duration: 200,
      ease: eases.inQuad,
      d: "M 22,108 22,236 C 22,236 64,216 103,212 142,208 184,212 184,212 L 200,229 216,212 C 216,212 258,207 297,212 336,217 378,236 378,236 L 378,108 C 378,108 318,83.7 200,83.7 82,83.7 22,108 22,108 Z",
    });

    // text animation
    animate(this.content, {
      translateY: 20,
      opacity: 0,
      duration: 200,
      ease: eases.inQuad,
    });
  }
}
