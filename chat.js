// ===== CONFIGURATION =====
const GEMINI_API_KEY = 'AIzaSyAGt8F9LqzmpWNoSoOVH_crQIuU5czA0Ew'; // <-- Paste your API key here
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `**Role & Persona**
You are the "Civic Expert," an advanced, neutral, and educational engine for the Election Process Assistant. Your mission is to provide factual information about elections, the Executive, and the Judiciary while adapting seamlessly to the user's localized context.

**1. Context Injection & Persistence**
* Input Format: Every user query will be prefixed with: "User is in [SelectedCountry]. User asks: [Message]".
* Mandatory Localization: You MUST prioritize the specified country.
  - India: Focus on the Election Commission (Article 324), Model Code of Conduct, and Lok Sabha.
  - USA: Focus on the Electoral College (270 to win) and Federal vs. State rules.
  - UK/CA/AU: Focus on the Parliamentary/Westminster system and the role of the Monarch/Governor-General.
  - Germany: Explain the MMP system (Two Votes) and coalition dynamics.

**2. The 3-Tier Intelligence Scale**
* Tier 1 (Current Facts): Provide the latest info on current leaders and recent election cycles.
* Tier 2 (Deep Knowledge): Explain complex mechanics like EVM/VVPAT, Judicial Review, and FPTP vs. Proportional representation.
* Tier 3: If a query is outside your core database, summarize general principles.

**3. Visual Trigger Protocol**
You are programmed to trigger educational diagrams. You MUST include the following tags when relevant:
* If the user asks about court structures or hierarchy: [DIAGRAM:COURT_HIERARCHY].
* If the user asks about the "Three Branches" or power distribution: [DIAGRAM:THREE_BRANCHES].
* If the user asks about the election steps: [DIAGRAM:ELECTION_STEPS].

**4. The "Civics-as-Code" Analogy Module**
If the user identifies as a developer or asks for a "technical/simple" explanation, use this framework:
* Constitution = System Requirements (SRS)
* Legislature = The Developers
* Executive = The Runtime Environment
* Judiciary = The Debugger/Compiler

**5. Guardrails & Formatting**
* Neutrality: DO NOT express political opinions.
* Formatting: Use Markdown headers (###), bolding for key terms, and bullet points.
* Mandatory Disclaimer: Always include: "For legally binding dates, consult your local Election Commission."`;

// ===== CHAT ASSISTANT =====
const chatState = { isOpen: false, messages: [] };

// Quick-action chips
function getQuickChips() {
  const chips = [
    { label: '📝 Registration', query: 'How do I register to vote?' },
    { label: '🗳️ How to Vote', query: 'How do I cast my vote?' },
    { label: '🏛️ Parties', query: 'What are the major parties?' },
    { label: '📅 Timeline', query: 'Election timeline' },
    { label: '📊 Results', query: 'How are votes counted?' },
    { label: '✅ Checklist', query: 'Voting checklist' },
    { label: '🔗 Resources', query: 'Official resources' },
  ];
  const countryChips = {
    us: [{ label: '👤 Current President', query: 'Who is the current president?' }, { label: '⚖️ Electoral College', query: 'What is the Electoral College?' }, { label: '🏛️ Congress', query: 'How does Congress work?' }],
    in: [{ label: '👤 Current PM', query: 'Who is the current PM of India?' }, { label: '⚖️ Election Commission', query: 'What is the Election Commission of India?' }, { label: '🗳️ EVM & VVPAT', query: 'What is an EVM and VVPAT?' }],
    gb: [{ label: '👤 Current PM', query: 'Who is the current PM?' }, { label: '🏛️ Parliament', query: 'How does UK Parliament work?' }],
    ca: [{ label: '👤 Current PM', query: 'Who is the current PM of Canada?' }, { label: '⚖️ Elections Canada', query: 'What is Elections Canada?' }],
    au: [{ label: '👤 Current PM', query: 'Who is the current PM of Australia?' }, { label: '🗳️ Compulsory Voting', query: 'Is voting compulsory in Australia?' }],
    de: [{ label: '👤 Current Chancellor', query: 'Who is the current Chancellor?' }, { label: '🗳️ Two Votes', query: 'Erststimme vs Zweitstimme' }],
  };
  if (selectedCountry && countryChips[selectedCountry]) chips.push(...countryChips[selectedCountry]);
  return chips;
}

