// --- Dual Intro Animation ---
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const main = document.getElementById('main');
  const introText1 = document.getElementById('introText1');
  const introText2 = document.getElementById('introText2');

  // Animate the first intro text (fade in)
  introText1.classList.add('show');
  introText2.classList.remove('show');
  introText2.classList.remove('hide');
  introText1.classList.remove('hide');

  setTimeout(() => {
    introText1.classList.remove('show');
    introText1.classList.add('hide');
    setTimeout(() => {
      introText1.classList.remove('hide');
      introText1.classList.add('hidden');
      introText2.classList.add('show');
      setTimeout(() => {
        introText2.classList.remove('show');
        introText2.classList.add('hide');
        setTimeout(() => {
          intro.classList.add('fade-out');
          setTimeout(() => {
            intro.classList.add('hidden');
            main.classList.remove('hidden');
            setTimeout(() => {
              main.classList.add('fade-in');
            }, 50);
          }, 950);
        }, 950);
      }, 1500);
    }, 700);
  }, 1600);
});

// ------ Orbital Text Animation ------
const orbitalText = document.getElementById('orbitalText');
if (orbitalText) {
  orbitalText.addEventListener('mousemove', e => {
    const { left, width } = orbitalText.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    orbitalText.style.textShadow = `
      ${x*24}px 2px 32px #fff8,
      0 2px 24px #202e46
    `;
  });
  orbitalText.addEventListener('mouseleave', () => {
    orbitalText.style.textShadow = '';
  });
}

// ------ Install Button TOS Modal Logic ------
const installBtn = document.getElementById('installBtn');
const tosModal = document.getElementById('tosModal');
const tosAccept = document.getElementById('tosAccept');
const tosDecline = document.getElementById('tosDecline');
if (installBtn && tosModal) {
  installBtn.addEventListener('click', () => {
    tosModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (tosAccept) tosAccept.focus(); }, 100);
  });
}
if (tosDecline && tosModal) {
  tosDecline.addEventListener('click', () => {
    tosModal.classList.add('hidden');
    document.body.style.overflow = '';
    alert('You must accept the Terms of Service to proceed.');
  });
}
if (tosAccept && tosModal) {
  tosAccept.addEventListener('click', () => {
    tosModal.classList.add('hidden');
    document.body.style.overflow = '';
    window.location.href = 'https://orbital-install.example.com';
  });
}

// ------ TOS Link in Footer ------
const openTosFooter = document.getElementById('openTosFooter');
if (openTosFooter && tosModal) {
  openTosFooter.addEventListener('click', (e) => {
    e.preventDefault();
    tosModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (tosAccept) tosAccept.focus(); }, 100);
  });
}

// ------ 3D Image Hover Effect ------
const img3d = document.getElementById('orbitalImg');
if (img3d) {
  img3d.addEventListener('mousemove', (e) => {
    const rect = img3d.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((cy - y) / cy) * 10; // max 10deg
    const rotateY = ((x - cx) / cx) * 12;
    img3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    img3d.style.boxShadow = `0 8px 44px #111b 0 2px 12px #0a0a0a`;
  });
  img3d.addEventListener('mouseleave', () => {
    img3d.style.transform = 'none';
    img3d.style.boxShadow = '';
  });
  img3d.addEventListener('mousedown', () => {
    img3d.style.transform += ' scale(0.97)';
  });
  img3d.addEventListener('mouseup', () => {
    img3d.style.transform = img3d.style.transform.replace(' scale(0.97)', '');
  });
}

// ------ Accessibility: Trap focus in TOS modal ------
if (tosModal) {
  tosModal.addEventListener('keydown', function(e) {
    if (tosModal.classList.contains('hidden')) return;
    const focusable = tosModal.querySelectorAll('button');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// ------ Keyboard Escape closes TOS modal ------
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && tosModal && !tosModal.classList.contains('hidden')) {
    tosModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// ------ Enhance Button Glows and Focus ------
document.querySelectorAll('.btn.glow-btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 0 2px #3498ff66, 0 0 16px 2px #3498ff';
    this.style.borderColor = '#3498ff';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.boxShadow = '';
    this.style.borderColor = '';
  });
  btn.addEventListener('focus', function() {
    this.style.boxShadow = '0 0 0 2px #3498ff88, 0 0 12px 2px #3498ff';
    this.style.borderColor = '#3498ff';
  });
  btn.addEventListener('blur', function() {
    this.style.boxShadow = '';
    this.style.borderColor = '';
  });
});
