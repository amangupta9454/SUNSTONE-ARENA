import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Target, TrendingUp, TrendingDown, BookOpen } from 'lucide-react'

/**
 * StudySessionSummary — shown after every quiz/assessment.
 * Props:
 *   session     — StudySession object from backend
 *   trendDelta  — accuracy change vs previous session (number or null)
 *   onClose     — callback to dismiss
 *   onRetry     — callback to start a new session
 */
export default function StudySessionSummary({ session, trendDelta, onClose, onRetry }) {
  if (!session) return null

  const {
    total_questions,
    correct_answers,
    incorrect_answers,
    accuracy_percentage,
    time_spent_seconds,
    difficulty_breakdown,
    ai_feedback,
    suggested_topics,
    subject_scores,
  } = session

  const minutes = Math.floor(time_spent_seconds / 60)
  const seconds = time_spent_seconds % 60

  const stats = [
    { label: 'Total Questions', value: total_questions, icon: Target, color: 'text-indigo-400' },
    { label: 'Correct', value: correct_answers, icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Incorrect', value: incorrect_answers, icon: XCircle, color: 'text-red-400' },
    { label: 'Time Spent', value: `${minutes}m ${seconds}s`, icon: Clock, color: 'text-cyan-400' },
  ]

  const accuracyColor =
    accuracy_percentage >= 80 ? '#10B981' :
    accuracy_percentage >= 60 ? '#F59E0B' : '#EF4444'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto card-glow"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: `conic-gradient(${accuracyColor} ${accuracy_percentage}%, rgba(255,255,255,0.05) 0)` }}
          >
            <div className="w-16 h-16 rounded-full bg-[#0A1628] flex items-center justify-center">
              <span className="text-xl font-bold" style={{ color: accuracyColor }}>
                {accuracy_percentage}%
              </span>
            </div>
          </motion.div>
          <h2 className="text-2xl font-bold text-white">Session Complete</h2>
          {trendDelta !== null && (
            <div className={`flex items-center justify-center gap-1 mt-1 text-sm ${trendDelta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {trendDelta >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {trendDelta >= 0 ? '+' : ''}{trendDelta}% vs last session
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="card flex items-center gap-3"
            >
              <s.icon size={20} className={s.color} />
              <div>
                <div className="text-white font-bold">{s.value}</div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Difficulty breakdown */}
        {difficulty_breakdown && (
          <div className="card mb-4">
            <h3 className="text-white font-semibold mb-3">Difficulty Breakdown</h3>
            <div className="flex gap-3">
              {[
                { label: 'Easy', value: difficulty_breakdown.easy, color: '#10B981' },
                { label: 'Medium', value: difficulty_breakdown.medium, color: '#F59E0B' },
                { label: 'Hard', value: difficulty_breakdown.hard, color: '#EF4444' },
              ].map((d) => (
                <div key={d.label} className="flex-1 text-center p-3 rounded-xl bg-white/5">
                  <div className="text-xl font-bold" style={{ color: d.color }}>{d.value}</div>
                  <div className="text-gray-400 text-xs">{d.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Feedback */}
        {ai_feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="card mb-4 border-indigo-500/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <span className="text-xs">🤖</span>
              </div>
              <span className="text-indigo-400 font-semibold text-sm">AI Feedback</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{ai_feedback}</p>
          </motion.div>
        )}

        {/* Suggested topics */}
        {suggested_topics?.length > 0 && (
          <div className="card mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-amber-400" />
              <span className="text-white font-semibold text-sm">Topics to Revise</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggested_topics.map((t) => (
                <span key={t} className="badge badge-warning">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1">Close</button>
          {onRetry && (
            <button onClick={onRetry} className="btn-primary flex-1">Try Again</button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
