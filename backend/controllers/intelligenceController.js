// controllers/intelligenceController.js
// Handles: student risk, curriculum engine, question generation, learning style, burnout, motivation

const axios = require('axios');
const StudentMastery = require('../models/StudentMastery');
const PerformanceLog = require('../models/PerformanceLog');
const StudySession = require('../models/StudySession');
const UserProgress = require('../models/UserProgress');
const { computeCurriculumPriority } = require('../services/curriculumEngine');
const { sendEmail } = require('../utils/sendEmail');

const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// ── Helper: call Python AI service ───────────────────────────────────────────
const callAI = async (path, data) => {
  const res = await axios.post(`${AI_SERVICE}${path}`, data, { timeout: 10000 });
  return res.data;
};

// ─── STUDENT RISK PREDICTION ──────────────────────────────────────────────────
// GET /api/intelligence/student-risk
const getStudentRisk = async (req, res) => {
  const studentId = req.user.id;

  // Gather inputs from MongoDB
  const sessions = await StudySession.find({ student_id: studentId }).sort({ createdAt: -1 }).limit(10);
  const masteryRecords = await StudentMastery.find({ student_id: studentId });
  const progress = await UserProgress.findOne({ student_id: studentId });

  const accuracy_history = sessions.map((s) => s.accuracy_percentage).reverse();
  const avg_mastery = masteryRecords.length > 0
    ? masteryRecords.reduce((s, m) => s + m.mastery_score, 0) / masteryRecords.length
    : 0.3;

  // Streak gap: days since last active
  let streak_gap_days = 0;
  if (progress?.last_active_date) {
    const diff = Date.now() - new Date(progress.last_active_date).getTime();
    streak_gap_days = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Retry rate from performance logs
  const totalLogs = await PerformanceLog.countDocuments({ student_id: studentId });
  const incorrectLogs = await PerformanceLog.countDocuments({ student_id: studentId, is_correct: false });
  const retry_rate = totalLogs > 0 ? incorrectLogs / totalLogs : 0.2;

  const payload = {
    student_id: studentId,
    accuracy_history,
    avg_response_time_ms: 3000,
    focus_score: 70,
    streak_gap_days,
    cognitive_load_ratio: 1.0,
    retry_rate,
    avg_mastery,
  };

  const result = await callAI('/intelligence/student-risk', payload);
  res.json({ success: true, ...result });
};

// ─── CLASS RISK (Teacher) ─────────────────────────────────────────────────────
// GET /api/intelligence/class-risk
const getClassRisk = async (req, res) => {
  const Student = require('../models/Student');
  const students = await Student.find({ role: 'student' }).select('_id name email');

  const riskData = await Promise.all(students.map(async (student) => {
    const sessions = await StudySession.find({ student_id: student._id }).sort({ createdAt: -1 }).limit(5);
    const masteryRecords = await StudentMastery.find({ student_id: student._id });
    const progress = await UserProgress.findOne({ student_id: student._id });

    const accuracy_history = sessions.map((s) => s.accuracy_percentage).reverse();
    const avg_mastery = masteryRecords.length > 0
      ? masteryRecords.reduce((s, m) => s + m.mastery_score, 0) / masteryRecords.length : 0.3;

    let streak_gap_days = 0;
    if (progress?.last_active_date) {
      streak_gap_days = Math.floor((Date.now() - new Date(progress.last_active_date).getTime()) / 86400000);
    }

    const totalLogs = await PerformanceLog.countDocuments({ student_id: student._id });
    const incorrectLogs = await PerformanceLog.countDocuments({ student_id: student._id, is_correct: false });
    const retry_rate = totalLogs > 0 ? incorrectLogs / totalLogs : 0.2;

    try {
      const result = await callAI('/intelligence/student-risk', {
        student_id: student._id.toString(),
        accuracy_history,
        avg_response_time_ms: 3000,
        focus_score: 70,
        streak_gap_days,
        cognitive_load_ratio: 1.0,
        retry_rate,
        avg_mastery,
      });
      return { student_id: student._id, name: student.name, email: student.email, ...result };
    } catch {
      return { student_id: student._id, name: student.name, email: student.email, risk_score: 0, risk_level: 'low' };
    }
  }));

  // Sort by risk score descending
  riskData.sort((a, b) => (b.risk_score || 0) - (a.risk_score || 0));
  res.json({ success: true, students: riskData });
};

// ─── CURRICULUM RECOMMEND ─────────────────────────────────────────────────────
// GET /api/intelligence/curriculum
const getCurriculumRecommendation = async (req, res) => {
  const studentId = req.user.id;
  const prioritized = await computeCurriculumPriority(studentId);
  res.json({ success: true, curriculum: prioritized, total: prioritized.length });
};

// ─── GENERATE QUESTIONS ───────────────────────────────────────────────────────
// POST /api/intelligence/generate-questions
const generateQuestions = async (req, res) => {
  const { topic, subject = 'General', difficulty = 3, count = 5 } = req.body;
  if (!topic) return res.status(400).json({ success: false, message: 'topic is required' });

  const result = await callAI('/intelligence/generate-questions', {
    topic, subject, difficulty, count: Math.min(count, 10),
    past_mistakes: [], mastery_score: 0.5,
  });
  res.json(result);
};

// ─── LEARNING STYLE ───────────────────────────────────────────────────────────
// GET /api/intelligence/learning-style
const getLearningStyle = async (req, res) => {
  const studentId = req.user.id;

  const sessions = await StudySession.find({ student_id: studentId }).sort({ createdAt: -1 }).limit(20);
  const totalLogs = await PerformanceLog.countDocuments({ student_id: studentId });
  const incorrectLogs = await PerformanceLog.countDocuments({ student_id: studentId, is_correct: false });

  const quiz_frequency = sessions.length > 0 ? sessions.length / 4 : 1; // per week approx
  const retry_rate = totalLogs > 0 ? incorrectLogs / totalLogs : 0.2;
  const avg_session_length_min = sessions.length > 0
    ? sessions.reduce((s, sess) => s + (sess.time_spent_seconds || 1200) / 60, 0) / sessions.length
    : 20;

  // Accuracy improvement: last 5 vs previous 5
  const accs = sessions.map((s) => s.accuracy_percentage);
  const recent = accs.slice(0, 5);
  const older = accs.slice(5, 10);
  const accuracy_improvement = recent.length > 0 && older.length > 0
    ? (recent.reduce((a, b) => a + b, 0) / recent.length) - (older.reduce((a, b) => a + b, 0) / older.length)
    : 0;

  const result = await callAI('/intelligence/learning-style', {
    student_id: studentId,
    time_spent_reading_pct: 30,
    quiz_frequency,
    video_completion_rate: 50,
    accuracy_improvement,
    avg_session_length_min,
    retry_rate,
  });
  res.json(result);
};

// ─── BURNOUT DETECTION ────────────────────────────────────────────────────────
// GET /api/intelligence/burnout
const getBurnoutRisk = async (req, res) => {
  const studentId = req.user.id;

  const sessions = await StudySession.find({ student_id: studentId }).sort({ createdAt: -1 }).limit(10);

  const session_lengths = sessions.map((s) => (s.time_spent_seconds || 1200) / 60);
  const accuracy_trend = sessions.map((s) => s.accuracy_percentage).reverse();

  // Compute hours between sessions
  const hours_between = [];
  for (let i = 1; i < sessions.length; i++) {
    const diff = new Date(sessions[i - 1].createdAt) - new Date(sessions[i].createdAt);
    hours_between.push(Math.abs(diff) / 3600000);
  }

  const result = await callAI('/intelligence/burnout-detection', {
    student_id: studentId,
    session_lengths,
    accuracy_trend,
    focus_scores: [],
    hours_between_sessions: hours_between,
  });
  res.json(result);
};

// ─── MOTIVATION ENGINE ────────────────────────────────────────────────────────
// GET /api/intelligence/motivation
const getMotivationMessage = async (req, res) => {
  const studentId = req.user.id;

  const progress = await UserProgress.findOne({ student_id: studentId });
  const sessions = await StudySession.find({ student_id: studentId }).sort({ createdAt: -1 }).limit(5);
  const masteryRecords = await StudentMastery.find({ student_id: studentId });

  const messages = [];

  // Streak milestone
  if (progress?.study_streak >= 7) {
    messages.push({ type: 'streak', text: `🔥 Amazing! You've maintained a ${progress.study_streak}-day study streak!`, icon: '🔥' });
  } else if (progress?.study_streak >= 3) {
    messages.push({ type: 'streak', text: `⚡ ${progress.study_streak}-day streak! Keep going — you're building a habit!`, icon: '⚡' });
  }

  // Accuracy improvement
  if (sessions.length >= 2) {
    const latest = sessions[0].accuracy_percentage;
    const prev = sessions[1].accuracy_percentage;
    const delta = latest - prev;
    if (delta >= 10) {
      messages.push({ type: 'improvement', text: `📈 You improved your accuracy by ${delta.toFixed(0)}% in your last session!`, icon: '📈' });
    }
  }

  // Mastery milestone
  const mastered = masteryRecords.filter((m) => m.mastery_score >= 0.7).length;
  if (mastered > 0) {
    messages.push({ type: 'mastery', text: `🏆 You've mastered ${mastered} skill${mastered > 1 ? 's' : ''}! Keep pushing forward.`, icon: '🏆' });
  }

  // XP level up
  if (progress?.level >= 2) {
    messages.push({ type: 'level', text: `⭐ You reached Level ${progress.level}! You've earned ${progress.xp} XP total.`, icon: '⭐' });
  }

  // Default encouragement
  if (messages.length === 0) {
    messages.push({ type: 'default', text: '💪 Every session counts. Take the assessment to start tracking your progress!', icon: '💪' });
  }

  res.json({ success: true, messages, streak: progress?.study_streak || 0, xp: progress?.xp || 0 });
};

// ─── SKILL HEATMAP DATA ───────────────────────────────────────────────────────
// GET /api/intelligence/heatmap
const getSkillHeatmap = async (req, res) => {
  const studentId = req.user.id;

  // Get last 365 days of performance logs
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);

  const logs = await PerformanceLog.find({
    student_id: studentId,
    createdAt: { $gte: since },
  }).select('createdAt is_correct');

  // Aggregate by date (YYYY-MM-DD)
  const dateMap = {};
  for (const log of logs) {
    const date = log.createdAt.toISOString().split('T')[0];
    if (!dateMap[date]) dateMap[date] = { date, count: 0, correct: 0 };
    dateMap[date].count += 1;
    if (log.is_correct) dateMap[date].correct += 1;
  }

  const heatmap = Object.values(dateMap).map((d) => ({
    date: d.date,
    count: d.count,
    accuracy: d.count > 0 ? Math.round((d.correct / d.count) * 100) : 0,
  }));

  heatmap.sort((a, b) => a.date.localeCompare(b.date));

  res.json({ success: true, heatmap, total_days: heatmap.length });
};

module.exports = {
  getStudentRisk,
  getClassRisk,
  getCurriculumRecommendation,
  generateQuestions,
  getLearningStyle,
  getBurnoutRisk,
  getMotivationMessage,
  getSkillHeatmap,
};
