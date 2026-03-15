<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:2px solid #21262d;padding-bottom:12px;">🎓 EduPath AI — Adaptive Learning Platform</h1>

<p>A full-stack AI-powered adaptive learning platform that personalises education for every student using <b>Bayesian Knowledge Tracing</b>, a <b>Knowledge Graph</b>, and a <b>Gemini-powered AI Tutor</b>. Built with <b>React + Vite</b> on the frontend, <b>Node.js + Express</b> as the main backend, and a <b>Python FastAPI</b> microservice for all AI/ML computation.</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">📑 Table of Contents</h2>
<ul>
<li>🔎 <a href="#what-is-edupath" style="color:#58a6ff;">What is EduPath AI</a></li>
<li>👩‍👧 <a href="#who-its-for" style="color:#58a6ff;">Who it's for</a></li>
<li>⚕️ <a href="#what-problems-it-solves" style="color:#58a6ff;">What problems it solves</a></li>
<li>✨ <a href="#features-by-module" style="color:#58a6ff;">Features by module</a></li>
<li>📂 <a href="#project-structure" style="color:#58a6ff;">Project structure</a></li>
<li>💻 <a href="#tech-stack" style="color:#58a6ff;">Tech stack</a></li>
<li>⚙️ <a href="#how-to-run" style="color:#58a6ff;">How to run the project locally</a></li>
<li>🔑 <a href="#env-vars" style="color:#58a6ff;">Environment variables</a></li>
<li>🌐 <a href="#api-routes" style="color:#58a6ff;">All API routes (summary)</a></li>
<li>👥 <a href="#user-roles" style="color:#58a6ff;">User roles and permissions</a></li>
<li>🧠 <a href="#how-features-work" style="color:#58a6ff;">How each major feature works</a></li>
<li>🚀 <a href="#deployment" style="color:#58a6ff;">Deployment</a></li>
<li>📦 <a href="#dependencies" style="color:#58a6ff;">Package dependencies</a></li>
<li>📜 <a href="#scripts" style="color:#58a6ff;">Available scripts</a></li>
<li>📬 <a href="#contact" style="color:#58a6ff;">Contact</a></li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="what-is-edupath" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🔎 What is EduPath AI</h2>
<p>EduPath AI is an intelligent, adaptive learning platform built for students who want a personalised study experience. Instead of a one-size-fits-all curriculum, EduPath uses real AI algorithms to figure out exactly what each student knows, what they should study next, and how they learn best.</p>

<p>The platform is split into three services that work together:</p>
<ul>
<li><b>Frontend (React)</b> — the student-facing dashboard, quizzes, tutor chat, knowledge graph visualisation, and teacher panel</li>
<li><b>Backend (Node.js)</b> — REST API for authentication, study sessions, SRS cards, XP, leaderboard, exams, and all data storage in MongoDB</li>
<li><b>AI Service (Python FastAPI)</b> — Bayesian Knowledge Tracing, personalised recommendations, learning plan generation, AI tutor (Gemini), and intelligence widgets</li>
</ul>

<p><b>A student can use EduPath AI to:</b></p>
<ul>
<li>📊 Take an adaptive assessment and get an instant mastery map across all skills</li>
<li>🎯 See exactly which topic to study next, ranked by AI recommendation score</li>
<li>🕸️ Visualise their knowledge as an interactive graph showing locked, unlocked, and mastered skills</li>
<li>🤖 Ask the AI Tutor any question and get a streaming, mastery-adapted answer</li>
<li>📋 Generate a full weekly learning plan with strategies, resources, and timelines</li>
<li>🔁 Review flashcards using Spaced Repetition (SRS) to retain what they've learned</li>
<li>🏆 Compete on a leaderboard and earn XP for every study activity</li>
<li>📝 Track mistakes in a journal and revisit weak areas</li>
<li>🧠 See AI intelligence widgets: cognitive load, optimal study time, burnout risk, distraction analysis</li>
</ul>

<p><b>A teacher can use EduPath AI to:</b></p>
<ul>
<li>📈 View class-wide mastery analytics and identify at-risk students</li>
<li>📌 Assign topics to specific students</li>
<li>📊 See the Class Insights Dashboard with performance trends</li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="who-its-for" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">👩‍👧 Who It's For</h2>

<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;">
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Role</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What they use EduPath AI for</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">🎓 Student</td><td style="border:1px solid #30363d;padding:10px;">Adaptive learning, AI tutor, SRS review, quizzes, exams, leaderboard, learning plan, mistake journal</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">👩‍🏫 Teacher</td><td style="border:1px solid #30363d;padding:10px;">Class analytics, student mastery overview, topic assignment, at-risk student identification</td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="what-problems-it-solves" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">⚕️ What Problems It Solves</h2>
<ol style="line-height:1.9;">
<li>📚 Students don't know what to study next → solved by the <b>AI Recommendation Engine</b> that scores every unlocked skill</li>
<li>🧠 No way to measure what a student actually knows → solved by <b>Bayesian Knowledge Tracing (BKT)</b> that updates mastery after every answer</li>
<li>🗺️ No visual map of learning progress → solved by the <b>interactive Knowledge Graph</b> showing locked/unlocked/mastered skills</li>
<li>🤖 No personalised tutoring at scale → solved by the <b>Gemini-powered AI Tutor</b> that adapts its language to the student's mastery level</li>
<li>📋 No structured study plan → solved by the <b>ML Plan Generator</b> using topological sort + weighted gap analysis</li>
<li>🔁 Students forget what they've learned → solved by the <b>Spaced Repetition System (SRS)</b> with SM-2 algorithm scheduling</li>
<li>😴 No awareness of cognitive overload → solved by <b>Intelligence Widgets</b> (burnout detection, cognitive load, optimal study time)</li>
<li>👩‍🏫 Teachers have no visibility into student struggles → solved by the <b>Teacher Dashboard and Class Insights</b></li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="features-by-module" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">✨ Features by Module</h2>

<h3 style="color:#d2a8ff;">🔐 Module 1 — Authentication</h3>
<ul>
<li>Register with role selection (Student or Teacher)</li>
<li>JWT-based sessions (7-day tokens stored in localStorage)</li>
<li>Password hashing with bcryptjs (10 salt rounds)</li>
<li>Role-based route protection on both frontend and backend</li>
</ul>

<h3 style="color:#d2a8ff;">📊 Module 2 — Dashboard</h3>
<ul>
<li>Hero greeting card with career goal display</li>
<li>3D tilt stat cards: Skills Tracked, Avg Mastery, Mastered count, SRS Due</li>
<li>AI-recommended next topic with match score and difficulty</li>
<li>Tabbed view: Skills mastery grid, Knowledge Graph, Intelligence widgets</li>
<li>Study Streak card, XP Progress bar, Weak Spot Radar chart</li>
<li>Motivation Banner, Burnout Alert, Skill Heatmap, Student Risk Card</li>
</ul>

<h3 style="color:#d2a8ff;">🧪 Module 3 — Assessment</h3>
<ul>
<li>Adaptive quiz that selects questions based on current mastery</li>
<li>Answers sent to AI Service → BKT updates mastery scores in real time</li>
<li>Results saved to MongoDB and reflected immediately on the dashboard</li>
</ul>

<h3 style="color:#d2a8ff;">🕸️ Module 4 — Knowledge Graph</h3>
<ul>
<li>Interactive React Flow graph of all skills and their prerequisites</li>
<li>Nodes coloured by status: locked (grey), unlocked (blue), in-progress (yellow), mastered (green)</li>
<li>Animated edges when a prerequisite is mastered</li>
<li>Built from MongoDB skill data using NetworkX on the AI service</li>
</ul>

<h3 style="color:#d2a8ff;">🤖 Module 5 — AI Tutor</h3>
<ul>
<li>Streaming chat interface powered by Google Gemini Pro</li>
<li>System prompt adapts to student mastery: beginner / intermediate / advanced language</li>
<li>Fallback response if Gemini API is unavailable</li>
<li>Every response ends with a follow-up question to check understanding</li>
</ul>

<h3 style="color:#d2a8ff;">📋 Module 6 — Learning Plan</h3>
<ul>
<li>ML-generated weekly plan using topological sort + weighted gap analysis</li>
<li>Classifies skills into strengths and weaknesses</li>
<li>Generates overcome strategies per skill (subject-specific)</li>
<li>Estimates completion weeks and ML confidence score</li>
<li>No LLM API calls — pure algorithmic computation</li>
</ul>

