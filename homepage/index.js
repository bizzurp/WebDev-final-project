// Hide the navbar on scroll down, show it on scroll up.
(function () {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  // Distance (px) you must scroll before a direction change takes effect.
  const DELTA = 8;
  // Always show the navbar within this many px of the top.
  const TOP_THRESHOLD = 80;

  function onScroll() {
    const currentY = window.scrollY;

    if (Math.abs(currentY - lastScrollY) > DELTA) {
      if (currentY > lastScrollY && currentY > TOP_THRESHOLD) {
        // Scrolling down, past the top -> hide.
        navbar.classList.add("navbar--hidden");
      } else {
        // Scrolling up (or near the top) -> show.
        navbar.classList.remove("navbar--hidden");
      }
      lastScrollY = currentY;
    }

    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });
})();

