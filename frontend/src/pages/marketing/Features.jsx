import { motion } from 'framer-motion'
import { FiCheck, FiArrowRight } from 'react-icons/fi'
import GradientText from '../../components/ui/GradientText'
import Badge from '../../components/ui/Badge'
import { Link } from 'react-router-dom'

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }
const fadeLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }
const fadeRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }

function FeatureBlock({ badge, badgeColor, headline, body, bullets, visual, reverse = false }) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center py-20 border-b border-white/5`}>
      <motion.div variants={reverse ? fadeRight : fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }} className={reverse ? 'md:order-2' : ''}>
        <Badge color={badgeColor}>{badge}</Badge>
        <h2 className="font-jakarta font-extrabold text-3xl sm:text-4xl text-white mt-4 mb-5 leading-tight">{headline}</h2>
        <p className="text-slate-400 leading-relaxed mb-6">{body}</p>
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-slate-300 text-sm">
              <FiCheck className="text-emerald-400 mt-0.5 shrink-0" size={16} />{b}
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div variants={reverse ? fadeLeft : fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }} className={reverse ? 'md:order-1' : ''}>
        {visual}
      </motion.div>
    </div>
  )
}

function MasteryVisual() {
  return (
    <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6">
      <p className="text-xs text-slate-500 font-mono mb-4">SKILL MASTERY MODEL</p>
      {[
        { skill: 'Linear Algebra', pct: 78, color: 'from-blue-500 to-cyan-400' },
        { skill: 'Calculus', pct: 55, color: 'from-violet-500 to-blue-400' },
        { skill: 'Probability', pct: 34, color: 'from-amber-500 to-orange-400' },
        { skill: 'Statistics', pct: 91, color: 'from-emerald-500 to-teal-400' },
      ].map((item) => (
        <div key={item.skill} className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-slate-300">{item.skill}</span>
            <span className="text-slate-400 font-mono text-xs">{item.pct}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${item.pct}%` }} />
          </div>
        </div>
      ))}
      <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-xs text-blue-300 font-mono">
        BKT confidence: 0.847 · Last updated: just now
      </div>
    </div>
  )
}

