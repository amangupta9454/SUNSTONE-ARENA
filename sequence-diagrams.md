<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">📊 Sequence Diagrams</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. User Registration</h2>
<p>Complete sequence from form submission through account creation, JWT issuance, and initial data seeding.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 300" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s1a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s1g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 1 — User Registration</text>
  <!-- Participants -->
  <rect x="30" y="36" width="80" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="70" y="55" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Student</text>
  <rect x="200" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="250" y="55" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">React Frontend</text>
  <rect x="400" y="36" width="120" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="460" y="55" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Node.js :5000</text>
  <rect x="620" y="36" width="120" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="680" y="55" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">MongoDB Atlas</text>
  <!-- Lifelines -->
  <line x1="70" y1="64" x2="70" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="250" y1="64" x2="250" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="460" y1="64" x2="460" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="680" y1="64" x2="680" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Messages -->
  <line x1="70" y1="85" x2="240" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s1a)"/>
  <text x="155" y="80" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Fill registration form</text>
  <line x1="250" y1="105" x2="450" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s1a)"/>
  <text x="350" y="100" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">POST /api/auth/register</text>
  <line x1="460" y1="125" x2="670" y2="125" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s1a)"/>
  <text x="565" y="120" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">findOne({ email }) — check duplicate</text>
  <line x1="670" y1="145" x2="470" y2="145" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s1a)"/>
  <text x="565" y="140" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">null (no duplicate)</text>
  <rect x="420" y="155" width="80" height="18" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="460" y="168" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">bcrypt.hash(pw, 10)</text>
  <line x1="460" y1="175" x2="670" y2="175" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s1a)"/>
  <text x="565" y="170" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Student.create({ name, email, hash, role })</text>
  <line x1="670" y1="195" x2="470" y2="195" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s1a)"/>
  <text x="565" y="190" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Saved document with _id</text>
  <rect x="420" y="205" width="80" height="18" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="460" y="218" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">jwt.sign({ id, role }, 7d)</text>
  <line x1="450" y1="225" x2="260" y2="225" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s1g)"/>
  <text x="350" y="220" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">201 { token, user }</text>
  <rect x="210" y="235" width="80" height="18" rx="3" fill="#1f3a5f" stroke="#58a6ff" stroke-width="1"/>
  <text x="250" y="248" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">Store token → /dashboard</text>
  <line x1="240" y1="255" x2="80" y2="255" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s1g)"/>
  <text x="160" y="250" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Dashboard loads</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. User Login</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 260" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s2a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s2g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="s2r" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#f85149"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 2 — User Login</text>
  <rect x="30" y="36" width="80" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="70" y="55" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Student</text>
  <rect x="200" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="250" y="55" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">React Frontend</text>
  <rect x="400" y="36" width="120" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="460" y="55" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Node.js :5000</text>
  <rect x="620" y="36" width="120" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="680" y="55" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">MongoDB Atlas</text>
  <line x1="70" y1="64" x2="70" y2="250" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="250" y1="64" x2="250" y2="250" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="460" y1="64" x2="460" y2="250" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="680" y1="64" x2="680" y2="250" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="70" y1="85" x2="240" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s2a)"/>
  <text x="155" y="80" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Enter email + password</text>
  <line x1="250" y1="105" x2="450" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s2a)"/>
  <text x="350" y="100" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">POST /api/auth/login</text>
  <line x1="460" y1="125" x2="670" y2="125" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s2a)"/>
  <text x="565" y="120" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Student.findOne({ email })</text>
  <line x1="670" y1="145" x2="470" y2="145" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s2a)"/>
  <text x="565" y="140" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Student doc + passwordHash</text>
  <rect x="420" y="155" width="80" height="18" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="460" y="168" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">bcrypt.compare(pw, hash)</text>
  <!-- Pass path -->
  <line x1="450" y1="185" x2="260" y2="185" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s2g)"/>
  <text x="350" y="180" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">✅ 200 { token, user } → store + redirect</text>
  <!-- Fail path -->
  <line x1="450" y1="210" x2="260" y2="210" stroke="#f85149" stroke-width="1.5" marker-end="url(#s2r)"/>
  <text x="350" y="205" text-anchor="middle" fill="#f85149" font-size="9" font-family="monospace">❌ 401 Invalid credentials → error toast</text>
  <text x="460" y="200" fill="#8b949e" font-size="9" font-family="monospace">alt: wrong pw</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Assessment Submission & BKT Update</h2>
