<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">🗄️ Database Schema</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026 | Database: MongoDB Atlas</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Overview</h2>
<p>EduPath AI uses <b>MongoDB Atlas</b> with <b>17 collections</b>. The Node.js backend accesses MongoDB via <b>Mongoose ODM</b>. The Python AI service accesses it directly via <b>PyMongo/motor</b>. All ObjectId references are stored as strings in the Python layer and as ObjectId types in Mongoose.</p>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Collection</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Approx. Documents</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Primary Index</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Secondary Indexes</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">1 per user</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">email (unique)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">50–200 skills</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">skillId (unique), subject</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studentmasteries</td><td style="border:1px solid #30363d;padding:10px;">1 per student per skill</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, skillId, compound(studentId+skillId)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">assessmentquestions</td><td style="border:1px solid #30363d;padding:10px;">10–50 per skill</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">skillId, difficulty</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studysessions</td><td style="border:1px solid #30363d;padding:10px;">Many per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, startTime</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">srscards</td><td style="border:1px solid #30363d;padding:10px;">Many per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, nextReview</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">mistakejournals</td><td style="border:1px solid #30363d;padding:10px;">Many per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, skillId, resolved</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">examsessions</td><td style="border:1px solid #30363d;padding:10px;">Many per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, completedAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">learningplans</td><td style="border:1px solid #30363d;padding:10px;">1 per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId (unique)</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">todotasks</td><td style="border:1px solid #30363d;padding:10px;">Many per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, dueDate, completed</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">topicassignments</td><td style="border:1px solid #30363d;padding:10px;">Many per teacher</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">teacherId, studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">notifications</td><td style="border:1px solid #30363d;padding:10px;">Many per user</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">userId, read, createdAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">performancelogs</td><td style="border:1px solid #30363d;padding:10px;">1 per session per skill</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, sessionDate</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">distractionlogs</td><td style="border:1px solid #30363d;padding:10px;">Sparse — only when detected</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, sessionId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">tutorfeedbacks</td><td style="border:1px solid #30363d;padding:10px;">1 per tutor interaction</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId, createdAt</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">learningcontents</td><td style="border:1px solid #30363d;padding:10px;">Many per skill</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">skillId, type</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">userprogress</td><td style="border:1px solid #30363d;padding:10px;">1 per student</td><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">studentId (unique)</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">Detailed Collection Schemas</h2>

<h3 style="color:#d2a8ff;">students</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">// Mongoose Schema
{
  name:         { type: String, required: true, trim: true },
  email:        { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['student', 'teacher'], default: 'student' },
  careerGoal:   { type: String, default: '' },
  xp:           { type: Number, default: 0, min: 0 },
  level:        { type: Number, default: 1, min: 1 },
  streak:       { type: Number, default: 0, min: 0 },
  lastStudyDate:{ type: Date },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: email (unique)</pre>

<h3 style="color:#d2a8ff;">skillnodes</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  skillId:      { type: String, required: true, unique: true },
  name:         { type: String, required: true },
  subject:      { type: String, required: true },
  difficulty:   { type: Number, required: true, min: 1, max: 5 },
  prerequisites:{ type: [String], default: [] },  // array of skillId strings
  description:  { type: String, default: '' },
  careerPaths:  { type: [String], default: [] }   // e.g. ['Data Scientist', 'ML Engineer']
}
// Indexes: skillId (unique), subject</pre>

<h3 style="color:#d2a8ff;">studentmasteries</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  skillId:      { type: String, required: true },
  mastery_score:{ type: Number, default: 0.1, min: 0, max: 1 },
  attempts:     { type: Number, default: 0 },
  lastUpdated:  { type: Date, default: Date.now }
}
// Indexes: studentId, compound(studentId + skillId) unique</pre>

<h3 style="color:#d2a8ff;">assessmentquestions</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  skillId:      { type: String, required: true },
  question:     { type: String, required: true },
  options:      { type: [String], required: true },  // exactly 4 options
  correctAnswer:{ type: String, required: true },
  difficulty:   { type: Number, required: true, min: 1, max: 5 },
  explanation:  { type: String, default: '' },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: skillId, difficulty</pre>

<h3 style="color:#d2a8ff;">studysessions</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  startTime:    { type: Date, required: true },
  endTime:      { type: Date },
  skillsStudied:{ type: [String], default: [] },
  xpEarned:     { type: Number, default: 0 },
  durationMinutes: { type: Number },
  completed:    { type: Boolean, default: false }
}
// Indexes: studentId, startTime</pre>

<h3 style="color:#d2a8ff;">srscards</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  skillId:      { type: String, required: true },
  front:        { type: String, required: true },
  back:         { type: String, required: true },
  interval:     { type: Number, default: 1 },       // SM-2 interval in days
  easiness:     { type: Number, default: 2.5 },     // SM-2 easiness factor
  repetitions:  { type: Number, default: 0 },
  nextReview:   { type: Date, default: Date.now },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: studentId, nextReview</pre>

