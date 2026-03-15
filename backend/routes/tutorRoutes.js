const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { query } = require('../controllers/tutorController');
const { submitFeedback, getFeedbackStats } = require('../controllers/tutorFeedbackController');

router.use(authMiddleware);

router.post('/query', query);
router.post('/feedback', submitFeedback);
router.get('/feedback/stats', getFeedbackStats);

module.exports = router;
