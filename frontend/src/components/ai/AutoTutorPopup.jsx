import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/**
 * AutoTutorPopup — shows when student is struggling (3+ wrong answers, high load, slow response).
 * Props:
 *   wrongStreak: number of consecutive wrong answers
 *   topic: current topic name
 *   onDismiss: callback to close
 */
export default function AutoTutorPopup({ wrongStreak = 0, topic = '', onDismiss }) {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger popup after 3 consecutive wrong answers
    if (wrongStreak >= 3) {
      setVisible(true)
    }
  }, [wrongStreak])

  const handleAskTutor = () => {
    setVisible(false)
    onDismiss?.()
    navigate('/app/tutor')
  }

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="card-glow p-5 shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #0A1628, rgba(99,102,241,0.1))', borderColor: 'rgba(99,102,241,0.4)' }}
          >
            <div className="flex items-start gap-3 mb-4">
              <motion.span
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-3xl"
              >
                🤖
              </motion.span>
              <div>
                <p className="font-bold text-white text-sm">Need help with this concept?</p>
                <p className="text-gray-400 text-xs mt-1">
                  {topic ? `You seem to be struggling with "${topic}".` : "You've missed a few in a row."}
                  {' '}Your AI tutor is ready to help!
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAskTutor} className="btn-primary flex-1 text-xs py-2">
                Ask AI Tutor
              </button>
              <button onClick={handleDismiss} className="btn-outline flex-1 text-xs py-2">
                Keep Going
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
