import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Filter, RefreshCw } from 'lucide-react'
import { getMyMistakes, getMistakeSubjects } from '../services/api'
import MistakeCard from '../components/MistakeCard'

export default function MistakeJournal() {
  const [mistakes, setMistakes] = useState([])
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ subject: '', reviewed: '' })

  const fetchMistakes = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filter.subject) params.subject = filter.subject
      if (filter.reviewed !== '') params.reviewed = filter.reviewed
      const res = await getMyMistakes(params)
      setMistakes(res.data.mistakes || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMistakeSubjects().then((res) => setSubjects(res.data.subjects || []))
  }, [])

  useEffect(() => { fetchMistakes() }, [filter])

  const handleUpdate = (updated) => {
    setMistakes((prev) => prev.map((m) => (m._id === updated._id ? updated : m)))
  }

  const unreviewed = mistakes.filter((m) => !m.is_reviewed).length

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <BookOpen size={24} className="text-red-400" />
          <h1 className="text-2xl font-bold text-white">Mistake Journal</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Review your incorrect answers and track your improvement.
          {unreviewed > 0 && (
            <span className="ml-2 badge badge-danger">{unreviewed} pending review</span>
          )}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card mb-6 flex flex-wrap gap-3 items-center"
      >
        <Filter size={14} className="text-gray-400" />

        <select
          value={filter.subject}
          onChange={(e) => setFilter((f) => ({ ...f, subject: e.target.value }))}
          className="input w-auto text-sm py-1.5"
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={filter.reviewed}
          onChange={(e) => setFilter((f) => ({ ...f, reviewed: e.target.value }))}
          className="input w-auto text-sm py-1.5"
        >
          <option value="">All Status</option>
          <option value="false">Pending Review</option>
          <option value="true">Reviewed</option>
        </select>

        <button onClick={fetchMistakes} className="btn-ghost text-sm flex items-center gap-1">
          <RefreshCw size={12} /> Refresh
        </button>

        <span className="ml-auto text-gray-400 text-sm">{mistakes.length} mistakes</span>
      </motion.div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
        </div>
      ) : mistakes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-16"
        >
          <div className="text-5xl mb-4">🎉</div>
          <p className="text-white font-semibold">No mistakes found!</p>
          <p className="text-gray-400 text-sm mt-1">
            {filter.subject || filter.reviewed ? 'Try adjusting your filters.' : 'Complete a quiz to start tracking mistakes.'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {mistakes.map((m, i) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <MistakeCard mistake={m} onUpdate={handleUpdate} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
