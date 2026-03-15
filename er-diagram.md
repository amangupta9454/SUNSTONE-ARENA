<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0d1117;color:#c9d1d9;margin:0;padding:24px;line-height:1.7;max-width:1200px;margin:0 auto;">

<h1 style="font-size:2.4em;color:#58a6ff;border-bottom:3px solid #21262d;padding-bottom:16px;">🗂️ Entity Relationship Diagram</h1>
<p style="color:#8b949e;">EduPath AI | Version 1.0 | March 2026</p>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">1. Overview</h2>
<p>EduPath AI uses <b>MongoDB Atlas</b> as its primary database — a document-oriented NoSQL store. While MongoDB does not enforce relational constraints at the database level, the application enforces referential integrity through Mongoose schemas and application-layer validation. This document describes all 17 collections, their fields, data types, and inter-collection relationships as if they were relational entities.</p>

<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Collection</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Primary Key</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Core user entity — students and teachers</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Curriculum skill graph nodes</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studentmasteries</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">BKT mastery score per student per skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">assessmentquestions</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Quiz questions linked to skills</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studysessions</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Timed study session records</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">srscards</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Spaced repetition flashcards</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">mistakejournals</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Logged incorrect answers for review</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">examsessions</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Timed exam attempts and results</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">learningplans</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">AI-generated weekly study plans</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">todotasks</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Daily challenge tasks</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">topicassignments</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Teacher-to-student topic assignments</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">notifications</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">In-app notification messages</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">performancelogs</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Per-session accuracy and response time</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">distractionlogs</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Focus anomaly detection records</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">tutorfeedbacks</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">AI tutor interaction ratings</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">learningcontents</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Curated learning resources per skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">userprogress</td><td style="border:1px solid #30363d;padding:10px;">_id (ObjectId)</td><td style="border:1px solid #30363d;padding:10px;">Aggregate progress tracking per user</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">2. Entity Definitions</h2>

<h3 style="color:#d2a8ff;">students</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">ObjectId</td><td style="border:1px solid #30363d;padding:10px;">✅ PK</td><td style="border:1px solid #30363d;padding:10px;">Auto-generated primary key</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">name</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Full display name</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">email</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅ Unique</td><td style="border:1px solid #30363d;padding:10px;">Login email — indexed, unique</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">passwordHash</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">bcryptjs hash, 10 salt rounds</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">role</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Enum: "student" | "teacher"</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">careerGoal</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">Target career path for recommendation alignment</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">xp</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 0</td><td style="border:1px solid #30363d;padding:10px;">Total experience points earned</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">level</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 1</td><td style="border:1px solid #30363d;padding:10px;">Computed level from XP thresholds</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">streak</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 0</td><td style="border:1px solid #30363d;padding:10px;">Consecutive daily study days</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">createdAt</td><td style="border:1px solid #30363d;padding:10px;">Date</td><td style="border:1px solid #30363d;padding:10px;">Auto</td><td style="border:1px solid #30363d;padding:10px;">Account creation timestamp</td></tr>
</table>

<h3 style="color:#d2a8ff;">skillnodes</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">ObjectId</td><td style="border:1px solid #30363d;padding:10px;">✅ PK</td><td style="border:1px solid #30363d;padding:10px;">Auto-generated primary key</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillId</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅ Unique</td><td style="border:1px solid #30363d;padding:10px;">Human-readable slug e.g. "algebra", "calculus"</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">name</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Display name of the skill</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">subject</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Subject area e.g. "Mathematics", "Computer Science"</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">difficulty</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">1–5 difficulty rating</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">prerequisites</td><td style="border:1px solid #30363d;padding:10px;">String[]</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">Array of skillId strings that must be mastered first</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">description</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">❌</td><td style="border:1px solid #30363d;padding:10px;">Short description of what the skill covers</td></tr>
</table>

<h3 style="color:#d2a8ff;">studentmasteries</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">ObjectId</td><td style="border:1px solid #30363d;padding:10px;">✅ PK</td><td style="border:1px solid #30363d;padding:10px;">Auto-generated primary key</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studentId</td><td style="border:1px solid #30363d;padding:10px;">ObjectId</td><td style="border:1px solid #30363d;padding:10px;">✅ FK → students</td><td style="border:1px solid #30363d;padding:10px;">Reference to the student</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillId</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅ FK → skillnodes.skillId</td><td style="border:1px solid #30363d;padding:10px;">Skill slug reference</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">mastery_score</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">BKT posterior probability 0.0–1.0</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">attempts</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 0</td><td style="border:1px solid #30363d;padding:10px;">Total number of answer attempts</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">lastUpdated</td><td style="border:1px solid #30363d;padding:10px;">Date</td><td style="border:1px solid #30363d;padding:10px;">Auto</td><td style="border:1px solid #30363d;padding:10px;">Timestamp of last BKT update</td></tr>
</table>

