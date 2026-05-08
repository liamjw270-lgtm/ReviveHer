import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const problems = [
  { emoji: '😴', text: 'You\'re exhausted by midday despite sleeping through the night' },
  { emoji: '🧠', text: 'Brain fog makes it hard to focus, remember things or feel sharp' },
  { emoji: '😰', text: 'Anxiety or low mood that feels out of nowhere and out of character' },
  { emoji: '🌡️', text: 'Hot flushes and night sweats are disrupting your sleep and your day' },
  { emoji: '😟', text: 'Your mood shifts in ways that feel completely out of your control' },
  { emoji: '💤', text: 'You wake at 3am with a racing mind and can\'t get back to sleep' },
]

const comparisons = [
  {
    without: 'Guessing what\'s causing your symptoms',
    with: 'Understanding exactly what\'s happening in your body and why',
  },
  {
    without: 'Generic wellness advice not designed for this stage',
    with: 'Gentle guidance built specifically around peri-menopausal bodies',
  },
  {
    without: 'Waking at 3am unsure how to calm your nervous system',
    with: 'Simple, evidence-backed sleep and stress protocols that work',
  },
  {
    without: 'Feeling like something is wrong with you',
    with: 'Understanding that your symptoms are real, common and addressable',
  },
  {
    without: 'Expensive appointments and contradictory advice',
    with: 'Clear, honest guidance in one calm, affordable guide',
  },
]

const differentiators = [
  {
    icon: '📚',
    title: 'Written specifically for peri-menopause',
    desc: 'Most health resources are written for pre-menopausal or post-menopausal women. The Peri-Menopause Reset addresses the distinct hormonal environment of peri-menopause — fluctuating oestrogen, rising cortisol, disrupted sleep — with targeted, practical guidance.',
  },
  {
    icon: '🧠',
    title: 'Nervous system first',
    desc: 'This guide puts nervous system support at the centre — because when your cortisol is chronically elevated, nothing else works properly. Sleep, mood, energy and digestion all depend on it. We address the root, not just the symptoms.',
  },
  {
    icon: '🌿',
    title: 'No extremes. No restrictions.',
    desc: 'The Peri-Menopause Reset is not a diet, a detox or a strict programme. It\'s a gentle lifestyle guide built around what your body actually needs right now — simple habits, sustainable nutrition, and calm daily routines.',
  },
  {
    icon: '🤝',
    title: 'No shame. No blame.',
    desc: 'This guide meets you exactly where you are. Whether you\'ve been struggling for months or just started noticing changes — the Reset works from your starting point, at your own pace.',
  },
]

const objections = [
  {
    q: '"I\'ve tried everything. Nothing works."',
    a: 'Most programmes aren\'t designed for peri-menopausal physiology. Your body processes food, stress and sleep differently during this transition. The Peri-Menopause Reset is built around how your body actually works right now — that\'s what makes it different.',
  },
  {
    q: '"I don\'t have time for another programme."',
    a: 'This isn\'t a programme — it\'s a guide. You read it at your own pace, apply what resonates, and use the included trackers, meal planner and workout plan whenever it suits you. Most women say it simplified their routine rather than added to it.',
  },
  {
    q: '"I\'m not sure it\'ll work for me."',
    a: 'That\'s a completely valid feeling. Every woman\'s experience of peri-menopause is different — but the fundamentals of how your body responds to hormonal change are consistent. The guide is written to meet you exactly where you are, and many women notice a difference within the first week.',
  },
  {
    q: '"Can\'t I just find this information online?"',
    a: 'You can find fragments everywhere — but also a lot of contradictory, overwhelming or irrelevant information. What this guide gives you is everything in one calm, clear place: symptoms, nervous system support, nutrition, movement, sleep, daily habits, and practical tools to track your progress.',
  },
]

