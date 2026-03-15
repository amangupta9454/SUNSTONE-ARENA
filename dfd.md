<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">🔄 Data Flow Diagram</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Level 0 — Context Diagram</h2>
<p>The Level 0 diagram shows EduPath AI as a single system interacting with all external actors. It defines the system boundary and the high-level data flows entering and leaving the platform.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 280" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="d0a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="d0g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="d0o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Level 0 — Context Diagram</text>
  <!-- Central system -->
  <rect x="300" y="100" width="220" height="80" rx="8" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="132" text-anchor="middle" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold">🎓 EduPath AI System</text>
  <text x="410" y="150" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Node.js + Python FastAPI</text>
  <text x="410" y="166" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">MongoDB Atlas</text>
  <!-- Student -->
  <ellipse cx="80" cy="140" rx="55" ry="30" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="80" y="136" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace">👤 Student</text>
  <text x="80" y="152" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Learner</text>
  <!-- Teacher -->
  <ellipse cx="80" cy="230" rx="55" ry="30" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="80" y="226" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace">👩‍🏫 Teacher</text>
  <text x="80" y="242" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Instructor</text>
  <!-- Gemini -->
  <ellipse cx="740" cy="100" rx="60" ry="30" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="740" y="96" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace">🤖 Gemini Pro</text>
  <text x="740" y="112" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">LLM API</text>
  <!-- Gmail -->
  <ellipse cx="740" cy="200" rx="60" ry="30" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="740" y="196" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace">📧 Gmail SMTP</text>
  <text x="740" y="212" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Email Delivery</text>
  <!-- Arrows: Student ↔ System -->
  <line x1="135" y1="130" x2="298" y2="128" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d0g)"/>
  <text x="215" y="122" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Login, answers, queries</text>
  <line x1="298" y1="148" x2="135" y2="148" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d0g)"/>
  <text x="215" y="162" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Mastery, plans, recommendations</text>
  <!-- Teacher ↔ System -->
  <line x1="135" y1="222" x2="298" y2="168" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d0g)"/>
  <text x="200" y="205" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Assignments, class view</text>
  <line x1="298" y1="175" x2="135" y2="238" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d0g)"/>
  <text x="200" y="220" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Analytics, risk alerts</text>
  <!-- System ↔ Gemini -->
  <line x1="520" y1="118" x2="678" y2="100" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d0o)"/>
  <text x="600" y="104" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Prompt + context</text>
  <line x1="678" y1="112" x2="520" y2="128" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d0o)"/>
  <text x="600" y="130" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Streaming SSE response</text>
  <!-- System → Gmail -->
  <line x1="520" y1="162" x2="678" y2="192" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d0o)"/>
  <text x="600" y="182" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Notification email</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Level 1 — Major System Processes</h2>
<p>Level 1 decomposes the system into its 6 major processing subsystems. Each subsystem handles a distinct domain of data transformation.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 400" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="d1a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="d1g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="d1o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Level 1 — Major System Processes</text>
  <!-- Actors -->
  <ellipse cx="60" cy="200" rx="48" ry="28" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="60" y="196" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">👤 Student</text>
  <text x="60" y="210" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Learner</text>
  <ellipse cx="60" cy="340" rx="48" ry="28" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="60" y="336" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">👩‍🏫 Teacher</text>
  <text x="60" y="350" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Instructor</text>
  <!-- DB -->
  <rect x="370" y="340" width="120" height="44" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="430" y="358" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🍃 MongoDB</text>
  <text x="430" y="374" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Atlas</text>
  <!-- Gemini -->
  <ellipse cx="800" cy="200" rx="50" ry="28" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="800" y="196" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🤖 Gemini</text>
  <text x="800" y="210" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Pro</text>
  <!-- Process boxes -->
  <rect x="150" y="40" width="110" height="50" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="205" y="60" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace" font-weight="bold">1.0 Auth</text>
  <text x="205" y="76" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">User Mgmt</text>
  <rect x="290" y="40" width="110" height="50" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="345" y="60" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace" font-weight="bold">2.0 Assess</text>
  <text x="345" y="76" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">BKT Engine</text>
  <rect x="430" y="40" width="110" height="50" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="485" y="60" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace" font-weight="bold">3.0 Learn</text>
  <text x="485" y="76" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Content</text>
  <rect x="570" y="40" width="110" height="50" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="625" y="60" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">4.0 AI Intel</text>
  <text x="625" y="76" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Widgets</text>
  <rect x="150" y="200" width="110" height="50" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="205" y="220" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace" font-weight="bold">5.0 Gamify</text>
  <text x="205" y="236" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">XP + Progress</text>
  <rect x="290" y="200" width="110" height="50" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="345" y="220" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace" font-weight="bold">6.0 Teacher</text>
  <text x="345" y="236" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Dashboard</text>
  <!-- Student → processes -->
  <line x1="108" y1="185" x2="148" y2="75" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1g)"/>
  <line x1="108" y1="195" x2="288" y2="75" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1g)"/>
  <line x1="108" y1="200" x2="428" y2="75" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1g)"/>
  <line x1="108" y1="205" x2="568" y2="75" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1g)"/>
  <line x1="108" y1="210" x2="148" y2="215" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1g)"/>
  <!-- Teacher → P6 -->
  <line x1="108" y1="330" x2="288" y2="240" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d1g)"/>
  <!-- P4 → Gemini -->
  <line x1="680" y1="65" x2="748" y2="185" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d1a)"/>
  <text x="720" y="130" fill="#d2a8ff" font-size="9" font-family="monospace">prompt</text>
  <!-- Processes → DB -->
  <line x1="205" y1="90" x2="390" y2="338" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1o)"/>
  <line x1="345" y1="90" x2="410" y2="338" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1o)"/>
  <line x1="485" y1="90" x2="430" y2="338" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1o)"/>
  <line x1="205" y1="250" x2="390" y2="355" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1o)"/>
  <line x1="345" y1="250" x2="410" y2="355" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d1o)"/>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Level 2 — Sub-Process Decomposition</h2>

