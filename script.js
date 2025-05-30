// --- Browser Verification and CAPTCHA ---
const acceptedBrowsers = [
  'Chrome', 'Google', 'Edge', 'Firefox', 'Brave', 'Opera', 'Opera GX'
];
function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Brave")) return "Brave";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) {
    if (ua.includes("Brave")) return "Brave";
    return "Chrome";
  }
  return "Unknown";
}

// Simple math captcha generator
function generateCaptcha() {
  const a = Math.floor(5 + Math.random() * 10);
  const b = Math.floor(1 + Math.random() * 7);
  const op = Math.random() > 0.5 ? "+" : "-";
  const answer = op === "+" ? a + b : a - b;
  return {
    question: `What is ${a} ${op} ${b}?`,
    answer: answer.toString()
  };
}

function showCaptcha() {
  document.getElementById('verifyStep').style.display = 'none';
  document.getElementById('captchaOuter').style.display = 'flex';
  // Set up captcha
  const captcha = generateCaptcha();
  document.getElementById('captchaQuestion').innerText = captcha.question;
  document.getElementById('captchaError').innerText = '';
  document.getElementById('captchaInput').value = '';
  document.getElementById('captchaInput').focus();

  document.getElementById('captchaForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('captchaSubmit').click();
  };

  document.getElementById('captchaSubmit').onclick = function() {
    const input = document.getElementById('captchaInput').value.trim();
    if (input === captcha.answer) {
      // Verified
      document.getElementById('browserVerify').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('browserVerify').style.display = 'none';
        document.getElementById('appContent').style.display = '';
        // Show intro after verification!
        showIntro();
      }, 450);
    } else {
      document.getElementById('captchaError').innerText = 'Incorrect answer! Please try again.';
      document.getElementById('captchaInput').focus();
    }
  };
  document.getElementById('captchaInput').onkeydown = function(e) {
    if (e.key === "Enter") document.getElementById('captchaSubmit').click();
  };
}

// Show the animated intro after verification (again)
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
  // Browser verification step
  const browser = detectBrowser();
  setTimeout(() => {
    if (acceptedBrowsers.some(b => browser.toLowerCase().includes(b.toLowerCase()))) {
      // Success, go to captcha
      document.getElementById('bvVerifyingText').innerText = "Browser verified!";
      document.getElementById('bvSubtitle').innerText = "Please complete the human verification below.";
      document.getElementById('bvCheckBox').style.display = "none";
      setTimeout(showCaptcha, 900);
    } else {
      // Fail
      document.getElementById('bvVerifyingText').innerText = "Browser not supported!";
      document.getElementById('bvVerifyingText').style.color = "#ff9100";
      document.getElementById('bvSubtitle').innerText = "Sorry, your browser is not supported. Please use Chrome, Edge, Firefox, Brave, or Opera.";
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
