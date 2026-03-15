const SkillNode = require('../models/SkillNode');
const StudentMastery = require('../models/StudentMastery');
const LearningContent = require('../models/LearningContent');
const PerformanceLog = require('../models/PerformanceLog');
const Student = require('../models/Student');
const { getRecommendations, getKnowledgeGraph, updateMastery } = require('../services/aiService');

// ─── GET LEARNING PATH ────────────────────────────────────────────────────────
// GET /api/learning/path
// Returns all skills with the student's mastery score and a status label
const getLearningPath = async (req, res) => {
  const studentId = req.user.id;

  // Get all skills in the system
  const allSkills = await SkillNode.find().populate('prerequisites', 'name');

  // Get this student's mastery records
  const masteryRecords = await StudentMastery.find({ student_id: studentId });

  // Build a lookup: skill_id (string) -> mastery_score
  const masteryMap = {};
  masteryRecords.forEach((m) => {
    masteryMap[m.skill_id.toString()] = m.mastery_score;
  });

  // Assign a status to each skill based on mastery score and prerequisites
  const path = allSkills.map((skill) => {
    const score = masteryMap[skill._id.toString()] ?? 0;

    // Check if all prerequisites are mastered (score >= 0.7)
    const prereqsMet = skill.prerequisites.every((prereq) => {
      return (masteryMap[prereq._id.toString()] ?? 0) >= 0.7;
    });

    let status;
    if (score >= 0.7) {
      status = 'mastered';
    } else if (score > 0.3 && prereqsMet) {
      status = 'in_progress';
    } else if (prereqsMet) {
      status = 'unlocked';
    } else {
      status = 'locked';
    }

    return {
      skill_id: skill._id,
      name: skill.name,
      subject: skill.subject,
      difficulty: skill.difficulty,
      prerequisites: skill.prerequisites.map((p) => ({ id: p._id, name: p.name })),
      mastery_score: score,
      status,
    };
  });

  console.log(`🗺️ Learning path fetched for student ${studentId}`);

  res.json({ success: true, learning_path: path });
};

// ─── GET NEXT TOPIC ───────────────────────────────────────────────────────────
// GET /api/learning/next-topic
// Calls the AI service to get the top recommended next skill to study
const getNextTopic = async (req, res) => {
  const studentId = req.user.id;

  // Get student's career goal
  const student = await Student.findById(studentId);

  // Build mastery map for the AI service
  const masteryRecords = await StudentMastery.find({ student_id: studentId });
  const mastery_map = masteryRecords.map((m) => ({
    skill_id: m.skill_id.toString(),
    score: m.mastery_score,
  }));

  const result = await getRecommendations(studentId, mastery_map, student.career_goal);

  // Return just the top recommendation
  const top = result.recommendations?.[0] || null;

  console.log(`🎯 Next topic for student ${studentId}: ${top?.name || 'none'}`);

  res.json({ success: true, recommendation: top });
};

// ─── GET CONTENT ──────────────────────────────────────────────────────────────
// GET /api/learning/content/:skill_id
// Returns all learning content for a specific skill
const getContent = async (req, res) => {
  const { skill_id } = req.params;

  const content = await LearningContent.find({ skill_id })
    .populate('skill_id', 'name subject difficulty');

  if (content.length === 0) {
    return res.status(404).json({ success: false, message: 'No content found for this skill.' });
  }

  console.log(`📚 Content fetched for skill ${skill_id}: ${content.length} items`);

  res.json({ success: true, content });
};

// ─── COMPLETE CONTENT ─────────────────────────────────────────────────────────
// POST /api/learning/complete
// Body: { skill_id, content_id, is_correct, response_time_ms? }
// Logs the interaction and updates mastery via BKT
const completeContent = async (req, res) => {
  const studentId = req.user.id;
  const { skill_id, content_id, is_correct, response_time_ms } = req.body;

  if (!skill_id || is_correct === undefined) {
    return res.status(400).json({ success: false, message: 'skill_id and is_correct are required.' });
  }

  // Log to performance_logs
  await PerformanceLog.create({
    student_id: studentId,
    skill_id,
    is_correct,
    response_time_ms: response_time_ms || 0,
    content_id: content_id || null,
  });

  // Update mastery via AI service (single answer)
  const aiResult = await updateMastery(studentId, [{ skill_id, is_correct, response_time_ms: response_time_ms || 0 }]);

  // Save updated mastery to DB
  const updates = aiResult.mastery_updates || [];
  for (const update of updates) {
    await StudentMastery.findOneAndUpdate(
      { student_id: studentId, skill_id: update.skill_id },
      { mastery_score: update.score },
      { upsert: true, new: true }
    );
  }

  console.log(`✅ Content completed: student ${studentId}, skill ${skill_id}, correct: ${is_correct}`);

  res.json({
    success: true,
    message: 'Progress recorded.',
    mastery_updates: updates,
  });
};

// ─── GET KNOWLEDGE GRAPH ──────────────────────────────────────────────────────
// GET /api/learning/graph
// Returns the student's knowledge graph (nodes + edges) for visualization
const getKnowledgeGraphData = async (req, res) => {
  const studentId = req.user.id;

  const graphData = await getKnowledgeGraph(studentId);

  console.log(`🕸️ Knowledge graph fetched for student ${studentId}`);

  res.json({ success: true, graph: graphData });
};

module.exports = { getLearningPath, getNextTopic, getContent, completeContent, getKnowledgeGraphData };
