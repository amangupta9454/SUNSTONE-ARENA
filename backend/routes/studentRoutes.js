const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/studentController');

router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router;
