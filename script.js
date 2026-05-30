/* ============================================
   ANTONIO SIINO — Personal Website
   JavaScript: Language switching + Nav
   ============================================ */

let currentLang = 'en';

// ─── Language selection ───────────────────────
function setLanguage(lang) {
  currentLang = lang;

  // Hide overlay
  document.getElementById('lang-overlay').classList.add('hidden');

  // Apply all translations
  applyTranslations(lang);

  // Remember choice
  try { localStorage.setItem('as_lang', lang); } catch(e) {}
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-en][data-de]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  // Also update html lang attribute
  document.documentElement.lang = lang;

  // Toggle button label
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'en' ? 'DE' : 'EN';
}

// ─── Toggle language from nav button ─────────
document.getElementById('lang-toggle').addEventListener('click', () => {
  const next = currentLang === 'en' ? 'de' : 'en';
  setLanguage(next);
});

// ─── Smooth scroll utility ────────────────────
function scrollTo(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── Scroll indicator click ───────────────────
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
  scrollTo('journey');
});

// ─── Navbar scroll effect ─────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 2px 24px rgba(0,0,0,0.07)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ─── Intersection Observer for reveal animations ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.journey-block, .lifestyle-block, .contact-card').forEach(el => {
  el.classList.add('reveal-on-scroll');
  revealObserver.observe(el);
});

// ─── Restore language from previous visit ────
(function init() {
  try {
    const saved = localStorage.getItem('as_lang');
    // Always show the language overlay first
    // (overlay is shown by default in HTML)
  } catch(e) {}
})();
