export function setupHoverEffect(pairs) {
  pairs.forEach(([containerSelector, linkSelector]) => {
    const container = document.querySelector(containerSelector);
    const links = document.querySelectorAll(linkSelector);

    if (!container || links.length === 0) return;

    let hoverTimeout;

    function updateHovering() {
      const isAnyHovered = Array.from(links).some((link) =>
        link.matches(":hover")
      );
      container.classList.toggle("hovering", isAnyHovered);
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
  });
}

// Utilisation
export function setupNavAndFooterBehavior() {
  setupHoverEffect([
    [".nav", "nav .link"],
    [".footer", ".footer-link a"],
  ]);
}
function activateLinkOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".link, .footer-link");

  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 300;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

export function setupNavTracking() {
  window.addEventListener("scroll", activateLinkOnScroll);
  console.log("Nav tracking setup complete.");
}
