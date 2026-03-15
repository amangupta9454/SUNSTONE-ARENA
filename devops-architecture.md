<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">⚙️ DevOps Architecture</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. Infrastructure Overview</h2>
<p>EduPath AI uses a <b>cloud-native, serverless-friendly deployment model</b> with three independently hosted services. Each service is deployed on a platform optimized for its runtime, with zero infrastructure management overhead.</p>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Service</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Platform</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Runtime</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">URL Pattern</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Auto-Deploy</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend (React SPA)</td><td style="border:1px solid #30363d;padding:10px;">Vercel / Netlify</td><td style="border:1px solid #30363d;padding:10px;">Static CDN</td><td style="border:1px solid #30363d;padding:10px;">edupath.vercel.app</td><td style="border:1px solid #30363d;padding:10px;">✅ On push to main</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend (Node.js)</td><td style="border:1px solid #30363d;padding:10px;">Render.com</td><td style="border:1px solid #30363d;padding:10px;">Node.js 18</td><td style="border:1px solid #30363d;padding:10px;">edupath-api.onrender.com</td><td style="border:1px solid #30363d;padding:10px;">✅ On push to main</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service (Python)</td><td style="border:1px solid #30363d;padding:10px;">Render.com</td><td style="border:1px solid #30363d;padding:10px;">Python 3.10</td><td style="border:1px solid #30363d;padding:10px;">edupath-ai.onrender.com</td><td style="border:1px solid #30363d;padding:10px;">✅ On push to main</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas</td><td style="border:1px solid #30363d;padding:10px;">MongoDB 7.0</td><td style="border:1px solid #30363d;padding:10px;">cluster0.xxxxx.mongodb.net</td><td style="border:1px solid #30363d;padding:10px;">Managed service</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. Infrastructure Diagram</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 440" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="da" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="dg" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="do" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">EduPath AI — Infrastructure Overview</text>
  <!-- Developer -->
  <rect x="20" y="40" width="110" height="50" rx="5" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="75" y="62" text-anchor="middle" fill="#8b949e" font-size="11" font-family="monospace">👨‍💻 Developer</text>
  <text x="75" y="80" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">git push</text>
  <!-- GitHub -->
  <rect x="170" y="40" width="160" height="50" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="250" y="62" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace" font-weight="bold">📦 GitHub</text>
  <text x="250" y="80" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Repo + Actions CI/CD</text>
  <line x1="130" y1="65" x2="168" y2="65" stroke="#8b949e" stroke-width="1.5" marker-end="url(#da)"/>
  <!-- CDN -->
  <rect x="380" y="40" width="160" height="50" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="460" y="62" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace" font-weight="bold">🌐 CDN</text>
  <text x="460" y="80" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Vercel / Netlify</text>
  <line x1="330" y1="55" x2="378" y2="55" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#da)"/>
  <text x="354" y="50" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">deploy</text>
  <!-- Render -->
  <rect x="380" y="130" width="160" height="80" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="460" y="152" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace" font-weight="bold">☁️ Render.com</text>
  <text x="460" y="170" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Node.js :5000</text>
  <text x="460" y="186" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Python FastAPI :8000</text>
  <text x="460" y="202" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">512MB RAM | 0.5 CPU each</text>
  <line x1="330" y1="75" x2="378" y2="145" stroke="#3fb950" stroke-width="1.5" marker-end="url(#dg)"/>
  <text x="340" y="115" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">redeploy</text>
  <!-- MongoDB Atlas -->
  <rect x="380" y="260" width="160" height="60" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="460" y="282" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace" font-weight="bold">🍃 MongoDB Atlas</text>
  <text x="460" y="300" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">M0 Free / M10 Prod</text>
  <text x="460" y="314" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">TLS + AES-256 at rest</text>
  <line x1="460" y1="210" x2="460" y2="258" stroke="#ffa657" stroke-width="1.5" marker-end="url(#do)"/>
  <text x="475" y="238" fill="#8b949e" font-size="9" font-family="monospace">Mongoose + PyMongo TLS</text>
  <!-- External: Gemini -->
  <rect x="620" y="130" width="140" height="50" rx="5" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="690" y="152" text-anchor="middle" fill="#f85149" font-size="11" font-family="monospace" font-weight="bold">Gemini Pro</text>
  <text x="690" y="170" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">LLM Streaming API</text>
  <line x1="540" y1="165" x2="618" y2="165" stroke="#f85149" stroke-width="1.5" marker-end="url(#da)"/>
  <text x="578" y="160" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">HTTPS</text>
  <!-- External: SMTP -->
  <rect x="620" y="200" width="140" height="50" rx="5" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="690" y="222" text-anchor="middle" fill="#f85149" font-size="11" font-family="monospace" font-weight="bold">Gmail SMTP</text>
  <text x="690" y="240" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Email Delivery</text>
  <line x1="540" y1="200" x2="618" y2="220" stroke="#f85149" stroke-width="1.5" marker-end="url(#da)"/>
  <text x="578" y="208" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">SMTP TLS</text>
  <!-- React SPA → Backend arrow -->
  <line x1="460" y1="90" x2="460" y2="128" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#da)"/>
  <text x="475" y="113" fill="#8b949e" font-size="9" font-family="monospace">HTTPS REST + JWT</text>
  <!-- Legend -->
  <rect x="20" y="380" width="12" height="12" rx="2" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="38" y="391" fill="#58a6ff" font-size="10" font-family="monospace">Frontend</text>
  <rect x="120" y="380" width="12" height="12" rx="2" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="138" y="391" fill="#3fb950" font-size="10" font-family="monospace">Backend Services</text>
  <rect x="260" y="380" width="12" height="12" rx="2" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="278" y="391" fill="#ffa657" font-size="10" font-family="monospace">Database</text>
  <rect x="360" y="380" width="12" height="12" rx="2" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="378" y="391" fill="#f85149" font-size="10" font-family="monospace">External APIs</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Hosting Platform Details</h2>

