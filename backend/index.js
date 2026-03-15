require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./lib/mongodb');

// ─── Routes ───────────────────────────────────────────────────────────────────
const authRoutes          = require('./routes/authRoutes');
const studentRoutes       = require('./routes/studentRoutes');
const assessmentRoutes    = require('./routes/assessmentRoutes');
const learningRoutes      = require('./routes/learningRoutes');
const analyticsRoutes     = require('./routes/analyticsRoutes');
const tutorRoutes         = require('./routes/tutorRoutes');
const planRoutes          = require('./routes/planRoutes');
const todoRoutes          = require('./routes/todoRoutes');
const srsRoutes           = require('./routes/srsRoutes');
const notificationRoutes  = require('./routes/notificationRoutes');
const leaderboardRoutes   = require('./routes/leaderboardRoutes');
const assignmentRoutes    = require('./routes/assignmentRoutes');
const studySessionRoutes  = require('./routes/studySessionRoutes');
const xpRoutes            = require('./routes/xpRoutes');
const mistakeRoutes       = require('./routes/mistakeRoutes');
const examRoutes          = require('./routes/examRoutes');
const intelligenceRoutes  = require('./routes/intelligenceRoutes');

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────


app.use(cors("*"));

// ─── Body + Logging ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Cached DB connection (runs before every request) ─────────────────────────
// connectDB() is idempotent — reuses the cached Mongoose connection on warm
// serverless invocations so we never exhaust the Atlas connection pool.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    res.status(503).json({ success: false, message: 'Database unavailable.' });
  }
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
app.use('/api/student',       studentRoutes);
app.use('/api/assessment',    assessmentRoutes);
app.use('/api/learning',      learningRoutes);
app.use('/api/analytics',     analyticsRoutes);
app.use('/api/tutor',         tutorRoutes);
app.use('/api/plan',          planRoutes);
app.use('/api/todo',          todoRoutes);
app.use('/api/srs',           srsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/leaderboard',   leaderboardRoutes);
app.use('/api/assignments',   assignmentRoutes);
app.use('/api/study-session', studySessionRoutes);
app.use('/api/xp',            xpRoutes);
app.use('/api/mistakes',      mistakeRoutes);
app.use('/api/exam',          examRoutes);
app.use('/api/intelligence',  intelligenceRoutes);

// ─── Health / Root ────────────────────────────────────────────────────────────
app.get('/',       (_req, res) => res.json({ status: 'ok', service: 'edupath-backend' }));
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'edupath-backend', timestamp: new Date() }));

// ─── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// express-async-errors patches Express so async errors reach here automatically
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('❌ Global Error:', err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Local Dev Only ───────────────────────────────────────────────────────────
// Vercel never reaches this block — it imports `module.exports` directly.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() =>
      app.listen(PORT, () =>
        console.log(`🚀 Backend running on http://localhost:${PORT}`)
      )
    )
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    });
}

// Exported as the Vercel serverless handler
module.exports = app;
