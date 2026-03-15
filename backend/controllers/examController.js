const ExamSession = require('../models/ExamSession');
const AssessmentQuestion = require('../models/AssessmentQuestion');
const StudentMastery = require('../models/StudentMastery');
const PerformanceLog = require('../models/PerformanceLog');

// ─── START EXAM ───────────────────────────────────────────────────────────────
// POST /api/exam/start
// Body: { exam_name, duration_seconds, question_count }
const startExam = async (req, res) => {
  const studentId = req.user.id;
  const { exam_name = 'Practice Exam', duration_seconds = 1800, question_count = 20 } = req.body;

  // Check if student already has an active exam
  const existing = await ExamSession.findOne({ student_id: studentId, status: 'active' });
  if (existing) {
    return res.json({ success: true, resumed: true, session: existing });
  }

  // Fetch questions
  const allQuestions = await AssessmentQuestion.find()
    .populate('skill_id', 'name subject difficulty');

  if (allQuestions.length === 0) {
    return res.status(404).json({ success: false, message: 'No questions available.' });
  }

  // Shuffle and pick
  const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, question_count);

  const session = await ExamSession.create({
    student_id: studentId,
    exam_name,
    duration_seconds,
    started_at: new Date(),
    total_questions: shuffled.length,
    status: 'active',
  });

  // Return questions without correct answers
  const questions = shuffled.map((q) => ({
    id: q._id,
    skill_id: q.skill_id._id,
    skill_name: q.skill_id.name,
    subject: q.skill_id.subject,
    difficulty: q.skill_id.difficulty,
    question_text: q.question_text,
    options: { a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d },
  }));

  console.log(`🎯 Exam started for student ${studentId}: ${session._id}`);

  res.status(201).json({ success: true, session_id: session._id, session, questions });
};

// ─── SAVE PROGRESS (auto-save every 30s) ─────────────────────────────────────
// POST /api/exam/:session_id/progress
// Body: { answers: [{ question_id, selected_option }] }
const saveProgress = async (req, res) => {
  const studentId = req.user.id;
  const { session_id } = req.params;
  const { answers = [] } = req.body;

  const session = await ExamSession.findOne({ _id: session_id, student_id: studentId, status: 'active' });
  if (!session) {
    return res.status(404).json({ success: false, message: 'Active exam session not found.' });
  }

  // Validate timing — reject if exam time has expired (with 10s grace)
  const elapsed = (Date.now() - session.started_at.getTime()) / 1000;
  if (elapsed > session.duration_seconds + 10) {
    return res.status(400).json({ success: false, message: 'Exam time has expired.' });
  }

  // Overwrite progress snapshot
  session.progress_snapshot = answers.map((a) => ({
    question_id: a.question_id,
    selected_option: a.selected_option,
    saved_at: new Date(),
  }));

  await session.save();

  res.json({ success: true, saved_at: new Date(), answered_count: answers.length });
};

// ─── SUBMIT EXAM ──────────────────────────────────────────────────────────────
// POST /api/exam/:session_id/submit
// Body: { answers: [...], auto_submitted: false }
const submitExam = async (req, res) => {
  const studentId = req.user.id;
  const { session_id } = req.params;
  const { answers = [], auto_submitted = false } = req.body;

  const session = await ExamSession.findOne({ _id: session_id, student_id: studentId });
  if (!session) {
    return res.status(404).json({ success: false, message: 'Exam session not found.' });
  }
  if (session.status === 'submitted') {
    return res.json({ success: true, already_submitted: true, session });
  }

  // Validate timing — allow auto-submit even if slightly over time
  const elapsed = (Date.now() - session.started_at.getTime()) / 1000;
  const isOverTime = elapsed > session.duration_seconds + 30;
  if (isOverTime && !auto_submitted) {
    return res.status(400).json({ success: false, message: 'Submission rejected: time limit exceeded.' });
  }

  // Grade answers
  const questionIds = answers.map((a) => a.question_id);
  const questions = await AssessmentQuestion.find({ _id: { $in: questionIds } });
  const correctMap = {};
  questions.forEach((q) => { correctMap[q._id.toString()] = q.correct_option; });

  let score = 0;
  const gradedAnswers = answers.map((a) => {
    const is_correct = a.selected_option === correctMap[a.question_id];
    if (is_correct) score++;
    return { ...a, is_correct };
  });

  // Log performance
  const logDocs = gradedAnswers.map((a) => ({
    student_id: studentId,
    skill_id: a.skill_id,
    is_correct: a.is_correct,
    response_time_ms: 0,
  }));
  if (logDocs.length > 0) await PerformanceLog.insertMany(logDocs);

  // Update session
  session.status = 'submitted';
  session.submitted_at = new Date();
  session.auto_submitted = auto_submitted;
  session.final_answers = answers;
  session.score = score;
  await session.save();

  console.log(`✅ Exam submitted: student ${studentId}, score ${score}/${session.total_questions}`);

  res.json({
    success: true,
    score,
    total: session.total_questions,
    percentage: Math.round((score / session.total_questions) * 100),
    auto_submitted,
    session,
  });
};

// ─── GET ACTIVE EXAM ──────────────────────────────────────────────────────────
// GET /api/exam/active
const getActiveExam = async (req, res) => {
  const studentId = req.user.id;
  const session = await ExamSession.findOne({ student_id: studentId, status: 'active' });
  res.json({ success: true, session: session || null });
};

module.exports = { startExam, saveProgress, submitExam, getActiveExam };