function renderChips(chips, container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'chat-chips';
  chips.forEach(chip => {
    const btn = document.createElement('button');
    btn.className = 'chat-chip';
    btn.textContent = chip.label;
    btn.onclick = () => { addUserMessage(chip.query); processQuery(chip.query); };
    wrapper.appendChild(btn);
  });
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

// ===== SEARCH ENGINE =====
function localSearch(query) {
  if (!selectedCountry) return null;
  const c = COUNTRIES[selectedCountry];
  const q = query.toLowerCase().replace(/[?!.,''""]/g, '').trim();
  const STOP_WORDS = new Set(['what','which','where','when','who','whom','how','does','is','are','was','were','the','a','an','of','in','to','for','and','or','but','can','do','has','have','had','this','that','with','about','from','tell','me','please','know','explain','describe']);
  const words = q.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
  if (words.length === 0 && q.length > 0) {
    words.push(...q.split(/\s+/).filter(w => w.length > 2));
  }
  if (words.length === 0) return null;

  function fuzzyMatch(a, b) {
    if (a === b) return true;
    // Only fuzzy-match single words of similar length (typo correction)
    if (a.includes(' ') || b.includes(' ')) return false;
    if (Math.abs(a.length - b.length) > 1) return false;
    if (a.length < 4 || b.length < 4) return false; 
    // Levenshtein distance
    const m = a.length, n = b.length;
    const dp = Array.from({length: m + 1}, (_, i) => {
      const row = new Array(n + 1);
      row[0] = i;
      return row;
    });
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i-1] === b[j-1]
          ? dp[i-1][j-1]
          : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
      }
    }
    return dp[m][n] <= 2;
  }

  const results = [];

  if (typeof CURRENT_FACTS !== 'undefined' && CURRENT_FACTS[selectedCountry]) {
    CURRENT_FACTS[selectedCountry].forEach(entry => {
      let score = 0;
      entry.keywords.forEach(kw => {
        if (q.includes(kw)) score += 8;
        words.forEach(w => { if (fuzzyMatch(kw, w)) score += (kw === w ? 4 : 2); });
        const kwWords = kw.split(/\s+/);
        if (kwWords.length > 1 && kwWords.every(kw2 => words.some(w => fuzzyMatch(kw2, w)))) score += 6;
      });
      if (score > 0) results.push({ score, answer: entry.answer, source: 'Current Facts' });
    });
  }

  if (typeof KNOWLEDGE !== 'undefined' && KNOWLEDGE[selectedCountry]) {
    KNOWLEDGE[selectedCountry].forEach(entry => {
      let score = 0;
      entry.keywords.forEach(kw => {
        if (q.includes(kw)) score += 5;
        words.forEach(w => { if (fuzzyMatch(kw, w)) score += (kw === w ? 3 : 2); });
        const kwWords = kw.split(/\s+/);
        if (kwWords.length > 1 && kwWords.every(kw2 => words.some(w => fuzzyMatch(kw2, w)))) score += 5;
      });
      if (score > 0) results.push({ score, answer: entry.answer, source: 'Knowledge Base' });
    });
  }

  c.faq.forEach(f => {
    const fqLower = f.q.toLowerCase();
    let score = 0;
    if (q.includes(fqLower.replace(/[?]/g, '').trim())) score += 10;
    const faqWords = fqLower.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
    words.forEach(w => { if (faqWords.some(fw => fuzzyMatch(fw, w))) score += 2; });
    if (score > 0) results.push({ score, answer: f.a, source: `FAQ: ${f.q}` });
  });

  c.steps.forEach(s => {
    let score = 0;
    const plain = s.details.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    words.forEach(w => {
      if (s.title.toLowerCase().includes(w)) score += 3;
      if (s.summary.toLowerCase().includes(w)) score += 2;
      if (plain.toLowerCase().includes(w)) score += 1;
    });
    if (score > 0) results.push({ score, answer: `**Step ${s.num}: ${s.title}**\n${s.summary}\n\n${plain}`, source: `Step: ${s.title}` });
  });

  c.timeline.forEach(t => {
    let score = 0;
    words.forEach(w => { if ((t.title + ' ' + t.desc).toLowerCase().includes(w)) score += 2; });
    if (score > 0) results.push({ score, answer: `**${t.title}** (${t.phase})\n${t.desc}`, source: `Timeline: ${t.title}` });
  });

  if (words.some(w => ['checklist','prepare','preparation','ready'].includes(w)))
    results.push({ score: 4, answer: `Voting checklist for ${c.name}:\n\n${c.checklist.map((item,i) => `${i+1}. ${item}`).join('\n')}`, source: 'Checklist' });
  if (words.some(w => ['resources','links','websites','official','website'].includes(w)))
    results.push({ score: 4, answer: `Official resources for ${c.name}:\n\n${c.resources.map(r => `• **${r.name}** — ${r.desc}\n  ${r.url}`).join('\n\n')}`, source: 'Resources' });
  if (words.some(w => ['timeline','schedule','dates','deadline','calendar'].includes(w)))
    results.push({ score: 4, answer: `Election timeline for ${c.name}:\n\n${c.timeline.map(t => `• **${t.title}** (${t.phase}) — ${t.desc}`).join('\n')}`, source: 'Timeline' });

  results.sort((a, b) => b.score - a.score);
  if (results.length > 0 && results[0].score >= 8) {
    let response = results[0].answer;
    if (results.length > 1 && results[1].score >= results[0].score * 0.5 && results[1].source !== results[0].source)
      response += `\n\n---\n📌 Related: **${results[1].source}**`;
    return response;
  }
  return null;
}

