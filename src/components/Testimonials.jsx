import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useGSAP(() => {
    const track   = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    // Each card is 100vw wide — distance = (n - 1) * innerWidth
    const getDistance = () => track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x:    () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger:             section,
        start:               'top top',
        end:                 () => `+=${getDistance()}`,
        pin:                 true,
        anticipatePin:       1,
        scrub:               1.2,
        invalidateOnRefresh: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        height:        '100vh',
        overflow:      'hidden',
        background:    'var(--dark-bg)',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
      }}
    >
      {/* ── Fixed header ── */}
      <div style={{
        padding:        '4rem 5rem 2rem',
        flexShrink:     0,
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'space-between',
        gap:            '2rem',
      }}>
        <div>
          <span style={{
            display:       'block',
            fontSize:      '0.65rem',
            fontWeight:    500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--secondary)',
            marginBottom:  '0.6rem',
          }}>
            What Our Readers Are Saying
          </span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 3.5vw, 3rem)',
            fontWeight:    700,
            color:         'white',
            letterSpacing: '-0.02em',
            lineHeight:    1.05,
            margin:        0,
          }}>
            Women who've{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--primary)', fontWeight: 400 }}>
              found their way back
            </em>
          </h2>
        </div>

        {/* scroll nudge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: 0.35, flexShrink: 0 }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'white' }}>
            Scroll to read
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'white', opacity: 1 - i * 0.3 }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Horizontal track — each card is 100vw ── */}
      <div
        ref={trackRef}
        style={{
          display:    'flex',
          alignItems: 'stretch',
          flex:       1,
          width:      'max-content',
          willChange: 'transform',
        }}
      >
        {content.testimonials.map((t, i) => (
          <QuoteCard key={i} quote={t.quote} index={i} total={content.testimonials.length} />
        ))}
      </div>

      {/* ── Bottom progress bar ── */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     2,
        background: 'rgba(255,255,255,0.06)',
      }}>
        <div style={{
          height:     '100%',
          width:      `${100 / content.testimonials.length}%`,
          background: 'var(--primary)',
          opacity:    0.7,
        }} />
      </div>
    </section>
  )
}

function QuoteCard({ quote, index, total }) {
  const accent = index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'

  return (
    <div style={{
      width:          '100vw',
      flexShrink:     0,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      padding:        '2rem clamp(2rem, 10vw, 10rem)',
      position:       'relative',
      borderLeft:     index > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
    }}>

      {/* Card number */}
      <div style={{
        position:      'absolute',
        top:           '1.5rem',
        right:         '2.5rem',
        fontSize:      '0.65rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color:         'rgba(255,255,255,0.2)',
      }}>
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>

      {/* Decorative quote mark */}
      <div style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(6rem, 12vw, 10rem)',
        lineHeight:    0.8,
        color:         accent,
        opacity:       0.15,
        marginBottom:  '1.5rem',
        alignSelf:     'flex-start',
        userSelect:    'none',
      }}>
        "
      </div>

      {/* Quote */}
      <blockquote style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(1.3rem, 2.4vw, 2.2rem)',
        fontWeight:    400,
        fontStyle:     'italic',
        color:         'rgba(255,255,255,0.9)',
        lineHeight:    1.65,
        letterSpacing: '-0.02em',
        maxWidth:      820,
        textAlign:     'center',
        margin:        0,
      }}>
        {quote}
      </blockquote>

      {/* Accent line beneath */}
      <div style={{
        width:        60,
        height:       2,
        background:   accent,
        marginTop:    '2.5rem',
        borderRadius: 2,
        opacity:      0.6,
      }} />
    </div>
  )
}
