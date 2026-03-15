import axios from 'axios'
import { getToken, logout } from './auth'

// Base axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      logout()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const register = (data) => api.post('/api/auth/register', data)
export const login = (data) => api.post('/api/auth/login', data)

// ─── Student ──────────────────────────────────────────────────────────────────
export const getProfile = () => api.get('/api/student/profile')
export const updateProfile = (data) => api.put('/api/student/profile', data)

// ─── Assessment ───────────────────────────────────────────────────────────────
export const startAssessment = () => api.get('/api/assessment/start')
export const submitAssessment = (answers) => api.post('/api/assessment/submit', { answers })

// ─── Learning ─────────────────────────────────────────────────────────────────
export const getLearningPath = () => api.get('/api/learning/path')
export const getNextTopic = () => api.get('/api/learning/next-topic')
export const getContent = (skillId) => api.get(`/api/learning/content/${skillId}`)
export const completeContent = (data) => api.post('/api/learning/complete', data)
export const getKnowledgeGraph = () => api.get('/api/learning/graph')

// ─── Analytics ────────────────────────────────────────────────────────────────
export const getStudentAnalytics = (studentId) => api.get(`/api/analytics/student/${studentId}`)
export const getClassAnalytics = () => api.get('/api/analytics/class')

// ─── Learning Plan ────────────────────────────────────────────────────────────
export const generatePlan = (career_goal = '') => api.post('/api/plan/generate', { career_goal })
export const getPlan = () => api.get('/api/plan')

// ─── Todo / Challenges ────────────────────────────────────────────────────────
export const getTodos = () => api.get('/api/todo')
export const createTodo = (data) => api.post('/api/todo', data)
export const updateTodo = (id, data) => api.put(`/api/todo/${id}`, data)
export const deleteTodo = (id) => api.delete(`/api/todo/${id}`)
export const toggleTodo = (id) => api.patch(`/api/todo/${id}/toggle`)

// ─── AI Tutor (streaming via fetch, NOT axios) ────────────────────────────────
// Returns a ReadableStream so the UI can render text word-by-word as it arrives
export const queryTutor = async (question, topic, masteryScore) => {
  const token = getToken()
  const response = await fetch(
    `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tutor/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, topic, mastery_score: masteryScore }),
    }
  )
  if (!response.ok) throw new Error('Tutor service unavailable')
  return response.body // Returns the raw ReadableStream
}

export default api

// ─── SRS ──────────────────────────────────────────────────────────────────────
export const getSRSDue = () => api.get('/api/srs/due')
export const getSRSStats = () => api.get('/api/srs/stats')
export const submitSRSReview = (skill_id, quality) => api.post('/api/srs/review', { skill_id, quality })
export const initSRSCards = () => api.post('/api/srs/init')

// ─── Notifications ────────────────────────────────────────────────────────────
export const getNotifications = () => api.get('/api/notifications')
export const markNotifRead = (id) => api.patch(`/api/notifications/${id}/read`)
export const markAllNotifsRead = () => api.patch('/api/notifications/read-all')

// ─── Leaderboard ──────────────────────────────────────────────────────────────
export const getLeaderboard = () => api.get('/api/leaderboard')

// ─── Assignments ──────────────────────────────────────────────────────────────
export const createAssignment = (data) => api.post('/api/assignments', data)
export const getMyAssignments = () => api.get('/api/assignments/my')
export const getGivenAssignments = () => api.get('/api/assignments/given')
export const completeAssignment = (id) => api.patch(`/api/assignments/${id}/complete`)

// ─── Tutor Feedback ───────────────────────────────────────────────────────────
export const submitTutorFeedback = (data) => api.post('/api/tutor/feedback', data)

// ─── Export ───────────────────────────────────────────────────────────────────
export const exportStudentReport = (studentId) => api.get(`/api/analytics/export/${studentId}`)

// ─── Study Session ────────────────────────────────────────────────────────────
export const saveStudySession = (data) => api.post('/api/study-session', data)
export const getSessionHistory = () => api.get('/api/study-session/history')
export const getLatestSession = () => api.get('/api/study-session/latest')

// ─── XP / Progress ────────────────────────────────────────────────────────────
export const getMyProgress = () => api.get('/api/xp/progress')
export const awardXP = (data) => api.post('/api/xp/award', data)
export const recordDailyLogin = () => api.post('/api/xp/daily-login')

// ─── Mistake Journal ──────────────────────────────────────────────────────────
export const saveMistakes = (mistakes) => api.post('/api/mistakes/bulk', { mistakes })
export const getMyMistakes = (params) => api.get('/api/mistakes', { params })
export const getMistakeSubjects = () => api.get('/api/mistakes/subjects')
export const markMistakeReviewed = (id) => api.patch(`/api/mistakes/${id}/review`)
export const addMistakeNote = (id, note) => api.patch(`/api/mistakes/${id}/note`, { note })
export const retryMistake = (id, selected_option) => api.post(`/api/mistakes/${id}/retry`, { selected_option })

// ─── Weak Spots ───────────────────────────────────────────────────────────────
export const getWeakSpots = () => api.get('/api/analytics/weak-spots')

// ─── Exam ─────────────────────────────────────────────────────────────────────
export const startExam = (data) => api.post('/api/exam/start', data)
export const getActiveExam = () => api.get('/api/exam/active')
export const saveExamProgress = (sessionId, answers) => api.post(`/api/exam/${sessionId}/progress`, { answers })
export const submitExam = (sessionId, data) => api.post(`/api/exam/${sessionId}/submit`, data)

// ─── Intelligence Analytics ───────────────────────────────────────────────────
export const getCognitiveLoad = () => api.get('/api/analytics/cognitive-load')
export const getOptimalStudyTime = () => api.get('/api/analytics/optimal-time')
export const getPrereqGaps = () => api.get('/api/analytics/prereq-gaps')
export const getQuestionDifficulty = () => api.get('/api/analytics/question-difficulty')
export const logDistractionEvent = (data) => api.post('/api/analytics/distraction', data)
export const getDistractionReport = () => api.get('/api/analytics/distraction-report')

// ─── Intelligence / Advanced AI ───────────────────────────────────────────────
export const getStudentRisk = () => api.get('/api/intelligence/student-risk')
export const getClassRisk = () => api.get('/api/intelligence/class-risk')
export const getCurriculumRecommendation = () => api.get('/api/intelligence/curriculum')
export const generateQuestions = (data) => api.post('/api/intelligence/generate-questions', data)
export const getLearningStyle = () => api.get('/api/intelligence/learning-style')
export const getBurnoutRisk = () => api.get('/api/intelligence/burnout')
export const getMotivationMessages = () => api.get('/api/intelligence/motivation')
export const getSkillHeatmap = () => api.get('/api/intelligence/heatmap')