<h3 style="color:#d2a8ff;">🔁 Module 7 — Spaced Repetition (SRS)</h3>
<ul>
<li>SM-2 algorithm schedules card reviews at optimal intervals</li>
<li>Cards created from assessment mistakes and manual additions</li>
<li>Due count shown on dashboard and navbar</li>
<li>Review session with pass/fail grading that updates next review date</li>
</ul>

<h3 style="color:#d2a8ff;">🏆 Module 8 — Gamification</h3>
<ul>
<li>XP awarded for completing quizzes, study sessions, SRS reviews, and exams</li>
<li>Level system with milestone progress bar</li>
<li>Global leaderboard ranked by XP</li>
<li>Study streak tracker with 7-day activity grid</li>
<li>Daily challenges and todo tasks</li>
</ul>

<h3 style="color:#d2a8ff;">📝 Module 9 — Mistake Journal</h3>
<ul>
<li>Every wrong answer is automatically logged with the question, correct answer, and skill</li>
<li>Students can review, filter, and mark mistakes as resolved</li>
<li>Weak spot radar chart built from mistake data</li>
</ul>

<h3 style="color:#d2a8ff;">📅 Module 10 — Exam</h3>
<ul>
<li>Timed exam sessions with configurable duration and question count</li>
<li>Countdown timer with auto-submit on expiry</li>
<li>Results saved as ExamSession with score, time taken, and per-question breakdown</li>
</ul>

<h3 style="color:#d2a8ff;">🧠 Module 11 — Intelligence Widgets</h3>
<ul>
<li><b>Cognitive Load</b> — estimates mental load from session length and error rate</li>
<li><b>Optimal Study Time</b> — recommends best hours based on historical accuracy patterns</li>
<li><b>Prerequisite Gap</b> — identifies missing foundational skills</li>
<li><b>Smart Break</b> — suggests break timing based on focus score trends</li>
<li><b>Question Difficulty Calibration</b> — adjusts difficulty to keep student in the flow zone</li>
<li><b>Distraction Analyzer</b> — detects off-task behaviour from response time spikes</li>
<li><b>Burnout Detection</b> — flags risk from session length, accuracy decline, and focus drop</li>
<li><b>Student Risk Card</b> — overall at-risk score combining all signals</li>
</ul>

<h3 style="color:#d2a8ff;">👩‍🏫 Module 12 — Teacher Panel</h3>
<ul>
<li>Teacher Dashboard with class-wide mastery overview</li>
<li>Class Insights Dashboard with performance trends and at-risk student list</li>
<li>Assign topics to individual students</li>
<li>View per-student mastery breakdown</li>
</ul>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="project-structure" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">📂 Project Structure</h2>

