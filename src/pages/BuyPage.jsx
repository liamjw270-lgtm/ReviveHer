import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { content } from '../content'
import ShopifyBuyButton from '../components/ShopifyBuyButton'
import TrustBadges from '../components/TrustBadges'

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
  '30-day money back guarantee — no questions asked',
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

/** Sticky bottom buy bar — mobile only, appears after scrolling past hero */
function StickyBuyBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        .buy-sticky-bar { display: flex; }
        @media (min-width: 760px) { .buy-sticky-bar { display: none; } }
      `}</style>
      <div className="buy-sticky-bar" style={{
        position:      'fixed',
        bottom:        0,
        left:          0,
        right:         0,
        zIndex:        150,
        alignItems:    'center',
        justifyContent:'space-between',
        gap:           '1rem',
        padding:       '0.8rem 1.25rem calc(0.8rem + env(safe-area-inset-bottom))',
        background:    'rgba(30,36,32,0.97)',
        backdropFilter:'blur(12px)',
        borderTop:     '1px solid rgba(255,255,255,0.1)',
        transform:     show ? 'translateY(0)' : 'translateY(110%)',
        transition:    'transform 0.35s var(--ease-expo)',
      }}>
        <div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span style={{ textDecoration: 'line-through', opacity: 0.5, fontWeight: 500, fontSize: '0.8rem' }}>$19.99</span>
            $9.99
          </div>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.62rem' }}>Instant PDF · 30-day guarantee</div>
        </div>
        <a
          href="#buy-now"
          className="btn btn-sage"
          style={{ fontSize: '0.74rem', padding: '0.85rem 1.6rem', textDecoration: 'none', flexShrink: 0 }}
        >
          Get the Guide
        </a>
      </div>
    </>
  )
}

export default function BuyPage() {
  return (
    <main style={{ paddingTop: 68 }}>
      <StickyBuyBar />

      {/* ── Hero ── */}
      <section id="buy-now" style={{ background: 'var(--dark-bg)', padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(3.5rem, 8vw, 5rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 'clamp(8rem,20vw,20rem)', fontWeight: 700, color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '-0.04em', lineHeight: 1 }}>Reset</div>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(2.5rem, 6vw, 4rem)', alignItems: 'center', position: 'relative', zIndex: 2 }}>

          {/* Book image */}
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
                  width:    '100%',
                  maxWidth: 'min(60vw, 320px)',
                  display:  'block',
                  filter:   'drop-shadow(0 30px 50px rgba(0,0,0,0.45))',
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
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.9rem' }}>
              The Peri-Menopause Reset
            </h1>

            {/* Stars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span style={{ color: '#f4b942', fontSize: '1rem', letterSpacing: '0.08em' }}>★★★★★</span>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem' }}>Rated 4.9 by readers</span>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>
              A calm, evidence-backed guide to understanding your body, reducing symptoms and feeling like yourself again — plus four practical bonuses included free.
            </p>

            {/* Price block */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.25rem', padding: 'clamp(1.4rem, 4vw, 1.75rem) clamp(1.4rem, 4vw, 2rem)', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 'clamp(2.4rem, 7vw, 3rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.04em' }}>$9.99</span>
                <span style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', fontWeight: 500, color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through' }}>$19.99</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'white', background: 'var(--secondary)', padding: '0.35rem 0.7rem', borderRadius: 99 }}>50% off</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>Limited-time sale · One-time payment · Instant PDF download · All formats included</div>
            </div>

            <ShopifyBuyButton />

            {/* Guarantee line */}
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            '0.5rem',
              marginTop:      '0.9rem',
              padding:        '0.7rem 1rem',
              background:     'rgba(125,158,118,0.1)',
              border:         '1px solid rgba(125,158,118,0.2)',
              borderRadius:   '0.6rem',
            }}>
              <span style={{ fontSize: '1rem' }}>🛡️</span>
              <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                30-day money back guarantee — no questions asked
              </span>
            </div>

            <div style={{ marginTop: '0.9rem' }}>
              <TrustBadges dark compact />
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
      <section style={{ background: 'var(--bg)', padding: 'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.75rem, 6vw, 4rem)' }}>
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
      <section style={{ background: 'var(--dark-bg)', padding: 'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.75rem, 6vw, 4rem)' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '0.75rem' }}>Free With Your Purchase</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
                Four bonuses,<br />zero extra cost
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {bonuses.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: 'clamp(1.4rem, 4vw, 1.75rem) clamp(1.4rem, 4vw, 2rem)', display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 3vw, 2rem)', flexWrap: 'wrap' }}>
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
                <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>Everything included for <span style={{ textDecoration: 'line-through', opacity: 0.55, fontWeight: 500 }}>$19.99</span> $9.99</div>
                <div style={{ color: 'var(--primary)', fontSize: '0.82rem' }}>One-time payment · Instant PDF download</div>
              </div>
              <a
                href="#buy-now"
                className="btn btn-sage"
                style={{ fontSize: '0.82rem', padding: '1rem 2.5rem', textDecoration: 'none', display: 'inline-flex' }}
              >
                Get Instant Access — $9.99
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials strip ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(4.5rem, 9vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', textAlign: 'center', color: 'var(--dark)', marginBottom: '3rem', lineHeight: 1.1 }}>
              What women are saying
            </h2>
          </FadeIn>
          <style>{`
            @media (max-width: 600px) {
              .buy-testimonials-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          <div className="buy-testimonials-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
          }}>
            {content.testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid var(--border)', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ color: '#f4b942', fontSize: '1rem', letterSpacing: '0.05em', lineHeight: 1 }}>
                    ★★★★★
                  </div>
                  <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--dark)', fontWeight: 300, fontStyle: 'italic', flex: 1, margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: i % 2 === 0 ? 'rgba(125,158,118,0.18)' : 'rgba(201,150,142,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
                      color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', flexShrink: 0,
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--dark)' }}>{t.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{t.detail} · Verified reader</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section style={{ background: 'var(--card)', padding: 'clamp(4rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <ShieldIcon />
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1, marginBottom: '1rem' }}>
              Try it risk-free<br />for 30 days
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem' }}>
              The moment you purchase, you'll receive immediate access to The Peri-Menopause Reset and all four bonuses. And if it's not right for you, just email us within 30 days for a full refund — no questions asked.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', maxWidth: 420, margin: '0 auto 2.5rem' }}>
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
              Get Instant Access — $9.99
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ mini ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(6rem, 10vw, 6rem)' }}>
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

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11C7.5 20 4 16 4 11V5l8-3z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
