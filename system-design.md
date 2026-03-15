<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">🏗️ System Design Document</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. High-Level System Overview</h2>
<p>EduPath AI is a <b>three-tier distributed system</b> composed of a React SPA frontend, a Node.js REST API backend, and a Python FastAPI AI microservice. All three services communicate over HTTPS and share a single MongoDB Atlas database cluster.</p>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│   React SPA (Vite) — Vercel/Netlify CDN — Global Edge Nodes    │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS REST
┌──────────────────────────▼──────────────────────────────────────┐
│                      API GATEWAY LAYER                          │
│   Node.js + Express — Render.com — Port 5000                   │
│   JWT Auth · CORS · Rate Limiting · Request Logging            │
└──────────┬────────────────────────────────┬────────────────────┘
           │ Mongoose                        │ HTTP (axios)
┌──────────▼──────────┐          ┌──────────▼──────────────────┐
│   MongoDB Atlas     │          │   Python FastAPI AI Service  │
│   (Cloud Database)  │◄─────────│   Render.com — Port 8000    │
│   17 Collections    │ PyMongo  │   BKT · Recommend · Tutor   │
└─────────────────────┘          └──────────────┬──────────────┘
                                                 │ HTTPS
                                      ┌──────────▼──────────┐
                                      │  Google Gemini Pro  │
                                      │  (External LLM API) │
                                      └─────────────────────┘
</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. System Components</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Component</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Technology</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Responsibility</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Port</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend SPA</td><td style="border:1px solid #30363d;padding:10px;">React + Vite</td><td style="border:1px solid #30363d;padding:10px;">UI rendering, routing, state management, API calls</td><td style="border:1px solid #30363d;padding:10px;">5173 (dev)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend API</td><td style="border:1px solid #30363d;padding:10px;">Node.js + Express</td><td style="border:1px solid #30363d;padding:10px;">Auth, data CRUD, business logic, AI service proxy</td><td style="border:1px solid #30363d;padding:10px;">5000</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Microservice</td><td style="border:1px solid #30363d;padding:10px;">Python + FastAPI</td><td style="border:1px solid #30363d;padding:10px;">BKT, recommendations, knowledge graph, plan generation, tutor</td><td style="border:1px solid #30363d;padding:10px;">8000</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas</td><td style="border:1px solid #30363d;padding:10px;">Persistent storage for all application data</td><td style="border:1px solid #30363d;padding:10px;">27017</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">LLM API</td><td style="border:1px solid #30363d;padding:10px;">Google Gemini Pro</td><td style="border:1px solid #30363d;padding:10px;">AI tutor streaming responses</td><td style="border:1px solid #30363d;padding:10px;">443 (HTTPS)</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Request Lifecycle</h2>
<h3 style="color:#d2a8ff;">Assessment Submission Flow (Most Complex Path)</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">1. Student submits quiz answers
   Frontend → POST /api/assessment/submit { answers[] }

2. Backend authMiddleware verifies JWT
   → Extracts req.user.id

3. assessmentController processes answers
   → Logs mistakes to MistakeJournal collection
   → Creates SRS cards for wrong answers

4. Backend calls AI Service
   → POST http://AI_SERVICE_URL/mastery/update { student_id, answers[] }

5. AI Service runs BKT algorithm
   → Fetches current mastery from MongoDB
   → Runs Bayesian update for each skill
   → Writes updated mastery_score to StudentMastery collection

6. AI Service calls recommendation engine
   → Scores all unlocked skills
   → Returns top 3 recommendations

7. AI Service returns { mastery_map, recommendations }

8. Backend awards XP
   → Updates Student.xp in MongoDB
   → Checks for level-up

9. Backend returns full response to frontend
   → { mastery_map, recommendations, xp_earned, new_level }

10. Frontend updates Zustand store
    → Re-renders dashboard with new mastery data</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. Caching Strategy</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Data</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Cache Location</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">TTL</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Invalidation</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Knowledge Graph (NetworkX)</td><td style="border:1px solid #30363d;padding:10px;">AI Service in-memory</td><td style="border:1px solid #30363d;padding:10px;">Until restart</td><td style="border:1px solid #30363d;padding:10px;">Service restart on skill changes</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">JWT Token</td><td style="border:1px solid #30363d;padding:10px;">Browser localStorage</td><td style="border:1px solid #30363d;padding:10px;">7 days</td><td style="border:1px solid #30363d;padding:10px;">Logout or expiry</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Mastery Map</td><td style="border:1px solid #30363d;padding:10px;">Zustand store (client)</td><td style="border:1px solid #30363d;padding:10px;">Session</td><td style="border:1px solid #30363d;padding:10px;">After assessment submission</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Leaderboard</td><td style="border:1px solid #30363d;padding:10px;">MongoDB query result</td><td style="border:1px solid #30363d;padding:10px;">No cache (live)</td><td style="border:1px solid #30363d;padding:10px;">Real-time on XP award</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">5. Fault Tolerance</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Failure Scenario</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Detection</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Fallback Behaviour</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service unreachable</td><td style="border:1px solid #30363d;padding:10px;">axios timeout (5s)</td><td style="border:1px solid #30363d;padding:10px;">Backend returns last known mastery, no recommendations</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Gemini API rate limit</td><td style="border:1px solid #30363d;padding:10px;">429 response</td><td style="border:1px solid #30363d;padding:10px;">Return static fallback tutor message</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">MongoDB connection lost</td><td style="border:1px solid #30363d;padding:10px;">Mongoose error event</td><td style="border:1px solid #30363d;padding:10px;">503 response, auto-reconnect with backoff</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend unreachable</td><td style="border:1px solid #30363d;padding:10px;">axios network error</td><td style="border:1px solid #30363d;padding:10px;">Frontend shows error toast, retry button</td></tr>
</table>
</body>
