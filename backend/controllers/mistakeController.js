const MistakeJournal = require('../models/MistakeJournal');
const AssessmentQuestion = require('../models/AssessmentQuestion');

// ─── SAVE MISTAKES (bulk) ─────────────────────────────────────────────────────
// POST /api/mistakes/bulk
// Called after assessment/quiz submission with the list of wrong answers
const saveMistakes = async (req, res) => {
  const studentId = req.user.id;
  const { mistakes } = req.body;
  // mistakes: [{ question_id, skill_id, subject, selected_option }]

  if (!Array.isArray(mistakes) || mistakes.length === 0) {
    return res.status(400).json({ success: false, message: 'mistakes array is required.' });
  }

  // Fetch full question data for snapshots
  const questionIds = mistakes.map((m) => m.question_id);
  const questions = await AssessmentQuestion.find({ _id: { $in: questionIds } })
    .populate('skill_id', 'name subject');

  const qMap = {};
  questions.forEach((q) => { qMap[q._id.toString()] = q; });

  const ops = mistakes.map((m) => {
    const q = qMap[m.question_id];
    if (!q) return null;
    return {
      updateOne: {
        filter: { student_id: studentId, question_id: m.question_id },
        update: {
          $setOnInsert: {
            student_id: studentId,
            question_id: m.question_id,
            skill_id: m.skill_id || q.skill_id?._id,
            subject: m.subject || q.skill_id?.subject || '',
            question_text: q.question_text,
            options: { a: q.option_a, b: q.option_b, c: q.option_c, d: q.option_d },
            correct_option: q.correct_option,
            selected_option: m.selected_option,
          },
        },
        upsert: true,
      },
    };
  }).filter(Boolean);

  if (ops.length > 0) {
    await MistakeJournal.bulkWrite(ops);
  }

  console.log(`📖 Saved ${ops.length} mistakes for student ${studentId}`);
  res.status(201).json({ success: true, saved: ops.length });
};

// ─── GET MY MISTAKES ──────────────────────────────────────────────────────────
// GET /api/mistakes?subject=Math&reviewed=false
const getMyMistakes = async (req, res) => {
  const studentId = req.user.id;
  const { subject, reviewed } = req.query;

  const filter = { student_id: studentId };
  if (subject) filter.subject = subject;
  if (reviewed !== undefined) filter.is_reviewed = reviewed === 'true';

  const mistakes = await MistakeJournal.find(filter).sort({ createdAt: -1 });

  res.json({ success: true, total: mistakes.length, mistakes });
};

// ─── MARK AS REVIEWED ─────────────────────────────────────────────────────────
// PATCH /api/mistakes/:id/review
const markReviewed = async (req, res) => {
  const studentId = req.user.id;
  const { id } = req.params;

  const mistake = await MistakeJournal.findOneAndUpdate(
    { _id: id, student_id: studentId },
    { is_reviewed: true, reviewed_at: new Date() },
    { new: true }
  );

  if (!mistake) {
    return res.status(404).json({ success: false, message: 'Mistake not found.' });
  }

  res.json({ success: true, mistake });
};

// ─── ADD PERSONAL NOTE ────────────────────────────────────────────────────────
// PATCH /api/mistakes/:id/note
const addNote = async (req, res) => {
  const studentId = req.user.id;
  const { id } = req.params;
  const { note } = req.body;

  const mistake = await MistakeJournal.findOneAndUpdate(
    { _id: id, student_id: studentId },
    { personal_note: note || '' },
    { new: true }
  );

  if (!mistake) {
    return res.status(404).json({ success: false, message: 'Mistake not found.' });
  }

  res.json({ success: true, mistake });
};

// ─── RECORD RETRY ─────────────────────────────────────────────────────────────
// POST /api/mistakes/:id/retry
// Body: { selected_option }
const recordRetry = async (req, res) => {
  const studentId = req.user.id;
  const { id } = req.params;
  const { selected_option } = req.body;

  const mistake = await MistakeJournal.findOne({ _id: id, student_id: studentId });
  if (!mistake) {
    return res.status(404).json({ success: false, message: 'Mistake not found.' });
  }

  const is_correct = selected_option === mistake.correct_option;
  mistake.retry_count += 1;
  mistake.last_retry_correct = is_correct;
  if (is_correct) {
    mistake.is_reviewed = true;
    mistake.reviewed_at = new Date();
  }
  await mistake.save();

  res.json({ success: true, is_correct, mistake });
};

// ─── GET SUBJECTS LIST ────────────────────────────────────────────────────────
// GET /api/mistakes/subjects
const getSubjects = async (req, res) => {
  const studentId = req.user.id;
  const subjects = await MistakeJournal.distinct('subject', { student_id: studentId });
  res.json({ success: true, subjects });
};

module.exports = { saveMistakes, getMyMistakes, markReviewed, addNote, recordRetry, getSubjects };
