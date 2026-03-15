<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1100px;margin:0 auto;">

<div style="text-align:center;padding:32px 0 20px;">
  <h1 style="font-size:2.6em;color:#d2a8ff;margin:0 0 8px;">🐍 EduPath AI — AI Microservice</h1>
  <p style="color:#8b949e;font-size:1.1em;margin:0 0 16px;">Python FastAPI · Bayesian Knowledge Tracing · Knowledge Graph · Gemini Tutor · Plan Generator</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
    <span style="background:#6e40c9;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Python 3.10+</span>
    <span style="background:#1f6feb;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">FastAPI</span>
    <span style="background:#238636;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">NetworkX</span>
    <span style="background:#cf222e;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Gemini Pro</span>
    <span style="background:#b08800;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Port 8000</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- AI Service Architecture SVG -->
<h2 style="color:#79c0ff;font-size:1.5em;">🏗️ Service Architecture</h2>

![ai-service-README diagram](../assets/ai-service-README.svg)

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Endpoints -->
<h2 style="color:#79c0ff;font-size:1.5em;">🔌 API Endpoints</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Method</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Endpoint</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Core Module</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/mastery/update</td><td style="border:1px solid #30363d;padding:10px;">Run BKT update for student answers</td><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">bkt_model.py</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">GET</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/knowledge-graph/{student_id}</td><td style="border:1px solid #30363d;padding:10px;">Build React Flow graph with mastery colours</td><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">knowledge_graph.py</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/recommend</td><td style="border:1px solid #30363d;padding:10px;">Top-N skill recommendations with scores</td><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">recommendation_engine.py</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/plan/generate</td><td style="border:1px solid #30363d;padding:10px;">Generate weekly learning plan</td><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">plan_generator.py</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/tutor/query</td><td style="border:1px solid #30363d;padding:10px;">Streaming Gemini Pro response</td><td style="border:1px solid #30363d;padding:10px;color:#f85149;">Gemini Pro SDK</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/intelligence/risk</td><td style="border:1px solid #30363d;padding:10px;">Student risk score computation</td><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">predictive_model.py</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/intelligence/burnout</td><td style="border:1px solid #30363d;padding:10px;">Burnout risk from session patterns</td><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">predictive_model.py</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">POST</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">/intelligence/learning-style</td><td style="border:1px solid #30363d;padding:10px;">VARK-style learning style detection</td><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">learning_style_model.py</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Core Algorithms -->
<h2 style="color:#79c0ff;font-size:1.5em;">🧠 Core Algorithms</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">File</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Algorithm</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">How it works</th></tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">bkt_model.py</td>
  <td style="border:1px solid #30363d;padding:10px;">Bayesian Knowledge Tracing</td>
  <td style="border:1px solid #30363d;padding:10px;">Updates P(learned) using P(transit), P(slip), P(guess) after each answer. Bayesian posterior update per skill per student.</td>
</tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">knowledge_graph.py</td>
  <td style="border:1px solid #30363d;padding:10px;">NetworkX DAG</td>
  <td style="border:1px solid #30363d;padding:10px;">Builds directed acyclic graph from SkillNode prerequisites. Cached in memory at startup. Converts to React Flow node/edge format with mastery-based colours.</td>
</tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">recommendation_engine.py</td>
  <td style="border:1px solid #30363d;padding:10px;">Weighted Scoring</td>
  <td style="border:1px solid #30363d;padding:10px;">Scores unlocked skills by: (1 - mastery) × difficulty × career_alignment_weight. Returns top-N ranked recommendations.</td>
</tr>
<tr>
  <td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">plan_generator.py</td>
  <td style="border:1px solid #30363d;padding:10px;">Topological Sort + Gap Analysis</td>
  <td style="border:1px solid #30363d;padding:10px;">Topological sort respects prerequisites. Gap analysis ranks skills by (1 - mastery) × difficulty. Schedules 3–5 skills/week with strategies per skill.</td>
</tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Setup -->
<h2 style="color:#79c0ff;font-size:1.5em;">⚙️ Setup</h2>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
# configure .env (see below)
uvicorn main:app --reload --port 8000</pre>

<h3 style="color:#d2a8ff;">.env</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edupath
GEMINI_API_KEY=AIzaSy_your_gemini_key</pre>

<h3 style="color:#d2a8ff;">requirements.txt (key packages)</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">fastapi>=0.110.0
uvicorn>=0.27.0
networkx>=3.2.1
google-generativeai>=0.5.0
pydantic>=2.7.0
numpy>=1.26.4
pymongo>=4.7.0
httpx>=0.27.0
python-dotenv>=1.0.0</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">
<p style="color:#8b949e;text-align:center;font-size:0.9em;">EduPath AI Service — Python FastAPI + BKT + NetworkX + Gemini Pro | Port 8000</p>

</body>
