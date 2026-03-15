import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getStudentRisk } from '../../services/api'

export default function StudentRiskCard({ className = '' }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStudentRisk()
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={`card skeleton h-40 ${className}`} />
  if (!data) return null

  const { risk_score, risk_level, interventions, feature_breakdown } = data
  const color = risk_level === 'high' ? '#EF4444' : risk_level === 'moderate' ? '#F59E0B' : '#10B981'
  const bgColor = risk_level === 'high' ? 'rgba(239,68,68,0.1)' : risk_level === 'moderate' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)'
  const borderColor = risk_level === 'high' ? 'rgba(239,68,68,0.3)' : risk_level === 'moderate' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card ${className}`}
      style={{ borderColor, background: `linear-gradient(135deg, #0A1628, ${bgColor})` }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-sm">🎯 Assessment Risk</h3>
        <span
          className="badge text-xs font-bold uppercase"
          style={{ color, background: bgColor, borderColor }}
        >
          {risk_level}
        </span>
      </div>

      {/* Animated risk gauge */}
      <div className="relative mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Low</span>
          <span className="font-bold" style={{ color }}>{risk_score}%</span>
          <span>High</span>
        </div>
        <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${risk_score}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, #10B981, ${color})` }}
          />
        </div>
      </div>

      {/* Interventions */}
      {interventions?.length > 0 && (
        <div className="space-y-1.5">
          {interventions.map((tip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-2 text-xs text-gray-400"
            >
              <span className="text-primary mt-0.5">→</span>
              <span>{tip}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