<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;overflow-x:auto;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">
edupath-ai/
│
├── README.md                        ← This file (root overview)
│
├── backend/                         ← Node.js + Express REST API
│   ├── server.js                    ← App entry point, all routes registered
│   ├── package.json
│   ├── .env                         ← MongoDB URI, JWT secret, email config
│   ├── seed.js                      ← Seeds skill nodes into MongoDB
│   │
│   ├── controllers/                 ← Business logic (one file per feature)
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── assessmentController.js
│   │   ├── learningController.js
│   │   ├── analyticsController.js
│   │   ├── tutorController.js
│   │   ├── planController.js
│   │   ├── todoController.js
│   │   ├── srsController.js
│   │   ├── notificationController.js
│   │   ├── leaderboardController.js
│   │   ├── assignmentController.js
│   │   ├── studySessionController.js
│   │   ├── xpController.js
│   │   ├── mistakeController.js
│   │   ├── examController.js
│   │   ├── exportController.js
│   │   ├── intelligenceController.js
│   │   └── tutorFeedbackController.js
│   │
│   ├── models/                      ← Mongoose schemas
│   │   ├── Student.js
│   │   ├── SkillNode.js
│   │   ├── StudentMastery.js
│   │   ├── LearningPlan.js
│   │   ├── LearningContent.js
│   │   ├── AssessmentQuestion.js
│   │   ├── StudySession.js
│   │   ├── SRSCard.js
│   │   ├── MistakeJournal.js
│   │   ├── ExamSession.js
│   │   ├── TodoTask.js
│   │   ├── TopicAssignment.js
│   │   ├── TutorFeedback.js
│   │   ├── UserProgress.js
│   │   ├── PerformanceLog.js
│   │   ├── Notification.js
│   │   └── DistractionLog.js
│   │
│   ├── routes/                      ← Express routers (one per feature)
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── learningRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── tutorRoutes.js
│   │   ├── planRoutes.js
│   │   ├── todoRoutes.js
│   │   ├── srsRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   ├── assignmentRoutes.js
│   │   ├── studySessionRoutes.js
│   │   ├── xpRoutes.js
│   │   ├── mistakeRoutes.js
│   │   ├── examRoutes.js
│   │   └── intelligenceRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        ← Verifies JWT token on protected routes
│   │   └── roleMiddleware.js        ← Checks user role (student / teacher)
│   │
│   ├── services/
│   │   ├── aiService.js             ← HTTP client that calls the Python AI service
│   │   ├── curriculumEngine.js      ← Generates learning content per skill
│   │   └── supabaseClient.js
│   │
│   └── utils/
│       └── sendEmail.js             ← Nodemailer email helper
│
├── ai-service/                      ← Python FastAPI AI microservice
│   ├── main.py                      ← FastAPI app entry point
│   ├── requirements.txt
│   ├── .env                         ← MongoDB URI, Gemini API key
│   │
│   ├── routers/                     ← FastAPI route handlers
│   │   ├── knowledge_tracing.py     ← POST /mastery/update (BKT)
│   │   ├── recommendation.py        ← POST /recommend, GET /knowledge-graph
│   │   ├── tutor.py                 ← POST /tutor/query (streaming Gemini)
│   │   ├── plan.py                  ← POST /plan/generate
│   │   └── intelligence.py          ← POST /intelligence/* (risk, burnout, style)
│   │
│   ├── core/                        ← Core ML algorithms
│   │   ├── bkt_model.py             ← Bayesian Knowledge Tracing
│   │   ├── knowledge_graph.py       ← NetworkX skill graph
│   │   ├── recommendation_engine.py ← Weighted scoring + career alignment
│   │   └── plan_generator.py        ← Topological sort + weekly scheduling
│   │
│   ├── services/                    ← Supporting ML services
│   │   ├── predictive_model.py      ← Student risk score computation
│   │   ├── question_generator.py    ← Rule-based question generation
│   │   └── learning_style_model.py  ← VARK-style learning style detection
│   │
│   └── models/
│       └── schemas.py               ← Pydantic request/response schemas
│
└── frontend/                        ← React + Vite SPA
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env
    │
    └── src/
        ├── App.jsx                  ← All routes defined here
        ├── main.jsx
        ├── index.css                ← Global styles, card/button/badge classes
        │
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Assessment.jsx
        │   ├── Quiz.jsx
        │   ├── Learning.jsx
        │   ├── Tutor.jsx
        │   ├── LearningPlan.jsx
        │   ├── SRSReview.jsx
        │   ├── MistakeJournal.jsx
        │   ├── Exam.jsx
        │   ├── Challenges.jsx
        │   ├── Leaderboard.jsx
        │   ├── DynamicPractice.jsx
        │   ├── AdaptivePathV2.jsx
        │   ├── TeacherDashboard.jsx
        │   ├── ClassInsightsDashboard.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── marketing/
        │       ├── Home.jsx
        │       ├── Features.jsx
        │       ├── About.jsx
        │       └── Contact.jsx
        │
        ├── components/
        │   ├── Layout/
        │   │   ├── Layout.jsx
        │   │   ├── Navbar.jsx
        │   │   └── Sidebar.jsx
        │   ├── KnowledgeGraph/
        │   │   └── GraphView.jsx
        │   ├── intelligence/
        │   │   ├── CognitiveLoadWidget.jsx
        │   │   ├── OptimalStudyTimeWidget.jsx
        │   │   ├── PrereqGapWidget.jsx
        │   │   ├── SmartBreakWidget.jsx
        │   │   ├── QuestionDifficultyWidget.jsx
        │   │   └── DistractionAnalyzerWidget.jsx
        │   ├── ai/
        │   │   ├── MotivationBanner.jsx
        │   │   ├── BurnoutAlert.jsx
        │   │   ├── SkillHeatmap.jsx
        │   │   ├── StudentRiskCard.jsx
        │   │   └── AutoTutorPopup.jsx
        │   ├── Challenges/
        │   │   ├── TaskCard.jsx
        │   │   └── AddTaskModal.jsx
        │   ├── Teacher/
        │   │   └── AssignTopicModal.jsx
        │   ├── marketing/
        │   │   ├── Navbar.jsx
        │   │   └── Footer.jsx
        │   ├── StudyStreakCard.jsx
        │   ├── XPProgressBar.jsx
        │   ├── WeakSpotRadar.jsx
        │   ├── MistakeCard.jsx
        │   ├── ExamCountdown.jsx
        │   └── StudySessionSummary.jsx
        │
        ├── services/
        │   ├── api.js               ← All axios API calls
        │   └── auth.js              ← JWT helpers (getUser, isAuthenticated)
        │
        └── store/
            └── useStore.js          ← Zustand global state
</pre>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="tech-stack" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">💻 Tech Stack</h2>

<h3 style="color:#d2a8ff;">⚙️ Backend (Node.js)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;">
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Technology</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Why we use it</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">🟢 Node.js</td><td style="border:1px solid #30363d;padding:10px;">18+</td><td style="border:1px solid #30363d;padding:10px;">JavaScript runtime for the server</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🚏 Express</td><td style="border:1px solid #30363d;padding:10px;">^4.18.2</td><td style="border:1px solid #30363d;padding:10px;">HTTP server and routing framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🍃 MongoDB Atlas</td><td style="border:1px solid #30363d;padding:10px;">Cloud</td><td style="border:1px solid #30363d;padding:10px;">NoSQL database for all application data</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">📦 Mongoose</td><td style="border:1px solid #30363d;padding:10px;">^8.0.3</td><td style="border:1px solid #30363d;padding:10px;">Schema definitions and database queries</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🔑 jsonwebtoken</td><td style="border:1px solid #30363d;padding:10px;">^9.0.2</td><td style="border:1px solid #30363d;padding:10px;">Generates and verifies JWT auth tokens</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🔒 bcryptjs</td><td style="border:1px solid #30363d;padding:10px;">^2.4.3</td><td style="border:1px solid #30363d;padding:10px;">Hashing user passwords before storing</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">📧 nodemailer</td><td style="border:1px solid #30363d;padding:10px;">^6.10.1</td><td style="border:1px solid #30363d;padding:10px;">Sends notification and alert emails</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🌐 axios</td><td style="border:1px solid #30363d;padding:10px;">^1.6.2</td><td style="border:1px solid #30363d;padding:10px;">HTTP client to call the Python AI service</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🔗 cors</td><td style="border:1px solid #30363d;padding:10px;">^2.8.5</td><td style="border:1px solid #30363d;padding:10px;">Allows only the frontend URL to call the API</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">📋 morgan</td><td style="border:1px solid #30363d;padding:10px;">^1.10.0</td><td style="border:1px solid #30363d;padding:10px;">HTTP request logger for development</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">⚙️ dotenv</td><td style="border:1px solid #30363d;padding:10px;">^16.3.1</td><td style="border:1px solid #30363d;padding:10px;">Loads .env variables into process.env</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🔄 nodemon (dev)</td><td style="border:1px solid #30363d;padding:10px;">^3.0.2</td><td style="border:1px solid #30363d;padding:10px;">Auto-restarts server on file save</td></tr>
</tbody>
</table>

<br>

<h3 style="color:#d2a8ff;">🐍 AI Service (Python)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;">
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Technology</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Why we use it</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">🐍 Python</td><td style="border:1px solid #30363d;padding:10px;">3.10+</td><td style="border:1px solid #30363d;padding:10px;">Language for all ML/AI computation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">⚡ FastAPI</td><td style="border:1px solid #30363d;padding:10px;">>=0.110.0</td><td style="border:1px solid #30363d;padding:10px;">High-performance async REST API framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🦄 Uvicorn</td><td style="border:1px solid #30363d;padding:10px;">>=0.27.0</td><td style="border:1px solid #30363d;padding:10px;">ASGI server to run FastAPI (like nodemon)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🕸️ NetworkX</td><td style="border:1px solid #30363d;padding:10px;">>=3.2.1</td><td style="border:1px solid #30363d;padding:10px;">Directed graph for skill prerequisites</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🤖 google-generativeai</td><td style="border:1px solid #30363d;padding:10px;">>=0.5.0</td><td style="border:1px solid #30363d;padding:10px;">Gemini Pro API for the AI Tutor</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">✅ Pydantic</td><td style="border:1px solid #30363d;padding:10px;">>=2.7.0</td><td style="border:1px solid #30363d;padding:10px;">Request/response schema validation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🔢 NumPy</td><td style="border:1px solid #30363d;padding:10px;">>=1.26.4</td><td style="border:1px solid #30363d;padding:10px;">Numerical computation for ML algorithms</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🍃 PyMongo</td><td style="border:1px solid #30363d;padding:10px;">>=4.7.0</td><td style="border:1px solid #30363d;padding:10px;">MongoDB driver for Python</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🌐 httpx</td><td style="border:1px solid #30363d;padding:10px;">>=0.27.0</td><td style="border:1px solid #30363d;padding:10px;">Async HTTP client</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">⚙️ python-dotenv</td><td style="border:1px solid #30363d;padding:10px;">>=1.0.0</td><td style="border:1px solid #30363d;padding:10px;">Loads .env variables in Python</td></tr>
</tbody>
</table>

<br>

<h3 style="color:#d2a8ff;">🎨 Frontend (React)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;">
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Technology</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Why we use it</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">⚛️ React</td><td style="border:1px solid #30363d;padding:10px;">^18.2.0</td><td style="border:1px solid #30363d;padding:10px;">Component-based UI framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">⚡ Vite</td><td style="border:1px solid #30363d;padding:10px;">^5.1.0</td><td style="border:1px solid #30363d;padding:10px;">Build tool with instant hot reload</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🧭 react-router-dom</td><td style="border:1px solid #30363d;padding:10px;">^6.22.0</td><td style="border:1px solid #30363d;padding:10px;">Client-side routing and navigation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🎨 Tailwind CSS</td><td style="border:1px solid #30363d;padding:10px;">^3.4.1</td><td style="border:1px solid #30363d;padding:10px;">Utility CSS — used for all styling</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🎞️ framer-motion</td><td style="border:1px solid #30363d;padding:10px;">^11.0.0</td><td style="border:1px solid #30363d;padding:10px;">Animations and 3D tilt effects</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🌐 axios</td><td style="border:1px solid #30363d;padding:10px;">^1.6.7</td><td style="border:1px solid #30363d;padding:10px;">HTTP client for calling the backend API</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🎯 lucide-react</td><td style="border:1px solid #30363d;padding:10px;">^0.363.0</td><td style="border:1px solid #30363d;padding:10px;">Icon library (500+ icons)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🕸️ reactflow</td><td style="border:1px solid #30363d;padding:10px;">^11.10.4</td><td style="border:1px solid #30363d;padding:10px;">Interactive knowledge graph visualisation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">📊 recharts</td><td style="border:1px solid #30363d;padding:10px;">^2.10.4</td><td style="border:1px solid #30363d;padding:10px;">Radar chart, bar chart, line chart</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🐻 zustand</td><td style="border:1px solid #30363d;padding:10px;">^4.5.0</td><td style="border:1px solid #30363d;padding:10px;">Lightweight global state management</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🔔 react-hot-toast</td><td style="border:1px solid #30363d;padding:10px;">^2.4.1</td><td style="border:1px solid #30363d;padding:10px;">Toast notifications</td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="how-to-run" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">⚙️ How to Run the Project Locally</h2>
<p>You need to run <b>three separate servers</b> — the Node.js backend, the Python AI service, and the React frontend.</p>

<h3 style="color:#ffa657;">🧰 Step 1 — Prerequisites</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Requirement</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Purpose</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">🟢 Node.js v18+</td><td style="border:1px solid #30363d;padding:10px;">Run the backend and build the frontend</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🐍 Python 3.10+</td><td style="border:1px solid #30363d;padding:10px;">Run the AI microservice</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">📦 npm</td><td style="border:1px solid #30363d;padding:10px;">Install Node.js dependencies</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🍃 MongoDB Atlas account</td><td style="border:1px solid #30363d;padding:10px;">Cloud database (free tier works)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🤖 Google Gemini API key</td><td style="border:1px solid #30363d;padding:10px;">Powers the AI Tutor (free tier available)</td></tr>
</tbody>
</table>

<h3 style="color:#ffa657;">📥 Step 2 — Clone the repository</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">git clone https://github.com/your-username/edupath-ai.git
cd edupath-ai</pre>

<h3 style="color:#ffa657;">🖥️ Step 3 — Set up and start the Backend</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd backend
npm install</pre>
<p>Create a <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">.env</code> file inside <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">backend/</code>:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.xxxxx.mongodb.net/edupath
PORT=5000
JWT_SECRET=any_long_random_secret_string_32_chars_minimum
FRONTEND_URL=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_16_char_gmail_app_password</pre>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">npm run dev</pre>
<p>Backend starts at <b>http://localhost:5000</b></p>

<h3 style="color:#ffa657;">🐍 Step 4 — Set up and start the AI Service</h3>
<p>Open a new terminal:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd ai-service
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt</pre>
<p>Create a <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">.env</code> file inside <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">ai-service/</code>:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.xxxxx.mongodb.net/edupath
GEMINI_API_KEY=your_gemini_api_key_here</pre>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">uvicorn main:app --reload --port 8000</pre>
<p>AI Service starts at <b>http://localhost:8000</b> — interactive docs at <b>http://localhost:8000/docs</b></p>

<h3 style="color:#ffa657;">🎨 Step 5 — Set up and start the Frontend</h3>
<p>Open a new terminal:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd frontend
npm install</pre>
<p>Create a <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">.env</code> file inside <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">frontend/</code>:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">VITE_API_URL=http://localhost:5000/api
VITE_AI_URL=http://localhost:8000</pre>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">npm run dev</pre>
<p>Frontend starts at <b>http://localhost:5173</b></p>

<h3 style="color:#ffa657;">🌱 Step 6 — Seed the database (first time only)</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;color:#e6edf3;">cd backend
node seed.js</pre>
<p>This inserts all skill nodes (Algebra, Statistics, ML Fundamentals, etc.) and their prerequisite relationships into MongoDB.</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="env-vars" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🔑 Environment Variables</h2>

<h3 style="color:#d2a8ff;">⚙️ Backend (<code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">backend/.env</code>)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Variable</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What it does</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Where to get it</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">MONGODB_URI</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas connection string</td><td style="border:1px solid #30363d;padding:10px;">MongoDB Atlas → Connect → Connect your application</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">PORT</code></td><td style="border:1px solid #30363d;padding:10px;">❌ No</td><td style="border:1px solid #30363d;padding:10px;">Port the server runs on (default: 5000)</td><td style="border:1px solid #30363d;padding:10px;">Set to any free port</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">JWT_SECRET</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">Signs and verifies JWT tokens</td><td style="border:1px solid #30363d;padding:10px;">Any random 32+ character string</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">FRONTEND_URL</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">Frontend URL for CORS whitelist</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">http://localhost:5173</code> in dev</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">AI_SERVICE_URL</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">URL of the Python AI microservice</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">http://localhost:8000</code> in dev</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">EMAIL_USER</code></td><td style="border:1px solid #30363d;padding:10px;">❌ Optional</td><td style="border:1px solid #30363d;padding:10px;">Gmail address for sending notifications</td><td style="border:1px solid #30363d;padding:10px;">Your Gmail address</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">EMAIL_PASS</code></td><td style="border:1px solid #30363d;padding:10px;">❌ Optional</td><td style="border:1px solid #30363d;padding:10px;">Gmail App Password (not login password)</td><td style="border:1px solid #30363d;padding:10px;">https://myaccount.google.com/apppasswords</td></tr>
</tbody>
</table>

<br>

<h3 style="color:#d2a8ff;">🐍 AI Service (<code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">ai-service/.env</code>)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Variable</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What it does</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">MONGODB_URI</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">Same MongoDB Atlas URI — AI service reads mastery and skill data directly</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">GEMINI_API_KEY</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">Google Gemini Pro API key for the AI Tutor streaming endpoint</td></tr>
</tbody>
</table>

<br>

<h3 style="color:#d2a8ff;">🎨 Frontend (<code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">frontend/.env</code>)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Variable</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What it does</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">VITE_API_URL</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">Base URL for all Node.js API calls. Must end with <code style="color:#f0883e;">/api</code>. Example: <code style="color:#f0883e;">http://localhost:5000/api</code></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">VITE_AI_URL</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Yes</td><td style="border:1px solid #30363d;padding:10px;">Base URL for direct AI service calls (tutor streaming). Example: <code style="color:#f0883e;">http://localhost:8000</code></td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="api-routes" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🌐 All API Routes (Summary)</h2>

<h3 style="color:#d2a8ff;">⚙️ Node.js Backend — <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">http://localhost:5000</code></h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Route Prefix</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What it handles</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">POST /api/auth/register</code></td><td style="border:1px solid #30363d;padding:10px;">🔐 Register a new student or teacher account</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">POST /api/auth/login</code></td><td style="border:1px solid #30363d;padding:10px;">🔐 Login and receive a JWT token</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/student</code></td><td style="border:1px solid #30363d;padding:10px;">👤 Get/update student profile, mastery map, career goal</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/assessment</code></td><td style="border:1px solid #30363d;padding:10px;">🧪 Fetch assessment questions, submit answers</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/learning</code></td><td style="border:1px solid #30363d;padding:10px;">📖 Get learning content for a skill, mark as complete</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/analytics</code></td><td style="border:1px solid #30363d;padding:10px;">📊 Mastery analytics, weak spots, performance logs</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/tutor</code></td><td style="border:1px solid #30363d;padding:10px;">🤖 Proxy to AI tutor, save tutor feedback</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/plan</code></td><td style="border:1px solid #30363d;padding:10px;">📋 Generate and retrieve learning plan</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/todo</code></td><td style="border:1px solid #30363d;padding:10px;">✅ Create, complete, and delete daily challenge tasks</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/srs</code></td><td style="border:1px solid #30363d;padding:10px;">🔁 Get due SRS cards, submit review, get stats</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/notifications</code></td><td style="border:1px solid #30363d;padding:10px;">🔔 Get and mark notifications as read</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/leaderboard</code></td><td style="border:1px solid #30363d;padding:10px;">🏆 Global XP leaderboard rankings</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/assignments</code></td><td style="border:1px solid #30363d;padding:10px;">📌 Teacher assigns topics to students</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/study-session</code></td><td style="border:1px solid #30363d;padding:10px;">⏱️ Start, end, and retrieve study sessions</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/xp</code></td><td style="border:1px solid #30363d;padding:10px;">⭐ Award XP, get level info and progress</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/mistakes</code></td><td style="border:1px solid #30363d;padding:10px;">📝 Log mistakes, get mistake journal, mark resolved</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/exam</code></td><td style="border:1px solid #30363d;padding:10px;">📅 Start exam session, submit answers, get results</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/api/intelligence</code></td><td style="border:1px solid #30363d;padding:10px;">🧠 Proxy to AI intelligence endpoints (cognitive load, distraction, etc.)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">GET /health</code></td><td style="border:1px solid #30363d;padding:10px;">💚 Health check endpoint</td></tr>
</tbody>
</table>

<br>

<h3 style="color:#d2a8ff;">🐍 AI Service — <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">http://localhost:8000</code></h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Method</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Route</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What it does</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/mastery/update</code></td><td style="border:1px solid #30363d;padding:10px;">Run BKT on student answers and update mastery scores in MongoDB</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/recommend</code></td><td style="border:1px solid #30363d;padding:10px;">Return top 3 recommended skills based on mastery + career goal</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">GET</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/knowledge-graph/{student_id}</code></td><td style="border:1px solid #30363d;padding:10px;">Return React Flow nodes + edges for the student's knowledge graph</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/tutor/query</code></td><td style="border:1px solid #30363d;padding:10px;">Stream a Gemini-powered tutoring response adapted to mastery level</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/plan/generate</code></td><td style="border:1px solid #30363d;padding:10px;">Generate a full weekly learning plan using ML algorithms</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/intelligence/student-risk</code></td><td style="border:1px solid #30363d;padding:10px;">Predict if a student is at risk of failing upcoming assessments</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/intelligence/generate-questions</code></td><td style="border:1px solid #30363d;padding:10px;">Generate practice questions for a topic at a given difficulty</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/intelligence/learning-style</code></td><td style="border:1px solid #30363d;padding:10px;">Detect student learning style from behavioural signals</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">POST</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/intelligence/burnout-detection</code></td><td style="border:1px solid #30363d;padding:10px;">Detect cognitive burnout from session length, accuracy, and focus trends</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">GET</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/health</code></td><td style="border:1px solid #30363d;padding:10px;">Health check — used by Node.js backend to verify AI service is running</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">GET</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">/docs</code></td><td style="border:1px solid #30363d;padding:10px;">Auto-generated interactive Swagger UI documentation</td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="user-roles" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">👥 User Roles and Permissions</h2>
<p>There are <b>2 roles</b> in the system. The role is chosen at registration and embedded in the JWT token. The backend <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">roleMiddleware.js</code> enforces access on every protected route.</p>

<table style="border-collapse:collapse;width:100%;text-align:center;">
<thead><tr style="background:#161b22;">
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;text-align:left;">Feature</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">🎓 Student</th>
<th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">👩‍🏫 Teacher</th>
</tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Register / Login</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">✔️</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Student Dashboard</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Take Assessment / Quiz</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">AI Tutor Chat</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Knowledge Graph</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Learning Plan</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">SRS Review</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Leaderboard</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">✔️</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Mistake Journal</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Exam</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Intelligence Widgets</td><td style="border:1px solid #30363d;padding:10px;">✔️</td><td style="border:1px solid #30363d;padding:10px;">❌</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Teacher Dashboard</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">✔️</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Class Insights Dashboard</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">✔️</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;text-align:left;">Assign Topics to Students</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">✔️</td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="how-features-work" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🧠 How Each Major Feature Works</h2>

<h3 style="color:#d2a8ff;">1. Bayesian Knowledge Tracing (BKT)</h3>
<p>BKT is the core algorithm that estimates how well a student knows each skill. After every answer, it updates a probability called <b>P(Learned)</b> — the chance the student has truly mastered the concept.</p>
<p>The model uses four parameters per skill:</p>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Parameter</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Meaning</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Default</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">p_init</code></td><td style="border:1px solid #30363d;padding:10px;">Prior probability student already knows the skill</td><td style="border:1px solid #30363d;padding:10px;">0.1</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">p_transit</code></td><td style="border:1px solid #30363d;padding:10px;">Probability of learning the skill after one practice</td><td style="border:1px solid #30363d;padding:10px;">0.3</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">p_slip</code></td><td style="border:1px solid #30363d;padding:10px;">Probability of answering wrong even if learned</td><td style="border:1px solid #30363d;padding:10px;">0.1</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">p_guess</code></td><td style="border:1px solid #30363d;padding:10px;">Probability of answering correctly by guessing</td><td style="border:1px solid #30363d;padding:10px;">0.2</td></tr>
</tbody>
</table>
<p>After each answer, the posterior P(Learned | answer) is computed using Bayes' theorem, then updated with the transit probability. The result is stored as <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">mastery_score</code> in MongoDB's <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">StudentMastery</code> collection.</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;"># Simplified BKT update (from bkt_model.py)
if correct:
    p_learned_given_obs = p_learned * (1 - p_slip) / evidence
else:
    p_learned_given_obs = p_learned * p_slip / evidence

# Apply transit: student may have learned during this attempt
new_mastery = p_learned_given_obs + (1 - p_learned_given_obs) * p_transit</pre>

<h3 style="color:#d2a8ff;">2. Recommendation Engine</h3>
<p>After BKT updates mastery, the recommendation engine scores every <b>unlocked</b> skill (prerequisites met, not yet mastered) and returns the top 3 to study next.</p>
<p>The score formula combines four signals:</p>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">score = (gap_weight × mastery_gap)
      + (prereq_weight × prereq_readiness)
      + (career_weight × career_alignment)
      + (difficulty_weight × difficulty_match)</pre>
<ul>
<li><b>mastery_gap</b> — how far the student is from mastering this skill (1 - mastery_score)</li>
<li><b>prereq_readiness</b> — average mastery of all prerequisite skills</li>
<li><b>career_alignment</b> — whether this skill appears in the student's career goal path</li>
<li><b>difficulty_match</b> — how well the skill difficulty matches the student's current level</li>
</ul>
<p>Skills are filtered to only include those where all prerequisites have mastery ≥ 0.6 (unlocked). The top 3 highest-scoring skills are returned as recommendations.</p>

<h3 style="color:#d2a8ff;">3. Knowledge Graph</h3>
<p>The knowledge graph is built using <b>NetworkX</b> as a directed acyclic graph (DAG). Each node is a skill, and each directed edge represents a prerequisite relationship (A → B means "learn A before B").</p>
<p>On startup, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">build_skill_graph()</code> loads all SkillNodes from MongoDB and constructs the NetworkX DiGraph in memory. When a student requests their graph, the engine overlays their mastery scores to colour each node:</p>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Status</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Condition</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Colour</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">Locked</td><td style="border:1px solid #30363d;padding:10px;">Prerequisites not met (mastery &lt; 0.6)</td><td style="border:1px solid #30363d;padding:10px;">Grey</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Unlocked</td><td style="border:1px solid #30363d;padding:10px;">Prerequisites met, mastery &lt; 0.4</td><td style="border:1px solid #30363d;padding:10px;">Blue</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">In Progress</td><td style="border:1px solid #30363d;padding:10px;">Mastery between 0.4 and 0.8</td><td style="border:1px solid #30363d;padding:10px;">Yellow</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">Mastered</td><td style="border:1px solid #30363d;padding:10px;">Mastery ≥ 0.8</td><td style="border:1px solid #30363d;padding:10px;">Green</td></tr>
</tbody>
</table>
<p>The response is formatted as React Flow <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">nodes</code> and <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">edges</code> arrays, ready to render directly in the frontend.</p>

<h3 style="color:#d2a8ff;">4. AI Tutor (Gemini)</h3>
<p>The AI Tutor uses <b>Google Gemini Pro</b> with a dynamically constructed system prompt that adapts to the student's mastery level. The response is streamed token-by-token back to the frontend using Server-Sent Events (SSE).</p>
<p>The system prompt includes:</p>
<ul>
<li>The student's current mastery scores for all skills</li>
<li>A language instruction: "explain at beginner / intermediate / advanced level"</li>
<li>An instruction to always end with a follow-up question to check understanding</li>
<li>A fallback response if the Gemini API is unavailable</li>
</ul>

<h3 style="color:#d2a8ff;">5. Learning Plan Generator</h3>
<p>The plan generator creates a structured weekly study schedule using two algorithms:</p>
<ol>
<li><b>Topological Sort</b> — orders skills so prerequisites always come before dependent skills</li>
<li><b>Weighted Gap Analysis</b> — prioritises skills with the largest mastery gap (1 - mastery_score)</li>
</ol>
<p>For each skill in the plan, it generates:</p>
<ul>
<li>Estimated study hours per week</li>
<li>Overcome strategies (subject-specific tips)</li>
<li>Recommended resources (videos, practice sets, readings)</li>
<li>Estimated completion week</li>
<li>ML confidence score (based on prerequisite readiness)</li>
</ul>
<p>No LLM API calls are made — the entire plan is generated algorithmically in under 200ms.</p>

<h3 style="color:#d2a8ff;">6. Spaced Repetition System (SRS)</h3>
<p>SRS uses the <b>SM-2 algorithm</b> to schedule flashcard reviews at optimal intervals. Cards are created automatically from assessment mistakes and can also be added manually.</p>
<p>After each review, the student rates their recall (0–5). The SM-2 algorithm updates:</p>
<ul>
<li><b>easiness factor (EF)</b> — how easy the card is (starts at 2.5, decreases on failures)</li>
<li><b>interval</b> — days until next review (1 → 6 → EF×previous for correct answers)</li>
<li><b>repetitions</b> — count of consecutive correct reviews</li>
</ul>
<p>Cards with a rating below 3 are reset to interval=1 and reviewed again the next day.</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🗺️ System Architecture Diagram</h2>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 420" style="width:100%;max-width:900px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
  </defs>
  <!-- Browser -->
  <rect x="30" y="160" width="140" height="60" rx="8" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="100" y="185" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace">🌐 Browser</text>
  <text x="100" y="205" text-anchor="middle" fill="#8b949e" font-size="11" font-family="monospace">React + Vite</text>
  <!-- Arrow Browser → Backend -->
  <line x1="170" y1="190" x2="240" y2="190" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="205" y="183" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">REST</text>
  <!-- Backend -->
  <rect x="240" y="130" width="160" height="120" rx="8" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="320" y="158" text-anchor="middle" fill="#3fb950" font-size="13" font-family="monospace">⚙️ Backend</text>
  <text x="320" y="178" text-anchor="middle" fill="#8b949e" font-size="11" font-family="monospace">Node.js + Express</text>
  <text x="320" y="196" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">:5000</text>
  <text x="320" y="214" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">JWT Auth · Routes</text>
  <text x="320" y="232" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Controllers · Models</text>
  <!-- Arrow Backend → MongoDB -->
  <line x1="400" y1="165" x2="480" y2="165" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="440" y="158" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Mongoose</text>
  <!-- MongoDB -->
  <rect x="480" y="130" width="140" height="80" rx="8" fill="#161b22" stroke="#f0883e" stroke-width="1.5"/>
  <text x="550" y="158" text-anchor="middle" fill="#f0883e" font-size="13" font-family="monospace">🍃 MongoDB</text>
  <text x="550" y="178" text-anchor="middle" fill="#8b949e" font-size="11" font-family="monospace">Atlas (Cloud)</text>
  <text x="550" y="196" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Students · Skills</text>
  <!-- Arrow Backend → AI Service -->
  <line x1="320" y1="250" x2="320" y2="310" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="340" y="285" fill="#8b949e" font-size="10" font-family="monospace">HTTP</text>
  <!-- AI Service -->
  <rect x="220" y="310" width="200" height="80" rx="8" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="320" y="338" text-anchor="middle" fill="#d2a8ff" font-size="13" font-family="monospace">🐍 AI Service</text>
  <text x="320" y="358" text-anchor="middle" fill="#8b949e" font-size="11" font-family="monospace">Python FastAPI :8000</text>
  <text x="320" y="376" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">BKT · Recommend · Plan</text>
  <!-- Arrow AI Service → MongoDB -->
  <line x1="420" y1="350" x2="480" y2="230" stroke="#d2a8ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arrow)"/>
  <text x="465" y="295" fill="#8b949e" font-size="10" font-family="monospace">PyMongo</text>
  <!-- Arrow AI Service → Gemini -->
  <line x1="420" y1="350" x2="680" y2="350" stroke="#d2a8ff" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="555" y="343" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">API call</text>
  <!-- Gemini -->
  <rect x="680" y="310" width="160" height="80" rx="8" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="760" y="338" text-anchor="middle" fill="#ffa657" font-size="13" font-family="monospace">🤖 Gemini</text>
  <text x="760" y="358" text-anchor="middle" fill="#8b949e" font-size="11" font-family="monospace">Google AI Pro</text>
  <text x="760" y="376" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">AI Tutor streaming</text>
  <!-- Title -->
  <text x="450" y="40" text-anchor="middle" fill="#c9d1d9" font-size="16" font-family="monospace" font-weight="bold">EduPath AI — System Architecture</text>
  <!-- Legend -->
  <rect x="30" y="30" width="12" height="12" fill="#58a6ff"/>
  <text x="48" y="41" fill="#8b949e" font-size="11" font-family="monospace">Frontend</text>
  <rect x="120" y="30" width="12" height="12" fill="#3fb950"/>
  <text x="138" y="41" fill="#8b949e" font-size="11" font-family="monospace">Backend</text>
  <rect x="210" y="30" width="12" height="12" fill="#d2a8ff"/>
  <text x="228" y="41" fill="#8b949e" font-size="11" font-family="monospace">AI Service</text>
  <rect x="310" y="30" width="12" height="12" fill="#f0883e"/>
  <text x="328" y="41" fill="#8b949e" font-size="11" font-family="monospace">Database</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🔄 Data Flow Diagram</h2>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 340" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="arr2" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
  </defs>
  <text x="430" y="30" text-anchor="middle" fill="#c9d1d9" font-size="15" font-family="monospace" font-weight="bold">EduPath AI — Data Flow</text>
  <!-- Step boxes -->
  <!-- 1 Student answers quiz -->
  <rect x="20" y="70" width="130" height="55" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="85" y="93" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace">1. Student</text>
  <text x="85" y="110" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">answers quiz</text>
  <!-- arrow -->
  <line x1="150" y1="97" x2="200" y2="97" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- 2 Backend receives -->
  <rect x="200" y="70" width="130" height="55" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="265" y="93" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace">2. Backend</text>
  <text x="265" y="110" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">validates + routes</text>
  <!-- arrow -->
  <line x1="330" y1="97" x2="380" y2="97" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- 3 AI Service BKT -->
  <rect x="380" y="70" width="130" height="55" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="445" y="93" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace">3. BKT Update</text>
  <text x="445" y="110" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">mastery recalculated</text>
  <!-- arrow -->
  <line x1="510" y1="97" x2="560" y2="97" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- 4 MongoDB write -->
  <rect x="560" y="70" width="130" height="55" rx="6" fill="#161b22" stroke="#f0883e" stroke-width="1.5"/>
  <text x="625" y="93" text-anchor="middle" fill="#f0883e" font-size="11" font-family="monospace">4. MongoDB</text>
  <text x="625" y="110" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">mastery saved</text>
  <!-- arrow -->
  <line x1="690" y1="97" x2="740" y2="97" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- 5 Recommend -->
  <rect x="740" y="70" width="100" height="55" rx="6" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="790" y="93" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace">5. Recommend</text>
  <text x="790" y="110" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">top 3 skills</text>

  <!-- Row 2 -->
  <!-- 6 Dashboard updates -->
  <rect x="20" y="200" width="130" height="55" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="85" y="223" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace">8. Dashboard</text>
  <text x="85" y="240" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">UI updates live</text>
  <!-- arrow left from 7 -->
  <line x1="200" y1="227" x2="150" y2="227" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- 7 Backend response -->
  <rect x="200" y="200" width="130" height="55" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="265" y="223" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace">7. Backend</text>
  <text x="265" y="240" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">returns response</text>
  <!-- arrow left from 6 -->
  <line x1="380" y1="227" x2="330" y2="227" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- 6 SRS + Mistake log -->
  <rect x="380" y="200" width="130" height="55" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="445" y="223" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace">6. SRS + Mistakes</text>
  <text x="445" y="240" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">auto-logged</text>
  <!-- vertical arrow from 4 down to 6 -->
  <line x1="625" y1="125" x2="625" y2="165" stroke="#58a6ff" stroke-width="1.5"/>
  <line x1="625" y1="165" x2="445" y2="165" stroke="#58a6ff" stroke-width="1.5"/>
  <line x1="445" y1="165" x2="445" y2="200" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr2)"/>
  <!-- vertical arrow from 5 down -->
  <line x1="790" y1="125" x2="790" y2="165" stroke="#ffa657" stroke-width="1.5"/>
  <line x1="790" y1="165" x2="265" y2="165" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3"/>
  <line x1="265" y1="165" x2="265" y2="200" stroke="#ffa657" stroke-width="1.5" marker-end="url(#arr2)"/>
  <text x="530" y="158" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace">recommendations injected into response</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">👤 User Flow Diagram</h2>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 480" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="arr3" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
  </defs>
  <text x="430" y="28" text-anchor="middle" fill="#c9d1d9" font-size="15" font-family="monospace" font-weight="bold">EduPath AI — User Flow</text>
  <!-- Register/Login -->
  <rect x="340" y="50" width="160" height="45" rx="22" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="420" y="78" text-anchor="middle" fill="#58a6ff" font-size="12" font-family="monospace">Register / Login</text>
  <!-- arrow down -->
  <line x1="420" y1="95" x2="420" y2="125" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Role check diamond -->
  <polygon points="420,125 490,155 420,185 350,155" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="420" y="152" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace">Role?</text>
  <!-- Student branch left -->
  <line x1="350" y1="155" x2="200" y2="155" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr3)"/>
  <text x="275" y="148" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Student</text>
  <!-- Teacher branch right -->
  <line x1="490" y1="155" x2="640" y2="155" stroke="#3fb950" stroke-width="1.5" marker-end="url(#arr3)"/>
  <text x="565" y="148" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Teacher</text>
  <!-- Student Dashboard -->
  <rect x="80" y="130" width="120" height="50" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="140" y="152" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace">Dashboard</text>
  <text x="140" y="168" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Stats + Recs</text>
  <!-- Teacher Dashboard -->
  <rect x="640" y="130" width="140" height="50" rx="6" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="710" y="152" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace">Teacher Panel</text>
  <text x="710" y="168" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Class Analytics</text>
  <!-- Student flow down -->
  <line x1="140" y1="180" x2="140" y2="220" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Assessment -->
  <rect x="60" y="220" width="160" height="45" rx="6" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="140" y="240" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace">Take Assessment</text>
  <text x="140" y="256" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">BKT updates mastery</text>
  <line x1="140" y1="265" x2="140" y2="295" stroke="#58a6ff" stroke-width="1.5" marker-end="url(#arr3)"/>
  <!-- Study options row -->
  <rect x="20" y="295" width="100" height="45" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="70" y="315" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">AI Tutor</text>
  <text x="70" y="330" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Gemini chat</text>
  <rect x="130" y="295" width="100" height="45" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="180" y="315" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">SRS Review</text>
  <text x="180" y="330" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">SM-2 cards</text>
  <rect x="240" y="295" width="100" height="45" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="290" y="315" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">Learn Plan</text>
  <text x="290" y="330" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Weekly schedule</text>
  <rect x="350" y="295" width="100" height="45" rx="6" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="400" y="315" text-anchor="middle" fill="#58a6ff" font-size="10" font-family="monospace">Exam</text>
  <text x="400" y="330" text-anchor="middle" fill="#8b949e" font-size="9" font-family="monospace">Timed session</text>
  <!-- arrows from assessment to each -->
  <line x1="100" y1="265" x2="70" y2="295" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr3)"/>
  <line x1="140" y1="265" x2="180" y2="295" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr3)"/>
  <line x1="180" y1="265" x2="290" y2="295" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr3)"/>
  <line x1="200" y1="265" x2="400" y2="295" stroke="#58a6ff" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr3)"/>
  <!-- XP + Leaderboard -->
  <rect x="130" y="390" width="220" height="45" rx="6" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <text x="240" y="410" text-anchor="middle" fill="#ffa657" font-size="11" font-family="monospace">XP Earned → Leaderboard</text>
  <text x="240" y="426" text-anchor="middle" fill="#8b949e" font-size="10" font-family="monospace">Gamification loop</text>
  <line x1="180" y1="340" x2="240" y2="390" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr3)"/>
  <line x1="400" y1="340" x2="300" y2="390" stroke="#ffa657" stroke-width="1" stroke-dasharray="4,3" marker-end="url(#arr3)"/>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🏗️ Framework Architecture Diagram</h2>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 300" style="width:100%;max-width:860px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <text x="430" y="28" text-anchor="middle" fill="#c9d1d9" font-size="15" font-family="monospace" font-weight="bold">EduPath AI — Framework Stack</text>
  <!-- Frontend column -->
  <rect x="30" y="50" width="180" height="220" rx="8" fill="#0d1117" stroke="#58a6ff" stroke-width="1.5"/>
  <text x="120" y="75" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">Frontend</text>
  <rect x="45" y="85" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="120" y="104" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">React 18 + Vite</text>
  <rect x="45" y="120" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="120" y="139" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Tailwind CSS</text>
  <rect x="45" y="155" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="120" y="174" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Framer Motion</text>
  <rect x="45" y="190" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="120" y="209" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">React Flow + Recharts</text>
  <rect x="45" y="225" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="120" y="244" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Zustand + Axios</text>
  <!-- Backend column -->
  <rect x="250" y="50" width="180" height="220" rx="8" fill="#0d1117" stroke="#3fb950" stroke-width="1.5"/>
  <text x="340" y="75" text-anchor="middle" fill="#3fb950" font-size="13" font-family="monospace" font-weight="bold">Backend</text>
  <rect x="265" y="85" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="340" y="104" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Node.js 18 + Express</text>
  <rect x="265" y="120" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="340" y="139" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Mongoose + MongoDB</text>
  <rect x="265" y="155" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="340" y="174" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">JWT + bcryptjs</text>
  <rect x="265" y="190" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="340" y="209" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Nodemailer + Morgan</text>
  <rect x="265" y="225" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="340" y="244" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">express-async-errors</text>
  <!-- AI Service column -->
  <rect x="470" y="50" width="180" height="220" rx="8" fill="#0d1117" stroke="#d2a8ff" stroke-width="1.5"/>
  <text x="560" y="75" text-anchor="middle" fill="#d2a8ff" font-size="13" font-family="monospace" font-weight="bold">AI Service</text>
  <rect x="485" y="85" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="560" y="104" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Python 3.10 + FastAPI</text>
  <rect x="485" y="120" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="560" y="139" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">NetworkX + NumPy</text>
  <rect x="485" y="155" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="560" y="174" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Pydantic + PyMongo</text>
  <rect x="485" y="190" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="560" y="209" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">google-generativeai</text>
  <rect x="485" y="225" width="150" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="560" y="244" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Uvicorn + motor</text>
  <!-- Infra column -->
  <rect x="690" y="50" width="150" height="220" rx="8" fill="#0d1117" stroke="#f0883e" stroke-width="1.5"/>
  <text x="765" y="75" text-anchor="middle" fill="#f0883e" font-size="13" font-family="monospace" font-weight="bold">Infra</text>
  <rect x="705" y="85" width="120" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="765" y="104" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">MongoDB Atlas</text>
  <rect x="705" y="120" width="120" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="765" y="139" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Vercel / Netlify</text>
  <rect x="705" y="155" width="120" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="765" y="174" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Render / Railway</text>
  <rect x="705" y="190" width="120" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="765" y="209" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">Google Gemini API</text>
  <rect x="705" y="225" width="120" height="28" rx="4" fill="#161b22" stroke="#30363d" stroke-width="1"/>
  <text x="765" y="244" text-anchor="middle" fill="#c9d1d9" font-size="11" font-family="monospace">GitHub Actions CI</text>
</svg>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="deployment" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">🚀 Deployment</h2>

<h3 style="color:#d2a8ff;">🎨 Frontend — Vercel or Netlify</h3>
<ol>
<li>Push the <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">frontend/</code> folder to GitHub</li>
<li>Connect the repo to Vercel or Netlify</li>
<li>Set build command: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">npm run build</code>, output dir: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">dist</code></li>
<li>Add environment variables: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">VITE_API_URL</code>, <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">VITE_AI_URL</code></li>
</ol>

<h3 style="color:#d2a8ff;">⚙️ Backend — Render or Railway</h3>
<ol>
<li>Create a new Web Service on Render, connect the <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">backend/</code> folder</li>
<li>Set start command: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">node server.js</code></li>
<li>Add all environment variables from <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">backend/.env</code></li>
<li>Set <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">FRONTEND_URL</code> to your deployed Vercel/Netlify URL</li>
</ol>

<h3 style="color:#d2a8ff;">🐍 AI Service — Render</h3>
<ol>
<li>Create a new Web Service on Render, connect the <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">ai-service/</code> folder</li>
<li>Set runtime to Python 3.10</li>
<li>Set start command: <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">uvicorn main:app --host 0.0.0.0 --port 8000</code></li>
<li>Add <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">MONGODB_URI</code> and <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">GEMINI_API_KEY</code> as environment variables</li>
<li>Update <code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">AI_SERVICE_URL</code> in the backend service to point to the deployed AI service URL</li>
</ol>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="dependencies" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">📦 Package Dependencies</h2>

<h3 style="color:#d2a8ff;">⚙️ Backend (<code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">backend/package.json</code>)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Package</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Purpose</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">express</td><td style="border:1px solid #30363d;padding:10px;">^4.18.2</td><td style="border:1px solid #30363d;padding:10px;">HTTP server and routing</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">mongoose</td><td style="border:1px solid #30363d;padding:10px;">^8.0.3</td><td style="border:1px solid #30363d;padding:10px;">MongoDB ODM with schema validation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">jsonwebtoken</td><td style="border:1px solid #30363d;padding:10px;">^9.0.2</td><td style="border:1px solid #30363d;padding:10px;">JWT generation and verification</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">bcryptjs</td><td style="border:1px solid #30363d;padding:10px;">^2.4.3</td><td style="border:1px solid #30363d;padding:10px;">Password hashing</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">axios</td><td style="border:1px solid #30363d;padding:10px;">^1.6.2</td><td style="border:1px solid #30363d;padding:10px;">HTTP client for AI service calls</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">cors</td><td style="border:1px solid #30363d;padding:10px;">^2.8.5</td><td style="border:1px solid #30363d;padding:10px;">Cross-origin request handling</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">dotenv</td><td style="border:1px solid #30363d;padding:10px;">^16.3.1</td><td style="border:1px solid #30363d;padding:10px;">Environment variable loading</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">morgan</td><td style="border:1px solid #30363d;padding:10px;">^1.10.0</td><td style="border:1px solid #30363d;padding:10px;">HTTP request logging</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">nodemailer</td><td style="border:1px solid #30363d;padding:10px;">^6.10.1</td><td style="border:1px solid #30363d;padding:10px;">Email notifications</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">express-async-errors</td><td style="border:1px solid #30363d;padding:10px;">^3.1.1</td><td style="border:1px solid #30363d;padding:10px;">Async error propagation to global handler</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">nodemon (dev)</td><td style="border:1px solid #30363d;padding:10px;">^3.0.2</td><td style="border:1px solid #30363d;padding:10px;">Auto-restart on file save</td></tr>
</tbody>
</table>

<br>
<h3 style="color:#d2a8ff;">🐍 AI Service (<code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">ai-service/requirements.txt</code>)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Package</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Purpose</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">fastapi</td><td style="border:1px solid #30363d;padding:10px;">>=0.110.0</td><td style="border:1px solid #30363d;padding:10px;">Async REST API framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">uvicorn</td><td style="border:1px solid #30363d;padding:10px;">>=0.27.0</td><td style="border:1px solid #30363d;padding:10px;">ASGI server</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">networkx</td><td style="border:1px solid #30363d;padding:10px;">>=3.2.1</td><td style="border:1px solid #30363d;padding:10px;">Directed graph for skill prerequisites</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">google-generativeai</td><td style="border:1px solid #30363d;padding:10px;">>=0.5.0</td><td style="border:1px solid #30363d;padding:10px;">Gemini Pro API for AI Tutor</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">pydantic</td><td style="border:1px solid #30363d;padding:10px;">>=2.7.0</td><td style="border:1px solid #30363d;padding:10px;">Request/response schema validation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">numpy</td><td style="border:1px solid #30363d;padding:10px;">>=1.26.4</td><td style="border:1px solid #30363d;padding:10px;">Numerical computation for ML</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">pymongo</td><td style="border:1px solid #30363d;padding:10px;">>=4.7.0</td><td style="border:1px solid #30363d;padding:10px;">Synchronous MongoDB driver</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">motor</td><td style="border:1px solid #30363d;padding:10px;">>=3.4.0</td><td style="border:1px solid #30363d;padding:10px;">Async MongoDB driver</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">httpx</td><td style="border:1px solid #30363d;padding:10px;">>=0.27.0</td><td style="border:1px solid #30363d;padding:10px;">Async HTTP client</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">python-dotenv</td><td style="border:1px solid #30363d;padding:10px;">>=1.0.0</td><td style="border:1px solid #30363d;padding:10px;">Load .env variables</td></tr>
</tbody>
</table>

<br>
<h3 style="color:#d2a8ff;">🎨 Frontend (<code style="background:#161b22;border:1px solid #30363d;border-radius:4px;padding:2px 6px;color:#f0883e;">frontend/package.json</code>)</h3>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Package</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Version</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Purpose</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">react</td><td style="border:1px solid #30363d;padding:10px;">^18.2.0</td><td style="border:1px solid #30363d;padding:10px;">UI component framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">react-router-dom</td><td style="border:1px solid #30363d;padding:10px;">^6.22.0</td><td style="border:1px solid #30363d;padding:10px;">Client-side routing</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">framer-motion</td><td style="border:1px solid #30363d;padding:10px;">^11.0.0</td><td style="border:1px solid #30363d;padding:10px;">Animations and 3D tilt effects</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">axios</td><td style="border:1px solid #30363d;padding:10px;">^1.6.7</td><td style="border:1px solid #30363d;padding:10px;">HTTP client for API calls</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">lucide-react</td><td style="border:1px solid #30363d;padding:10px;">^0.363.0</td><td style="border:1px solid #30363d;padding:10px;">Icon library</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">reactflow</td><td style="border:1px solid #30363d;padding:10px;">^11.10.4</td><td style="border:1px solid #30363d;padding:10px;">Knowledge graph visualisation</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">recharts</td><td style="border:1px solid #30363d;padding:10px;">^2.10.4</td><td style="border:1px solid #30363d;padding:10px;">Charts (radar, bar, line)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">zustand</td><td style="border:1px solid #30363d;padding:10px;">^4.5.0</td><td style="border:1px solid #30363d;padding:10px;">Global state management</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">react-hot-toast</td><td style="border:1px solid #30363d;padding:10px;">^2.4.1</td><td style="border:1px solid #30363d;padding:10px;">Toast notifications</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">tailwindcss (dev)</td><td style="border:1px solid #30363d;padding:10px;">^3.4.1</td><td style="border:1px solid #30363d;padding:10px;">Utility CSS framework</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">vite (dev)</td><td style="border:1px solid #30363d;padding:10px;">^5.1.0</td><td style="border:1px solid #30363d;padding:10px;">Build tool with HMR</td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="scripts" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">📜 Available Scripts</h2>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Directory</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Command</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">What it does</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">backend/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm run dev</code></td><td style="border:1px solid #30363d;padding:10px;">Start backend with nodemon (auto-restart on save)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">backend/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm start</code></td><td style="border:1px solid #30363d;padding:10px;">Start backend in production mode</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">backend/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">node seed.js</code></td><td style="border:1px solid #30363d;padding:10px;">Seed skill nodes into MongoDB (run once)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">ai-service/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">uvicorn main:app --reload --port 8000</code></td><td style="border:1px solid #30363d;padding:10px;">Start AI service with auto-reload</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">ai-service/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">uvicorn main:app --host 0.0.0.0 --port 8000</code></td><td style="border:1px solid #30363d;padding:10px;">Start AI service for production</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">frontend/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm run dev</code></td><td style="border:1px solid #30363d;padding:10px;">Start Vite dev server with HMR at :5173</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">frontend/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm run build</code></td><td style="border:1px solid #30363d;padding:10px;">Build optimised production bundle to dist/</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">frontend/</td><td style="border:1px solid #30363d;padding:10px;"><code style="color:#f0883e;">npm run preview</code></td><td style="border:1px solid #30363d;padding:10px;">Preview the production build locally</td></tr>
</tbody>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 id="contact" style="font-size:1.5em;color:#79c0ff;border-bottom:1px solid #21262d;padding-bottom:6px;">📬 Contact</h2>
<table style="border-collapse:collapse;width:100%;text-align:left;">
<thead><tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Channel</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Link</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #30363d;padding:10px;">🐙 GitHub</td><td style="border:1px solid #30363d;padding:10px;"><a href="https://github.com/your-username/edupath-ai" style="color:#58a6ff;">github.com/your-username/edupath-ai</a></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">📧 Email</td><td style="border:1px solid #30363d;padding:10px;"><a href="mailto:contact@edupath.ai" style="color:#58a6ff;">contact@edupath.ai</a></td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">🐛 Issues</td><td style="border:1px solid #30363d;padding:10px;"><a href="https://github.com/your-username/edupath-ai/issues" style="color:#58a6ff;">github.com/your-username/edupath-ai/issues</a></td></tr>
</tbody>
</table>

<br>
<p style="color:#8b949e;font-size:0.9em;">Built with ❤️ using React, Node.js, Python FastAPI, and Google Gemini.</p>

</body>
</html>
