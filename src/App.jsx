import { useState, useEffect, useRef } from 'react'

// ── Logo ───────────────────────────────────────────────────────────────────
function Logo({ height = 60 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 272 76"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 'auto', display: 'block' }}
    >
      <rect fill="#6C5CE7" rx="9" height="56" width="44" y="10" x="0" />
      <rect opacity="0.9" fill="white" rx="1.5" height="3.5" width="20" y="23" x="9" />
      <rect opacity="0.6" fill="white" rx="1.5" height="3.5" width="16" y="33" x="9" />
      <rect opacity="0.35" fill="white" rx="1.5" height="3.5" width="12" y="43" x="9" />
      <polygon fill="#4834C9" points="26.882,6.765 26.882,17.765 38.882,6.765" />
      <circle fill="#FDCB6E" r="8" cy="19.235" cx="39.412" />
      <rect transform="rotate(45 32.5 25.382)" fill="#FDCB6E" rx="1" height="5" width="5" y="22.882" x="30" />
      <text fill="#FFFFFF" fontWeight="800" fontSize="40px" fontFamily="Inter, system-ui, sans-serif" y="58" x="54">Hey</text>
      <text fill="#9B8FF5" fontWeight="400" fontSize="40px" fontFamily="Inter, system-ui, sans-serif" y="58" x="132">folio</text>
      <rect fill="#FDCB6E" rx="5" height="22" width="40" y="32" x="224" />
      <text fontWeight="700" fontSize="15px" fontFamily="Inter, system-ui, sans-serif" fill="#1A1A2E" textAnchor="middle" y="48" x="244">.me</text>
    </svg>
  )
}

