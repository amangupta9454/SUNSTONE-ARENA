const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getLearningPath,
  getNextTopic,
  getContent,
  completeContent,
  getKnowledgeGraphData,
} = require('../controllers/learningController');

router.use(authMiddleware);

router.get('/path', getLearningPath);
router.get('/next-topic', getNextTopic);
router.get('/content/:skill_id', getContent);
router.post('/complete', completeContent);
router.get('/graph', getKnowledgeGraphData);

module.exports = router;
