const StudySession = require('../models/StudySession');
const PerformanceLog = require('../models/PerformanceLog');
const UserProgress = require('../models/UserProgress');

// ─── SAVE STUDY SESSION ───────────────────────────────────────────────────────
// POST /api/study-session
// Called after every quiz/assessment submission with result data
const saveStudySession = async (req, res) => {
  const studentId = req.user.id;
  const {
    session_type = 'quiz',
    // Primary field names
    total_questions,
    correct_answers,
    time_spent_seconds = 0,
    difficulty_breakdown = {},
    subject_scores = [],
    // Legacy/alias field names (from older callers)
    questions_attempted,
    accuracy,
    duration_minutes,
  } = req.body;

  // Resolve aliases
  const resolvedTotal = total_questions ?? questions_attempted;
  const resolvedCorrect = correct_answers ?? (accuracy != null && resolvedTotal != null ? Math.round(accuracy * resolvedTotal / 100) : null);
  const resolvedTime = time_spent_seconds || (duration_minutes != null ? duration_minutes * 60 : 0);

  if (resolvedTotal == null || resolvedCorrect == null) {
    return res.status(400).json({ success: false, message: 'total_questions and correct_answers are required.' });
  }

  const incorrect_answers = resolvedTotal - resolvedCorrect;
  const accuracy_percentage = resolvedTotal > 0
    ? parseFloat(((resolvedCorrect / resolvedTotal) * 100).toFixed(1))
    : 0;

  // Generate AI-style feedback based on accuracy
  const ai_feedback = generateFeedback(accuracy_percentage, difficulty_breakdown);

  // Suggest topics from subject_scores where accuracy < 60%
  const suggested_topics = subject_scores
    .filter((s) => s.accuracy < 60)
    .map((s) => s.subject);

  const session = await StudySession.create({
    student_id: studentId,
    session_type,
    total_questions: resolvedTotal,
    correct_answers: resolvedCorrect,
    incorrect_answers,
    accuracy_percentage,
    time_spent_seconds: resolvedTime,
    difficulty_breakdown: {
      easy: difficulty_breakdown.easy || 0,
      medium: difficulty_breakdown.medium || 0,
      hard: difficulty_breakdown.hard || 0,
    },
    ai_feedback,
    suggested_topics,
    subject_scores,
  });

  console.log(`📚 Study session saved for student ${studentId}: ${accuracy_percentage}% accuracy`);

  res.status(201).json({ success: true, session });
};

// ─── GET SESSION HISTORY ──────────────────────────────────────────────────────
// GET /api/study-session/history
// Returns last 20 sessions with trend data
const getSessionHistory = async (req, res) => {
  const studentId = req.user.id;

  const sessions = await StudySession.find({ student_id: studentId })
    .sort({ createdAt: -1 })
    .limit(20);

  // Build trend: accuracy over time (oldest first for chart)
  const trend = [...sessions].reverse().map((s) => ({
    date: s.createdAt,
    accuracy: s.accuracy_percentage,
    session_type: s.session_type,
  }));

  res.json({ success: true, sessions, trend });
};

// ─── GET LATEST SESSION ───────────────────────────────────────────────────────
// GET /api/study-session/latest
const getLatestSession = async (req, res) => {
  const studentId = req.user.id;

  const session = await StudySession.findOne({ student_id: studentId })
    .sort({ createdAt: -1 });

  if (!session) {
    return res.status(404).json({ success: false, message: 'No sessions found.' });
  }

  // Fetch previous session for comparison
  const previous = await StudySession.findOne({
    student_id: studentId,
    _id: { $ne: session._id },
  }).sort({ createdAt: -1 });

  const trend_delta = previous
    ? parseFloat((session.accuracy_percentage - previous.accuracy_percentage).toFixed(1))
    : null;

  res.json({ success: true, session, trend_delta });
};

// ─── HELPER: Generate feedback text ──────────────────────────────────────────
function generateFeedback(accuracy, breakdown) {
  if (accuracy >= 90) {
    return 'Outstanding performance! You have a strong grasp of the material. Keep challenging yourself with harder topics.';
  } else if (accuracy >= 75) {
    return 'Great work! You are performing well. Focus on the topics you missed to push toward mastery.';
  } else if (accuracy >= 60) {
    return 'Good effort. There are some gaps in your understanding. Review the incorrect answers and revisit those topics.';
  } else if (accuracy >= 40) {
    return 'You are making progress, but several areas need attention. Spend more time on weak topics before retrying.';
  } else {
    return 'This topic needs significant review. Consider going back to the learning materials and practicing with easier questions first.';
  }
}

module.exports = { saveStudySession, getSessionHistory, getLatestSession };