<p>The most complex flow — from quiz answer submission through BKT computation to mastery update and mistake logging.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 340" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s3a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s3g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="s3o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 3 — Assessment Submission &amp; BKT Update</text>
  <rect x="10" y="36" width="70" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="45" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Student</text>
  <rect x="100" y="36" width="90" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="145" y="55" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">React</text>
  <rect x="210" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="260" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Node.js :5000</text>
  <rect x="330" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="385" y="55" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Python :8000</text>
  <rect x="460" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="515" y="55" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">MongoDB Atlas</text>
  <line x1="45" y1="64" x2="45" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="145" y1="64" x2="145" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="260" y1="64" x2="260" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="385" y1="64" x2="385" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="515" y1="64" x2="515" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="45" y1="85" x2="135" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="90" y="80" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Submit answers</text>
  <line x1="145" y1="105" x2="250" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="197" y="100" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /assessment/submit + JWT</text>
  <rect x="220" y="113" width="80" height="16" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="260" y="125" text-anchor="middle" fill="#3fb950" font-size="8" font-family="monospace">authMiddleware verify</text>
  <line x1="260" y1="131" x2="375" y2="131" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="317" y="126" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /mastery/update</text>
  <line x1="385" y1="151" x2="505" y2="151" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="445" y="146" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Find StudentMastery</text>
  <line x1="505" y1="171" x2="395" y2="171" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s3o)"/>
  <text x="445" y="166" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Current mastery scores</text>
  <rect x="345" y="179" width="80" height="28" rx="3" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="385" y="191" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">BKT: P(learned|ev)</text>
  <text x="385" y="203" text-anchor="middle" fill="#8b949e" font-size="8" font-family="monospace">per answer loop</text>
  <line x1="385" y1="209" x2="505" y2="209" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="445" y="204" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Update mastery_score</text>
  <line x1="505" y1="229" x2="395" y2="229" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s3o)"/>
  <text x="445" y="224" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Write confirmed</text>
  <line x1="375" y1="249" x2="270" y2="249" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="322" y="244" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">{ updated_mastery }</text>
  <line x1="260" y1="269" x2="505" y2="269" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s3a)"/>
  <text x="382" y="264" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Log MistakeJournal + Award XP</text>
  <line x1="250" y1="289" x2="155" y2="289" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s3g)"/>
  <text x="202" y="284" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">200 { mastery, xpEarned, mistakes[] }</text>
  <line x1="135" y1="309" x2="55" y2="309" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s3g)"/>
  <text x="95" y="304" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Score + skill progress</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. AI Tutor Query (Streaming)</h2>
