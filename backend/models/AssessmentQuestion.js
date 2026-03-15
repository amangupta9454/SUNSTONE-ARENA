const mongoose = require('mongoose');

const assessmentQuestionSchema = new mongoose.Schema(
  {
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', required: true },
    question_text: { type: String, required: true },
    option_a: { type: String, required: true },
    option_b: { type: String, required: true },
    option_c: { type: String, required: true },
    option_d: { type: String, required: true },
    correct_option: { type: String, enum: ['a', 'b', 'c', 'd'], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AssessmentQuestion', assessmentQuestionSchema);
