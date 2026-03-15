export default function WeeklyPlanTimeline({ weeks }) {
  if (!weeks?.length) return <p className="text-sm text-gray-500">No weekly plan available.</p>

  return (
    <div className="space-y-4">
      {weeks.map((w) => (
        <div key={w.week} className="flex gap-4">
          {/* Week badge */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
              W{w.week}
            </div>
            {w.week < weeks.length && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
          </div>

          {/* Content */}
          <div className="pb-4 flex-1">
            <p className="font-semibold text-gray-800 text-sm">{w.focus}</p>
            <p className="text-xs text-gray-500 mt-0.5">{w.goal}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {w.skills.map((s, i) => (
                <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{s}</span>
              ))}
            </div>
            {w.resources?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {w.resources.map((r, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">📚 {r}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
