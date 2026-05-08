/**
 * StackedCards — cinematic scroll section.
 *
 * WHAT HAPPENS
 * ─────────────────────────────────────────────────────────────────────────
 * 1. background.jpg sits behind everything as a full-cover atmospheric image.
 *
 * 2. An overlay div starts as near-opaque warm cream (#f4f1eb) and
 *    transitions to soft charcoal (rgba 43,43,43,0.84) as the section
 *    scrolls into view — BEFORE the pin locks in.
 *    Effect: the page feels like it's slowly moving into a different mood.
 *
 * 3. Header text colour transitions dark → warm off-white in sync.
 *
 * 4. At 'top top' the section pins. During the pin each card rises from
 *    below-left and sweeps diagonally to centre while the previous card
 *    recedes upward-right — editorial, layered, premium.
 *
 * 5. The entire card stack has a gentle CSS float oscillation for depth.
 *
 * 6. All content comes from content.sticky.blocks (peri-menopause steps).
 * ─────────────────────────────────────────────────────────────────────────
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

// ─── Scroll & layout constants ───────────────────────────────────────────────
const SCROLL_PER_CARD = 520   // px of scroll per card transition
const CARD_HEIGHT     = 440   // px — height of the card stack area

// ─── Content — pulled directly from existing peri-menopause steps ─────────
const CARDS = content.sticky.blocks.map((b, i) => ({
  number:  String(i + 1).padStart(2, '0'),
  eyebrow: b.eyebrow,
  title:   b.title,
  body:    b.body,
}))

// Warm creams — contrast beautifully on the dark charcoal background
const CARD_BG = ['#faf8f4', '#f5f2ec', '#ede9e0', '#e8e3d8']

export default function StackedCards() {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)   // colour-transition overlay
  const headerRef  = useRef(null)   // header text group
  const cardRefs   = useRef([])     // individual card elements

  useGSAP(() => {
    const cards = cardRefs.current.filter(Boolean)
    const n     = cards.length
    if (n < 2) return

    // ── 1. OVERLAY: warm cream → soft charcoal ────────────────────────────
    // Fires as the section enters the viewport, completes before the pin.
    // Reveals the background image progressively as the mood darkens.
    gsap.fromTo(
      overlayRef.current,
      { backgroundColor: 'rgba(244,241,235,0.97)' },
      {
        backgroundColor: 'rgba(43,43,43,0.84)',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 90%',    // begins when section top is 90% down the viewport
          end:     'top 12%',    // completes just before pin locks
          scrub:   1.8,          // slow, atmospheric lag
        },
      }
    )

    // ── 2. HEADER TEXT: dark charcoal → warm off-white ───────────────────
    // Inherits down to h2 and eyebrow span via color: inherit.
    gsap.fromTo(
      headerRef.current,
      { color: '#2e2e2e' },
      {
        color: '#f5f0ea',
        ease:  'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 90%',
          end:     'top 12%',
          scrub:   1.8,
        },
      }
    )

    // ── 3. CARD ANIMATION: diagonal slide up-left → centre ───────────────
    // Cards start below and slightly left; sweep diagonally to the top.
    // The previous card recedes upward-right for a layered editorial depth.
    gsap.set(cards.slice(1), { yPercent: 112, x: -24 })

    const tl = gsap.timeline()

    for (let i = 0; i < n - 1; i++) {
      tl
        // Incoming card: rises from below-left, lands centre
        .to(cards[i + 1], {
          yPercent: 0,
          x:        0,
          ease:     'none',
          duration: 1,
        })
        // Previous card: recedes — scales back, lifts slightly, drifts right
        .to(cards[i], {
          scale:    0.92,
          y:        -30,
          x:        24,
          ease:     'none',
          duration: 1,
        }, '<')
    }

    // ── 4. PIN + SCRUB ────────────────────────────────────────────────────
    ScrollTrigger.create({
      trigger:       sectionRef.current,
      start:         'top top',
      end:           `+=${SCROLL_PER_CARD * (n - 1)}`,
      pin:           true,
      anticipatePin: 1,
      scrub:         1.0,
      animation:     tl,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        position:  'relative',
        minHeight: '100vh',
        padding:   '7rem 3rem',
        // No overflow:hidden — breaks GSAP pin
      }}
    >
      {/* ── Background image ── always behind everything ── */}
      <div style={{
        position:           'absolute',
        inset:              0,
        backgroundImage:    'url(/background.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        zIndex:             0,
      }} />

      {/* ── Colour-transition overlay ── cream → charcoal ── */}
      <div
        ref={overlayRef}
        style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: 'rgba(244,241,235,0.97)',
          zIndex:          1,
        }}
      />

      {/* ── Content (sits above both layers) ── */}
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── Section header — text colour driven by GSAP ── */}
        <div
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: '3.5rem', color: '#2e2e2e' }}
        >
          <span style={{
            display:       'block',
            fontSize:      '0.65rem',
            fontWeight:    500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'inherit',
            opacity:       0.55,
            marginBottom:  '0.75rem',
          }}>
            What's Inside
          </span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 4vw, 3rem)',
            fontWeight:    700,
            color:         'inherit',
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
          }}>
            Four steps to<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)', fontWeight: 400 }}>
              feeling better.
            </em>
          </h2>
        </div>

        {/* ── Float wrapper — CSS oscillation on whole stack+dots ── */}
        {/*   GSAP targets individual cardRefs (children), not this element,  */}
        {/*   so there is no transform conflict.                               */}
        <div style={{ animation: 'cardFloat 4.5s ease-in-out infinite alternate' }}>

          {/* ── Card stack ── */}
          <div style={{
            position: 'relative',
            height:   CARD_HEIGHT,
            maxWidth: 640,
            margin:   '0 auto',
          }}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el }}
                style={{
                  position:     'absolute',
                  inset:        0,
                  background:   CARD_BG[i] ?? '#f4f1eb',
                  borderRadius: '1.5rem',
                  border:       '1px solid rgba(255,255,255,0.55)',
                  borderTop:    '3px solid var(--primary)',
                  padding:      '2.75rem 3rem',
                  // Deeper shadow — pops against charcoal background
                  boxShadow:    '0 24px 64px rgba(0,0,0,0.28), 0 6px 20px rgba(0,0,0,0.14)',
                  zIndex:       i + 1,
                  willChange:   'transform',
                }}
              >
                {/* Eyebrow + ghost number row */}
                <div style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  marginBottom:   '1.75rem',
                }}>
                  <span style={{
                    fontSize:      '0.65rem',
                    fontWeight:    600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         'var(--primary)',
                  }}>
                    {card.eyebrow}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   '3rem',
                    fontWeight: 700,
                    color:      'rgba(46,46,46,0.06)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}>
                    {card.number}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight:    700,
                  color:         'var(--dark)',
                  letterSpacing: '-0.02em',
                  lineHeight:    1.15,
                  marginBottom:  '1.1rem',
                }}>
                  {card.title}
                </h3>

                {/* Body — peri-menopause step description */}
                <p style={{
                  fontSize:   '0.95rem',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  color:      'var(--muted)',
                  maxWidth:   480,
                }}>
                  {card.body}
                </p>

                {/* Decorative ruled lines at bottom of card */}
                <div style={{
                  position:      'absolute',
                  bottom:        '2rem',
                  left:          '3rem',
                  right:         '3rem',
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           '10px',
                  opacity:       0.07,
                }}>
                  {[0, 1, 2].map(l => (
                    <div key={l} style={{ height: 1, background: 'var(--dark)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Progress dots — warm white on dark bg ── */}
          <div style={{
            marginTop:      '2.5rem',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '0.6rem',
          }}>
            {CARDS.map((_, i) => (
              <div key={i} style={{
                width:        i === 0 ? 10 : 7,
                height:       i === 0 ? 10 : 7,
                borderRadius: '50%',
                background:   i === 0 ? 'var(--primary)' : 'rgba(255,255,255,0.22)',
                transition:   'all 0.3s ease',
              }} />
            ))}
          </div>

        </div>{/* end float wrapper */}
      </div>

      {/* Floating keyframe — gentle 8px oscillation for depth */}
      <style>{`
        @keyframes cardFloat {
          from { transform: translateY(0px);  }
          to   { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
