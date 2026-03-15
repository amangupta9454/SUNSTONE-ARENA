import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getLeaderboard } from '../services/api'
import { getUser } from '../services/auth'

const RANK_STYLES = {
  1: { icon: '🥇', glow: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]', border: 'border-yellow-500/40', text: 'rank-gold' },
  2: { icon: '🥈', glow: 'shadow-[0_0_20px_rgba(209,213,219,0.2)]', border: 'border-gray-400/40', text: 'rank-silver' },
  3: { icon: '🥉', glow: 'shadow-[0_0_20px_rgba(251,146,60,0.2)]', border: 'border-orange-400/40', text: 'rank-bronze' },
}

export default function Leaderboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = getUser()

  useEffect(() => {
    getLeaderboard()
      .then((r) => setData(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )

  const board = data?.leaderboard || []
  const myRank = data?.my_rank

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white">🏆 Leaderboard</h1>
        <p className="text-gray-400 mt-1">Top students ranked by mastery score</p>
      </motion.div>

      {myRank && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-glow flex items-center gap-4"
        >
          <div className="text-3xl font-black gradient-text">#{myRank}</div>
          <div>
            <p className="text-white font-semibold">Your Rank</p>
            <p className="text-gray-400 text-sm">Keep learning to climb higher!</p>
          </div>
        </motion.div>
      )}

      {/* Top 3 podium */}
      {board.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {[board[1], board[0], board[2]].map((entry, i) => {
            const rank = i === 0 ? 2 : i === 1 ? 1 : 3
            const style = RANK_STYLES[rank]
            const isMe = entry?.student_id?.toString() === user?.id
            return (
              <motion.div
                key={entry?.student_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: rank === 1 ? -8 : 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card border ${style.border} ${style.glow} text-center ${isMe ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="text-3xl mb-2">{style.icon}</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                  {entry?.name?.[0]?.toUpperCase()}
                </div>
                <p className="font-semibold text-white text-sm truncate">{entry?.name}</p>
                <p className={`text-2xl font-black mt-1 ${style.text}`}>{entry?.avg_mastery}%</p>
                <p className="text-xs text-gray-500 mt-1">{entry?.skills_mastered} mastered</p>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Full table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <div className="space-y-2">
          {board.map((entry, i) => {
            const isMe = entry.student_id?.toString() === user?.id
            const style = RANK_STYLES[entry.rank]
            return (
              <motion.div
                key={entry.student_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                  isMe ? 'bg-primary/10 border border-primary/30' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-8 text-center font-black text-lg ${style ? style.text : 'text-gray-400'}`}>
                  {style ? style.icon : `#${entry.rank}`}
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {entry.name?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm truncate ${isMe ? 'text-primary' : 'text-white'}`}>
                    {entry.name} {isMe && <span className="text-xs">(you)</span>}
                  </p>
                  {entry.career_goal && (
                    <p className="text-xs text-gray-500 truncate capitalize">{entry.career_goal}</p>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-white">{entry.avg_mastery}%</p>
                  <p className="text-xs text-gray-500">{entry.skills_mastered} skills</p>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="font-bold text-accent">{entry.xp} XP</p>
                  <p className="text-xs text-gray-500">{entry.accuracy}% acc</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
