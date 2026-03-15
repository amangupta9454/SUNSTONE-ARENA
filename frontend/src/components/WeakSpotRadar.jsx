import { useEffect, useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { getWeakSpots } from '../services/api'

export default function WeakSpotRadar({ className = '' }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getWeakSpots()
      .then((res) => {
        const spots = res.data.weak_spots || []
        setData(spots.map((s) => ({ subject: s.subject, accuracy: s.accuracy, attempts: s.attempt_count })))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={`card skeleton h-64 ${className}`} />

  if (data.length === 0) {
    return (
      <div className={`card flex flex-col items-center justify-center h-64 gap-3 ${className}`}>
        <Target size={32} className="text-gray-600" />
        <p className="text-gray-400 text-sm text-center">Complete some quizzes to see your weak spots.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className={`card relative overflow-hidden ${className}`}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', transform: 'translate(20%, 20%)' }}
      />

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-sm">Weak Spot Analysis</h3>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
          <Target size={15} className="text-red-400" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
          <PolarGrid stroke="rgba(255,255,255,0.06)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 9 }} tickCount={4} />
          <Radar name="Accuracy" dataKey="accuracy" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} strokeWidth={2} />
          <Tooltip
            contentStyle={{ background: '#0A1628', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
            formatter={(value, _, props) => [`${value}% (${props.payload.attempts} attempts)`, 'Accuracy']}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-2 space-y-2">
        {[...data].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).map((d, i) => {
          const color = d.accuracy < 50 ? '#EF4444' : d.accuracy < 70 ? '#F59E0B' : '#10B981'
          return (
            <motion.div
              key={d.subject}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-gray-400 text-xs truncate flex-1">{d.subject}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${d.accuracy}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    style={{ background: color, boxShadow: `0 0 6px ${color}66` }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-9 text-right tabular-nums">{d.accuracy}%</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