<h3 style="color:#d2a8ff;">Frontend — Vercel / Netlify</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Feature</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Detail</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build command</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm run build</code> (Vite)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Output directory</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">dist/</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Node version</td><td style="border:1px solid #30363d;padding:10px;">18.x</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">SPA routing</td><td style="border:1px solid #30363d;padding:10px;">Redirect all routes to index.html (configured in vercel.json / _redirects)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">CDN</td><td style="border:1px solid #30363d;padding:10px;">Global edge network — sub-100ms TTFB worldwide</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Preview deployments</td><td style="border:1px solid #30363d;padding:10px;">Auto-generated URL for every PR</td></tr>
</table>

<h3 style="color:#d2a8ff;">Backend — Render.com Web Service</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Feature</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Detail</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Start command</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">node server.js</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build command</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm install</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Health check path</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">GET /health</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auto-deploy</td><td style="border:1px solid #30363d;padding:10px;">On push to main branch</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Free tier limitation</td><td style="border:1px solid #30363d;padding:10px;">Spins down after 15 min inactivity — cold start ~30s</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Env vars</td><td style="border:1px solid #30363d;padding:10px;">Set in Render dashboard — injected at runtime</td></tr>
</table>

<h3 style="color:#d2a8ff;">AI Service — Render.com Web Service (Python)</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Feature</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Detail</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Start command</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">uvicorn main:app --host 0.0.0.0 --port 8000</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Build command</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">pip install -r requirements.txt</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Health check path</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">GET /health</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Startup behavior</td><td style="border:1px solid #30363d;padding:10px;">Builds NetworkX knowledge graph on startup — ~5s cold start</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Python version</td><td style="border:1px solid #30363d;padding:10px;">3.10.x</td></tr>
</table>

