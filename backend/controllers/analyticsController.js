const Student = require('../models/Student');
const StudentMastery = require('../models/StudentMastery');
const PerformanceLog = require('../models/PerformanceLog');
const SkillNode = require('../models/SkillNode');

// ─── GET STUDENT ANALYTICS (Teacher Only) ────────────────────────────────────
// GET /api/analytics/student/:student_id
// Returns full mastery breakdown + recent 20 performance logs for a specific student
const getStudentAnalytics = async (req, res) => {
  const { student_id } = req.params;

  // Verify the student exists
  const student = await Student.findById(student_id).select('-password_hash');
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found.' });
  }

  // Get all mastery records with skill details
  const masteryRecords = await StudentMastery.find({ student_id })
    .populate('skill_id', 'name subject difficulty');

  const mastery_breakdown = masteryRecords.map((m) => ({
    skill_id: m.skill_id._id,
    skill_name: m.skill_id.name,
    subject: m.skill_id.subject,
    difficulty: m.skill_id.difficulty,
    mastery_score: m.mastery_score,
    level: m.mastery_score >= 0.7 ? 'mastered' : m.mastery_score >= 0.4 ? 'learning' : 'beginner',
  }));

  // Get recent 20 performance logs
  const recentLogs = await PerformanceLog.find({ student_id })
    .sort({ createdAt: -1 })
    .limit(20)
    .populate('skill_id', 'name subject');

  const performance_logs = recentLogs.map((log) => ({
    skill_name: log.skill_id?.name || 'Unknown',
    subject: log.skill_id?.subject || 'Unknown',
    is_correct: log.is_correct,
    response_time_ms: log.response_time_ms,
    timestamp: log.createdAt,
  }));

  // Calculate overall stats
  const totalLogs = await PerformanceLog.countDocuments({ student_id });
  const correctLogs = await PerformanceLog.countDocuments({ student_id, is_correct: true });
  const accuracy = totalLogs > 0 ? Math.round((correctLogs / totalLogs) * 100) : 0;

  console.log(`📊 Analytics fetched for student ${student_id} by teacher ${req.user.id}`);

  res.json({
    success: true,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
      career_goal: student.career_goal,
      learning_style: student.learning_style,
    },
    stats: {
      total_attempts: totalLogs,
      correct_answers: correctLogs,
      accuracy_percentage: accuracy,
      skills_mastered: mastery_breakdown.filter((m) => m.level === 'mastered').length,
    },
    mastery_breakdown,
    recent_performance: performance_logs,
  });
};

// ─── GET CLASS ANALYTICS (Teacher Only) ──────────────────────────────────────
// GET /api/analytics/class
// Returns all students with their average mastery per skill
const getClassAnalytics = async (req, res) => {
  // Get all students (not teachers)
  const students = await Student.find({ role: 'student' }).select('-password_hash');

  // Get all skills
  const skills = await SkillNode.find();

  // For each skill, compute average mastery across all students
  const skillAverages = await Promise.all(
    skills.map(async (skill) => {
      const records = await StudentMastery.find({ skill_id: skill._id });
      const avg =
        records.length > 0
          ? records.reduce((sum, r) => sum + r.mastery_score, 0) / records.length
          : 0;
      return {
        skill_id: skill._id,
        skill_name: skill.name,
        subject: skill.subject,
        difficulty: skill.difficulty,
        average_mastery: parseFloat(avg.toFixed(3)),
        student_count: records.length,
      };
    })
  );

  // Build per-student summary
  const studentSummaries = await Promise.all(
    students.map(async (student) => {
      const masteryRecords = await StudentMastery.find({ student_id: student._id });
      const avgMastery =
        masteryRecords.length > 0
          ? masteryRecords.reduce((sum, r) => sum + r.mastery_score, 0) / masteryRecords.length
          : 0;
      const totalAttempts = await PerformanceLog.countDocuments({ student_id: student._id });
      return {
        student_id: student._id,
        name: student.name,
        email: student.email,
        career_goal: student.career_goal,
        average_mastery: parseFloat(avgMastery.toFixed(3)),
        skills_tracked: masteryRecords.length,
        total_attempts: totalAttempts,
      };
    })
  );

  console.log(`📊 Class analytics fetched by teacher ${req.user.id}`);

  res.json({
    success: true,
    total_students: students.length,
    skill_averages: skillAverages,
    students: studentSummaries,
  });
};

