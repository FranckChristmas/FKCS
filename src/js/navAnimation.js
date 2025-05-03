export function navAnimation() {
  console.log("navAnimation");
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll("nav .link");

  function updateHovering() {
    const isAnyHovered = Array.from(links).some((link) =>
      link.matches(":hover")
    );
    nav.classList.toggle("hovering", isAnyHovered);
  }

  links.forEach((link) => {
    link.addEventListener("mouseover", updateHovering);
    link.addEventListener("mouseout", () => {
      // Petit délai pour laisser le temps de passer d’un <span> à l’autre
      setTimeout(updateHovering, 20);
    });
  });
}
