window.onload = () => {
  // Transition from intro to main
  setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.style.display = 'none';
      const main = document.getElementById('main');
      main.classList.remove('hidden');
      main.classList.add('fade-in');
    }, 1000);
  }, 2000);
};

// Scroll reveal
window.addEventListener('scroll', () => {
  const info = document.getElementById('info');
  const rect = info.getBoundingClientRect();
  const screenPosition = window.innerHeight / 1.2;
  if (rect.top < screenPosition) {
    info.classList.add('reveal');
  }
});