// ─── GET WEAK SPOTS (Student) ─────────────────────────────────────────────────
// GET /api/analytics/weak-spots
// Returns per-subject accuracy, attempt count, and performance score for radar chart
const getWeakSpots = async (req, res) => {
  const studentId = req.user.id;

  // Get all performance logs for this student
  const logs = await PerformanceLog.find({ student_id: studentId })
    .populate('skill_id', 'name subject difficulty');

  if (logs.length === 0) {
    return res.json({ success: true, weak_spots: [] });
  }

  // Aggregate by subject
  const subjectMap = {};
  for (const log of logs) {
    const subject = log.skill_id?.subject || 'Unknown';
    if (!subjectMap[subject]) {
      subjectMap[subject] = { subject, correct: 0, total: 0 };
    }
    subjectMap[subject].total += 1;
    if (log.is_correct) subjectMap[subject].correct += 1;
  }

  const weak_spots = Object.values(subjectMap).map((s) => {
    const accuracy = s.total > 0 ? parseFloat(((s.correct / s.total) * 100).toFixed(1)) : 0;
    // Performance score: 0-100, weighted by attempt count (more attempts = more reliable)
    const confidence = Math.min(s.total / 20, 1); // saturates at 20 attempts
    const performance_score = parseFloat((accuracy * confidence).toFixed(1));
    return {
      subject: s.subject,
      accuracy,
      attempt_count: s.total,
      correct_count: s.correct,
      performance_score,
    };
  });

  // Sort weakest first
  weak_spots.sort((a, b) => a.accuracy - b.accuracy);

  res.json({ success: true, weak_spots });
};

// ─── COGNITIVE LOAD DETECTOR ──────────────────────────────────────────────────
// GET /api/analytics/cognitive-load
// Compares each skill's avg response time vs global avg.
// Skills where avg_time > 2x global avg are flagged as "high cognitive load".
const getCognitiveLoad = async (req, res) => {
  const studentId = req.user.id;

  const logs = await PerformanceLog.find({
    student_id: studentId,
    response_time_ms: { $gt: 0 },
  }).populate('skill_id', 'name subject difficulty');

  if (logs.length < 5) {
    return res.json({ success: true, cognitive_load: [], insufficient_data: true });
  }

  // Global average response time across all questions
  const globalAvg = logs.reduce((s, l) => s + l.response_time_ms, 0) / logs.length;

  // Aggregate per skill
  const skillMap = {};
  for (const log of logs) {
    const id = log.skill_id?._id?.toString();
    if (!id) continue;
    if (!skillMap[id]) {
      skillMap[id] = {
        skill_id: id,
        skill_name: log.skill_id.name,
        subject: log.skill_id.subject,
        difficulty: log.skill_id.difficulty,
        times: [],
        correct: 0,
        total: 0,
      };
    }
    skillMap[id].times.push(log.response_time_ms);
    skillMap[id].total += 1;
    if (log.is_correct) skillMap[id].correct += 1;
  }

  const cognitive_load = Object.values(skillMap).map((s) => {
    const avg_time_ms = s.times.reduce((a, b) => a + b, 0) / s.times.length;
    const load_ratio = parseFloat((avg_time_ms / globalAvg).toFixed(2));
    const accuracy = parseFloat(((s.correct / s.total) * 100).toFixed(1));
    // load_level: high if ratio > 2, medium if > 1.4, low otherwise
    const load_level = load_ratio > 2 ? 'high' : load_ratio > 1.4 ? 'medium' : 'low';
    return {
      skill_id: s.skill_id,
      skill_name: s.skill_name,
      subject: s.subject,
      difficulty: s.difficulty,
      avg_time_ms: Math.round(avg_time_ms),
      load_ratio,
      load_level,
      accuracy,
      attempt_count: s.total,
      // Recommendation: high load + low accuracy = needs shorter, more frequent sessions
      recommendation: load_level === 'high' && accuracy < 60
        ? 'Schedule shorter, more frequent sessions'
        : load_level === 'high'
        ? 'Complex topic — allow more time per session'
        : null,
    };
  });

  // Sort by load_ratio descending
  cognitive_load.sort((a, b) => b.load_ratio - a.load_ratio);

  res.json({ success: true, global_avg_ms: Math.round(globalAvg), cognitive_load });
};

