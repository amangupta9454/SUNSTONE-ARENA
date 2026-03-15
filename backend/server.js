require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./lib/mongodb');

// Import all route files
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const learningRoutes = require('./routes/learningRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const planRoutes = require('./routes/planRoutes');
const todoRoutes = require('./routes/todoRoutes');
const srsRoutes = require('./routes/srsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const studySessionRoutes = require('./routes/studySessionRoutes');
const xpRoutes = require('./routes/xpRoutes');
const mistakeRoutes = require('./routes/mistakeRoutes');
const examRoutes = require('./routes/examRoutes');
const intelligenceRoutes = require('./routes/intelligenceRoutes');

const app = express();

// ─── Allowed Origins ──────────────────────────────────────────────────────────
// Add every origin that should be allowed to call this API.
// FRONTEND_URL in .env must include the protocol (https://...).
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL,          // e.g. https://edupath-ai.netlify.app
  'https://edupath-ai.netlify.app',            // Vite dev server
  'https://edupath-ai.netlify.app',            // CRA / other local dev
].filter(Boolean);                   // drop undefined if env var is missing

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Use 'combined' in production — 'dev' is too noisy for serverless logs
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── DB connection middleware ─────────────────────────────────────────────────
// Runs before every request so the connection is always ready.
// connectDB() is idempotent — it reuses the cached connection if available.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ DB connection failed:', err.message);
    res.status(503).json({ success: false, message: 'Database unavailable.' });
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/plan', planRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/srs', srsRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/study-session', studySessionRoutes);
app.use('/api/xp', xpRoutes);
app.use('/api/mistakes', mistakeRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/intelligence', intelligenceRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'edupath-backend', timestamp: new Date() });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Local Dev Server ─────────────────────────────────────────────────────────
// On Vercel this block is never reached — Vercel imports the exported `app`
// directly as a serverless handler. Locally, this starts the Express server.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Backend running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    });
}
app.get('/', (req, res) => res.send('EduPath API is running'));

// Export the app for Vercel (and any other serverless runtime)
module.exports = app;
