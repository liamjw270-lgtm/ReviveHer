/**
 * StackedCards — cinematic scroll section.
 *
 * All viewports: background colour-shift + pinned card stack that sweeps
 * diagonally per card (GSAP ScrollTrigger scrub). The stage height and card
 * padding adapt per breakpoint (see CSS) so nothing clips on a narrow phone.
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

const SCROLL_PER_CARD = 520

const CARDS = content.sticky.blocks.map((b, i) => ({
  number:  String(i + 1).padStart(2, '0'),
  eyebrow: b.eyebrow,
  title:   b.title,
  body:    b.body,
}))

const CARD_BG = ['#faf8f4', '#f5f2ec', '#ede9e0', '#e8e3d8']

export default function StackedCards() {
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const headerRef  = useRef(null)
  const cardRefs   = useRef([])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    // ── All viewports: colour shift + pinned diagonal card sweep ────────
    // Desktop pulls the cards left/right; mobile sweeps them up from the
    // corner at a slight diagonal angle (still mostly vertical).
    mm.add(
      {
        isDesktop: '(min-width: 768px)',
        isMobile:  '(max-width: 767px)',
      },
      () => {
        const cards = cardRefs.current.filter(Boolean)
        const n     = cards.length
        if (n < 2) return

        gsap.fromTo(
          overlayRef.current,
          { backgroundColor: 'rgba(244,241,235,0.97)' },
          {
            backgroundColor: 'rgba(43,43,43,0.84)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start:   'top 90%',
              end:     'top 12%',
              scrub:   1.8,
            },
          }
        )

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

        // Same movement on every viewport: a subtle horizontal offset + gentle
        // tilt so each card swipes in from the bottom corner, then settles
        // perfectly straight and readable.
        const offX = 12
        const rot  = 2.5

        gsap.set(cards.slice(1), { yPercent: 112, x: -offX, rotateZ: -rot })

        const tl = gsap.timeline()
        for (let i = 0; i < n - 1; i++) {
          tl
            .to(cards[i + 1], { yPercent: 0, x: 0, rotateZ: 0, ease: 'none', duration: 1 })
            .to(cards[i],     { scale: 0.92, y: -30, x: offX, rotateZ: rot, ease: 'none', duration: 1 }, '<')
        }

        ScrollTrigger.create({
          trigger:       sectionRef.current,
          start:         'top top',
          end:           `+=${SCROLL_PER_CARD * (n - 1)}`,
          pin:           true,
          anticipatePin: 1,
          scrub:         1.0,
          animation:     tl,
        })
      }
    )

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        position:  'relative',
        minHeight: '100vh',
        padding:   'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
        // No overflow:hidden — breaks GSAP pin
      }}
    >
      <style>{`
        /* Absolute stacked cards inside a fixed-height stage (all viewports) */
        .sc-stack {
          position: relative;
          height: 440px;
          max-width: 640px;
          margin: 0 auto;
        }
        .sc-card {
          position: absolute;
          inset: 0;
          padding: 2.75rem 3rem;
        }
        .sc-dots { display: flex; }

        /* Mobile: taller stage + tighter padding so longer text never clips */
        @media (max-width: 767px) {
          .sc-stack { height: 480px; }
          .sc-card  { padding: 2rem 1.5rem; }
          .sc-rules { display: none !important; }
        }
      `}</style>

      {/* Background image */}
      <div style={{
        position:           'absolute',
        inset:              0,
        backgroundImage:    'url(/background.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center',
        zIndex:             0,
      }} />

      {/* Colour-transition overlay */}
      <div
        ref={overlayRef}
        style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: 'rgba(244,241,235,0.97)',
          zIndex:          1,
        }}
      />

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header */}
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

        {/* Float wrapper (desktop oscillation only — harmless on mobile) */}
        <div style={{ animation: 'cardFloat 4.5s ease-in-out infinite alternate' }}>

          {/* Card stack */}
          <div className="sc-stack">
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el }}
                className="sc-card"
                style={{
                  background:   CARD_BG[i] ?? '#f4f1eb',
                  borderRadius: '1.5rem',
                  border:       '1px solid rgba(255,255,255,0.55)',
                  borderTop:    '3px solid var(--primary)',
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
                  marginBottom:   '1.5rem',
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
                  fontSize:      'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight:    700,
                  color:         'var(--dark)',
                  letterSpacing: '-0.02em',
                  lineHeight:    1.15,
                  marginBottom:  '1.1rem',
                }}>
                  {card.title}
                </h3>

                {/* Body */}
                <p style={{
                  fontSize:   '0.95rem',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  color:      'var(--muted)',
                  maxWidth:   480,
                }}>
                  {card.body}
                </p>

                {/* Decorative ruled lines (desktop only) */}
                <div className="sc-rules" style={{
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

          {/* Progress dots — desktop only */}
          <div className="sc-dots" style={{
            marginTop:      '2.5rem',
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

        </div>
      </div>

      <style>{`
        @keyframes cardFloat {
          from { transform: translateY(0px);  }
          to   { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  )
}
