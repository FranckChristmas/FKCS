// hovering all the social icons and the nav and footer
export function hover() {
  const areas = [
    { selector: ".nav" },
    { selector: ".footer-socials" },
    { selector: ".menu-socials" },
  ];

  areas.forEach(({ selector }) => {
    const element = document.querySelector(selector);
    if (!element) return;

    element.addEventListener("mouseenter", () => {
      element.classList.add("hovering");
    });

    element.addEventListener("mouseleave", (e) => {
      if (!element.contains(e.relatedTarget)) {
        element.classList.remove("hovering");
      }
    });
  });
}