// ─── OPTIMAL STUDY TIME DETECTOR ─────────────────────────────────────────────
// GET /api/analytics/optimal-time
// Aggregates accuracy by hour-of-day and day-of-week from PerformanceLog timestamps.
const getOptimalStudyTime = async (req, res) => {
  const studentId = req.user.id;

  const logs = await PerformanceLog.find({ student_id: studentId });

  if (logs.length < 10) {
    return res.json({ success: true, optimal_hour: null, optimal_day: null, insufficient_data: true });
  }

  // Bucket by hour (0-23)
  const hourBuckets = Array.from({ length: 24 }, () => ({ correct: 0, total: 0 }));
  // Bucket by day (0=Sun … 6=Sat)
  const dayBuckets = Array.from({ length: 7 }, () => ({ correct: 0, total: 0 }));
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  for (const log of logs) {
    const d = new Date(log.createdAt);
    const hour = d.getHours();
    const day = d.getDay();
    hourBuckets[hour].total += 1;
    dayBuckets[day].total += 1;
    if (log.is_correct) {
      hourBuckets[hour].correct += 1;
      dayBuckets[day].correct += 1;
    }
  }

  // Build hour accuracy array (only include hours with >= 3 attempts)
  const hourStats = hourBuckets.map((b, hour) => ({
    hour,
    label: `${hour.toString().padStart(2, '0')}:00`,
    accuracy: b.total >= 3 ? parseFloat(((b.correct / b.total) * 100).toFixed(1)) : null,
    attempts: b.total,
  }));

  const dayStats = dayBuckets.map((b, day) => ({
    day,
    label: DAY_NAMES[day],
    accuracy: b.total >= 3 ? parseFloat(((b.correct / b.total) * 100).toFixed(1)) : null,
    attempts: b.total,
  }));

  // Find best hour and day (highest accuracy with enough data)
  const validHours = hourStats.filter((h) => h.accuracy !== null);
  const validDays = dayStats.filter((d) => d.accuracy !== null);

  const optimal_hour = validHours.length > 0
    ? validHours.reduce((best, h) => h.accuracy > best.accuracy ? h : best)
    : null;

  const optimal_day = validDays.length > 0
    ? validDays.reduce((best, d) => d.accuracy > best.accuracy ? d : best)
    : null;

  res.json({
    success: true,
    optimal_hour,
    optimal_day,
    hour_stats: hourStats,
    day_stats: dayStats,
    insight: optimal_hour && optimal_day
      ? `Your peak performance is ${optimal_day.label}s around ${optimal_hour.label} with ${optimal_hour.accuracy}% accuracy`
      : null,
  });
};

