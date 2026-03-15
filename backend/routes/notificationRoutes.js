const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getNotifications, markRead, markAllRead, checkSRS } = require('../controllers/notificationController');

router.use(authMiddleware);

router.get('/', getNotifications);
router.patch('/:id/read', markRead);
router.patch('/read-all', markAllRead);
router.post('/check-srs', checkSRS);

module.exports = router;
