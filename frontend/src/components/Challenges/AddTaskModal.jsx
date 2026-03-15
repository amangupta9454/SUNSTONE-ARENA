import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMPTY = { title: '', description: '', priority: 'medium', due_date: '' }

export default function AddTaskModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY)

  useEffect(() => {
    setForm(initial ? {
      title: initial.title || '',
      description: initial.description || '',
      priority: initial.priority || 'medium',
      due_date: initial.due_date ? initial.due_date.slice(0, 10) : '',
    } : EMPTY)
  }, [initial, open])

  if (!open) return null

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, due_date: form.due_date || null })
  }

  return (
    <AnimatePresence>
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
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-white">{initial ? 'Edit Task' : 'New Challenge'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Title *</label>
              <input className="input mt-1" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Practice backpropagation" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Description</label>
              <textarea className="input mt-1 resize-none" rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Optional details..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase">Priority</label>
                <select className="input mt-1" value={form.priority} onChange={(e) => set('priority', e.target.value)}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase">Due Date</label>
                <input type="date" className="input mt-1" value={form.due_date} onChange={(e) => set('due_date', e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="btn-outline flex-1 py-2 text-sm">Cancel</button>
              <button type="submit" className="btn-primary flex-1 py-2 text-sm">{initial ? 'Save Changes' : 'Add Challenge'}</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
