const mongoose = require('mongoose');

const tutorFeedbackSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    topic: { type: String, required: true },
    question: { type: String, required: true },
    response_snippet: { type: String, default: '' }, // first 200 chars of AI response
    rating: { type: String, enum: ['up', 'down'], required: true },
    mastery_score: { type: Number, default: 0.3 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TutorFeedback', tutorFeedbackSchema);
