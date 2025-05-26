let scrollY = 0;

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  const isOpen = menu.classList.contains("visible");

  if (isOpen) {
    menu.classList.toggle("visible");
    document.body.classList.toggle("menu-open");

    const scrollPosition = parseInt(document.body.style.top || "0") * -1;
    document.body.style.position = "";
    document.body.style.top = "";

    document.documentElement.style.scrollBehavior = "auto"; // Disable smooth scroll temporarily
    window.scrollTo(0, scrollPosition);
    document.documentElement.style.scrollBehavior = ""; // Re-enable smooth scroll
  } else {
    scrollY = window.scrollY;
    menu.classList.toggle("visible");
    document.body.classList.toggle("menu-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
  }
});
