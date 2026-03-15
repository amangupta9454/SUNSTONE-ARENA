const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { createAssignment, getMyAssignments, getGivenAssignments, completeAssignment } = require('../controllers/assignmentController');

router.use(authMiddleware);

router.post('/', requireRole('teacher'), createAssignment);
router.get('/my', getMyAssignments);
router.get('/given', requireRole('teacher'), getGivenAssignments);
router.patch('/:id/complete', completeAssignment);

module.exports = router;
