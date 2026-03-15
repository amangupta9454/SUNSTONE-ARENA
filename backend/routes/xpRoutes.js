const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMyProgress, awardXP, recordDailyLogin } = require('../controllers/xpController');

router.use(authMiddleware);

router.get('/progress', getMyProgress);
router.post('/award', awardXP);
router.post('/daily-login', recordDailyLogin);

module.exports = router;
