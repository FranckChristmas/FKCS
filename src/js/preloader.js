import gsap from "gsap";

export async function startLoader() {
  let counterElement = document.querySelector(".counter");
  let counterValue = 0;
  let displayValue = { val: 0 };

  function updateCounter() {
    return new Promise((resolve) => {
      function step() {
        const increment = Math.floor(Math.random() * 12) + 1; // Increment by a random value between 1 and 10
        counterValue += increment; // Update the counter value
        if (counterValue > 100) counterValue = 100; // Ensure it doesn't exceed 100

        gsap.to(displayValue, {
          duration: 0.8,
          val: counterValue,
          ease: "power2.out",
          onUpdate: () => {
            counterElement.textContent = Math.round(displayValue.val);
          },
        });

        if (counterValue === 100) {
          resolve(); // Resolve the promise when the counter reaches 100
        } else {
          const delay = Math.floor(Math.random() * 100) + 50; // Random delay between 50 and 150 ms
          setTimeout(step, delay);
        }
      }

      step();
    });
  }

  await updateCounter(); //function awaits for the counter to end before continuing

  gsap.to(".counter", 0.25, {
    opacity: 0,
  });

  gsap.to(".bar", 1.5, {
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
    onComplete: () => {
      document.querySelector(".overlay")?.remove(); // Hide the overlay after the animation completes
      document.querySelector(".counter")?.remove(); //
    },
  });
}
