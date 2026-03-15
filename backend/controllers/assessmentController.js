const AssessmentQuestion = require('../models/AssessmentQuestion');
const StudentMastery = require('../models/StudentMastery');
const PerformanceLog = require('../models/PerformanceLog');
const { updateMastery } = require('../services/aiService');

// Helper: shuffle an array randomly (Fisher-Yates algorithm)
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// ─── START ASSESSMENT ─────────────────────────────────────────────────────────
// GET /api/assessment/start
// Adaptive: if student has mastery data, bias question difficulty toward their level
const startAssessment = async (req, res) => {
  const studentId = req.user.id;

  // Check if student has existing mastery data for adaptive difficulty
  const masteryRecords = await StudentMastery.find({ student_id: studentId });
  const avgMastery = masteryRecords.length > 0
    ? masteryRecords.reduce((s, m) => s + m.mastery_score, 0) / masteryRecords.length
    : null;

  // Get all questions and populate skill info
  const allQuestions = await AssessmentQuestion.find()
    .populate('skill_id', 'name subject difficulty');

  if (allQuestions.length === 0) {
    return res.status(404).json({ success: false, message: 'No assessment questions found. Please seed the database.' });
  }

  let selected;
  if (avgMastery !== null) {
    // Adaptive: target difficulty based on mastery (mastery 0→diff 1-2, mastery 1→diff 4-5)
    const targetDiff = Math.round(1 + avgMastery * 4);
    const easy = allQuestions.filter((q) => q.skill_id?.difficulty <= 2);
    const medium = allQuestions.filter((q) => q.skill_id?.difficulty === 3);
    const hard = allQuestions.filter((q) => q.skill_id?.difficulty >= 4);

    // Distribute: 30% easy, 40% medium, 30% hard — shifted by mastery
    const easyCount = Math.max(2, Math.round(20 * (1 - avgMastery) * 0.4));
    const hardCount = Math.max(2, Math.round(20 * avgMastery * 0.4));
    const medCount = 20 - easyCount - hardCount;

    selected = [
      ...shuffleArray(easy).slice(0, easyCount),
      ...shuffleArray(medium).slice(0, medCount),
      ...shuffleArray(hard).slice(0, hardCount),
    ];
    // Fill up to 20 if not enough questions in a category
    if (selected.length < 20) {
      const remaining = shuffleArray(allQuestions.filter((q) => !selected.includes(q)));
      selected = [...selected, ...remaining].slice(0, 20);
    }
    selected = shuffleArray(selected);
  } else {
    // Cold start: shuffle and take 20
    selected = shuffleArray(allQuestions).slice(0, 20);
  }

  // Format response — do NOT include correct_option (that would be cheating!)
  const questions = selected.map((q) => ({
    id: q._id,
    skill_id: q.skill_id._id,
    skill_name: q.skill_id.name,
    subject: q.skill_id.subject,
    difficulty: q.skill_id.difficulty,
    question_text: q.question_text,
    options: {
      a: q.option_a,
      b: q.option_b,
      c: q.option_c,
      d: q.option_d,
    },
  }));

  console.log(`📝 Assessment started for student ${studentId}: ${questions.length} questions (adaptive: ${avgMastery !== null})`);

  res.json({
    success: true,
    total_questions: questions.length,
    questions,
    adaptive: avgMastery !== null,
    target_difficulty: avgMastery !== null ? Math.round(1 + avgMastery * 4) : null,
  });
};

// ─── SUBMIT ASSESSMENT ────────────────────────────────────────────────────────
// POST /api/assessment/submit
// Body: { answers: [{ question_id, skill_id, selected_option, response_time_ms? }] }
const submitAssessment = async (req, res) => {
  const studentId = req.user.id;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ success: false, message: 'Answers array is required.' });
  }

  // Fetch the correct answers for all submitted question IDs
  const questionIds = answers.map((a) => a.question_id);
  const questions = await AssessmentQuestion.find({ _id: { $in: questionIds } });

  // Build a lookup map: questionId -> correct_option
  const correctMap = {};
  questions.forEach((q) => {
    correctMap[q._id.toString()] = q.correct_option;
  });

  // Grade each answer and build the payload for the AI service
  const gradedAnswers = answers.map((a) => {
    const correct = correctMap[a.question_id];
    const is_correct = a.selected_option === correct;
    return {
      skill_id: a.skill_id,
      is_correct,
      response_time_ms: a.response_time_ms || 0,
    };
  });

  // Log performance to DB
  const logDocs = gradedAnswers.map((a) => ({
    student_id: studentId,
    skill_id: a.skill_id,
    is_correct: a.is_correct,
    response_time_ms: a.response_time_ms,
  }));
  await PerformanceLog.insertMany(logDocs);

  // Call Python AI service to run BKT and get updated mastery scores
  const aiResult = await updateMastery(studentId, gradedAnswers);

  // Upsert mastery scores returned by the AI service into MongoDB
  const masteryUpdates = aiResult.mastery_updates || [];
  for (const update of masteryUpdates) {
    await StudentMastery.findOneAndUpdate(
      { student_id: studentId, skill_id: update.skill_id },
      { mastery_score: update.score },
      { upsert: true, new: true }
    );
  }

  // Fetch the full updated mastery map to return
  const fullMastery = await StudentMastery.find({ student_id: studentId })
    .populate('skill_id', 'name subject difficulty');

  const mastery_map = fullMastery.map((m) => ({
    skill_id: m.skill_id._id,
    skill_name: m.skill_id.name,
    mastery_score: m.mastery_score,
  }));

  const score = gradedAnswers.filter((a) => a.is_correct).length;
  console.log(`✅ Assessment submitted: student ${studentId} scored ${score}/${gradedAnswers.length}`);

  res.json({
    success: true,
    score,
    total: gradedAnswers.length,
    percentage: Math.round((score / gradedAnswers.length) * 100),
    mastery_map,
  });
};

module.exports = { startAssessment, submitAssessment };
