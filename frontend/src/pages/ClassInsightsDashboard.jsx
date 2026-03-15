import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { getClassRisk } from '../services/api'
import toast from 'react-hot-toast'

const RISK_COLORS = { high: '#EF4444', moderate: '#F59E0B', low: '#10B981' }

export default function ClassInsightsDashboard() {
  const [riskData, setRiskData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getClassRisk()
      .then((r) => setRiskData(r.data.students || []))
      .catch(() => toast.error('Failed to load class risk data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  const highRisk = riskData.filter((s) => s.risk_level === 'high')
  const modRisk = riskData.filter((s) => s.risk_level === 'moderate')
  const lowRisk = riskData.filter((s) => s.risk_level === 'low')

  const distributionData = [
    { name: 'High Risk', value: highRisk.length, color: '#EF4444' },
    { name: 'Moderate', value: modRisk.length, color: '#F59E0B' },
    { name: 'Low Risk', value: lowRisk.length, color: '#10B981' },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">📊 Class Intelligence Dashboard</h1>
        <p className="text-gray-400 mt-1">AI-powered risk analysis and engagement insights</p>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'High Risk', count: highRisk.length, color: 'text-danger', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
          { label: 'Moderate Risk', count: modRisk.length, color: 'text-warning', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
          { label: 'On Track', count: lowRisk.length, color: 'text-success', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card text-center"
            style={{ borderColor: s.border, background: `linear-gradient(135deg, #0A1628, ${s.bg})` }}
          >
            <div className={`text-3xl font-black ${s.color}`}>{s.count}</div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Risk distribution chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="card">
          <h3 className="font-bold text-white mb-4 text-sm">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={distributionData}>
              <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0A1628', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {distributionData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* High risk students list */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card">
          <h3 className="font-bold text-white mb-4 text-sm">⚠️ Students Needing Attention</h3>
          {highRisk.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No high-risk students 🎉</p>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {highRisk.map((s, i) => (
                <motion.div
                  key={s.student_id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-3 bg-danger/5 border border-danger/20 rounded-xl"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-danger">{s.risk_score}%</p>
                    <p className="text-xs text-gray-600">risk</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Full student risk table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="card">
        <h3 className="font-bold text-white mb-4 text-sm">All Students — Risk Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Student', 'Risk Score', 'Risk Level', 'Top Intervention'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-gray-400 font-semibold text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {riskData.map((s) => (
                <tr key={s.student_id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-3 px-4 font-medium text-white">{s.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${s.risk_score || 0}%`, background: RISK_COLORS[s.risk_level] || '#10B981' }}
                        />
                      </div>
                      <span className="text-xs" style={{ color: RISK_COLORS[s.risk_level] || '#10B981' }}>
                        {s.risk_score || 0}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className="badge text-xs capitalize"
                      style={{
                        color: RISK_COLORS[s.risk_level],
                        background: `${RISK_COLORS[s.risk_level]}20`,
                        borderColor: `${RISK_COLORS[s.risk_level]}40`,
                      }}
                    >
                      {s.risk_level || 'low'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-xs max-w-xs truncate">
                    {s.interventions?.[0] || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
