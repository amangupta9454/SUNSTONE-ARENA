const mongoose = require('mongoose');

// Stores a summary of every quiz/assessment attempt
const studySessionSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    session_type: { type: String, enum: ['quiz', 'assessment', 'exam'], default: 'quiz' },
    total_questions: { type: Number, required: true },
    correct_answers: { type: Number, required: true },
    incorrect_answers: { type: Number, required: true },
    accuracy_percentage: { type: Number, required: true },
    time_spent_seconds: { type: Number, default: 0 },
    // Difficulty breakdown: { easy: 5, medium: 8, hard: 7 }
    difficulty_breakdown: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
    },
    // AI-generated feedback text
    ai_feedback: { type: String, default: '' },
    // Topics the AI recommends revising
    suggested_topics: [{ type: String }],
    // Subject-level accuracy snapshot for trend comparison
    subject_scores: [
      {
        subject: String,
        correct: Number,
        total: Number,
        accuracy: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudySession', studySessionSchema);
