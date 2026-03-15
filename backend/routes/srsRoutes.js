const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getDueCards, submitReview, initCards, getStats } = require('../controllers/srsController');

router.use(authMiddleware);

router.get('/due', getDueCards);
router.get('/stats', getStats);
router.post('/review', submitReview);
router.post('/init', initCards);

module.exports = router;
