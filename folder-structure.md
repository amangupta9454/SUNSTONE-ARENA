<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">📁 Folder Structure</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Complete Project Tree</h2>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">BACKEND/edupath-ai/
│
├── 📄 README.md                     ← Root project overview and quick start
├── 📄 prd.md                        ← Product Requirements Document
├── 📄 trd.md                        ← Technical Requirements Document
├── 📄 system-design.md              ← System design and component overview
├── 📄 system-architecture.md        ← Architecture layers and diagrams
├── 📄 er-diagram.md                 ← Entity relationship diagram (all 17 collections)
├── 📄 dfd.md                        ← Data flow diagrams (Level 0–3)
├── 📄 wfd.md                        ← Workflow diagrams (student, teacher, backend)
├── 📄 sequence-diagrams.md          ← Mermaid sequence diagrams for key flows
├── 📄 api-documentation.md          ← All API endpoints with examples
├── 📄 database-schema.md            ← All 17 MongoDB collection schemas
├── 📄 security-model.md             ← Auth, RBAC, threat mitigation
├── 📄 devops-architecture.md        ← Infrastructure and hosting overview
├── 📄 ci-cd-pipeline.md             ← GitHub Actions workflows
├── 📄 deployment-guide.md           ← Step-by-step production deployment
├── 📄 folder-structure.md           ← This file
├── 📄 contributing.md               ← Contributor guide
│
├── 📂 backend/                      ← Node.js Express REST API
│   ├── 📄 server.js                 ← App entry point — Express setup, route registration
│   ├── 📄 package.json              ← Dependencies and npm scripts
│   ├── 📄 package-lock.json         ← Locked dependency tree
│   ├── 📄 seed.js                   ← One-time script to seed SkillNode data
│   ├── 📄 .env                      ← Local environment variables (gitignored)
│   ├── 📄 README.md                 ← Backend-specific documentation
│   │
│   ├── 📂 controllers/              ← Business logic — one file per feature domain
│   │   ├── authController.js        ← register(), login()
│   │   ├── studentController.js     ← getProfile(), updateProfile(), getAllStudents()
│   │   ├── assessmentController.js  ← getQuestions(), submitAnswers()
│   │   ├── learningController.js    ← getContent(), markComplete()
│   │   ├── analyticsController.js   ← getMastery(), getWeakSpots(), getPerformance()
│   │   ├── tutorController.js       ← queryTutor(), saveFeedback()
│   │   ├── planController.js        ← generatePlan(), getPlan()
│   │   ├── todoController.js        ← getTasks(), createTask(), completeTask()
│   │   ├── srsController.js         ← getDueCards(), reviewCard(), createCard(), getStats()
│   │   ├── notificationController.js← getNotifications(), markRead()
│   │   ├── leaderboardController.js ← getLeaderboard()
│   │   ├── assignmentController.js  ← assignTopic(), getAssignments()
│   │   ├── studySessionController.js← startSession(), endSession(), getSessions()
│   │   ├── xpController.js          ← awardXP(), getLevel()
│   │   ├── mistakeController.js     ← logMistake(), getMistakes(), resolveMistake()
│   │   ├── examController.js        ← startExam(), submitExam(), getHistory()
│   │   ├── exportController.js      ← exportStudentData()
│   │   ├── intelligenceController.js← proxy to all /intelligence/* AI endpoints
│   │   └── tutorFeedbackController.js← saveFeedback(), getFeedback()
│   │
│   ├── 📂 models/                   ← Mongoose ODM schemas
│   │   ├── Student.js               ← User entity (students + teachers)
│   │   ├── SkillNode.js             ← Curriculum skill graph nodes
│   │   ├── StudentMastery.js        ← BKT mastery scores per student per skill
│   │   ├── AssessmentQuestion.js    ← Quiz questions with options and answers
│   │   ├── StudySession.js          ← Timed study session records
│   │   ├── SRSCard.js               ← Spaced repetition flashcards (SM-2)
│   │   ├── MistakeJournal.js        ← Logged incorrect answers
│   │   ├── ExamSession.js           ← Timed exam attempts and results
│   │   ├── LearningPlan.js          ← AI-generated weekly study plans
│   │   ├── TodoTask.js              ← Daily challenge tasks
│   │   ├── TopicAssignment.js       ← Teacher-to-student topic assignments
│   │   ├── Notification.js          ← In-app notification messages
│   │   ├── PerformanceLog.js        ← Per-session accuracy and response time
│   │   ├── DistractionLog.js        ← Focus anomaly detection records
│   │   ├── TutorFeedback.js         ← AI tutor interaction ratings
│   │   ├── LearningContent.js       ← Curated learning resources per skill
│   │   └── UserProgress.js          ← Aggregate progress tracking
│   │
│   ├── 📂 routes/                   ← Express router definitions
│   │   ├── authRoutes.js            ← POST /api/auth/register, /login
│   │   ├── studentRoutes.js         ← GET/PUT /api/student/profile, /mastery, /all
│   │   ├── assessmentRoutes.js      ← GET /questions, POST /submit
│   │   ├── learningRoutes.js        ← GET /content, POST /complete
│   │   ├── analyticsRoutes.js       ← GET /mastery, /weak-spots, /performance
│   │   ├── tutorRoutes.js           ← POST /query, /feedback
│   │   ├── planRoutes.js            ← POST /generate, GET /
│   │   ├── todoRoutes.js            ← CRUD for daily tasks
│   │   ├── srsRoutes.js             ← GET /due, POST /review, /create, GET /stats
│   │   ├── notificationRoutes.js    ← GET /, PUT /:id/read
│   │   ├── leaderboardRoutes.js     ← GET /
│   │   ├── assignmentRoutes.js      ← POST /, GET /
│   │   ├── studySessionRoutes.js    ← POST /start, /end, GET /
│   │   ├── xpRoutes.js              ← POST /award, GET /level
│   │   ├── mistakeRoutes.js         ← GET /, POST /, PUT /:id/resolve
│   │   ├── examRoutes.js            ← POST /start, /submit, GET /history
│   │   └── intelligenceRoutes.js    ← Proxy routes to Python AI service
│   │
│   ├── 📂 middleware/               ← Express middleware
│   │   ├── authMiddleware.js        ← JWT verification — attaches req.user
│   │   └── roleMiddleware.js        ← Role-based access control check
│   │
│   ├── 📂 services/                 ← Shared service utilities
│   │   ├── aiService.js             ← Axios client pre-configured for Python AI service
│   │   ├── curriculumEngine.js      ← Generates learning content per skill
│   │   └── supabaseClient.js        ← Supabase client (legacy/optional)
│   │
│   └── 📂 utils/
│       └── sendEmail.js             ← Nodemailer helper for Gmail SMTP
│
├── 📂 ai-service/                   ← Python FastAPI AI microservice
│   ├── 📄 main.py                   ← FastAPI app entry — registers all routers, CORS
│   ├── 📄 requirements.txt          ← Python package dependencies
│   ├── 📄 .env                      ← MONGODB_URI, GEMINI_API_KEY (gitignored)
│   ├── 📄 README.md                 ← AI service documentation
│   │
│   ├── 📂 routers/                  ← FastAPI route handlers
│   │   ├── knowledge_tracing.py     ← POST /mastery/update — BKT computation
│   │   ├── recommendation.py        ← POST /recommend, GET /knowledge-graph/{id}
│   │   ├── tutor.py                 ← POST /tutor/query — Gemini streaming SSE
│   │   ├── plan.py                  ← POST /plan/generate
│   │   └── intelligence.py          ← POST /intelligence/* — all widget endpoints
│   │
│   ├── 📂 core/                     ← Core ML algorithm implementations
│   │   ├── bkt_model.py             ← Bayesian Knowledge Tracing (4-parameter model)
│   │   ├── knowledge_graph.py       ← NetworkX DAG builder — cached at startup
│   │   ├── recommendation_engine.py ← Weighted skill scoring and ranking
│   │   ├── plan_generator.py        ← Topological sort + weekly scheduling
│   │   ├── __init__.py
│   │   └── README.md                ← Deep-dive algorithm documentation
│   │
│   ├── 📂 services/                 ← Supporting ML services
│   │   ├── predictive_model.py      ← Student risk score computation
│   │   ├── question_generator.py    ← Rule-based question generation
│   │   └── learning_style_model.py  ← VARK learning style detection
│   │
│   └── 📂 models/
│       ├── schemas.py               ← Pydantic request/response schemas
│       └── __init__.py
│
└── 📂 frontend/                     ← React 18 + Vite SPA
    ├── 📄 index.html                ← HTML entry point
    ├── 📄 package.json              ← Dependencies and scripts
    ├── 📄 vite.config.js            ← Vite build configuration
    ├── 📄 tailwind.config.js        ← Tailwind CSS configuration
    ├── 📄 postcss.config.js         ← PostCSS configuration
    ├── 📄 .env                      ← VITE_API_URL (gitignored)
    ├── 📄 README.md                 ← Frontend documentation
    │
    └── 📂 src/
        ├── 📄 App.jsx               ← Root component — React Router setup
        ├── 📄 main.jsx              ← React DOM entry point
        ├── 📄 index.css             ← Global styles + Tailwind directives
        │
        ├── 📂 pages/                ← Full-page route components
        │   ├── Dashboard.jsx        ← Main student dashboard with 3D cards
        │   ├── Login.jsx            ← Login form
        │   ├── Register.jsx         ← Registration form
        │   ├── Assessment.jsx       ← Adaptive quiz interface
        │   ├── Learning.jsx         ← Learning content viewer
        │   ├── KnowledgeGraph.jsx   ← React Flow skill graph
        │   ├── SRSReview.jsx        ← Spaced repetition card review
        │   ├── MistakeJournal.jsx   ← Mistake review and resolution
        │   ├── ExamMode.jsx         ← Timed exam interface
        │   ├── LearningPlan.jsx     ← Weekly plan viewer
        │   ├── Analytics.jsx        ← Performance analytics charts
        │   ├── Leaderboard.jsx      ← XP rankings
        │   ├── TeacherDashboard.jsx ← Teacher class overview
        │   └── Profile.jsx          ← Student profile settings
        │
        ├── 📂 components/           ← Reusable UI components
        │   ├── 📂 ai/               ← AI-powered widget components
        │   │   ├── AutoTutorPopup.jsx    ← Floating AI tutor chat
        │   │   ├── BurnoutAlert.jsx      ← Burnout detection banner
        │   │   ├── MotivationBanner.jsx  ← AI-generated motivation message
        │   │   ├── SkillHeatmap.jsx      ← Mastery heatmap visualization
        │   │   └── StudentRiskCard.jsx   ← Risk level indicator card
        │   │
        │   ├── 📂 Analytics/        ← Analytics chart components
        │   │   ├── MasteryChart.jsx      ← Radar/bar chart for mastery
        │   │   └── MasteryTable.jsx      ← Tabular mastery data
        │   │
        │   ├── 📂 Assessment/       ← Assessment UI components
        │   │   └── ProgressBar.jsx       ← Quiz progress indicator
        │   │
        │   ├── StudyStreakCard.jsx   ← Streak display with glow effects
        │   ├── XPProgressBar.jsx    ← XP bar with level badge
        │   ├── WeakSpotRadar.jsx    ← Weak skill radar visualization
        │   └── Navbar.jsx           ← Top navigation bar
        │
        ├── 📂 store/                ← Zustand global state stores
        │   ├── authStore.js         ← Authentication state (user, token)
        │   ├── masteryStore.js      ← Mastery scores state
        │   └── notificationStore.js ← Notification state
        │
        ├── 📂 api/                  ← Axios API client functions
        │   ├── axiosInstance.js     ← Axios instance with JWT interceptor
        │   ├── authApi.js           ← login(), register()
        │   ├── studentApi.js        ← getProfile(), updateProfile()
        │   ├── assessmentApi.js     ← getQuestions(), submitAnswers()
        │   ├── srsApi.js            ← getDueCards(), reviewCard()
        │   ├── tutorApi.js          ← queryTutor() with SSE streaming
        │   └── analyticsApi.js      ← getMastery(), getWeakSpots()
        │
        └── 📂 utils/                ← Frontend utility functions
            ├── xpUtils.js           ← XP to level conversion helpers
            └── dateUtils.js         ← Date formatting helpers</pre>

</body>
