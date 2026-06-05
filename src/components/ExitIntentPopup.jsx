import { useEffect, useRef, useState } from 'react'

const KEY_WELCOME = 'reviveher-welcome-shown'
const KEY_EXIT    = 'reviveher-exit-shown'

// Kit form submission endpoint — this is what Kit's own embedded script
// posts to when a user submits. Calling it directly means we have zero
// dependency on Kit's JS rendering, which silently fails on mobile Safari.
const KIT_FORM_URL = 'https://app.kit.com/forms/c7d19d862b/subscriptions'

export default function ExitIntentPopup() {
  const [open,        setOpen]        = useState(null)  // null | 'welcome' | 'exit'
  const [visible,     setVisible]     = useState(false)
  const [showDismiss, setShowDismiss] = useState(false)

  // Form state
  const [email,      setEmail]      = useState('')
  const [formStatus, setFormStatus] = useState('idle') // idle | loading | success | error

  const welcomeTriggered = useRef(false)
  const exitTriggered    = useRef(false)
  const dismissTimer     = useRef(null)

  const openPopup = (type) => {
    if (open) return
    setOpen(type)
    setShowDismiss(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    dismissTimer.current = setTimeout(() => setShowDismiss(true), 3000)
  }

  const dismiss = (type) => {
    clearTimeout(dismissTimer.current)
    if (type === 'welcome') sessionStorage.setItem(KEY_WELCOME, '1')
    if (type === 'exit')    sessionStorage.setItem(KEY_EXIT, '1')
    setVisible(false)
    setShowDismiss(false)
    setTimeout(() => { setOpen(null); setFormStatus('idle'); setEmail('') }, 320)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim() || formStatus === 'loading') return
    setFormStatus('loading')
    try {
      // Kit's form endpoint accepts application/x-www-form-urlencoded, which
      // is a "simple" CORS request — no preflight, works cross-origin.
      // mode: 'no-cors' means we can't read the response body, but the request
      // is sent and Kit processes the subscription successfully.
      await fetch(KIT_FORM_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    `email_address=${encodeURIComponent(email.trim())}`,
      })
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    }
  }

  useEffect(() => {
    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 15000)

    // Auto-show after 15 s — fires on both desktop and mobile
    let loadTimer
    if (!sessionStorage.getItem(KEY_WELCOME)) {
      loadTimer = setTimeout(() => {
        if (welcomeTriggered.current) return
        welcomeTriggered.current = true
        openPopup('welcome')
      }, 15000)
    }

    // Desktop exit intent: mouse near top edge, after 15 s
    const onMouseMove = (e) => {
      if (!ready) return
      if (e.clientY < 20 && !exitTriggered.current && !sessionStorage.getItem(KEY_EXIT)) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    document.addEventListener('mousemove', onMouseMove)

    // Mobile exit intent: fast scroll back to top after 15 s
    let lastScrollY = window.scrollY
    const onScroll = () => {
      if (!ready) return
      const delta = lastScrollY - window.scrollY
      lastScrollY = window.scrollY
      if (delta > 60 && window.scrollY < 80 && !exitTriggered.current && !sessionStorage.getItem(KEY_EXIT)) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Hero banner click → open welcome popup
    const onBannerClick = () => { welcomeTriggered.current = true; openPopup('welcome') }
    window.addEventListener('reviveher:open-popup', onBannerClick)

    return () => {
      clearTimeout(readyTimer)
      clearTimeout(loadTimer)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('reviveher:open-popup', onBannerClick)
    }
  }, [])

  // Input / button shared styles (inline so they're device-independent)
  const inputStyle = {
    display:       'block',
    width:         '100%',
    padding:       '0.85rem 1.25rem',
    borderRadius:  '99px',
    border:        '1.5px solid rgba(46,46,46,0.18)',
    background:    '#fff',
    // 16px is the iOS minimum to prevent Safari from auto-zooming on focus,
    // which would break the fixed-position overlay.
    fontSize:      '16px',
    color:         '#2e2e2e',
    boxSizing:     'border-box',
    WebkitAppearance: 'none',
    appearance:    'none',
    outline:       'none',
    marginBottom:  '0.55rem',
  }

  const btnStyle = {
    display:       'block',
    width:         '100%',
    // 44px minimum = Apple HIG tap target
    minHeight:     '44px',
    padding:       '0.9rem 1.5rem',
    borderRadius:  '99px',
    border:        'none',
    background:    '#7d9e76',
    color:         '#fff',
    fontSize:      '0.88rem',
    fontWeight:    600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    cursor:        formStatus === 'loading' ? 'wait' : 'pointer',
    boxSizing:     'border-box',
    WebkitAppearance: 'none',
    appearance:    'none',
    opacity:       formStatus === 'loading' ? 0.7 : 1,
    transition:    'opacity 0.2s',
  }

  return (
    <>
      <style>{`
        @keyframes epDismissIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        #ep-popup-overlay {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        #ep-popup-card {
          max-height: calc(100dvh - 3rem);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 480px) {
          #ep-popup-overlay { align-items: flex-start !important; padding: 1rem !important; }
          #ep-popup-card    { padding: 1.75rem 1.25rem !important; border-radius: 1.25rem !important; }
        }

        /* Subtle focus ring for accessibility */
        #ep-popup-card input[type="email"]:focus {
          border-color: #7d9e76 !important;
          box-shadow: 0 0 0 3px rgba(125,158,118,0.18) !important;
        }
      `}</style>

      <div
        id="ep-popup-overlay"
        onClick={() => open && dismiss(open)}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         1000,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        '1.5rem',
          background:     visible ? 'rgba(30,36,32,0.72)' : 'transparent',
          backdropFilter: visible ? 'blur(4px)'           : 'none',
          WebkitBackdropFilter: visible ? 'blur(4px)'    : 'none',
          visibility:     visible ? 'visible' : 'hidden',
          pointerEvents:  visible ? 'auto'    : 'none',
          opacity:        visible ? 1         : 0,
          transition:     'opacity 0.28s ease, background 0.28s ease',
        }}
      >
        <div
          id="ep-popup-card"
          onClick={e => e.stopPropagation()}
          style={{
            background:   '#eae6de',
            borderRadius: '1.75rem',
            padding:      'clamp(1.75rem,5vw,3rem) clamp(1.25rem,5vw,3rem)',
            maxWidth:     520,
            width:        '100%',
            boxShadow:    '0 32px 80px rgba(30,36,32,0.25)',
            textAlign:    'center',
            opacity:      visible ? 1 : 0,
            transform:    visible ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
            transition:   'opacity 0.32s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Icon */}
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'rgba(125,158,118,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem', fontSize: '1.4rem', flexShrink: 0,
          }}>
            {open === 'exit' ? '✋' : '🎁'}
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem,4vw,2.1rem)',
            fontWeight: 700, color: 'var(--dark)',
            letterSpacing: '-0.02em', lineHeight: 1.2,
            marginBottom: '0.75rem',
          }}>
            {open === 'exit' ? 'Before you go — a free gift' : 'Your free perimenopause guide'}
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            fontWeight: 300, lineHeight: 1.7, color: 'var(--muted)',
            maxWidth: 380, margin: '0 auto 1.5rem',
          }}>
            {open === 'exit'
              ? <>Don't leave empty-handed. Get our free checklist:{' '}
                  <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>5 signs you're in perimenopause</strong>
                  {' '}(and what to do about each one). Straight to your inbox.</>
              : <>Get our free checklist:{' '}
                  <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>5 signs you're in perimenopause</strong>
                  {' '}and what to do about each one. Free, straight to your inbox.</>
            }
          </p>

          {/* ── Form ── */}
          {formStatus === 'success' ? (
            <div style={{
              padding: '1.25rem 0 0.5rem',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(125,158,118,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
              }}>✓</div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem', fontWeight: 500, color: 'var(--dark)', margin: 0,
              }}>
                You're in! Check your inbox for your free guide.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%' }} noValidate>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                autoComplete="email"
                style={inputStyle}
              />
              <button type="submit" style={btnStyle}>
                {formStatus === 'loading' ? 'Sending…' : 'Get Your Free Guide →'}
              </button>
              {formStatus === 'error' && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem', color: '#b0413e',
                  marginTop: '0.5rem', marginBottom: 0,
                }}>
                  Something went wrong — please try again.
                </p>
              )}
            </form>
          )}

          {/* Delayed dismiss link */}
          <div style={{ marginTop: '1rem', minHeight: '1.5rem' }}>
            {showDismiss && formStatus !== 'success' && (
              <button
                onClick={() => dismiss(open)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.75rem', color: 'rgba(46,46,46,0.38)',
                  fontFamily: 'var(--font-body)', textDecoration: 'underline',
                  textUnderlineOffset: '3px', transition: 'color 0.2s',
                  animation: 'epDismissIn 0.4s ease forwards',
                  padding: '0.5rem',
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
    </>
  )
}
