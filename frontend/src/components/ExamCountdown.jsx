import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { saveExamProgress, submitExam } from '../services/api'

/**
 * ExamCountdown — full-screen exam mode with animated circular timer.
 * Props:
 *   sessionId       — exam session ID from backend
 *   durationSeconds — total exam time
 *   questions       — array of question objects
 *   onComplete      — callback(result) when exam finishes
 */
export default function ExamCountdown({ sessionId, durationSeconds, questions, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // { question_id: selected_option }
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const autoSaveRef = useRef(null)
  const timerRef = useRef(null)

  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / questions.length) * 100

  // ── Auto-save every 30 seconds ──────────────────────────────────────────────
  const doAutoSave = useCallback(async () => {
    if (!sessionId || submitted) return
    const payload = Object.entries(answers).map(([question_id, selected_option]) => ({
      question_id,
      selected_option,
    }))
    try {
      await saveExamProgress(sessionId, payload)
    } catch (e) {
      // Silent fail — don't interrupt the exam
    }
  }, [sessionId, answers, submitted])

  useEffect(() => {
    autoSaveRef.current = setInterval(doAutoSave, 30000)
    return () => clearInterval(autoSaveRef.current)
  }, [doAutoSave])

  // ── Countdown timer ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (submitted) return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          handleSubmit(true) // auto-submit
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [submitted])

  // ── Block navigation during exam ────────────────────────────────────────────
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
  }

  const handleSubmit = async (auto = false) => {
    if (submitting || submitted) return
    setSubmitting(true)
    clearInterval(timerRef.current)
    clearInterval(autoSaveRef.current)

    const finalAnswers = Object.entries(answers).map(([question_id, selected_option]) => ({
      question_id,
      selected_option,
    }))

    try {
      const res = await submitExam(sessionId, { answers: finalAnswers, auto_submitted: auto })
      setSubmitted(true)
      onComplete?.(res.data)
    } catch (e) {
      console.error('Submit failed', e)
    } finally {
      setSubmitting(false)
    }
  }

  // ── Timer display helpers ───────────────────────────────────────────────────
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timerPct = (timeLeft / durationSeconds) * 100
  const circumference = 2 * Math.PI * 54 // r=54
  const strokeDashoffset = circumference - (timerPct / 100) * circumference
  const timerColor = timeLeft < 60 ? '#EF4444' : timeLeft < 300 ? '#F59E0B' : '#6366F1'

  const currentQ = questions[currentIdx]

  return (
    <div className="fixed inset-0 z-50 bg-[#050B18] flex flex-col overflow-hidden">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A1628]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white font-semibold">Exam Mode</span>
        </div>

        {/* Circular timer */}
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={timerColor} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-sm tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">{answeredCount}/{questions.length} answered</span>
          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-indigo-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* ── Question dots ── */}
      <div className="flex gap-1.5 px-6 py-3 flex-wrap border-b border-white/5">
        {questions.map((q, i) => (
          <button
            key={q.id}
            onClick={() => setCurrentIdx(i)}
            className={`w-7 h-7 rounded text-xs font-semibold transition-all ${
              i === currentIdx
                ? 'bg-indigo-500 text-white scale-110'
                : answers[q.id]
                ? 'bg-emerald-500/30 text-emerald-400 border border-emerald-500/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ── Question area ── */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl"
          >
            <div className="card mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="badge badge-primary">Q{currentIdx + 1}</span>
                <span className="text-gray-400 text-sm">{currentQ?.subject}</span>
              </div>
              <p className="text-white text-lg leading-relaxed">{currentQ?.question_text}</p>
            </div>

            <div className="grid gap-3">
              {currentQ && Object.entries(currentQ.options).map(([key, text]) => {
                const isSelected = answers[currentQ.id] === key
                return (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(currentQ.id, key)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500 text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:border-indigo-500/50 hover:bg-white/10'
                    }`}
                  >
                    <span className={`inline-flex w-7 h-7 rounded-lg items-center justify-center text-sm font-bold mr-3 ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-white/10 text-gray-400'
                    }`}>
                      {key.toUpperCase()}
                    </span>
                    {text}
                  </motion.button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={currentIdx === 0}
                className="btn-outline disabled:opacity-30"
              >
                ← Previous
              </button>
              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="btn-primary"
                >
                  Next →
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="btn-primary bg-emerald-600 hover:bg-emerald-500"
                >
                  {submitting ? 'Submitting...' : 'Submit Exam'}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
