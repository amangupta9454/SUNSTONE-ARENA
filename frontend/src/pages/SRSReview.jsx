import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { getSRSDue, submitSRSReview, initSRSCards, getSRSStats } from '../services/api'

const QUALITY_LABELS = [
  { q: 0, label: 'Blackout', color: 'bg-danger/20 border-danger/40 text-danger', emoji: '💀' },
  { q: 1, label: 'Wrong', color: 'bg-danger/10 border-danger/30 text-red-400', emoji: '❌' },
  { q: 2, label: 'Hard', color: 'bg-warning/10 border-warning/30 text-warning', emoji: '😰' },
  { q: 3, label: 'Good', color: 'bg-success/10 border-success/30 text-success', emoji: '✅' },
  { q: 4, label: 'Easy', color: 'bg-accent/10 border-accent/30 text-accent', emoji: '😊' },
  { q: 5, label: 'Perfect', color: 'bg-primary/10 border-primary/30 text-primary', emoji: '🌟' },
]

export default function SRSReview() {
  const [cards, setCards] = useState([])
  const [stats, setStats] = useState(null)
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const [reviewed, setReviewed] = useState(0)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [dueRes, statsRes] = await Promise.all([getSRSDue(), getSRSStats()])
      setCards(dueRes.data.cards || [])
      setStats(statsRes.data)
    } catch {
      toast.error('Failed to load review cards')
    } finally {
      setLoading(false)
    }
  }

  const handleInit = async () => {
    setLoading(true)
    try {
      const r = await initSRSCards()
      toast.success(`Initialized ${r.data.cards_created} review cards!`)
      await loadData()
    } catch {
      toast.error('Failed to initialize cards')
    } finally {
      setLoading(false)
    }
  }

  const handleRate = async (quality) => {
    const card = cards[current]
    try {
      await submitSRSReview(card.skill_id._id, quality)
      setReviewed((r) => r + 1)
      if (current + 1 >= cards.length) {
        setDone(true)
      } else {
        setFlipped(false)
        setTimeout(() => setCurrent((c) => c + 1), 300)
      }
    } catch {
      toast.error('Failed to submit review')
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  const card = cards[current]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">🔁 Spaced Repetition Review</h1>
        <p className="text-gray-400 mt-1">Review skills before they fade from memory</p>
      </motion.div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Due Today', value: stats.due, color: 'text-danger' },
            { label: 'Reviewed Today', value: stats.reviewed_today, color: 'text-success' },
            { label: 'Total Cards', value: stats.total, color: 'text-primary' },
          ].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {stats?.total === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-12">
          <div className="text-5xl mb-4">🃏</div>
          <h2 className="text-lg font-semibold text-white">No review cards yet</h2>
          <p className="text-gray-400 text-sm mt-1 mb-6">Initialize cards from your mastered skills to start reviewing</p>
          <button onClick={handleInit} className="btn-primary">Initialize Review Cards</button>
        </motion.div>
      )}

      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-white">Session Complete!</h2>
          <p className="text-gray-400 mt-2">You reviewed {reviewed} card{reviewed !== 1 ? 's' : ''}</p>
          <button onClick={() => { setDone(false); setCurrent(0); setReviewed(0); loadData() }} className="btn-primary mt-6">
            Review Again
          </button>
        </motion.div>
      )}

      {!done && cards.length > 0 && card && (
        <div className="space-y-4">
          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 progress-bar">
              <div className="progress-fill" style={{ width: `${(current / cards.length) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-400">{current}/{cards.length}</span>
          </div>

          {/* Flashcard */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="card-glow min-h-48 flex flex-col items-center justify-center text-center cursor-pointer select-none"
              onClick={() => setFlipped((f) => !f)}
            >
              {!flipped ? (
                <div>
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Skill — tap to reveal</p>
                  <h2 className="text-2xl font-bold text-white">{card.skill_id?.name}</h2>
                  <p className="text-gray-400 mt-2">{card.skill_id?.subject}</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    {Array.from({ length: card.skill_id?.difficulty || 1 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">How well do you know this?</p>
                  <p className="text-gray-300 text-sm">Rate your confidence with <span className="text-primary font-semibold">{card.skill_id?.name}</span></p>
                  <p className="text-gray-500 text-xs mt-2">Interval: {card.interval} day{card.interval !== 1 ? 's' : ''} • EF: {card.ease_factor?.toFixed(2)}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Rating buttons */}
          <AnimatePresence>
            {flipped && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-2"
              >
                {QUALITY_LABELS.map(({ q, label, color, emoji }) => (
                  <button
                    key={q}
                    onClick={() => handleRate(q)}
                    className={`border rounded-xl py-3 text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${color}`}
                  >
                    <span 
className="block text-xl">{emoji}</span>
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {!done && cards.length === 0 && stats?.total > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-lg font-semibold text-white">All caught up!</h2>
          <p className="text-gray-400 text-sm mt-1">No cards due for review right now. Come back later!</p>
        </motion.div>
      )}
    </div>
  )
}
