// Heatmap table: students as rows, skills as columns
export default function MasteryTable({ students, skills }) {
  const cellColor = (score) => {
    if (!score) return 'bg-gray-100 text-gray-400'
    if (score >= 0.7) return 'bg-green-100 text-green-800'
    if (score >= 0.4) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left py-2 px-3 font-semibold text-gray-600 sticky left-0 bg-white">Student</th>
            {skills.map((s) => (
              <th key={s.skill_id} className="py-2 px-2 font-medium text-gray-500 text-center max-w-[80px]">
                <span className="block truncate max-w-[70px]">{s.skill_name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id} className="border-t border-gray-100">
              <td className="py-2 px-3 font-medium text-gray-900 sticky left-0 bg-white whitespace-nowrap">
                {student.name}
              </td>
              {skills.map((s) => {
                const score = student.mastery_by_skill?.[s.skill_id]
                return (
                  <td key={s.skill_id} className="py-1 px-1 text-center">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${cellColor(score)}`}>
                      {score ? `${Math.round(score * 100)}%` : '—'}
                    </span>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
