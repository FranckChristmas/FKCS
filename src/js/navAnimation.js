export function navAnimation() {
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll("nav .link");

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      nav.classList.add("hovering");
    });
    link.addEventListener("mouseleave", () => {
      nav.classList.remove("hovering");
    });
  });
}
