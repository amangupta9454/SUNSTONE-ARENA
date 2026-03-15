<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">⚙️ Technical Requirements Document (TRD)</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. Tech Stack Overview</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Layer</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Technology</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Rationale</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend Framework</td><td style="border:1px solid #30363d;padding:10px;">React</td><td style="border:1px solid #30363d;padding:10px;">18.2.0</td><td style="border:1px solid #30363d;padding:10px;">Component model, large ecosystem, concurrent features</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend Build Tool</td><td style="border:1px solid #30363d;padding:10px;">Vite</td><td style="border:1px solid #30363d;padding:10px;">5.1.0</td><td style="border:1px solid #30363d;padding:10px;">Sub-second HMR, ESM-native, faster than CRA/Webpack</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">CSS Framework</td><td style="border:1px solid #30363d;padding:10px;">Tailwind CSS</td><td style="border:1px solid #30363d;padding:10px;">3.4.1</td><td style="border:1px solid #30363d;padding:10px;">Utility-first, no CSS bloat, design system consistency</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Animation</td><td style="border:1px solid #30363d;padding:10px;">Framer Motion</td><td style="border:1px solid #30363d;padding:10px;">11.0.0</td><td style="border:1px solid #30363d;padding:10px;">Spring physics, layout animations, 3D transforms</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">State Management</td><td style="border:1px solid #30363d;padding:10px;">Zustand</td><td style="border:1px solid #30363d;padding:10px;">4.5.0</td><td style="border:1px solid #30363d;padding:10px;">Minimal boilerplate, no Provider wrapping, fast</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Routing</td><td style="border:1px solid #30363d;padding:10px;">React Router DOM</td><td style="border:1px solid #30363d;padding:10px;">6.22.0</td><td style="border:1px solid #30363d;padding:10px;">Nested routes, data loaders, declarative routing</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Graph Visualisation</td><td style="border:1px solid #30363d;padding:10px;">React Flow</td><td style="border:1px solid #30363d;padding:10px;">11.10.4</td><td style="border:1px solid #30363d;padding:10px;">Interactive node-edge graphs, custom node rendering</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Charts</td><td style="border:1px solid #30363d;padding:10px;">Recharts</td><td style="border:1px solid #30363d;padding:10px;">2.10.4</td><td style="border:1px solid #30363d;padding:10px;">React-native charts, radar/bar/line support</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend Runtime</td><td style="border:1px solid #30363d;padding:10px;">Node.js</td><td style="border:1px solid #30363d;padding:10px;">18+</td><td style="border:1px solid #30363d;padding:10px;">Non-blocking I/O, large npm ecosystem</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend Framework</td><td style="border:1px solid #30363d;padding:10px;">Express.js</td><td style="border:1px solid #30363d;padding:10px;">4.18.2</td><td style="border:1px solid #30363d;padding:10px;">Minimal, flexible, battle-tested REST framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas</td><td style="border:1px solid #30363d;padding:10px;">Cloud</td><td style="border:1px solid #30363d;padding:10px;">Flexible schema, horizontal scaling, managed cloud</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">ODM</td><td style="border:1px solid #30363d;padding:10px;">Mongoose</td><td style="border:1px solid #30363d;padding:10px;">8.0.3</td><td style="border:1px solid #30363d;padding:10px;">Schema validation, middleware hooks, population</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service Framework</td><td style="border:1px solid #30363d;padding:10px;">FastAPI</td><td style="border:1px solid #30363d;padding:10px;">0.110.0</td><td style="border:1px solid #30363d;padding:10px;">Async Python, auto Swagger docs, Pydantic validation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service Server</td><td style="border:1px solid #30363d;padding:10px;">Uvicorn</td><td style="border:1px solid #30363d;padding:10px;">0.27.0</td><td style="border:1px solid #30363d;padding:10px;">ASGI server, production-grade async handling</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Graph Library</td><td style="border:1px solid #30363d;padding:10px;">NetworkX</td><td style="border:1px solid #30363d;padding:10px;">3.2.1</td><td style="border:1px solid #30363d;padding:10px;">DAG operations, topological sort, graph traversal</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">LLM API</td><td style="border:1px solid #30363d;padding:10px;">Google Gemini Pro</td><td style="border:1px solid #30363d;padding:10px;">0.5.0</td><td style="border:1px solid #30363d;padding:10px;">Streaming responses, free tier, multimodal capable</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">JWT (jsonwebtoken)</td><td style="border:1px solid #30363d;padding:10px;">9.0.2</td><td style="border:1px solid #30363d;padding:10px;">Stateless auth, no session storage needed</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Password Hashing</td><td style="border:1px solid #30363d;padding:10px;">bcryptjs</td><td style="border:1px solid #30363d;padding:10px;">2.4.3</td><td style="border:1px solid #30363d;padding:10px;">Adaptive hashing, salt rounds configurable</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. Authentication & Authorization</h2>
<h3 style="color:#d2a8ff;">JWT Flow</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">POST /api/auth/login
  → Validate credentials
  → bcrypt.compare(password, hash)
  → jwt.sign({ id, role, name }, JWT_SECRET, { expiresIn: '7d' })
  → Return { token, user }

