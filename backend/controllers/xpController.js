const UserProgress = require('../models/UserProgress');

// XP rewards for different actions
const XP_REWARDS = {
  quiz_complete: 20,
  accuracy_bonus_80: 30,   // extra XP for >= 80% accuracy
  accuracy_bonus_100: 50,  // extra XP for 100% accuracy
  streak_bonus: 15,        // extra XP per streak milestone (every 7 days)
  daily_login: 5,
};

// ─── GET MY PROGRESS ──────────────────────────────────────────────────────────
// GET /api/xp/progress
const getMyProgress = async (req, res) => {
  const studentId = req.user.id;

  let progress = await UserProgress.findOne({ student_id: studentId });
  if (!progress) {
    progress = await UserProgress.create({ student_id: studentId });
  }

  const levels = UserProgress.LEVELS;
  const currentLevel = levels.find((l) => l.level === progress.level) || levels[0];
  const nextLevel = levels.find((l) => l.level === progress.level + 1);

  const xp_to_next = nextLevel ? nextLevel.min_xp - progress.xp : null;
  const xp_progress_pct = nextLevel
    ? Math.round(((progress.xp - currentLevel.min_xp) / (nextLevel.min_xp - currentLevel.min_xp)) * 100)
    : 100;

  res.json({
    success: true,
    progress: {
      xp: progress.xp,
      level: progress.level,
      study_streak: progress.study_streak,
      longest_streak: progress.longest_streak,
      last_active_date: progress.last_active_date,
      total_sessions: progress.total_sessions,
      total_correct: progress.total_correct,
    },
    level_info: {
      current_level: progress.level,
      current_level_min_xp: currentLevel.min_xp,
      next_level_min_xp: nextLevel?.min_xp || null,
      xp_to_next,
      xp_progress_pct,
    },
    levels: UserProgress.LEVELS,
  });
};

// ─── AWARD XP ─────────────────────────────────────────────────────────────────
// POST /api/xp/award
// Body: { action: 'quiz_complete', accuracy_percentage: 85 }
const awardXP = async (req, res) => {
  const studentId = req.user.id;
  const { action, accuracy_percentage = 0, correct_answers = 0 } = req.body;

  let progress = await UserProgress.findOne({ student_id: studentId });
  if (!progress) {
    progress = await UserProgress.create({ student_id: studentId });
  }

  let xp_earned = 0;
  const reasons = [];

  // Base XP for completing a quiz
  if (action === 'quiz_complete') {
    xp_earned += XP_REWARDS.quiz_complete;
    reasons.push(`+${XP_REWARDS.quiz_complete} XP for completing a quiz`);

    // Accuracy bonus
    if (accuracy_percentage === 100) {
      xp_earned += XP_REWARDS.accuracy_bonus_100;
      reasons.push(`+${XP_REWARDS.accuracy_bonus_100} XP for perfect score`);
    } else if (accuracy_percentage >= 80) {
      xp_earned += XP_REWARDS.accuracy_bonus_80;
      reasons.push(`+${XP_REWARDS.accuracy_bonus_80} XP for high accuracy`);
    }

    progress.total_sessions += 1;
    progress.total_correct += correct_answers;
  }

  // Update streak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = progress.last_active_date
    ? new Date(progress.last_active_date)
    : null;

  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today - lastActive) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day — extend streak
      progress.study_streak += 1;
      if (progress.study_streak > progress.longest_streak) {
        progress.longest_streak = progress.study_streak;
      }
      // Streak milestone bonus every 7 days
      if (progress.study_streak % 7 === 0) {
        xp_earned += XP_REWARDS.streak_bonus;
        reasons.push(`+${XP_REWARDS.streak_bonus} XP for ${progress.study_streak}-day streak milestone`);
      }
    } else if (diffDays > 1) {
      // Missed a day — reset streak
      progress.study_streak = 1;
    }
    // diffDays === 0 means same day, no streak change
  } else {
    // First ever activity
    progress.study_streak = 1;
  }

  progress.last_active_date = today;
  progress.xp += xp_earned;
  progress.level = UserProgress.computeLevel(progress.xp);

  await progress.save();

  console.log(`🎮 XP awarded to student ${studentId}: +${xp_earned} XP (total: ${progress.xp})`);

  res.json({
    success: true,
    xp_earned,
    reasons,
    new_total_xp: progress.xp,
    new_level: progress.level,
    study_streak: progress.study_streak,
  });
};

// ─── RECORD DAILY LOGIN ───────────────────────────────────────────────────────
// POST /api/xp/daily-login
const recordDailyLogin = async (req, res) => {
  const studentId = req.user.id;

  let progress = await UserProgress.findOne({ student_id: studentId });
  if (!progress) {
    progress = await UserProgress.create({ student_id: studentId });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastActive = progress.last_active_date ? new Date(progress.last_active_date) : null;

  if (lastActive) {
    lastActive.setHours(0, 0, 0, 0);
    if (today.getTime() === lastActive.getTime()) {
      // Already logged in today
      return res.json({ success: true, already_logged: true, xp_earned: 0, progress });
    }
  }

  progress.xp += XP_REWARDS.daily_login;
  progress.last_active_date = today;
  progress.level = UserProgress.computeLevel(progress.xp);
  await progress.save();

  res.json({ success: true, already_logged: false, xp_earned: XP_REWARDS.daily_login, progress });
};

module.exports = { getMyProgress, awardXP, recordDailyLogin };