function GraphVisual() {
  const nodes = [
    { id: 'A', label: 'Algebra', x: 50, y: 20, color: '#10B981' },
    { id: 'B', label: 'Calculus', x: 20, y: 55, color: '#3B82F6' },
    { id: 'C', label: 'Linear Alg', x: 80, y: 55, color: '#F59E0B' },
    { id: 'D', label: 'ML Basics', x: 35, y: 85, color: '#EF4444' },
    { id: 'E', label: 'Deep Learning', x: 65, y: 85, color: '#6B7280' },
  ]
  const edges = [['A','B'],['A','C'],['B','D'],['C','D'],['C','E'],['D','E']]
  return (
    <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6">
      <p className="text-xs text-slate-500 font-mono mb-4">KNOWLEDGE GRAPH</p>
      <div className="relative" style={{ height: 220 }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map(([a, b]) => {
            const na = nodes.find(n => n.id === a), nb = nodes.find(n => n.id === b)
            return <line key={`${a}-${b}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#1E3A5F" strokeWidth="0.8" />
          })}
        </svg>
        {nodes.map((n) => (
          <div key={n.id} className="absolute flex flex-col items-center" style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)' }}>
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: n.color + '22', borderColor: n.color }}>{n.id}</div>
            <span className="text-[9px] text-slate-400 mt-1 whitespace-nowrap">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TutorVisual() {
  return (
    <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6 space-y-4">
      <p className="text-xs text-slate-500 font-mono mb-2">AI TUTOR CHAT</p>
      <div className="flex justify-end">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-xs">
          <p className="text-sm text-blue-100">What is backpropagation and why does it work?</p>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0">AI</div>
        <div className="bg-[#0F1F3D] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
          <p className="text-sm text-slate-300 leading-relaxed">Backpropagation is the algorithm that trains neural networks by computing gradients. Think of it like tracing blame backwards — if the output was wrong, which weights caused it?</p>
        </div>
      </div>
    </div>
  )
}

function PathVisual() {
  const nodes = [
    { label: 'Python', status: 'done' }, { label: 'NumPy', status: 'done' },
    { label: 'Pandas', status: 'active' }, { label: 'Sklearn', status: 'upcoming' }, { label: 'Neural Nets', status: 'upcoming' },
  ]
  return (
    <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6">
      <p className="text-xs text-slate-500 font-mono mb-6">YOUR LEARNING PATH</p>
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold ${n.status === 'done' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : n.status === 'active' ? 'bg-blue-500/20 border-blue-400 text-blue-300 animate-pulse' : 'bg-white/5 border-white/10 text-slate-600'}`}>
                {n.status === 'done' ? '✓' : i + 1}
              </div>
              <span className={`text-xs whitespace-nowrap ${n.status === 'done' ? 'text-emerald-400' : n.status === 'active' ? 'text-blue-300' : 'text-slate-600'}`}>{n.label}</span>
            </div>
            {i < nodes.length - 1 && <div className={`w-8 h-0.5 mb-5 ${n.status === 'done' ? 'bg-emerald-500/50' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function AnalyticsVisual() {
  const students = [
    { name: 'Arjun S.', python: 92, ml: 78, stats: 65 },
    { name: 'Meera P.', python: 45, ml: 30, stats: 88 },
    { name: 'Rohan K.', python: 71, ml: 55, stats: 42 },
  ]
  const getColor = (v) => v >= 75 ? 'bg-emerald-500/20 text-emerald-400' : v >= 50 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
  return (
    <div className="bg-[#0A1628] border border-white/10 rounded-2xl p-6 overflow-x-auto">
      <p className="text-xs text-slate-500 font-mono mb-4">CLASS ANALYTICS</p>
      <table className="w-full text-sm">
        <thead><tr className="text-slate-500 text-xs"><th className="text-left pb-3 font-medium">Student</th><th className="text-center pb-3 font-medium">Python</th><th className="text-center pb-3 font-medium">ML</th><th className="text-center pb-3 font-medium">Stats</th></tr></thead>
        <tbody>{students.map((s) => (<tr key={s.name} className="border-t border-white/5"><td className="py-2.5 text-slate-300 font-medium">{s.name}</td>{[s.python, s.ml, s.stats].map((v, i) => (<td key={i} className="py-2.5 text-center"><span className={`px-2 py-0.5 rounded-md text-xs font-mono font-semibold ${getColor(v)}`}>{v}%</span></td>))}</tr>))}</tbody>
      </table>
    </div>
  )
}

const featureBlocks = [
  { badge: 'AI Powered', badgeColor: 'blue', headline: 'The AI that knows what you know', body: 'Our Bayesian Knowledge Tracing algorithm analyzes every answer you give and builds a precise probability model of your understanding.', bullets: ['Real-time mastery probability per skill', 'Detects lucky guesses and knowledge slippage', 'Updates after every single interaction'], visual: <MasteryVisual />, reverse: false },
  { badge: 'Visualization', badgeColor: 'cyan', headline: 'See your brain as a map', body: "Every skill you're learning is connected. EduPath builds a directed Knowledge Graph — you can see exactly which skills unlock which.", bullets: ['Visual prerequisite mapping', 'Click any node to start learning', 'Color-coded by mastery level'], visual: <GraphVisual />, reverse: true },
  { badge: 'AI Tutor', badgeColor: 'violet', headline: 'Your personal expert, always available', body: 'Ask anything. The EduPath AI Tutor knows your current mastery level and adjusts its explanations accordingly.', bullets: ['Adapts explanation depth to your level', 'Streams responses in real-time', 'Ends every answer with a check-in question'], visual: <TutorVisual />, reverse: false },
  { badge: 'Personalization', badgeColor: 'amber', headline: 'A path that evolves with you', body: 'Your learning path is never static. After every quiz, video, or exercise — the recommendation engine re-runs and finds the single best next step for YOU.', bullets: ['Career-goal alignment built in', 'Adjusts difficulty dynamically', 'Considers your pace and time available'], visual: <PathVisual />, reverse: true },
  { badge: 'For Educators', badgeColor: 'green', headline: "Class insights you've never had before", body: 'See mastery heatmaps for your entire class. Know which concepts are being struggled with most — before the exam, not after.', bullets: ['Per-student and per-class views', 'Skill mastery heatmap', 'Export-ready reports'], visual: <AnalyticsVisual />, reverse: false },
]

function PlansSection() {
  return (
    <section className="py-24 px-4 bg-[#0A1628]">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <Badge color="blue">Pricing</Badge>
          <h2 className="font-jakarta font-extrabold text-4xl text-white mt-4 mb-3">Simple, transparent plans</h2>
          <p className="text-slate-400">Start free. Upgrade when you're ready.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-[#050B18] border border-white/10 rounded-2xl p-8">
            <h3 className="font-jakarta font-bold text-white text-xl mb-1">Free</h3>
            <p className="text-slate-400 text-sm mb-6">Everything you need to get started</p>
            <div className="text-4xl font-jakarta font-extrabold text-white mb-6">$0<span className="text-lg text-slate-400 font-normal">/mo</span></div>
            <ul className="space-y-3 mb-8">{['Unlimited diagnostic tests', '3 learning paths', 'AI tutor (20 queries/day)', 'Knowledge graph visualization', 'Basic analytics'].map(f => (<li key={f} className="flex items-center gap-2 text-slate-300 text-sm"><FiCheck className="text-emerald-400 shrink-0" /> {f}</li>))}</ul>
            <Link to="/register" className="block w-full py-3 text-center border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition">Get Started Free</Link>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative bg-gradient-to-b from-[#0F1F3D] to-[#0A1628] border border-blue-500/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="bg-gradient-to-r from-blue-500 to-violet-600 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span></div>
            <h3 className="font-jakarta font-bold text-white text-xl mb-1">Pro</h3>
            <p className="text-slate-400 text-sm mb-6">For serious learners and educators</p>
            <div className="text-4xl font-jakarta font-extrabold text-white mb-1">$19<span className="text-lg text-slate-400 font-normal">/mo</span></div>
            <p className="text-xs text-amber-400 font-mono mb-6">Coming Soon</p>
            <ul className="space-y-3 mb-8">{['Everything in Free', 'Unlimited learning paths', 'Unlimited AI tutor', 'Teacher dashboard', 'Advanced analytics & exports', 'Priority support'].map(f => (<li key={f} className="flex items-center gap-2 text-slate-300 text-sm"><FiCheck className="text-blue-400 shrink-0" /> {f}</li>))}</ul>
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl font-semibold opacity-60 cursor-not-allowed">Coming Soon</button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Features() {
  return (
    <>
      <section className="pt-32 pb-16 px-4 bg-[#050B18] dot-grid relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center relative z-10">
          <Badge color="blue">What's inside EduPath AI</Badge>
          <h1 className="font-jakarta font-extrabold text-5xl sm:text-6xl text-white mt-5 mb-5 leading-tight">
            Features built for how<br /><GradientText>humans actually learn</GradientText>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">Every feature exists for one reason: to help you master skills faster, retain them longer, and apply them confidently.</p>
        </motion.div>
      </section>
      <section className="px-4 bg-[#050B18]">
        <div className="max-w-6xl mx-auto">
          {featureBlocks.map((f) => <FeatureBlock key={f.headline} {...f} />)}
        </div>
      </section>
      <PlansSection />
    </>
  )
}
