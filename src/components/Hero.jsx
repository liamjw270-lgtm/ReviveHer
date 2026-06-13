import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'
import TrustBadges from './TrustBadges'
import { MagneticButton, TiltCard } from './FX'

export default function Hero() {
  const heroRef    = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const line3Ref   = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const imageRef   = useRef(null)
  const badgeRef   = useRef(null)
  const trustRef   = useRef(null)
  const mobileImgRef = useRef(null)
  const scrollCueRef = useRef(null)

  useGSAP(() => {
    // Char-level reveal on each headline line
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current]
    const allChars = []
    lines.forEach(line => {
      allChars.push(...line.querySelectorAll('.hero-char'))
    })

    gsap.set(allChars, { yPercent: 120, rotateZ: 6, opacity: 0 })
    gsap.set([subRef.current, ctaRef.current, badgeRef.current, trustRef.current, scrollCueRef.current], { opacity: 0, y: 24 })
    gsap.set(imageRef.current, { opacity: 0, x: 60, rotateZ: 4, scale: 0.92 })
    gsap.set(mobileImgRef.current, { opacity: 0, y: 30, scale: 0.93 })

    const tl = gsap.timeline({ delay: 0.15 })

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to(allChars, {
        yPercent: 0,
        rotateZ:  0,
        opacity:  1,
        duration: 1.1,
        stagger:  { each: 0.024, from: 'start' },
        ease:     'power4.out',
      }, '-=0.3')
      .to(subRef.current,       { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.7')
      .to(mobileImgRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.55')
      .to(ctaRef.current,       { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(trustRef.current,     { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .to(imageRef.current,     { opacity: 1, x: 0, rotateZ: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1.0')
      .to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')

    // Parallax: image drifts down, headline drifts up slightly, on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start:   'top top',
      end:     'bottom top',
      scrub:   1,
      onUpdate: self => {
        gsap.set(imageRef.current, { y: self.progress * 60 })
        lines.forEach((line, i) => {
          gsap.set(line, { y: self.progress * -30 * (i + 1) * 0.4 })
        })
      },
    })
  }, { scope: heroRef })

  const renderChars = (text) =>
    text.split('').map((c, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
        <span className="hero-char" style={{ display: 'inline-block', willChange: 'transform' }}>
          {c === ' ' ? ' ' : c}
        </span>
      </span>
    ))

  return (
    <section ref={heroRef} style={{
      minHeight:  '100svh',
      paddingTop: 68,
      background: 'var(--bg)',
      display:    'flex',
      alignItems: 'center',
      position:   'relative',
      overflow:   'hidden',
    }}>
      <style>{`
        .hero-mobile-book { display: flex; justify-content: center; margin-top: 2rem; }
        @media (min-width: 768px) { .hero-mobile-book { display: none; } }
      `}</style>

      {/* Sunrise background image — soft overlay */}
      <div style={{
        position:           'absolute',
        inset:              0,
        backgroundImage:    'url(/sunrise.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center 60%',
        opacity:            0.13,
        pointerEvents:      'none',
      }} />

      {/* Aurora blobs — slow drifting colour fields */}
      <div aria-hidden style={{
        position: 'absolute', top: '-12%', right: '-8%',
        width: 'min(60vw, 640px)', height: 'min(60vw, 640px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(125,158,118,0.22) 0%, transparent 65%)',
        filter: 'blur(40px)',
        animation: 'auroraDrift 16s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '-15%', left: '-10%',
        width: 'min(55vw, 560px)', height: 'min(55vw, 560px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,150,142,0.2) 0%, transparent 65%)',
        filter: 'blur(40px)',
        animation: 'auroraDrift 20s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '30%', left: '35%',
        width: 'min(40vw, 420px)', height: 'min(40vw, 420px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,178,138,0.16) 0%, transparent 65%)',
        filter: 'blur(50px)',
        animation: 'auroraDrift 24s ease-in-out 4s infinite',
        pointerEvents: 'none',
      }} />

      <div className="hero-grid" style={{
        maxWidth: 1200,
        margin:   '0 auto',
        padding:  'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(4.5rem, 8vw, 5rem)',
        width:    '100%',
        position: 'relative',
        zIndex:   2,
      }}>
        {/* Text column */}
        <div>
          {/* Eyebrow */}
          <div ref={badgeRef} style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           '0.5rem',
            background:    'rgba(125,158,118,0.12)',
            border:        '1px solid rgba(125,158,118,0.25)',
            borderRadius:  99,
            padding:       '0.4rem 1rem',
            fontSize:      '0.7rem',
            fontWeight:    500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color:         'var(--primary)',
            marginBottom:  '1.5rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }} />
            Evidence-Based · Women-First
          </div>

          {/* Headline — char-split reveal */}
          <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
            <div ref={line1Ref} style={{
              fontSize:   'clamp(3rem, 10vw, 7.5rem)',
              fontWeight: 700,
              color:      'var(--dark)',
              paddingBottom: '0.05em',
            }}>
              {renderChars(content.hero.headlineA)}
            </div>
            <div ref={line2Ref} style={{
              fontSize:   'clamp(3rem, 10vw, 7.5rem)',
              fontWeight: 400,
              fontStyle:  'italic',
              color:      'var(--primary)',
              paddingBottom: '0.05em',
            }}>
              {renderChars(content.hero.headlineGhost)}
            </div>
            <div ref={line3Ref} style={{
              fontSize:   'clamp(3rem, 10vw, 7.5rem)',
              fontWeight: 700,
              color:      'var(--dark)',
              paddingBottom: '0.05em',
            }}>
              {renderChars(content.hero.headlineB)}
            </div>
          </h1>

          {/* Subtext */}
          <p ref={subRef} style={{
            marginTop:  '1.5rem',
            fontSize:   'clamp(0.98rem, 2.5vw, 1.05rem)',
            lineHeight: 1.75,
            fontWeight: 300,
            color:      'var(--muted)',
            maxWidth:   520,
          }}>
            {content.hero.subtext}
          </p>

          {/* Mobile book image */}
          <div className="hero-mobile-book" ref={mobileImgRef}>
            {content.hero.productImage && (
              <img
                src={content.hero.productImage}
                alt="The Peri-Menopause Reset by ReviveHer"
                style={{
                  width:   'min(58vw, 240px)',
                  display: 'block',
                  filter:  'drop-shadow(0 24px 40px rgba(46,46,46,0.25))',
                  animation: 'bookFloat 4s ease-in-out infinite alternate',
                }}
              />
            )}
          </div>

          {/* CTA row */}
          <div ref={ctaRef} style={{ marginTop: '2rem' }}>
            <div style={{
              display:      'flex',
              alignItems:   'center',
              gap:          '0.6rem',
              marginBottom: '1rem',
            }}>
              <span style={{ fontSize: '1.05rem', letterSpacing: '0.08em', color: '#f4b942' }}>★★★★★</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>
                Loved by readers across Australia
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
              <MagneticButton>
                <Link
                  to="/buy"
                  className="btn btn-sage"
                  style={{ fontSize: '0.85rem', padding: '1.15rem 2.6rem' }}
                >
                  {content.hero.cta} →
                </Link>
              </MagneticButton>
              <span style={{
                fontSize:      '1rem',
                fontWeight:    600,
                color:         'var(--dark)',
                letterSpacing: '0.01em',
              }}>
                {content.hero.ctaNote}
              </span>
            </div>
          </div>

          {/* Trust badges */}
          <div ref={trustRef} style={{ marginTop: '1.75rem' }}>
            <TrustBadges style={{ justifyContent: 'flex-start' }} compact />
          </div>
        </div>

        {/* Book image column — desktop, floating + tilting */}
        <div className="hero-book-card" ref={imageRef}>
          <TiltCard max={10}>
            {content.hero.productImage ? (
              <img
                src={content.hero.productImage}
                alt="The Peri-Menopause Reset by ReviveHer"
                style={{
                  width:   'clamp(240px, 32vw, 420px)',
                  display: 'block',
                  filter:  'drop-shadow(0 40px 60px rgba(46,46,46,0.22))',
                  animation: 'bookFloat 5s ease-in-out infinite alternate',
                }}
              />
            ) : (
              <div style={{
                width:         300,
                aspectRatio:   '3/4',
                borderRadius:  '1.5rem',
                background:    'linear-gradient(145deg, var(--card), rgba(125,158,118,0.15))',
                border:        '1px solid var(--border)',
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                justifyContent:'center',
                gap:           '1rem',
                padding:       '2rem',
                boxShadow:     '0 32px 80px rgba(46,46,46,0.12)',
              }}>
                <div style={{ width: 64, height: 80, background: 'var(--primary)', borderRadius: '0.5rem', opacity: 0.3 }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>
                    The Peri-Menopause Reset
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>ReviveHer</div>
                </div>
              </div>
            )}
          </TiltCard>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={scrollCueRef} style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        pointerEvents: 'none',
        zIndex: 3,
      }}>
        <span style={{
          fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--muted)', fontWeight: 500,
        }}>Scroll</span>
        <div style={{ animation: 'scrollPulse 1.6s ease-in-out infinite' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Free guide banner — bottom of hero */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('reviveher:open-popup'))}
        style={{
          position:      'absolute',
          bottom:        0,
          left:          0,
          right:         0,
          zIndex:        3,
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          gap:           '0.6rem',
          background:    'rgba(125,158,118,0.12)',
          borderTop:     '1px solid rgba(125,158,118,0.2)',
          backdropFilter:'blur(8px)',
          padding:       '0.75rem 1.5rem',
          cursor:        'pointer',
          border:        'none',
          width:         '100%',
          transition:    'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(125,158,118,0.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(125,158,118,0.12)'}
      >
        <span style={{ fontSize: '1rem' }}>🎁</span>
        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '0.78rem',
          fontWeight:    600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         'var(--primary)',
        }}>
          Get your free perimenopause guide
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--primary)', opacity: 0.7 }}>→</span>
      </button>

    </section>
  )
}
