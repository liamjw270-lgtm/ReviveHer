/**
 * FreeGuideCapture — "Not ready yet?" email capture for the free perimenopause
 * guide. Reuses the same Kit form endpoint as the exit popup (form 9508175),
 * so subscribers land in the same list. Native form, no external JS to render.
 */
import { useState } from 'react'

const KIT_FORM_URL = 'https://app.kit.com/forms/9508175/subscriptions'

export default function FreeGuideCapture() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || status === 'loading') return
    setStatus('loading')
    try {
      await fetch(KIT_FORM_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    `email_address=${encodeURIComponent(email.trim())}`,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section style={{
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)',
      padding: 'clamp(3.5rem, 8vw, 5.5rem) clamp(1.5rem, 5vw, 3rem)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <span style={{
          display: 'block', fontSize: '0.68rem', fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--primary)', marginBottom: '1rem',
        }}>
          Not ready yet?
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700,
          color: 'var(--dark)', letterSpacing: '-0.02em', lineHeight: 1.15,
          marginBottom: '0.85rem',
        }}>
          Get the free guide first
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.95rem',
          fontWeight: 300, lineHeight: 1.7, color: 'var(--muted)',
          maxWidth: 400, margin: '0 auto 1.75rem',
        }}>
          Not sure yet? Get our free checklist — <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>5 signs
          you're in perimenopause</strong> and what to do about each one. Straight to your inbox, no spam.
        </p>

        {status === 'success' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(125,158,118,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
            }}>✓</div>
            <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--dark)', margin: 0 }}>
              You're in! Check your inbox for your free guide.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{
            display: 'flex', gap: '0.6rem', flexWrap: 'wrap',
            maxWidth: 440, margin: '0 auto',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              autoComplete="email"
              style={{
                flex: 1, minWidth: 200,
                padding: '0.9rem 1.25rem', borderRadius: '99px',
                border: '1.5px solid rgba(46,46,46,0.18)', background: '#fff',
                fontSize: '16px', color: 'var(--dark)', boxSizing: 'border-box',
                WebkitAppearance: 'none', appearance: 'none', outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn btn-sage"
              style={{ flexShrink: 0, cursor: status === 'loading' ? 'wait' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
            >
              {status === 'loading' ? 'Sending…' : 'Send My Free Guide'}
            </button>
            {status === 'error' && (
              <p style={{ width: '100%', fontSize: '0.78rem', color: '#b0413e', margin: '0.25rem 0 0' }}>
                Something went wrong — please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
