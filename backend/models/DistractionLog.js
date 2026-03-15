const mongoose = require('mongoose');

// Tracks browser focus/blur events during study sessions
const distractionLogSchema = new mongoose.Schema(
  {
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    session_id: { type: String, default: 'general' }, // exam session ID or 'general'
    events: [
      {
        event_type: {
          type: String,
          enum: ['tab_switch', 'window_blur', 'window_focus', 'copy_attempt'],
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    // Denormalized counts for fast aggregation
    event_counts: {
      tab_switch: { type: Number, default: 0 },
      window_blur: { type: Number, default: 0 },
      window_focus: { type: Number, default: 0 },
      copy_attempt: { type: Number, default: 0 },
    },
    last_event_at: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DistractionLog', distractionLogSchema);
