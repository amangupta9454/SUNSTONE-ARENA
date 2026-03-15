const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  saveMistakes,
  getMyMistakes,
  markReviewed,
  addNote,
  recordRetry,
  getSubjects,
} = require('../controllers/mistakeController');

router.use(authMiddleware);

router.post('/bulk', saveMistakes);
router.get('/', getMyMistakes);
router.get('/subjects', getSubjects);
router.patch('/:id/review', markReviewed);
router.patch('/:id/note', addNote);
router.post('/:id/retry', recordRetry);

module.exports = router;
