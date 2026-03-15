const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    skill_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode', default: null },
    skill_name: { type: String, default: '' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
    status: { type: String, enum: ['todo', 'in_progress', 'done'], default: 'todo' },
    due_date: { type: Date, default: null },
    is_challenge: { type: Boolean, default: false }, // challenges are auto-generated from plan
    xp_reward: { type: Number, default: 10 }, // gamification points
    completed_at: { type: Date, default: null },
    source: { type: String, enum: ['manual', 'plan', 'quiz'], default: 'manual' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TodoTask', todoTaskSchema);
