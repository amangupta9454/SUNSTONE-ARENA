import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getBurnoutRisk } from '../../services/api'

export default function BurnoutAlert({ className = '' }) {
  const [data, setData] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    getBurnoutRisk()
      .then((r) => setData(r.data))
      .catch(() => {})
  }, [])

  if (!data || dismissed) return null
  if (data.burnout_level === 'low') return null // only show if moderate/high

  const isHigh = data.burnout_level === 'high'
  const color = isHigh ? '#EF4444' : '#F59E0B'
  const bg = isHigh ? 'rgba(239,68,68,0.08)' : 'rgba(245,158,11,0.08)'
  const border = isHigh ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`card ${className}`}
        style={{ borderColor: border, background: `linear-gradient(135deg, #0A1628, ${bg})` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">{isHigh ? '🔴' : '🟡'}</span>
            <div>
              <p className="font-bold text-sm" style={{ color }}>
                {isHigh ? 'High Burnout Risk Detected' : 'Moderate Burnout Risk'}
              </p>
              <p className="text-gray-400 text-xs mt-1">{data.suggestion}</p>
              {data.signals?.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {data.signals.map((s, i) => (
                    <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
                      <span>•</span><span>{s}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-600 hover:text-gray-400 text-lg leading-none flex-shrink-0"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
