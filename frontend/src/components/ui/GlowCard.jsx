import { motion } from 'framer-motion'

export default function GlowCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 40px rgba(59,130,246,0.2)',
        borderColor: 'rgba(59,130,246,0.5)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-[#0A1628] border border-white/10 rounded-2xl p-6 transition-colors duration-300 animated-border ${className}`}
    >
      {children}
    </motion.div>
  )
}
