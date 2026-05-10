import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { content } from '../content'

export default function Testimonials() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.t-card')
    if (!cards?.length) return

    gsap.from(cards, {
      opacity:  0,
      y:        40,
      duration: 0.75,
      stagger:  0.12,
      ease:     'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top 75%',
        once:    true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{
      background: 'var(--dark-bg)',
      padding:    '7rem 3rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span style={{
            display:       'block',
            fontSize:      '0.68rem',
            fontWeight:    500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'var(--secondary)',
            marginBottom:  '0.75rem',
          }}>
            What Our Readers Are Saying
          </span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 3.5vw, 3rem)',
            fontWeight:    700,
            color:         'white',
            letterSpacing: '-0.03em',
            lineHeight:    1.1,
            margin:        0,
          }}>
            Women who've<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)', fontWeight: 400 }}>
              found their way back
            </em>
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap:                 '1.5rem',
        }}>
          {content.testimonials.map((t, i) => (
            <QuoteCard key={i} quote={t.quote} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteCard({ quote, index }) {
  const accent = index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'

  return (
    <div className="t-card" style={{
      background:    'rgba(255,255,255,0.04)',
      border:        '1px solid rgba(255,255,255,0.07)',
      borderTop:     `2px solid ${accent}`,
      borderRadius:  '1.25rem',
      padding:       '2.5rem',
      display:       'flex',
      flexDirection: 'column',
      boxShadow:     '0 20px 60px rgba(0,0,0,0.25)',
    }}>

      {/* Large decorative quote mark */}
      <div style={{
        fontFamily:    'var(--font-display)',
        fontSize:      '5rem',
        lineHeight:    0.7,
        color:         accent,
        opacity:       0.25,
        marginBottom:  '1.25rem',
        userSelect:    'none',
      }}>
        "
      </div>

      {/* Quote text */}
      <blockquote style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(1rem, 1.3vw, 1.15rem)',
        fontWeight:    400,
        fontStyle:     'italic',
        color:         'rgba(255,255,255,0.88)',
        lineHeight:    1.7,
        letterSpacing: '-0.01em',
        margin:        0,
        flex:          1,
      }}>
        {quote}
      </blockquote>
    </div>
  )
}