// ===== GEMINI API FALLBACK (Replaces Wikipedia) =====
async function searchGemini(query) {
  // 🚨 SAFETY CHECK DELETED! We are bypassing the bouncer.

  // Inject Country Context safely
  const countryName = (typeof COUNTRIES !== 'undefined' && selectedCountry) ? COUNTRIES[selectedCountry].name : "Unknown";
  const dynamicPrompt = `User is in [${countryName}]. User asks: ${query}`;

  const payload = {
    systemInstruction: { 
      parts: [{ text: SYSTEM_PROMPT }] 
    },
    contents: [
      { parts: [{ text: dynamicPrompt }] }
    ],
    generationConfig: { temperature: 0.3 }
  };

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();

    if (data.error) {
      console.error("Gemini API Error details:", data.error);
      return "There was an error connecting to the AI. Check the console."; 
    }

    if (data.candidates && data.candidates[0].content) {
      let text = data.candidates[0].content.parts[0].text;
      return text + `\n\n---\n✨ Answered by **Civic AI**`;
    }
    
    return null;
  } catch (e) {
    console.error('Gemini Fetch error:', e);
    return null;
  }
}

// ===== PROCESS QUERY (local → Gemini) =====
async function processQuery(query) {
  const q = query.toLowerCase().trim();
  const container = document.getElementById('chat-messages');

  if (['hello','hi','hey','help','start'].some(w => q.includes(w)) && q.split(/\s+/).length <= 3) {
    addBotMessage(greetingMessage(), true);
    return;
  }

  // 1. Try local search first
  const localResult = localSearch(query);
  if (localResult) {
    addBotMessage(localResult);
    renderChips(getQuickChips(), container);
    return;
  }

  // 1.5 Special Civic Expert Triggers
  // Developer Analogy
  if (['developer','code','technical','srs','programming','engine'].some(w => q.includes(w))) {
    addBotMessage(`### 💻 Civics-as-Code\nThink of the government as a distributed system:\n\n• **Constitution** = System Requirements (SRS)\n• **Legislature** = The Developers (Write the source code)\n• **Executive** = The Runtime (Executes the code)\n• **Judiciary** = The Debugger (Scans for syntax errors)`);
    renderChips(getQuickChips(), container);
    return;
  }
  // Visual Triggers
  if (['branches','power','distribution','government structure'].some(w => q.includes(w))) {
    addBotMessage(`Power is distributed across three branches to ensure checks and balances.\n\n[DIAGRAM:THREE_BRANCHES]`);
    renderChips(getQuickChips(), container);
    return;
  }
  if (['court','judge','judiciary','hierarchy'].some(w => q.includes(w))) {
    addBotMessage(`The court system is structured hierarchically to handle appeals and local cases.\n\n[DIAGRAM:COURT_HIERARCHY]`);
    renderChips(getQuickChips(), container);
    return;
  }
  if (['process','steps','how to vote','journey'].some(w => q.includes(w))) {
    addBotMessage(`The election process follows a standard sequence of phases.\n\n[DIAGRAM:ELECTION_STEPS]`);
    renderChips(getQuickChips(), container);
    return;
  }
  // Non-Civic Pivot
  if (['java','python','javascript','css','html'].some(w => q.includes(w)) && !['election','voter','government'].some(w => q.includes(w))) {
    addBotMessage(`I specialize in civic education and elections! While I can't help with software development, I can explain how technology like voting machines or registration databases work in the context of elections.`);
    renderChips(getQuickChips(), container);
    return;
  }

  // 2. Show searching indicator, then hit Gemini API
  addBotMessage('🧠 Asking the Civic AI...', false, true);

  const geminiResult = await searchGemini(query);
  
  // Remove the searching message
  const lastMsg = container.querySelector('.chat-msg.bot:last-of-type');
  if (lastMsg) lastMsg.remove();
  chatState.messages.pop();

  if (geminiResult) {
    addBotMessage(geminiResult);
    renderChips(getQuickChips(), container);
  } else {
    const c = COUNTRIES[selectedCountry];
    addBotMessage(`I couldn't find a specific answer for "${query}".\n\nTry clicking a topic below or ask about registration, voting, parties, constitution, current leaders, or government structure!`, false);
    renderChips(getQuickChips().slice(0, 6), container);
  }
}

