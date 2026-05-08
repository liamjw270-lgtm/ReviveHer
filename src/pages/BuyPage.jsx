import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { content } from '../content'
import ShopifyBuyButton from '../components/ShopifyBuyButton'

const included = [
  { icon: '📖', title: 'Comprehensive Ebook', desc: 'A beautifully designed guide covering every aspect of peri-menopause — readable on any device.' },
  { icon: '🧠', title: 'Hormone & Symptom Guide', desc: 'Understand exactly what\'s happening in your body and why — explained clearly, without the jargon.' },
  { icon: '😴', title: 'Sleep & Stress Protocols', desc: 'Step-by-step routines to lower cortisol, calm your nervous system and restore deep, restorative sleep.' },
  { icon: '🥗', title: 'Gentle Nutrition Guidance', desc: 'Practical, non-restrictive food guidance designed specifically for peri-menopausal bodies.' },
  { icon: '🏃‍♀️', title: 'Movement for This Stage', desc: 'Exercises designed for peri-menopause — supporting bone density, mood and energy without burnout.' },
  { icon: '🗓️', title: 'Daily Habit Framework', desc: 'A simple, sustainable structure that supports your body without overwhelming your day.' },
]

const bonuses = [
  { icon: '📋', title: 'Meal Planner', desc: 'A fillable weekly meal planner built around peri-menopausal nutrition. Plan your whole week in minutes.', value: '$15' },
  { icon: '🍽️', title: 'Recipes', desc: 'A curated collection of hormone-supporting recipes — simple, satisfying and anti-inflammatory.', value: '$19' },
  { icon: '💪', title: 'Workout Plan', desc: 'A structured weekly movement plan tailored for peri-menopause — no gym required, just your body.', value: '$17' },
  { icon: '📊', title: 'Daily Trackers', desc: 'Fillable PDF trackers for symptoms, habits, sleep and mood. Spot your patterns and see your progress.', value: '$14' },
]

const trustPoints = [
  'Instant access — download immediately after purchase',
  'Works on any device — phone, tablet, laptop or desktop',
  'Yours to keep forever — no subscriptions, no recurring charges',
]

