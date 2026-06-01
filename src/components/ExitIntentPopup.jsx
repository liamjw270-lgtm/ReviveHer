import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'reviveher-exit-popup-shown'

export default function ExitIntentPopup() {
  const [visible,  setVisible]  = useState(false)
  const [animOut,  setAnimOut]  = useState(false)
  const scriptInjected          = useRef(false)
  const triggered               = useRef(false)
  const timerRef                = useRef(null)

  // ── Trigger (once per session) ────────────────────────────
  const trigger = () => {
    if (triggered.current) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    triggered.current = true
    clearTimeout(timerRef.current)
    setVisible(true)
  }

  // ── Dismiss with fade-out ─────────────────────────────────
  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setAnimOut(true)
    setTimeout(() => { setVisible(false); setAnimOut(false) }, 320)
  }

  // ── Inject Kit script when popup first opens ──────────────
  useEffect(() => {
    if (!visible || scriptInjected.current) return
    scriptInjected.current = true
    const container = document.getElementById('kit-popup-embed')
    if (!container) return
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    container.appendChild(script)
  }, [visible])

  // ── Attach triggers on mount ──────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return

    // 15-second fallback
    timerRef.current = setTimeout(trigger, 15000)

    // Exit intent — mouse within 20px of top edge
    const onMouseMove = (e) => { if (e.clientY < 20) trigger() }
    document.addEventListener('mousemove', onMouseMove)

    // Mobile: page-hide / visibility-change as proxy
    const onVisibility = () => { if (document.visibilityState === 'hidden') trigger() }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(timerRef.current)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  if (!visible) return null

  const fadeIn  = { animation: 'epOverlayIn 0.28s ease forwards' }
  const fadeOut = { animation: 'epOverlayOut 0.28s ease forwards' }
  const slideIn = { animation: 'epCardIn 0.32s cubic-bezier(0.16,1,0.3,1) forwards' }
  const slideOut= { animation: 'epCardOut 0.28s ease forwards' }

  return (
    <>
      <style>{`
        @keyframes epOverlayIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes epOverlayOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes epCardIn  { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes epCardOut { from { opacity: 1; transform: translateY(0) scale(1) } to { opacity: 0; transform: translateY(16px) scale(0.97) } }

        /* Kit form overrides inside popup */
        #kit-popup-embed .formkit-form {
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
        }
        #kit-popup-embed .formkit-submit {
          background: #7d9e76 !important;
          border-radius: 99px !important;
        }
        #kit-popup-embed input[type="email"] {
          border-radius: 99px !important;
          border: 1.5px solid rgba(46,46,46,0.15) !important;
          background: white !important;
        }
      `}</style>

      {/* Overlay */}
      <div
        onClick={dismiss}
        style={{
          position:   'fixed',
          inset:      0,
          background: 'rgba(30,36,32,0.72)',
          backdropFilter: 'blur(4px)',
          zIndex:     1000,
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding:    '1.5rem',
          ...(animOut ? fadeOut : fadeIn),
        }}
      >
        {/* Card — stop clicks bubbling to overlay */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background:   '#eae6de',
            borderRadius: '1.75rem',
            padding:      'clamp(2rem, 5vw, 3rem) clamp(1.75rem, 5vw, 3rem)',
            maxWidth:     520,
            width:        '100%',
            position:     'relative',
            boxShadow:    '0 32px 80px rgba(30,36,32,0.25)',
            textAlign:    'center',
            ...(animOut ? slideOut : slideIn),
          }}
        >
          {/* Close × button */}
          <button
            onClick={dismiss}
            aria-label="Close"
            style={{
              position:   'absolute',
              top:        '1.1rem',
              right:      '1.25rem',
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              fontSize:   '1.25rem',
              lineHeight: 1,
              color:      'rgba(46,46,46,0.35)',
              padding:    '0.25rem 0.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(46,46,46,0.75)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(46,46,46,0.35)'}
          >
            ×
          </button>

          {/* Gift icon */}
          <div style={{
            width:        52,
            height:       52,
            borderRadius: '50%',
            background:   'rgba(125,158,118,0.15)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            margin:       '0 auto 1.5rem',
            fontSize:     '1.5rem',
          }}>
            🎁
          </div>

          {/* Heading */}
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.6rem, 4vw, 2.1rem)',
            fontWeight:    700,
            color:         'var(--dark)',
            letterSpacing: '-0.02em',
            lineHeight:    1.2,
            marginBottom:  '0.85rem',
          }}>
            Before you go — a free gift
          </h2>

          {/* Subtext */}
          <p style={{
            fontFamily:   'var(--font-body)',
            fontSize:     '0.95rem',
            fontWeight:   300,
            lineHeight:   1.75,
            color:        'var(--muted)',
            maxWidth:     400,
            margin:       '0 auto 1.75rem',
          }}>
            Get our free checklist: <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>5 signs you're in perimenopause</strong> (and what to do about each one). Straight to your inbox.
          </p>

          {/* Kit embed */}
          <div id="kit-popup-embed" />

          {/* Dismiss link */}
          <button
            onClick={dismiss}
            style={{
              marginTop:     '1.25rem',
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              fontSize:      '0.75rem',
              color:         'rgba(46,46,46,0.38)',
              fontFamily:    'var(--font-body)',
              textDecoration:'underline',
              textUnderlineOffset: '3px',
              transition:    'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(46,46,46,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(46,46,46,0.38)'}
          >
            No thanks, I'd rather figure it out alone
          </button>

        </div>
      </div>
    </>
  )
}
