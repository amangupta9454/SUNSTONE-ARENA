const COLORS = {
  blue: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  violet: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
  cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
}

export default function Badge({ children, color = 'blue' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border font-mono tracking-wider uppercase ${COLORS[color] || COLORS.blue}`}>
      {children}
    </span>
  )
}
