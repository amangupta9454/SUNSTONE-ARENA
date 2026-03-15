<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">📡 API Documentation</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026 | Base URL: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">https://api.edupath.ai</code></p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Authentication</h2>
<p>All protected endpoints require a JWT token in the Authorization header:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">Authorization: Bearer &lt;your_jwt_token&gt;</pre>
<p>Tokens are issued on login/register and expire after <b>7 days</b>. A 401 response means the token is missing or expired. A 403 response means the role is insufficient.</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">🔐 Auth Endpoints</h2>

<h3 style="color:#d2a8ff;">POST /api/auth/register</h3>
<p>Register a new student or teacher account.</p>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Method</td><td style="border:1px solid #30363d;padding:10px;">POST</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">Public</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Status Codes</td><td style="border:1px solid #30363d;padding:10px;">201 Created | 400 Validation Error | 409 Email already exists</td></tr>
</table>
<p><b>Request Body:</b></p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass123!",
  "role": "student"
}</pre>
<p><b>Response 201:</b></p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "student",
    "xp": 0,
    "level": 1
  }
}</pre>

<h3 style="color:#d2a8ff;">POST /api/auth/login</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Method</td><td style="border:1px solid #30363d;padding:10px;">POST</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">Public</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Status Codes</td><td style="border:1px solid #30363d;padding:10px;">200 OK | 401 Invalid credentials | 404 User not found</td></tr>
</table>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "email": "jane@example.com", "password": "SecurePass123!" }

// Response 200
{ "token": "eyJ...", "user": { "id": "...", "name": "Jane Smith", "role": "student" } }</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">👤 Student Endpoints</h2>

<h3 style="color:#d2a8ff;">GET /api/student/profile</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">Required (any role)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Status Codes</td><td style="border:1px solid #30363d;padding:10px;">200 OK | 401 Unauthorized | 404 Not Found</td></tr>
</table>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "role": "student",
  "careerGoal": "Data Scientist",
  "xp": 1250,
  "level": 5,
  "streak": 12,
  "createdAt": "2026-01-15T10:30:00.000Z"
}</pre>

<h3 style="color:#d2a8ff;">PUT /api/student/profile</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request body (all fields optional)
{ "name": "Jane M. Smith", "careerGoal": "ML Engineer" }

// Response 200
{ "message": "Profile updated", "user": { ... } }</pre>

<h3 style="color:#d2a8ff;">GET /api/student/all</h3>
<p>Teacher-only endpoint to list all students in the system.</p>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">Required — role: teacher</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Status Codes</td><td style="border:1px solid #30363d;padding:10px;">200 OK | 403 Forbidden</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">🧪 Assessment Endpoints</h2>

<h3 style="color:#d2a8ff;">GET /api/assessment/questions</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">Required</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Query Params</td><td style="border:1px solid #30363d;padding:10px;">?skillId=algebra&limit=10</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Status Codes</td><td style="border:1px solid #30363d;padding:10px;">200 OK | 404 No questions found</td></tr>
</table>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "questions": [
    {
      "_id": "64f...",
      "skillId": "algebra",
      "question": "Solve for x: 2x + 5 = 13",
      "options": ["x=3", "x=4", "x=5", "x=6"],
      "difficulty": 2
    }
  ]
}</pre>

<h3 style="color:#d2a8ff;">POST /api/assessment/submit</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{
  "answers": [
    { "questionId": "64f...", "skillId": "algebra", "selectedAnswer": "x=4", "correct": true },
    { "questionId": "64f...", "skillId": "calculus", "selectedAnswer": "wrong", "correct": false }
  ]
}

// Response 200
{
  "score": 1,
  "total": 2,
  "xpEarned": 50,
  "updatedMastery": { "algebra": 0.82, "calculus": 0.31 },
  "mistakes": [{ "skillId": "calculus", "question": "...", "correctAnswer": "..." }]
}</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">🔁 SRS Endpoints</h2>

<h3 style="color:#d2a8ff;">GET /api/srs/due</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "cards": [
    {
      "_id": "64f...",
      "skillId": "algebra",
      "front": "What is the quadratic formula?",
      "back": "x = (-b ± √(b²-4ac)) / 2a",
      "interval": 3,
      "nextReview": "2026-03-15T00:00:00.000Z"
    }
  ],
  "count": 7
}</pre>

<h3 style="color:#d2a8ff;">POST /api/srs/review</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "cardId": "64f...", "rating": 4 }

// Response 200
{ "nextReview": "2026-03-18T00:00:00.000Z", "interval": 3, "easiness": 2.6 }</pre>

<h3 style="color:#d2a8ff;">POST /api/srs/create</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "skillId": "algebra", "front": "Define a polynomial", "back": "An expression with variables and coefficients..." }

// Response 201
{ "card": { "_id": "64f...", "skillId": "algebra", "front": "...", "nextReview": "2026-03-15" } }</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">⭐ XP & Gamification Endpoints</h2>

<h3 style="color:#d2a8ff;">POST /api/xp/award</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "amount": 100, "reason": "Completed study session" }

