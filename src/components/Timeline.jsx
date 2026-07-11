/**
 * Timeline — vertical timeline with growing line via GSAP ScrollTrigger.
 * Desktop: alternating left/right cards around a centre line.
 * Mobile:  single left rail with cards on the right (no wasted half-columns).
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { content } from '../content'

export default function Timeline() {
  const containerRef = useRef(null)
  const lineRef      = useRef(null)

  useGSAP(() => {
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

    const items = containerRef.current.querySelectorAll('.timeline-item')
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y:       0,
          duration: 0.3,
          ease:    'power2.out',
          scrollTrigger: {
            trigger: item,
            start:   'top 85%',
            once:    true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="timeline" style={{
      background: 'var(--card)',
      padding:    'clamp(4.5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      borderTop:  '1px solid var(--border)',
    }}>
      <style>{`
        /* ── Mobile: left rail ── */
        .tl-item {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 0;
          padding: 1.1rem 0;
        }
        .tl-side-l, .tl-side-r { display: none; }
        .tl-card-mobile { display: block; padding-left: 1.25rem; }
        .tl-line-wrap { left: 21px; transform: none; }

        /* ── Desktop: alternating ── */
        @media (min-width: 760px) {
          .tl-item {
            grid-template-columns: 1fr 60px 1fr;
            padding: 2rem 0;
            align-items: center;
          }
          .tl-side-l { display: block; text-align: right; padding-right: 2.5rem; }
          .tl-side-r { display: block; text-align: left;  padding-left: 2.5rem; }
          .tl-card-mobile { display: none; }
          .tl-line-wrap { left: 50%; transform: translateX(-50%); }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <span className="eyebrow">What to Expect</span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 4vw, 3.2rem)',
            fontWeight:    700,
            color:         'var(--dark)',
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
          }}>
            A gentle reset,<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>at your own pace</em>
          </h2>
          <p style={{
            marginTop:  '1rem',
            fontSize:   '0.95rem',
            color:      'var(--muted)',
            fontWeight: 300,
            maxWidth:   460,
            margin:     '1rem auto 0',
          }}>
            Not a strict program with deadlines — a guide you move through stage by stage, in whatever time feels right for you.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div className="tl-line-wrap" style={{
            position:   'absolute',
            top:        0,
            bottom:     0,
            width:      2,
            background: 'var(--border)',
          }}>
            <div
              ref={lineRef}
              style={{
                position:        'absolute',
                inset:           0,
                background:      'var(--primary)',
                transformOrigin: 'top',
              }}
            />
          </div>

          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {content.timeline.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className="timeline-item tl-item">
                  {/* Desktop left half */}
                  <div className="tl-side-l" style={{ opacity: isLeft ? 1 : 0, pointerEvents: isLeft ? 'auto' : 'none' }}>
                    {isLeft && <ItemCard item={item} />}
                  </div>

                  {/* Centre dot (mobile: left rail dot) */}
                  <div style={{
                    display:        'flex',
                    alignItems:     'flex-start',
                    justifyContent: 'center',
                    position:       'relative',
                    zIndex:         2,
                    paddingTop:     '0.25rem',
                  }}>
                    <div style={{
                      width:          40,
                      height:         40,
                      borderRadius:   '50%',
                      background:     'var(--bg)',
                      border:         '2px solid var(--primary)',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      flexShrink:     0,
                    }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Mobile card (always right of rail) */}
                  <div className="tl-card-mobile">
                    <ItemCard item={item} />
                  </div>

                  {/* Desktop right half */}
                  <div className="tl-side-r" style={{ opacity: !isLeft ? 1 : 0, pointerEvents: !isLeft ? 'auto' : 'none' }}>
                    {!isLeft && <ItemCard item={item} />}
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
      padding:      'clamp(1.25rem, 3vw, 1.75rem)',
      border:       '1px solid var(--border)',
      display:      'inline-block',
      maxWidth:     360,
      width:        '100%',
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
