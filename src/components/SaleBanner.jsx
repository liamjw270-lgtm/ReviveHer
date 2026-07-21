/**
 * SaleBanner — slim fixed bar at the very top of the page that cycles through
 * a few sale messages with a soft fade. Sits above the nav (which is offset
 * down to make room). Render once near the top of the app/home tree.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { content } from '../content'

export const SALE_BANNER_HEIGHT = 40

const MESSAGES = [
  `📘 The Peri-Menopause Reset + 4 bonuses — now only ${content.pricing.price}`,
  `✨ Over ${content.pricing.bonusValue} of guides & tools, yours for ${content.pricing.price}`,
  `⚡ Instant download · 30-day money-back guarantee`,
]

export default function SaleBanner() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setI(prev => (prev + 1) % MESSAGES.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <Link
      to="/buy"
      aria-label="Shop the sale"
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         210,
        height:         SALE_BANNER_HEIGHT,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '0 1rem',
        background:     'linear-gradient(90deg, var(--primary), var(--secondary))',
        color:          'white',
        overflow:       'hidden',
        textDecoration: 'none',
      }}
    >
      {/* Soft moving sheen */}
      <span aria-hidden style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
        backgroundSize: '200% 100%',
        animation:  'saleSheen 6s linear infinite',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', height: '1.2em', overflow: 'hidden', width: '100%', maxWidth: 720 }}>
        {MESSAGES.map((m, idx) => (
          <span
            key={idx}
            style={{
              position:      'absolute',
              inset:         0,
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              textAlign:     'center',
              whiteSpace:    'nowrap',
              fontSize:      'clamp(0.58rem, 2.7vw, 0.78rem)',
              fontWeight:    700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              opacity:       idx === i ? 1 : 0,
              transform:     idx === i ? 'translateY(0)' : 'translateY(-100%)',
              transition:    'opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </Link>
  )
}
