import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../content'
import BuyButton from '../components/BuyButton'
import TrustBadges from '../components/TrustBadges'
import EvidenceSection from '../components/EvidenceSection'
import FreeGuideCapture from '../components/FreeGuideCapture'
import { GuaranteeBanner } from '../components/Guarantee'

// Two real early readers. Quote text is unchanged from the site's existing
// reviews — only the names shown are Mary and Alesha (first names only).
const reviews = [
  { name: 'Mary',   quote: content.testimonials[0].quote },
  { name: 'Alesha', quote: content.testimonials[1].quote },
]

const included = [
  { icon: '📖', title: 'Comprehensive Ebook', desc: 'A beautifully designed guide covering every aspect of peri-menopause — readable on any device.' },
  { icon: '🧠', title: 'Hormone & Symptom Guide', desc: 'Understand exactly what\'s happening in your body and why — explained clearly, without the jargon.' },
  { icon: '😴', title: 'Sleep & Stress Protocols', desc: 'Step-by-step routines to lower cortisol, calm your nervous system and restore deep, restorative sleep.' },
  { icon: '🥗', title: 'Gentle Nutrition Guidance', desc: 'Practical, non-restrictive food guidance designed specifically for peri-menopausal bodies.' },
  { icon: '🏃‍♀️', title: 'Movement for This Stage', desc: 'Exercises designed for peri-menopause — supporting bone density, mood and energy without burnout.' },
  { icon: '🗓️', title: 'Daily Habit Framework', desc: 'A simple, sustainable structure that supports your body without overwhelming your day.' },
]

const bonuses = [
  { icon: '📝', title: 'Reset Worksheets' },
  { icon: '🩺', title: 'Doctor Visit Summary' },
  { icon: '💬', title: 'The Partner Explainer' },
  { icon: '📋', title: "At the Doctor's" },
  { icon: '🧊', title: 'The Fridge Sheet' },
  { icon: '🍽️', title: 'Meal Planner & Recipes' },
  { icon: '💪', title: 'Movement Plan' },
]

const trustPoints = [
  'Instant access — download immediately after purchase',
  'Works on any device — phone, tablet, laptop or desktop',
  'Yours to keep forever — no subscriptions, no recurring charges',
  '30-day money back guarantee — no questions asked',
]

/** Sticky bottom buy bar — mobile only, appears after scrolling past hero.
 *
 * Note: all entrance animations are removed on the buy page — every element is
 * fully visible on load with no opacity transition, so nothing depends on JS
 * running (critical for slow Facebook in-app browsers). */
function StickyBuyBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200)
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
        gap:           '0.85rem',
        padding:       '0.7rem 1rem calc(0.7rem + env(safe-area-inset-bottom))',
        background:    'rgba(30,36,32,0.97)',
        borderTop:     '1px solid rgba(255,255,255,0.1)',
        transform:     show ? 'translateY(0)' : 'translateY(110%)',
        transition:    'transform 0.3s ease',
      }}>
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            $19.99
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.62rem' }}>Instant download · 30-day money-back guarantee</div>
        </div>
        <BuyButton label="Get Instant Access" note={false} style={{ fontSize: '0.72rem', padding: '0.8rem 1.4rem', flexShrink: 0 }} />
      </div>
    </>
  )
}

