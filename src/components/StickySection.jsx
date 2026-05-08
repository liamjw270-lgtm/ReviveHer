/**
 * StickySection — left image stays pinned, right text blocks scroll.
 * Uses GSAP ScrollTrigger for pinning + per-block fade transitions.
 */
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

export default function StickySection() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const blocks     = content.sticky.blocks
  const [active, setActive] = useState(0)

  useGSAP(() => {
    // Pin left column while right scrolls
    ScrollTrigger.create({
      trigger:  sectionRef.current,
      start:    'top top',
      end:      `+=${blocks.length * 100}%`,
      pin:      leftRef.current,
      pinSpacing: false,
    })

    // Trigger active block index changes
    blocks.forEach((_, i) => {
      ScrollTrigger.create({
        trigger:  `.sticky-block-${i}`,
        start:    'top 55%',
        end:      'bottom 45%',
        onEnter:  () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="what-inside" style={{
      background: 'var(--bg)',
      borderTop:  '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1100,
        margin:   '0 auto',
        display:  'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}>
        {/* LEFT — sticky image */}
        <div ref={leftRef} style={{
          position:  'sticky',
          top:       0,
          height:    '100vh',
          display:   'flex',
          alignItems:'center',
          justifyContent: 'center',
          padding:   '3rem',
        }}>
          <div style={{
            width:        '100%',
            maxWidth:     460,
            borderRadius: '1.5rem',
            background:   'linear-gradient(145deg, var(--card), rgba(125,158,118,0.2))',
            border:       '1px solid var(--border)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            overflow:     'hidden',
            position:     'relative',
            boxShadow:    '0 24px 64px rgba(46,46,46,0.1)',
          }}>
            {content.sticky.image ? (
              <img src={content.sticky.image} alt="The Peri-Menopause Reset by ReviveHer" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} />
            ) : (
              <div style={{ textAlign: 'center', opacity: 0.35, padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📖</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--dark)' }}>
                  Inside the Book
                </div>
              </div>
            )}

            {/* Progress dots */}
            <div style={{
              position:  'absolute',
              right:     '1.25rem',
              top:       '50%',
              transform: 'translateY(-50%)',
              display:   'flex',
              flexDirection: 'column',
              gap:       '0.5rem',
            }}>
              {blocks.map((_, i) => (
                <div key={i} style={{
                  width:       i === active ? 8 : 6,
                  height:      i === active ? 8 : 6,
                  borderRadius:'50%',
                  background:  i === active ? 'var(--primary)' : 'rgba(46,46,46,0.2)',
                  transition:  'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scrolling blocks */}
        <div style={{ padding: '6rem 3rem 6rem 2rem' }}>
          {blocks.map((block, i) => (
            <div
              key={i}
              className={`sticky-block-${i}`}
              style={{
                minHeight:   '100vh',
                display:     'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingBottom: '2rem',
              }}
            >
              <div style={{
                opacity:    i === active ? 1 : 0.2,
                transform:  `translateY(${i === active ? 0 : 20}px)`,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}>
                <span style={{
                  display:       'block',
                  fontSize:      '0.65rem',
                  fontWeight:    600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         'var(--primary)',
                  marginBottom:  '1.25rem',
                }}>
                  {block.eyebrow}
                </span>
                <h3 style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight:    700,
                  color:         'var(--dark)',
                  letterSpacing: '-0.02em',
                  lineHeight:    1.1,
                  marginBottom:  '1.25rem',
                }}>
                  {block.title}
                </h3>
                <p style={{
                  fontSize:   '1rem',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  color:      'var(--muted)',
                  maxWidth:   440,
                }}>
                  {block.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
