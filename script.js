// Intro text transition delay before main content loads
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main");

  setTimeout(() => {
    intro.style.display = "none";
    main.classList.add("visible");
  }, 2500); // intro delay
});

// Scroll animation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".scroll-section");
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;

    if (top < triggerBottom) {
      section.classList.add("visible");
    }
  });
});
