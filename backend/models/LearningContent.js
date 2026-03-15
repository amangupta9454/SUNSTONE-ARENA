const mongoose = require('mongoose');

const learningContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', required: true },
    type: { type: String, enum: ['video', 'article', 'quiz'], required: true },
    difficulty: { type: Number, min: 1, max: 5, required: true },
    url: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningContent', learningContentSchema);
