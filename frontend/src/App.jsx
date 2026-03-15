import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { isAuthenticated, isTeacher } from './services/auth'

// App layout + pages
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Assessment from './pages/Assessment'
import Learning from './pages/Learning'
import Tutor from './pages/Tutor'
import TeacherDashboard from './pages/TeacherDashboard'
import Quiz from './pages/Quiz'
import LearningPlan from './pages/LearningPlan'
import Challenges from './pages/Challenges'
import Leaderboard from './pages/Leaderboard'
import SRSReview from './pages/SRSReview'
import MistakeJournal from './pages/MistakeJournal'
import Exam from './pages/Exam'
import DynamicPractice from './pages/DynamicPractice'
import AdaptivePathV2 from './pages/AdaptivePathV2'
import ClassInsightsDashboard from './pages/ClassInsightsDashboard'

// Marketing layout + pages
import MarketingLayout from './components/marketing/MarketingLayout'
import Home from './pages/marketing/Home'
import Features from './pages/marketing/Features'
import About from './pages/marketing/About'
import Contact from './pages/marketing/Contact'

const ProtectedRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />

const TeacherRoute = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  if (!isTeacher()) return <Navigate to="/app/dashboard" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* ── Marketing (public) ── */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ── Auth ── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── App (protected) ── */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="plan" element={<LearningPlan />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="review" element={<SRSReview />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="learning/:skillId" element={<Learning />} />
          <Route path="tutor" element={<Tutor />} />
          <Route path="mistakes" element={<MistakeJournal />} />
          <Route path="exam" element={<Exam />} />
          <Route path="practice" element={<DynamicPractice />} />
          <Route path="adaptive-path" element={<AdaptivePathV2 />} />
          <Route
            path="class-insights"
            element={
              <TeacherRoute>
                <ClassInsightsDashboard />
              </TeacherRoute>
            }
          />
          <Route
            path="teacher"
            element={
              <TeacherRoute>
                <TeacherDashboard />
              </TeacherRoute>
            }
          />
        </Route>

        {/* Legacy redirect: /dashboard → /app/dashboard */}
        <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/assessment" element={<Navigate to="/app/assessment" replace />} />
        <Route path="/quiz" element={<Navigate to="/app/quiz" replace />} />
        <Route path="/plan" element={<Navigate to="/app/plan" replace />} />
        <Route path="/challenges" element={<Navigate to="/app/challenges" replace />} />
        <Route path="/tutor" element={<Navigate to="/app/tutor" replace />} />
        <Route path="/teacher" element={<Navigate to="/app/teacher" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
