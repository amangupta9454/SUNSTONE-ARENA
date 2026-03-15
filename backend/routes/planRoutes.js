const express = require('express');
const router = express.Router();
const { generatePlan, getPlan } = require('../controllers/planController');
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.use(authMiddleware); // all plan routes require login
router.use(requireRole('student')); // only students have plans

router.post('/generate', generatePlan);
router.get('/', getPlan);

module.exports = router;
