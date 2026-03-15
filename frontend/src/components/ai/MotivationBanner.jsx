import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getMotivationMessages } from '../../services/api'

export default function MotivationBanner({ className = '' }) {
  const [messages, setMessages] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    getMotivationMessages()
      .then((r) => setMessages(r.data.messages || []))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (messages.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000)
    return () => clearInterval(t)
  }, [messages])

  if (!messages.length) return null
  const msg = messages[index]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
        className={`card-glow py-3 px-4 flex items-center gap-3 ${className}`}
        style={{ borderColor: 'rgba(99,102,241,0.3)', background: 'linear-gradient(135deg, #0A1628, rgba(99,102,241,0.08))' }}
      >
        <span className="text-xl">{msg.icon}</span>
        <p className="text-sm text-gray-300 flex-1">{msg.text}</p>
        {messages.length > 1 && (
          <div className="flex gap-1">
            {messages.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === index ? '#6366F1' : '#1E3A5F' }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
