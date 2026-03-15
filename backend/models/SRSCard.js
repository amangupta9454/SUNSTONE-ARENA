const mongoose = require('mongoose');

// SM-2 Spaced Repetition System card per student per skill
const srsCardSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', required: true },
    // SM-2 fields
    interval: { type: Number, default: 1 },       // days until next review
    repetitions: { type: Number, default: 0 },    // number of successful reviews
    ease_factor: { type: Number, default: 2.5 },  // difficulty multiplier (min 1.3)
    due_date: { type: Date, default: Date.now },   // when to review next
    last_reviewed: { type: Date, default: null },
  },
  { timestamps: true }
);

srsCardSchema.index({ student_id: 1, skill_id: 1 }, { unique: true });
srsCardSchema.index({ student_id: 1, due_date: 1 });

module.exports = mongoose.model('SRSCard', srsCardSchema);
