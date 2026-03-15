import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../../services/api'

export default function AssignTopicModal({ studentName, onAssign, onClose }) {
  const [skills, setSkills] = useState([])
  const [skillId, setSkillId] = useState('')
  const [message, setMessage] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch skill nodes for the dropdown
    api.get('/api/learning/path').then((r) => {
      setSkills(r.data.skills || [])
    }).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!skillId) return
    setLoading(true)
    try {
      await onAssign({ skill_id: skillId, message, due_date: dueDate || null })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="card w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-bold text-white text-lg">📚 Assign Topic</h2>
            <p className="text-gray-400 text-sm mt-0.5">To: {studentName}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Skill / Topic</label>
            <select
              value={skillId}
              onChange={(e) => setSkillId(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a skill...</option>
              {skills.map((s) => (
                <option key={s.skill_id || s._id} value={s.skill_id || s._id}>
                  {s.skill_name || s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Message (optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Focus on the fundamentals..."
              className="input resize-none"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Due Date (optional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
            <button type="submit" disabled={loading || !skillId} className="btn-primary flex-1">
              {loading ? 'Assigning...' : 'Assign Topic'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