<h3 style="color:#d2a8ff;">2.1 — Assessment & BKT Engine (Process 2.0)</h3>
<p>Breaks down the assessment flow from question delivery through BKT computation to mastery update and mistake logging.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 260" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="d2a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="d2g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="d2o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold">Level 2.1 — Assessment &amp; BKT Engine</text>
  <!-- Student -->
  <ellipse cx="60" cy="130" rx="48" ry="28" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="60" y="126" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">👤 Student</text>
  <text x="60" y="140" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Learner</text>
  <!-- DB -->
  <rect x="680" y="104" width="120" height="44" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="740" y="122" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🍃 MongoDB</text>
  <text x="740" y="138" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Atlas</text>
  <!-- Process boxes -->
  <rect x="140" y="40" width="110" height="44" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="195" y="58" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace" font-weight="bold">2.1 Fetch</text>
  <text x="195" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Adaptive Questions</text>
  <rect x="280" y="40" width="110" height="44" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="335" y="58" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace" font-weight="bold">2.2 Submit</text>
  <text x="335" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Validate Answers</text>
  <rect x="420" y="40" width="110" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="475" y="58" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">2.3 BKT</text>
  <text x="475" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Algorithm</text>
  <rect x="560" y="40" width="110" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="615" y="58" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace" font-weight="bold">2.4 Update</text>
  <text x="615" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Mastery Scores</text>
  <rect x="280" y="170" width="110" height="44" rx="5" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="335" y="188" text-anchor="middle" fill="#f85149" font-size="10" font-family="monospace" font-weight="bold">2.5 Log</text>
  <text x="335" y="204" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Mistake Journal</text>
  <!-- Arrows -->
  <line x1="108" y1="118" x2="138" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d2g)"/>
  <text x="115" y="90" fill="#c9d1d9" font-size="8" font-family="monospace">GET questions</text>
  <line x1="250" y1="62" x2="278" y2="62" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#d2a)"/>
  <line x1="390" y1="62" x2="418" y2="62" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#d2a)"/>
  <line x1="530" y1="62" x2="558" y2="62" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d2a)"/>
  <line x1="670" y1="62" x2="678" y2="115" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d2g)"/>
  <text x="680" y="90" fill="#c9d1d9" font-size="8" font-family="monospace">mastery_score</text>
  <line x1="335" y1="84" x2="335" y2="168" stroke="#f85149" stroke-width="1.5" marker-end="url(#d2a)"/>
  <text x="345" y="130" fill="#f85149" font-size="8" font-family="monospace">wrong answers</text>
  <line x1="390" y1="192" x2="678" y2="140" stroke="#f85149" stroke-width="1.5" marker-end="url(#d2a)"/>
  <text x="530" y="178" fill="#c9d1d9" font-size="8" font-family="monospace">MistakeJournal entry</text>
  <line x1="615" y1="84" x2="108" y2="140" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d2g)"/>
  <text x="360" y="130" fill="#3fb950" font-size="8" font-family="monospace">updated mastery map</text>
</svg>

