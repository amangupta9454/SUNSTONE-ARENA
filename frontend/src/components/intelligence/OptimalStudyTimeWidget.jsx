import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react'
import { getOptimalStudyTime } from '../../services/api'

// Map hour to time-of-day label + icon
function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12)  return { label: 'Morning',   Icon: Sunrise, color: '#F59E0B' }
  if (hour >= 12 && hour < 17) return { label: 'Afternoon', Icon: Sun,     color: '#06B6D4' }
  if (hour >= 17 && hour < 21) return { label: 'Evening',   Icon: Sunset,  color: '#8B5CF6' }
  return                               { label: 'Night',     Icon: Moon,    color: '#6366F1' }
}

export default function OptimalStudyTimeWidget() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOptimalStudyTime()
      .then((r) => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="card skeleton h-48" />

  const { optimal_hour, optimal_day, hour_stats = [], day_stats = [], insight, insufficient_data } = data || {}

  // Only show hours with data for the heatmap
  const activeHours = hour_stats.filter((h) => h.attempts > 0)
  const maxAccuracy = Math.max(...activeHours.map((h) => h.accuracy ?? 0), 1)

  const tod = optimal_hour ? getTimeOfDay(optimal_hour.hour) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Sun size={16} className="text-amber-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">Optimal Study Time</h3>
          <p className="text-gray-500 text-xs">When you perform best</p>
        </div>
      </div>

      {insufficient_data ? (
        <p className="text-gray-500 text-sm text-center py-4">
          Complete more quizzes to detect your peak study window.
        </p>
      ) : (
        <>
          {/* Peak insight card */}
          {tod && optimal_hour && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3 p-3 rounded-xl mb-4"
              style={{ background: `${tod.color}15`, border: `1px solid ${tod.color}30` }}
            >
              <tod.Icon size={28} style={{ color: tod.color }} />
              <div>
                <p className="text-white font-bold text-sm">
                  {tod.label} · {optimal_hour.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: tod.color }}>
                  {optimal_hour.accuracy}% accuracy · {optimal_day?.label}s are your best day
                </p>
              </div>
            </motion.div>
          )}

          {insight && (
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">{insight}</p>
          )}

          {/* Hour heatmap — 24 blocks */}
          <div>
            <p className="text-gray-500 text-xs mb-2">Accuracy by hour of day</p>
            <div className="grid grid-cols-12 gap-1">
              {hour_stats.map((h) => {
                const pct = h.accuracy !== null ? h.accuracy / maxAccuracy : 0
                const isOptimal = optimal_hour?.hour === h.hour
                return (
                  <div key={h.hour} className="relative group">
                    <div
                      className={`h-6 rounded transition-all ${isOptimal ? 'ring-1 ring-amber-400' : ''}`}
                      style={{
                        background: h.accuracy !== null
                          ? `rgba(99,102,241,${0.1 + pct * 0.8})`
                          : 'rgba(255,255,255,0.03)',
                      }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10 pointer-events-none">
                      <div className="bg-[#0A1628] border border-white/10 rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap">
                        {h.label}{h.accuracy !== null ? ` · ${h.accuracy}%` : ' · no data'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between text-gray-600 text-xs mt-1">
              <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
            </div>
          </div>

          {/* Day of week bars */}
          <div className="mt-4">
            <p className="text-gray-500 text-xs mb-2">Accuracy by day of week</p>
            <div className="flex gap-1 items-end h-12">
              {day_stats.map((d) => {
                const h = d.accuracy !== null ? (d.accuracy / 100) * 100 : 0
                const isOptimal = optimal_day?.day === d.day
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t transition-all"
                      style={{
                        height: `${Math.max(4, h)}%`,
                        background: isOptimal
                          ? 'linear-gradient(180deg, #F59E0B, #D97706)'
                          : d.accuracy !== null
                          ? 'rgba(99,102,241,0.5)'
                          : 'rgba(255,255,255,0.05)',
                        minHeight: '4px',
                      }}
                    />
                    <span className={`text-xs ${isOptimal ? 'text-amber-400 font-bold' : 'text-gray-600'}`}>
                      {d.label[0]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