// ─── PREREQUISITE GAP DETECTOR ────────────────────────────────────────────────
// GET /api/analytics/prereq-gaps
// For each skill the student is struggling with (mastery < 0.4),
// walk its prerequisites and find which ones also have low mastery.
const getPrereqGaps = async (req, res) => {
  const studentId = req.user.id;

  // Get all mastery records for this student
  const masteryRecords = await StudentMastery.find({ student_id: studentId });
  const masteryMap = {};
  masteryRecords.forEach((m) => { masteryMap[m.skill_id.toString()] = m.mastery_score; });

  // Find struggling skills (mastery < 0.4)
  const strugglingIds = masteryRecords
    .filter((m) => m.mastery_score < 0.4)
    .map((m) => m.skill_id);

  if (strugglingIds.length === 0) {
    return res.json({ success: true, gaps: [], message: 'No struggling skills found.' });
  }

  // Load those skills with their prerequisites populated
  const strugglingSkills = await SkillNode.find({ _id: { $in: strugglingIds } })
    .populate('prerequisites', 'name subject difficulty');

  const gaps = [];

  for (const skill of strugglingSkills) {
    const prereqGaps = [];
    for (const prereq of skill.prerequisites) {
      const prereqMastery = masteryMap[prereq._id.toString()] ?? null;
      // Flag if prerequisite mastery is low or not yet attempted
      if (prereqMastery === null || prereqMastery < 0.5) {
        prereqGaps.push({
          skill_id: prereq._id,
          skill_name: prereq.name,
          subject: prereq.subject,
          difficulty: prereq.difficulty,
          mastery_score: prereqMastery,
          status: prereqMastery === null ? 'not_attempted' : 'weak',
        });
      }
    }

    if (prereqGaps.length > 0) {
      gaps.push({
        skill_id: skill._id,
        skill_name: skill.name,
        mastery_score: masteryMap[skill._id.toString()] ?? 0,
        prerequisite_gaps: prereqGaps,
        message: `Fix ${prereqGaps.length} prerequisite(s) before focusing on "${skill.name}"`,
      });
    }
  }

  res.json({ success: true, gaps });
};

// ─── QUESTION DIFFICULTY AUTO-CALIBRATOR ─────────────────────────────────────
// GET /api/analytics/question-difficulty
// Uses Item Response Theory (IRT) logic: compute per-question pass rate across all students.
// Questions with pass_rate > 0.85 are "too easy", < 0.15 are "too hard".
// This is a teacher-accessible endpoint but also useful for student insight.
const getQuestionDifficulty = async (req, res) => {
  const studentId = req.user.id;

  // Aggregate pass rate per question from ALL students (class-wide calibration)
  const pipeline = [
    {
      $group: {
        _id: null, // we don't have question_id on PerformanceLog, so aggregate by skill
        // Group by skill_id instead — gives skill-level difficulty calibration
      },
    },
  ];

  // Since PerformanceLog tracks skill_id (not question_id), calibrate at skill level
  const skillStats = await PerformanceLog.aggregate([
    {
      $group: {
        _id: '$skill_id',
        total_attempts: { $sum: 1 },
        correct_attempts: { $sum: { $cond: ['$is_correct', 1, 0] } },
      },
    },
    { $match: { total_attempts: { $gte: 5 } } }, // need at least 5 attempts for reliability
  ]);

  // Populate skill names
  const skillIds = skillStats.map((s) => s._id);
  const skills = await SkillNode.find({ _id: { $in: skillIds } });
  const skillNameMap = {};
  skills.forEach((s) => { skillNameMap[s._id.toString()] = s; });

  // Get this student's mastery for context
  const myMastery = await StudentMastery.find({ student_id: studentId });
  const myMasteryMap = {};
  myMastery.forEach((m) => { myMasteryMap[m.skill_id.toString()] = m.mastery_score; });

  const calibrated = skillStats.map((s) => {
    const pass_rate = parseFloat((s.correct_attempts / s.total_attempts).toFixed(3));
    const irt_difficulty = parseFloat((1 - pass_rate).toFixed(3)); // IRT: harder = lower pass rate
    const calibration =
      pass_rate > 0.85 ? 'too_easy' :
      pass_rate < 0.15 ? 'too_hard' : 'well_calibrated';

    const skill = skillNameMap[s._id.toString()];
    const my_mastery = myMasteryMap[s._id.toString()] ?? null;

    return {
      skill_id: s._id,
      skill_name: skill?.name || 'Unknown',
      subject: skill?.subject || 'Unknown',
      stated_difficulty: skill?.difficulty || null,
      pass_rate_pct: Math.round(pass_rate * 100),
      irt_difficulty,
      calibration,
      total_attempts: s.total_attempts,
      my_mastery,
      // Personalized insight: if skill is "too hard" globally but student has high mastery, they're above average
      personal_insight: my_mastery !== null
        ? my_mastery > pass_rate + 0.2
          ? 'You are above class average on this topic'
          : my_mastery < pass_rate - 0.2
          ? 'You are below class average on this topic'
          : 'You are on par with the class'
        : null,
    };
  });

  // Sort by IRT difficulty descending (hardest first)
  calibrated.sort((a, b) => b.irt_difficulty - a.irt_difficulty);

  res.json({ success: true, calibrated_skills: calibrated });
};

