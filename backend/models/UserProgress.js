const mongoose = require('mongoose');

// Tracks XP, level, and study streak per student
const userProgressSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    study_streak: { type: Number, default: 0 },       // consecutive days studied
    longest_streak: { type: Number, default: 0 },
    last_active_date: { type: Date, default: null },   // date of last study activity (date only, no time)
    total_sessions: { type: Number, default: 0 },
    total_correct: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// XP thresholds per level
userProgressSchema.statics.LEVELS = [
  { level: 1, min_xp: 0 },
  { level: 2, min_xp: 200 },
  { level: 3, min_xp: 500 },
  { level: 4, min_xp: 1000 },
  { level: 5, min_xp: 2000 },
  { level: 6, min_xp: 3500 },
  { level: 7, min_xp: 5500 },
  { level: 8, min_xp: 8000 },
];

// Compute level from XP
userProgressSchema.statics.computeLevel = function (xp) {
  const levels = this.LEVELS;
  let level = 1;
  for (const l of levels) {
    if (xp >= l.min_xp) level = l.level;
  }
  return level;
};

module.exports = mongoose.model('UserProgress', userProgressSchema);
