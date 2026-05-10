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
    const mm = gsap.matchMedia()

    // Desktop only — pin the image while steps scroll
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger:    sectionRef.current,
        start:      'top top',
        end:        `+=${blocks.length * 100}%`,
        pin:        leftRef.current,
        pinSpacing: false,
      })
    })

    // All viewports — track which block is active
    blocks.forEach((_, i) => {
      ScrollTrigger.create({
        trigger:     `.sticky-block-${i}`,
        start:       'top 60%',
        end:         'bottom 40%',
        onEnter:     () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="what-inside" style={{
      background: 'var(--bg)',
      borderTop:  '1px solid var(--border)',
    }}>

      <style>{`
        /* ── Desktop ─────────────────────────────── */
        .sticky-layout {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }
        .sticky-left {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
        }
        .sticky-image-wrap {
          width: 100%;
          max-width: 460px;
          border-radius: 1.5rem;
          background: linear-gradient(145deg, var(--card), rgba(125,158,118,0.2));
          border: 1px solid var(--border);
          overflow: hidden;
          position: relative;
          box-shadow: 0 24px 64px rgba(46,46,46,0.1);
        }
        .sticky-image-wrap img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }
        .sticky-right {
          padding: 6rem 3rem 6rem 2rem;
        }
        .sticky-block {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: 2rem;
        }

        /* ── Mobile ──────────────────────────────── */
        @media (max-width: 767px) {
          .sticky-layout { display: block; min-height: auto; }

          /* Image is static — sits above the card stack */
          .sticky-left {
            position: relative;
            height: 45vh;
            padding: 0;
            z-index: 10;
          }
          .sticky-image-wrap {
            width: 100%;
            max-width: 100%;
            height: 100%;
            border-radius: 0;
            border: none;
            box-shadow: none;
          }
          .sticky-image-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 40%;
          }
          .sticky-progress-dots { display: none !important; }

          /* Cards stack and each fills the full viewport below the nav */
          .sticky-right {
            position: relative;
            padding: 0;
            background: transparent;
          }
          .sticky-block {
            position: sticky;
            top: 68px;
            height: calc(100vh - 68px);
            min-height: auto;
            padding: 3rem 1.75rem 2rem;
            background: var(--bg);
            border-radius: 1.5rem 1.5rem 0 0;
            border: none;
            border-top: 1px solid var(--border);
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 -8px 32px rgba(46,46,46,0.1);
          }
          .sticky-block:nth-child(1) { z-index: 21; }
          .sticky-block:nth-child(2) { z-index: 22; }
          .sticky-block:nth-child(3) { z-index: 23; }
          .sticky-block:nth-child(4) { z-index: 24; }

          /* Always fully visible on mobile */
          .sticky-block-content {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="sticky-layout">

        {/* LEFT — sticky image */}
        <div ref={leftRef} className="sticky-left">
          <div className="sticky-image-wrap">
            {content.sticky.image ? (
              <img src={content.sticky.image} alt="The Peri-Menopause Reset by ReviveHer" />
            ) : (
              <div style={{ textAlign: 'center', opacity: 0.35, padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📖</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--dark)' }}>
                  Inside the Book
                </div>
              </div>
            )}

            <div className="sticky-progress-dots" style={{
              position:      'absolute',
              right:         '1.25rem',
              top:           '50%',
              transform:     'translateY(-50%)',
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.5rem',
            }}>
              {blocks.map((_, i) => (
                <div key={i} style={{
                  width:        i === active ? 8 : 6,
                  height:       i === active ? 8 : 6,
                  borderRadius: '50%',
                  background:   i === active ? 'var(--primary)' : 'rgba(46,46,46,0.2)',
                  transition:   'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — scrolling blocks */}
        <div className="sticky-right">
          {blocks.map((block, i) => (
            <div key={i} className={`sticky-block sticky-block-${i}`}>
              <div
                className="sticky-block-content"
                style={{
                  opacity:    i === active ? 1 : 0.2,
                  transform:  `translateY(${i === active ? 0 : 20}px)`,
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
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