<h3 style="color:#d2a8ff;">Database — MongoDB Atlas</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Feature</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Detail</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Tier</td><td style="border:1px solid #30363d;padding:10px;">M0 (free) for dev, M10 ($57/mo) for production</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backups</td><td style="border:1px solid #30363d;padding:10px;">Continuous backup on M10+, daily snapshots on M0</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Encryption</td><td style="border:1px solid #30363d;padding:10px;">AES-256 at rest, TLS 1.2+ in transit</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Network access</td><td style="border:1px solid #30363d;padding:10px;">IP whitelist: Render.com IP ranges only</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Connection pooling</td><td style="border:1px solid #30363d;padding:10px;">Mongoose default pool (5 connections)</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. Pipeline Overview</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 300" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="pa" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="pg" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="pr" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#f85149"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">CI/CD Pipeline Flow</text>
  <rect x="20" y="50" width="100" height="44" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="70" y="68" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">git push</text>
  <text x="70" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Developer</text>
  <line x1="120" y1="72" x2="138" y2="72" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#pa)"/>
  <rect x="140" y="50" width="110" height="44" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="195" y="68" text-anchor="middle" fill="#d2a8ff" font-size="10" font-family="monospace">GitHub</text>
  <text x="195" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Receives push</text>
  <line x1="250" y1="72" x2="268" y2="72" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#pa)"/>
  <polygon points="300,50 350,72 300,94 250,72" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="300" y="68" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">Branch?</text>
  <text x="300" y="82" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">main?</text>
  <line x1="300" y1="94" x2="300" y2="130" stroke="#8b949e" stroke-width="1.5" marker-end="url(#pa)"/>
  <text x="312" y="116" fill="#8b949e" font-size="9" font-family="monospace">feature/*</text>
  <rect x="230" y="132" width="140" height="36" rx="5" fill="#161b22" stroke="#8b949e" stroke-width="1.5"/>
  <text x="300" y="150" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Lint + Tests only</text>
  <text x="300" y="163" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">(no deploy)</text>
  <line x1="350" y1="72" x2="388" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#pg)"/>
  <text x="368" y="67" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">main</text>
  <rect x="390" y="50" width="90" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="435" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Install deps</text>
  <text x="435" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">npm install</text>
  <line x1="480" y1="72" x2="498" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#pg)"/>
  <rect x="500" y="50" width="90" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="545" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Lint + Test</text>
  <text x="545" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">ESLint + Jest</text>
  <line x1="590" y1="72" x2="608" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#pg)"/>
  <polygon points="640,50 690,72 640,94 590,72" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="640" y="68" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">Tests</text>
  <text x="640" y="82" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">pass?</text>
  <line x1="640" y1="94" x2="640" y2="130" stroke="#f85149" stroke-width="1.5" marker-end="url(#pr)"/>
  <text x="652" y="116" fill="#f85149" font-size="9" font-family="monospace">No</text>
  <rect x="580" y="132" width="120" height="36" rx="5" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="640" y="150" text-anchor="middle" fill="#f85149" font-size="10" font-family="monospace">Fail Pipeline</text>
  <text x="640" y="163" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Notify developer</text>
  <line x1="690" y1="72" x2="728" y2="72" stroke="#3fb950" stroke-width="1.5" marker-end="url(#pg)"/>
  <text x="708" y="67" fill="#3fb950" font-size="9" font-family="monospace">Yes</text>
  <rect x="730" y="50" width="110" height="44" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="785" y="68" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Build + Deploy</text>
  <text x="785" y="84" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Vercel + Render</text>
  <line x1="785" y1="94" x2="785" y2="130" stroke="#3fb950" stroke-width="1.5" marker-end="url(#pg)"/>
  <rect x="720" y="132" width="130" height="36" rx="5" fill="#1a3a2a" stroke="#3fb950" stroke-width="1.5"/>
  <text x="785" y="150" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">✅ Deployment</text>
  <text x="785" y="163" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Complete</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">5. Rollback Strategy</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Service</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Rollback Method</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Time to Rollback</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend</td><td style="border:1px solid #30363d;padding:10px;">Vercel/Netlify dashboard → click "Redeploy" on previous deployment</td><td style="border:1px solid #30363d;padding:10px;">&lt; 1 minute</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend</td><td style="border:1px solid #30363d;padding:10px;">Render.com dashboard → Manual deploy → select previous commit</td><td style="border:1px solid #30363d;padding:10px;">2–5 minutes</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service</td><td style="border:1px solid #30363d;padding:10px;">Render.com dashboard → Manual deploy → select previous commit</td><td style="border:1px solid #30363d;padding:10px;">3–7 minutes</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas point-in-time restore (M10+) or snapshot restore</td><td style="border:1px solid #30363d;padding:10px;">5–30 minutes</td></tr>
</table>

</body>
