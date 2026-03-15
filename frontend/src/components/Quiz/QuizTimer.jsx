import { useEffect, useState } from 'react'

export default function QuizTimer({ seconds, onExpire }) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) { onExpire?.(); return }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(t)
  }, [remaining])

  const pct = (remaining / seconds) * 100
  const color = remaining <= 10 ? 'bg-red-500' : remaining <= 20 ? 'bg-yellow-400' : 'bg-green-500'

  return (
    <div className="flex items-center gap-3">
      <span className={`text-lg font-bold ${remaining <= 10 ? 'text-red-400 animate-pulse' : 'text-gray-300'}`}>
        {remaining}s
      </span>
      <div className="flex-1 h-2 bg-dark-700 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
