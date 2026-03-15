<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">🤝 Contributing to EduPath AI</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>
<p>Thank you for your interest in contributing. This guide covers everything you need to get started — from local setup through submitting a pull request.</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. Project Setup</h2>

<h3 style="color:#d2a8ff;">Prerequisites</h3>
<ul>
<li>Node.js 18+ (<a href="https://nodejs.org" style="color:#58a6ff;">nodejs.org</a>)</li>
<li>Python 3.10+ (<a href="https://python.org" style="color:#58a6ff;">python.org</a>)</li>
<li>Git</li>
<li>MongoDB Atlas account or local MongoDB 7.0</li>
</ul>

<h3 style="color:#d2a8ff;">1.1 Fork and clone</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;"># Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/edupath-ai.git
cd edupath-ai</pre>

<h3 style="color:#d2a8ff;">1.2 Set up the backend</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd BACKEND/edupath-ai/backend
npm install
# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and other values
# Seed the database (first time only)
node seed.js
# Start the backend
npm run dev
# Server runs at http://localhost:5000</pre>
<h3 style="color:#d2a8ff;">1.3 Set up the AI service</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd BACKEND/edupath-ai/ai-service
# Create virtual environment
python -m venv venv
# Activate (Windows)
venv\Scripts\activate
# Activate (macOS/Linux)
source venv/bin/activate
# Install dependencies
pip install -r requirements.txt
# Create .env file
cp .env.example .env
# Add MONGODB_URI and GEMINI_API_KEY
# Start the AI service
uvicorn main:app --reload --port 8000
# Service runs at http://localhost:8000</pre>
<h3 style="color:#d2a8ff;">1.4 Set up the frontend</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd BACKEND/edupath-ai/frontend
npm install
Create .env file
echo "VITE_API_URL=http://localhost:5000" > .env
Start the frontend
npm run dev
App runs at http://localhost:5173</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. Branching Strategy</h2>
<p>EduPath AI uses a <b>GitHub Flow</b> branching model — simple, fast, and suitable for continuous deployment.</p>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Branch</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Purpose</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Protected</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">main</code></td><td style="border:1px solid #30363d;padding:10px;">Production-ready code — always deployable</td><td style="border:1px solid #30363d;padding:10px;">✅ Yes — requires PR + review</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">develop</code></td><td style="border:1px solid #30363d;padding:10px;">Integration branch — staging environment</td><td style="border:1px solid #30363d;padding:10px;">✅ Yes — requires PR</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">feature/&lt;name&gt;</code></td><td style="border:1px solid #30363d;padding:10px;">New features — branch from develop</td><td style="border:1px solid #30363d;padding:10px;">❌ No</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">fix/&lt;name&gt;</code></td><td style="border:1px solid #30363d;padding:10px;">Bug fixes — branch from develop or main</td><td style="border:1px solid #30363d;padding:10px;">❌ No</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">hotfix/&lt;name&gt;</code></td><td style="border:1px solid #30363d;padding:10px;">Critical production fixes — branch from main</td><td style="border:1px solid #30363d;padding:10px;">❌ No</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">docs/&lt;name&gt;</code></td><td style="border:1px solid #30363d;padding:10px;">Documentation updates only</td><td style="border:1px solid #30363d;padding:10px;">❌ No</td></tr>
</table>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;"># Create a feature branch
git checkout develop
git pull origin develop
git checkout -b feature/srs-streak-bonus
Work on your feature...
Push and open a PR to develop
git push origin feature/srs-streak-bonus</pre>
<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Commit Message Conventions</h2>
<p>EduPath AI follows the <b>Conventional Commits</b> specification. Every commit message must follow this format:</p>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">&lt;type&gt;(&lt;scope&gt;): &lt;short description&gt;

[optional body]

[optional footer]</pre>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">When to Use</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Example</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#3fb950;">feat</code></td><td style="border:1px solid #30363d;padding:10px;">New feature</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">feat(srs): add streak bonus XP multiplier</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f85149;">fix</code></td><td style="border:1px solid #30363d;padding:10px;">Bug fix</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">fix(auth): handle expired JWT gracefully</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#58a6ff;">docs</code></td><td style="border:1px solid #30363d;padding:10px;">Documentation only</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">docs(api): add SRS endpoint examples</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#d2a8ff;">refactor</code></td><td style="border:1px solid #30363d;padding:10px;">Code restructure, no behavior change</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">refactor(bkt): extract update logic to helper</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#ffa657;">style</code></td><td style="border:1px solid #30363d;padding:10px;">Formatting, whitespace, no logic change</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">style(frontend): fix indentation in Dashboard.jsx</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#79c0ff;">test</code></td><td style="border:1px solid #30363d;padding:10px;">Adding or updating tests</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">test(bkt): add unit tests for mastery update</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#8b949e;">chore</code></td><td style="border:1px solid #30363d;padding:10px;">Build process, dependencies, tooling</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">chore(deps): upgrade framer-motion to 11.x</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f85149;">perf</code></td><td style="border:1px solid #30363d;padding:10px;">Performance improvement</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">perf(graph): cache NetworkX DAG at startup</code></td></tr>
</table>

