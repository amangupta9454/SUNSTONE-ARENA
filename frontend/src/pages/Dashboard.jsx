import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import toast from 'react-hot-toast'
import { Sparkles, ChevronRight, BookOpen, Brain, CheckCircle2, RefreshCw } from 'lucide-react'
import { getProfile, getNextTopic, getSRSStats } from '../services/api'
import { getUser } from '../services/auth'
import useStore from '../store/useStore'
import GraphView from '../components/KnowledgeGraph/GraphView'
import WeakSpotRadar from '../components/WeakSpotRadar'
import StudyStreakCard from '../components/StudyStreakCard'
import XPProgressBar from '../components/XPProgressBar'
import CognitiveLoadWidget from '../components/intelligence/CognitiveLoadWidget'
import OptimalStudyTimeWidget from '../components/intelligence/OptimalStudyTimeWidget'
import PrereqGapWidget from '../components/intelligence/PrereqGapWidget'
import SmartBreakWidget from '../components/intelligence/SmartBreakWidget'
import QuestionDifficultyWidget from '../components/intelligence/QuestionDifficultyWidget'
import DistractionAnalyzerWidget from '../components/intelligence/DistractionAnalyzerWidget'
import StudentRiskCard from '../components/ai/StudentRiskCard'
import BurnoutAlert from '../components/ai/BurnoutAlert'
import MotivationBanner from '../components/ai/MotivationBanner'
import SkillHeatmap from '../components/ai/SkillHeatmap'

function estimateSessions(masteryScore) {
  if (masteryScore >= 0.7) return null
  const learnRate = 0.1
  return Math.max(1, Math.ceil(
    Math.log(1 - 0.7) / Math.log(1 - learnRate) -
    Math.log(1 - masteryScore) / Math.log(1 - learnRate)
  ))
}

