const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    type: {
      type: String,
      enum: ['srs_due', 'streak_reminder', 'plan_ready', 'mastery_milestone', 'assignment', 'leaderboard'],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    action_url: { type: String, default: '' }, // e.g. /app/review
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

notificationSchema.index({ student_id: 1, read: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', notificationSchema);
