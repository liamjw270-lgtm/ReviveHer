/**
 * Marquee — infinite horizontal ticker strip.
 * Duplicates its items twice and slides the track -50% on a loop.
 * `reverse` flips direction; `dark` flips the palette.
 */
const DEFAULT_ITEMS = [
  'Sleep better',
  'Calm your nervous system',
  'Clear the brain fog',
  'Steady your mood',
  'Ease hot flushes',
  'Feel like yourself again',
]

export default function Marquee({ items = DEFAULT_ITEMS, dark = false, reverse = false, speed = 28 }) {
  const doubled = [...items, ...items]

  return (
    <div style={{
      overflow:   'hidden',
      background: dark ? 'var(--dark-bg)' : 'var(--primary)',
      borderTop:    dark ? '1px solid rgba(255,255,255,0.07)' : 'none',
      borderBottom: dark ? '1px solid rgba(255,255,255,0.07)' : 'none',
      padding:    '1.1rem 0',
      whiteSpace: 'nowrap',
      position:   'relative',
      zIndex:     2,
    }}>
      <div style={{
        display:    'inline-flex',
        alignItems: 'center',
        animation:  `${reverse ? 'marqueeRev' : 'marquee'} ${speed}s linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily:    'var(--font-display)',
              fontStyle:     'italic',
              fontSize:      'clamp(1rem, 2.4vw, 1.35rem)',
              fontWeight:    500,
              letterSpacing: '0.01em',
              color:         dark ? 'rgba(255,255,255,0.85)' : 'white',
              padding:       '0 1.4rem',
            }}>
              {item}
            </span>
            <span style={{
              fontSize: '0.7rem',
              color:    dark ? 'var(--primary)' : 'rgba(255,255,255,0.55)',
            }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
