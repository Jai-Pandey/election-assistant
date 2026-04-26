// Language configuration per country
const LANG_CONFIG = {
  us: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'es', name: 'Spanish', native: 'Español' },
  ],
  in: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ],
  gb: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  ],
  ca: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'fr', name: 'French', native: 'Français' },
  ],
  au: [
    { code: 'en', name: 'English', native: 'English' },
  ],
  de: [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'de', name: 'German', native: 'Deutsch' },
  ],
};

let currentLang = 'en';

// UI string translations
const UI = {
  en: {
    nav_timeline: 'Timeline', nav_steps: 'Steps', nav_faq: 'FAQ', nav_checklist: 'Checklist', nav_resources: 'Resources',
    hero_badge: '✨ Interactive Guide', hero_title_1: 'Understand the', hero_title_2: 'Election Process',
    hero_btn_steps: 'Explore the Steps →', hero_btn_checklist: 'Voting Checklist', hero_scroll: 'Scroll to explore',
    sec_timeline: '📅 Election Timeline', sec_steps: '📋 Step-by-Step Guide', sec_faq: '❓ Frequently Asked Questions',
    sec_checklist: '✅ Your Voting Checklist', sec_resources: '🔗 Helpful Resources',
    checklist_progress: 'completed', chat_placeholder: 'Ask about elections, leaders, constitution...',
    chat_title: 'Election Assistant', chat_online: 'Online', lang_label: 'Language',
    hero_subtitle: 'Your step-by-step guide to elections in',
    hero_subtitle_2: '— from voter registration to results. Tailored to your country\'s system.',
  },
  hi: {
    nav_timeline: 'समय-सीमा', nav_steps: 'चरण', nav_faq: 'सामान्य प्रश्न', nav_checklist: 'चेकलिस्ट', nav_resources: 'संसाधन',
    hero_badge: '✨ इंटरैक्टिव गाइड', hero_title_1: 'समझिए', hero_title_2: 'चुनाव प्रक्रिया',
    hero_btn_steps: 'चरण देखें →', hero_btn_checklist: 'मतदान चेकलिस्ट', hero_scroll: 'स्क्रॉल करें',
    sec_timeline: '📅 चुनाव समय-सीमा', sec_steps: '📋 चरण-दर-चरण गाइड', sec_faq: '❓ अक्सर पूछे जाने वाले प्रश्न',
    sec_checklist: '✅ आपकी मतदान चेकलिस्ट', sec_resources: '🔗 उपयोगी संसाधन',
    checklist_progress: 'पूर्ण', chat_placeholder: 'चुनाव, नेता, संविधान के बारे में पूछें...',
    chat_title: 'चुनाव सहायक', chat_online: 'ऑनलाइन', lang_label: 'भाषा',
    hero_subtitle: 'चुनावों के लिए आपकी चरण-दर-चरण गाइड',
    hero_subtitle_2: '— मतदाता पंजीकरण से परिणामों तक। आपके देश की प्रणाली के अनुसार।',
  },
  kn: {
    nav_timeline: 'ಸಮಯರೇಖೆ', nav_steps: 'ಹಂತಗಳು', nav_faq: 'ಪ್ರಶ್ನೆಗಳು', nav_checklist: 'ಪರಿಶೀಲನಾಪಟ್ಟಿ', nav_resources: 'ಸಂಪನ್ಮೂಲಗಳು',
    hero_badge: '✨ ಸಂವಾದಾತ್ಮಕ ಮಾರ್ಗದರ್ಶಿ', hero_title_1: 'ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ', hero_title_2: 'ಚುನಾವಣಾ ಪ್ರಕ್ರಿಯೆ',
    hero_btn_steps: 'ಹಂತಗಳನ್ನು ನೋಡಿ →', hero_btn_checklist: 'ಮತದಾನ ಪರಿಶೀಲನಾಪಟ್ಟಿ', hero_scroll: 'ಸ್ಕ್ರಾಲ್ ಮಾಡಿ',
    sec_timeline: '📅 ಚುನಾವಣಾ ಸಮಯರೇಖೆ', sec_steps: '📋 ಹಂತ-ಹಂತವಾಗಿ ಮಾರ್ಗದರ್ಶಿ', sec_faq: '❓ ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    sec_checklist: '✅ ನಿಮ್ಮ ಮತದಾನ ಪರಿಶೀಲನಾಪಟ್ಟಿ', sec_resources: '🔗 ಸಹಾಯಕ ಸಂಪನ್ಮೂಲಗಳು',
    checklist_progress: 'ಪೂರ್ಣ', chat_placeholder: 'ಚುನಾವಣೆ, ನಾಯಕರು, ಸಂವಿಧಾನದ ಬಗ್ಗೆ ಕೇಳಿ...',
    chat_title: 'ಚುನಾವಣಾ ಸಹಾಯಕ', chat_online: 'ಆನ್‌ಲೈನ್', lang_label: 'ಭಾಷೆ',
    hero_subtitle: 'ಚುನಾವಣೆಗಳಿಗೆ ನಿಮ್ಮ ಹಂತ-ಹಂತ ಮಾರ್ಗದರ್ಶಿ',
    hero_subtitle_2: '— ಮತದಾರ ನೋಂದಣಿಯಿಂದ ಫಲಿತಾಂಶಗಳವರೆಗೆ।',
  },
  ta: {
    nav_timeline: 'காலவரிசை', nav_steps: 'படிகள்', nav_faq: 'கேள்விகள்', nav_checklist: 'சரிபார்ப்புப்பட்டியல்', nav_resources: 'ஆதாரங்கள்',
    hero_badge: '✨ ஊடாடும் வழிகாட்டி', hero_title_1: 'புரிந்துகொள்ளுங்கள்', hero_title_2: 'தேர்தல் செயல்முறை',
    hero_btn_steps: 'படிகளை ஆராயுங்கள் →', hero_btn_checklist: 'வாக்களிப்பு சரிபார்ப்புப்பட்டியல்', hero_scroll: 'கீழே உருட்டவும்',
    sec_timeline: '📅 தேர்தல் காலவரிசை', sec_steps: '📋 படிப்படியான வழிகாட்டி', sec_faq: '❓ அடிக்கடி கேட்கப்படும் கேள்விகள்',
    sec_checklist: '✅ உங்கள் வாக்களிப்பு சரிபார்ப்புப்பட்டியல்', sec_resources: '🔗 பயனுள்ள ஆதாரங்கள்',
    checklist_progress: 'நிறைவு', chat_placeholder: 'தேர்தல், தலைவர்கள், அரசியலமைப்பு பற்றி கேளுங்கள்...',
    chat_title: 'தேர்தல் உதவியாளர்', chat_online: 'ஆன்லைன்', lang_label: 'மொழி',
    hero_subtitle: 'தேர்தல்களுக்கான உங்கள் படிப்படியான வழிகாட்டி',
    hero_subtitle_2: '— வாக்காளர் பதிவிலிருந்து முடிவுகள் வரை।',
  },
  te: {
    nav_timeline: 'కాలరేఖ', nav_steps: 'దశలు', nav_faq: 'ప్రశ్నలు', nav_checklist: 'చెక్‌లిస్ట్', nav_resources: 'వనరులు',
    hero_badge: '✨ ఇంటరాక్టివ్ గైడ్', hero_title_1: 'అర్థం చేసుకోండి', hero_title_2: 'ఎన్నికల ప్రక్రియ',
    hero_btn_steps: 'దశలు చూడండి →', hero_btn_checklist: 'ఓటింగ్ చెక్‌లిస్ట్', hero_scroll: 'స్క్రోల్ చేయండి',
    sec_timeline: '📅 ఎన్నికల కాలరేఖ', sec_steps: '📋 దశల వారీ గైడ్', sec_faq: '❓ తరచుగా అడిగే ప్రశ్నలు',
    sec_checklist: '✅ మీ ఓటింగ్ చెక్‌లిస్ట్', sec_resources: '🔗 సహాయక వనరులు',
    checklist_progress: 'పూర్తి', chat_placeholder: 'ఎన్నికలు, నాయకులు, రాజ్యాంగం గురించి అడగండి...',
    chat_title: 'ఎన్నికల సహాయకుడు', chat_online: 'ఆన్‌లైన్', lang_label: 'భాష',
    hero_subtitle: 'ఎన్నికలకు మీ దశల వారీ గైడ్',
    hero_subtitle_2: '— ఓటరు నమోదు నుండి ఫలితాల వరకు।',
  },
  es: {
    nav_timeline: 'Cronología', nav_steps: 'Pasos', nav_faq: 'Preguntas', nav_checklist: 'Lista de verificación', nav_resources: 'Recursos',
    hero_badge: '✨ Guía Interactiva', hero_title_1: 'Comprende el', hero_title_2: 'Proceso Electoral',
    hero_btn_steps: 'Explorar los Pasos →', hero_btn_checklist: 'Lista de Votación', hero_scroll: 'Desplázate para explorar',
    sec_timeline: '📅 Cronología Electoral', sec_steps: '📋 Guía Paso a Paso', sec_faq: '❓ Preguntas Frecuentes',
    sec_checklist: '✅ Tu Lista de Verificación', sec_resources: '🔗 Recursos Útiles',
    checklist_progress: 'completados', chat_placeholder: 'Pregunta sobre elecciones, líderes, constitución...',
    chat_title: 'Asistente Electoral', chat_online: 'En línea', lang_label: 'Idioma',
    hero_subtitle: 'Tu guía paso a paso para las elecciones en',
    hero_subtitle_2: '— desde el registro de votantes hasta los resultados.',
  },
  fr: {
    nav_timeline: 'Chronologie', nav_steps: 'Étapes', nav_faq: 'Questions', nav_checklist: 'Liste de contrôle', nav_resources: 'Ressources',
    hero_badge: '✨ Guide Interactif', hero_title_1: 'Comprendre le', hero_title_2: 'Processus Électoral',
    hero_btn_steps: 'Explorer les Étapes →', hero_btn_checklist: 'Liste de Vérification', hero_scroll: 'Défiler pour explorer',
    sec_timeline: '📅 Chronologie Électorale', sec_steps: '📋 Guide Étape par Étape', sec_faq: '❓ Questions Fréquentes',
    sec_checklist: '✅ Votre Liste de Contrôle', sec_resources: '🔗 Ressources Utiles',
    checklist_progress: 'complétés', chat_placeholder: 'Posez des questions sur les élections...',
    chat_title: 'Assistant Électoral', chat_online: 'En ligne', lang_label: 'Langue',
    hero_subtitle: 'Votre guide étape par étape pour les élections au',
    hero_subtitle_2: '— de l\'inscription des électeurs aux résultats.',
  },
  cy: {
    nav_timeline: 'Llinell Amser', nav_steps: 'Camau', nav_faq: 'Cwestiynau', nav_checklist: 'Rhestr Wirio', nav_resources: 'Adnoddau',
    hero_badge: '✨ Canllaw Rhyngweithiol', hero_title_1: 'Deall y', hero_title_2: 'Broses Etholiadol',
    hero_btn_steps: 'Archwilio\'r Camau →', hero_btn_checklist: 'Rhestr Wirio Pleidleisio', hero_scroll: 'Sgrolio i archwilio',
    sec_timeline: '📅 Llinell Amser Etholiad', sec_steps: '📋 Canllaw Cam wrth Gam', sec_faq: '❓ Cwestiynau Cyffredin',
    sec_checklist: '✅ Eich Rhestr Wirio', sec_resources: '🔗 Adnoddau Defnyddiol',
    checklist_progress: 'wedi\'u cwblhau', chat_placeholder: 'Gofynnwch am etholiadau...',
    chat_title: 'Cynorthwyydd Etholiad', chat_online: 'Ar-lein', lang_label: 'Iaith',
    hero_subtitle: 'Eich canllaw cam wrth gam i etholiadau yn',
    hero_subtitle_2: '— o gofrestru pleidleiswyr i ganlyniadau.',
  },
  de: {
    nav_timeline: 'Zeitplan', nav_steps: 'Schritte', nav_faq: 'Fragen', nav_checklist: 'Checkliste', nav_resources: 'Ressourcen',
    hero_badge: '✨ Interaktiver Leitfaden', hero_title_1: 'Verstehen Sie den', hero_title_2: 'Wahlprozess',
    hero_btn_steps: 'Schritte erkunden →', hero_btn_checklist: 'Wahl-Checkliste', hero_scroll: 'Scrollen Sie zum Erkunden',
    sec_timeline: '📅 Wahl-Zeitplan', sec_steps: '📋 Schritt-für-Schritt-Anleitung', sec_faq: '❓ Häufig Gestellte Fragen',
    sec_checklist: '✅ Ihre Wahl-Checkliste', sec_resources: '🔗 Nützliche Ressourcen',
    checklist_progress: 'abgeschlossen', chat_placeholder: 'Fragen Sie über Wahlen, Verfassung...',
    chat_title: 'Wahl-Assistent', chat_online: 'Online', lang_label: 'Sprache',
    hero_subtitle: 'Ihr Schritt-für-Schritt-Leitfaden zu Wahlen in',
    hero_subtitle_2: '— von der Wählerregistrierung bis zu den Ergebnissen.',
  },
};

