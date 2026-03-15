import { motion } from 'framer-motion'
import { FiLinkedin } from 'react-icons/fi'
import GradientText from '../../components/ui/GradientText'
import Badge from '../../components/ui/Badge'
import GlowCard from '../../components/ui/GlowCard'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const values = [
  { icon: '🎓', title: 'Student First', desc: 'Every feature is designed around learner outcomes, not engagement metrics. We measure success by how much you actually learn.' },
  { icon: '🔍', title: 'Transparent AI', desc: "You can always see WHY something was recommended. No black boxes. No mysterious algorithms. Just clear, explainable decisions." },
  { icon: '🔒', title: 'Privacy by Design', desc: 'We never sell your data. Your learning profile is yours alone — encrypted, protected, and deletable at any time.' },
]

const team = [
  { name: 'Aman Gupta', role: 'Full Stack Developer', initials: 'AG', color: 'from-blue-500 to-cyan-400', tags: ['React', 'Node.js'] },
  { name: 'Priya Sharma', role: 'ML Engineer', initials: 'PS', color: 'from-violet-500 to-pink-400', tags: ['Python', 'BKT'] },
  { name: 'Rohan Verma', role: 'Backend Engineer', initials: 'RV', color: 'from-emerald-500 to-teal-400', tags: ['FastAPI', 'MongoDB'] },
  { name: 'Anjali Singh', role: 'UI/UX Designer', initials: 'AS', color: 'from-amber-500 to-orange-400', tags: ['Figma', 'Tailwind'] },
]

const techStack = [
  { name: 'Google Gemini', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  { name: 'React', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
  { name: 'Node.js', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { name: 'Python', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' },
  { name: 'FastAPI', color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
  { name: 'MongoDB', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
]

export default function About() {
  return (
    <>
      <section className="pt-32 pb-20 px-4 bg-[#050B18] dot-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center relative z-10">
          <Badge color="violet">Our Story</Badge>
          <h1 className="font-jakarta font-extrabold text-5xl sm:text-6xl text-white mt-5 mb-5 leading-tight">
            Built by students,<br /><GradientText>for students.</GradientText>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">We started EduPath AI because we experienced the broken one-size-fits-all education system ourselves.</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-jakarta font-extrabold text-3xl sm:text-4xl leading-tight">
              <GradientText>"Education shouldn't adapt to the system. The system should adapt to you."</GradientText>
            </p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="text-slate-400 leading-relaxed text-lg">Most learning platforms deliver the same content to every student at the same pace. EduPath AI does the opposite — it starts with you.</p>
            <p className="text-slate-500 leading-relaxed mt-4">We use Bayesian Knowledge Tracing — the same algorithm used by Carnegie Mellon's cognitive tutors — to model exactly what you know.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#050B18]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <Badge color="cyan">Our Values</Badge>
            <h2 className="font-jakarta font-extrabold text-4xl text-white mt-4">What we stand for</h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} transition={{ duration: 0.5 }}>
                <GlowCard>
                  <div className="text-3xl mb-4">{v.icon}</div>
                  <h3 className="font-jakarta font-bold text-white text-xl mb-3">{v.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <Badge color="blue">The Team</Badge>
            <h2 className="font-jakarta font-extrabold text-4xl text-white mt-4 mb-3">The team behind EduPath AI</h2>
            <p className="text-slate-400">A hackathon team that believes in AI-powered education.</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <motion.div key={member.name} variants={fadeUp} transition={{ duration: 0.5 }} whileHover={{ y: -6 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center font-jakarta font-extrabold text-white text-lg mb-4`}>{member.initials}</div>
                <h3 className="font-jakarta font-bold text-white text-lg">{member.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{member.role}</p>
                <div className="flex flex-wrap gap-2 mb-4">{member.tags.map((tag) => (<span key={tag} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md font-mono">{tag}</span>))}</div>
                <a href="#" aria-label="LinkedIn" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-400 transition text-sm"><FiLinkedin size={14} /> LinkedIn</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#050B18]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Badge color="violet">Technology</Badge>
            <h2 className="font-jakarta font-extrabold text-4xl text-white mt-4 mb-10">Powered by the best tools in AI</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((t) => (<span key={t.name} className={`px-5 py-2.5 rounded-xl border font-mono font-semibold text-sm ${t.color}`}>{t.name}</span>))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#0A1628]">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative bg-gradient-to-br from-[#0F1F3D] to-[#0A1628] border border-blue-500/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)] text-center">
            <div className="relative z-10">
              <span className="text-3xl mb-4 block">🏆</span>
              <h3 className="font-jakarta font-extrabold text-2xl text-white mb-3">Built at Sunstone Arena Hackathon 2026</h3>
              <p className="text-slate-400 leading-relaxed">This project was created as part of the Sunstone Research Radiance competition. We built the full stack — from BKT algorithms to a streaming AI tutor — in a single hackathon sprint.</p>
              <div className="mt-6 inline-flex items-center gap-2 text-blue-300 text-sm font-mono border border-blue-500/30 bg-blue-500/10 px-4 py-2 rounded-full">
                🎓 Sunstone Research Radiance · 2026
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
