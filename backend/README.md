<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1100px;margin:0 auto;">

<div style="text-align:center;padding:32px 0 20px;">
  <h1 style="font-size:2.6em;color:#3fb950;margin:0 0 8px;">🟢 EduPath AI — Backend</h1>
  <p style="color:#8b949e;font-size:1.1em;margin:0 0 16px;">Node.js + Express REST API · MongoDB Atlas · JWT Auth · AI Service Proxy</p>
  <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
    <span style="background:#238636;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Node.js 18+</span>
    <span style="background:#1f6feb;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Express 4</span>
    <span style="background:#b08800;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">MongoDB Atlas</span>
    <span style="background:#6e40c9;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">JWT Auth</span>
    <span style="background:#cf222e;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.8em;font-weight:600;">Port 5000</span>
  </div>
</div>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Request Flow SVG -->
<h2 style="color:#79c0ff;font-size:1.5em;">🔄 Request Flow</h2>

<img src="../assets/backend-README.svg" width="100%" alt="backend-README diagram">

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Controllers -->
<h2 style="color:#79c0ff;font-size:1.5em;">🎮 Controllers (20 files)</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Controller</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Route Prefix</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Responsibility</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">authController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/auth</td><td style="border:1px solid #30363d;padding:10px;">Register, login, JWT issuance, password hashing</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">studentController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/student</td><td style="border:1px solid #30363d;padding:10px;">Profile CRUD, mastery fetch, career goal update</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">assessmentController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/assessment</td><td style="border:1px solid #30363d;padding:10px;">Quiz submission, BKT proxy, mistake logging, SRS card creation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">intelligenceController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/intelligence</td><td style="border:1px solid #30363d;padding:10px;">Knowledge graph, cognitive load, burnout, risk score proxy</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">tutorController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/tutor</td><td style="border:1px solid #30363d;padding:10px;">Gemini streaming proxy, mastery context injection</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">planController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/plan</td><td style="border:1px solid #30363d;padding:10px;">Learning plan generation proxy, plan persistence</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">srsController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/srs</td><td style="border:1px solid #30363d;padding:10px;">Due card fetch, SM-2 review update, card creation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">xpController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/xp</td><td style="border:1px solid #30363d;padding:10px;">XP award, level-up detection, leaderboard update</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">leaderboardController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/leaderboard</td><td style="border:1px solid #30363d;padding:10px;">Global XP ranking, top-N fetch</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">studySessionController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/study-session</td><td style="border:1px solid #30363d;padding:10px;">Session start/end, duration tracking, streak update</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">mistakeController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/mistakes</td><td style="border:1px solid #30363d;padding:10px;">Mistake journal CRUD, weak spot aggregation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">examController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/exam</td><td style="border:1px solid #30363d;padding:10px;">Timed exam sessions, auto-submit, result storage</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">notificationController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/notifications</td><td style="border:1px solid #30363d;padding:10px;">In-app notifications, email alerts via Nodemailer</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">analyticsController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/analytics</td><td style="border:1px solid #30363d;padding:10px;">Class-wide mastery, performance trends (teacher only)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">assignmentController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/assignments</td><td style="border:1px solid #30363d;padding:10px;">Teacher topic assignment to students</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">todoController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/todo</td><td style="border:1px solid #30363d;padding:10px;">Daily challenge tasks CRUD</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">learningController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/learning</td><td style="border:1px solid #30363d;padding:10px;">Learning content fetch per skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">exportController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/export</td><td style="border:1px solid #30363d;padding:10px;">CSV/JSON data export for students</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">tutorFeedbackController.js</td><td style="border:1px solid #30363d;padding:10px;">/api/tutor-feedback</td><td style="border:1px solid #30363d;padding:10px;">Thumbs up/down feedback on AI tutor responses</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Models -->
<h2 style="color:#79c0ff;font-size:1.5em;">🗄️ MongoDB Models (17 collections)</h2>

<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Model</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Key Fields</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">Student</td><td style="border:1px solid #30363d;padding:10px;">name, email, passwordHash, role, xp, level, careerGoal, studyStreak</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#3fb950;">SkillNode</td><td style="border:1px solid #30363d;padding:10px;">skillId, name, subject, difficulty, prerequisites[], description</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">StudentMastery</td><td style="border:1px solid #30363d;padding:10px;">studentId, skillId, mastery_score, p_transit, p_slip, p_guess, updatedAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#d2a8ff;">AssessmentQuestion</td><td style="border:1px solid #30363d;padding:10px;">skillId, question, options[], correctAnswer, difficulty, explanation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">SRSCard</td><td style="border:1px solid #30363d;padding:10px;">studentId, front, back, interval, easeFactor, nextReview, repetitions</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">MistakeJournal</td><td style="border:1px solid #30363d;padding:10px;">studentId, skillId, question, studentAnswer, correctAnswer, resolved</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#ffa657;">LearningPlan</td><td style="border:1px solid #30363d;padding:10px;">studentId, weeks[], totalWeeks, mlConfidence, generatedAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">StudySession</td><td style="border:1px solid #30363d;padding:10px;">studentId, startTime, endTime, duration, focusScore, distractionCount</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">ExamSession</td><td style="border:1px solid #30363d;padding:10px;">studentId, questions[], answers[], score, timeTaken, completedAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#58a6ff;">Notification</td><td style="border:1px solid #30363d;padding:10px;">studentId, type, message, read, createdAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;color:#8b949e;">TodoTask, TopicAssignment, TutorFeedback, UserProgress, PerformanceLog, LearningContent, DistractionLog</td><td style="border:1px solid #30363d;padding:10px;">Supporting collections for gamification, teacher features, and analytics</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<!-- Setup -->
<h2 style="color:#79c0ff;font-size:1.5em;">⚙️ Setup</h2>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">npm install
# configure .env (see below)
npm run dev          # nodemon — auto-restart on save
node seed.js         # seed SkillNode collection (run once)</pre>

<h3 style="color:#d2a8ff;">.env</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/edupath
PORT=5000
JWT_SECRET=minimum_32_character_random_string
FRONTEND_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
EMAIL_USER=your@gmail.com
EMAIL_PASS=gmail_app_password
NODE_ENV=development</pre>

<h3 style="color:#d2a8ff;">Available Scripts</h3>
<table style="border-collapse:collapse;width:100%;margin:8px 0;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Script</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Command</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Development</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">npm run dev</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Production</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">npm start</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Seed database</td><td style="border:1px solid #30363d;padding:10px;font-family:monospace;">node seed.js</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">
<p style="color:#8b949e;text-align:center;font-size:0.9em;">EduPath AI Backend — Node.js + Express + MongoDB Atlas | Port 5000</p>

</body>