<h3 style="color:#d2a8ff;">2.2 — AI Intelligence Widgets (Process 4.0)</h3>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 240" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="d3a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="d3g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="d3o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
    <marker id="d3p" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d2a8ff"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold">Level 2.2 — AI Intelligence Widgets</text>
  <!-- Student -->
  <ellipse cx="60" cy="120" rx="48" ry="28" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="60" y="116" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">👤 Student</text>
  <text x="60" y="130" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Learner</text>
  <!-- DB -->
  <rect x="680" y="94" width="120" height="44" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="740" y="112" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🍃 MongoDB</text>
  <text x="740" y="128" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Atlas</text>
  <!-- Gemini -->
  <ellipse cx="740" cy="200" rx="60" ry="28" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="740" y="196" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🤖 Gemini Pro</text>
  <text x="740" y="210" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">LLM API</text>
  <!-- Process boxes -->
  <rect x="140" y="40" width="100" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="190" y="58" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">4.1 Tutor</text>
  <text x="190" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">AI Query</text>
  <rect x="260" y="40" width="100" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="310" y="58" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">4.2 Burnout</text>
  <text x="310" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Detection</text>
  <rect x="380" y="40" width="100" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="430" y="58" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">4.3 Risk</text>
  <text x="430" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Prediction</text>
  <rect x="500" y="40" width="100" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="550" y="58" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">4.4 Style</text>
  <text x="550" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Detection</text>
  <rect x="620" y="40" width="100" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="670" y="58" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace" font-weight="bold">4.5 Graph</text>
  <text x="670" y="74" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Generation</text>
  <!-- Student → processes -->
  <line x1="108" y1="108" x2="138" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d3g)"/>
  <line x1="108" y1="115" x2="258" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d3g)"/>
  <line x1="108" y1="120" x2="378" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d3g)"/>
  <line x1="108" y1="125" x2="498" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d3g)"/>
  <line x1="108" y1="130" x2="618" y2="68" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d3g)"/>
  <!-- 4.1 → Gemini -->
  <line x1="190" y1="84" x2="680" y2="185" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d3o)"/>
  <text x="430" y="148" fill="#ffa657" font-size="9" font-family="monospace">prompt + context → SSE stream</text>
  <!-- DB → processes -->
  <line x1="680" y1="116" x2="720" y2="84" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d3o)"/>
  <!-- Processes → Student (results) -->
  <line x1="190" y1="84" x2="108" y2="132" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d3p)"/>
  <line x1="310" y1="84" x2="108" y2="132" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d3p)"/>
  <line x1="430" y1="84" x2="108" y2="132" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d3p)"/>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Level 3 — Detailed Internal Data Flow</h2>
<p>Level 3 shows the internal data flow within the Node.js backend for a typical authenticated API request, from HTTP ingress through middleware, controller, service, and database layers.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 320" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="d4a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="d4g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="d4o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
    <marker id="d4r" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#f85149"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="12" font-family="monospace" font-weight="bold">Level 3 — Internal Request Data Flow</text>
  <!-- React SPA -->
  <rect x="20" y="130" width="90" height="50" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="65" y="150" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">React SPA</text>
  <text x="65" y="166" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">HTTPS + JWT</text>
  <!-- Node.js layer boxes -->
  <rect x="130" y="50" width="80" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="170" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">CORS</text>
  <text x="170" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Middleware</text>
  <rect x="230" y="50" width="80" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="270" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">authMW</text>
  <text x="270" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">JWT Verify</text>
  <rect x="330" y="50" width="80" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="370" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">roleMW</text>
  <text x="370" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Role Check</text>
  <rect x="430" y="50" width="80" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="470" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Router</text>
  <text x="470" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">/api/...</text>
  <rect x="530" y="50" width="80" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="570" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Controller</text>
  <text x="570" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Business Logic</text>
  <!-- Mongoose Model -->
  <rect x="530" y="160" width="80" height="44" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="570" y="178" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">Mongoose</text>
  <text x="570" y="194" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Model</text>
  <!-- aiService -->
  <rect x="630" y="50" width="80" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="670" y="68" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace">aiService</text>
  <text x="670" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">HTTP Proxy</text>
  <!-- FastAPI -->
  <rect x="730" y="50" width="100" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="780" y="68" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace">FastAPI</text>
  <text x="780" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">BKT/Graph/Plan</text>
  <!-- MongoDB -->
  <rect x="680" y="200" width="100" height="44" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="730" y="218" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🍃 MongoDB</text>
  <text x="730" y="234" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Atlas</text>
  <!-- Gemini -->
  <ellipse cx="780" cy="280" rx="60" ry="28" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="780" y="276" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">🤖 Gemini Pro</text>
  <text x="780" y="290" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">SSE Stream</text>
  <!-- Arrows: request flow -->
  <line x1="110" y1="155" x2="128" y2="78" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#d4a)"/>
  <line x1="210" y1="72" x2="228" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d4g)"/>
  <line x1="310" y1="72" x2="328" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d4g)"/>
  <line x1="410" y1="72" x2="428" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d4g)"/>
  <line x1="510" y1="72" x2="528" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#d4g)"/>
  <line x1="610" y1="72" x2="628" y2="72" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d4a)"/>
  <line x1="710" y1="72" x2="728" y2="72" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#d4a)"/>
  <!-- Controller → Mongoose -->
  <line x1="570" y1="94" x2="570" y2="158" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d4o)"/>
  <!-- Mongoose → MongoDB -->
  <line x1="610" y1="182" x2="678" y2="210" stroke="#ffa657" stroke-width="1.5" marker-end="url(#d4o)"/>
  <!-- FastAPI → MongoDB -->
  <line x1="780" y1="94" x2="780" y2="198" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d4o)"/>
  <!-- FastAPI → Gemini -->
  <line x1="780" y1="94" x2="780" y2="250" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#d4o)"/>
  <!-- 401/403 back to client -->
  <line x1="270" y1="94" x2="110" y2="165" stroke="#f85149" stroke-width="1.5" stroke-dasharray="3,3" marker-end="url(#d4r)"/>
  <text x="160" y="140" fill="#f85149" font-size="8" font-family="monospace">401/403</text>
</svg>

</body>
