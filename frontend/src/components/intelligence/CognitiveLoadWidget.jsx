import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { getCognitiveLoad } from '../../services/api'

// Color + label per load level
const LEVEL_CONFIG = {
  high:   { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   label: 'High Load',   icon: AlertTriangle },
  medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  label: 'Medium Load', icon: Clock },
  low:    { color: '#10B981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)',  label: 'Low Load',    icon: CheckCircle },
}

export default function CognitiveLoadWidget() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    getCognitiveLoad()
      .then((r) => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="card skeleton h-48" />

  const { cognitive_load = [], global_avg_ms, insufficient_data } = data || {}

  const highCount  = cognitive_load.filter((s) => s.load_level === 'high').length
  const medCount   = cognitive_load.filter((s) => s.load_level === 'medium').length
  const lowCount   = cognitive_load.filter((s) => s.load_level === 'low').length
  const displayed  = expanded ? cognitive_load : cognitive_load.slice(0, 4)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Brain size={16} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Cognitive Load</h3>
            <p className="text-gray-500 text-xs">Response time analysis per topic</p>
          </div>
        </div>
        {global_avg_ms && (
          <span className="text-xs text-gray-500">Avg: {(global_avg_ms / 1000).toFixed(1)}s</span>
        )}
      </div>

      {insufficient_data ? (
        <p className="text-gray-500 text-sm text-center py-4">
          Complete more quizzes to unlock cognitive load analysis.
        </p>
      ) : (
        <>
          {/* Summary pills */}
          <div className="flex gap-2 mb-4">
            {[
              { label: 'High', count: highCount, color: '#EF4444' },
              { label: 'Medium', count: medCount, color: '#F59E0B' },
              { label: 'Low', count: lowCount, color: '#10B981' },
            ].map((p) => (
              <div
                key={p.label}
                className="flex-1 text-center py-2 rounded-xl"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}
              >
                <div className="text-lg font-bold" style={{ color: p.color }}>{p.count}</div>
                <div className="text-xs text-gray-400">{p.label}</div>
              </div>
            ))}
          </div>

          {/* Skill rows */}
          <div className="space-y-2">
            {displayed.map((skill, i) => {
              const cfg = LEVEL_CONFIG[skill.load_level]
              const Icon = cfg.icon
              return (
                <motion.div
                  key={skill.skill_id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 p-2.5 rounded-xl"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <Icon size={14} style={{ color: cfg.color, flexShrink: 0 }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">{skill.skill_name}</p>
                    {skill.recommendation && (
                      <p className="text-xs mt-0.5" style={{ color: cfg.color }}>
                        {skill.recommendation}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-xs font-bold" style={{ color: cfg.color }}>
                      {(skill.avg_time_ms / 1000).toFixed(1)}s
                    </div>
                    <div className="text-xs text-gray-500">{skill.accuracy}% acc</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {cognitive_load.length > 4 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="w-full mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {expanded ? 'Show less ↑' : `Show all ${cognitive_load.length} skills ↓`}
            </button>
          )}
        </>
      )}
    </motion.div>
  )
}