<h3 style="color:#d2a8ff;">srscards</h3>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Field</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Required</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Description</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">_id</td><td style="border:1px solid #30363d;padding:10px;">ObjectId</td><td style="border:1px solid #30363d;padding:10px;">✅ PK</td><td style="border:1px solid #30363d;padding:10px;">Auto-generated primary key</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studentId</td><td style="border:1px solid #30363d;padding:10px;">ObjectId</td><td style="border:1px solid #30363d;padding:10px;">✅ FK → students</td><td style="border:1px solid #30363d;padding:10px;">Owner of the card</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillId</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅ FK → skillnodes.skillId</td><td style="border:1px solid #30363d;padding:10px;">Skill this card belongs to</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">front</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Question / prompt side of the card</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">back</td><td style="border:1px solid #30363d;padding:10px;">String</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Answer / explanation side of the card</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">interval</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 1</td><td style="border:1px solid #30363d;padding:10px;">SM-2 review interval in days</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">easiness</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 2.5</td><td style="border:1px solid #30363d;padding:10px;">SM-2 easiness factor</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">repetitions</td><td style="border:1px solid #30363d;padding:10px;">Number</td><td style="border:1px solid #30363d;padding:10px;">✅ Default: 0</td><td style="border:1px solid #30363d;padding:10px;">Number of successful reviews</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">nextReview</td><td style="border:1px solid #30363d;padding:10px;">Date</td><td style="border:1px solid #30363d;padding:10px;">✅</td><td style="border:1px solid #30363d;padding:10px;">Next scheduled review date</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">3. Relationships Summary</h2>
<table style="border-collapse:collapse;width:100%;">
<tr style="background:#161b22;"><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">From</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">To</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Type</th><th style="border:1px solid #30363d;padding:10px;color:#79c0ff;">Via Field</th></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">studentmasteries</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">studentmasteries.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">studentmasteries</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">studentmasteries.skillId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">srscards</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">srscards.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">studysessions</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">studysessions.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">mistakejournals</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">mistakejournals.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">examsessions</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">examsessions.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">learningplans</td><td style="border:1px solid #30363d;padding:10px;">1 → 1</td><td style="border:1px solid #30363d;padding:10px;">learningplans.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">todotasks</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">todotasks.studentId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students (teacher)</td><td style="border:1px solid #30363d;padding:10px;">topicassignments</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">topicassignments.teacherId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">students</td><td style="border:1px solid #30363d;padding:10px;">notifications</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">notifications.userId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studysessions</td><td style="border:1px solid #30363d;padding:10px;">performancelogs</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">performancelogs.sessionId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">studysessions</td><td style="border:1px solid #30363d;padding:10px;">distractionlogs</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">distractionlogs.sessionId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">Many → Many (self)</td><td style="border:1px solid #30363d;padding:10px;">skillnodes.prerequisites[]</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">assessmentquestions</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">assessmentquestions.skillId</td></tr>
<tr><td style="border:1px solid #30363d;padding:10px;">skillnodes</td><td style="border:1px solid #30363d;padding:10px;">learningcontents</td><td style="border:1px solid #30363d;padding:10px;">1 → Many</td><td style="border:1px solid #30363d;padding:10px;">learningcontents.skillId</td></tr>
</table>

<hr style="border:none;border-top:1px solid #21262d;margin:32px 0;">