<h3 style="color:#d2a8ff;">mistakejournals</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:     { type: ObjectId, ref: 'Student', required: true },
  skillId:       { type: String, required: true },
  question:      { type: String, required: true },
  correctAnswer: { type: String, required: true },
  studentAnswer: { type: String, required: true },
  explanation:   { type: String },
  resolved:      { type: Boolean, default: false },
  createdAt:     { type: Date, default: Date.now }
}
// Indexes: studentId, skillId, resolved</pre>

<h3 style="color:#d2a8ff;">examsessions</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  questions:    [{ questionId: ObjectId, question: String, options: [String] }],
  answers:      [{ questionId: ObjectId, selectedAnswer: String, correct: Boolean }],
  score:        { type: Number },
  totalQuestions:{ type: Number },
  timeTaken:    { type: Number },  // seconds
  completedAt:  { type: Date },
  startedAt:    { type: Date, default: Date.now }
}
// Indexes: studentId, completedAt</pre>

<h3 style="color:#d2a8ff;">learningplans</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true, unique: true },
  weeks: [{
    week:       Number,
    skills:     [String],
    strategies: [String],
    estimatedHours: Number
  }],
  totalWeeks:   { type: Number },
  careerGoal:   { type: String },
  generatedAt:  { type: Date, default: Date.now }
}
// Indexes: studentId (unique)</pre>

<h3 style="color:#d2a8ff;">todotasks</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  title:        { type: String, required: true },
  description:  { type: String },
  completed:    { type: Boolean, default: false },
  xpReward:     { type: Number, default: 50 },
  dueDate:      { type: Date },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: studentId, dueDate, completed</pre>

<h3 style="color:#d2a8ff;">topicassignments</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  teacherId:    { type: ObjectId, ref: 'Student', required: true },
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  skillId:      { type: String, required: true },
  note:         { type: String },
  assignedAt:   { type: Date, default: Date.now },
  completed:    { type: Boolean, default: false }
}
// Indexes: teacherId, studentId</pre>

<h3 style="color:#d2a8ff;">notifications</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  userId:       { type: ObjectId, ref: 'Student', required: true },
  message:      { type: String, required: true },
  type:         { type: String, enum: ['burnout', 'assignment', 'levelup', 'streak', 'exam', 'general'] },
  read:         { type: Boolean, default: false },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: userId, read, createdAt (TTL: 30 days)</pre>

<h3 style="color:#d2a8ff;">performancelogs</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  skillId:      { type: String, required: true },
  sessionId:    { type: ObjectId, ref: 'StudySession' },
  accuracy:     { type: Number, min: 0, max: 1 },
  responseTime: { type: Number },  // average ms per question
  sessionDate:  { type: Date, default: Date.now }
}
// Indexes: studentId, sessionDate</pre>

<h3 style="color:#d2a8ff;">distractionlogs</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:          { type: ObjectId, ref: 'Student', required: true },
  sessionId:          { type: ObjectId, ref: 'StudySession', required: true },
  responseTimeSpikes: { type: [Number] },  // array of spike values in ms
  detectedAt:         { type: Date, default: Date.now },
  severity:           { type: String, enum: ['low', 'medium', 'high'] }
}
// Indexes: studentId, sessionId</pre>

<h3 style="color:#d2a8ff;">tutorfeedbacks</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:    { type: ObjectId, ref: 'Student', required: true },
  question:     { type: String, required: true },
  response:     { type: String, required: true },
  rating:       { type: Number, min: 1, max: 5 },
  helpful:      { type: Boolean },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: studentId, createdAt</pre>

<h3 style="color:#d2a8ff;">learningcontents</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  skillId:      { type: String, required: true },
  title:        { type: String, required: true },
  type:         { type: String, enum: ['video', 'article', 'practice', 'interactive'] },
  url:          { type: String },
  difficulty:   { type: Number, min: 1, max: 5 },
  estimatedMinutes: { type: Number },
  createdAt:    { type: Date, default: Date.now }
}
// Indexes: skillId, type</pre>

<h3 style="color:#d2a8ff;">userprogress</h3>
<pre style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:16px;font-family:'Courier New',monospace;font-size:0.85em;color:#e6edf3;">{
  studentId:           { type: ObjectId, ref: 'Student', required: true, unique: true },
  totalSkillsMastered: { type: Number, default: 0 },
  totalSessionTime:    { type: Number, default: 0 },  // minutes
  averageAccuracy:     { type: Number, default: 0 },
  totalSRSReviews:     { type: Number, default: 0 },
  lastActive:          { type: Date, default: Date.now }
}
// Indexes: studentId (unique)</pre>

</body>
