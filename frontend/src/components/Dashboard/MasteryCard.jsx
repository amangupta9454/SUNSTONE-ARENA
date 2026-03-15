// Circular progress mastery card for each skill
export default function MasteryCard({ skill }) {
  const pct = Math.round((skill.mastery_score || 0) * 100)
  const color = pct >= 70 ? '#059669' : pct >= 40 ? '#D97706' : '#DC2626'
  const subjectColors = {
    Math: 'bg-blue-100 text-blue-700',
    Programming: 'bg-purple-100 text-purple-700',
    AI: 'bg-green-100 text-green-700',
  }

  // SVG circle math
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div className="card hover:shadow-md transition cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{skill.skill_name}</p>
          <span className={`badge mt-1 ${subjectColors[skill.subject] || 'bg-gray-100 text-gray-600'}`}>
            {skill.subject}
          </span>
        </div>
        {/* Circular progress */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#E5E7EB" strokeWidth="6" />
            <circle
              cx="36" cy="36" r={r} fill="none"
              stroke={color} strokeWidth="6"
              strokeDasharray={`${dash} ${circ}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color }}>
            {pct}%
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
          <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <span className="text-xs text-gray-500">Diff {skill.difficulty}/5</span>
      </div>
    </div>
  )
}
