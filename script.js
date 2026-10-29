let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;

  document.getElementById('lang-overlay').classList.add('hidden');

  applyTranslations(lang);

  try { localStorage.setItem('as_lang', lang); } catch(e) {}
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-en][data-de]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  document.documentElement.lang = lang;

  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'en' ? 'DE' : 'EN';
}

document.getElementById('lang-toggle').addEventListener('click', () => {
  const next = currentLang === 'en' ? 'de' : 'en';
  setLanguage(next);
});

function scrollTo(sectionId) {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
  scrollTo('journey');
});

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 2px 24px rgba(0,0,0,0.07)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

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

(function init() {
  try {
    const saved = localStorage.getItem('as_lang');
  } catch(e) {}
})();
