const TopicAssignment = require('../models/TopicAssignment');
const Notification = require('../models/Notification');
const Student = require('../models/Student');
const SkillNode = require('../models/SkillNode');

// POST /api/assignments — teacher assigns a topic to a student
exports.createAssignment = async (req, res) => {
  const teacherId = req.user.id;
  const { student_id, skill_id, message, due_date } = req.body;

  if (!student_id || !skill_id) {
    return res.status(400).json({ success: false, message: 'student_id and skill_id are required' });
  }

  const assignment = await TopicAssignment.create({
    teacher_id: teacherId,
    student_id,
    skill_id,
    message: message || '',
    due_date: due_date || null,
  });

  // Fetch skill name for notification
  const skill = await SkillNode.findById(skill_id);
  const teacher = await Student.findById(teacherId, 'name');

  // Notify the student
  await Notification.create({
    student_id,
    type: 'assignment',
    title: '📚 New Topic Assigned',
    message: `${teacher?.name || 'Your teacher'} assigned you: ${skill?.name || 'a new topic'}${message ? ` — "${message}"` : ''}`,
    action_url: `/app/learning/${skill_id}`,
    metadata: { skill_id, assignment_id: assignment._id },
  });

  res.json({ success: true, assignment });
};

// GET /api/assignments/my — student gets their assignments
exports.getMyAssignments = async (req, res) => {
  const assignments = await TopicAssignment.find({ student_id: req.user.id })
    .populate('skill_id', 'name subject difficulty')
    .populate('teacher_id', 'name')
    .sort({ createdAt: -1 });

  res.json({ success: true, assignments });
};

// GET /api/assignments/given — teacher sees assignments they gave
exports.getGivenAssignments = async (req, res) => {
  const assignments = await TopicAssignment.find({ teacher_id: req.user.id })
    .populate('skill_id', 'name subject difficulty')
    .populate('student_id', 'name email')
    .sort({ createdAt: -1 });

  res.json({ success: true, assignments });
};

// PATCH /api/assignments/:id/complete — student marks assignment done
exports.completeAssignment = async (req, res) => {
  await TopicAssignment.findOneAndUpdate(
    { _id: req.params.id, student_id: req.user.id },
    { completed: true }
  );
  res.json({ success: true });
};
