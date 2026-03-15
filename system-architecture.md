<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">🏛️ System Architecture Document</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. Architecture Style</h2>
<p>EduPath AI uses a <b>Microservices-Lite architecture</b> — a pragmatic hybrid between a monolith and full microservices. The system has two independently deployable backend services (Node.js + Python) that share a single database, rather than a full microservices mesh with per-service databases.</p>

<h3 style="color:#d2a8ff;">Architecture Decision: Why Not Full Microservices?</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Consideration</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Decision</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Rationale</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Service separation</td><td style="border:1px solid #30363d;padding:10px;">2 services (Node + Python)</td><td style="border:1px solid #30363d;padding:10px;">Language boundary — JS for CRUD, Python for ML</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database</td><td style="border:1px solid #30363d;padding:10px;">Shared MongoDB Atlas</td><td style="border:1px solid #30363d;padding:10px;">Avoids data sync complexity at current scale</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Service mesh</td><td style="border:1px solid #30363d;padding:10px;">Direct HTTP calls</td><td style="border:1px solid #30363d;padding:10px;">No Kubernetes overhead needed at MVP scale</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">API Gateway</td><td style="border:1px solid #30363d;padding:10px;">Node.js acts as gateway</td><td style="border:1px solid #30363d;padding:10px;">Frontend only talks to one backend URL</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. Architecture Layers</h2>

<h3 style="color:#d2a8ff;">Layer 1 — Presentation (Frontend)</h3>
<ul>
<li><b>Technology:</b> React 18 + Vite + Tailwind CSS + Framer Motion</li>
<li><b>Deployment:</b> Static SPA on Vercel/Netlify CDN</li>
<li><b>Responsibilities:</b> UI rendering, client-side routing, state management, API calls</li>
<li><b>State:</b> Zustand for global state, React useState for local UI state</li>
<li><b>Auth:</b> JWT stored in localStorage, attached to every API request via axios interceptor</li>
</ul>

<h3 style="color:#d2a8ff;">Layer 2 — API Gateway (Node.js Backend)</h3>
<ul>
<li><b>Technology:</b> Node.js 18 + Express 4 + Mongoose</li>
<li><b>Deployment:</b> Render.com Web Service</li>
<li><b>Responsibilities:</b> JWT verification, CORS, request routing, business logic, MongoDB CRUD, AI service proxy</li>
<li><b>Pattern:</b> MVC — Routes → Controllers → Models</li>
<li><b>Error handling:</b> express-async-errors + global error middleware</li>
</ul>

<h3 style="color:#d2a8ff;">Layer 3 — AI Service (Python FastAPI)</h3>
<ul>
<li><b>Technology:</b> Python 3.10 + FastAPI + Uvicorn</li>
<li><b>Deployment:</b> Render.com Web Service (separate instance)</li>
<li><b>Responsibilities:</b> BKT computation, skill recommendations, knowledge graph, learning plan, AI tutor, intelligence widgets</li>
<li><b>Pattern:</b> Router → Core Algorithm → MongoDB (PyMongo)</li>
<li><b>Startup:</b> Pre-builds NetworkX knowledge graph on service start</li>
</ul>

<h3 style="color:#d2a8ff;">Layer 4 — Data (MongoDB Atlas)</h3>
<ul>
<li><b>Technology:</b> MongoDB Atlas (M0 free tier → M10 production)</li>
<li><b>Collections:</b> 17 collections across all features</li>
<li><b>Access:</b> Node.js via Mongoose ODM, Python via PyMongo/motor</li>
<li><b>Indexes:</b> studentId on mastery, SRS, mistakes, sessions for fast lookups</li>
</ul>

