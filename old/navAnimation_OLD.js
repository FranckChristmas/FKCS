export function navAnimation() {
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll("nav .link");

  let hoverTimeout;

  function updateHovering() {
    const isAnyHovered = Array.from(links).some((link) =>
      link.matches(":hover")
    );
    nav.classList.toggle("hovering", isAnyHovered);
  }

  links.forEach((link) => {
    link.addEventListener("mouseover", () => {
      clearTimeout(hoverTimeout);
      updateHovering();
    });

    link.addEventListener("mouseout", () => {
      hoverTimeout = setTimeout(updateHovering, 80);
    });
  });
}
