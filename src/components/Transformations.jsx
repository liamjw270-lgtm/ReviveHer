/**
 * Transformations — stat cards with count-up animation and scroll reveal.
 */
import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { content } from '../content'

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!active) return
    const numMatch = String(target).match(/[\d.]+/)
    if (!numMatch) { setVal(target); return }
    const num    = parseFloat(numMatch[0])
    const prefix = String(target).slice(0, numMatch.index)
    const suffix = String(target).slice(numMatch.index + numMatch[0].length)
    const start  = performance.now()

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      const cur = num < 1 ? (e * num).toFixed(1) : Math.round(e * num)
      setVal(`${prefix}${cur}${suffix}`)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target, duration])

  return val
}

function StatCard({ item, delay }) {
  const cardRef   = useRef(null)
  const [active, setActive] = useState(false)
  const count     = useCountUp(item.stat, active)

  useGSAP(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity:  1,
        y:        0,
        duration: 0.8,
        delay,
        ease:     'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start:   'top 80%',
          once:    true,
          onEnter: () => setActive(true),
        },
      }
    )
  }, { scope: cardRef })

  return (
    <div ref={cardRef} style={{
      background:   'var(--bg)',
      borderRadius: '1.5rem',
      padding:      '2.5rem 2rem',
      border:       '1px solid var(--border)',
      textAlign:    'center',
      boxShadow:    '0 4px 24px rgba(46,46,46,0.05)',
    }}>
      <div style={{
        fontFamily:    'var(--font-display)',
        fontSize:      'clamp(2.5rem, 5vw, 4rem)',
        fontWeight:    700,
        color:         'var(--primary)',
        letterSpacing: '-0.03em',
        lineHeight:    1,
        marginBottom:  '0.25rem',
      }}>
        {count || item.stat}
      </div>
      <div style={{
        fontSize:   '0.78rem',
        color:      'var(--muted)',
        fontWeight: 500,
        letterSpacing: '0.04em',
        marginBottom: '1.25rem',
      }}>
        {item.statLabel}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
        <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>
          {item.name}, {item.age}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
          {item.result}
        </div>
      </div>
    </div>
  )
}

export default function Transformations() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from(sectionRef.current.querySelectorAll('.tf-header'), {
      opacity:  0,
      y:        30,
      duration: 0.8,
      stagger:  0.1,
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
      background: 'var(--card)',
      padding:    '7rem 3rem',
      borderTop:  '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow tf-header">Real Results</span>
          <h2 className="tf-header" style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 4vw, 3.2rem)',
            fontWeight:    700,
            color:         'var(--dark)',
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
          }}>
            Women who reset<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>and never looked back</em>
          </h2>
          <p className="tf-header" style={{
            marginTop:  '1rem',
            fontSize:   '0.95rem',
            color:      'var(--muted)',
            fontWeight: 300,
            maxWidth:   480,
            margin:     '1rem auto 0',
          }}>
            Real women, real results — following the week-by-week guide.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                 '1.25rem',
          marginBottom:        '4rem',
        }}>
          {content.transformations.map((item, i) => (
            <StatCard key={i} item={item} delay={i * 0.1} />
          ))}
        </div>

        {/* Trust strip */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          gap:             '2.5rem',
          flexWrap:        'wrap',
          padding:         '2rem',
          background:      'var(--bg)',
          borderRadius:    '1.25rem',
          border:          '1px solid var(--border)',
        }}>
          {[
            { n: '12,000+', l: 'Women helped' },
            { n: '4.9★',    l: 'Average rating' },
            { n: '4 weeks', l: 'Gentle week-by-week reset' },
            { n: '100%',    l: 'Evidence-backed' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--dark)', letterSpacing: '-0.03em' }}>{s.n}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
