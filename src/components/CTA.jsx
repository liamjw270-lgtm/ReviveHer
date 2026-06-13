import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { content } from '../content'
import TrustBadges from './TrustBadges'
import { MagneticButton } from './FX'

export default function CTA() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const subRef     = useRef(null)
  const btnRef     = useRef(null)

  useGSAP(() => {
    gsap.set([headRef.current, subRef.current, btnRef.current], { opacity: 0, y: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top 75%',
        once:    true,
      },
    })

    tl.to(headRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      .to(subRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.6')
      .to(btnRef.current,  { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="buy" style={{
      background: 'var(--dark-bg)',
      padding:    'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 3rem)',
      textAlign:  'center',
      position:   'relative',
      overflow:   'hidden',
    }}>
      {/* Ghost background text */}
      <div style={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        fontSize:      'clamp(6rem, 20vw, 18rem)',
        fontFamily:    'var(--font-display)',
        fontWeight:    700,
        fontStyle:     'italic',
        color:         'rgba(255,255,255,0.03)',
        whiteSpace:    'nowrap',
        pointerEvents: 'none',
        letterSpacing: '-0.03em',
        lineHeight:    1,
        userSelect:    'none',
      }}>Revive</div>

      <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* 3D book image */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(2.25rem, 6vw, 3.5rem)' }}>
          <img
            src="/book-3d.png"
            alt="The Peri-Menopause Reset — ebook"
            style={{
              width:   'min(48vw, 220px)',
              display: 'block',
              filter:  'drop-shadow(0 30px 50px rgba(0,0,0,0.5))',
              animation: 'bookFloat 5s ease-in-out infinite alternate',
            }}
          />
        </div>

        <h2 ref={headRef} style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(2.6rem, 8vw, 7rem)',
          fontWeight:    700,
          color:         'white',
          letterSpacing: '-0.03em',
          lineHeight:    0.98,
          marginBottom:  '1.5rem',
        }}>
          {content.cta.heading.split('\n').map((line, i) => (
            <span key={i} style={{ display: 'block' }}>{line}</span>
          ))}
        </h2>

        <p ref={subRef} style={{
          color:        'rgba(255,255,255,0.4)',
          fontSize:     '1rem',
          fontWeight:   300,
          lineHeight:   1.65,
          marginBottom: '2.5rem',
        }}>
          {content.cta.subtext}
        </p>

        <div ref={btnRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
          <MagneticButton strength={0.3}>
            <Link
              to="/buy"
              className="btn btn-sage"
              style={{ fontSize: '0.85rem', padding: '1.2rem 3rem' }}
            >
              {content.cta.buttonText}
            </Link>
          </MagneticButton>
          <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
            $19.99 AUD · Instant PDF download
          </span>
          <TrustBadges dark compact />
        </div>
      </div>
    </section>
  )
}