<h2 style="color:#79c0ff;">4. ER Diagram</h2>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 620" style="width:100%;max-width:900px;background:#0d1117;border:1px solid #30363d;border-radius:8px;display:block;margin:16px 0;">
  <defs>
    <marker id="era" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#58a6ff"/>
    </marker>
    <marker id="erg" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3fb950"/>
    </marker>
    <marker id="ero" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ffa657"/>
    </marker>
    <marker id="erp" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#d2a8ff"/>
    </marker>
  </defs>
  <text x="450" y="22" text-anchor="middle" fill="#58a6ff" font-size="13" font-family="monospace" font-weight="bold">EduPath AI — Entity Relationship Diagram</text>

  <!-- STUDENTS (center) -->
  <rect x="340" y="240" width="160" height="130" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="2"/>
  <rect x="340" y="240" width="160" height="22" rx="5" fill="#1f3a5f"/>
  <text x="420" y="256" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace" font-weight="bold">STUDENTS</text>
  <text x="350" y="276" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK)</text>
  <text x="350" y="290" fill="#c9d1d9" font-size="9" font-family="monospace">name, email (UK)</text>
  <text x="350" y="304" fill="#c9d1d9" font-size="9" font-family="monospace">passwordHash, role</text>
  <text x="350" y="318" fill="#c9d1d9" font-size="9" font-family="monospace">careerGoal, xp, level</text>
  <text x="350" y="332" fill="#c9d1d9" font-size="9" font-family="monospace">streak, createdAt</text>
  <text x="350" y="346" fill="#8b949e" font-size="9" font-family="monospace">→ 1:many to most entities</text>
  <text x="350" y="360" fill="#8b949e" font-size="9" font-family="monospace">via studentId FK</text>

  <!-- SKILLNODES (top center) -->
  <rect x="340" y="40" width="160" height="110" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="2"/>
  <rect x="340" y="40" width="160" height="22" rx="5" fill="#1a3a2a"/>
  <text x="420" y="56" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace" font-weight="bold">SKILLNODES</text>
  <text x="350" y="76" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK), skillId (UK)</text>
  <text x="350" y="90" fill="#c9d1d9" font-size="9" font-family="monospace">name, subject</text>
  <text x="350" y="104" fill="#c9d1d9" font-size="9" font-family="monospace">difficulty, description</text>
  <text x="350" y="118" fill="#c9d1d9" font-size="9" font-family="monospace">prerequisites[]</text>
  <text x="350" y="132" fill="#8b949e" font-size="9" font-family="monospace">→ 1:many to mastery, Q&amp;A</text>
  <!-- SKILLNODES → STUDENTS line -->
  <line x1="420" y1="150" x2="420" y2="238" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#erg)"/>
  <text x="428" y="200" fill="#3fb950" font-size="9" font-family="monospace">1:many</text>

  <!-- STUDENTMASTERIES (top left) -->
  <rect x="60" y="40" width="160" height="100" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <rect x="60" y="40" width="160" height="22" rx="5" fill="#3a2a1a"/>
  <text x="140" y="56" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace" font-weight="bold">STUDENTMASTERIES</text>
  <text x="70" y="76" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK)</text>
  <text x="70" y="90" fill="#c9d1d9" font-size="9" font-family="monospace">studentId (FK), skillId (FK)</text>
  <text x="70" y="104" fill="#c9d1d9" font-size="9" font-family="monospace">mastery_score, attempts</text>
  <text x="70" y="118" fill="#c9d1d9" font-size="9" font-family="monospace">lastUpdated</text>
  <line x1="220" y1="90" x2="338" y2="280" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ero)"/>

  <!-- ASSESSMENTQUESTIONS (top right) -->
  <rect x="680" y="40" width="160" height="100" rx="5" fill="#161b22" stroke="#ffa657" stroke-width="1.5"/>
  <rect x="680" y="40" width="160" height="22" rx="5" fill="#3a2a1a"/>
  <text x="760" y="56" text-anchor="middle" fill="#ffa657" font-size="10" font-family="monospace" font-weight="bold">ASSESSMENTQ</text>
  <text x="690" y="76" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK), skillId (FK)</text>
  <text x="690" y="90" fill="#c9d1d9" font-size="9" font-family="monospace">question, options[]</text>
  <text x="690" y="104" fill="#c9d1d9" font-size="9" font-family="monospace">correctAnswer, difficulty</text>
  <text x="690" y="118" fill="#c9d1d9" font-size="9" font-family="monospace">explanation</text>
  <line x1="680" y1="90" x2="502" y2="280" stroke="#ffa657" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ero)"/>

  <!-- SRSCARDS (left) -->
  <rect x="60" y="200" width="160" height="110" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <rect x="60" y="200" width="160" height="22" rx="5" fill="#2a1a3a"/>
  <text x="140" y="216" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace" font-weight="bold">SRSCARDS</text>
  <text x="70" y="236" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK)</text>
  <text x="70" y="250" fill="#c9d1d9" font-size="9" font-family="monospace">studentId (FK), skillId (FK)</text>
  <text x="70" y="264" fill="#c9d1d9" font-size="9" font-family="monospace">front, back</text>
  <text x="70" y="278" fill="#c9d1d9" font-size="9" font-family="monospace">interval, easiness</text>
  <text x="70" y="292" fill="#c9d1d9" font-size="9" font-family="monospace">nextReview</text>
  <line x1="220" y1="255" x2="338" y2="305" stroke="#d2a8ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#erp)"/>

  <!-- MISTAKEJOURNALS (right) -->
  <rect x="680" y="200" width="160" height="110" rx="5" fill="#161b22" stroke="#d2a8ff" stroke-width="1.5"/>
  <rect x="680" y="200" width="160" height="22" rx="5" fill="#2a1a3a"/>
  <text x="760" y="216" text-anchor="middle" fill="#d2a8ff" font-size="11" font-family="monospace" font-weight="bold">MISTAKEJOURNALS</text>
  <text x="690" y="236" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK)</text>
  <text x="690" y="250" fill="#c9d1d9" font-size="9" font-family="monospace">studentId (FK), skillId (FK)</text>
  <text x="690" y="264" fill="#c9d1d9" font-size="9" font-family="monospace">question, correctAnswer</text>
  <text x="690" y="278" fill="#c9d1d9" font-size="9" font-family="monospace">studentAnswer, resolved</text>
  <text x="690" y="292" fill="#c9d1d9" font-size="9" font-family="monospace">createdAt</text>
  <line x1="680" y1="255" x2="502" y2="305" stroke="#d2a8ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#erp)"/>

  <!-- STUDYSESSIONS (bottom left) -->
  <rect x="60" y="400" width="160" height="100" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <rect x="60" y="400" width="160" height="22" rx="5" fill="#1f3a5f"/>
  <text x="140" y="416" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace" font-weight="bold">STUDYSESSIONS</text>
  <text x="70" y="436" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK), studentId (FK)</text>
  <text x="70" y="450" fill="#c9d1d9" font-size="9" font-family="monospace">startTime, endTime</text>
  <text x="70" y="464" fill="#c9d1d9" font-size="9" font-family="monospace">skillsStudied[], xpEarned</text>
  <text x="70" y="478" fill="#8b949e" font-size="9" font-family="monospace">→ produces PerformanceLogs</text>
  <text x="70" y="492" fill="#8b949e" font-size="9" font-family="monospace">→ generates DistractionLogs</text>
  <line x1="220" y1="450" x2="338" y2="360" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#era)"/>

  <!-- EXAMSESSIONS (bottom right) -->
  <rect x="680" y="400" width="160" height="100" rx="5" fill="#161b22" stroke="#58a6ff" stroke-width="1.5"/>
  <rect x="680" y="400" width="160" height="22" rx="5" fill="#1f3a5f"/>
  <text x="760" y="416" text-anchor="middle" fill="#58a6ff" font-size="11" font-family="monospace" font-weight="bold">EXAMSESSIONS</text>
  <text x="690" y="436" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK), studentId (FK)</text>
  <text x="690" y="450" fill="#c9d1d9" font-size="9" font-family="monospace">questions[], answers[]</text>
  <text x="690" y="464" fill="#c9d1d9" font-size="9" font-family="monospace">score, timeTaken</text>
  <text x="690" y="478" fill="#c9d1d9" font-size="9" font-family="monospace">completedAt</text>
  <line x1="680" y1="450" x2="502" y2="360" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#era)"/>

  <!-- LEARNINGPLANS (bottom center) -->
  <rect x="340" y="500" width="160" height="100" rx="5" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <rect x="340" y="500" width="160" height="22" rx="5" fill="#1a3a2a"/>
  <text x="420" y="516" text-anchor="middle" fill="#3fb950" font-size="11" font-family="monospace" font-weight="bold">LEARNINGPLANS</text>
  <text x="350" y="536" fill="#c9d1d9" font-size="9" font-family="monospace">_id (PK), studentId (FK)</text>
  <text x="350" y="550" fill="#c9d1d9" font-size="9" font-family="monospace">weeks[], skills[]</text>
  <text x="350" y="564" fill="#c9d1d9" font-size="9" font-family="monospace">strategies[], confidence</text>
  <text x="350" y="578" fill="#c9d1d9" font-size="9" font-family="monospace">generatedAt</text>
  <line x1="420" y1="500" x2="420" y2="372" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#erg)"/>

  <!-- Legend -->
  <line x1="30" y1="580" x2="60" y2="580" stroke="#58a6ff" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="68" y="584" fill="#58a6ff" font-size="10" font-family="monospace">studentId FK relationship</text>
  <line x1="260" y1="580" x2="290" y2="580" stroke="#3fb950" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="298" y="584" fill="#3fb950" font-size="10" font-family="monospace">skillId FK relationship</text>
  <line x1="490" y1="580" x2="520" y2="580" stroke="#d2a8ff" stroke-width="1.5" stroke-dasharray="5,3"/>
  <text x="528" y="584" fill="#d2a8ff" font-size="10" font-family="monospace">both FKs</text>
</svg>

</body>
