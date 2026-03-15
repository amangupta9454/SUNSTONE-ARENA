import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, Coffee, Play, Pause, RotateCcw, Zap } from 'lucide-react'

const WORK_DURATION = 25 * 60   // 25 minutes
const BREAK_DURATION = 5 * 60   // 5 minutes
const LONG_BREAK_DURATION = 15 * 60 // 15 min after 4 pomodoros

/**
 * SmartBreakWidget — Pomodoro timer with break recommendations.
 * Fully client-side. No backend needed.
 * Props:
 *   weakestSubject — string, passed from parent (from weak spots data)
 */
export default function SmartBreakWidget({ weakestSubject }) {
  const [phase, setPhase] = useState('idle')   // idle | work | break | long_break
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION)
  const [running, setRunning] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [showBreakTip, setShowBreakTip] = useState(false)
  const intervalRef = useRef(null)

  const totalTime = phase === 'break' ? BREAK_DURATION
    : phase === 'long_break' ? LONG_BREAK_DURATION
    : WORK_DURATION

  const pct = ((totalTime - timeLeft) / totalTime) * 100
  const circumference = 2 * Math.PI * 44
  const strokeDashoffset = circumference - (pct / 100) * circumference

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const startBreak = useCallback(() => {
    const newCount = pomodoroCount + 1
    setPomodoroCount(newCount)
    const isLong = newCount % 4 === 0
    setPhase(isLong ? 'long_break' : 'break')
    setTimeLeft(isLong ? LONG_BREAK_DURATION : BREAK_DURATION)
    setRunning(true)
    setShowBreakTip(true)
  }, [pomodoroCount])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          if (phase === 'work') {
            // Notify user
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('⏰ Time for a break!', {
                body: weakestSubject
                  ? `After your break, focus on: ${weakestSubject}`
                  : 'Great work! Take a 5-minute break.',
              })
            }
            startBreak()
          } else {
            // Break over — back to work
            setPhase('work')
            setTimeLeft(WORK_DURATION)
            setShowBreakTip(false)
          }
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, phase, startBreak, weakestSubject])

  const handleStart = () => {
    if (phase === 'idle') {
      setPhase('work')
      setTimeLeft(WORK_DURATION)
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission()
      }
    }
    setRunning(true)
  }

  const handleReset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setPhase('idle')
    setTimeLeft(WORK_DURATION)
    setShowBreakTip(false)
  }

  const phaseColor = phase === 'work' ? '#6366F1'
    : phase === 'long_break' ? '#10B981'
    : '#06B6D4'

  const phaseLabel = phase === 'idle' ? 'Ready'
    : phase === 'work' ? 'Focus Time'
    : phase === 'long_break' ? 'Long Break'
    : 'Short Break'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Timer size={16} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Smart Break Timer</h3>
            <p className="text-gray-500 text-xs">Pomodoro · {pomodoroCount} sessions done</p>
          </div>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: i < (pomodoroCount % 4) ? phaseColor : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>
      </div>

      {/* Circular timer */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke={phaseColor} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-white font-bold text-xl tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-xs mt-0.5" style={{ color: phaseColor }}>{phaseLabel}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mt-3">
          {!running ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: phaseColor }}
            >
              <Play size={14} /> {phase === 'idle' ? 'Start' : 'Resume'}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setRunning(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-white"
            >
              <Pause size={14} /> Pause
            </motion.button>
          )}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Break tip */}
      <AnimatePresence>
        {showBreakTip && (phase === 'break' || phase === 'long_break') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Coffee size={14} className="text-cyan-400" />
                <span className="text-cyan-400 text-xs font-semibold">Break Tip</span>
              </div>
              <p className="text-gray-300 text-xs">
                {phase === 'long_break'
                  ? 'Great work on 4 sessions! Take 15 minutes — stretch, hydrate, step outside.'
                  : 'Step away from the screen for 5 minutes. Look at something 20 feet away.'}
              </p>
              {weakestSubject && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Zap size={12} className="text-amber-400" />
                  <p className="text-amber-400 text-xs">
                    After break: focus on <strong>{weakestSubject}</strong>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
