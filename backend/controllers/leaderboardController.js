const StudentMastery = require('../models/StudentMastery');
const Student = require('../models/Student');
const PerformanceLog = require('../models/PerformanceLog');

// GET /api/leaderboard — class leaderboard by avg mastery
exports.getLeaderboard = async (req, res) => {
  // Aggregate mastery scores per student
  const masteryAgg = await StudentMastery.aggregate([
    {
      $group: {
        _id: '$student_id',
        avg_mastery: { $avg: '$mastery_score' },
        skills_tracked: { $sum: 1 },
        skills_mastered: {
          $sum: { $cond: [{ $gte: ['$mastery_score', 0.7] }, 1, 0] },
        },
      },
    },
    { $sort: { avg_mastery: -1 } },
    { $limit: 20 },
  ]);

  // Fetch student names
  const studentIds = masteryAgg.map((m) => m._id);
  const students = await Student.find(
    { _id: { $in: studentIds }, role: 'student' },
    'name career_goal'
  );
  const studentMap = {};
  students.forEach((s) => { studentMap[s._id.toString()] = s; });

  // Fetch total attempts per student
  const attemptsAgg = await PerformanceLog.aggregate([
    { $match: { student_id: { $in: studentIds } } },
    { $group: { _id: '$student_id', total_attempts: { $sum: 1 }, correct: { $sum: { $cond: ['$is_correct', 1, 0] } } } },
  ]);
  const attemptsMap = {};
  attemptsAgg.forEach((a) => { attemptsMap[a._id.toString()] = a; });

  const leaderboard = masteryAgg
    .filter((m) => studentMap[m._id.toString()])
    .map((m, index) => {
      const student = studentMap[m._id.toString()];
      const attempts = attemptsMap[m._id.toString()] || { total_attempts: 0, correct: 0 };
      return {
        rank: index + 1,
        student_id: m._id,
        name: student.name,
        career_goal: student.career_goal || '',
        avg_mastery: Math.round(m.avg_mastery * 100),
        skills_mastered: m.skills_mastered,
        skills_tracked: m.skills_tracked,
        total_attempts: attempts.total_attempts,
        accuracy: attempts.total_attempts > 0
          ? Math.round((attempts.correct / attempts.total_attempts) * 100)
          : 0,
        xp: m.skills_mastered * 100 + Math.round(m.avg_mastery * 500),
      };
    });

  // Find current user's rank
  const myRank = leaderboard.findIndex((l) => l.student_id.toString() === req.user.id);

  res.json({
    success: true,
    leaderboard,
    my_rank: myRank >= 0 ? myRank + 1 : null,
  });
};
