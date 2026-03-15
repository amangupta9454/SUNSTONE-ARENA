const StudentMastery = require('../models/StudentMastery');
const PerformanceLog = require('../models/PerformanceLog');
const Student = require('../models/Student');

// GET /api/analytics/export/:student_id
// Returns JSON data formatted for PDF generation on the frontend
exports.exportStudentPDF = async (req, res) => {
  const { student_id } = req.params;

  const [student, masteryRecords, logs] = await Promise.all([
    Student.findById(student_id, 'name email career_goal learning_style createdAt'),
    StudentMastery.find({ student_id }).populate('skill_id', 'name subject difficulty'),
    PerformanceLog.find({ student_id }).sort({ createdAt: -1 }).limit(100),
  ]);

  if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

  const mastery_breakdown = masteryRecords.map((m) => ({
    skill_name: m.skill_id?.name || 'Unknown',
    subject: m.skill_id?.subject || 'General',
    difficulty: m.skill_id?.difficulty || 1,
    mastery_score: Math.round(m.mastery_score * 100),
    status: m.mastery_score >= 0.7 ? 'Mastered' : m.mastery_score >= 0.4 ? 'In Progress' : 'Needs Work',
  }));

  const total_attempts = logs.length;
  const correct = logs.filter((l) => l.is_correct).length;
  const accuracy = total_attempts > 0 ? Math.round((correct / total_attempts) * 100) : 0;
  const avg_mastery = masteryRecords.length > 0
    ? Math.round((masteryRecords.reduce((s, m) => s + m.mastery_score, 0) / masteryRecords.length) * 100)
    : 0;

  res.json({
    success: true,
    report: {
      student: {
        name: student.name,
        email: student.email,
        career_goal: student.career_goal || 'Not set',
        learning_style: student.learning_style || 'Not set',
        joined: student.createdAt,
      },
      summary: {
        avg_mastery,
        skills_mastered: mastery_breakdown.filter((m) => m.status === 'Mastered').length,
        skills_in_progress: mastery_breakdown.filter((m) => m.status === 'In Progress').length,
        total_attempts,
        accuracy,
      },
      mastery_breakdown,
      generated_at: new Date(),
    },
  });
};