// Get translated UI string
function t(key) {
  return (UI[currentLang] && UI[currentLang][key]) || UI.en[key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('election-lang', lang);
  applyUITranslations();
  renderAllSections();
}

function getAvailableLanguages() {
  if (!selectedCountry) return [{ code: 'en', name: 'English', native: 'English' }];
  return LANG_CONFIG[selectedCountry] || [{ code: 'en', name: 'English', native: 'English' }];
}

function applyUITranslations() {
  // Navbar links
  const navLinks = document.querySelectorAll('.nav-links a');
  const navKeys = ['nav_timeline', 'nav_steps', 'nav_faq', 'nav_checklist', 'nav_resources'];
  navLinks.forEach((a, i) => { if (navKeys[i]) a.textContent = t(navKeys[i]); });

  // Hero section
  const badge = document.querySelector('.hero-badge');
  if (badge) badge.textContent = t('hero_badge');
  const h1 = document.querySelector('.hero h1');
  if (h1) h1.innerHTML = `${t('hero_title_1')}<br/><span class="gradient-text">${t('hero_title_2')}</span>`;
  const btns = document.querySelectorAll('.hero-actions .btn');
  if (btns[0]) btns[0].textContent = t('hero_btn_steps');
  if (btns[1]) btns[1].textContent = t('hero_btn_checklist');
  const scroll = document.querySelector('.scroll-indicator span');
  if (scroll) scroll.textContent = t('hero_scroll');

  // Section headings
  const headingMap = { timeline: 'sec_timeline', steps: 'sec_steps', faq: 'sec_faq', checklist: 'sec_checklist', resources: 'sec_resources' };
  Object.entries(headingMap).forEach(([id, key]) => {
    const el = document.querySelector(`#${id} .section-title`);
    if (el) el.textContent = t(key);
  });

  // Chat
  const chatInput = document.getElementById('chat-input');
  if (chatInput) chatInput.placeholder = t('chat_placeholder');
  const chatTitle = document.querySelector('.chat-title');
  if (chatTitle) chatTitle.textContent = t('chat_title');
  const chatStatus = document.querySelector('.chat-status');
  if (chatStatus) chatStatus.innerHTML = `<span class="status-dot"></span> ${t('chat_online')}`;

  // Language selector label
  updateLangSelector();
}

function updateLangSelector() {
  const langs = getAvailableLanguages();
  const sel = document.getElementById('lang-select');
  if (!sel) return;
  sel.innerHTML = langs.map(l =>
    `<option value="${l.code}" ${l.code === currentLang ? 'selected' : ''}>${l.native}</option>`
  ).join('');
  const wrapper = document.getElementById('lang-selector');
  if (wrapper) wrapper.style.display = langs.length > 1 ? 'flex' : 'none';
}
