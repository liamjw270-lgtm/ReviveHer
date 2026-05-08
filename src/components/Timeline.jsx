/**
 * Timeline — vertical timeline with growing line via GSAP ScrollTrigger.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

export default function Timeline() {
  const containerRef = useRef(null)
  const lineRef      = useRef(null)

  useGSAP(() => {
    // Grow the vertical line as user scrolls
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease:   'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start:   'top 60%',
          end:     'bottom 60%',
          scrub:   0.5,
        },
      }
    )

    // Stagger each item in
    const items = containerRef.current.querySelectorAll('.timeline-item')
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1,
          x:       0,
          duration: 0.8,
          ease:    'power3.out',
          scrollTrigger: {
            trigger: item,
            start:   'top 75%',
            once:    true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="timeline" style={{
      background: 'var(--card)',
      padding:    '7rem 3rem',
      borderTop:  '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="eyebrow">What to Expect</span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 4vw, 3.2rem)',
            fontWeight:    700,
            color:         'var(--dark)',
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
          }}>
            A gentle<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>week-by-week reset</em>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position:       'absolute',
            left:           '50%',
            top:            0,
            bottom:         0,
            width:          2,
            background:     'var(--border)',
            transform:      'translateX(-50%)',
          }}>
            <div
              ref={lineRef}
              style={{
                position:     'absolute',
                top:          0,
                left:         0,
                right:        0,
                bottom:       0,
                background:   'var(--primary)',
                transformOrigin: 'top',
              }}
            />
          </div>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {content.timeline.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={i}
                  className="timeline-item"
                  style={{
                    display:        'grid',
                    gridTemplateColumns: '1fr 60px 1fr',
                    alignItems:     'center',
                    gap:            '0',
                    padding:        '2rem 0',
                  }}
                >
                  {/* Left side */}
                  <div style={{ textAlign: 'right', paddingRight: '2.5rem', opacity: isLeft ? 1 : 0, pointerEvents: isLeft ? 'auto' : 'none' }}>
                    {isLeft && <ItemCard item={item} index={i} />}
                  </div>

                  {/* Center dot */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    <div style={{
                      width:        40,
                      height:       40,
                      borderRadius: '50%',
                      background:   'var(--bg)',
                      border:       '2px solid var(--primary)',
                      display:      'flex',
                      alignItems:   'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div style={{ textAlign: 'left', paddingLeft: '2.5rem', opacity: !isLeft ? 1 : 0, pointerEvents: !isLeft ? 'auto' : 'none' }}>
                    {!isLeft && <ItemCard item={item} index={i} />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ItemCard({ item }) {
  return (
    <div style={{
      background:   'var(--bg)',
      borderRadius: '1.25rem',
      padding:      '1.75rem',
      border:       '1px solid var(--border)',
      display:      'inline-block',
      maxWidth:     340,
      textAlign:    'left',
      boxShadow:    '0 4px 20px rgba(46,46,46,0.05)',
    }}>
      <h4 style={{
        fontFamily:    'var(--font-display)',
        fontSize:      '1.1rem',
        fontWeight:    700,
        color:         'var(--dark)',
        letterSpacing: '-0.01em',
        marginBottom:  '0.6rem',
      }}>
        {item.title}
      </h4>
      <p style={{
        fontSize:   '0.88rem',
        lineHeight: 1.7,
        fontWeight: 300,
        color:      'var(--muted)',
      }}>
        {item.text}
      </p>
    </div>
  )
}
