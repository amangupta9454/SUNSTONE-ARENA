import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { getQuestionDifficulty } from '../../services/api'

const CALIBRATION_CONFIG = {
  too_hard:        { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   label: 'Very Hard',  icon: TrendingDown },
  well_calibrated: { color: '#10B981', bg: 'rgba(16,185,129,0.1)',  label: 'Balanced',   icon: Minus },
  too_easy:        { color: '#06B6D4', bg: 'rgba(6,182,212,0.1)',   label: 'Easy',       icon: TrendingUp },
}

export default function QuestionDifficultyWidget() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all | too_hard | well_calibrated | too_easy

  useEffect(() => {
    getQuestionDifficulty()
      .then((r) => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="card skeleton h-48" />

  const { calibrated_skills = [] } = data || {}

  const filtered = filter === 'all'
    ? calibrated_skills
    : calibrated_skills.filter((s) => s.calibration === filter)

  const counts = {
    too_hard: calibrated_skills.filter((s) => s.calibration === 'too_hard').length,
    well_calibrated: calibrated_skills.filter((s) => s.calibration === 'well_calibrated').length,
    too_easy: calibrated_skills.filter((s) => s.calibration === 'too_easy').length,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <BarChart2 size={16} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">Difficulty Calibration</h3>
          <p className="text-gray-500 text-xs">IRT-based class-wide analysis</p>
        </div>
      </div>

      {calibrated_skills.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          Not enough class data yet. Complete more assessments.
        </p>
      ) : (
        <>
          {/* Filter tabs */}
          <div className="flex gap-1 mb-4 bg-white/5 rounded-xl p-1">
            {[
              { key: 'all', label: `All (${calibrated_skills.length})` },
              { key: 'too_hard', label: `Hard (${counts.too_hard})`, color: '#EF4444' },
              { key: 'well_calibrated', label: `OK (${counts.well_calibrated})`, color: '#10B981' },
              { key: 'too_easy', label: `Easy (${counts.too_easy})`, color: '#06B6D4' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === tab.key ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
                style={filter === tab.key && tab.color ? { color: tab.color } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skill list */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filtered.slice(0, 12).map((skill, i) => {
              const cfg = CALIBRATION_CONFIG[skill.calibration]
              const Icon = cfg.icon
              return (
                <motion.div
                  key={skill.skill_id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.color}25` }}
                >
                  <Icon size={14} style={{ color: cfg.color, flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{skill.skill_name}</p>
                    {skill.personal_insight && (
                      <p className="text-xs mt-0.5 text-gray-400">{skill.personal_insight}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold" style={{ color: cfg.color }}>
                      {skill.pass_rate_pct}%
                    </div>
                    <div className="text-xs text-gray-500">pass rate</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">No skills in this category.</p>
          )}
        </>
      )}
    </motion.div>
  )
}
