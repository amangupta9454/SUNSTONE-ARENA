import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Target, Zap } from 'lucide-react'
import { startExam } from '../services/api'
import ExamCountdown from '../components/ExamCountdown'
import StudySessionSummary from '../components/StudySessionSummary'

const PRESETS = [
  { label: 'Quick Test', questions: 10, duration: 600, icon: Zap, color: 'text-cyan-400' },
  { label: 'Standard Exam', questions: 20, duration: 1800, icon: Target, color: 'text-indigo-400' },
  { label: 'Full Mock', questions: 40, duration: 3600, icon: Clock, color: 'text-purple-400' },
]

export default function Exam() {
  const [phase, setPhase] = useState('setup') // setup | countdown | result
  const [examData, setExamData] = useState(null)  // { session_id, questions, duration_seconds }
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(PRESETS[1])

  const handleStart = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await startExam({
        exam_name: selected.label,
        duration_seconds: selected.duration,
        question_count: selected.questions,
      })
      setExamData({
        session_id: res.data.session_id,
        questions: res.data.questions,
        duration_seconds: selected.duration,
      })
      setPhase('countdown')
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to start exam.')
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = (res) => {
    setResult(res)
    setPhase('result')
  }

  if (phase === 'countdown' && examData) {
    return (
      <ExamCountdown
        sessionId={examData.session_id}
        durationSeconds={examData.duration_seconds}
        questions={examData.questions}
        onComplete={handleComplete}
      />
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Exam Mode</h1>
        <p className="text-gray-400 text-sm">Full-screen timed exam with auto-submit and progress saving.</p>
      </motion.div>

      {/* Preset selector */}
      <div className="grid gap-4 mb-8">
        {PRESETS.map((p) => (
          <motion.button
            key={p.label}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelected(p)}
            className={`card text-left flex items-center gap-4 transition-all ${
              selected.label === p.label
                ? 'border-indigo-500/50 bg-indigo-500/5'
                : 'hover:border-white/10'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${p.color}`}>
              <p.icon size={22} />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">{p.label}</div>
              <div className="text-gray-400 text-sm">
                {p.questions} questions · {Math.floor(p.duration / 60)} minutes
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selected.label === p.label ? 'border-indigo-500 bg-indigo-500' : 'border-white/20'
            }`}>
              {selected.label === p.label && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Rules */}
      <div className="card mb-6 border-amber-500/20">
        <h3 className="text-amber-400 font-semibold text-sm mb-3">⚠️ Exam Rules</h3>
        <ul className="text-gray-400 text-sm space-y-1.5">
          <li>• Navigation is disabled during the exam</li>
          <li>• Progress is auto-saved every 30 seconds</li>
          <li>• Exam auto-submits when the timer reaches zero</li>
          <li>• Do not close or refresh the browser tab</li>
        </ul>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleStart}
        disabled={loading}
        className="btn-primary w-full text-lg py-4"
      >
        {loading ? 'Preparing Exam...' : `Start ${selected.label}`}
      </motion.button>

      {/* Result summary overlay */}
      {phase === 'result' && result && (
        <StudySessionSummary
          session={{
            total_questions: result.total,
            correct_answers: result.score,
            incorrect_answers: result.total - result.score,
            accuracy_percentage: result.percentage,
            time_spent_seconds: selected.duration,
            ai_feedback: result.percentage >= 80
              ? 'Great exam performance! Keep it up.'
              : 'Review your mistakes and try again.',
            suggested_topics: [],
          }}
          trendDelta={null}
          onClose={() => setPhase('setup')}
          onRetry={() => { setPhase('setup'); setResult(null) }}
        />
      )}
    </div>
  )
}
