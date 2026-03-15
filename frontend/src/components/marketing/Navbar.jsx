import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function BrainIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="brainGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="13" fill="url(#brainGrad)" opacity="0.15" />
      <path d="M9 10c0-2.2 1.8-4 4-4 1.1 0 2.1.4 2.8 1.1" stroke="url(#brainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 10c0-2.2-1.8-4-4-4" stroke="url(#brainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2h14c1.1 0 2 .9 2 2s-.9 2-2 2" stroke="url(#brainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 14v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4" stroke="url(#brainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill="url(#brainGrad)" />
      <circle cx="9" cy="14" r="1.2" fill="#3B82F6" opacity="0.7" />
      <circle cx="19" cy="14" r="1.2" fill="#8B5CF6" opacity="0.7" />
    </svg>
  )
}

export default function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-[#050B18]/90 border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <BrainIcon />
              <span className="font-jakarta font-extrabold text-lg bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                EduPath AI
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-[#38BDF8]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="navDot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-200">
                Sign In
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 rounded-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-200">
                Get Started Free
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/5 transition"
              aria-label="Open menu"
            >
              <span className="w-5 h-0.5 bg-white rounded-full" />
              <span className="w-5 h-0.5 bg-white rounded-full" />
              <span className="w-3.5 h-0.5 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#050B18]/98 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-10">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <BrainIcon />
                <span className="font-jakarta font-extrabold text-lg bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  EduPath AI
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-white/10 transition text-white text-xl" aria-label="Close menu">
                ✕
              </button>
            </div>

            <nav className="flex-1 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-4 text-2xl font-jakarta font-bold rounded-xl transition ${
                        isActive ? 'text-white bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex flex-col gap-3 mt-8">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center text-white border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition">
                Sign In
              </Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="w-full py-3 text-center text-white font-semibold bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition">
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
