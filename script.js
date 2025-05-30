// --- Browser Verification ---
const acceptedBrowsers = [
  'Chrome', 'Google', 'Edge', 'Firefox', 'Brave', 'Opera', 'Opera GX'
];

function isMobileDevice() {
  // Simple mobile detection (covers iOS, Android, etc)
  return /android|iphone|ipad|ipod|opera mini|iemobile|mobile|tablet|blackberry|webos|windows phone/i.test(navigator.userAgent);
}

function detectBrowser() {
  const ua = navigator.userAgent;
  const uaLower = ua.toLowerCase();

  // Accept all the listed browsers, even mobile variants
  if (uaLower.includes("crios") || uaLower.includes("chrome")) return "Chrome";
  if (uaLower.includes("fxios") || uaLower.includes("firefox")) return "Firefox";
  if (uaLower.includes("edgios") || uaLower.includes("edge")) return "Edge";
  if (uaLower.includes("brave")) return "Brave";
  if (uaLower.includes("opera gx")) return "Opera GX";
  if (uaLower.includes("opera") || uaLower.includes("opr")) return "Opera";
  if (uaLower.includes("google")) return "Google";
  if (uaLower.includes("gsa")) return "Google";
  return "Unknown";
}

function showIntro() {
  const intro = document.getElementById('intro');
  const main = document.getElementById('main');
  const introText1 = document.getElementById('introText1');
  intro.classList.remove('hidden');
  introText1.classList.remove('hidden');
  introText1.classList.remove('hide');
  introText1.classList.remove('outro');
  introText1.classList.add('show');
  main.classList.add('hidden');
  setTimeout(() => {
    introText1.classList.remove('show');
    introText1.classList.add('outro');
    setTimeout(() => {
      introText1.classList.remove('outro');
      introText1.classList.add('hidden');
      intro.classList.add('fade-out');
      setTimeout(() => {
        intro.classList.add('hidden');
        main.classList.remove('hidden');
        setTimeout(() => {
          main.classList.add('fade-in');
        }, 50);
      }, 950);
    }, 850);
  }, 1700);
}

window.addEventListener('DOMContentLoaded', () => {
  // Mobile device detection
  if (isMobileDevice()) {
    document.getElementById('bvVerifyingText').innerText = "Sorry but Mobile is not supported Orbital Supports Pc,laptop only";
    document.getElementById('bvVerifyingText').style.color = "#ff9100";
    document.getElementById('bvSubtitle').innerText = "Please switch on a PC or Laptop";
    document.getElementById('bvCheckBox').style.opacity = 0.7;
    document.getElementById('bvDesc').innerText = "Orbital.exe cannot continue on mobile devices. Please use a PC or Laptop.";
    return;
  }

  // Browser verification step
  const browser = detectBrowser();
  setTimeout(() => {
    if (acceptedBrowsers.some(b => browser.toLowerCase().includes(b.toLowerCase()))) {
      // Success
      document.getElementById('bvVerifyingText').innerText = "Browser verified!";
      document.getElementById('bvSubtitle').innerText = "Verification successful. Loading site...";
      document.getElementById('bvCheckBox').style.display = "none";
      setTimeout(() => {
        document.getElementById('browserVerify').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('browserVerify').style.display = 'none';
          document.getElementById('appContent').style.display = '';
          showIntro();
        }, 500);
      }, 1200);
    } else {
      // Fail
      document.getElementById('bvVerifyingText').innerText = "Browser not supported!";
      document.getElementById('bvVerifyingText').style.color = "#ff9100";
      document.getElementById('bvSubtitle').innerText = "Sorry, your browser is not supported. Please use Chrome, Edge, Firefox, Brave, Opera, or Google.";
      document.getElementById('bvCheckBox').style.opacity = 0.7;
      document.getElementById('bvDesc').innerText = "Orbital.exe cannot continue with this browser. Please try again with a supported browser.";
    }
  }, 1400);

  // --- Main site logic after verification (do not show intro until verified) ---
  // Orbital Text Orange Glow Mouse Animation
  const orbitalText = document.getElementById('orbitalText');
  if (orbitalText) {
    orbitalText.addEventListener('mousemove', e => {
      const { left, width } = orbitalText.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      orbitalText.style.textShadow = `
        ${x*24}px 2px 32px #ff9100cc,
        0 2px 24px #222
      `;
    });
    orbitalText.addEventListener('mouseleave', () => {
      orbitalText.style.textShadow = '';
    });
  }

  // 3D Image Mouse Parallax
  const img3d = document.getElementById('orbitalImg');
  if (img3d) {
    img3d.addEventListener('mousemove', (e) => {
      const rect = img3d.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((cy - y) / cy) * 10;
      const rotateY = ((x - cx) / cx) * 12;
      img3d.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      img3d.style.boxShadow = `0 8px 44px #ff910099, 0 2px 12px #0a0a0a`;
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

  // Install Button TOS Modal Logic
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

  // TOS Link in Footer
  const openTosFooter = document.getElementById('openTosFooter');
  if (openTosFooter && tosModal) {
    openTosFooter.addEventListener('click', (e) => {
      e.preventDefault();
      tosModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => { if (tosAccept) tosAccept.focus(); }, 100);
    });
  }

  // Keyboard Escape closes TOS modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tosModal && !tosModal.classList.contains('hidden')) {
      tosModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Glow focus/hover for orange
  document.querySelectorAll('.btn.glow-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.boxShadow = '0 0 0 2px #ff910066, 0 0 16px 2px #ff9100';
      this.style.borderColor = '#ff9100';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
      this.style.borderColor = '';
    });
    btn.addEventListener('focus', function() {
      this.style.boxShadow = '0 0 0 2px #ff910088, 0 0 12px 2px #ff9100';
      this.style.borderColor = '#ff9100';
    });
    btn.addEventListener('blur', function() {
      this.style.boxShadow = '';
      this.style.borderColor = '';
    });
  });
});
