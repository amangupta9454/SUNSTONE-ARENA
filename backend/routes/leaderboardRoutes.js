const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getLeaderboard } = require('../controllers/leaderboardController');

router.use(authMiddleware);
router.get('/', getLeaderboard);

module.exports = router;
