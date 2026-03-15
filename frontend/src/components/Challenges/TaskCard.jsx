const PRIORITY_STYLES = {
  critical: 'badge-danger',
  high: 'bg-orange-400/20 text-orange-400 border border-orange-400/30',
  medium: 'badge-warning',
  low: 'bg-white/10 text-gray-400 border border-white/10',
}

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isDone = task.status === 'done'
  const overdue = task.due_date && new Date(task.due_date) < new Date() && !isDone

  return (
    <div className={`bg-dark-800 rounded-xl border p-4 flex gap-3 transition-all ${
      isDone ? 'opacity-50' : 'hover:border-primary/30'
    } ${overdue ? 'border-danger/40' : 'border-white/5'}`}>
      <button
        onClick={() => onToggle(task._id)}
        className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition ${
          isDone ? 'bg-success border-success text-white' : 'border-gray-600 hover:border-primary'
        }`}
      >
        {isDone && <span className="text-xs">✓</span>}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${isDone ? 'line-through text-gray-600' : 'text-white'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-500 mt-0.5 truncate">{task.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className={`badge text-xs ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium}`}>
            {task.priority}
          </span>
          {task.xp_reward > 0 && (
            <span className="badge badge-purple text-xs">⚡ {task.xp_reward} XP</span>
          )}
          {task.due_date && (
            <span className={`text-xs ${overdue ? 'text-danger font-semibold' : 'text-gray-500'}`}>
              📅 {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
          {task.source === 'plan' && (
            <span className="badge badge-primary text-xs">🤖 AI</span>
          )}
        </div>
      </div>

      <div className="flex gap-1 shrink-0">
        <button onClick={() => onEdit(task)} className="p-1.5 text-gray-500 hover:text-primary rounded-lg hover:bg-primary/10 transition">✏️</button>
        <button onClick={() => onDelete(task._id)} className="p-1.5 text-gray-500 hover:text-danger rounded-lg hover:bg-danger/10 transition">🗑️</button>
      </div>
    </div>
  )
}
