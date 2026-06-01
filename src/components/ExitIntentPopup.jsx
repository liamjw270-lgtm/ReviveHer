import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'reviveher-exit-popup-shown'

export default function ExitIntentPopup() {
  const [popupVisible, setPopupVisible] = useState(false)
  const [animOut,      setAnimOut]      = useState(false)
  const [tabVisible,   setTabVisible]   = useState(false)
  const [showDismiss,  setShowDismiss]  = useState(false)  // delayed "no thanks"

  const scriptInjected = useRef(false)
  const triggered      = useRef(false)
  const dismissTimer   = useRef(null)

  // ── Open popup ────────────────────────────────────────────
  const openPopup = () => {
    if (popupVisible) return
    triggered.current = true
    setTabVisible(false)
    setShowDismiss(false)
    setPopupVisible(true)
    // "No thanks" appears 3 seconds after popup opens
    dismissTimer.current = setTimeout(() => setShowDismiss(true), 3000)
  }

  // ── Auto-trigger (once per session) ──────────────────────
  const autoTrigger = () => {
    if (triggered.current) return
    if (sessionStorage.getItem(SESSION_KEY)) return
    openPopup()
  }

  // ── Dismiss popup ─────────────────────────────────────────
  const dismiss = () => {
    clearTimeout(dismissTimer.current)
    sessionStorage.setItem(SESSION_KEY, '1')
    setAnimOut(true)
    setTimeout(() => {
      setPopupVisible(false)
      setAnimOut(false)
      setShowDismiss(false)
    }, 320)
  }

  // ── Inject Kit script when popup first opens ──────────────
  useEffect(() => {
    if (!popupVisible || scriptInjected.current) return
    scriptInjected.current = true
    const container = document.getElementById('kit-popup-embed')
    if (!container) return
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    container.appendChild(script)
  }, [popupVisible])

  // ── Attach triggers on mount ──────────────────────────────
  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY)

    // Show tab after 1.5s (always, even if seen before)
    const tabTimer = setTimeout(() => setTabVisible(true), 1500)

    if (!alreadySeen) {
      // Auto-show popup after 5s on page load
      const loadTimer = setTimeout(autoTrigger, 5000)

      // Exit intent — mouse within 20px of top edge
      const onMouseMove = (e) => { if (e.clientY < 20) autoTrigger() }
      document.addEventListener('mousemove', onMouseMove)

      return () => {
        clearTimeout(loadTimer)
        clearTimeout(tabTimer)
        document.removeEventListener('mousemove', onMouseMove)
      }
    }

    return () => clearTimeout(tabTimer)
  }, [])

  return (
    <>
      <style>{`
        @keyframes epOverlayIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes epOverlayOut { from { opacity: 1 } to { opacity: 0 } }
        @keyframes epCardIn     { from { opacity: 0; transform: translateY(28px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes epCardOut    { from { opacity: 1; transform: translateY(0) scale(1) } to { opacity: 0; transform: translateY(16px) scale(0.97) } }
        @keyframes epTabIn      { from { opacity: 0; transform: translateY(-8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes epDismissIn  { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }

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

      {/* ── Sticky tab below nav ─────────────────────────── */}
      {tabVisible && !popupVisible && (
        <button
          onClick={openPopup}
          style={{
            position:      'fixed',
            top:           68,
            left:          '50%',
            transform:     'translateX(-50%)',
            zIndex:        150,
            display:       'flex',
            alignItems:    'center',
            gap:           '0.5rem',
            background:    '#7d9e76',
            color:         'white',
            border:        'none',
            borderRadius:  '0 0 2rem 2rem',
            padding:       '0.5rem 1.4rem 0.6rem',
            cursor:        'pointer',
            fontFamily:    'var(--font-body)',
            fontSize:      '0.72rem',
            fontWeight:    600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            whiteSpace:    'nowrap',
            boxShadow:     '0 4px 18px rgba(125,158,118,0.35)',
            animation:     'epTabIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#6a8e63'}
          onMouseLeave={e => e.currentTarget.style.background = '#7d9e76'}
        >
          <span style={{ fontSize: '0.85rem' }}>🎁</span>
          Get your free guide
        </button>
      )}

      {/* ── Popup ───────────────────────────────────────── */}
      {popupVisible && (
        <div
          onClick={dismiss}
          style={{
            position:       'fixed',
            inset:          0,
            background:     'rgba(30,36,32,0.72)',
            backdropFilter: 'blur(4px)',
            zIndex:         1000,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            padding:        '1.5rem',
            animation:      animOut ? 'epOverlayOut 0.28s ease forwards' : 'epOverlayIn 0.28s ease forwards',
          }}
        >
          {/* Card */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:   '#eae6de',
              borderRadius: '1.75rem',
              padding:      'clamp(2rem, 5vw, 3rem) clamp(1.75rem, 5vw, 3rem)',
              maxWidth:     520,
              width:        '100%',
              boxShadow:    '0 32px 80px rgba(30,36,32,0.25)',
              textAlign:    'center',
              animation:    animOut ? 'epCardOut 0.28s ease forwards' : 'epCardIn 0.32s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          >
            {/* Gift icon */}
            <div style={{
              width:          52,
              height:         52,
              borderRadius:   '50%',
              background:     'rgba(125,158,118,0.15)',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              margin:         '0 auto 1.5rem',
              fontSize:       '1.5rem',
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
              Get our free checklist:{' '}
              <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>
                5 signs you're in perimenopause
              </strong>{' '}
              (and what to do about each one). Straight to your inbox.
            </p>

            {/* Kit embed */}
            <div id="kit-popup-embed" />

            {/* "No thanks" — delayed 3s */}
            <div style={{
              marginTop:  '1.25rem',
              minHeight:  '1.5rem',
            }}>
              {showDismiss && (
                <button
                  onClick={dismiss}
                  style={{
                    background:          'none',
                    border:              'none',
                    cursor:              'pointer',
                    fontSize:            '0.75rem',
                    color:               'rgba(46,46,46,0.38)',
                    fontFamily:          'var(--font-body)',
                    textDecoration:      'underline',
                    textUnderlineOffset: '3px',
                    transition:          'color 0.2s',
                    animation:           'epDismissIn 0.4s ease forwards',
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
