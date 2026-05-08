import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const values = [
  { icon: '🔬', title: 'Evidence-Based', desc: 'Everything in The Peri-Menopause Reset is grounded in current research — no trends, no fads, no guesswork. Just guidance that actually works.' },
  { icon: '💬', title: 'Women-First', desc: 'Built specifically for women navigating peri-menopause. We understand what it actually feels like to be in this stage of life.' },
  { icon: '🌿', title: 'Sustainable by Design', desc: 'No extreme plans, no restrictions. Every recommendation is designed to last — because small, consistent changes are what actually move the needle.' },
  { icon: '❤️', title: 'Compassionate', desc: 'No shame, no blame. Peri-menopause is not a problem to fix — it\'s a transition to understand and support. You deserve to feel good again.' },
]

const milestones = [
  { stat: '12,000+', label: 'Women supported worldwide' },
  { stat: '4.9★',    label: 'Average reader rating' },
  { stat: '4 weeks', label: 'Gentle week-by-week reset' },
  { stat: '100%',    label: 'Evidence-backed content' },
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

export default function AboutPage() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* ── Hero ── */}
      <section style={{ background: 'var(--dark-bg)', padding: '6rem 3rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(8rem,20vw,20rem)', fontWeight: 700, color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '-0.04em', lineHeight: 1 }}>About</div>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '1rem' }}>Who We Are</span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '2rem' }}>
              Built by women<br />
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>who've been</span><br />
              there.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', lineHeight: 1.7, fontWeight: 300, maxWidth: 560 }}>
              ReviveHer was founded because we couldn't find a resource that was both scientifically grounded <em>and</em> genuinely compassionate about what women go through during peri-menopause.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats row ── */}
      <section style={{ background: 'var(--primary)', padding: '3.5rem 3rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
          {milestones.map((m, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>{m.stat}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.25rem', letterSpacing: '0.02em' }}>{m.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Our story ── */}
      <section style={{ background: 'var(--bg)', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          {/* Lifestyle image — calm, atmospheric */}
          <FadeIn>
            <div style={{
              width:        '100%',
              maxWidth:     420,
              margin:       '0 auto',
              borderRadius: '2rem',
              overflow:     'hidden',
              boxShadow:    '0 24px 64px rgba(46,46,46,0.12)',
              border:       '1px solid var(--border)',
            }}>
              <img
                src="/lifestyle-2.jpg"
                alt="Calm morning moment"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </FadeIn>

          {/* Story text */}
          <FadeIn delay={0.1}>
            <span className="eyebrow">Our Story</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              The reset we<br />wish we had
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.97rem', lineHeight: 1.75, fontWeight: 300 }}>
                We kept hearing the same thing from women in their 40s and 50s: they were doing everything right — eating carefully, trying to sleep, managing their stress — and still felt exhausted, foggy, and unlike themselves.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.97rem', lineHeight: 1.75, fontWeight: 300 }}>
                Peri-menopause was almost always the missing piece. Not as a diagnosis to fear, but as a hormonal shift that changes how the body responds to food, sleep, stress and movement — often years before periods stop.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.97rem', lineHeight: 1.75, fontWeight: 300 }}>
                The Peri-Menopause Reset was written to give every woman a clear, calm path through that transition — covering nervous system support, gentle nutrition, sleep and stress strategies, movement, and the daily habits that genuinely help.
              </p>
            </div>

            {/* What's inside at a glance */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                'Understand your symptoms — clearly explained',
                'Calm your nervous system with simple techniques',
                'Nourish your body without restriction',
                'Build sustainable habits that actually stick',
                'Meal planner, recipes, workout plan & daily trackers included',
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.15rem' }}>
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--dark)', fontWeight: 400, lineHeight: 1.5 }}>{c}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ background: 'var(--card)', padding: '7rem 3rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow">Our Values</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1 }}>
                What we stand for
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: 'var(--bg)', borderRadius: '1.25rem', padding: '2rem', border: '1px solid var(--border)', height: '100%' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{v.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>{v.title}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, fontWeight: 300 }}>{v.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission statement ── */}
      <section style={{ background: 'var(--dark-bg)', padding: '8rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(125,158,118,0.07) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(201,150,142,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <FadeIn>
            <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '1.5rem' }}>Our Mission</span>
            <p style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'white', lineHeight: 1.3, letterSpacing: '-0.03em', marginBottom: '3rem' }}>
              "To give every woman a calm, clear path through peri-menopause — so she can feel like herself again."
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/buy"
                className="btn btn-sage"
                style={{ fontSize: '0.82rem', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-flex' }}
              >
                Get the Guide
              </Link>
            </motion.div>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
