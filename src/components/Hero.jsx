import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

export default function Hero() {
  const heroRef    = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const line3Ref   = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const imageRef   = useRef(null)
  const badgeRef   = useRef(null)

  useGSAP(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current]

    // Set initial state
    gsap.set(lines,                    { y: '110%', opacity: 0 })
    gsap.set([subRef.current, ctaRef.current, badgeRef.current], { opacity: 0, y: 20 })
    gsap.set(imageRef.current,         { opacity: 0, x: 40, scale: 0.96 })

    const tl = gsap.timeline({ delay: 0.1 })

    // Lines stagger up
    tl.to(lines, {
      y:        0,
      opacity:  1,
      duration: 1.0,
      stagger:  0.1,
      ease:     'power3.out',
    })
    .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
    .to(imageRef.current, { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, '-=0.9')

    // Subtle parallax on scroll
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
      minHeight:      '100vh',
      paddingTop:     68,
      background:     'var(--bg)',
      display:        'flex',
      alignItems:     'center',
      position:       'relative',
      overflow:       'hidden',
    }}>
      {/* Sunrise background image — soft overlay */}
      <div style={{
        position:   'absolute',
        inset:      0,
        backgroundImage: 'url(/sunrise.jpg)',
        backgroundSize:  'cover',
        backgroundPosition: 'center 60%',
        opacity:    0.13,
        pointerEvents: 'none',
      }} />
      {/* Background texture */}
      <div style={{
        position:   'absolute',
        inset:      0,
        backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(125,158,118,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,150,142,0.07) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200,
        margin:   '0 auto',
        padding:  '5rem 3rem',
        width:    '100%',
        display:  'grid',
        gridTemplateColumns: '1fr auto',
        gap:      '4rem',
        alignItems: 'center',
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
            marginBottom:  '1.75rem',
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
                  fontSize:   'clamp(3.5rem, 7vw, 7.5rem)',
                  fontWeight: 700,
                  color:      'var(--dark)',
                }}>
                  {content.hero.headlineA}
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <span ref={line2Ref} style={{
                  display:      'block',
                  fontSize:     'clamp(3.5rem, 7vw, 7.5rem)',
                  fontWeight:   400,
                  fontStyle:    'italic',
                  color:        'var(--primary)',
                }}>
                  {content.hero.headlineGhost}
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingBottom: '0.05em' }}>
                <span ref={line3Ref} style={{
                  display:    'block',
                  fontSize:   'clamp(3.5rem, 7vw, 7.5rem)',
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
            marginTop:  '1.75rem',
            fontSize:   '1.05rem',
            lineHeight: 1.75,
            fontWeight: 300,
            color:      'var(--muted)',
            maxWidth:   520,
          }}>
            {content.hero.subtext}
          </p>

          {/* CTA row */}
          <div ref={ctaRef} style={{
            marginTop:  '2.5rem',
            display:    'flex',
            alignItems: 'center',
            gap:        '1.5rem',
            flexWrap:   'wrap',
          }}>
            <Link
              to="/buy"
              className="btn btn-sage"
              style={{ fontSize: '0.82rem', padding: '1.1rem 2.5rem' }}
            >
              {content.hero.cta} →
            </Link>
            <span style={{ fontSize: '0.78rem', color: 'var(--muted)', letterSpacing: '0.03em' }}>
              {content.hero.ctaNote}
            </span>
          </div>

          {/* Trust badges */}
          <div style={{
            marginTop:  '2.5rem',
            display:    'flex',
            alignItems: 'center',
            gap:        '1.5rem',
            flexWrap:   'wrap',
          }}>
            {['4.9★ Rating', '12,000+ Women', '30-Day Guarantee'].map(b => (
              <div key={b} style={{
                fontSize:      '0.72rem',
                fontWeight:    500,
                color:         'var(--muted)',
                letterSpacing: '0.02em',
                display:       'flex',
                alignItems:    'center',
                gap:           '0.35rem',
              }}>
                <span style={{ color: 'var(--primary)' }}>✓</span> {b}
              </div>
            ))}
          </div>
        </div>

        {/* Book image column — hidden on mobile */}
        <div className="hero-book-card" ref={imageRef}>
          {content.hero.productImage ? (
            <img
              src={content.hero.productImage}
              alt="The Peri-Menopause Reset by ReviveHer"
              style={{
                width:  420,
                display:'block',
                filter: 'drop-shadow(0 40px 60px rgba(46,46,46,0.22))',
              }}
            />
          ) : (
            <div style={{
              width:        300,
              aspectRatio:  '3/4',
              borderRadius: '1.5rem',
              background:   'linear-gradient(145deg, var(--card), rgba(125,158,118,0.15))',
              border:       '1px solid var(--border)',
              display:      'flex',
              flexDirection:'column',
              alignItems:   'center',
              justifyContent: 'center',
              gap:          '1rem',
              padding:      '2rem',
              boxShadow:    '0 32px 80px rgba(46,46,46,0.12)',
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

      {/* Scroll indicator */}
      <div style={{
        position:   'absolute',
        bottom:     '2rem',
        left:       '50%',
        transform:  'translateX(-50%)',
        display:    'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap:        '0.5rem',
        opacity:    0.4,
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: 'var(--muted)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  )
}
