const Notification = require('../models/Notification');
const SRSCard = require('../models/SRSCard');

// GET /api/notifications — get all notifications for current user
exports.getNotifications = async (req, res) => {
  const notifications = await Notification.find({ student_id: req.user.id })
    .sort({ createdAt: -1 })
    .limit(50);

  const unread_count = await Notification.countDocuments({
    student_id: req.user.id,
    read: false,
  });

  res.json({ success: true, notifications, unread_count });
};

// PATCH /api/notifications/:id/read — mark one as read
exports.markRead = async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, student_id: req.user.id },
    { read: true }
  );
  res.json({ success: true });
};

// PATCH /api/notifications/read-all — mark all as read
exports.markAllRead = async (req, res) => {
  await Notification.updateMany({ student_id: req.user.id, read: false }, { read: true });
  res.json({ success: true });
};

// POST /api/notifications/check-srs — check if SRS cards are due and create notification
exports.checkSRS = async (req, res) => {
  const studentId = req.user.id;
  const dueCount = await SRSCard.countDocuments({
    student_id: studentId,
    due_date: { $lte: new Date() },
  });

  if (dueCount > 0) {
    // Only create if no unread SRS notification exists
    const existing = await Notification.findOne({
      student_id: studentId,
      type: 'srs_due',
      read: false,
    });

    if (!existing) {
      await Notification.create({
        student_id: studentId,
        type: 'srs_due',
        title: '🔁 Review Time!',
        message: `You have ${dueCount} skill${dueCount > 1 ? 's' : ''} due for spaced repetition review.`,
        action_url: '/app/review',
        metadata: { count: dueCount },
      });
    }
  }

  res.json({ success: true, due_count: dueCount });
};
