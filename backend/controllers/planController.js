const axios = require('axios');
const StudentMastery = require('../models/StudentMastery');
const LearningPlan = require('../models/LearningPlan');
const TodoTask = require('../models/TodoTask');

const AI_SERVICE = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// POST /api/plan/generate
// Calls Python AI service to generate a plan, saves it, and auto-creates todo challenges
exports.generatePlan = async (req, res) => {
  const studentId = req.user.id;
  const { career_goal = '' } = req.body;

  // 1. Fetch all mastery records for this student
  const masteryRecords = await StudentMastery.find({ student_id: studentId });
  if (!masteryRecords.length) {
    return res.status(400).json({ success: false, message: 'No mastery data found. Complete an assessment first.' });
  }

  const mastery_map = masteryRecords.map((m) => ({
    skill_id: m.skill_id.toString(),
    score: m.mastery_score,
  }));

  // 2. Call Python AI service
  let planData;
  try {
    const response = await axios.post(`${AI_SERVICE}/plan/generate`, {
      student_id: studentId,
      mastery_map,
      career_goal,
    });
    planData = response.data.plan;
  } catch (err) {
    console.error('❌ Plan AI service error:', err.message);
    return res.status(500).json({ success: false, message: 'AI service unavailable for plan generation.' });
  }

  // 3. Save plan to MongoDB (replace existing plan for this student)
  const plan = await LearningPlan.findOneAndUpdate(
    { student_id: studentId },
    {
      student_id: studentId,
      generated_at: new Date(),
      overall_score: planData.overall_score,
      strengths: planData.strengths,
      weaknesses: planData.weaknesses,
      weekly_plan: planData.weekly_plan,
      overcome_strategies: planData.overcome_strategies,
      predicted_completion_weeks: planData.predicted_completion_weeks,
      ml_confidence: planData.ml_confidence,
    },
    { upsert: true, new: true }
  );

  // 4. Auto-generate todo challenges from top weaknesses (plan-sourced tasks)
  // Delete old plan-sourced tasks first so we don't duplicate
  await TodoTask.deleteMany({ student_id: studentId, source: 'plan' });

  const challenges = planData.overcome_strategies.map((s, i) => ({
    student_id: studentId,
    title: `Improve: ${s.skill_name}`,
    description: s.strategy,
    priority: s.priority,
    status: 'todo',
    xp_reward: s.priority === 'critical' ? 50 : s.priority === 'high' ? 30 : 20,
    is_challenge: true,
    source: 'plan',
    due_date: new Date(Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000), // stagger by week
  }));

  if (challenges.length) await TodoTask.insertMany(challenges);

  res.json({ success: true, plan, challenges_created: challenges.length });
};

// GET /api/plan
// Returns the student's most recent learning plan
exports.getPlan = async (req, res) => {
  const plan = await LearningPlan.findOne({ student_id: req.user.id }).sort({ generated_at: -1 });
  if (!plan) return res.status(404).json({ success: false, message: 'No plan found. Generate one first.' });
  res.json({ success: true, plan });
};
