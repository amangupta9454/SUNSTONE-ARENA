const Student = require('../models/Student');
const StudentMastery = require('../models/StudentMastery');

// ─── GET PROFILE ──────────────────────────────────────────────────────────────
// GET /api/student/profile
// Returns the logged-in student's profile + their full mastery map with skill names
const getProfile = async (req, res) => {
  const studentId = req.user.id;

  // Fetch student document (exclude password hash)
  const student = await Student.findById(studentId).select('-password_hash');
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found.' });
  }

  // Fetch all mastery records for this student, and populate skill name/subject/difficulty
  const masteryRecords = await StudentMastery.find({ student_id: studentId })
    .populate('skill_id', 'name subject difficulty');

  // Format mastery map into a clean array
  const mastery_map = masteryRecords.map((m) => ({
    skill_id: m.skill_id._id,
    skill_name: m.skill_id.name,
    subject: m.skill_id.subject,
    difficulty: m.skill_id.difficulty,
    mastery_score: m.mastery_score,
  }));

  console.log(`📊 Profile fetched for student: ${student.email}`);

  res.json({
    success: true,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      career_goal: student.career_goal,
      learning_style: student.learning_style,
      createdAt: student.createdAt,
    },
    mastery_map,
  });
};

// ─── UPDATE PROFILE ───────────────────────────────────────────────────────────
// PUT /api/student/profile
// Body: { career_goal?, learning_style? }
const updateProfile = async (req, res) => {
  const studentId = req.user.id;
  const { career_goal, learning_style } = req.body;

  // Build update object with only provided fields
  const updates = {};
  if (career_goal !== undefined) updates.career_goal = career_goal;
  if (learning_style !== undefined) updates.learning_style = learning_style;

  const student = await Student.findByIdAndUpdate(
    studentId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password_hash');

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found.' });
  }

  console.log(`✅ Profile updated for student: ${student.email}`);

  res.json({
    success: true,
    message: 'Profile updated successfully.',
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      career_goal: student.career_goal,
      learning_style: student.learning_style,
    },
  });
};

module.exports = { getProfile, updateProfile };
