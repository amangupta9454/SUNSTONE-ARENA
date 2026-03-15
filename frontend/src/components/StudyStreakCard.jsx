import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, Trophy, Calendar } from 'lucide-react'
import { getMyProgress } from '../services/api'

export default function StudyStreakCard({ className = '' }) {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyProgress()
      .then((res) => setProgress(res.data.progress))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={`card skeleton h-44 ${className}`} />
  if (!progress) return null

  const { study_streak, longest_streak, last_active_date } = progress
  const lastActive = last_active_date ? new Date(last_active_date).toLocaleDateString() : 'Never'

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (6 - i))
    return d
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`card relative overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-sm">Study Streak</h3>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(251,146,60,0.15)', border: '1px solid rgba(251,146,60,0.3)' }}>
          <Flame size={15} className="text-orange-400" />
        </div>
      </div>

      <div className="flex items-center gap-4 mb-5">
        {/* Current streak */}
        <div className="text-center flex-1">
          <motion.div
            key={study_streak}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-black text-orange-400 tabular-nums"
            style={{ textShadow: '0 0 20px rgba(251,146,60,0.5)' }}
          >
            {study_streak}
          </motion.div>
          <div className="text-gray-500 text-xs mt-1">Current</div>
        </div>

        <div className="w-px h-10 bg-white/10" />

        {/* Longest streak */}
        <div className="text-center flex-1">
          <div className="flex items-center justify-center gap-1">
            <Trophy size={13} className="text-yellow-400" />
            <span className="text-2xl font-black text-yellow-400 tabular-nums">{longest_streak}</span>
          </div>
          <div className="text-gray-500 text-xs mt-1">Best</div>
        </div>

        <div className="w-px h-10 bg-white/10" />

        {/* Last active */}
        <div className="text-center flex-1">
          <div className="flex items-center justify-center gap-1">
            <Calendar size={12} className="text-cyan-400" />
          </div>
          <span className="text-xs text-cyan-400 font-semibold">{lastActive}</span>
          <div className="text-gray-500 text-xs mt-1">Last Active</div>
        </div>
      </div>

      {/* 7-day activity dots */}
      <div className="flex gap-1.5 justify-between">
        {days.map((d, i) => {
          const label = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][d.getDay()]
          const daysAgo = Math.round((today - d) / (1000 * 60 * 60 * 24))
          const isActive = daysAgo < study_streak
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 400 }}
                className="w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold"
                style={isActive ? {
                  background: 'rgba(251,146,60,0.2)',
                  border: '1px solid rgba(251,146,60,0.4)',
                  boxShadow: '0 0 8px rgba(251,146,60,0.2)',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {isActive ? '🔥' : <span className="text-gray-700">·</span>}
              </motion.div>
              <span className="text-gray-600 text-xs">{label}</span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
