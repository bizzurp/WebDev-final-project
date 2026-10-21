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


// ============================================================
// MENU CATEGORY TABS
// Keyboard support + keep the active tab scrolled into view.
// The visual switching itself is pure CSS (radio :checked); this
// only adds keyboard activation and arrow-key navigation so the
// label-based tabs are fully accessible.
// ============================================================
(function () {
  const nav = document.querySelector(".menu-nav");
  if (!nav) return;

  const labels = Array.from(nav.querySelectorAll("label[role='tab']"));
  if (!labels.length) return;

  function activate(label, { focus = true } = {}) {
    const input = document.getElementById(label.getAttribute("for"));
    if (!input) return;
    input.checked = true;
    // Reflect selection state for assistive tech.
    labels.forEach((l) => l.setAttribute("aria-selected", l === label ? "true" : "false"));
    if (focus) label.focus();
    // Keep the chosen tab visible inside the scrollable track.
    label.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }

  // Initialize aria-selected from whichever radio starts checked.
  labels.forEach((label) => {
    const input = document.getElementById(label.getAttribute("for"));
    label.setAttribute("aria-selected", input && input.checked ? "true" : "false");
  });

  labels.forEach((label, index) => {
    // Enter / Space activates the focused tab.
    label.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        activate(label);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        activate(labels[(index + 1) % labels.length]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        activate(labels[(index - 1 + labels.length) % labels.length]);
      } else if (e.key === "Home") {
        e.preventDefault();
        activate(labels[0]);
      } else if (e.key === "End") {
        e.preventDefault();
        activate(labels[labels.length - 1]);
      }
    });

    // Pointer clicks: the label toggles the radio natively, so just
    // sync aria state and center the tab without stealing focus.
    label.addEventListener("click", () => {
      requestAnimationFrame(() => activate(label, { focus: false }));
    });
  });
})();
