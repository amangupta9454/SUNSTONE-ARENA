const mongoose = require('mongoose');

const learningPlanSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    generated_at: { type: Date, default: Date.now },
    overall_score: { type: Number }, // 0-100
    strengths: [{ skill_name: String, mastery_score: Number, subject: String }],
    weaknesses: [{ skill_name: String, mastery_score: Number, subject: String, gap: Number }],
    weekly_plan: [
      {
        week: Number,
        focus: String,
        skills: [String],
        goal: String,
        resources: [String],
      },
    ],
    overcome_strategies: [{ skill_name: String, strategy: String, priority: String }],
    predicted_completion_weeks: Number,
    ml_confidence: Number, // 0-1, how confident the model is in this plan
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningPlan', learningPlanSchema);
