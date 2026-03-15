const mongoose = require('mongoose');

const performanceLogSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', required: true },
    is_correct: { type: Boolean, required: true },
    response_time_ms: { type: Number, default: 0 },
    content_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningContent', default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PerformanceLog', performanceLogSchema);
