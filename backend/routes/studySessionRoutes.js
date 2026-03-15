const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { saveStudySession, getSessionHistory, getLatestSession } = require('../controllers/studySessionController');

router.use(authMiddleware);

router.post('/', saveStudySession);
router.get('/history', getSessionHistory);
router.get('/latest', getLatestSession);

module.exports = router;
