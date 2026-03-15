import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getCurriculumRecommendation } from '../services/api'

const STATUS_COLORS = {
  mastered: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', text: '#10B981', glow: '0 0 12px rgba(16,185,129,0.4)' },
  in_progress: { bg: 'rgba(99,102,241,0.15)', border: 'rgba(99,102,241,0.4)', text: '#6366F1', glow: '0 0 12px rgba(99,102,241,0.4)' },
  needs_work: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#EF4444', glow: '0 0 8px rgba(239,68,68,0.3)' },
}

export default function AdaptivePathV2() {
  const navigate = useNavigate()
  const [curriculum, setCurriculum] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getCurriculumRecommendation()
      .then((r) => setCurriculum(r.data.curriculum || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? curriculum : curriculum.filter((s) => s.status === filter)

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">🧭 Adaptive Learning Path</h1>
        <p className="text-gray-400 mt-1">Topics ranked by AI priority — highest impact first</p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-dark-700 rounded-xl p-1 w-fit">
        {['all', 'needs_work', 'in_progress', 'mastered'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
              filter === f ? 'bg-dark-800 text-white border border-white/10' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

        <div className="space-y-3">
          {filtered.map((skill, i) => {
            const style = STATUS_COLORS[skill.status] || STATUS_COLORS.needs_work
            const priorityPct = Math.round(skill.priority_score * 100)

            return (
              <motion.div
                key={skill.skill_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-4 pl-4"
              >
                {/* Node dot */}
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-3 z-10"
                  style={{
                    background: style.bg,
                    borderColor: style.border,
                    boxShadow: i < 3 ? style.glow : 'none',
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  onClick={() => navigate(`/app/learning/${skill.skill_id}`)}
                  className="flex-1 card cursor-pointer transition-all"
                  style={{ borderColor: i < 3 ? style.border : 'rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-white text-sm">{skill.skill_name}</p>
                        {i === 0 && (
                          <span className="badge badge-primary text-xs">🎯 Top Priority</span>
                        )}
                        <span className="badge text-xs" style={{ color: style.text, background: style.bg, borderColor: style.border }}>
                          {skill.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{skill.subject} · Difficulty {skill.difficulty}/5</p>
                    </div>

                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-sm font-bold" style={{ color: style.text }}>
                        {Math.round(skill.mastery_score * 100)}%
                      </p>
                      <p className="text-xs text-gray-600">mastery</p>
                    </div>
                  </div>

                  {/* Priority bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Priority score</span>
                      <span style={{ color: style.text }}>{priorityPct}%</span>
                    </div>
                    <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${priorityPct}%` }}
                        transition={{ duration: 0.8, delay: i * 0.04 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${style.border}, ${style.text})` }}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-white font-medium">All skills mastered in this category!</p>
        </div>
      )}
    </div>
  )
}