export default function BuyPage() {
  return (
    <main style={{ paddingTop: 68 }}>
      <style>{`
        /* Mobile: keep the hero compact so cover + headline + price + button
           + guarantee all fit above the fold at 390px. */
        @media (max-width: 759px) {
          .buy-hero          { padding: 1.25rem 1.25rem 2rem !important; }
          .buy-hero-grid     { gap: 0.9rem !important; text-align: center; }
          .buy-hero-cover    { max-width: 118px !important; margin: 0 auto; }
          .buy-hero-desc     { display: none; }
          .buy-hero-eyebrow  { margin-bottom: 0.4rem !important; }
          .buy-hero-title    { font-size: 1.7rem !important; margin-bottom: 0.5rem !important; }
          .buy-hero-stars    { justify-content: center; margin-bottom: 0.75rem !important; }
          .buy-hero-price    { padding: 0.9rem 1rem !important; margin-bottom: 0.9rem !important; }
          .buy-hero-badges,
          .buy-hero-note     { display: none !important; }
        }
      `}</style>

      <StickyBuyBar />

      {/* ── Hero ── */}
      {/* Instant trust ribbon — first thing visible on the buy page */}
      <div style={{ background: 'rgba(125,158,118,0.14)', borderBottom: '1px solid rgba(125,158,118,0.25)', padding: '0.6rem 1rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(0.75rem, 3vw, 1.75rem)', flexWrap: 'wrap' }}>
          {[
            '🔒 Secure checkout',
            '🛡️ 30-day money-back',
            '⚡ Instant download',
            '💳 One-time payment',
          ].map((t, i) => (
            <span key={i} style={{ fontSize: 'clamp(0.68rem, 2.5vw, 0.78rem)', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>{t}</span>
          ))}
        </div>
      </div>

      <section id="buy-now" className="buy-hero" style={{ background: 'var(--dark-bg)', padding: 'clamp(2rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 8vw, 5rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="buy-hero-grid" style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 5vw, 4rem)', alignItems: 'center', position: 'relative', zIndex: 2 }}>

          {/* Book image (above the fold — eager, high priority) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              className="buy-hero-cover"
              src={content.hero.productImage}
              alt="The Peri-Menopause Reset by ReviveHer"
              width="320" height="427"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              style={{ width: '100%', maxWidth: 'min(55vw, 300px)', height: 'auto', display: 'block', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.45))' }}
            />
          </div>

          {/* Text + price */}
          <div>
            <span className="buy-hero-eyebrow" style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '0.75rem' }}>Digital Ebook + 7 Free Bonuses</span>

            {/* Ad-matching opening line — directly above the headline */}
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 3.2vw, 1.35rem)', fontWeight: 400, color: 'var(--primary)', lineHeight: 1.3, marginBottom: '0.6rem' }}>
              {content.hero.openingLine}
            </p>

            <h1 className="buy-hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.9rem' }}>
              The Peri-Menopause Reset
            </h1>

            <div className="buy-hero-stars" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.1rem' }}>
              <span style={{ color: '#f4b942', fontSize: '1rem', letterSpacing: '0.08em' }}>★★★★★</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', fontWeight: 500 }}>4.9/5 from readers</span>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--primary)', background: 'rgba(125,158,118,0.15)', border: '1px solid rgba(125,158,118,0.3)', borderRadius: 99, padding: '0.2rem 0.6rem' }}>🔬 Evidence-based</span>
            </div>

            <p className="buy-hero-desc" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.98rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.75rem' }}>
              A calm, evidence-backed guide to understanding your body, reducing symptoms and feeling like yourself again — plus seven practical bonuses included free.
            </p>

            {/* Price block */}
            <div className="buy-hero-price" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.25rem', padding: 'clamp(1.4rem, 4vw, 1.75rem) clamp(1.4rem, 4vw, 2rem)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap', justifyContent: 'inherit' }}>
                <span style={{ fontSize: 'clamp(2.4rem, 7vw, 3rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.04em' }}>$19.99</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'white', background: 'var(--secondary)', padding: '0.35rem 0.7rem', borderRadius: 99 }}>Over $100 of value</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>The full guide + 7 bonus tools — over $100 worth of information. One-time payment · Instant PDF download.</div>
            </div>

            {/* One-click checkout */}
            <BuyButton block dark style={{ fontSize: '0.9rem', padding: '1.15rem 2rem' }} />

            {/* Full-width guarantee banner — directly under the buy button */}
            <GuaranteeBanner />

            <div className="buy-hero-badges" style={{ marginTop: '0.9rem' }}>
              <TrustBadges dark compact />
            </div>

            {/* Medical disclaimer */}
            <div className="buy-hero-note" style={{
              marginTop: '1.75rem', padding: '1rem 1.25rem',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '0.75rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)',
              lineHeight: 1.65, textAlign: 'center',
            }}>
              <strong style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Disclaimer:</strong> This guide is for general informational and educational purposes only. It is not intended as medical advice and does not replace the guidance of a qualified healthcare professional. If your symptoms are severe, persistent or causing concern, please consult your doctor or a registered health practitioner.
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar — bold, unmissable proof strip right under the hero ── */}
      <section style={{ background: 'var(--primary)', padding: '1.1rem clamp(1rem, 4vw, 2rem)' }}>
        <div className="buy-trustbar" style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.9rem 1rem' }}>
          <style>{`@media (min-width: 700px){ .buy-trustbar { grid-template-columns: repeat(4, 1fr) !important; } }`}</style>
          {[
            { icon: '★★★★★', label: '4.9/5 rated', sub: 'Loved by readers' },
            { icon: '🔬', label: 'Evidence-based', sub: 'Research-backed' },
            { icon: '🛡️', label: '30-day guarantee', sub: 'Money back, no questions' },
            { icon: '⚡', label: 'Instant download', sub: 'Secure checkout' },
          ].map((t, i) => (
            <div key={i} className="buy-trustbar-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center' }}>
              <span style={{ fontSize: t.icon.startsWith('★') ? '0.72rem' : '1.15rem', color: t.icon.startsWith('★') ? '#f4d97a' : 'white', letterSpacing: t.icon.startsWith('★') ? '0.05em' : 0, flexShrink: 0 }}>{t.icon}</span>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '0.82rem' }}>{t.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.68rem' }}>{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What makes this different — specifics, near the top ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(2.5rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(1.25rem, 3vw, 2rem)' }}>
          {[
            { icon: '📚', text: 'Grounded in published research — 26 sources cited throughout' },
            { icon: '🩺', text: 'Points you to the same information sheets clinicians use' },
            { icon: '🗒️', text: "A full chapter on getting real help from your doctor's appointment" },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.35rem', flexShrink: 0, lineHeight: 1.2 }}>{t.icon}</span>
              <span style={{ fontSize: '0.92rem', color: 'var(--dark)', fontWeight: 500, lineHeight: 1.5 }}>{t.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── The science / proof — surfaced early so trust is obvious fast ── */}
      <EvidenceSection dark />

      {/* ── What's Included ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.75rem, 6vw, 4rem)' }}>
            <span className="eyebrow">Everything Inside</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1 }}>
              One guide.<br />Everything you need.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
            {included.map((item, i) => (
              <div key={i} style={{ background: 'var(--card)', borderRadius: '1.25rem', padding: '1.75rem', border: '1px solid var(--border)', height: '100%' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--dark)', marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bonuses ── */}
      <section style={{ background: 'var(--dark-bg)', padding: 'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.75rem, 6vw, 4rem)' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', display: 'block', marginBottom: '0.75rem' }}>Free With Your Purchase</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Your 7 free bonuses
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.9rem' }}>
            {bonuses.map((b, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{b.icon}</div>
                <span style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem', flex: 1 }}>{b.title}</span>
                <span style={{ fontSize: '0.65rem', background: 'rgba(125,158,118,0.2)', color: 'var(--primary)', padding: '0.2rem 0.55rem', borderRadius: 999, fontWeight: 600, flexShrink: 0 }}>FREE</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', background: 'rgba(125,158,118,0.08)', border: '1px solid rgba(125,158,118,0.2)', borderRadius: '1rem', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem' }}>
                Everything included for $19.99 — over $100 of value
              </div>
              <div style={{ color: 'var(--primary)', fontSize: '0.82rem' }}>One-time payment · Instant PDF download</div>
            </div>
            <BuyButton dark style={{ fontSize: '0.82rem', padding: '1rem 2.5rem' }} />
          </div>
        </div>
      </section>

      {/* ── Early reader feedback — two large pull-quotes ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(4.5rem, 9vw, 6.5rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
            <span className="eyebrow">Early Reader Feedback</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#f4b942', fontSize: '1.05rem', letterSpacing: '0.1em' }}>★★★★★</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 500 }}>4.9/5 average</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 6vw, 3.5rem)' }}>
            {reviews.map((r, i) => (
              <figure key={i} style={{ margin: 0, textAlign: 'center', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
                <blockquote style={{
                  margin: '0 0 1rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 4.5vw, 2.1rem)',
                  fontWeight: 400, fontStyle: 'italic',
                  lineHeight: 1.35, letterSpacing: '-0.01em',
                  color: 'var(--dark)',
                }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&ldquo;</span>
                  {r.quote}
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&rdquo;</span>
                </blockquote>
                <figcaption style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary)', letterSpacing: '0.02em' }}>
                  — {r.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ReviveHer — brand-background trust (no personal name needed) ── */}
      <section style={{ background: 'var(--dark-bg)', padding: 'clamp(3.75rem, 8vw, 5.5rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
            {/* Brand mark */}
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(125,158,118,0.15)', border: '1px solid rgba(125,158,118,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 8.5L20 7L15.5 11.5L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 11.5L4 7L10.5 8.5L12 2Z" fill="var(--primary)" />
              </svg>
            </div>
            <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.85rem' }}>
              About ReviveHer
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: '1rem' }}>
              A small, independent team —<br />on your side
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', fontWeight: 300, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
              ReviveHer is an independent publisher of calm, evidence-based wellbeing guides
              for women. The Peri-Menopause Reset draws on publicly available research and was
              refined with feedback from early readers. We're not a faceless marketplace —
              every order is backed by our 30-day guarantee, and a real person answers your emails.
            </p>
          </div>

          {/* Brand trust cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🔒', title: 'Secure checkout', desc: 'Payments are processed by Shopify — we never see or store your card details.' },
              { icon: '💬', title: 'Real human support', desc: 'Email us any time and a real person replies, usually within 1–2 business days.' },
              { icon: '🛡️', title: '30-day guarantee', desc: 'Not happy? Email us within 30 days for a full refund — no questions asked.' },
              { icon: '🔁', title: 'Yours forever', desc: 'A one-time payment. No subscription, no upsells, no recurring charges.' },
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.1rem', padding: '1.5rem 1.4rem', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>{c.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white', marginBottom: '0.35rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, fontWeight: 300 }}>{c.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
            Questions before you buy? Email{' '}
            <a href={`mailto:${content.brand.email}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{content.brand.email}</a>
          </p>
        </div>
      </section>

      {/* ── Risk reversal — the risk is on us, not you ── */}
      <section style={{ background: 'var(--card)', padding: 'clamp(4rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 92, height: 92, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', boxShadow: '0 12px 32px rgba(125,158,118,0.35)' }}>
            <ShieldIcon />
          </div>
          <span className="eyebrow">The Risk Is On Us</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', lineHeight: 1.1, marginBottom: '1rem' }}>
            The risk is on us,<br />not you
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Read the entire guide and use it. If it doesn't genuinely help you, it costs you
            nothing — email us within 30 days and we'll refund every cent, no questions asked.
            You even keep the bonuses.
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
          <BuyButton style={{ fontSize: '0.82rem', padding: '1rem 2.5rem' }} />
        </div>
      </section>

      {/* ── FAQ mini ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--dark)', marginBottom: '2.5rem' }}>Quick answers</h2>
          {content.faq.slice(0, 3).map((item, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', padding: '1.25rem 0', textAlign: 'left' }}>
              <div style={{ fontWeight: 600, color: 'var(--dark)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{item.q}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65, fontWeight: 300 }}>{item.a}</div>
            </div>
          ))}
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem', textAlign: 'left' }}>
            <Link to="/#faq" style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}>
              View all questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ── No tricks — transparency directly disarms scam-wary visitors ── */}
      <section style={{ background: 'var(--dark-bg)', padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(125,158,118,0.35)',
            borderRadius: '1.5rem',
            padding: 'clamp(1.75rem, 5vw, 2.75rem)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>✅</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              No tricks. No surprises.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', textAlign: 'left', maxWidth: 460, margin: '0 auto' }}>
              {[
                'One-time payment of $19.99 — no subscription, ever',
                'No upsells at checkout',
                'No “free trial” that secretly bills you',
                'Instant download — yours to keep forever',
                '30-day refund, no questions asked',
              ].map((line, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1rem', flexShrink: 0, marginTop: '0.05rem' }}>✓</span>
                  <span style={{ fontSize: '0.98rem', color: 'rgba(255,255,255,0.85)', fontWeight: 400, lineHeight: 1.5 }}>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Not ready yet? — free guide email capture ── */}
      <FreeGuideCapture />

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
