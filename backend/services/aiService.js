const axios = require('axios');

// Base URL for the Python AI microservice (set in .env as AI_SERVICE_URL)
const AI_BASE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// ─── Update Mastery via BKT ───────────────────────────────────────────────────
// Sends student answers to the Python service which runs Bayesian Knowledge Tracing
// answers: [{ skill_id, is_correct, response_time_ms }]
const updateMastery = async (student_id, answers) => {
  try {
    console.log(`🤖 AI Service: updating mastery for student ${student_id}, ${answers.length} answers`);
    const response = await axios.post(`${AI_BASE_URL}/mastery/update`, {
      student_id,
      answers,
    });
    return response.data;
  } catch (err) {
    console.error('❌ AI Service updateMastery error:', err.message);
    throw new Error('AI service unavailable. Could not update mastery.');
  }
};

// ─── Get Topic Recommendations ────────────────────────────────────────────────
// Sends the student's current mastery map to Python, gets back top 3 recommended topics
// mastery_map: [{ skill_id, score }]
const getRecommendations = async (student_id, mastery_map, career_goal = '') => {
  try {
    console.log(`🤖 AI Service: getting recommendations for student ${student_id}`);
    const response = await axios.post(`${AI_BASE_URL}/recommend`, {
      student_id,
      mastery_map,
      career_goal,
    });
    return response.data;
  } catch (err) {
    console.error('❌ AI Service getRecommendations error:', err.message);
    throw new Error('AI service unavailable. Could not get recommendations.');
  }
};

// ─── Get Knowledge Graph ──────────────────────────────────────────────────────
// Fetches the student's personalized knowledge graph (nodes + edges) from Python
const getKnowledgeGraph = async (student_id) => {
  try {
    console.log(`🤖 AI Service: fetching knowledge graph for student ${student_id}`);
    const response = await axios.get(`${AI_BASE_URL}/knowledge-graph/${student_id}`);
    return response.data;
  } catch (err) {
    console.error('❌ AI Service getKnowledgeGraph error:', err.message);
    throw new Error('AI service unavailable. Could not fetch knowledge graph.');
  }
};

module.exports = { updateMastery, getRecommendations, getKnowledgeGraph };
