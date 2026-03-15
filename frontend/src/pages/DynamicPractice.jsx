import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateQuestions } from '../services/api'
import AutoTutorPopup from '../components/ai/AutoTutorPopup'

const SUBJECTS = ['General', 'Mathematics', 'Programming', 'Data Science']
const DIFFICULTIES = [
  { label: 'Easy', value: 1, color: 'text-success' },
  { label: 'Medium', value: 3, color: 'text-warning' },
  { label: 'Hard', value: 5, color: 'text-danger' },
]

export default function DynamicPractice() {
  const [topic, setTopic] = useState('')
  const [subject, setSubject] = useState('General')
  const [difficulty, setDifficulty] = useState(3)
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [wrongStreak, setWrongStreak] = useState(0)
  const [loading, setLoading] = useState(false)
  const [phase, setPhase] = useState('setup') // setup | quiz | result

  const handleStart = async () => {
    if (!topic.trim()) return
    setLoading(true)
    try {
      const res = await generateQuestions({ topic, subject, difficulty, count: 5 })
      setQuestions(res.data.questions || [])
      setCurrent(0)
      setScore(0)
      setWrongStreak(0)
      setSelected(null)
      setRevealed(false)
      setPhase('quiz')
    } catch {
      alert('Failed to generate questions. Make sure the AI service is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (key) => {
    if (revealed) return
    setSelected(key)
    setRevealed(true)
    const q = questions[current]
    const correct = key === q.correct_option
    if (correct) {
      setScore((s) => s + 1)
      setWrongStreak(0)
    } else {
      setWrongStreak((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setPhase('result')
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const handleRestart = () => {
    setPhase('setup')
    setQuestions([])
    setTopic('')
  }

  // ── Setup screen ─────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-white">⚡ Dynamic Practice</h1>
          <p className="text-gray-400 mt-1">AI-generated questions tailored to any topic</p>
        </motion.div>

        <div className="card space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Topic</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="e.g. Binary Trees, Calculus, Neural Networks..."
              className="input"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Subject</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSubject(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                    subject === s
                      ? 'border-primary bg-primary/20 text-primary'
                      : 'border-white/10 text-gray-400 hover:border-primary/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Difficulty</label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                    difficulty === d.value
                      ? 'border-primary bg-primary/20 text-white'
                      : 'border-white/10 text-gray-400 hover:border-primary/30'
                  }`}
                >
                  <span className={d.color}>{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!topic.trim() || loading}
            className="btn-primary w-full"
          >
            {loading ? 'Generating...' : '⚡ Generate 5 Questions'}
          </button>
        </div>
      </div>
    )
  }

  // ── Result screen ─────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto mt-10 text-center space-y-6"
      >
        <div className="card p-8 space-y-5">
          <div className="text-6xl">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
          <h2 className="text-2xl font-bold text-white">{score}/{questions.length} Correct</h2>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleStart} className="btn-primary flex-1">Retry Same Topic</button>
            <button onClick={handleRestart} className="btn-outline flex-1">New Topic</button>
          </div>
        </div>
      </motion.div>
    )
  }

  // ── Quiz screen ───────────────────────────────────────────────────────────────
  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <AutoTutorPopup wrongStreak={wrongStreak} topic={topic} onDismiss={() => setWrongStreak(0)} />

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">⚡ {topic}</h1>
          <p className="text-sm text-gray-400">Question {current + 1} of {questions.length}</p>
        </div>
        <span className="badge badge-primary text-xs">{subject}</span>
      </motion.div>

      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="card space-y-5"
        >
          <p className="text-base font-semibold text-white leading-relaxed">{q.question_text}</p>

          <div className="space-y-3">
            {Object.entries(q.options).map(([key, text]) => {
              let cls = 'border-white/10 bg-dark-700 text-gray-300 hover:border-primary/40 cursor-pointer'
              if (revealed) {
                if (key === q.correct_option) cls = 'border-success bg-success/10 text-white'
                else if (key === selected) cls = 'border-danger bg-danger/10 text-white'
                else cls = 'border-white/5 bg-dark-800 text-gray-600 opacity-50'
              }
              return (
                <motion.button
                  key={key}
                  whileHover={!revealed ? { scale: 1.01 } : {}}
                  whileTap={!revealed ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(key)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${cls}`}
                >
                  <span className="font-bold text-primary mr-3 uppercase">{key}.</span>
                  {text}
                </motion.button>
              )
            })}
          </div>

          {/* Explanation after reveal */}
          <AnimatePresence>
            {revealed && q.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-primary/10 border border-primary/20 rounded-xl p-4"
              >
                <p className="text-xs font-semibold text-primary mb-1">💡 Explanation</p>
                <p className="text-sm text-gray-300">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {revealed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="btn-primary w-full"
            >
              {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
