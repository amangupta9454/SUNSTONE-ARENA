import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { generatePlan, getPlan } from '../services/api'
import useStore from '../store/useStore'

const PRIORITY_STYLES = {
  critical: 'border-danger/40 bg-danger/5 text-danger',
  high: 'border-orange-400/40 bg-orange-400/5 text-orange-400',
  medium: 'border-warning/40 bg-warning/5 text-warning',
  low: 'border-white/10 bg-white/5 text-gray-400',
}

export default function LearningPlan() {
  const { plan, setPlan } = useStore()
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [careerGoal, setCareerGoal] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getPlan().then((r) => setPlan(r.data.plan)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    setError('')
    try {
      const r = await generatePlan(careerGoal)
      setPlan(r.data.plan)
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to generate plan. Complete an assessment first.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">📋 My Learning Plan</h1>
          <p className="text-gray-400 text-sm mt-1">AI-generated plan based on your quiz performance</p>
        </div>
        <div className="flex gap-2">
          <input
            className="input text-sm w-44"
            placeholder="Career goal (optional)"
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
          />
          <button onClick={handleGenerate} disabled={generating} className="btn-primary text-sm py-2 px-4 disabled:opacity-50">
            {generating ? '⏳ Generating...' : plan ? '🔄 Regenerate' : '✨ Generate Plan'}
          </button>
        </div>
      </motion.div>

      {error && (
        <div className="bg-danger/10 border border-danger/30 text-danger rounded-xl px-4 py-3 text-sm">{error}</div>
      )}

      {!plan && !generating && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-12">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-lg font-semibold text-white">No plan yet</h2>
          <p className="text-sm text-gray-400 mt-1">Take a quiz first, then generate your personalized plan.</p>
        </motion.div>
      )}

      {plan && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Overall Score', value: `${plan.overall_score}%`, icon: '📊', color: 'text-primary' },
              { label: 'Skills Assessed', value: (plan.strengths?.length || 0) + (plan.weaknesses?.length || 0), icon: '🧠', color: 'text-secondary' },
              { label: 'Est. Completion', value: `${plan.predicted_completion_weeks}w`, icon: '📅', color: 'text-accent' },
              { label: 'ML Confidence', value: `${Math.round((plan.ml_confidence || 0) * 100)}%`, icon: '🤖', color: 'text-success' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} className="card text-center">
                <div className="text-2xl">{s.icon}</div>
                <div className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-bold text-success mb-3">💪 Strengths</h3>
              <div className="space-y-2">
                {plan.strengths?.map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{s.skill_name}</span>
                    <span className="text-sm font-bold text-success">{Math.round(s.mastery_score * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3 className="font-bold text-danger mb-3">🎯 Areas to Improve</h3>
              <div className="space-y-2">
                {plan.weaknesses?.slice(0, 5).map((w, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{w.skill_name}</span>
                    <span className="text-sm font-bold text-danger">{Math.round(w.mastery_score * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overcome strategies */}
          {plan.overcome_strategies?.length > 0 && (
            <div className="card">
              <h2 className="font-bold text-white mb-4">🛠️ How to Overcome Weaknesses</h2>
              <div className="space-y-3">
                {plan.overcome_strategies.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    className={`rounded-xl border p-4 ${PRIORITY_STYLES[s.priority] || PRIORITY_STYLES.medium}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{s.skill_name}</span>
                      <span className="text-xs font-bold uppercase opacity-70">{s.priority}</span>
                    </div>
                    <p className="text-sm opacity-80">{s.strategy}</p>
                    {s.estimated_hours && <p className="text-xs opacity-50 mt-1">⏱ ~{s.estimated_hours}h to master</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly plan */}
          <div className="card">
            <h2 className="font-bold text-white mb-4">📅 Week-by-Week Plan</h2>
            <div className="space-y-3">
              {plan.weekly_plan?.map((week, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="flex gap-4 p-4 rounded-xl bg-dark-700 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    W{week.week}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{week.goal}</p>
                    <p className="text-xs text-gray-400 mt-1">{week.skills?.join(', ')}</p>
                    {week.resources?.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {week.resources.map((r, j) => (
                          <span key={j} className="badge badge-primary text-xs">{r}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
