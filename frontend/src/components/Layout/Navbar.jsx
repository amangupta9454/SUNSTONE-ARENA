import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { logout, getUser } from '../../services/auth'
import useStore from '../../store/useStore'
import api, { recordDailyLogin } from '../../services/api'
import XPProgressBar from '../XPProgressBar'

export default function Navbar() {
  const navigate = useNavigate()
  const clearUser = useStore((s) => s.clearUser)
  const user = getUser()
  const [notifications, setNotifications] = useState([])
  const [unread, setUnread] = useState(0)
  const [showNotifs, setShowNotifs] = useState(false)
  const [ringing, setRinging] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    fetchNotifications()
    // Check SRS due cards on mount
    api.post('/api/notifications/check-srs').catch(() => {})
    // Record daily login for XP/streak
    recordDailyLogin().catch(() => {})
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setShowNotifs(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/api/notifications')
      setNotifications(data.notifications || [])
      setUnread(data.unread_count || 0)
      if (data.unread_count > 0) {
        setRinging(true)
        setTimeout(() => setRinging(false), 1000)
      }
    } catch {}
  }

  const markAllRead = async () => {
    await api.patch('/api/notifications/read-all').catch(() => {})
    setUnread(0)
    setNotifications((n) => n.map((x) => ({ ...x, read: true })))
  }

  const handleNotifClick = async (notif) => {
    if (!notif.read) {
      await api.patch(`/api/notifications/${notif._id}/read`).catch(() => {})
      setNotifications((n) => n.map((x) => x._id === notif._id ? { ...x, read: true } : x))
      setUnread((u) => Math.max(0, u - 1))
    }
    if (notif.action_url) navigate(notif.action_url)
    setShowNotifs(false)
  }

  const handleLogout = () => {
    logout()
    clearUser()
    navigate('/login')
  }

  return (
    <header className="bg-dark-800 border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 md:hidden">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">E</span>
        </div>
        <span className="font-bold text-white text-lg">EduPath AI</span>
      </div>

      <div className="hidden md:block" />

      <div className="flex items-center gap-4" ref={dropRef}>
        {/* XP bar — compact, hidden on small screens */}
        <div className="hidden lg:block">
          <XPProgressBar compact />
        </div>
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs((v) => !v)}
            className="relative w-9 h-9 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center hover:border-primary/40 transition-all"
          >
            <span className={`text-lg ${ringing ? 'bell-ring' : ''}`}>🔔</span>
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full text-xs text-white flex items-center justify-center font-bold">
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-dark-800 border border-white/10 rounded-2xl shadow-card-dark z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <span className="font-semibold text-white text-sm">Notifications</span>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 text-sm">No notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <button
                        key={n._id}
                        onClick={() => handleNotifClick(n)}
                        className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
                          <div className={!n.read ? '' : 'ml-5'}>
                            <p className="text-sm font-medium text-white">{n.title}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{n.message}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User info */}
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-white">{user?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow-sm">
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-danger transition font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
