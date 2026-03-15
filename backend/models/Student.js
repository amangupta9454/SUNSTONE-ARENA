const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    career_goal: { type: String, default: '' },
    learning_style: { type: String, enum: ['visual', 'reading', 'kinesthetic', ''], default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