<p>The streaming SSE flow from student question through Gemini Pro to real-time text rendering.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 300" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s4a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s4g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="s4o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 4 — AI Tutor Query (Streaming SSE)</text>
  <rect x="10" y="36" width="70" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="45" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Student</text>
  <rect x="100" y="36" width="90" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="145" y="55" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">React</text>
  <rect x="210" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="260" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Node.js :5000</text>
  <rect x="330" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="385" y="55" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Python :8000</text>
  <rect x="460" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="515" y="55" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">Gemini Pro</text>
  <line x1="45" y1="64" x2="45" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="145" y1="64" x2="145" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="260" y1="64" x2="260" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="385" y1="64" x2="385" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="515" y1="64" x2="515" y2="290" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="45" y1="85" x2="135" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s4a)"/>
  <text x="90" y="80" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Type question</text>
  <line x1="145" y1="105" x2="250" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s4a)"/>
  <text x="197" y="100" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /api/tutor/query + JWT</text>
  <line x1="260" y1="125" x2="375" y2="125" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s4a)"/>
  <text x="317" y="120" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /tutor/query { mastery_context }</text>
  <rect x="345" y="133" width="80" height="16" rx="3" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="385" y="145" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">Build mastery-aware prompt</text>
  <line x1="385" y1="151" x2="505" y2="151" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s4a)"/>
  <text x="445" y="146" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">generateContentStream(prompt)</text>
  <!-- Streaming loop -->
  <rect x="10" y="160" width="560" height="60" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="20" y="175" fill="#8b949e" font-size="8" font-family="monospace">loop: streaming chunks</text>
  <line x1="505" y1="185" x2="395" y2="185" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s4o)"/>
  <text x="445" y="180" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">SSE chunk</text>
  <line x1="375" y1="195" x2="270" y2="195" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s4a)"/>
  <text x="322" y="190" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">SSE proxy</text>
  <line x1="250" y1="205" x2="155" y2="205" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s4g)"/>
  <text x="202" y="200" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">SSE → append text</text>
  <!-- Done -->
  <line x1="505" y1="235" x2="395" y2="235" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s4o)"/>
  <text x="445" y="230" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">[DONE] stream closed</text>
  <line x1="375" y1="255" x2="270" y2="255" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s4a)"/>
  <line x1="250" y1="275" x2="155" y2="275" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s4g)"/>
  <text x="202" y="270" text-anchor="middle" fill="#3fb950" font-size="8" font-family="monospace">Full response displayed</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">5. SRS Card Review</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 280" style="width:100%;max-width:820px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s5a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s5g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="s5o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
  </defs>
  <text x="410" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 5 — SRS Card Review</text>
  <rect x="30" y="36" width="80" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="70" y="55" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Student</text>
  <rect x="200" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="250" y="55" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">React Frontend</text>
  <rect x="400" y="36" width="120" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="460" y="55" text-anchor="middle" fill="#3fb950" font-size="10" font-family="monospace">Node.js :5000</text>
  <rect x="620" y="36" width="120" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="680" y="55" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">MongoDB Atlas</text>
  <line x1="70" y1="64" x2="70" y2="270" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="250" y1="64" x2="250" y2="270" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="460" y1="64" x2="460" y2="270" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="680" y1="64" x2="680" y2="270" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="70" y1="85" x2="240" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="155" y="80" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Open SRS Review</text>
  <line x1="250" y1="105" x2="450" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="350" y="100" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">GET /api/srs/due + JWT</text>
  <line x1="460" y1="125" x2="670" y2="125" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="565" y="120" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">SRSCard.find({ nextReview &lt;= today })</text>
  <line x1="670" y1="145" x2="470" y2="145" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s5o)"/>
  <text x="565" y="140" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Due cards array</text>
  <line x1="450" y1="165" x2="260" y2="165" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s5g)"/>
  <text x="350" y="160" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">200 { cards[] }</text>
  <line x1="240" y1="185" x2="80" y2="185" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="160" y="180" text-anchor="middle" fill="#c9d1d9" font-size="9" font-family="monospace">Show card front</text>
  <!-- Loop -->
  <rect x="10" y="193" width="760" height="50" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="20" y="207" fill="#8b949e" font-size="8" font-family="monospace">loop: for each due card</text>
  <line x1="70" y1="215" x2="240" y2="215" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="155" y="210" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Flip + rate recall (0–5)</text>
  <line x1="250" y1="225" x2="450" y2="225" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="350" y="220" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /api/srs/review { cardId, rating }</text>
  <line x1="460" y1="235" x2="670" y2="235" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s5a)"/>
  <text x="565" y="230" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">SM-2: update interval + nextReview</text>
  <line x1="450" y1="255" x2="260" y2="255" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s5g)"/>
  <text x="350" y="250" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">200 { nextReview } → next card</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">6. Knowledge Graph Fetch</h2>
