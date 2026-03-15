export default function StrengthWeaknessCard({ title, items, type }) {
  const isStrength = type === 'strength'
  const bg = isStrength ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
  const badge = isStrength ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  const icon = isStrength ? '💪' : '⚠️'

  return (
    <div className={`rounded-xl border p-4 ${bg}`}>
      <h3 className="font-semibold text-gray-800 mb-3">{icon} {title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">None yet — complete more assessments.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.skill_name}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge}`}>
                {Math.round((item.mastery_score || 0) * 100)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
