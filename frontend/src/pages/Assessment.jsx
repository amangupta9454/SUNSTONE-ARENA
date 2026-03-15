import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { startAssessment, submitAssessment } from '../services/api'
import useStore from '../store/useStore'

const DIFF_LABELS = ['', 'Beginner', 'Easy', 'Medium', 'Hard', 'Expert']
const DIFF_COLORS = ['', 'text-success', 'text-accent', 'text-warning', 'text-orange-400', 'text-danger']

export default function Assessment() {
  const navigate = useNavigate()
  const setMastery = useStore((s) => s.setMastery)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [adaptive, setAdaptive] = useState(false)
  const [targetDiff, setTargetDiff] = useState(null)
  const [startTime, setStartTime] = useState(Date.now())

  useEffect(() => {
    startAssessment()
      .then(({ data }) => {
        setQuestions(data.questions)
        setAdaptive(data.adaptive || false)
        setTargetDiff(data.target_difficulty || null)
        setStartTime(Date.now())
      })
      .catch(() => toast.error('Failed to load assessment questions'))
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (option) => {
    setAnswers({ ...answers, [current]: option })
  }

  const handleNext = () => {
    setCurrent((c) => c + 1)
    setStartTime(Date.now())
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const payload = questions.map((q, i) => ({
        question_id: q.id,
        skill_id: q.skill_id,
        selected_option: answers[i] || 'a',
        response_time_ms: 3000,
      }))
      const { data } = await submitAssessment(payload)
      const masteryObj = {}
      data.mastery_map?.forEach((m) => { masteryObj[m.skill_id] = m.mastery_score })
      setMastery(masteryObj)
      toast.success(`Score: ${data.score}/${data.total} (${data.percentage}%)`)
      navigate('/app/dashboard')
    } catch {
      toast.error('Failed to submit assessment')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-400">Loading your assessment...</p>
      </div>
    </div>
  )

  if (submitting) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-5xl mb-4">🤖</motion.div>
        <p className="text-xl font-bold text-white">AI is analyzing your results...</p>
        <p className="text-gray-400 mt-2">Running Bayesian Knowledge Tracing</p>
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mt-4" />
      </div>
    </div>
  )

  const q = questions[current]
  const isLast = current === questions.length - 1
  const hasAnswer = !!answers[current]
  const progress = ((current + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Diagnostic Assessment</h1>
            <p className="text-gray-400 mt-1">Answer all questions to calibrate your learning path</p>
          </div>
          {adaptive && targetDiff && (
            <div className="badge badge-primary text-xs">
              🎯 Adaptive (Diff {targetDiff}/5)
            </div>
          )}
        </div>
      </motion.div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <motion.div className="progress-fill" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="card space-y-5"
        >
          {/* Skill info */}
          <div className="flex items-center gap-2">
            <span className="badge badge-primary text-xs">{q?.skill_name}</span>
            <span className={`text-xs font-medium ${DIFF_COLORS[q?.difficulty || 1]}`}>
              {DIFF_LABELS[q?.difficulty || 1]}
            </span>
          </div>

          <p className="text-white font-medium text-base leading-relaxed">{q?.question_text}</p>

          <div className="space-y-2">
            {q && Object.entries(q.options).map(([key, val]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleSelect(key)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${
                  answers[current] === key
                    ? 'border-primary bg-primary/20 text-white shadow-glow-sm'
                    : 'border-white/10 bg-dark-700 text-gray-300 hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                <span className="font-bold text-primary mr-3 uppercase">{key}.</span>
                {val}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="btn-outline text-sm py-2 px-5 disabled:opacity-30"
        >
          ← Previous
        </button>
        {isLast ? (
          <button onClick={handleSubmit} disabled={!hasAnswer} className="btn-primary text-sm py-2 px-6 disabled:opacity-50">
            Submit Test ✓
          </button>
        ) : (
          <button onClick={handleNext} disabled={!hasAnswer} className="btn-primary text-sm py-2 px-6 disabled:opacity-50">
            Next →
          </button>
        )}
      </div>
    </div>
  )
}
