import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function MasteryChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="skill_name" tick={{ fontSize: 11 }} width={160} />
        <Tooltip formatter={(v) => `${Math.round(v * 100)}%`} />
        <Bar dataKey="average_mastery" radius={[0, 6, 6, 0]}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.average_mastery >= 0.7 ? '#059669' : entry.average_mastery >= 0.4 ? '#D97706' : '#DC2626'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
