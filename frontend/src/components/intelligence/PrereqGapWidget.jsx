import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { getPrereqGaps } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function PrereqGapWidget() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openIdx, setOpenIdx] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getPrereqGaps()
      .then((r) => setData(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="card skeleton h-48" />

  const { gaps = [], message } = data || {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <GitBranch size={16} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Prerequisite Gaps</h3>
            <p className="text-gray-500 text-xs">Fix foundations first</p>
          </div>
        </div>
        {gaps.length > 0 && (
          <span className="badge badge-danger text-xs">{gaps.length} gap{gaps.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {gaps.length === 0 ? (
        <div className="text-center py-6">
          <div className="text-3xl mb-2">✅</div>
          <p className="text-white text-sm font-medium">No prerequisite gaps!</p>
          <p className="text-gray-500 text-xs mt-1">
            {message || 'Your foundations are solid.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {gaps.map((gap, i) => (
            <div key={gap.skill_id} className="rounded-xl border border-red-500/20 overflow-hidden">
              {/* Struggling skill header */}
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-3 bg-red-500/5 hover:bg-red-500/10 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-white text-sm font-medium truncate">{gap.skill_name}</span>
                  <span className="text-red-400 text-xs flex-shrink-0">
                    {Math.round(gap.mastery_score * 100)}% mastery
                  </span>
                </div>
                {openIdx === i ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </button>

              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 space-y-2 bg-[#050B18]">
                      <p className="text-amber-400 text-xs font-medium mb-2">
                        ⚠️ {gap.message}
                      </p>
                      {gap.prerequisite_gaps.map((prereq) => (
                        <div
                          key={prereq.skill_id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <ArrowRight size={12} className="text-gray-500 flex-shrink-0" />
                            <span className="text-gray-300 text-xs truncate">{prereq.skill_name}</span>
                            <span className={`text-xs flex-shrink-0 ${prereq.status === 'not_attempted' ? 'text-gray-500' : 'text-amber-400'}`}>
                              {prereq.status === 'not_attempted'
                                ? 'Not started'
                                : `${Math.round(prereq.mastery_score * 100)}%`}
                            </span>
                          </div>
                          <button
                            onClick={() => navigate(`/app/learning/${prereq.skill_id}`)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex-shrink-0 ml-2"
                          >
                            Study →
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}