<p><b>Scopes:</b> <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">auth</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">srs</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">bkt</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">tutor</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">plan</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">frontend</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">backend</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">ai-service</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">db</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">api</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">graph</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">deps</code></p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. Code Standards</h2>

<h3 style="color:#d2a8ff;">JavaScript / Node.js</h3>
<ul>
<li>Use <b>ES6+</b> syntax — arrow functions, destructuring, async/await</li>
<li>Use <b>const</b> by default, <b>let</b> only when reassignment is needed — never <b>var</b></li>
<li>All async controller functions must use <b>try/catch</b> or express-async-errors</li>
<li>No console.log in production code — use a logger</li>
<li>Mongoose queries must always include a <b>lean()</b> call for read-only operations</li>
<li>Never expose <b>passwordHash</b> in API responses</li>
</ul>

<h3 style="color:#d2a8ff;">React / Frontend</h3>
<ul>
<li>Use <b>functional components</b> only — no class components</li>
<li>Use <b>Zustand</b> for global state — no prop drilling beyond 2 levels</li>
<li>All API calls go through the <b>api/</b> layer — no direct axios calls in components</li>
<li>Use <b>Tailwind CSS</b> utility classes — avoid inline styles except for dynamic values</li>
<li>Component files use <b>PascalCase</b> — utility files use <b>camelCase</b></li>
<li>Every component must handle loading and error states</li>
</ul>

<h3 style="color:#d2a8ff;">Python / FastAPI</h3>
<ul>
<li>All route handlers must have <b>Pydantic</b> request/response models</li>
<li>Use <b>type hints</b> on all function signatures</li>
<li>Follow <b>PEP 8</b> — max line length 120 characters</li>
<li>Core algorithm functions must have <b>docstrings</b> explaining the algorithm</li>
<li>No hardcoded MongoDB collection names — use constants</li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">5. Pull Request Workflow</h2>

<h3 style="color:#d2a8ff;">Before opening a PR</h3>
<ol>
<li>Ensure your branch is up to date with <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">develop</code></li>
<li>Run linting locally and fix all errors</li>
<li>Run tests locally and ensure they pass</li>
<li>Write or update tests for any new functionality</li>
<li>Update relevant documentation if needed</li>
</ol>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">Sync with develop
git fetch origin
git rebase origin/develop
Run backend lint + tests
cd BACKEND/edupath-ai/backend
npm run lint
npm test
Run frontend lint + tests
cd BACKEND/edupath-ai/frontend
npm run lint
npm test -- --run
Run Python lint
cd BACKEND/edupath-ai/ai-service
flake8 . --max-line-length=120 --exclude=venv</pre>

<h3 style="color:#d2a8ff;">PR Description Template</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">Summary
Brief description of what this PR does.
Changes
- Added X feature to Y component
- Fixed Z bug in W controller
- Updated API documentation
Testing
- [ ] Unit tests added/updated
- [ ] Tested locally end-to-end
- [ ] No regressions in existing tests
Screenshots (if UI changes)
[attach screenshots]
## Related Issues
Closes #123</pre>

<h3 style="color:#d2a8ff;">Review process</h3>
<ul>
<li>At least <b>1 reviewer approval</b> required before merge</li>
<li>All CI checks must pass (lint + tests)</li>
<li>Reviewer may request changes — address all comments before re-requesting review</li>
<li>Squash and merge is preferred to keep a clean commit history on <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">develop</code></li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">6. Reporting Issues</h2>
<p>When filing a bug report, include:</p>
<ul>
<li><b>Environment:</b> OS, Node.js version, Python version, browser</li>
<li><b>Steps to reproduce:</b> Exact steps that trigger the bug</li>
<li><b>Expected behavior:</b> What should happen</li>
<li><b>Actual behavior:</b> What actually happens</li>
<li><b>Error messages:</b> Full stack trace from browser console or server logs</li>
<li><b>Screenshots:</b> If the issue is visual</li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">7. Development Tips</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Tip</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Detail</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI service Swagger UI</td><td style="border:1px solid #30363d;padding:10px;">Visit http://localhost:8000/docs to test all AI endpoints interactively</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend hot reload</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm run dev</code> uses nodemon — auto-restarts on file save</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI service hot reload</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">uvicorn main:app --reload</code> — auto-restarts on file save</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">MongoDB GUI</td><td style="border:1px solid #30363d;padding:10px;">Use MongoDB Compass or Atlas Data Explorer to inspect collections</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Re-seed skills</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">node seed.js</code> is idempotent — safe to run multiple times</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Test JWT tokens</td><td style="border:1px solid #30363d;padding:10px;">Use jwt.io to decode and inspect token payloads during development</td></tr>
</table>

</body>
