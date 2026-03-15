import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Edit3, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react'
import { markMistakeReviewed, addMistakeNote, retryMistake } from '../services/api'

/**
 * MistakeCard — displays a single mistake with retry and note functionality.
 * Props:
 *   mistake   — MistakeJournal document
 *   onUpdate  — callback(updatedMistake) after any mutation
 */
export default function MistakeCard({ mistake, onUpdate }) {
  const [expanded, setExpanded] = useState(false)
  const [retryMode, setRetryMode] = useState(false)
  const [retryResult, setRetryResult] = useState(null)
  const [note, setNote] = useState(mistake.personal_note || '')
  const [editingNote, setEditingNote] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleMarkReviewed = async () => {
    setLoading(true)
    try {
      const res = await markMistakeReviewed(mistake._id)
      onUpdate?.(res.data.mistake)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNote = async () => {
    setLoading(true)
    try {
      const res = await addMistakeNote(mistake._id, note)
      onUpdate?.(res.data.mistake)
      setEditingNote(false)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async (option) => {
    setLoading(true)
    try {
      const res = await retryMistake(mistake._id, option)
      setRetryResult(res.data)
      onUpdate?.(res.data.mistake)
    } finally {
      setLoading(false)
    }
  }

  const optionLabels = ['a', 'b', 'c', 'd']

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card border transition-all ${
        mistake.is_reviewed
          ? 'border-emerald-500/20 opacity-70'
          : 'border-red-500/20'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="badge badge-danger text-xs">{mistake.subject || 'Unknown'}</span>
            {mistake.is_reviewed && (
              <span className="badge badge-success text-xs">Reviewed</span>
            )}
            {mistake.retry_count > 0 && (
              <span className="badge badge-purple text-xs">{mistake.retry_count}x retried</span>
            )}
          </div>
          <p className="text-white text-sm leading-relaxed line-clamp-2">{mistake.question_text}</p>
        </div>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-gray-400 hover:text-white transition-colors mt-1 flex-shrink-0"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {/* Options */}
              {optionLabels.map((key) => {
                const text = mistake.options?.[key]
                if (!text) return null
                const isCorrect = key === mistake.correct_option
                const isWrong = key === mistake.selected_option && !isCorrect
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                      isCorrect
                        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                        : isWrong
                        ? 'bg-red-500/10 border border-red-500/30 text-red-300'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      isCorrect ? 'bg-emerald-500 text-white' :
                      isWrong ? 'bg-red-500 text-white' : 'bg-white/10'
                    }`}>
                      {key.toUpperCase()}
                    </span>
                    {text}
                    {isCorrect && <CheckCircle size={14} className="ml-auto text-emerald-400" />}
                    {isWrong && <span className="ml-auto text-xs text-red-400">Your answer</span>}
                  </div>
                )
              })}
            </div>

            {/* Retry mode */}
            {retryMode && !retryResult && (
              <div className="mt-4">
                <p className="text-gray-400 text-xs mb-2">Select the correct answer:</p>
                <div className="grid grid-cols-2 gap-2">
                  {optionLabels.map((key) => mistake.options?.[key] && (
                    <button
                      key={key}
                      onClick={() => handleRetry(key)}
                      disabled={loading}
                      className="p-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 text-gray-300 text-sm transition-all"
                    >
                      {key.toUpperCase()}. {mistake.options[key]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {retryResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-3 p-3 rounded-xl text-sm font-semibold ${
                  retryResult.is_correct
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {retryResult.is_correct ? '✅ Correct! Well done.' : '❌ Incorrect. Keep practicing.'}
              </motion.div>
            )}

            {/* Personal note */}
            <div className="mt-4">
              {editingNote ? (
                <div className="space-y-2">
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your personal note..."
                    className="input text-sm resize-none h-20"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSaveNote} disabled={loading} className="btn-primary text-xs py-1.5 px-3">
                      Save
                    </button>
                    <button onClick={() => setEditingNote(false)} className="btn-ghost text-xs">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setEditingNote(true)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-300 cursor-pointer text-sm transition-colors"
                >
                  <Edit3 size={12} />
                  {note || 'Add a note...'}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              {!mistake.is_reviewed && (
                <button
                  onClick={handleMarkReviewed}
                  disabled={loading}
                  className="btn-outline text-xs py-1.5 px-3 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                >
                  <CheckCircle size={12} className="mr-1 inline" />
                  Mark Reviewed
                </button>
              )}
              {!retryMode && !retryResult && (
                <button
                  onClick={() => setRetryMode(true)}
                  className="btn-outline text-xs py-1.5 px-3"
                >
                  <RotateCcw size={12} className="mr-1 inline" />
                  Retry
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
