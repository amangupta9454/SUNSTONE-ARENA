const SRSCard = require('../models/SRSCard');
const StudentMastery = require('../models/StudentMastery');
const SkillNode = require('../models/SkillNode');
const Notification = require('../models/Notification');

// SM-2 algorithm: given quality rating 0-5, update card
function sm2Update(card, quality) {
  // quality: 0-2 = fail, 3-5 = pass
  let { interval, repetitions, ease_factor } = card;

  if (quality >= 3) {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * ease_factor);
    repetitions += 1;
  } else {
    repetitions = 0;
    interval = 1;
  }

  ease_factor = ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease_factor < 1.3) ease_factor = 1.3;

  const due_date = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);
  return { interval, repetitions, ease_factor, due_date, last_reviewed: new Date() };
}

// GET /api/srs/due — get cards due for review today
exports.getDueCards = async (req, res) => {
  const studentId = req.user.id;
  const now = new Date();

  const dueCards = await SRSCard.find({
    student_id: studentId,
    due_date: { $lte: now },
  })
    .populate('skill_id', 'name subject difficulty')
    .sort({ due_date: 1 })
    .limit(20);

  res.json({ success: true, cards: dueCards, count: dueCards.length });
};

// POST /api/srs/review — submit a review result
// Body: { skill_id, quality } — quality 0-5
exports.submitReview = async (req, res) => {
  const studentId = req.user.id;
  const { skill_id, quality } = req.body;

  if (quality === undefined || quality < 0 || quality > 5) {
    return res.status(400).json({ success: false, message: 'quality must be 0-5' });
  }

  let card = await SRSCard.findOne({ student_id: studentId, skill_id });
  if (!card) {
    card = new SRSCard({ student_id: studentId, skill_id });
  }

  const updates = sm2Update(card, quality);
  Object.assign(card, updates);
  await card.save();

  res.json({ success: true, card, next_review: card.due_date });
};

// POST /api/srs/init — initialize SRS cards for all mastered skills
exports.initCards = async (req, res) => {
  const studentId = req.user.id;

  const masteryRecords = await StudentMastery.find({
    student_id: studentId,
    mastery_score: { $gte: 0.5 },
  });

  let created = 0;
  for (const m of masteryRecords) {
    const exists = await SRSCard.findOne({ student_id: studentId, skill_id: m.skill_id });
    if (!exists) {
      await SRSCard.create({
        student_id: studentId,
        skill_id: m.skill_id,
        due_date: new Date(Date.now() + 24 * 60 * 60 * 1000), // due tomorrow
      });
      created++;
    }
  }

  res.json({ success: true, cards_created: created });
};

// GET /api/srs/stats — SRS stats for dashboard
exports.getStats = async (req, res) => {
  const studentId = req.user.id;
  const now = new Date();

  const [total, due, reviewed_today] = await Promise.all([
    SRSCard.countDocuments({ student_id: studentId }),
    SRSCard.countDocuments({ student_id: studentId, due_date: { $lte: now } }),
    SRSCard.countDocuments({
      student_id: studentId,
      last_reviewed: { $gte: new Date(now.setHours(0, 0, 0, 0)) },
    }),
  ]);

  res.json({ success: true, total, due, reviewed_today });
};