<p>How the interactive skill graph is built — from JWT auth through NetworkX DAG traversal to React Flow rendering.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 340" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s6a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s6g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="s6o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
    <marker id="s6p" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d2a8ff"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 6 — Knowledge Graph Fetch</text>
  <!-- Participants -->
  <rect x="10" y="36" width="70" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="45" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Student</text>
  <rect x="100" y="36" width="90" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="145" y="55" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">React</text>
  <rect x="210" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="260" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Node.js :5000</text>
  <rect x="330" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="385" y="55" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Python :8000</text>
  <rect x="460" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="515" y="55" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">MongoDB Atlas</text>
  <!-- Lifelines -->
  <line x1="45" y1="64" x2="45" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="145" y1="64" x2="145" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="260" y1="64" x2="260" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="385" y1="64" x2="385" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="515" y1="64" x2="515" y2="330" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Messages -->
  <line x1="45" y1="85" x2="135" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s6a)"/>
  <text x="90" y="80" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Navigate to Knowledge Graph</text>
  <line x1="145" y1="105" x2="250" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s6a)"/>
  <text x="197" y="100" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">GET /api/intelligence/knowledge-graph + JWT</text>
  <rect x="220" y="113" width="80" height="16" rx="3" fill="#1a2a1a" stroke="#3fb950" stroke-width="1"/>
  <text x="260" y="125" text-anchor="middle" fill="#3fb950" font-size="8" font-family="monospace">authMiddleware → studentId</text>
  <line x1="260" y1="131" x2="375" y2="131" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s6a)"/>
  <text x="317" y="126" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">GET /knowledge-graph/{student_id}</text>
  <rect x="345" y="139" width="80" height="16" rx="3" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="385" y="151" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">Load cached NetworkX DAG</text>
  <line x1="385" y1="157" x2="505" y2="157" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s6a)"/>
  <text x="445" y="152" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">StudentMastery.find({ studentId })</text>
  <line x1="505" y1="177" x2="395" y2="177" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s6o)"/>
  <text x="445" y="172" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">All mastery scores for student</text>
  <!-- Loop box -->
  <rect x="330" y="185" width="200" height="70" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="340" y="198" fill="#8b949e" font-size="8" font-family="monospace">loop: for each skill node</text>
  <rect x="345" y="203" width="170" height="16" rx="3" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="430" y="215" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">status: locked/unlocked/in-progress/mastered</text>
  <rect x="345" y="223" width="170" height="16" rx="3" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="430" y="235" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">color: grey / blue / yellow / green</text>
  <rect x="345" y="243" width="170" height="8" rx="2" fill="#161b22"/>
  <!-- Convert + return -->
  <rect x="345" y="259" width="80" height="16" rx="3" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="385" y="271" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">Convert to React Flow format</text>
  <line x1="375" y1="279" x2="270" y2="279" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s6p)"/>
  <text x="322" y="274" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">{ nodes: [...], edges: [...] }</text>
  <line x1="250" y1="299" x2="155" y2="299" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s6g)"/>
  <text x="202" y="294" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">200 { nodes, edges }</text>
  <line x1="135" y1="319" x2="55" y2="319" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s6g)"/>
  <text x="95" y="314" text-anchor="middle" fill="#3fb950" font-size="8" font-family="monospace">Interactive graph with animated edges</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">7. Learning Plan Generation</h2>
