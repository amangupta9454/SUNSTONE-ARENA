import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo } from '../services/api'
import useStore from '../store/useStore'
import TaskCard from '../components/Challenges/TaskCard'
import AddTaskModal from '../components/Challenges/AddTaskModal'

const FILTERS = ['all', 'todo', 'in_progress', 'done']

export default function Challenges() {
  const { todos, setTodos, addTodo, removeTodo, updateTodoItem } = useStore()
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    getTodos().then((r) => setTodos(r.data.tasks || [])).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSave = async (form) => {
    try {
      if (editing) {
        const r = await updateTodo(editing._id, form)
        updateTodoItem(editing._id, r.data.task)
      } else {
        const r = await createTodo(form)
        addTodo(r.data.task)
      }
      setModalOpen(false)
      setEditing(null)
    } catch {}
  }

  const handleToggle = async (id) => {
    try { const r = await toggleTodo(id); updateTodoItem(id, r.data.task) } catch {}
  }
  const handleDelete = async (id) => {
    try { await deleteTodo(id); removeTodo(id) } catch {}
  }
  const handleEdit = (task) => { setEditing(task); setModalOpen(true) }

  const filtered = filter === 'all' ? todos : todos.filter((t) => t.status === filter)
  const totalXP = todos.filter((t) => t.status === 'done').reduce((sum, t) => sum + (t.xp_reward || 0), 0)
  const doneCount = todos.filter((t) => t.status === 'done').length

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">🎯 Challenges</h1>
          <p className="text-sm text-gray-400 mt-1">{doneCount}/{todos.length} completed · ⚡ <span className="text-warning font-bold">{totalXP} XP</span> earned</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true) }} className="btn-primary text-sm py-2 px-4">
          + Add Challenge
        </button>
      </motion.div>

      {todos.length > 0 && (
        <div className="card">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span><span>{doneCount}/{todos.length}</span>
          </div>
          <div className="progress-bar">
            <motion.div className="progress-fill" animate={{ width: `${todos.length ? (doneCount / todos.length) * 100 : 0}%` }} transition={{ duration: 0.6 }} />
          </div>
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition capitalize ${
              filter === f ? 'bg-primary text-white shadow-glow-sm' : 'bg-dark-700 border border-white/10 text-gray-400 hover:text-white'
            }`}
          >
            {f.replace('_', ' ')}
            <span className="ml-1.5 text-xs opacity-70">
              {f === 'all' ? todos.length : todos.filter((t) => t.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">🎯</div>
          <p className="text-gray-400 text-sm">
            {filter === 'all' ? 'No challenges yet. Generate a learning plan or add one manually.' : `No ${filter.replace('_', ' ')} tasks.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task, i) => (
            <motion.div key={task._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <TaskCard task={task} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
            </motion.div>
          ))}
        </div>
      )}

      <AddTaskModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null) }} onSave={handleSave} initial={editing} />
    </div>
  )
}
