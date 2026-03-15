const mongoose = require('mongoose');

// Tracks an active or completed exam session with countdown state
const examSessionSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    exam_name: { type: String, default: 'Practice Exam' },
    duration_seconds: { type: Number, required: true },   // total allowed time
    started_at: { type: Date, required: true },
    submitted_at: { type: Date, default: null },
    auto_submitted: { type: Boolean, default: false },    // true if timer ran out
    status: { type: String, enum: ['active', 'submitted', 'abandoned'], default: 'active' },
    // Snapshot of answers saved every 30 seconds
    progress_snapshot: [
      {
        question_id: mongoose.Schema.Types.ObjectId,
        selected_option: String,
        saved_at: Date,
      },
    ],
    // Final answers at submission
    final_answers: [
      {
        question_id: mongoose.Schema.Types.ObjectId,
        skill_id: mongoose.Schema.Types.ObjectId,
        selected_option: String,
      },
    ],
    score: { type: Number, default: null },
    total_questions: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ExamSession', examSessionSchema);