Protected Route:
  → Extract Bearer token from Authorization header
  → jwt.verify(token, JWT_SECRET)
  → Attach decoded payload to req.user
  → roleMiddleware checks req.user.role === required_role</pre>

<h3 style="color:#d2a8ff;">Role Permissions Matrix</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Route Group</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Student</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Teacher</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">/api/student/*</td><td style="border:1px solid #30363d;padding:10px;">✅ Own data only</td><td style="border:1px solid #30363d;padding:10px;">✅ All students</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">/api/assessment/*</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">/api/assignments/*</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">✅</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">/api/analytics/class</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">✅</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Error Handling Strategy</h2>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Global error handler in server.js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});</pre>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Error Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">HTTP Status</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Handling</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Validation Error</td><td style="border:1px solid #30363d;padding:10px;">400</td><td style="border:1px solid #30363d;padding:10px;">Return field-level error messages</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Unauthorized</td><td style="border:1px solid #30363d;padding:10px;">401</td><td style="border:1px solid #30363d;padding:10px;">Missing or invalid JWT token</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Forbidden</td><td style="border:1px solid #30363d;padding:10px;">403</td><td style="border:1px solid #30363d;padding:10px;">Insufficient role permissions</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Not Found</td><td style="border:1px solid #30363d;padding:10px;">404</td><td style="border:1px solid #30363d;padding:10px;">Resource does not exist</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service Down</td><td style="border:1px solid #30363d;padding:10px;">503</td><td style="border:1px solid #30363d;padding:10px;">Graceful fallback response returned</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Internal Error</td><td style="border:1px solid #30363d;padding:10px;">500</td><td style="border:1px solid #30363d;padding:10px;">Logged, generic message to client</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. Environment Configuration</h2>
<h3 style="color:#d2a8ff;">Backend (.env)</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edupath
PORT=5000
JWT_SECRET=minimum_32_character_random_string
FRONTEND_URL=https://edupath.vercel.app
AI_SERVICE_URL=https://edupath-ai.onrender.com
EMAIL_USER=notifications@edupath.ai
EMAIL_PASS=gmail_app_password
NODE_ENV=production</pre>

<h3 style="color:#d2a8ff;">AI Service (.env)</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edupath
GEMINI_API_KEY=AIzaSy_your_gemini_key</pre>

<h3 style="color:#d2a8ff;">Frontend (.env)</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">VITE_API_URL=https://edupath-backend.onrender.com/api
VITE_AI_URL=https://edupath-ai.onrender.com</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">5. Scalability Strategy</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Concern</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Strategy</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Database</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas auto-scaling, sharding on studentId for mastery collection</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Backend</td><td style="border:1px solid #30363d;padding:10px;">Stateless Express — horizontal scaling via multiple Render instances</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">AI Service</td><td style="border:1px solid #30363d;padding:10px;">Knowledge graph cached in memory on startup, rebuilt only on skill changes</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Frontend</td><td style="border:1px solid #30363d;padding:10px;">Static SPA on CDN (Vercel/Netlify) — globally distributed edge nodes</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Gemini API</td><td style="border:1px solid #30363d;padding:10px;">Rate limiting per user, queue for burst traffic</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">6. Testing Strategy</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Test Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Tool</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Scope</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Target Coverage</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Unit Tests</td><td style="border:1px solid #30363d;padding:10px;">Jest (Node), pytest (Python)</td><td style="border:1px solid #30363d;padding:10px;">Controllers, BKT model, recommendation engine</td><td style="border:1px solid #30363d;padding:10px;">&gt; 80%</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Integration Tests</td><td style="border:1px solid #30363d;padding:10px;">Supertest</td><td style="border:1px solid #30363d;padding:10px;">API endpoints with test MongoDB</td><td style="border:1px solid #30363d;padding:10px;">&gt; 70%</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">E2E Tests</td><td style="border:1px solid #30363d;padding:10px;">Playwright</td><td style="border:1px solid #30363d;padding:10px;">Critical user flows (login, assessment, tutor)</td><td style="border:1px solid #30363d;padding:10px;">Key flows</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Load Tests</td><td style="border:1px solid #30363d;padding:10px;">k6</td><td style="border:1px solid #30363d;padding:10px;">API endpoints under 1000 concurrent users</td><td style="border:1px solid #30363d;padding:10px;">p95 &lt; 300ms</td></tr>
</table>
</body>