function FadeIn({ children, delay = 0, y = 24 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function WhyPage() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--dark-bg)', padding: '6rem 3rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(6rem,18vw,18rem)', fontWeight: 700, color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '-0.04em', lineHeight: 1 }}>Why</div>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '1rem' }}>Why ReviveHer</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '2rem' }}>
              Because you deserve<br />
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>answers, not</span><br />
              guesswork.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 300, maxWidth: 560 }}>
              If you've been told your symptoms are "just part of getting older" — this page is for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Does this sound familiar? ── */}
      <section style={{ background: 'var(--bg)', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow">Sound Familiar?</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1 }}>
                You shouldn't have to<br />feel this way.
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {problems.map((p, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{p.emoji}</span>
                  <span style={{ color: 'var(--dark)', fontSize: '0.92rem', lineHeight: 1.55, fontWeight: 400 }}>{p.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, rgba(125,158,118,0.1), rgba(201,150,142,0.08))', border: '1px solid rgba(125,158,118,0.2)', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--dark)', fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 400, margin: 0 }}>
                These symptoms are real. They're common in peri-menopause. And — most importantly — <strong style={{ color: 'var(--primary)' }}>they're addressable.</strong> Not by pushing through, but by understanding what's happening in your body and giving it the right support.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Without vs. With ── */}
      <section style={{ background: 'var(--dark-bg)', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '0.75rem' }}>The Difference</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
                Life before & after<br />the Reset
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '0.75rem 0.75rem 0 0', padding: '0.85rem 1.25rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Without the Reset</span>
            </div>
            <div style={{ background: 'rgba(125,158,118,0.12)', borderRadius: '0.75rem 0.75rem 0 0', padding: '0.85rem 1.25rem', textAlign: 'center', border: '1px solid rgba(125,158,118,0.2)', borderBottom: 'none' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary)' }}>With the Reset</span>
            </div>
          </div>

          {comparisons.map((row, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'rgba(255,100,100,0.6)', fontSize: '0.9rem', flexShrink: 0 }}>✕</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', lineHeight: 1.5 }}>{row.without}</span>
                </div>
                <div style={{ background: 'rgba(125,158,118,0.08)', border: '1px solid rgba(125,158,118,0.15)', borderRadius: '0.75rem', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.9rem', flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.5 }}>{row.with}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Why this guide is different ── */}
      <section style={{ background: 'var(--bg)', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow">Why Different</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1 }}>
                Not another wellness book
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {differentiators.map((d, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '2rem', border: '1px solid var(--border)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '2rem', flexShrink: 0 }}>{d.icon}</div>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>{d.title}</div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{d.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Objections ── */}
      <section style={{ background: 'var(--card)', padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow">Honest Answers</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1 }}>
                Still on the fence?
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {objections.map((o, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ borderTop: '1px solid var(--border)', padding: '2rem 0' }}>
                  <div style={{ fontWeight: 700, color: 'var(--dark)', fontSize: '1rem', marginBottom: '0.75rem', fontStyle: 'italic' }}>{o.q}</div>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{o.a}</p>
                </div>
              </FadeIn>
            ))}
            <div style={{ borderTop: '1px solid var(--border)' }} />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: 'var(--dark-bg)', padding: '8rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.5rem' }}>
              Ready to feel like yourself again?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '2.5rem' }}>
              A calm, clear guide designed for exactly where you are right now.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(125,158,118,0.5)' }} whileTap={{ scale: 0.96 }} style={{ borderRadius: 999 }}>
                <Link
                  to="/buy"
                  className="btn btn-sage"
                  style={{ fontSize: '0.85rem', padding: '1.1rem 2.5rem', textDecoration: 'none', display: 'inline-flex' }}
                >
                  Get the Guide — $19.99
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ borderRadius: 999 }}>
                <Link
                  to="/about"
                  className="btn btn-outline"
                  style={{ fontSize: '0.85rem', padding: '1.1rem 2.5rem', textDecoration: 'none', display: 'inline-flex' }}
                >
                  Learn About Us
                </Link>
              </motion.div>
            </div>
            <p style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.78rem' }}>
              Instant access · All formats included · Yours forever
            </p>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
