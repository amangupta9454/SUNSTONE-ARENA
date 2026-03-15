import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { register } from '../services/api'

const CAREER_GOALS = [
  { value: 'data_scientist',          label: 'Data Scientist',             icon: '📊' },
  { value: 'machine_learning_engineer', label: 'ML Engineer',              icon: '🤖' },
  { value: 'web_developer',           label: 'Web Developer',              icon: '🌐' },
  { value: 'ai_researcher',           label: 'AI Researcher',              icon: '🔬' },
  { value: 'data_analyst',            label: 'Data Analyst',               icon: '📈' },
  { value: 'software_engineer',       label: 'Software Engineer',          icon: '💻' },
  { value: 'other',                   label: 'Other',                      icon: '✨' },
]

const STEPS = ['Account', 'Role', 'Goal']

const FLOATING_PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}))

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student', career_goal: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const nextStep = () => {
    if (step === 0) {
      if (!form.name) return toast.error('Please enter your name')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error('Enter a valid email')
      if (form.password.length < 6) return toast.error('Password must be at least 6 characters')
      if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
    }
    setStep((s) => Math.min(s + 1, 2))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        career_goal: form.career_goal,
      })
      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const f = (field) => ({ value: form[field], onChange: (e) => setForm({ ...form, [field]: e.target.value }) })

  return (
    <div className="min-h-screen flex overflow-hidden" style={{ background: '#050B18' }}>

      {/* ── Left Panel ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Dynamic spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.07), transparent 60%)`,
          }}
        />

        {/* Background orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6366F1, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[40%] right-[10%] w-[250px] h-[250px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* Particles */}
        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: `${p.size}px`, height: `${p.size}px`,
              background: p.id % 3 === 0 ? '#8B5CF6' : p.id % 3 === 1 ? '#6366F1' : '#06B6D4',
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>E</div>
            <span className="font-bold text-white text-xl tracking-tight">EduPath AI</span>
          </div>
        </motion.div>

        {/* Hero */}
        <div className="space-y-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#A78BFA' }}>
              🚀 Join 2,400+ learners
            </div>
            <h2 className="text-5xl font-extrabold text-white leading-tight">
              Start Your<br />
              <span style={{
                background: 'linear-gradient(135deg, #8B5CF6, #6366F1, #06B6D4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>AI Journey.</span>
            </h2>
            <p className="text-gray-400 mt-4 text-lg leading-relaxed">
              Get a personalized learning path built around your goals, pace, and style.
            </p>
          </motion.div>

          {/* What you get */}
          <div className="space-y-3">
            {[
              { label: 'Adaptive curriculum', sub: 'Updates as you learn in real-time' },
              { label: 'AI Study Tutor 24/7', sub: 'Ask anything, get instant answers' },
              { label: 'Progress heatmaps', sub: 'Visualize your knowledge graph' },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                  <span className="text-gray-500 text-xs ml-2">{item.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Step progress visual */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="p-5 rounded-2xl"
            style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Your setup progress</p>
            <div className="flex gap-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className="h-1.5 rounded-full overflow-hidden mb-1.5"
                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: i <= step ? 'linear-gradient(90deg, #8B5CF6, #6366F1)' : 'transparent' }}
                      initial={{ width: '0%' }}
                      animate={{ width: i <= step ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs" style={{ color: i <= step ? '#A78BFA' : '#4B5563' }}>{s}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-gray-600 text-xs">
          © 2026 EduPath AI. Free forever for students.
        </motion.p>
      </div>

      {/* ── Right Panel — Form ──────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative"
        style={{
          background: 'linear-gradient(160deg, #080E1E 0%, #050B18 60%, #060C1A 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
        }}>

        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)', filter: 'blur(60px)' }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>E</div>
            <span className="font-bold text-white text-lg">EduPath AI</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="text-gray-500 hover:text-gray-300 transition-colors mr-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
              )}
              <h1 className="text-3xl font-extrabold text-white">
                {step === 0 ? 'Create account' : step === 1 ? 'Choose your role' : 'Pick your goal'}
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              {step === 0
                ? 'Already have one? '
                : step === 1
                ? "Tell us who you are so we can tailor your experience"
                : 'This helps us build your personalized learning path'}
              {step === 0 && <Link to="/login" className="font-semibold" style={{ color: '#818CF8' }}>Sign in</Link>}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex gap-1.5 mb-7">
            {STEPS.map((_, i) => (
              <div key={i} className="h-1 flex-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #8B5CF6, #6366F1)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: i <= step ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>

          <form onSubmit={step < 2 ? (e) => { e.preventDefault(); nextStep() } : handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 0 — Credentials */}
              {step === 0 && (
                <motion.div key="s0"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-4">

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                      </span>
                      <input type="text" className="input pl-10" placeholder="Alice Johnson"
                        autoComplete="name" {...f('name')}
                        style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Email</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>
                        </svg>
                      </span>
                      <input type="email" className="input pl-10" placeholder="you@example.com"
                        autoComplete="email" {...f('email')}
                        style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Password</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </span>
                      <input type={showPass ? 'text' : 'password'} className="input pl-10 pr-10"
                        placeholder="Min. 6 characters" autoComplete="new-password" {...f('password')}
                        style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.08)' }} />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                        {showPass
                          ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                          : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        }
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Confirm Password</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </span>
                      <input type="password" className="input pl-10" placeholder="Repeat password"
                        autoComplete="new-password" {...f('confirmPassword')}
                        style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(255,255,255,0.08)' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1 — Role */}
              {step === 1 && (
                <motion.div key="s1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-3">
                  {[
                    { role: 'student', icon: '🎓', title: 'Student', sub: 'Learning & growing my skills' },
                    { role: 'teacher', icon: '👩‍🏫', title: 'Teacher', sub: 'Guiding and assigning coursework' },
                  ].map(({ role, icon, title, sub }) => (
                    <motion.button key={role} type="button"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setForm({ ...form, role })}
                      className="w-full p-5 rounded-2xl text-left transition-all"
                      style={{
                        background: form.role === role ? 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))' : 'rgba(10,22,40,0.6)',
                        border: form.role === role ? '1px solid rgba(139,92,246,0.45)' : '1px solid rgba(255,255,255,0.07)',
                        boxShadow: form.role === role ? '0 0 20px rgba(139,92,246,0.12)' : 'none',
                      }}>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{icon}</span>
                        <div>
                          <div className="text-white font-semibold">{title}</div>
                          <div className="text-gray-500 text-sm mt-0.5">{sub}</div>
                        </div>
                        {form.role === role && (
                          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Step 2 — Career Goal */}
              {step === 2 && (
                <motion.div key="s2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-2 gap-2">
                  {CAREER_GOALS.map(({ value, label, icon }) => (
                    <motion.button key={value} type="button"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setForm({ ...form, career_goal: value })}
                      className="p-3.5 rounded-2xl text-left transition-all"
                      style={{
                        background: form.career_goal === value ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.12))' : 'rgba(10,22,40,0.6)',
                        border: form.career_goal === value ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.07)',
                        boxShadow: form.career_goal === value ? '0 0 15px rgba(139,92,246,0.12)' : 'none',
                      }}>
                      <div className="text-2xl mb-2">{icon}</div>
                      <div className="text-white text-xs font-semibold leading-tight">{label}</div>
                    </motion.button>
                  ))}
                  <motion.button type="button"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setForm({ ...form, career_goal: '' })}
                    className="col-span-2 p-3 rounded-xl text-center text-gray-500 text-xs transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(10,22,40,0.3)' }}>
                    Skip for now
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl font-semibold text-white mt-6 flex items-center justify-center gap-2 transition-all"
              style={{
                background: loading ? 'rgba(99,102,241,0.35)' : 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                boxShadow: loading ? 'none' : '0 0 30px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Creating account...
                </>
              ) : step < 2 ? (
                <>Continue <span>→</span></>
              ) : (
                <>Create Account 🚀</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