// Response 200
{ "newXP": 1350, "newLevel": 5, "leveledUp": false }</pre>

<h3 style="color:#d2a8ff;">GET /api/xp/level</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{ "xp": 1350, "level": 5, "xpToNextLevel": 650, "progressPercent": 67.5 }</pre>

<h3 style="color:#d2a8ff;">GET /api/leaderboard</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "leaderboard": [
    { "rank": 1, "name": "Alex Chen", "xp": 4200, "level": 12 },
    { "rank": 2, "name": "Jane Smith", "xp": 1350, "level": 5 }
  ],
  "myRank": 2
}</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">📅 Exam Endpoints</h2>

<h3 style="color:#d2a8ff;">POST /api/exam/start</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "skillIds": ["algebra", "calculus"], "questionCount": 20, "timeLimitMinutes": 30 }

// Response 201
{
  "sessionId": "64f...",
  "questions": [ { "_id": "...", "question": "...", "options": [...] } ],
  "startedAt": "2026-03-15T10:00:00.000Z",
  "expiresAt": "2026-03-15T10:30:00.000Z"
}</pre>

<h3 style="color:#d2a8ff;">POST /api/exam/submit</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "sessionId": "64f...", "answers": [{ "questionId": "...", "answer": "x=4" }] }

// Response 200
{ "score": 17, "total": 20, "percentage": 85, "timeTaken": 1420, "xpEarned": 170 }</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">🤖 AI Tutor Endpoints</h2>

<h3 style="color:#d2a8ff;">POST /api/tutor/query</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Value</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Response Type</td><td style="border:1px solid #30363d;padding:10px;">text/event-stream (SSE)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Auth</td><td style="border:1px solid #30363d;padding:10px;">Required</td></tr>
</table>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Request
{ "question": "Explain gradient descent intuitively" }

// SSE Response stream
data: {"chunk": "Gradient descent is"}
data: {"chunk": " an optimization algorithm"}
data: {"chunk": " that minimizes a function..."}
data: [DONE]</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">📋 Learning Plan Endpoints</h2>

<h3 style="color:#d2a8ff;">POST /api/plan/generate</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "plan": {
    "totalWeeks": 8,
    "weeks": [
      {
        "week": 1,
        "skills": ["algebra", "trigonometry"],
        "strategies": ["Watch video lectures", "Complete 20 practice problems"],
        "estimatedHours": 6
      }
    ]
  }
}</pre>

<h3 style="color:#d2a8ff;">GET /api/plan</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200 — returns most recent saved plan
{ "plan": { "totalWeeks": 8, "weeks": [...], "generatedAt": "2026-03-01T..." } }</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">🧠 Intelligence Endpoints (AI Service Proxy)</h2>

<h3 style="color:#d2a8ff;">POST /api/intelligence/student-risk</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "riskLevel": "medium",
  "riskScore": 0.62,
  "factors": ["Accuracy declining over last 5 sessions", "3 days since last study"],
  "recommendation": "Schedule a review session for calculus"
}</pre>

<h3 style="color:#d2a8ff;">POST /api/intelligence/burnout-detection</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "burnoutDetected": true,
  "score": 0.78,
  "signals": ["Session length > 3 hours", "Accuracy dropped 40% in last hour"],
  "suggestion": "Take a 30-minute break"
}</pre>

<h3 style="color:#d2a8ff;">POST /api/intelligence/learning-style</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{ "style": "Visual", "confidence": 0.74, "description": "Prefers diagrams, charts, and visual representations" }</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">📊 Analytics Endpoints</h2>

<h3 style="color:#d2a8ff;">GET /api/analytics/mastery</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "masteryMap": {
    "algebra": 0.82,
    "calculus": 0.31,
    "statistics": 0.67
  },
  "averageMastery": 0.60,
  "strongSkills": ["algebra"],
  "weakSkills": ["calculus"]
}</pre>

<h3 style="color:#d2a8ff;">GET /api/analytics/weak-spots</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Response 200
{
  "weakSpots": [
    { "skillId": "calculus", "mastery": 0.31, "mistakeCount": 12, "priority": "high" },
    { "skillId": "linear_algebra", "mastery": 0.44, "mistakeCount": 7, "priority": "medium" }
  ]
}</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Standard Error Responses</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Status</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Meaning</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Example Body</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">400</td><td style="border:1px solid #30363d;padding:10px;">Bad Request — validation failed</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">{ "message": "email is required" }</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">401</td><td style="border:1px solid #30363d;padding:10px;">Unauthorized — missing or invalid JWT</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">{ "message": "No token provided" }</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">403</td><td style="border:1px solid #30363d;padding:10px;">Forbidden — insufficient role</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">{ "message": "Access denied: teacher role required" }</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">404</td><td style="border:1px solid #30363d;padding:10px;">Not Found</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">{ "message": "Student not found" }</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">409</td><td style="border:1px solid #30363d;padding:10px;">Conflict — duplicate resource</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">{ "message": "Email already registered" }</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">500</td><td style="border:1px solid #30363d;padding:10px;">Internal Server Error</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">{ "message": "Internal server error" }</code></td></tr>
</table>

</body>
