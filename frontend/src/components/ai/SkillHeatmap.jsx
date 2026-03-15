import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getSkillHeatmap } from '../../services/api'

// GitHub-style contribution heatmap
// Each cell = one day, color intensity = activity count

const WEEKS = 26 // ~6 months
const DAYS_PER_WEEK = 7
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getColor(count, accuracy) {
  if (count === 0) return '#162447'
  if (accuracy >= 80) return count >= 10 ? '#10B981' : count >= 5 ? '#34D399' : '#6EE7B7'
  if (accuracy >= 60) return count >= 10 ? '#6366F1' : count >= 5 ? '#818CF8' : '#A5B4FC'
  return count >= 10 ? '#F59E0B' : count >= 5 ? '#FCD34D' : '#FDE68A'
}

export default function SkillHeatmap({ className = '' }) {
  const [heatmap, setHeatmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState(null)

  useEffect(() => {
    getSkillHeatmap()
      .then((r) => setHeatmap(r.data.heatmap || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className={`card skeleton h-40 ${className}`} />

  // Build a grid: last WEEKS*7 days
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const totalDays = WEEKS * DAYS_PER_WEEK

  // Map heatmap data by date string
  const dataMap = {}
  heatmap.forEach((d) => { dataMap[d.date] = d })

  // Build grid cells (oldest first)
  const cells = []
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const entry = dataMap[dateStr] || { date: dateStr, count: 0, accuracy: 0 }
    cells.push(entry)
  }

  // Group into weeks (columns)
  const weeks = []
  for (let w = 0; w < WEEKS; w++) {
    weeks.push(cells.slice(w * 7, w * 7 + 7))
  }

  const totalActivity = heatmap.reduce((s, d) => s + d.count, 0)
  const activeDays = heatmap.filter((d) => d.count > 0).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white text-sm">📅 Study Activity Heatmap</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>{activeDays} active days</span>
          <span>{totalActivity} questions</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-1">
            <div className="h-3" /> {/* spacer for month labels */}
            {DAY_LABELS.map((d, i) => (
              <div key={d} className="h-3 text-xs text-gray-600 leading-3 w-6">
                {i % 2 === 1 ? d.slice(0, 1) : ''}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {/* Month label on first day of month */}
              <div className="h-3 text-xs text-gray-600 leading-3">
                {week[0] && new Date(week[0].date).getDate() <= 7
                  ? new Date(week[0].date).toLocaleString('default', { month: 'short' })
                  : ''}
              </div>
              {week.map((cell, di) => (
                <motion.div
                  key={cell.date}
                  whileHover={{ scale: 1.4 }}
                  onMouseEnter={() => setTooltip({ ...cell, x: wi, y: di })}
                  onMouseLeave={() => setTooltip(null)}
                  className="w-3 h-3 rounded-sm cursor-pointer relative"
                  style={{ backgroundColor: getColor(cell.count, cell.accuracy) }}
                  title={`${cell.date}: ${cell.count} questions, ${cell.accuracy}% accuracy`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
        <span>Less</span>
        {['#162447', '#6EE7B7', '#34D399', '#10B981'].map((c) => (
          <div key={c} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
        ))}
        <span>More</span>
      </div>

      {/* Tooltip */}
      {tooltip && tooltip.count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-xs text-gray-400 bg-dark-700 rounded-lg px-3 py-2 border border-white/5"
        >
          📅 {tooltip.date} — {tooltip.count} questions answered, {tooltip.accuracy}% accuracy
        </motion.div>
      )}
    </motion.div>
  )
}
