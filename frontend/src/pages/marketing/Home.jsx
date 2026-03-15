import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiPlay, FiArrowRight, FiCheck } from 'react-icons/fi'
import GlowCard from '../../components/ui/GlowCard'
import AnimatedCounter from '../../components/ui/AnimatedCounter'
import GradientText from '../../components/ui/GradientText'
import Badge from '../../components/ui/Badge'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
const stagger = { visible: { transition: { staggerChildren: 0.12 } } }

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden dot-grid pt-20 pb-16 px-4">
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-sm mb-8">
          🎓 Now with Gemini AI • Personalized for every student
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-6">
          <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }}
            className="font-jakarta font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
            Learn Smarter,
          </motion.h1>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }}
            className="font-jakarta font-extrabold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-tight">
            <GradientText>Not Harder.</GradientText>
          </motion.h1>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }}
            className="font-jakarta font-extrabold text-5xl sm:text-6xl lg:text-7xl text-slate-300 tracking-tight leading-tight">
            AI Builds Your Path.
          </motion.h1>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          EduPath AI diagnoses your knowledge gaps, maps your skills to a dynamic graph, and delivers the right content at exactly the right moment.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link to="/register"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl text-base hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300">
            Start Learning Free <FiArrowRight />
          </Link>
          <button className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl text-base hover:bg-white/5 hover:border-white/40 transition-all duration-300">
            <FiPlay size={16} /> Watch Demo
          </button>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.6, delay: 0.65 }}
          className="text-slate-500 text-sm flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1"><FiCheck className="text-emerald-400" /> No credit card required</span>
          <span className="flex items-center gap-1"><FiCheck className="text-emerald-400" /> Free forever plan</span>
          <span className="flex items-center gap-1"><FiCheck className="text-emerald-400" /> 2-minute setup</span>
        </motion.p>
      </div>

      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 mt-16 w-full max-w-2xl mx-auto px-4">
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-[#0A1628] border border-white/10 rounded-2xl p-6 shadow-[0_0_60px_rgba(59,130,246,0.1)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-slate-500 font-mono mb-0.5">STUDENT DASHBOARD</p>
              <h3 className="font-jakarta font-bold text-white text-lg">Your Learning Path</h3>
            </div>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-full font-mono">● Live</span>
          </div>
          {[
            { skill: 'Python Programming', pct: 87, color: 'from-blue-500 to-cyan-400' },
            { skill: 'Machine Learning', pct: 62, color: 'from-violet-500 to-blue-400' },
            { skill: 'Statistics & Probability', pct: 45, color: 'from-amber-500 to-orange-400' },
          ].map((item) => (
            <div key={item.skill} className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-300 font-medium">{item.skill}</span>
                <span className="text-slate-400 font-mono text-xs">{item.pct}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${item.pct}%` }} transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`} />
              </div>
            </div>
          ))}
          <div className="mt-5 flex items-center justify-between bg-[#0F1F3D] rounded-xl px-4 py-3 border border-white/5">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Next Recommended</p>
              <p className="text-sm font-semibold text-white">Neural Networks</p>
            </div>
            <Link to="/register" className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition">
              Start <FiArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Stats() {
  const stats = [
    { target: 50000, suffix: '+', label: 'Learners Active' },
    { target: 94, suffix: '%', label: 'Avg Score Improvement' },
    { target: 3, suffix: 'x', label: 'Faster Skill Mastery' },
    { target: 8, suffix: '', label: 'Subjects Available' },
  ]
  return (
    <section className="bg-[#0A1628] border-y border-white/5 py-14 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
            <div className="font-jakarta font-extrabold text-4xl sm:text-5xl bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              <AnimatedCounter target={s.target} suffix={s.suffix} duration={2000} />
            </div>
            <p className="text-slate-400 text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const steps = [
  { n: '01', title: 'Diagnose', desc: 'Take a 10-minute adaptive test. We map your exact knowledge gaps across every skill in your subject.' },
  { n: '02', title: 'Profile', desc: 'AI builds your skill graph — every strength and weakness, visualized as an interactive knowledge map.' },
  { n: '03', title: 'Recommend', desc: 'Get your first learning path in seconds, personalized to your career goal and current mastery level.' },
  { n: '04', title: 'Adapt', desc: 'As you learn, your path evolves. The AI never stops optimizing — every quiz updates your model.' },
]

function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-[#050B18]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:sticky md:top-28">
          <Badge color="cyan">How It Works</Badge>
          <h2 className="font-jakarta font-extrabold text-4xl sm:text-5xl text-white mt-4 mb-6 leading-tight">
            From zero to mastery<br />in <GradientText>4 steps</GradientText>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Our AI doesn't just recommend content — it understands exactly where you are and builds the most efficient path forward.
          </p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-0">
          {steps.map((step, i) => (
            <motion.div key={step.n} variants={fadeUp} transition={{ duration: 0.5 }} className="flex gap-5 relative">
              {i < steps.length - 1 && <div className="absolute left-5 top-12 bottom-0 w-px border-l-2 border-dashed border-white/10" />}
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center font-mono font-bold text-white text-sm z-10">
                {step.n}
              </div>
              <div className="pb-10">
                <h3 className="font-jakarta font-bold text-white text-xl mb-2">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const features = [
  { icon: '🧠', title: 'AI Knowledge Tracing', desc: 'Knows exactly what you know and what you need next — updated after every answer.' },
  { icon: '🗺️', title: 'Dynamic Learning Paths', desc: 'Your path updates in real time based on your performance and career goals.' },
  { icon: '💬', title: 'AI Tutor', desc: 'Ask anything, get expert answers instantly — adapts depth to your mastery level.' },
  { icon: '🕸️', title: 'Skill Knowledge Graph', desc: 'See your mastery visually as an interactive graph of connected skills.' },
  { icon: '📊', title: 'Teacher Analytics', desc: "Track every student's progress with mastery heatmaps and class-wide insights." },
  { icon: '🔒', title: 'Privacy First', desc: 'Your data is encrypted and owned by you. We never sell or share your learning profile.' },
]

function FeaturesPreview() {
  return (
    <section className="py-24 px-4 bg-[#0A1628]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <Badge color="violet">Features</Badge>
          <h2 className="font-jakarta font-extrabold text-4xl sm:text-5xl text-white mt-4 mb-4">Everything your learning needs</h2>
          <p className="text-slate-400 text-lg">Built by engineers who care about education.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} transition={{ duration: 0.5 }}>
              <GlowCard>
                <div className="w-10 h-10 rounded-xl bg-[#0F1F3D] flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="font-jakarta font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-10">
          <Link to="/features" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            View all features <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const testimonials = [
  { name: 'Rahul M.', role: 'Data Science Student', initials: 'RM', color: 'from-blue-500 to-cyan-400', quote: 'I went from struggling with linear algebra to landing my ML internship in 3 months. EduPath knew exactly what I needed to learn next.' },
  { name: 'Priya K.', role: 'Web Developer', initials: 'PK', color: 'from-violet-500 to-pink-400', quote: 'The AI tutor feels like having a personal mentor available at 2am. It explains concepts in plain language and checks if I understood.' },
  { name: 'Dr. Anjali S.', role: 'Professor', initials: 'AS', color: 'from-emerald-500 to-teal-400', quote: 'As a teacher, the analytics dashboard lets me see which topics the entire class is struggling with — before the exam.' },
]

function Testimonials() {
  return (
    <section className="py-24 px-4 bg-[#050B18] relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <Badge color="green">Testimonials</Badge>
          <h2 className="font-jakarta font-extrabold text-4xl sm:text-5xl text-white mt-4">Students love EduPath AI</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp} transition={{ duration: 0.5 }}>
              <div className="h-full backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-jakarta font-bold text-white text-sm`}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="py-28 px-4 bg-gradient-to-b from-[#0F1F3D] to-[#050B18] border-t border-blue-500/30">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
        <h2 className="font-jakarta font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
          Ready to learn the way<br /><GradientText>you were meant to?</GradientText>
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">Join thousands of students who stopped studying harder and started studying smarter.</p>
        <Link to="/register" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300">
          Create Your Free Account <FiArrowRight />
        </Link>
        <p className="text-slate-600 text-sm mt-5">No credit card. No commitment. Cancel anytime.</p>
      </motion.div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <FeaturesPreview />
      <Testimonials />
      <FinalCTA />
    </>
  )
}
