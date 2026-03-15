import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Shield, AlertCircle } from 'lucide-react'
import { getDistractionReport, logDistractionEvent } from '../../services/api'

/**
 * DistractionAnalyzerWidget
 * - Passively tracks tab switches and window blur/focus events
 * - Logs them to the backend
 * - Displays focus score history
 */
export default function DistractionAnalyzerWidget({ sessionId = 'dashboard' }) {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentDistractions, setCurrentDistractions] = useState(0)
  const [tracking, setTracking] = useState(true)
  const sessionStartRef = useRef(Date.now())

  // ── Passive event tracking ──────────────────────────────────────────────────
  const logEvent = useCallback(async (event_type) => {
    if (!tracking) return
    setCurrentDistractions((c) => c + 1)
    try {
      await logDistractionEvent({ session_id: sessionId, event_type, timestamp: new Date().toISOString() })
    } catch { /* silent */ }
  }, [tracking, sessionId])

  useEffect(() => {
    const onBlur = () => logEvent('window_blur')
    const onFocus = () => logEvent('window_focus')
    const onVisibility = () => {
      if (document.hidden) logEvent('tab_switch')
    }

    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [logEvent])

  // ── Load report ─────────────────────────────────────────────────────────────
  useEffect(() => {
    getDistractionReport()
      .then((r) => setReport(r.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="card skeleton h-48" />

  const { sessions = [], overall_focus_score = 100 } = report || {}

  const focusColor = overall_focus_score >= 80 ? '#10B981'
    : overall_focus_score >= 60 ? '#F59E0B' : '#EF4444'

  const focusLabel = overall_focus_score >= 80 ? 'Excellent Focus'
    : overall_focus_score >= 60 ? 'Moderate Focus' : 'Needs Improvement'

  // Current session live focus score
  const liveScore = Math.max(0, Math.min(100, 100 - currentDistractions * 5))
  const liveColor = liveScore >= 80 ? '#10B981' : liveScore >= 60 ? '#F59E0B' : '#EF4444'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
            <Eye size={16} className="text-rose-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Focus Tracker</h3>
            <p className="text-gray-500 text-xs">Distraction pattern analysis</p>
          </div>
        </div>
        <button
          onClick={() => setTracking((t) => !t)}
          className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all ${
            tracking ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500'
          }`}
        >
          {tracking ? <Eye size={10} /> : <EyeOff size={10} />}
          {tracking ? 'Tracking' : 'Paused'}
        </button>
      </div>

      {/* Live session score */}
      <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 mb-4">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle
              cx="28" cy="28" r="22" fill="none"
              stroke={liveColor} strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 22}
              strokeDashoffset={2 * Math.PI * 22 * (1 - liveScore / 100)}
              style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: liveColor }}>{liveScore}</span>
          </div>
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Current Session</p>
          <p className="text-gray-400 text-xs">{currentDistractions} distraction{currentDistractions !== 1 ? 's' : ''} detected</p>
          {currentDistractions > 5 && (
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle size={10} className="text-amber-400" />
              <p className="text-amber-400 text-xs">Try to stay focused!</p>
            </div>
          )}
        </div>
      </div>

      {/* Historical focus score */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-xs">Historical Average</span>
        <div className="flex items-center gap-1.5">
          <Shield size={12} style={{ color: focusColor }} />
          <span className="text-sm font-bold" style={{ color: focusColor }}>
            {overall_focus_score}% · {focusLabel}
          </span>
        </div>
      </div>

      {/* Session history bars */}
      {sessions.length > 0 ? (
        <div>
          <p className="text-gray-500 text-xs mb-2">Last {sessions.length} sessions</p>
          <div className="flex gap-1 items-end h-10">
            {sessions.slice().reverse().map((s, i) => {
              const barColor = s.focus_score >= 80 ? '#10B981'
                : s.focus_score >= 60 ? '#F59E0B' : '#EF4444'
              return (
                <div key={i} className="flex-1 relative group">
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      height: `${Math.max(10, s.focus_score)}%`,
                      background: barColor,
                      opacity: 0.7,
                      minHeight: '4px',
                    }}
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block z-10 pointer-events-none">
                    <div className="bg-[#0A1628] border border-white/10 rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap">
                      {s.focus_score}% · {s.total_distractions} distractions
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-xs text-center py-2">
          No session history yet. Start studying to track focus.
        </p>
      )}
    </motion.div>
  )
}
