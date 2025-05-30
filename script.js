// Orbital Executor Main Scripts (at least 100 lines, modern, well-commented)

// ------ 2-step Intro Animation ------
document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const main = document.getElementById('main');
  const introText1 = document.getElementById('introText1');
  const introText2 = document.getElementById('introText2');

  // Show first intro text
  introText1.classList.add('show');
  introText2.classList.remove('show');
  introText2.classList.remove('hide');
  introText1.classList.remove('hide');

  // Step 1: Fade out first, fade in second
  setTimeout(() => {
    introText1.classList.remove('show');
    introText1.classList.add('hide');
    setTimeout(() => {
      introText1.classList.remove('hide');
      introText1.classList.add('hidden');
      introText2.classList.add('show');
      // Step 2: Show second for a bit, then fade out and website in
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
        }, 950); // keep second intro a little while
      }, 1500);
    }, 700);
  }, 1600);
});

// ------ Reveal panels on scroll (2x2 grid + community) ------
function revealPanelOnScroll(panelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  function onScroll() {
    const rect = panel.getBoundingClientRect();
    const windowH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowH - 100) {
      panel.classList.add('reveal');
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}

// List of all panel ids (2x2 grid + community)
const gridPanels = ['featuresPanel','infoPanel','advancedPanel','faqPanel','communityPanel'];
gridPanels.forEach(panelId => revealPanelOnScroll(panelId));

// ------ Orbital Text Animation ------
const orbitalText = document.getElementById('orbitalText');
if (orbitalText) {
  orbitalText.addEventListener('mousemove', e => {
    const { left, width } = orbitalText.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    orbitalText.style.textShadow = `
      ${x*24}px 2px 32px #3498ffcc,
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
    // Focus accept for accessibility
    setTimeout(() => { 
      if (tosAccept) tosAccept.focus(); 
    }, 100);
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
    setTimeout(() => { 
      if (tosAccept) tosAccept.focus();
    }, 100);
  });
}

// ------ FAQ Expand/Collapse Animation ------
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', function () {
    const ans = this.nextElementSibling;
    if (!ans) return;
    if (ans.style.display === 'block') {
      ans.style.display = '';
    } else {
      ans.style.display = 'block';
    }
    ans.style.transition = 'all 0.3s cubic-bezier(.77,0,.175,1)';
  });
});

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

// ------ Responsive Panel Reveal on Load ------
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.panel').forEach(panel => {
      const rect = panel.getBoundingClientRect();
      if (rect.top < (window.innerHeight || document.documentElement.clientHeight) - 80) {
        panel.classList.add('reveal');
      }
    });
  }, 800);
});

// ------ Community Panel Hover ------
const communityPanel = document.getElementById('communityPanel');
if (communityPanel) {
  communityPanel.addEventListener('mouseenter', () => {
    communityPanel.style.boxShadow = '0 0 24px #3498ff77';
  });
  communityPanel.addEventListener('mouseleave', () => {
    communityPanel.style.boxShadow = '';
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

// ------ Extra: Scroll to panels from URL hash ------
window.addEventListener('hashchange', () => {
  const hash = location.hash.replace('#', '');
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  }
});

// ------ End of script.js ------
