const mongoose = require('mongoose');

const studentMasterySchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', required: true },
    mastery_score: { type: Number, default: 0.3, min: 0, max: 1 },
  },
  { timestamps: true }
);

// Ensure one mastery record per student per skill
studentMasterySchema.index({ student_id: 1, skill_id: 1 }, { unique: true });

module.exports = mongoose.model('StudentMastery', studentMasterySchema);
