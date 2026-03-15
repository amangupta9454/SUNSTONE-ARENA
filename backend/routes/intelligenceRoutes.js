const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const {
  getStudentRisk,
  getClassRisk,
  getCurriculumRecommendation,
  generateQuestions,
  getLearningStyle,
  getBurnoutRisk,
  getMotivationMessage,
  getSkillHeatmap,
} = require('../controllers/intelligenceController');

router.use(authMiddleware);

// Student routes
router.get('/student-risk', getStudentRisk);
router.get('/curriculum', getCurriculumRecommendation);
router.post('/generate-questions', generateQuestions);
router.get('/learning-style', getLearningStyle);
router.get('/burnout', getBurnoutRisk);
router.get('/motivation', getMotivationMessage);
router.get('/heatmap', getSkillHeatmap);

// Teacher routes
router.get('/class-risk', requireRole('teacher'), getClassRisk);

module.exports = router;
