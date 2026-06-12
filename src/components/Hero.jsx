import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'
import TrustBadges from './TrustBadges'

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

  useGSAP(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current]

    gsap.set(lines, { y: '110%', opacity: 0 })
    gsap.set([subRef.current, ctaRef.current, badgeRef.current, trustRef.current], { opacity: 0, y: 20 })
    gsap.set(imageRef.current, { opacity: 0, x: 40, scale: 0.96 })
    gsap.set(mobileImgRef.current, { opacity: 0, y: 24, scale: 0.95 })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to(lines, {
      y:        0,
      opacity:  1,
      duration: 1.0,
      stagger:  0.1,
      ease:     'power3.out',
    })
    .to(subRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(mobileImgRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(trustRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
    .to(imageRef.current, { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, '-=0.9')

    // Subtle parallax on scroll (desktop image)
    ScrollTrigger.create({
      trigger: heroRef.current,
      start:   'top top',
      end:     'bottom top',
      scrub:   1,
      onUpdate: self => {
        gsap.set(imageRef.current, { y: self.progress * 40 })
      },
    })
  }, { scope: heroRef })

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
        @media (min-width: 900px) { .hero-mobile-book { display: none; } }
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
      {/* Background texture */}
      <div style={{
        position:        'absolute',
        inset:           0,
        backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(125,158,118,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,150,142,0.07) 0%, transparent 50%)',
        pointerEvents:   'none',
      }} />

      <div style={{
        maxWidth:            1200,
        margin:              '0 auto',
        padding:             'clamp(2.5rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3rem) clamp(4.5rem, 8vw, 5rem)',
        width:               '100%',
        display:             'grid',
        gridTemplateColumns: '1fr auto',
        gap:                 '4rem',
        alignItems:          'center',
        position:            'relative',
        zIndex:              2,
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

          {/* Headline */}
          <div style={{ overflow: 'hidden', lineHeight: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <span ref={line1Ref} style={{
                  display:    'block',
                  fontSize:   'clamp(3rem, 10vw, 7.5rem)',
                  fontWeight: 700,
                  color:      'var(--dark)',
                }}>
                  {content.hero.headlineA}
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <span ref={line2Ref} style={{
                  display:    'block',
                  fontSize:   'clamp(3rem, 10vw, 7.5rem)',
                  fontWeight: 400,
                  fontStyle:  'italic',
                  color:      'var(--primary)',
                }}>
                  {content.hero.headlineGhost}
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <span ref={line3Ref} style={{
                  display:    'block',
                  fontSize:   'clamp(3rem, 10vw, 7.5rem)',
                  fontWeight: 700,
                  color:      'var(--dark)',
                }}>
                  {content.hero.headlineB}
                </span>
              </div>
            </h1>
          </div>

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

          {/* Mobile book image — between subtext and CTA */}
          <div className="hero-mobile-book" ref={mobileImgRef}>
            {content.hero.productImage && (
              <img
                src={content.hero.productImage}
                alt="The Peri-Menopause Reset by ReviveHer"
                style={{
                  width:   'min(58vw, 240px)',
                  display: 'block',
                  filter:  'drop-shadow(0 24px 40px rgba(46,46,46,0.25))',
                }}
              />
            )}
          </div>

          {/* CTA row */}
          <div ref={ctaRef} style={{ marginTop: '2rem' }}>
            {/* Stars + rating line */}
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
              <Link
                to="/buy"
                className="btn btn-sage"
                style={{ fontSize: '0.85rem', padding: '1.15rem 2.6rem' }}
              >
                {content.hero.cta} →
              </Link>
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

        {/* Book image column — hidden on mobile */}
        <div className="hero-book-card" ref={imageRef}>
          {content.hero.productImage ? (
            <img
              src={content.hero.productImage}
              alt="The Peri-Menopause Reset by ReviveHer"
              style={{
                width:   420,
                display: 'block',
                filter:  'drop-shadow(0 40px 60px rgba(46,46,46,0.22))',
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
