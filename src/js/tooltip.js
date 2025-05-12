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
          "M0 0.799988V129.1H112L128 146.1L144 129.1L256 128.8V0.799988H0Z",
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
          "M0 0.799988V129.1H112L128 146.1L144 129.1L256 128.8V0.799988H0Z",
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