// 3D tilt card wrapper
function TiltCard({ children, className = '', onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function MasteryCard({ skill, onClick }) {
  const pct = Math.round(skill.mastery_score * 100)
  const sessions = estimateSessions(skill.mastery_score)
  const color = pct >= 70 ? '#10B981' : pct >= 40 ? '#F59E0B' : '#EF4444'
  const glowColor = pct >= 70 ? 'rgba(16,185,129,0.15)' : pct >= 40 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)'

  return (
    <TiltCard
      onClick={onClick}
      className="card-glow cursor-pointer h-full"
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 70%)` }}
      />
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm truncate">{skill.skill_name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{skill.subject || 'General'}</p>
        </div>
        <span className="text-lg font-black ml-2 tabular-nums" style={{ color }}>{pct}%</span>
      </div>
      <div className="progress-bar mb-2">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{ background: `linear-gradient(90deg, ${color}66, ${color})` }}
        />
      </div>
      {sessions !== null ? (
        <p className="text-xs text-gray-500">~{sessions} session{sessions !== 1 ? 's' : ''} to mastery</p>
      ) : (
        <p className="text-xs" style={{ color: '#10B981' }}>✓ Mastered</p>
      )}
    </TiltCard>
  )
}

const STAT_CONFIG = [
  { label: 'Skills Tracked', icon: BookOpen, color: '#6366F1', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.25)' },
  { label: 'Avg Mastery',    icon: Brain,     color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.25)' },
  { label: 'Mastered',       icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)' },
  { label: 'SRS Due',        icon: RefreshCw, color: '#F59E0B', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { setMastery, setRecommendations } = useStore()
  const [profile, setProfile] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [srsStats, setSrsStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('skills')
  const [weakestSubject, setWeakestSubject] = useState('')
  const user = getUser()

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, topicRes] = await Promise.all([getProfile(), getNextTopic()])
        setProfile(profileRes.data)
        const masteryObj = {}
        profileRes.data.mastery_map?.forEach((m) => { masteryObj[m.skill_id] = m.mastery_score })
        setMastery(masteryObj)
        setRecommendation(topicRes.data.recommendation)
        setRecommendations(topicRes.data.recommendation ? [topicRes.data.recommendation] : [])
        getSRSStats().then((r) => setSrsStats(r.data)).catch(() => {})
        import('../services/api').then(({ getWeakSpots }) =>
          getWeakSpots().then((r) => {
            const spots = r.data?.weak_spots || []
            if (spots.length > 0) setWeakestSubject(spots[0].subject)
          }).catch(() => {})
        )
      } catch {
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full bg-primary/10 animate-pulse" />
        </div>
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  )

  const mastery_map = profile?.mastery_map || []
  const avgMastery = mastery_map.length > 0
    ? Math.round((mastery_map.reduce((s, m) => s + m.mastery_score, 0) / mastery_map.length) * 100)
    : 0
  const mastered = mastery_map.filter((m) => m.mastery_score >= 0.7).length

  const statValues = [mastery_map.length, `${avgMastery}%`, mastered, srsStats?.due ?? '—']
  const statOnClicks = [null, null, null, () => navigate('/app/review')]

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">

      {/* ── Hero greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="hero-card"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs text-primary font-medium uppercase tracking-widest">Dashboard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Welcome back,{' '}
              <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 🎯
            </h1>
            {user?.career_goal && (
              <p className="text-gray-400 mt-1.5 text-sm">
                Goal:{' '}
                <span className="font-semibold text-secondary capitalize">{user.career_goal}</span>
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/app/assessment')}
            className="btn-primary text-sm py-2.5 px-5 flex items-center gap-2 self-start sm:self-auto"
          >
            Take Assessment
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </motion.div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CONFIG.map((s, i) => {
          const Icon = s.icon
          return (
            <TiltCard
              key={s.label}
              onClick={statOnClicks[i]}
              className={`stat-card-3d ${statOnClicks[i] ? 'cursor-pointer' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: s.bg, border: `1px solid ${s.border}` }}
                >
                  <Icon size={18} style={{ color: s.color }} />
                </div>
                <div className="text-2xl sm:text-3xl font-black tabular-nums" style={{ color: s.color }}>
                  {statValues[i]}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
              </motion.div>
            </TiltCard>
          )
        })}
      </div>

      {/* ── Next Topic ── */}
      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-secondary" />
            <h2 className="text-base font-bold text-white">Your Next Step</h2>
          </div>
          <div
            className="next-topic-card flex items-center gap-4"
            onClick={() => navigate(`/app/learning/${recommendation.skill_id}`)}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
              }}
            >
              🎯
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate">{recommendation.name}</p>
              <p className="text-sm text-gray-400 mt-0.5 truncate">{recommendation.reason}</p>
            </div>
            <div className="text-right flex-shrink-0 hidden sm:block">
              <p className="text-sm font-bold text-primary">{Math.round(recommendation.score * 100)}% match</p>
              <p className="text-xs text-gray-500">Difficulty {recommendation.difficulty}/5</p>
            </div>
            <ChevronRight size={18} className="text-gray-500 flex-shrink-0" />
          </div>
        </motion.div>
      )}

      {/* ── Tabs ── */}
      <div>
        <div className="flex gap-1 p-1 w-fit mb-5 rounded-2xl" style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { id: 'skills', label: '📚 Skills' },
            { id: 'graph', label: '🕸️ Graph' },
            { id: 'intelligence', label: '🧠 Intelligence' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id ? 'text-white tab-active' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #1a2a4a, #0F1F3D)', border: '1px solid rgba(99,102,241,0.3)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'skills' && (
          mastery_map.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-16">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-white font-semibold text-lg">No mastery data yet</p>
              <p className="text-gray-400 text-sm mt-2">Take the assessment to get started</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/app/assessment')}
                className="btn-primary mt-5 text-sm py-2.5 px-6"
              >
                Start Assessment
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mastery_map.map((skill, i) => (
                <motion.div
                  key={skill.skill_id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative"
                >
                  <MasteryCard
                    skill={skill}
                    onClick={() => navigate(`/app/learning/${skill.skill_id}`)}
                  />
                </motion.div>
              ))}
            </div>
          )
        )}

        {activeTab === 'graph' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="card p-0 overflow-hidden"
            style={{ height: '520px', border: '1px solid rgba(99,102,241,0.15)' }}
          >
            <GraphView />
          </motion.div>
        )}

        {activeTab === 'intelligence' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <p className="text-gray-500 text-sm">
              AI-powered insights derived from your study patterns — computed entirely from your data.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CognitiveLoadWidget />
              <OptimalStudyTimeWidget />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PrereqGapWidget />
              <QuestionDifficultyWidget />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SmartBreakWidget weakestSubject={weakestSubject} />
              <DistractionAnalyzerWidget sessionId="dashboard" />
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Bottom row: Streak + XP + Weak Spots ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StudyStreakCard />
        <XPProgressBar />
        <WeakSpotRadar />
      </div>

      {/* ── Motivation banner ── */}
      <MotivationBanner />

      {/* ── Burnout alert ── */}
      <BurnoutAlert />

      {/* ── Heatmap + Risk ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SkillHeatmap />
        </div>
        <StudentRiskCard />
      </div>
    </div>
  )
}
