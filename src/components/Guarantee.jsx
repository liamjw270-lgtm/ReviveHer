/**
 * Guarantee elements — the site's strongest *true* trust claim, repeated so it
 * sits within one thumb-scroll of every CTA.
 *
 * GuaranteeBanner — full-width band placed directly under the hero buy button.
 * GuaranteeNote   — compact one-liner placed under every other CTA button.
 */

export function GuaranteeBanner({ style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
      marginTop: '0.85rem',
      padding: '0.95rem 1.1rem',
      background: 'rgba(125,158,118,0.14)',
      border: '1px solid rgba(125,158,118,0.35)',
      borderRadius: '0.85rem',
      textAlign: 'left',
      ...style,
    }}>
      <span style={{ fontSize: '1.35rem', lineHeight: 1, flexShrink: 0 }}>🛡️</span>
      <p style={{ margin: 0, fontSize: '0.86rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.9)', fontWeight: 400 }}>
        <strong style={{ fontWeight: 700, color: 'white' }}>Read the entire guide.</strong> If it doesn't help you,
        email us within 30 days and we'll refund every cent — no questions, no forms, no hassle.
        <strong style={{ fontWeight: 600, color: 'white' }}> You keep the bonuses.</strong>
      </p>
    </div>
  )
}

/**
 * Compact guarantee reassurance for under secondary CTAs.
 * `dark` = light text (on dark backgrounds); default suits light backgrounds.
 */
export function GuaranteeNote({ dark = false, style }) {
  const color = dark ? 'rgba(255,255,255,0.7)' : 'var(--muted)'
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
      marginTop: '0.75rem', fontSize: '0.78rem', fontWeight: 500, color,
      ...style,
    }}>
      <span aria-hidden>🛡️</span>
      30-day money-back guarantee — refund every cent, no questions asked.
    </div>
  )
}
