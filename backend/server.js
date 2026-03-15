require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

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

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev')); // logs every request to console: GET /api/auth/login 200 12ms

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

// ─── Global Error Handler ─────────────────────────────────────────────────────
// This catches any error thrown anywhere in the app (thanks to express-async-errors)
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Database + Server Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
