//-------------------------- part to ease the chevron animation --------------------------
export function chevronAnimation() {
  const button = document.querySelector(".chevron-button");
  const track = document.querySelector(".chevron-track");
  const svg = document.querySelector(".chevron-svg");
  button.addEventListener("mouseenter", () => {
    track.classList.add("active");
  });

  button.addEventListener("mouseleave", () => {
    const handleTransitionEnd = (e) => {
      if (e.propertyName === "opacity") {
        track.classList.remove("active");
        svg.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
    svg.addEventListener("transitionend", handleTransitionEnd);
  });
}
//--------------------------part animation of the button text [NOT USED]---------------------------

export function animateButtonText() {
  const buttonText = document.querySelector(""); // Add the correct selector for the button text !!!!!!!! not used for now
  const text = buttonText.textContent;
  buttonText.innerHTML = ""; // empty the content of the button text

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.classList.add("char");
    span.textContent = char === " " ? "\u00A0" : char; // replace space with non-breaking space
    buttonText.appendChild(span);

    //ading a listener for each letter
    span.addEventListener("mouseenter", () => {
      span.classList.add("animate");
    });
    // remove class after animation
    span.addEventListener("animationend", () => {
      span.classList.remove("animate");
    });
  });
}

const contactButton = document.querySelector(".chevron-button");
contactButton.addEventListener("click", () => {
  window.location.href = "mailto:francois.noell@gmail.com";
});
