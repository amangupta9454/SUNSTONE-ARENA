export default function StatsBar({ mastery_map }) {
  const total = mastery_map?.length || 0
  const mastered = mastery_map?.filter((m) => m.mastery_score >= 0.7).length || 0
  const avg = total > 0
    ? Math.round((mastery_map.reduce((s, m) => s + m.mastery_score, 0) / total) * 100)
    : 0
  const inProgress = mastery_map?.filter((m) => m.mastery_score > 0.3 && m.mastery_score < 0.7).length || 0

  const stats = [
    { label: 'Total Skills', value: total, icon: '📚', color: 'text-primary' },
    { label: 'Avg Mastery', value: `${avg}%`, icon: '📊', color: 'text-secondary' },
    { label: 'Mastered', value: mastered, icon: '✅', color: 'text-success' },
    { label: 'In Progress', value: inProgress, icon: '⚡', color: 'text-warning' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="card text-center">
          <div className="text-2xl mb-1">{s.icon}</div>
          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
          <div className="text-xs text-gray-500 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