// ─── LOG DISTRACTION EVENT ────────────────────────────────────────────────────
// POST /api/analytics/distraction
// Body: { session_id, event_type: 'tab_switch'|'window_blur'|'window_focus', timestamp }
const logDistractionEvent = async (req, res) => {
  const studentId = req.user.id;
  const { session_id, event_type, timestamp } = req.body;

  if (!['tab_switch', 'window_blur', 'window_focus', 'copy_attempt'].includes(event_type)) {
    return res.status(400).json({ success: false, message: 'Invalid event_type.' });
  }

  // Store in a lightweight in-memory aggregation via MongoDB
  // We upsert a DistractionLog document per session
  const DistractionLog = require('../models/DistractionLog');

  await DistractionLog.findOneAndUpdate(
    { student_id: studentId, session_id: session_id || 'general' },
    {
      $push: {
        events: {
          event_type,
          timestamp: timestamp ? new Date(timestamp) : new Date(),
        },
      },
      $inc: { [`event_counts.${event_type}`]: 1 },
      $set: { last_event_at: new Date() },
    },
    { upsert: true, new: true }
  );

  res.json({ success: true });
};

// ─── GET DISTRACTION REPORT ───────────────────────────────────────────────────
// GET /api/analytics/distraction-report
const getDistractionReport = async (req, res) => {
  const studentId = req.user.id;
  const DistractionLog = require('../models/DistractionLog');

  // Get last 10 sessions
  const logs = await DistractionLog.find({ student_id: studentId })
    .sort({ createdAt: -1 })
    .limit(10);

  if (logs.length === 0) {
    return res.json({ success: true, sessions: [], overall_focus_score: 100 });
  }

  const sessions = logs.map((log) => {
    const totalDistractions =
      (log.event_counts?.tab_switch || 0) +
      (log.event_counts?.window_blur || 0) +
      (log.event_counts?.copy_attempt || 0);

    // Focus score: 100 - (distractions * 5), clamped 0-100
    const focus_score = Math.max(0, Math.min(100, 100 - totalDistractions * 5));

    return {
      session_id: log.session_id,
      date: log.createdAt,
      tab_switches: log.event_counts?.tab_switch || 0,
      window_blurs: log.event_counts?.window_blur || 0,
      copy_attempts: log.event_counts?.copy_attempt || 0,
      total_distractions: totalDistractions,
      focus_score,
    };
  });

  const overall_focus_score = Math.round(
    sessions.reduce((s, l) => s + l.focus_score, 0) / sessions.length
  );

  res.json({ success: true, sessions, overall_focus_score });
};

module.exports = {
  getStudentAnalytics,
  getClassAnalytics,
  getWeakSpots,
  getCognitiveLoad,
  getOptimalStudyTime,
  getPrereqGaps,
  getQuestionDifficulty,
  logDistractionEvent,
  getDistractionReport,
};
