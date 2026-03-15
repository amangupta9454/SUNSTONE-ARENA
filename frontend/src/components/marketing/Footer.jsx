import { Link } from "react-router-dom";
import { FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function BrainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
      <defs>
        <linearGradient id="footerBrainGrad" x1="0" y1="0" x2="28" y2="28">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <circle cx="14" cy="14" r="13" fill="url(#footerBrainGrad)" opacity="0.15" />
      <path d="M9 10c0-2.2 1.8-4 4-4 1.1 0 2.1.4 2.8 1.1" stroke="url(#footerBrainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M19 10c0-2.2-1.8-4-4-4" stroke="url(#footerBrainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2h14c1.1 0 2 .9 2 2s-.9 2-2 2" stroke="url(#footerBrainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 14v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-4" stroke="url(#footerBrainGrad)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill="url(#footerBrainGrad)" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { name: "Features", path: "/features" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Pricing", path: "/pricing" },
    { name: "Changelog", path: "/changelog" },
  ],
  Company: [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ],
  Legal: [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Cookie Policy", path: "/cookies" },
  ],
};

export default function MarketingFooter() {
  return (
    <footer className="bg-[#030810] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BrainIcon />
              <span className="font-jakarta font-extrabold text-lg bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                EduPath AI
              </span>
            </Link>

            <p className="text-slate-400 text-sm mb-2">
              The AI that builds your perfect learning path.
            </p>

            <p className="text-slate-500 text-sm mb-6">
              EduPath AI uses advanced knowledge tracing and AI recommendations
              to personalize education for every learner.
            </p>

            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/amangupta9454/" target="_blank" rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition">
                <FiLinkedin size={18} />
              </a>

              <a href="https://wa.me/919560472926" target="_blank" rel="noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition">
                <FaWhatsapp size={18} />
              </a>

              <a href="mailto:ag0567688@gmail.com"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition">
                <FiMail size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-jakarta font-semibold text-white text-sm mb-4">
                {heading}
              </h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-500 text-sm hover:text-slate-300 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-xs">
            © 2026 EduPath AI. Built with ❤️ at Sunstone Arena Hackathon.
          </p>

          <p className="text-slate-600 text-xs">
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}