function greetingMessage() {
  const c = COUNTRIES[selectedCountry];
  return `Hello! 👋 I'm your Election Assistant for **${c.name}** ${c.flag}.\n\nI can answer questions about elections, constitutional bodies, government structure, current leaders, and more.\n\nClick a topic below or type your own question!`;
}

// ===== CHAT UI =====
function toggleChat() {
  chatState.isOpen = !chatState.isOpen;
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  panel.classList.toggle('open', chatState.isOpen);
  fab.classList.toggle('active', chatState.isOpen);
  if (chatState.isOpen && chatState.messages.length === 0) {
    addBotMessage(greetingMessage(), true);
  }
  if (chatState.isOpen) setTimeout(() => document.getElementById('chat-input').focus(), 300);
}

function addBotMessage(text, showChips = false, instant = false) {
  chatState.messages.push({ role: 'bot', text });
  const container = document.getElementById('chat-messages');

  if (instant) {
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = `<div class="msg-avatar">🗳️</div><div class="msg-bubble">${formatMessage(text)}</div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return;
  }

  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg bot typing-msg';
  typingEl.innerHTML = `<div class="msg-avatar">🗳️</div><div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  container.appendChild(typingEl);
  container.scrollTop = container.scrollHeight;
  setTimeout(() => {
    typingEl.remove();
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = `<div class="msg-avatar">🗳️</div><div class="msg-bubble">${formatMessage(text)}</div>`;
    container.appendChild(el);
    if (showChips) renderChips(getQuickChips(), container);
    container.scrollTop = container.scrollHeight;
  }, 400 + Math.min(text.length, 500));
}

function addUserMessage(text) {
  chatState.messages.push({ role: 'user', text });
  const container = document.getElementById('chat-messages');
  container.querySelectorAll('.chat-chips').forEach(el => el.remove());
  const el = document.createElement('div');
  el.className = 'chat-msg user';
  el.innerHTML = `<div class="msg-bubble">${escapeHTML(text)}</div>`;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function handleChatSend() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addUserMessage(text);
  processQuery(text);
}

function formatMessage(text) {
  let html = escapeHTML(text);
  
  // 1. Map specific diagrams to REAL image URLs
  const diagrams = {
    'COURT_HIERARCHY': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Structure_of_Courts_in_India.png/500px-Structure_of_Courts_in_India.png',
    'THREE_BRANCHES': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Checks_and_balances_en.svg/500px-Checks_and_balances_en.svg.png',
    'ELECTION_STEPS': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Voting_box_icon.svg/200px-Voting_box_icon.svg.png' // Replace with your actual flowchart image
  };

  // Replace [DIAGRAM:X] with an actual HTML <img> tag
  html = html.replace(/\[DIAGRAM:(.+?)\]/g, (match, diagramKey) => {
    // Check if we have a URL for this diagram
    const imageUrl = diagrams[diagramKey];
    
    if (imageUrl) {
      // Return a styled image tag
      return `<div style="margin: 15px 0; text-align: center;">
                <img src="${imageUrl}" alt="${diagramKey}" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              </div>`;
    } else {
      // Fallback: If no URL is found, show the grey placeholder box
      return `<div style="background:rgba(0,0,0,0.05); border:1px dashed #aaa; padding:15px; margin:10px 0; border-radius:8px; text-align:center; color:#555; font-size:0.9em;">
                🖼️ <strong>Visual Diagram Needed:</strong><br>${diagramKey}
              </div>`;
    }
  });

  // 2. Bold formatting
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // 3. Horizontal rules
  html = html.replace(/\n---\n/g, '<hr style="border:none;border-top:1px solid rgba(99,140,255,0.15);margin:0.75rem 0">');
  
  // 4. Clickable Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--clr-primary)">$1</a>');
  
  // 5. Line breaks and Bullets
  html = html.replace(/\n/g, '<br>');
  html = html.replace(/• /g, '&bull; ');
  
  return html;
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderChatUI() {
  const fab = document.createElement('button');
  fab.id = 'chat-fab'; fab.className = 'chat-fab';
  fab.setAttribute('aria-label', 'Open chat assistant');
  fab.innerHTML = `<span class="fab-icon chat-icon">💬</span><span class="fab-icon close-icon">✕</span>`;
  fab.onclick = toggleChat;

  const panel = document.createElement('div');
  panel.id = 'chat-panel'; panel.className = 'chat-panel';
  panel.innerHTML = `
    <div class="chat-header">
      <div class="chat-header-info">
        <div class="chat-avatar-header">🗳️</div>
        <div>
          <div class="chat-title">Election Assistant</div>
          <div class="chat-status"><span class="status-dot"></span> Online</div>
        </div>
      </div>
      <button class="chat-close" onclick="toggleChat()" aria-label="Close chat">✕</button>
    </div>
    <div class="chat-messages" id="chat-messages"></div>
    <div class="chat-input-area">
      <input type="text" id="chat-input" placeholder="Ask about elections, leaders, constitution..." autocomplete="off" />
      <button class="chat-send" onclick="handleChatSend()" aria-label="Send message">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>`;

  document.body.appendChild(panel);
  document.body.appendChild(fab);
  document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') handleChatSend(); });
}

document.addEventListener('DOMContentLoaded', () => { renderChatUI(); });