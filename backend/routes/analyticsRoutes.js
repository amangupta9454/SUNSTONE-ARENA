const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const {
  getStudentAnalytics,
  getClassAnalytics,
  getWeakSpots,
  getCognitiveLoad,
  getOptimalStudyTime,
  getPrereqGaps,
  getQuestionDifficulty,
  logDistractionEvent,
  getDistractionReport,
} = require('../controllers/analyticsController');
const { exportStudentPDF } = require('../controllers/exportController');

router.use(authMiddleware);

// ── Student-accessible ────────────────────────────────────────────────────────
router.get('/weak-spots', getWeakSpots);
router.get('/cognitive-load', getCognitiveLoad);
router.get('/optimal-time', getOptimalStudyTime);
router.get('/prereq-gaps', getPrereqGaps);
router.get('/question-difficulty', getQuestionDifficulty);
router.post('/distraction', logDistractionEvent);
router.get('/distraction-report', getDistractionReport);

// ── Teacher-only ──────────────────────────────────────────────────────────────
router.get('/student/:student_id', requireRole('teacher'), getStudentAnalytics);
router.get('/class', requireRole('teacher'), getClassAnalytics);
router.get('/export/:student_id', requireRole('teacher'), exportStudentPDF);

module.exports = router;
