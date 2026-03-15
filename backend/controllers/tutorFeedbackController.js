const TutorFeedback = require('../models/TutorFeedback');

// POST /api/tutor/feedback — submit thumbs up/down
exports.submitFeedback = async (req, res) => {
  const { topic, question, response_snippet, rating, mastery_score } = req.body;

  if (!topic || !question || !rating) {
    return res.status(400).json({ success: false, message: 'topic, question, and rating are required' });
  }

  const feedback = await TutorFeedback.create({
    student_id: req.user.id,
    topic,
    question,
    response_snippet: response_snippet?.slice(0, 200) || '',
    rating,
    mastery_score: mastery_score || 0.3,
  });

  res.json({ success: true, feedback });
};

// GET /api/tutor/feedback/stats — aggregate feedback stats (for admin/teacher)
exports.getFeedbackStats = async (req, res) => {
  const stats = await TutorFeedback.aggregate([
    {
      $group: {
        _id: '$rating',
        count: { $sum: 1 },
      },
    },
  ]);

  const up = stats.find((s) => s._id === 'up')?.count || 0;
  const down = stats.find((s) => s._id === 'down')?.count || 0;
  const total = up + down;

  res.json({
    success: true,
    up,
    down,
    total,
    satisfaction_rate: total > 0 ? Math.round((up / total) * 100) : null,
  });
};
