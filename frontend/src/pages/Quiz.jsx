import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { startAssessment, submitAssessment, saveStudySession, awardXP } from '../services/api'
import QuizTimer from '../components/Quiz/QuizTimer'

const QUESTION_TIME = 30 // seconds per question

export default function Quiz() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  // answers: [{ question_id, skill_id, selected_option }]
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null) // letter key: 'a' | 'b' | 'c' | 'd'
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [timerKey, setTimerKey] = useState(0)
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    startAssessment()
      .then((r) => {
        setQuestions(r.data.questions || [])
        startTimeRef.current = Date.now()
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false))
  }, [])

  const handleAnswer = (key) => {
    if (selected !== null) return // already answered
    const q = questions[current]
    setSelected(key)

    setTimeout(() => {
      setAnswers((prev) => [
        ...prev,
        { question_id: q.id, skill_id: q.skill_id, selected_option: key },
      ])
      nextQuestion()
    }, 700)
  }

  const handleTimeout = () => {
    const q = questions[current]
    // On timeout, submit 'a' as a default (will be graded wrong unless correct)
    setAnswers((prev) => [
      ...prev,
      { question_id: q.id, skill_id: q.skill_id, selected_option: 'a' },
    ])
    nextQuestion()
  }

  const nextQuestion = () => {
    setSelected(null)
    setTimerKey((k) => k + 1)
    if (current + 1 >= questions.length) {
      finishQuiz()
    } else {
      setCurrent((c) => c + 1)
    }
  }

  const finishQuiz = async () => {
    setSubmitting(true)
    const timeSpentMs = Date.now() - startTimeRef.current
    try {
      const res = await submitAssessment(answers)
      const data = res.data

      // Save study session
      try {
        await saveStudySession({
          session_type: 'quiz',
          total_questions: data.total,
          correct_answers: data.score,
          time_spent_seconds: Math.round(timeSpentMs / 1000),
        })
      } catch { /* non-critical */ }

      // Award XP based on score
      try {
        await awardXP({
          action: 'quiz_complete',
          accuracy_percentage: data.percentage,
          correct_answers: data.score,
        })
      } catch { /* non-critical */ }

      setResult(data)
    } catch {
      setResult({ score: 0, total: questions.length, percentage: 0, message: 'Submission failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-gray-400">Loading quiz...</p>
      </div>
    </div>
  )

  if (!questions.length) return (
    <div className="max-w-lg mx-auto mt-16 text-center">
      <p className="text-5xl mb-4">📭</p>
      <p className="text-gray-400">No questions available. Seed the database first.</p>
    </div>
  )

  // ── Submitting ───────────────────────────────────────────────────────────────
  if (submitting) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-5xl">🤖</motion.div>
      <p className="text-xl font-bold text-white">Calculating your results...</p>
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  // ── Result screen ────────────────────────────────────────────────────────────
  if (result) {
    const pct = result.percentage ?? Math.round((result.score / result.total) * 100)
    const grade = pct >= 80 ? '🏆 Excellent' : pct >= 60 ? '👍 Good' : pct >= 40 ? '📚 Keep Going' : '💪 Needs Work'
    const gradeColor = pct >= 80 ? 'text-success' : pct >= 60 ? 'text-accent' : pct >= 40 ? 'text-warning' : 'text-danger'

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto mt-10 text-center space-y-6"
      >
        <div className="card p-8 space-y-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="text-6xl"
          >
            {pct >= 60 ? '🎉' : '📖'}
          </motion.div>

          <div>
            <h2 className={`text-2xl font-bold ${gradeColor}`}>{grade}</h2>
            <p className="text-gray-400 mt-1">
              You scored <span className="text-white font-semibold">{result.score}/{result.total}</span> ({pct}%)
            </p>
          </div>

          {/* Score bar */}
          <div className="w-full bg-dark-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
              className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { label: 'Correct', value: result.score, color: 'text-success' },
              { label: 'Wrong', value: result.total - result.score, color: 'text-danger' },
              { label: 'Accuracy', value: `${pct}%`, color: 'text-primary' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-dark-700 rounded-xl p-3">
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate('/app/plan')}
              className="btn-primary flex-1 text-sm py-2.5"
            >
              📋 Learning Plan
            </button>
            <button
              onClick={() => navigate('/app/challenges')}
              className="btn-outline flex-1 text-sm py-2.5"
            >
              🎯 Challenges
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  // ── Quiz screen ──────────────────────────────────────────────────────────────
  const q = questions[current]
  const progress = (current / questions.length) * 100
  const optionEntries = Object.entries(q.options) // [['a', '...'], ['b', '...'], ...]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">📝 Quiz</h1>
          <p className="text-sm text-gray-400">Question {current + 1} of {questions.length}</p>
        </div>
        <div className="w-48">
          <QuizTimer key={timerKey} seconds={QUESTION_TIME} onExpire={handleTimeout} />
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full bg-dark-700 rounded-full h-2">
        <motion.div
          className="h-2 bg-primary rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
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
          <p className="text-xs font-semibold text-primary uppercase">{q.skill_name || 'General'}</p>
          <p className="text-base font-semibold text-white leading-relaxed">{q.question_text}</p>

          <div className="space-y-3">
            {optionEntries.map(([key, text]) => {
              let cls = 'border-white/10 bg-dark-700 text-gray-300 hover:border-primary/40 hover:bg-primary/5 cursor-pointer'
              if (selected !== null) {
                if (key === selected) cls = 'border-primary bg-primary/20 text-white shadow-glow-sm'
                else cls = 'border-white/5 bg-dark-800 text-gray-500 opacity-50'
              }
              return (
                <motion.button
                  key={key}
                  whileHover={selected === null ? { scale: 1.01 } : {}}
                  whileTap={selected === null ? { scale: 0.99 } : {}}
                  onClick={() => handleAnswer(key)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${cls}`}
                >
                  <span className="font-bold text-primary mr-3 uppercase">{key}.</span>
                  {text}
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
