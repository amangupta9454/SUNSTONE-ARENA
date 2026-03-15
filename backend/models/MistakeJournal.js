const mongoose = require('mongoose');

// Stores incorrect answers for later revision
const mistakeJournalSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AssessmentQuestion', required: true },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' },
    subject: { type: String, default: '' },
    // Snapshot of question data so it's readable even if original is deleted
    question_text: { type: String, required: true },
    options: {
      a: String,
      b: String,
      c: String,
      d: String,
    },
    correct_option: { type: String },
    selected_option: { type: String },   // what the student answered
    // Revision state
    is_reviewed: { type: Boolean, default: false },
    reviewed_at: { type: Date, default: null },
    personal_note: { type: String, default: '' },
    retry_count: { type: Number, default: 0 },
    last_retry_correct: { type: Boolean, default: null },
  },
  { timestamps: true }
);

// Prevent duplicate entries for the same question per student
mistakeJournalSchema.index({ student_id: 1, question_id: 1 }, { unique: true });

module.exports = mongoose.model('MistakeJournal', mistakeJournalSchema);
