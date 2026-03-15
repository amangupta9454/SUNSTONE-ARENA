<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1100px;margin:0 auto;">

<div style="text-align:center;padding:32px 0 20px;">
  <h1 style="font-size:2.6em;color:#58a6ff;margin:0 0 8px;">⚛️ EduPath AI — Frontend</h1>
  <p style="color:#8b949e;font-size:1.1em;margin:0 0 16px;">React 18 + Vite · Tailwind CSS · Framer Motion · Zustand · React Flow</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
    <span style="background:#1f6feb;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">React 18</span>
    <span style="background:#238636;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Vite 5</span>
    <span style="background:#6e40c9;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Tailwind CSS</span>
    <span style="background:#b08800;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Framer Motion</span>
    <span style="background:#cf222e;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Port 5173</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Component Architecture SVG -->
<h2 style="color:#79c0ff;font-size:1.5em;">🏗️ Component Architecture</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 260" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="fea" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">React App — Component Tree</text>
  <!-- App.jsx -->
  <rect x="340" y="36" width="140" height="36" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <text x="410" y="58" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace" font-weight="bold">App.jsx (Router)</text>
  <!-- Layout -->
  <line x1="410" y1="72" x2="410" y2="90" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <rect x="310" y="90" width="200" height="32" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="410" y="110" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Layout.jsx (Navbar + Sidebar)</text>
  <!-- Pages row -->
  <line x1="250" y1="122" x2="250" y2="142" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <line x1="410" y1="122" x2="410" y2="142" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <line x1="570" y1="122" x2="570" y2="142" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <line x1="310" y1="106" x2="250" y2="106" stroke="#58a6ff" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="510" y1="106" x2="570" y2="106" stroke="#58a6ff" stroke-width="1" stroke-dasharray="3,3"/>
  <!-- Page boxes -->
  <rect x="160" y="142" width="180" height="32" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="250" y="162" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Dashboard.jsx (main hub)</text>
  <rect x="320" y="142" width="180" height="32" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="410" y="162" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Assessment / Quiz / Exam</text>
  <rect x="480" y="142" width="180" height="32" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="570" y="162" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Tutor / LearningPlan / SRS</text>
  <!-- Components row -->
  <line x1="250" y1="174" x2="250" y2="194" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <line x1="410" y1="174" x2="410" y2="194" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <line x1="570" y1="174" x2="570" y2="194" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#fea)"/>
  <rect x="100" y="194" width="300" height="32" rx="6" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="250" y="214" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">AI Components: BurnoutAlert, SkillHeatmap, RiskCard</text>
  <rect x="420" y="194" width="300" height="32" rx="6" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="570" y="214" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">Intelligence: CogLoad, OptStudyTime, SmartBreak</text>
  <!-- Zustand -->
  <rect x="20" y="142" width="120" height="32" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="80" y="162" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Zustand Store</text>
  <line x1="140" y1="158" x2="160" y2="158" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#fea)"/>
  <!-- API -->
  <rect x="20" y="194" width="120" height="32" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="80" y="214" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">services/api.js</text>
  <text x="80" y="240" text-anchor="middle" fill="#8b949e" font-size="8" font-family="monospace">All axios calls</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Pages -->
