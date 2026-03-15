// services/curriculumEngine.js — Dynamic Curriculum Evolution Engine
// Reorders learning path dynamically based on mastery gaps, prerequisites, and class difficulty.

const SkillNode = require('../models/SkillNode');
const StudentMastery = require('../models/StudentMastery');
const PerformanceLog = require('../models/PerformanceLog');

/**
 * Compute dynamic topic priority for a student.
 * Formula: priority = (1 - mastery_score) * prereq_gap_weight * class_difficulty_score
 *
 * Higher priority = should be studied sooner.
 */
const computeCurriculumPriority = async (studentId) => {
  // Get all skills
  const skills = await SkillNode.find().populate('prerequisites', 'name');

  // Get student mastery map
  const masteryRecords = await StudentMastery.find({ student_id: studentId });
  const masteryMap = {};
  masteryRecords.forEach((m) => { masteryMap[m.skill_id.toString()] = m.mastery_score; });

  // Get class-wide pass rates per skill (from PerformanceLog)
  const classStats = await PerformanceLog.aggregate([
    { $group: { _id: '$skill_id', total: { $sum: 1 }, correct: { $sum: { $cond: ['$is_correct', 1, 0] } } } },
  ]);
  const classMap = {};
  classStats.forEach((s) => {
    classMap[s._id.toString()] = s.total > 0 ? s.correct / s.total : 0.5;
  });

  const prioritized = skills.map((skill) => {
    const skillId = skill._id.toString();
    const mastery = masteryMap[skillId] ?? 0;

    // Mastery gap: how far from mastered (0.7 threshold)
    const masteryGap = Math.max(0, 0.7 - mastery);

    // Prerequisite gap weight: fraction of prerequisites with low mastery
    const prereqs = skill.prerequisites || [];
    const prereqGapWeight = prereqs.length > 0
      ? prereqs.filter((p) => (masteryMap[p._id?.toString()] ?? 0) < 0.5).length / prereqs.length
      : 0;

    // Class difficulty score: lower class pass rate = harder = higher priority
    const classPassRate = classMap[skillId] ?? 0.5;
    const classDifficultyScore = 1 - classPassRate;

    // Combined priority score
    const priority = (masteryGap * 0.5) + (prereqGapWeight * 0.3) + (classDifficultyScore * 0.2);

    return {
      skill_id: skillId,
      skill_name: skill.name,
      subject: skill.subject,
      difficulty: skill.difficulty,
      mastery_score: mastery,
      mastery_gap: parseFloat(masteryGap.toFixed(3)),
      prereq_gap_weight: parseFloat(prereqGapWeight.toFixed(3)),
      class_difficulty_score: parseFloat(classDifficultyScore.toFixed(3)),
      priority_score: parseFloat(priority.toFixed(4)),
      status: mastery >= 0.7 ? 'mastered' : mastery >= 0.4 ? 'in_progress' : 'needs_work',
    };
  });

  // Sort by priority descending (highest priority first)
  prioritized.sort((a, b) => b.priority_score - a.priority_score);

  return prioritized;
};

module.exports = { computeCurriculumPriority };
