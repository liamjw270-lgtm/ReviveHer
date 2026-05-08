/**
 * ReviewsSection — GSAP scroll-pinned horizontal scroll.
 *
 * HOW IT WORKS
 * ─────────────────────────────────────────────────────────────────────────
 * 1. The section is pinned (position: fixed) by ScrollTrigger when its
 *    top edge reaches the top of the viewport.
 *
 * 2. While pinned, the review track (a wide flex row) is translated on
 *    the x-axis from 0 → -(scrollWidth - innerWidth).
 *    This maps every pixel of vertical scroll to horizontal movement.
 *
 * 3. The ScrollTrigger `end` is set to exactly that travel distance
 *    (`+=${distance}`) so scroll space matches card travel with no gap.
 *
 * 4. Once the last card is fully visible the pin releases and normal
 *    vertical scrolling continues.
 *
 * 5. `invalidateOnRefresh: true` re-measures on window resize so the
 *    formula stays accurate across breakpoints.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'
import { content } from '../content'

// ─── Card dimensions ─────────────────────────────────────────────────────────
const CARD_W   = 400   // px — card width
const CARD_GAP = 24    // px — gap between cards
const PAD_L    = 80    // px — left padding on the track (start offset)
const PAD_R    = 80    // px — right padding on the track (end offset)

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)

  useGSAP(() => {
    const track   = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    // ── Distance the track must travel ────────────────────────────────────
    // scrollWidth  = total rendered width of the track (cards + gaps + padding)
    // innerWidth   = visible viewport width
    // distance     = how far left we push the track so the last card is fully on screen
    const getDistance = () => track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x:    () => -getDistance(),
      ease: 'none',    // linear so scrub maps 1:1 to scroll position
      scrollTrigger: {
        trigger:             section,
        start:               'top top',           // pin when section hits viewport top
        end:                 () => `+=${getDistance()}`, // extra scroll = total card travel
        pin:                 true,                // GSAP handles pinning — no CSS sticky
        anticipatePin:       1,                   // pre-measures to avoid flicker on pin
        scrub:               1.2,                 // smooth lag — higher = more cinematic
        invalidateOnRefresh: true,                // recalculate on resize
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        height:        '100vh',      // fixed viewport height — ScrollTrigger controls the rest
        overflow:      'hidden',     // clips track — does NOT break GSAP pin
        background:    'var(--dark-bg)',
        display:       'flex',
        flexDirection: 'column',
        position:      'relative',
      }}
    >

      {/* ── Section header — stays at top while track slides ── */}
      <div style={{
        padding:      '5rem 5rem 0',
        flexShrink:   0,
        display:      'flex',
        alignItems:   'flex-end',
        justifyContent: 'space-between',
        gap:          '2rem',
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
            Real Stories
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
            Women who've<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)', fontWeight: 400 }}>
              found their way back
            </em>
          </h2>
        </div>

        {/* Scroll nudge */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '0.75rem',
          opacity:    0.35,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'white' }}>
            Scroll to explore
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['', '', ''].map((_, i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'white', opacity: 1 - i * 0.3 }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Horizontal track — this is what GSAP translates ── */}
      <div
        ref={trackRef}
        style={{
          display:     'flex',
          alignItems:  'stretch',
          gap:         CARD_GAP,
          paddingLeft: PAD_L,
          paddingRight: PAD_R,
          paddingTop:  '3rem',
          paddingBottom: '4rem',
          flex:        1,
          width:       'max-content',   // overflows viewport — that's intentional
          willChange:  'transform',
        }}
      >
        {content.testimonials.map((review, i) => (
          <ReviewCard key={i} review={review} index={i} />
        ))}
      </div>

      {/* ── Bottom progress line — purely decorative ── */}
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
          width:      '30%',
          background: 'var(--primary)',
          opacity:    0.6,
        }} />
      </div>
    </section>
  )
}

// ─── Individual review card ───────────────────────────────────────────────────
function ReviewCard({ review, index }) {
  // Alternate accent colours: sage green / dusty pink
  const accent = index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'

  return (
    <div style={{
      width:        CARD_W,
      flexShrink:   0,
      background:   'rgba(255,255,255,0.04)',
      border:       '1px solid rgba(255,255,255,0.07)',
      borderTop:    `2px solid ${accent}`,
      borderRadius: '1.25rem',
      padding:      '2.5rem',
      display:      'flex',
      flexDirection:'column',
      justifyContent: 'space-between',
      boxShadow:    '0 20px 60px rgba(0,0,0,0.25)',
      // Subtle scale variation so cards feel hand-placed
      transform:    index % 3 === 1 ? 'translateY(12px)' : index % 3 === 2 ? 'translateY(-8px)' : 'none',
      transition:   'border-color 0.3s',
    }}>

      {/* Stars */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          fontSize:     '0.85rem',
          letterSpacing:'0.12em',
          color:        accent,
          marginBottom: '1.5rem',
        }}>
          {'★'.repeat(review.stars)}
        </div>

        {/* Quote */}
        <blockquote style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1rem, 1.4vw, 1.2rem)',
          fontWeight:    400,
          fontStyle:     'italic',
          color:         'rgba(255,255,255,0.85)',
          lineHeight:    1.65,
          letterSpacing: '-0.01em',
          margin:        0,
        }}>
          "{review.quote}"
        </blockquote>
      </div>

      {/* Author */}
      <div>
        <div style={{
          height:       1,
          background:   'rgba(255,255,255,0.08)',
          marginBottom: '1.5rem',
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Avatar */}
          <div style={{
            width:          44,
            height:         44,
            borderRadius:   '50%',
            background:     `${accent}22`,
            border:         `1.5px solid ${accent}55`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontFamily:     'var(--font-display)',
            fontSize:       '1rem',
            fontWeight:     700,
            color:          accent,
            flexShrink:     0,
          }}>
            {review.author.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
              {review.author}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.38)', marginTop: '0.2rem' }}>
              {review.meta}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