<h2 style="color:#79c0ff;font-size:1.5em;">📄 Pages (18 files)</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Page</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Route</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">Dashboard.jsx</td><td style="border:1px solid #30363d;padding:10px;">/dashboard</td><td style="border:1px solid #30363d;padding:10px;">Main hub — 3D stat cards, AI recommendation, mastery grid, intelligence widgets</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">Assessment.jsx</td><td style="border:1px solid #30363d;padding:10px;">/assessment</td><td style="border:1px solid #30363d;padding:10px;">Skill selection for adaptive quiz</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">Quiz.jsx</td><td style="border:1px solid #30363d;padding:10px;">/quiz/:skillId</td><td style="border:1px solid #30363d;padding:10px;">Adaptive quiz with BKT-driven question selection</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">Tutor.jsx</td><td style="border:1px solid #30363d;padding:10px;">/tutor</td><td style="border:1px solid #30363d;padding:10px;">Streaming AI chat interface with Gemini Pro</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">LearningPlan.jsx</td><td style="border:1px solid #30363d;padding:10px;">/plan</td><td style="border:1px solid #30363d;padding:10px;">Weekly ML-generated learning plan with progress tracking</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">SRSReview.jsx</td><td style="border:1px solid #30363d;padding:10px;">/srs</td><td style="border:1px solid #30363d;padding:10px;">Spaced repetition flashcard review session</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">MistakeJournal.jsx</td><td style="border:1px solid #30363d;padding:10px;">/mistakes</td><td style="border:1px solid #30363d;padding:10px;">Review and resolve past wrong answers</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">Exam.jsx</td><td style="border:1px solid #30363d;padding:10px;">/exam</td><td style="border:1px solid #30363d;padding:10px;">Timed exam with countdown and auto-submit</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">Leaderboard.jsx</td><td style="border:1px solid #30363d;padding:10px;">/leaderboard</td><td style="border:1px solid #30363d;padding:10px;">Global XP ranking with animated podium</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">Challenges.jsx</td><td style="border:1px solid #30363d;padding:10px;">/challenges</td><td style="border:1px solid #30363d;padding:10px;">Daily challenge tasks and todo list</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">TeacherDashboard.jsx</td><td style="border:1px solid #30363d;padding:10px;">/teacher</td><td style="border:1px solid #30363d;padding:10px;">Class mastery overview and student management</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">ClassInsightsDashboard.jsx</td><td style="border:1px solid #30363d;padding:10px;">/teacher/insights</td><td style="border:1px solid #30363d;padding:10px;">Performance trends, at-risk students, topic assignment</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">Login.jsx / Register.jsx</td><td style="border:1px solid #30363d;padding:10px;">/login · /register</td><td style="border:1px solid #30363d;padding:10px;">Auth forms with role selection</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">marketing/</td><td style="border:1px solid #30363d;padding:10px;">/ · /features · /about · /contact</td><td style="border:1px solid #30363d;padding:10px;">Public marketing pages</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Key Components -->
<h2 style="color:#79c0ff;font-size:1.5em;">🧩 Key Components</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Component</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">StudyStreakCard.jsx</td><td style="border:1px solid #30363d;padding:10px;">7-day activity grid with animated streak counter and 3D tilt effect</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">XPProgressBar.jsx</td><td style="border:1px solid #30363d;padding:10px;">Animated XP bar with level milestone markers and glow effect</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">WeakSpotRadar.jsx</td><td style="border:1px solid #30363d;padding:10px;">Recharts radar chart built from mistake journal data</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">GraphView.jsx</td><td style="border:1px solid #30363d;padding:10px;">React Flow canvas rendering the knowledge graph with animated edges</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">AutoTutorPopup.jsx</td><td style="border:1px solid #30363d;padding:10px;">Floating AI tutor bubble that appears after wrong answers</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">BurnoutAlert.jsx</td><td style="border:1px solid #30363d;padding:10px;">Warning banner when burnout risk score exceeds threshold</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">SkillHeatmap.jsx</td><td style="border:1px solid #30363d;padding:10px;">Colour-coded grid showing mastery intensity per skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">StudentRiskCard.jsx</td><td style="border:1px solid #30363d;padding:10px;">Overall at-risk score combining all intelligence signals</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">CognitiveLoadWidget.jsx</td><td style="border:1px solid #30363d;padding:10px;">Estimates mental load from session length and error rate</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">OptimalStudyTimeWidget.jsx</td><td style="border:1px solid #30363d;padding:10px;">Recommends best study hours from historical accuracy patterns</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Setup -->
<h2 style="color:#79c0ff;font-size:1.5em;">⚙️ Setup</h2>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">npm install
# configure .env (see below)
npm run dev          # Vite dev server on :5173
npm run build        # Production build → dist/
npm run preview      # Preview production build</pre>

<h3 style="color:#d2a8ff;">.env</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">VITE_API_URL=http://localhost:5000/api
VITE_AI_URL=http://localhost:8000</pre>

<h3 style="color:#d2a8ff;">Key Dependencies</h3>
<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Package</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Use</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">react</td><td style="border:1px solid #30363d;padding:10px;">^18.2.0</td><td style="border:1px solid #30363d;padding:10px;">UI framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">vite</td><td style="border:1px solid #30363d;padding:10px;">^5.1.0</td><td style="border:1px solid #30363d;padding:10px;">Build tool + HMR</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">tailwindcss</td><td style="border:1px solid #30363d;padding:10px;">^3.4.1</td><td style="border:1px solid #30363d;padding:10px;">Utility CSS</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">framer-motion</td><td style="border:1px solid #30363d;padding:10px;">^11.0.0</td><td style="border:1px solid #30363d;padding:10px;">Animations + 3D tilt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">reactflow</td><td style="border:1px solid #30363d;padding:10px;">^11.10.4</td><td style="border:1px solid #30363d;padding:10px;">Knowledge graph canvas</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">recharts</td><td style="border:1px solid #30363d;padding:10px;">^2.10.4</td><td style="border:1px solid #30363d;padding:10px;">Radar + bar + line charts</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">zustand</td><td style="border:1px solid #30363d;padding:10px;">^4.5.0</td><td style="border:1px solid #30363d;padding:10px;">Global state</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">lucide-react</td><td style="border:1px solid #30363d;padding:10px;">^0.363.0</td><td style="border:1px solid #30363d;padding:10px;">Icon library</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">
<p style="color:#8b949e;text-align:center;font-size:0.9em;">EduPath AI Frontend — React 18 + Vite + Tailwind + Framer Motion | Port 5173</p>

</body>
