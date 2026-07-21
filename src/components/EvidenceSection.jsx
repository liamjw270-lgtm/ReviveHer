/**
 * EvidenceSection — trust / credibility block. Replaces the old placeholder
 * author block with publish-ready copy that signals the guide is grounded in
 * science and clinical guidance.
 *
 * Copy is kept honest and defensible (health claims): it says the guide draws
 * on peer-reviewed research and aligns with clinical guidance — it does NOT
 * claim endorsement by any specific named clinic or person. Review before
 * publishing to make sure every line matches how the guide was actually made.
 *
 * `dark` renders on the dark background (buy page); default is light (homepage).
 */
const POINTS = [
  { icon: '🔬', title: 'Built on published research', desc: 'The guide draws on publicly available studies on sleep, stress, nutrition and hormones during perimenopause.' },
  { icon: '📖', title: 'Plain English', desc: 'That research, translated into calm, practical steps you can actually follow — no jargon, no fads.' },
  { icon: '🌿', title: 'Gentle & safe', desc: 'Sustainable strategies designed to work alongside your doctor’s care — never to replace it.' },
]

const STATS = [
  { n: '$19.99',  l: 'One-time — no subscription' },
  { n: '30 days', l: 'Money-back guarantee' },
  { n: '4.9★',    l: 'Loved by readers' },
]

export default function EvidenceSection({ dark = false }) {
  const heading  = dark ? 'white' : 'var(--dark)'
  const body     = dark ? 'rgba(255,255,255,0.6)' : 'var(--muted)'
  const bg       = dark ? 'var(--dark-bg)' : 'var(--card)'
  const cardBg   = dark ? 'rgba(255,255,255,0.04)' : 'var(--bg)'
  const line     = dark ? 'rgba(255,255,255,0.1)' : 'var(--border)'

  return (
    <section style={{ background: bg, padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)', borderTop: `1px solid ${line}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.25rem, 5vw, 3.25rem)' }}>
          <span style={{
            display: 'block', fontSize: '0.68rem', fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--primary)', marginBottom: '0.85rem',
          }}>
            The Science
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700,
            color: heading, letterSpacing: '-0.02em', lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Grounded in science,<br />not fads
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.98rem',
            fontWeight: 300, lineHeight: 1.7, color: body,
            maxWidth: 580, margin: '0 auto',
          }}>
            Built on published research — the guide draws on publicly available studies on
            sleep, stress, nutrition and hormones during perimenopause, translated into calm,
            practical steps you can actually use.
          </p>
        </div>

        {/* Trust cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: 'clamp(2rem, 5vw, 3rem)',
        }}>
          {POINTS.map((p, i) => (
            <div key={i} style={{
              background: cardBg, border: `1px solid ${line}`,
              borderRadius: '1.1rem', padding: '1.5rem 1.4rem', height: '100%',
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.7rem' }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', color: heading, marginBottom: '0.4rem' }}>{p.title}</div>
              <div style={{ fontSize: '0.86rem', color: body, lineHeight: 1.6, fontWeight: 300 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Stat strip */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'clamp(1.5rem, 5vw, 3rem)', flexWrap: 'wrap',
          padding: '1.5rem', background: cardBg,
          border: `1px solid ${line}`, borderRadius: '1.1rem',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, color: heading, letterSpacing: '-0.02em' }}>{s.n}</div>
              <div style={{ fontSize: '0.74rem', color: body, marginTop: '0.2rem' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Honest footnote */}
        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontSize: '0.76rem', lineHeight: 1.6, fontWeight: 300,
          color: dark ? 'rgba(255,255,255,0.35)' : 'var(--muted)',
          maxWidth: 560, marginLeft: 'auto', marginRight: 'auto',
        }}>
          Educational content only — not medical advice. Always consult your healthcare provider.
        </p>

      </div>
    </section>
  )
}
