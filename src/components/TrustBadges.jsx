/**
 * TrustBadges — reusable row of conversion trust chips.
 * dark   → render for dark backgrounds
 * compact → smaller chips for tight spots (e.g. under buy buttons)
 */
const BADGES = [
  { icon: '🛡️', label: '30-Day Money Back Guarantee' },
  { icon: '⚡', label: 'Instant PDF Download' },
  { icon: '🔒', label: 'Secure Checkout' },
]

export default function TrustBadges({ dark = false, compact = false, style = {} }) {
  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            compact ? '0.5rem' : '0.6rem',
      flexWrap:       'wrap',
      ...style,
    }}>
      {BADGES.map(b => (
        <div key={b.label} style={{
          display:      'inline-flex',
          alignItems:   'center',
          gap:          '0.4rem',
          padding:      compact ? '0.35rem 0.75rem' : '0.5rem 0.95rem',
          borderRadius: 99,
          background:   dark ? 'rgba(255,255,255,0.06)' : 'rgba(125,158,118,0.1)',
          border:       dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(125,158,118,0.22)',
        }}>
          <span style={{ fontSize: compact ? '0.7rem' : '0.8rem', lineHeight: 1 }}>{b.icon}</span>
          <span style={{
            fontSize:      compact ? '0.62rem' : '0.7rem',
            fontWeight:    600,
            letterSpacing: '0.03em',
            whiteSpace:    'nowrap',
            color:         dark ? 'rgba(255,255,255,0.75)' : 'var(--dark)',
          }}>
            {b.label}
          </span>
        </div>
      ))}
    </div>
  )
}