function FadeIn({ children, delay = 0, y = 20 }) {
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

export default function BuyPage() {
  return (
    <main style={{ paddingTop: 68 }}>

      {/* ── Hero ── */}
      <section id="buy-now" style={{ background: 'var(--dark-bg)', padding: '6rem 3rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(8rem,20vw,20rem)', fontWeight: 700, color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '-0.04em', lineHeight: 1 }}>Reset</div>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>

          {/* Book image — clean, no green box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {content.hero.productImage ? (
              <img
                src={content.hero.productImage}
                alt="The Peri-Menopause Reset by ReviveHer"
                style={{
                  width:   '100%',
                  maxWidth: 320,
                  display: 'block',
                  filter:  'drop-shadow(0 30px 50px rgba(0,0,0,0.45))',
                }}
              />
            ) : (
              <div style={{ width: '100%', maxWidth: 320, aspectRatio: '3/4', borderRadius: '1.5rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>The Peri-Menopause Reset</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '0.4rem' }}>ReviveHer</div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Text + price */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '0.75rem' }}>Digital Ebook + 4 Free Bonuses</span>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              The Peri-Menopause Reset
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
              A calm, evidence-backed guide to understanding your body, reducing symptoms and feeling like yourself again — plus four practical bonuses included free.
            </p>

            {/* Price block */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.25rem', padding: '1.75rem 2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 700, color: 'white', letterSpacing: '-0.04em' }}>$19.99</span>
                <span style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>$112</span>
                <span style={{ fontSize: '0.75rem', background: 'var(--secondary)', color: 'white', padding: '0.25rem 0.6rem', borderRadius: 999, fontWeight: 500 }}>82% OFF</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>One-time payment · Instant download · All formats included</div>
            </div>

            <ShopifyBuyButton />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center', marginTop: '0.75rem' }}>
              <LockIcon />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Secure checkout · Instant access · Yours forever</span>
            </div>

            {/* Medical disclaimer */}
            <div style={{
              marginTop:    '1.75rem',
              padding:      '1rem 1.25rem',
              background:   'rgba(255,255,255,0.04)',
              border:       '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.75rem',
              fontSize:     '0.72rem',
              color:        'rgba(255,255,255,0.28)',
              lineHeight:   1.65,
              textAlign:    'center',
            }}>
              <strong style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Disclaimer:</strong> This guide is for general informational and educational purposes only. It is not intended as medical advice and does not replace the guidance of a qualified healthcare professional. If your symptoms are severe, persistent or causing concern, please consult your doctor or a registered health practitioner.
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section style={{ background: 'var(--bg)', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="eyebrow">Everything Inside</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1 }}>
                One guide.<br />Everything you need.
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
            {included.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid var(--border)', height: '100%' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--dark)', marginBottom: '0.4rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bonuses ── */}
      <section style={{ background: 'var(--dark-bg)', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '0.75rem' }}>Free With Your Purchase</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
                Four bonuses,<br />zero extra cost
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bonuses.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '1.75rem', flexShrink: 0 }}>{b.icon}</div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>{b.title}</span>
                      <span style={{ fontSize: '0.7rem', background: 'rgba(125,158,118,0.2)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: 999, fontWeight: 500 }}>FREE</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', lineHeight: 1.6, fontWeight: 300 }}>{b.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', marginBottom: '0.1rem' }}>Value {b.value}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>Free</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: '2rem', background: 'rgba(125,158,118,0.08)', border: '1px solid rgba(125,158,118,0.2)', borderRadius: '1rem', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Total value: <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)' }}>$112</span></div>
                <div style={{ color: 'var(--primary)', fontSize: '0.82rem' }}>You get everything for just $19.99 today</div>
              </div>
              <a
                href="#buy-now"
                className="btn btn-sage"
                style={{ fontSize: '0.82rem', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-flex' }}
              >
                Get Instant Access — $19.99
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials strip ── */}
      <section style={{ background: 'var(--bg)', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', textAlign: 'center', color: 'var(--dark)', marginBottom: '3rem', lineHeight: 1.1 }}>
              What women are saying
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {content.testimonials.slice(0, 6).map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid var(--border)', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ color: 'var(--secondary)', letterSpacing: '0.1em' }}>{'★'.repeat(t.stars)}</div>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--dark)', fontWeight: 300, fontStyle: 'italic', flex: 1 }}>"{t.quote}"</p>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--dark)' }}>{t.author}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{t.meta}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section style={{ background: 'var(--card)', padding: '5rem 3rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <ShieldIcon />
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1, marginBottom: '1rem' }}>
              Everything you need,<br />delivered instantly
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
              The moment you purchase, you'll receive immediate access to The Peri-Menopause Reset and all four bonuses — no waiting, no shipping, no fuss. Yours to keep and read on any device.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', maxWidth: 400, margin: '0 auto 2.5rem' }}>
              {trustPoints.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '0.1rem' }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--dark)', fontWeight: 300, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
            <a
              href="#buy-now"
              className="btn btn-sage"
              style={{ fontSize: '0.82rem', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-flex' }}
            >
              Get Instant Access — $19.99
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ mini ── */}
      <section style={{ background: 'var(--bg)', padding: '6rem 3rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', marginBottom: '2.5rem' }}>Quick answers</h2>
          </FadeIn>
          {content.faq.slice(0, 3).map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ borderTop: '1px solid var(--border)', padding: '1.25rem 0', textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{item.q}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65, fontWeight: 300 }}>{item.a}</div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.25}>
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', textAlign: 'left' }}>
              <Link to="/#faq" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>
                View all questions →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M8 11V7a4 4 0 018 0v4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11C7.5 20 4 16 4 11V5l8-3z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
