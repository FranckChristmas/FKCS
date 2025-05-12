import { animate } from "animejs";

export class TooltipDori {
  constructor(tooltipSelector) {
    this.tooltip = document.querySelector(tooltipSelector);
    if (!this.tooltip) {
      console.error(`Tooltip not found: ${tooltipSelector}`);
      return;
    }
    this.path = this.tooltip.querySelector("path");
    this.content = this.tooltip.querySelector(".tooltip__content");
    this.trigger = this.tooltip.querySelector(".tooltip__trigger-text");
    this.base = this.tooltip.querySelector(".tooltip__base");

    this.initEvents();
  }

  initEvents() {
    this.trigger.addEventListener("mouseenter", () => this.animateIn());
    this.trigger.addEventListener("mouseleave", () => this.animateOut());
  }

  animateIn() {
    // Base animation (container)
    animate(this.base, {
      translateY: [60, 0],
      scale: [0.5, 1],
      opacity: 1,
      duration: 800,
      easing: "easeOutElastic",
    });

    // Path morphing (svg shape)
    animate(this.path, {
      d: {
        value:
          "M 22,74.2 22,202 C 22,202 82,202 103,202 124,202 184,202 184,202 L 200,219 216,202 C 216,202 274,202 297,202 320,202 378,202 378,202 L 378,74.2 C 378,74.2 318,73.7 200,73.7 82,73.7 22,74.2 22,74.2 Z",
      },
      duration: 1200,
      delay: 50,
      easing: "easeOutElastic",
    });

    // Content (text) appearing
    animate(this.content, {
      translateY: [20, 0],
      opacity: 1,
      duration: 300,
      delay: 100,
      easing: "easeOutQuint",
    });

    // Trigger bounce
    animate(this.trigger, {
      translateY: [
        { value: "-50%", duration: 100, easing: "easeInQuad" },
        { value: ["50%", "0%"], duration: 100, easing: "easeOutQuad" },
      ],
      opacity: [
        { value: 0, duration: 100, easing: "easeInQuad" },
        { value: 1, duration: 100, easing: "easeOutQuad" },
      ],
    });
  }

  animateOut() {
    // Base animation (container)
    animate(this.base, {
      translateY: 60,
      scale: 0.5,
      opacity: 0,
      duration: 200,
      easing: "easeInQuad",
    });

    // Path morphing (svg shape)
    animate(this.path, {
      d: {
        value:
          "M 22,108 22,236 C 22,236 64,216 103,212 142,208 184,212 184,212 L 200,229 216,212 C 216,212 258,207 297,212 336,217 378,236 378,236 L 378,108 C 378,108 318,83.7 200,83.7 82,83.7 22,108 22,108 Z",
      },
      duration: 300,
      easing: "easeInQuad",
    });

    // Content (text) disappearing
    animate(this.content, {
      translateY: 20,
      opacity: 0,
      duration: 200,
      easing: "easeOutQuad",
    });

    // Trigger bounce back
    animate(this.trigger, {
      translateY: [
        { value: "-50%", duration: 100, easing: "easeInQuad" },
        { value: ["50%", "0%"], duration: 100, easing: "easeOutQuad" },
      ],
      opacity: [
        { value: 0, duration: 100, easing: "easeInQuad" },
        { value: 1, duration: 100, easing: "easeOutQuad" },
      ],
    });
  }
}
