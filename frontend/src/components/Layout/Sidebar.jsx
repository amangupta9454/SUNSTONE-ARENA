import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { isTeacher } from '../../services/auth'

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/app/assessment', label: 'Assessment', icon: '📝' },
  { to: '/app/quiz', label: 'Quiz', icon: '🧠' },
  { to: '/app/practice', label: 'AI Practice', icon: '⚡' },
  { to: '/app/exam', label: 'Exam Mode', icon: '⏱️' },
  { to: '/app/adaptive-path', label: 'Adaptive Path', icon: '🧭' },
  { to: '/app/plan', label: 'Learning Plan', icon: '📋' },
  { to: '/app/challenges', label: 'Challenges', icon: '🎯' },
  { to: '/app/review', label: 'SRS Review', icon: '🔁' },
  { to: '/app/mistakes', label: 'Mistake Journal', icon: '📖' },
  { to: '/app/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { to: '/app/tutor', label: 'AI Tutor', icon: '🤖' },
]

const teacherItems = [
  { to: '/app/teacher', label: 'Teacher View', icon: '👩‍🏫' },
  { to: '/app/class-insights', label: 'Class Insights', icon: '📊' },
]

export default function Sidebar() {
  const teacher = isTeacher()

  return (
    <aside className="w-60 bg-dark-800 border-r border-white/5 flex flex-col py-6 hidden md:flex">
      {/* Logo */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-sm">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-white text-lg">EduPath AI</span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow-sm'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          </motion.div>
        ))}

        {teacher && (
          <>
            <div className="pt-4 pb-2 px-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Teacher</p>
            </div>
            {teacherItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-secondary/20 text-secondary border border-secondary/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="px-3">
        <div className="rounded-xl p-4 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
          <p className="text-xs font-semibold text-primary/80">ML-Powered</p>
          <p className="text-sm font-bold text-white mt-1">Quiz → Plan → Win 🚀</p>
        </div>
      </div>
    </aside>
  )
}
