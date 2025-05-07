export function setupNavAndFooterBehavior() {
  const areas = [{ selector: ".nav" }, { selector: ".footer" }];

  areas.forEach(({ selector }) => {
    const element = document.querySelector(selector);
    if (!element) return;

    element.addEventListener("mouseenter", () => {
      element.classList.add("hovering");
    });

    element.addEventListener("mouseleave", () => {
      element.classList.remove("hovering");
    });
  });
}
