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
  const kitInjected      = useRef(false)

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

  // Inject Kit script into the popup container the first time it opens.
  // We inject into the container div (NOT document.head) — injecting into
  // head causes Kit to show a global "discovery" widget instead of the form.
  useEffect(() => {
    if (!open || kitInjected.current) return
    kitInjected.current = true
    const container = document.getElementById('ep-kit-container')
    if (!container) return
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    container.appendChild(script)
  }, [open])

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

        /* Force Kit form visible and on-brand inside popup */
        #ep-kit-container [data-sv-form],
        #ep-kit-container .formkit-form {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          width: 100% !important;
        }
        #ep-kit-container .formkit-fields,
        #ep-kit-container .formkit-column {
          flex-direction: column !important;
          width: 100% !important;
        }
        #ep-kit-container .formkit-field { width: 100% !important; margin-bottom: 0.6rem !important; }
        #ep-kit-container input[type="email"],
        #ep-kit-container .formkit-input {
          display: block !important;
          width: 100% !important;
          padding: 0.85rem 1.25rem !important;
          border-radius: 99px !important;
          border: 1.5px solid rgba(46,46,46,0.18) !important;
          background: white !important;
          font-size: 1rem !important;
          color: #2e2e2e !important;
          box-sizing: border-box !important;
          -webkit-appearance: none !important;
        }
        #ep-kit-container .formkit-submit,
        #ep-kit-container button[type="submit"] {
          display: block !important;
          width: 100% !important;
          padding: 0.9rem 1.5rem !important;
          border-radius: 99px !important;
          border: none !important;
          background: #7d9e76 !important;
          color: white !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          cursor: pointer !important;
          box-sizing: border-box !important;
          -webkit-appearance: none !important;
        }
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

            {/* Kit form — script is injected here on first open */}
            <div id="ep-kit-container" />

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
