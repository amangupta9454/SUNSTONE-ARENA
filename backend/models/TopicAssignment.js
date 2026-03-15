const mongoose = require('mongoose');

const topicAssignmentSchema = new mongoose.Schema(
  {
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', required: true },
    message: { type: String, default: '' },
    due_date: { type: Date, default: null },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TopicAssignment', topicAssignmentSchema);
