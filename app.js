// ===== STATE =====
let selectedCountry = null;

// ===== COUNTRY SELECTOR =====
function renderCountryGrid() {
  const el = document.getElementById('country-grid');
  el.innerHTML = COUNTRY_LIST.map(c => `
    <div class="country-card" onclick="selectCountry('${c.code}')">
      <span class="flag">${c.flag}</span>
      <div class="c-name">${c.name}</div>
      <div class="c-system">${c.system}</div>
    </div>
  `).join('');
}

function showCountrySelector() {
  document.getElementById('country-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function hideCountrySelector() {
  document.getElementById('country-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function selectCountry(code) {
  selectedCountry = code;
  localStorage.setItem('election-country', code);
  // Clear old checklist when switching countries
  localStorage.removeItem('election-checklist');
  updateNavCountry();
  renderAllSections();
  hideCountrySelector();
}

function updateNavCountry() {
  const c = COUNTRIES[selectedCountry];
  document.getElementById('current-flag').textContent = c.flag;
  document.getElementById('current-country-name').textContent = c.name;
}

// ===== RENDER =====
function getCountryData() {
  return COUNTRIES[selectedCountry];
}

function renderTimeline() {
  const data = getCountryData().timeline;
  const el = document.getElementById('timeline-list');
  el.innerHTML = data.map((t, i) => `
    <div class="timeline-item" data-delay="${i * 100}">
      <div class="timeline-phase">${t.phase}</div>
      <div class="timeline-title">${t.title}</div>
      <div class="timeline-desc">${t.desc}</div>
    </div>
  `).join('');
}

function renderSteps() {
  const data = getCountryData().steps;
  const el = document.getElementById('steps-grid');
  el.innerHTML = data.map((s, i) => `
    <div class="step-card" data-step="${i}" data-delay="${i * 80}" onclick="openModal(${i})">
      <div class="step-number">${s.num}</div>
      <div class="step-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.summary}</p>
    </div>
  `).join('');
}

function renderFAQ() {
  const data = getCountryData().faq;
  const el = document.getElementById('faq-list');
  el.innerHTML = data.map((f, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-question" onclick="toggleFAQ(${i})">
        <span>${f.q}</span>
        <span class="faq-chevron">▼</span>
      </button>
      <div class="faq-answer">
        <div class="faq-answer-inner">${f.a}</div>
      </div>
    </div>
  `).join('');
}

function renderChecklist() {
  const data = getCountryData().checklist;
  const el = document.getElementById('checklist-items');
  const saved = JSON.parse(localStorage.getItem('election-checklist') || '[]');
  el.innerHTML = data.map((item, i) => {
    const checked = saved.includes(i);
    return `<div class="checklist-item ${checked ? 'checked' : ''}" onclick="toggleCheck(${i})">
      <div class="check-box">${checked ? '✓' : ''}</div>
      <span class="check-label">${item}</span>
    </div>`;
  }).join('');
  updateProgress();
}

function renderResources() {
  const data = getCountryData().resources;
  const el = document.getElementById('resources-grid');
  el.innerHTML = data.map(r => `
    <a href="${r.url}" target="_blank" rel="noopener" class="resource-card">
      <div class="resource-icon">${r.icon}</div>
      <div class="resource-info">
        <h4>${r.name}</h4>
        <p>${r.desc}</p>
      </div>
    </a>
  `).join('');
}

function updateHeroSubtitle() {
  const c = getCountryData();
  document.getElementById('hero-subtitle').innerHTML =
    `Your step-by-step guide to elections in <strong>${c.flag} ${c.name}</strong> — from voter registration to results. Tailored to your country's system.`;
}

function renderAllSections() {
  renderTimeline();
  renderSteps();
  renderFAQ();
  renderChecklist();
  renderResources();
  updateHeroSubtitle();
  // Re-observe for scroll animations
  initScrollObserver();
}

// ===== INTERACTIONS =====
function openModal(stepIndex) {
  const s = getCountryData().steps[stepIndex];
  document.getElementById('modal-title').innerHTML = `${s.icon} Step ${s.num}: ${s.title}`;
  document.getElementById('modal-body').innerHTML = s.details;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleFAQ(i) {
  const item = document.getElementById(`faq-${i}`);
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

function toggleCheck(i) {
  let saved = JSON.parse(localStorage.getItem('election-checklist') || '[]');
  if (saved.includes(i)) saved = saved.filter(x => x !== i);
  else saved.push(i);
  localStorage.setItem('election-checklist', JSON.stringify(saved));
  renderChecklist();
}

function updateProgress() {
  const data = getCountryData().checklist;
  const saved = JSON.parse(localStorage.getItem('election-checklist') || '[]');
  const pct = Math.round((saved.length / data.length) * 100);
  const fill = document.getElementById('progress-fill');
  const text = document.getElementById('progress-text');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = `${saved.length} of ${data.length} completed`;
}

// ===== SCROLL ANIMATIONS =====
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.timeline-item, .step-card').forEach(el => observer.observe(el));
}

// ===== NAV =====
function initNav() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Active link highlight
  const sections = document.querySelectorAll('.section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    links.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}

// ===== MODAL CLOSE HANDLERS =====
function initModal() {
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderCountryGrid();
  initNav();
  initModal();

  // Check for saved country
  const saved = localStorage.getItem('election-country');
  if (saved && COUNTRIES[saved]) {
    selectedCountry = saved;
    updateNavCountry();
    renderAllSections();
  } else {
    // Show country selector on first visit
    showCountrySelector();
  }
});