<h3 style="color:#d2a8ff;">Layer 5 — External Services</h3>
<ul>
<li><b>Google Gemini Pro:</b> LLM API for AI Tutor streaming responses</li>
<li><b>Gmail SMTP:</b> Email notifications via Nodemailer</li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Architecture Diagram</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 500" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="aa" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="ag" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="ao" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <!-- Layer labels -->
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">EduPath AI — System Architecture</text>

  <!-- CLIENT LAYER -->
  <rect x="20" y="40" width="820" height="80" rx="6" fill="#0d1117" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="30" y="58" fill="#58a6ff" font-size="10" font-family="monospace">🌐 CLIENT LAYER — CDN (Vercel / Netlify)</text>
  <rect x="260" y="65" width="340" height="44" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="430" y="83" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace" font-weight="bold">React SPA</text>
  <text x="430" y="100" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Vite · Tailwind · Framer Motion · Zustand · React Router</text>

  <!-- Arrow: FE → BE -->
  <line x1="430" y1="109" x2="430" y2="148" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#aa)"/>
  <text x="445" y="133" fill="#8b949e" font-size="9" font-family="monospace">HTTPS REST + JWT</text>

  <!-- API LAYER -->
  <rect x="20" y="150" width="820" height="100" rx="6" fill="#0d1117" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="30" y="168" fill="#3fb950" font-size="10" font-family="monospace">⚙️ API LAYER — Node.js + Express (Render.com :5000)</text>
  <rect x="40" y="175" width="220" height="60" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="150" y="196" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace" font-weight="bold">Express Server</text>
  <text x="150" y="212" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">17 Route Groups</text>
  <text x="150" y="226" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Controllers · Morgan</text>
  <rect x="310" y="175" width="200" height="60" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="410" y="196" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace" font-weight="bold">Middleware</text>
  <text x="410" y="212" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">authMiddleware</text>
  <text x="410" y="226" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">roleMiddleware</text>
  <rect x="560" y="175" width="260" height="60" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="690" y="196" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace" font-weight="bold">Services</text>
  <text x="690" y="212" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">aiService.js · curriculumEngine.js</text>
  <text x="690" y="226" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">supabaseClient.js</text>

  <!-- Arrow: BE → AI -->
  <line x1="690" y1="250" x2="690" y2="288" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ao)"/>
  <text x="705" y="273" fill="#8b949e" font-size="9" font-family="monospace">HTTP axios</text>
  <!-- Arrow: BE → DB -->
  <line x1="150" y1="250" x2="150" y2="390" stroke="#3fb950" stroke-width="1.5" marker-end="url(#ag)"/>
  <text x="158" y="325" fill="#8b949e" font-size="9" font-family="monospace">Mongoose</text>

  <!-- AI LAYER -->
  <rect x="20" y="290" width="820" height="100" rx="6" fill="#0d1117" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="30" y="308" fill="#ffa657" font-size="10" font-family="monospace">🐍 AI LAYER — Python FastAPI + Uvicorn (Render.com :8000)</text>
  <rect x="40" y="315" width="200" height="60" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="140" y="336" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace" font-weight="bold">FastAPI Routers</text>
  <text x="140" y="352" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">BKT · Recommend</text>
  <text x="140" y="366" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Tutor · Plan · Intel</text>
  <rect x="290" y="315" width="240" height="60" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="410" y="336" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace" font-weight="bold">Core Algorithms</text>
  <text x="410" y="352" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">BKT · KnowledgeGraph</text>
  <text x="410" y="366" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">RecommendationEngine · PlanGenerator</text>
  <rect x="580" y="315" width="240" height="60" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="700" y="336" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace" font-weight="bold">Supporting Services</text>
  <text x="700" y="352" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">PredictiveModel</text>
  <text x="700" y="366" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">QuestionGen · LearningStyle</text>

  <!-- Arrow: AI → DB -->
  <line x1="410" y1="390" x2="410" y2="418" stroke="#ffa657" stroke-width="1.5" marker-end="url(#ao)"/>
  <text x="418" y="408" fill="#8b949e" font-size="9" font-family="monospace">PyMongo</text>

  <!-- DATA LAYER -->
  <rect x="20" y="420" width="500" height="60" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="270" y="443" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace" font-weight="bold">🍃 MongoDB Atlas — 17 Collections</text>
  <text x="270" y="462" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Mongoose ODM (Node.js) · PyMongo (Python)</text>

  <!-- EXTERNAL SERVICES -->
  <rect x="540" y="420" width="160" height="60" rx="6" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="620" y="443" text-anchor="middle" fill="#f85149" font-size="11" font-family="monospace" font-weight="bold">Gemini Pro</text>
  <text x="620" y="462" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">LLM Streaming SSE</text>
  <rect x="715" y="420" width="125" height="60" rx="6" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="777" y="443" text-anchor="middle" fill="#f85149" font-size="11" font-family="monospace" font-weight="bold">Gmail SMTP</text>
  <text x="777" y="462" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Nodemailer</text>

  <!-- Arrow: AI → Gemini -->
  <line x1="700" y1="390" x2="700" y2="418" stroke="#f85149" stroke-width="1.5" marker-end="url(#ao)"/>
  <!-- Arrow: BE → SMTP -->
  <line x1="777" y1="250" x2="777" y2="418" stroke="#f85149" stroke-width="1.5" marker-end="url(#ao)"/>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. Security Layer</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Security Control</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Implementation</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Layer</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Authentication</td><td style="border:1px solid #30363d;padding:10px;">JWT HS256, 7-day expiry</td><td style="border:1px solid #30363d;padding:10px;">Backend middleware</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Password Security</td><td style="border:1px solid #30363d;padding:10px;">bcryptjs, 10 salt rounds</td><td style="border:1px solid #30363d;padding:10px;">Auth controller</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">CORS</td><td style="border:1px solid #30363d;padding:10px;">Whitelist FRONTEND_URL only</td><td style="border:1px solid #30363d;padding:10px;">Express middleware</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Role-Based Access</td><td style="border:1px solid #30363d;padding:10px;">roleMiddleware.js checks req.user.role</td><td style="border:1px solid #30363d;padding:10px;">Route middleware</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Secrets Management</td><td style="border:1px solid #30363d;padding:10px;">Environment variables, never in code</td><td style="border:1px solid #30363d;padding:10px;">All layers</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Transport Security</td><td style="border:1px solid #30363d;padding:10px;">HTTPS enforced on all production URLs</td><td style="border:1px solid #30363d;padding:10px;">Infrastructure</td></tr>
</table>
</body>
