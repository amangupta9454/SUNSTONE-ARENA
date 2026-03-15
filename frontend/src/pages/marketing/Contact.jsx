import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiMapPin, FiClock, FiGithub, FiLinkedin, FiTwitter, FiChevronDown, FiCheck } from 'react-icons/fi'
import GradientText from '../../components/ui/GradientText'
import Badge from '../../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

const faqs = [
  { q: 'Is EduPath AI free to use?', a: 'Yes! Our core features are completely free. We offer a Pro plan for advanced analytics and unlimited AI tutor usage.' },
  { q: 'Do I need an account to try it?', a: 'You need a free account to save your progress. Registration takes under 2 minutes — just an email and password.' },
  { q: 'Is my learning data private?', a: 'Absolutely. We use encryption at rest and in transit. We never sell or share your personal learning data with third parties.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <div className="mt-8 space-y-3">
      <h3 className="font-jakarta font-semibold text-white text-lg mb-4">Quick FAQ</h3>
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition">
            <span className="text-slate-200 text-sm font-medium">{faq.q}</span>
            <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-slate-400 shrink-0 ml-3">
              <FiChevronDown size={16} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <p className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', role: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 2000)
  }

  const inputClass = (field) =>
    `w-full bg-[#0F1F3D] border ${errors[field] ? 'border-red-500/50' : 'border-white/10'} text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-600`

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-5">
          <FiCheck className="text-emerald-400" size={28} />
        </div>
        <h3 className="font-jakarta font-bold text-white text-2xl mb-2">Message sent!</h3>
        <p className="text-slate-400">We'll reply within 24 hours. Check your inbox at <span className="text-blue-400">{form.email}</span></p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-slate-400 text-sm font-medium mb-2">Name *</label>
          <input className={inputClass('name')} placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-slate-400 text-sm font-medium mb-2">Email *</label>
          <input type="email" className={inputClass('email')} placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="block text-slate-400 text-sm font-medium mb-2">I am a...</label>
        <select className={inputClass('role')} value={form.role} onChange={e => set('role', e.target.value)}>
          <option value="" className="bg-[#0F1F3D]">Select your role</option>
          <option value="student" className="bg-[#0F1F3D]">Student</option>
          <option value="teacher" className="bg-[#0F1F3D]">Teacher / Professor</option>
          <option value="admin" className="bg-[#0F1F3D]">Institution Admin</option>
          <option value="other" className="bg-[#0F1F3D]">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-slate-400 text-sm font-medium mb-2">Subject *</label>
        <input className={inputClass('subject')} placeholder="What's this about?" value={form.subject} onChange={e => set('subject', e.target.value)} />
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
      </div>
      <div>
        <label className="block text-slate-400 text-sm font-medium mb-2">Message *</label>
        <textarea className={`${inputClass('message')} resize-none`} rows={4} placeholder="Tell us more..." value={form.message} onChange={e => set('message', e.target.value)} />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2">
        {loading ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>) : 'Send Message →'}
      </button>
    </form>
  )
}

export default function Contact() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-[#050B18] dot-grid relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }} className="max-w-2xl mx-auto text-center relative z-10">
          <Badge color="cyan">Get In Touch</Badge>
          <h1 className="font-jakarta font-extrabold text-5xl sm:text-6xl text-white mt-5 mb-5 leading-tight">
            We'd love to<br /><GradientText>hear from you.</GradientText>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">Whether you're a student, educator, or institution — reach out and we'll respond within 24 hours.</p>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-[#050B18]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="space-y-4 mb-8">
              {[
                { icon: <FiMail className="text-blue-400" size={20} />, label: 'Email Us', value: 'hello@edupath.ai' },
                { icon: <FiMapPin className="text-violet-400" size={20} />, label: 'Based In', value: 'India — Built for the World' },
                { icon: <FiClock className="text-cyan-400" size={20} />, label: 'Response Time', value: 'Within 24 hours' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 bg-[#0A1628] border border-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0F1F3D] flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-slate-500 text-xs font-medium mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mb-2">
              {[{ icon: <FiGithub size={18} />, label: 'GitHub' }, { icon: <FiLinkedin size={18} />, label: 'LinkedIn' }, { icon: <FiTwitter size={18} />, label: 'Twitter' }].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200">{s.icon}</a>
              ))}
            </div>
            <FAQ />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-8">
              <h2 className="font-jakarta font-bold text-white text-2xl mb-6">Send us a message</h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
