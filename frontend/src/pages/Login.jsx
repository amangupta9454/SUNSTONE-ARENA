import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { login } from '../services/api'
import { saveToken, saveUser } from '../services/auth'
import useStore from '../store/useStore'

const FEATURES = [
  { icon: '🧠', title: 'AI-Powered Learning', desc: 'Adaptive paths tailored to your pace' },
  { icon: '📊', title: 'Real-time Analytics', desc: 'Track mastery with live progress data' },
  { icon: '🏆', title: 'Gamified Progress', desc: 'Earn XP, climb leaderboards, unlock ranks' },
]

const FLOATING_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}))

export default function Login() {
  const navigate = useNavigate()
  const setUser = useStore((s) => s.setUser)
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill in all fields'); return }
    setLoading(true)
    try {
      const { data } = await login(form)
      saveToken(data.token)
      saveUser(data.user)
      setUser(data.user)
      toast.success(`Welcome back, ${data.user.name}!`)
      navigate('/app/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#050B18' }}>
      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Dynamic spotlight following mouse */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.07), transparent 60%)`,
          }}
        />

        {/* Background orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* Floating particles */}
        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.id % 3 === 0 ? '#6366F1' : p.id % 3 === 1 ? '#8B5CF6' : '#06B6D4',
              boxShadow: `0 0 ${p.size * 3}px currentColor`,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
              E
            </div>
            <span className="font-bold text-white text-xl tracking-tight">EduPath AI</span>
          </div>
        </motion.div>

        {/* Hero text */}
        <div className="space-y-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              Learn Smarter,<br />
              <span style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Not Harder.</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg leading-relaxed">
              Your AI companion that adapts to how you think, learns, and grows.
            </p>
          </motion.div>

          {/* Feature list */}
          <div className="space-y-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,27,53,0.8), rgba(10,22,40,0.6))',
                  border: '1px solid rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.2)' }}>
                  {f.icon}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{f.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {['#6366F1','#8B5CF6','#06B6D4','#10B981'].map((color, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050B18] flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: color }}>
                  {['A','B','C','D'][i]}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm"><span className="text-white font-semibold">2,400+</span> students learning today</p>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-gray-600 text-xs">
          © 2026 EduPath AI. Transforming education with intelligence.
        </motion.p>
      </div>

      {/* ── Right Panel — Form ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative"
        style={{
          background: 'linear-gradient(160deg, #080E1E 0%, #050B18 60%, #060C1A 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
        }}>

        {/* Top right orb */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(60px)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>E</div>
            <span className="font-bold text-white text-lg">EduPath AI</span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
            <p className="text-gray-500">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400">Email address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input pl-11"
                  style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input pl-11 pr-12"
                  style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold text-white relative overflow-hidden transition-all"
              style={{
                background: loading ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                boxShadow: loading ? 'none' : '0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>Sign In <span className="text-lg">→</span></>
                )}
              </span>
            </motion.button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-gray-600 text-xs font-medium">New to EduPath?</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold text-center transition-all cursor-pointer"
              style={{
                background: 'transparent',
                border: '1px solid rgba(99,102,241,0.3)',
                color: '#A5B4FC',
              }}
            >
              Create an account
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
