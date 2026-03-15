const mongoose = require('mongoose');

const skillNodeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    subject: { type: String, required: true }, // e.g. "Math", "Programming", "AI"
    difficulty: { type: Number, min: 1, max: 5, required: true },
    prerequisites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' }], // array of skill IDs
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillNode', skillNodeSchema);
