import { useEffect, useRef, useState } from 'react'

const KEY_WELCOME = 'reviveher-welcome-shown'
const KEY_EXIT    = 'reviveher-exit-shown'

export default function ExitIntentPopup() {
  const [open,        setOpen]        = useState(null)   // null | 'welcome' | 'exit'
  const [animOut,     setAnimOut]     = useState(false)
  const [showDismiss, setShowDismiss] = useState(false)

  const welcomeTriggered = useRef(false)
  const exitTriggered    = useRef(false)
  const dismissTimer     = useRef(null)
  const openPopup = (type) => {
    if (open) return
    setOpen(type)
    setShowDismiss(false)
    dismissTimer.current = setTimeout(() => setShowDismiss(true), 3000)
  }

  const dismiss = (type) => {
    clearTimeout(dismissTimer.current)
    if (type === 'welcome') sessionStorage.setItem(KEY_WELCOME, '1')
    if (type === 'exit')    sessionStorage.setItem(KEY_EXIT, '1')
    setAnimOut(true)
    setTimeout(() => { setOpen(null); setAnimOut(false); setShowDismiss(false) }, 320)
  }


  useEffect(() => {
    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 15000)

    // Auto-show after 15s (once per session)
    let loadTimer
    if (!sessionStorage.getItem(KEY_WELCOME)) {
      loadTimer = setTimeout(() => {
        if (welcomeTriggered.current) return
        welcomeTriggered.current = true
        openPopup('welcome')
      }, 15000)
    }

    // Exit intent: mouse within 20px of top, only after 15s
    const onMouseMove = (e) => {
      if (!ready) return
      if (e.clientY < 20 && !exitTriggered.current && !sessionStorage.getItem(KEY_EXIT)) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    document.addEventListener('mousemove', onMouseMove)

    // Hero banner click → open welcome popup
    const onBannerClick = () => {
      welcomeTriggered.current = true
      openPopup('welcome')
    }
    window.addEventListener('reviveher:open-popup', onBannerClick)

    return () => {
      clearTimeout(readyTimer)
      clearTimeout(loadTimer)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('reviveher:open-popup', onBannerClick)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes epOverlayIn  { from{opacity:0} to{opacity:1} }
        @keyframes epOverlayOut { from{opacity:1} to{opacity:0} }
        @keyframes epCardIn  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes epCardOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(16px) scale(0.97)} }
        @keyframes epDismissIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        .ep-email-input {
          display: block;
          width: 100%;
          padding: 0.85rem 1.25rem;
          border-radius: 99px;
          border: 1.5px solid rgba(46,46,46,0.18);
          background: white;
          font-family: var(--font-body);
          font-size: 1rem;
          color: #2e2e2e;
          box-sizing: border-box;
          -webkit-appearance: none;
          margin-bottom: 0.6rem;
          outline: none;
        }
        .ep-email-input:focus { border-color: #7d9e76; }
        .ep-submit-btn {
          display: block;
          width: 100%;
          padding: 0.9rem 1.5rem;
          border-radius: 99px;
          border: none;
          background: #7d9e76;
          color: white;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          box-sizing: border-box;
          -webkit-appearance: none;
          transition: background 0.2s;
        }
        .ep-submit-btn:hover { background: #6a8e63; }
        .ep-submit-btn:disabled { background: #a0b89a; cursor: wait; }
      `}</style>


      {/* ── Popup — shown when open !== null ──────────────── */}
      {open && (
        <div
          onClick={() => dismiss(open)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(30,36,32,0.72)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
            animation: animOut
              ? 'epOverlayOut 0.28s ease forwards'
              : 'epOverlayIn 0.28s ease forwards',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#eae6de', borderRadius: '1.75rem',
              padding: 'clamp(2rem,5vw,3rem) clamp(1.75rem,5vw,3rem)',
              maxWidth: 520, width: '100%',
              boxShadow: '0 32px 80px rgba(30,36,32,0.25)',
              textAlign: 'center',
              animation: animOut
                ? 'epCardOut 0.28s ease forwards'
                : 'epCardIn 0.32s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            {/* Icon */}
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'rgba(125,158,118,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem', fontSize: '1.5rem',
            }}>
              {open === 'exit' ? '✋' : '🎁'}
            </div>

            {/* Heading */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem,4vw,2.1rem)',
              fontWeight: 700, color: 'var(--dark)',
              letterSpacing: '-0.02em', lineHeight: 1.2,
              marginBottom: '0.85rem',
            }}>
              {open === 'exit'
                ? 'Before you go — a free gift'
                : 'Your free perimenopause guide'}
            </h2>

            {/* Subtext */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              fontWeight: 300, lineHeight: 1.75, color: 'var(--muted)',
              maxWidth: 400, margin: '0 auto 1.75rem',
            }}>
              {open === 'exit'
                ? <>Don't leave empty-handed. Get our free checklist: <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>5 signs you're in perimenopause</strong> (and what to do about each one). Straight to your inbox.</>
                : <>Get our free checklist: <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>5 signs you're in perimenopause</strong> and what to do about each one. Free, straight to your inbox.</>
              }
            </p>

            {/* Native email form — always renders on all devices */}
            <PopupEmailForm />

            {/* Delayed dismiss link */}
            <div style={{ marginTop: '1.25rem', minHeight: '1.5rem' }}>
              {showDismiss && (
                <button
                  onClick={() => dismiss(open)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '0.75rem', color: 'rgba(46,46,46,0.38)',
                    fontFamily: 'var(--font-body)', textDecoration: 'underline',
                    textUnderlineOffset: '3px', transition: 'color 0.2s',
                    animation: 'epDismissIn 0.4s ease forwards',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(46,46,46,0.6)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(46,46,46,0.38)'}
                >
                  No thanks, I'd rather figure it out alone
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}

// ── Native form — always renders, submits to Kit via no-cors fetch ──
function PopupEmailForm() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      // no-cors sends the request without reading the response (Kit doesn't
      // need a response body — the subscription is recorded server-side)
      await fetch('https://app.kit.com/forms/c7d19d862b/subscriptions', {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    `email_address=${encodeURIComponent(email)}`,
      })
    } catch {}
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div style={{
        padding:      '1.25rem',
        background:   'rgba(125,158,118,0.12)',
        borderRadius: '0.75rem',
        textAlign:    'center',
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🌿</div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--dark)', fontWeight: 500, margin: 0 }}>
          You're in! Check your inbox.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <input
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="ep-email-input"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="ep-submit-btn"
      >
        {status === 'loading' ? 'Sending…' : 'Send me the free guide →'}
      </button>
    </form>
  )
}
