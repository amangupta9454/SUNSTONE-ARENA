const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { startAssessment, submitAssessment } = require('../controllers/assessmentController');

router.use(authMiddleware);

router.get('/start', startAssessment);
router.post('/submit', submitAssessment);

module.exports = router;
