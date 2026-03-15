const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { startExam, saveProgress, submitExam, getActiveExam } = require('../controllers/examController');

router.use(authMiddleware);

router.post('/start', startExam);
router.get('/active', getActiveExam);
router.post('/:session_id/progress', saveProgress);
router.post('/:session_id/submit', submitExam);

module.exports = router;