<p>The full ML pipeline — from mastery fetch through topological sort, gap analysis, and weekly scheduling to plan persistence.</p>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 400" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="s7a" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="s7g" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="s7o" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
    <marker id="s7p" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d2a8ff"/>
    </marker>
  </defs>
  <text x="430" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Sequence 7 — Learning Plan Generation</text>
  <!-- Participants -->
  <rect x="10" y="36" width="70" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="45" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Student</text>
  <rect x="100" y="36" width="90" height="28" rx="4" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="145" y="55" text-anchor="middle" fill="#58a6ff" font-size="9" font-family="monospace">React</text>
  <rect x="210" y="36" width="100" height="28" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="260" y="55" text-anchor="middle" fill="#3fb950" font-size="9" font-family="monospace">Node.js :5000</text>
  <rect x="330" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="385" y="55" text-anchor="middle" fill="#d2a8ff" font-size="9" font-family="monospace">Python :8000</text>
  <rect x="460" y="36" width="110" height="28" rx="4" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="515" y="55" text-anchor="middle" fill="#ffa657" font-size="9" font-family="monospace">MongoDB Atlas</text>
  <!-- Lifelines -->
  <line x1="45" y1="64" x2="45" y2="390" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="145" y1="64" x2="145" y2="390" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="260" y1="64" x2="260" y2="390" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="385" y1="64" x2="385" y2="390" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <line x1="515" y1="64" x2="515" y2="390" stroke="#30363d" stroke-width="1" stroke-dasharray="4,4"/>
  <!-- Messages -->
  <line x1="45" y1="85" x2="135" y2="85" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="90" y="80" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Click "Generate Learning Plan"</text>
  <line x1="145" y1="105" x2="250" y2="105" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="197" y="100" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /api/plan/generate + JWT</text>
  <line x1="260" y1="125" x2="505" y2="125" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="382" y="120" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">StudentMastery.find({ studentId })</text>
  <line x1="505" y1="145" x2="270" y2="145" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s7o)"/>
  <text x="382" y="140" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Current mastery map</text>
  <line x1="260" y1="165" x2="505" y2="165" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="382" y="160" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Student.findById → careerGoal</text>
  <line x1="505" y1="185" x2="270" y2="185" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s7o)"/>
  <text x="382" y="180" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">Student profile</text>
  <line x1="260" y1="205" x2="375" y2="205" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="317" y="200" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">POST /plan/generate { mastery_map, career_goal }</text>
  <line x1="385" y1="225" x2="505" y2="225" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="445" y="220" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">SkillNode.find() — full skill graph</text>
  <line x1="505" y1="245" x2="395" y2="245" stroke="#ffa657" stroke-width="1.5" marker-end="url(#s7o)"/>
  <text x="445" y="240" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">All skills + prerequisites</text>
  <!-- ML pipeline box -->
  <rect x="330" y="253" width="200" height="80" rx="4" fill="#0d1117" stroke="#30363d" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="340" y="266" fill="#8b949e" font-size="8" font-family="monospace">ML pipeline</text>
  <rect x="345" y="270" width="170" height="13" rx="2" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="430" y="280" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">Build NetworkX DAG</text>
  <rect x="345" y="287" width="170" height="13" rx="2" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="430" y="297" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">Topological sort (respect prerequisites)</text>
  <rect x="345" y="304" width="170" height="13" rx="2" fill="#2a1a3a" stroke="#d2a8ff" stroke-width="1"/>
  <text x="430" y="314" text-anchor="middle" fill="#d2a8ff" font-size="8" font-family="monospace">Gap analysis: (1 - mastery) × difficulty</text>
  <rect x="345" y="321" width="170" height="8" rx="2" fill="#161b22"/>
  <!-- Return plan -->
  <line x1="375" y1="337" x2="270" y2="337" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#s7p)"/>
  <text x="322" y="332" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">{ weeks: [...], totalWeeks, skills[] }</text>
  <line x1="260" y1="357" x2="505" y2="357" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s7a)"/>
  <text x="382" y="352" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">LearningPlan.findOneAndUpdate (upsert)</text>
  <line x1="250" y1="377" x2="155" y2="377" stroke="#3fb950" stroke-width="1.5" marker-end="url(#s7g)"/>
  <text x="202" y="372" text-anchor="middle" fill="#c9d1d9" font-size="8" font-family="monospace">200 { plan } → weekly view rendered</text>
</svg>

</body>