// ── Scroll reveal ──────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#07071a]/85 backdrop-blur-2xl border-b border-white/[0.06]' : ''
    }`}>
      <div className="max-w-6xl mx-auto flex items-center px-6 py-3">
        <Logo height={64} />
      </div>
    </nav>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────
const heroChips = [
  { dot: '#6C5CE7', label: 'PDF & DOCX supported' },
  { dot: '#FDCB6E', label: 'AI-powered by Claude' },
  { dot: '#34d399', label: 'Live in 60 seconds' },
  { dot: '#f472b6', label: 'Free to start' },
]

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-32 pb-24 text-center bg-grid overflow-hidden">
      {/* Aurora glow */}
      <div className="hero-aurora" />

      {/* Coming soon pill */}
      <div className="relative inline-flex items-center gap-2.5 border rounded-full px-5 py-2 mb-10 animate-fade-in"
        style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.28)' }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
        </span>
        <span className="text-sm font-medium text-violet-300 tracking-wide">Coming Soon</span>
      </div>

      {/* Headline */}
      <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-[90px] font-black leading-[1.03] tracking-[-0.03em] mb-7 max-w-4xl animate-fade-up">
        Resume to Portfolio,{' '}
        <span className="gradient-text">Instantly.</span>
      </h1>

      {/* Subheadline */}
      <p className="relative text-base sm:text-lg md:text-xl text-slate-400 max-w-lg mb-10 leading-relaxed animate-fade-up"
        style={{ animationDelay: '100ms' }}>
        Upload your resume. AI extracts your story. A live portfolio lands at{' '}
        <span className="text-white font-semibold">yourname.heyfolio.me</span>{' '}
        in under <span className="text-violet-300 font-semibold">60 seconds.</span>
        <br className="hidden sm:block" />
        No design skills. No code. Just your resume.
      </p>

      {/* Feature chips */}
      <div className="relative flex flex-wrap justify-center gap-2.5 animate-fade-up"
        style={{ animationDelay: '200ms' }}>
        {heroChips.map((c) => (
          <span key={c.label} className="feature-chip">
            <span className="dot" style={{ background: c.dot }} />
            {c.label}
          </span>
        ))}
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

// ── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { value: '60s',   label: 'Resume to live portfolio',   icon: '⚡' },
  { value: '73%',   label: 'Recruiters prefer portfolios', icon: '📈' },
  { value: '₹99',   label: 'Pro plan, per year',          icon: '✦' },
  { value: '0',     label: 'Lines of code needed',         icon: '🎯' },
]

function StatsSection() {
  const ref = useReveal()
  return (
    <section className="py-20 px-5">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label}
              className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 group cursor-default">
              <div className="text-2xl mb-3 opacity-70 group-hover:opacity-100 transition-opacity">{s.icon}</div>
              <div className="text-3xl font-black gradient-text-stat mb-2">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Portfolio Mockup ───────────────────────────────────────────────────────
function PortfolioMockup() {
  return (
    <div className="rounded-2xl overflow-hidden mockup-glow">
      {/* Browser chrome */}
      <div className="bg-[#0e0e24] border-b border-white/[0.07] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-white/[0.05] rounded-lg px-3 py-1.5 flex items-center gap-2 max-w-[220px] mx-auto">
          <svg className="w-3 h-3 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[11px] text-slate-500 truncate">yourname.heyfolio.me</span>
        </div>
      </div>

      {/* Portfolio content */}
      <div className="bg-gradient-to-br from-[#0d0d22] via-[#0f0f2a] to-[#111135] p-7">
        {/* Profile header */}
        <div className="flex items-start gap-4 mb-7">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 flex-shrink-0 shadow-lg" />
          <div className="flex-1 min-w-0 pt-1">
            <div className="h-4 bg-white/75 rounded w-32 mb-2.5" />
            <div className="h-2.5 bg-violet-400/45 rounded w-48 mb-2" />
            <div className="flex gap-2">
              <div className="h-2 bg-white/15 rounded w-20" />
              <div className="h-2 bg-white/10 rounded w-16" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {['React', 'TypeScript', 'Node.js', 'Python', 'AWS'].map((s) => (
            <span key={s} className="bg-violet-500/15 border border-violet-400/20 rounded-full px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
              {s}
            </span>
          ))}
        </div>

        {/* Experience */}
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.18em] mb-2.5">Experience</p>
        <div className="space-y-2 mb-5">
          {['Stripe · 2022–2025', 'Shopify · 2020–2022'].map((co) => (
            <div key={co} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.05]">
              <div className="flex justify-between mb-2">
                <div className="h-2.5 bg-white/60 rounded w-28" />
                <div className="h-2 bg-white/15 rounded w-14 mt-0.5" />
              </div>
              <div className="h-1.5 bg-white/12 rounded w-full mb-1" />
              <div className="h-1.5 bg-white/08 rounded w-4/5" />
            </div>
          ))}
        </div>

        {/* Projects */}
        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.18em] mb-2.5">Projects</p>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2].map((p) => (
            <div key={p} className="bg-white/[0.04] rounded-xl p-3 border border-white/[0.05]">
              <div className="h-2.5 bg-white/50 rounded w-20 mb-2" />
              <div className="h-1.5 bg-white/12 rounded w-full mb-1" />
              <div className="h-1.5 bg-white/08 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Preview section ────────────────────────────────────────────────────────
function Preview() {
  const ref = useReveal()
  const checkItems = [
    'Automatically structured from your resume — no forms',
    'Deployed to username.heyfolio.me in under 60 seconds',
    'Updates automatically when you re-upload your resume',
    'Custom domain support — point yourname.dev at your HeyFolio',
  ]
  return (
    <section className="py-28 px-5">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <p className="text-violet-400 font-semibold mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="block w-6 h-px bg-violet-500" />
              The output
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-[1.1]">
              A portfolio that<br />
              <span className="gradient-text">actually impresses.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-9 text-sm sm:text-base max-w-md">
              From a plain PDF to a stunning live website with your own URL.
              Share it on LinkedIn, email signature, or QR code on your business card.
            </p>
            <div className="space-y-4">
              {checkItems.map((item) => (
                <div key={item} className="flex items-start gap-3 group">
                  <span className="w-5 h-5 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-violet-500/25 group-hover:border-violet-400/50 transition-all">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full lg:max-w-[460px]">
            <PortfolioMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

// ── How it Works ───────────────────────────────────────────────────────────
const steps = [
  {
    num: '01',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/25',
    iconColor: 'text-violet-400',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Upload your resume',
    desc: "Drop your PDF or DOCX. No forms, no copy-pasting, no manual data entry of any kind.",
  },
  {
    num: '02',
    color: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-500/25',
    iconColor: 'text-amber-400',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'AI builds your profile',
    desc: 'Claude extracts your name, headline, experience, education, skills, and projects — automatically.',
  },
  {
    num: '03',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/25',
    iconColor: 'text-emerald-400',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: 'Your portfolio goes live',
    desc: 'Pick a theme and your site deploys to yourname.heyfolio.me in under 60 seconds. Share it everywhere.',
  },
]

function HowItWorks() {
  const ref = useReveal()
  return (
    <section className="py-28 px-5">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-semibold mb-4 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <span className="block w-6 h-px bg-violet-500" />
            How it works
            <span className="block w-6 h-px bg-violet-500" />
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Three steps. Sixty seconds.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+56px)] right-[calc(-50%+56px)] h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
              )}
              <div className={`glass-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 relative z-10 h-full`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} border ${step.border} flex items-center justify-center ${step.iconColor} flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <span className="text-white/10 font-black text-4xl font-mono leading-none">{step.num}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2.5">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border text-sm"
            style={{ background: 'rgba(251,191,36,0.06)', borderColor: 'rgba(251,191,36,0.2)' }}>
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span className="text-amber-300/80 font-medium">Powered by Claude AI (Anthropic)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Features ───────────────────────────────────────────────────────────────
const features = [
  {
    icon: '🔄',
    title: 'Auto-sync on re-upload',
    desc: 'Update your resume and your live portfolio updates automatically. No manual editing, ever.',
    badge: 'Free',
    badgeClass: 'bg-slate-500/15 text-slate-400 border-slate-500/20',
    iconBg: 'bg-slate-500/10',
  },
  {
    icon: '🎨',
    title: 'Beautiful themes',
    desc: 'Professionally designed themes. Looks stunning the moment it deploys.',
    badge: 'Pro',
    badgeClass: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    iconBg: 'bg-violet-500/10',
  },
  {
    icon: '📊',
    title: 'Visitor analytics',
    desc: 'See who viewed your portfolio, which sections they spent time on, and how they found you.',
    badge: 'Pro',
    badgeClass: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    iconBg: 'bg-violet-500/10',
  },
  {
    icon: '🤖',
    title: 'AI content polish',
    desc: 'A second AI pass rewrites your bullet points to be more impactful and ATS-friendly.',
    badge: 'Pro+',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: '🌐',
    title: 'Custom domain',
    desc: 'Point yourname.dev at your HeyFolio portfolio via a simple CNAME. SSL auto-issued.',
    badge: 'Pro+',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10',
  },
  {
    icon: '📱',
    title: 'QR code & PDF export',
    desc: 'Download a QR code for your business card. Export a designer-quality PDF too.',
    badge: 'Pro',
    badgeClass: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    iconBg: 'bg-violet-500/10',
  },
]

function Features() {
  const ref = useReveal()
  return (
    <section className="py-28 px-5 relative">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(109,40,217,0.07) 0%, transparent 65%)' }} />
      <div ref={ref} className="reveal max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-semibold mb-4 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <span className="block w-6 h-px bg-violet-500" />
            Features
            <span className="block w-6 h-px bg-violet-500" />
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Everything you need<br />to stand out.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center text-2xl`}>
                  {f.icon}
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${f.badgeClass}`}>
                  {f.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-violet-200 transition-colors">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pricing ────────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    border: 'border-white/[0.08]',
    highlight: false,
    features: [
      'username.heyfolio.me subdomain',
      '1 portfolio theme',
      'Basic portfolio sections',
      'Auto-sync on re-upload',
      'Community support',
    ],
    checkColor: 'text-slate-500',
  },
  {
    name: 'Pro',
    price: '₹99',
    period: '/year',
    badge: 'Most Popular',
    border: 'border-violet-500/50',
    highlight: true,
    features: [
      'Custom subdomain choice',
      '5 premium themes',
      'No HeyFolio branding',
      'Visitor analytics',
      'QR code download',
      'PDF export',
      'ATS readability score',
    ],
    checkColor: 'text-violet-400',
  },
  {
    name: 'Pro+',
    price: '₹299',
    period: '/year',
    border: 'border-emerald-500/30',
    highlight: false,
    features: [
      'Custom domain (CNAME)',
      'All themes + section editor',
      'AI content polish',
      'OG image auto-generation',
      'Priority support',
    ],
    checkColor: 'text-emerald-400',
  },
]

function Pricing() {
  const ref = useReveal()
  return (
    <section className="py-28 px-5">
      <div ref={ref} className="reveal max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 font-semibold mb-4 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <span className="block w-6 h-px bg-violet-500" />
            Pricing
            <span className="block w-6 h-px bg-violet-500" />
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Simple, honest pricing.</h2>
          <p className="text-slate-500 mt-4 text-sm">Start free. Billed annually.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-start mt-6">
          {plans.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-2xl border ${plan.border} p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                plan.highlight ? 'pricing-highlight bg-gradient-to-b from-violet-950/40 to-violet-950/10 -mt-6 pb-14' : 'glass-card'
              }`}>
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="bg-gradient-to-r from-violet-600 to-purple-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg shadow-violet-900/40">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xs font-bold text-slate-500 mb-5 uppercase tracking-[0.15em]">{plan.name}</h3>
                <div className="flex items-end gap-1.5">
                  <span className="text-5xl font-black text-white leading-none">{plan.price}</span>
                  <span className="text-slate-500 text-sm mb-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className={`w-4 h-4 ${plan.checkColor} flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-white/[0.05]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Logo height={52} />
        <div className="flex items-center gap-8">
          <a href="mailto:hello@heyfolio.me"
            className="text-xs text-slate-600 hover:text-slate-300 transition-colors">
            Contact
          </a>
          <p className="text-xs text-slate-700">© 2026 HeyFolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#07071a] min-h-screen text-white font-sans overflow-x-hidden noise">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute rounded-full animate-blob"
          style={{ width: '800px', height: '800px', top: '-20%', left: '-15%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 65%)',
            filter: 'blur(70px)' }} />
        <div className="absolute rounded-full animate-blob-delay"
          style={{ width: '600px', height: '600px', top: '30%', right: '-15%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 65%)',
            filter: 'blur(70px)' }} />
        <div className="absolute rounded-full animate-blob-slow"
          style={{ width: '500px', height: '500px', bottom: '5%', left: '15%',
            background: 'radial-gradient(circle, rgba(76,29,149,0.12) 0%, transparent 65%)',
            filter: 'blur(70px)' }} />
      </div>

      <Nav />
      <Hero />

      <div className="section-divider" />
      <StatsSection />
      <div className="section-divider" />

      <Preview />
      <div className="section-divider" />

      <HowItWorks />
      <div className="section-divider" />

      <Features />
      <div className="section-divider" />

      <Pricing />

      <Footer />
    </div>
  )
}
