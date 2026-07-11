/**
 * Testimonials — responsive snap-scroll carousel with named reviews.
 *
 * Mobile:  swipeable card carousel with scroll-snap + dot indicators.
 * Desktop: same track shows ~2.5 cards, draggable scroll, arrow buttons.
 * Replaces the old GSAP horizontal pin (broken UX on touch devices).
 */
import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { content } from '../content'

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const [active, setActive] = useState(0)
  const count = content.testimonials.length

  // Track active card via scroll position
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const card = track.children[0]
      if (!card) return
      const cardW = card.offsetWidth + 20 // card + gap
      setActive(Math.min(count - 1, Math.round(track.scrollLeft / cardW)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [count])

  const scrollTo = (i) => {
    const track = trackRef.current
    const card  = track?.children[0]
    if (!track || !card) return
    track.scrollTo({ left: i * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  // Header reveal
  useGSAP(() => {
    gsap.from(sectionRef.current.querySelectorAll('.ts-fade'), {
      opacity: 0, y: 26, duration: 0.3, stagger: 0.06, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{
      background: 'var(--dark-bg)',
      padding:    'clamp(4.5rem, 9vw, 7rem) 0',
      position:   'relative',
      overflow:   'hidden',
    }}>
      <style>{`
        .ts-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 0 max(1.5rem, calc((100vw - 1060px) / 2));
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }
        .ts-track::-webkit-scrollbar { display: none; }
        .ts-card {
          scroll-snap-align: center;
          flex-shrink: 0;
          width: min(86vw, 460px);
        }
        @media (min-width: 900px) {
          .ts-card { width: 440px; scroll-snap-align: start; }
        }
        .ts-arrow {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: white;
          display: none;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          font-size: 1rem;
        }
        .ts-arrow:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); }
        @media (min-width: 900px) { .ts-arrow { display: inline-flex; } }
      `}</style>

      {/* Header */}
      <div style={{
        maxWidth:       1060,
        margin:         '0 auto',
        padding:        '0 1.5rem',
        display:        'flex',
        alignItems:     'flex-end',
        justifyContent: 'space-between',
        gap:            '2rem',
        marginBottom:   '2.75rem',
      }}>
        <div>
          <span className="ts-fade" style={{
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
          <h2 className="ts-fade" style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.9rem, 4.5vw, 3rem)',
            fontWeight:    700,
            color:         'white',
            letterSpacing: '-0.02em',
            lineHeight:    1.08,
            margin:        0,
          }}>
            Women who've{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--primary)', fontWeight: 400 }}>
              found their way back
            </em>
          </h2>
        </div>

        {/* Desktop arrows */}
        <div className="ts-fade" style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
          <button className="ts-arrow" aria-label="Previous review" onClick={() => scrollTo(Math.max(0, active - 1))}>←</button>
          <button className="ts-arrow" aria-label="Next review" onClick={() => scrollTo(Math.min(count - 1, active + 1))}>→</button>
        </div>
      </div>

      {/* Carousel track */}
      <div ref={trackRef} className="ts-track">
        {content.testimonials.map((t, i) => (
          <div key={i} className="ts-card">
            <div style={{
              background:   'rgba(255,255,255,0.045)',
              border:       '1px solid rgba(255,255,255,0.09)',
              borderRadius: '1.5rem',
              padding:      'clamp(1.75rem, 4vw, 2.5rem)',
              height:       '100%',
              display:      'flex',
              flexDirection:'column',
              gap:          '1.1rem',
            }}>
              {/* Stars */}
              <div style={{ color: '#f4b942', fontSize: '1rem', letterSpacing: '0.12em', lineHeight: 1 }}>
                ★★★★★
              </div>

              {/* Quote */}
              <blockquote style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.05rem, 2.2vw, 1.25rem)',
                fontWeight:    400,
                fontStyle:     'italic',
                color:         'rgba(255,255,255,0.88)',
                lineHeight:    1.65,
                letterSpacing: '-0.01em',
                margin:        0,
                flex:          1,
              }}>
                "{t.quote}"
              </blockquote>

              {/* Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: i % 2 === 0 ? 'rgba(125,158,118,0.25)' : 'rgba(201,150,142,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                  fontSize: '0.95rem', flexShrink: 0,
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginTop: '0.1rem' }}>
                    {t.detail} · Verified reader
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '0.5rem',
        marginTop:      '2rem',
      }}>
        {content.testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to review ${i + 1}`}
            onClick={() => scrollTo(i)}
            style={{
              width:        i === active ? 22 : 7,
              height:       7,
              borderRadius: 99,
              background:   i === active ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
              border:       'none',
              padding:      0,
              cursor:       'pointer',
              transition:   'all 0.35s var(--ease-expo)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
