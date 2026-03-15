import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Star, TrendingUp } from 'lucide-react'
import { getMyProgress } from '../services/api'

export default function XPProgressBar({ compact = false, className = '' }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMyProgress()
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={`skeleton h-8 w-32 ${className}`} />
  if (!data) return null

  const { progress, level_info } = data
  const { xp, level } = progress
  const { xp_progress_pct, xp_to_next, next_level_min_xp } = level_info

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-1 rounded-full px-2 py-0.5" style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
          <Zap size={12} className="text-indigo-400" />
          <span className="text-indigo-400 text-xs font-bold">Lv.{level}</span>
        </div>
        <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)' }}
            initial={{ width: 0 }}
            animate={{ width: `${xp_progress_pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <span className="text-gray-400 text-xs">{xp} XP</span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`card relative overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }}
      />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-sm">XP & Level</h3>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)' }}>
          <Star size={15} className="text-indigo-400" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Level badge */}
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2))',
              border: '1px solid rgba(99,102,241,0.4)',
              boxShadow: '0 8px 24px rgba(99,102,241,0.2)',
            }}
          >
            <Zap size={14} className="text-indigo-400 mb-0.5" />
            <span className="text-white font-black text-lg leading-none">{level}</span>
          </div>
          <div>
            <div className="text-white font-bold">Level {level}</div>
            <div className="text-gray-400 text-xs mt-0.5 flex items-center gap-1">
              <TrendingUp size={10} />
              {xp.toLocaleString()} XP total
            </div>
          </div>
        </div>
        {xp_to_next !== null && (
          <div className="text-right">
            <div className="text-gray-400 text-xs">{xp_to_next} to next</div>
            <div className="text-indigo-400 text-xs font-semibold mt-0.5">Level {level + 1}</div>
          </div>
        )}
      </div>

      {/* XP bar */}
      <div className="relative h-3 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6, #06B6D4)' }}
          initial={{ width: 0 }}
          animate={{ width: `${xp_progress_pct}%` }}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Shimmer effect on bar */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }}
          />
        </motion.div>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500 text-xs">{xp_progress_pct}%</span>
        {next_level_min_xp && <span className="text-gray-500 text-xs">{next_level_min_xp.toLocaleString()} XP</span>}
      </div>

      {/* Level milestones */}
      {data.levels?.length > 0 && (
        <div className="flex gap-1 mt-4">
          {data.levels.slice(0, 8).map((l) => (
            <motion.div
              key={l.level}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: l.level * 0.05 }}
              className="flex-1 h-1.5 rounded-full"
              style={{
                background: level >= l.level
                  ? 'linear-gradient(90deg, #6366F1, #8B5CF6)'
                  : 'rgba(255,255,255,0.08)',
                boxShadow: level >= l.level ? '0 0 6px rgba(99,102,241,0.4)' : 'none',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
