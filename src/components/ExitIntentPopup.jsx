import { useEffect, useRef, useState } from 'react'

const KEY_WELCOME = 'reviveher-welcome-shown'
const KEY_EXIT    = 'reviveher-exit-shown'

export default function ExitIntentPopup() {
  // which popup is open: null | 'welcome' | 'exit'
  const [open,        setOpen]        = useState(null)
  const [animOut,     setAnimOut]     = useState(false)
  const [tabVisible,  setTabVisible]  = useState(false)
  const [showDismiss, setShowDismiss] = useState(false)

  const scriptInjected = useRef({ welcome: false, exit: false })
  const welcomeTriggered = useRef(false)
  const exitTriggered    = useRef(false)
  const dismissTimer     = useRef(null)

  // ── Open a popup ─────────────────────────────────────────
  const openPopup = (type) => {
    if (open) return
    setOpen(type)
    setShowDismiss(false)
    dismissTimer.current = setTimeout(() => setShowDismiss(true), 3000)
  }

  // ── Dismiss ───────────────────────────────────────────────
  const dismiss = (type) => {
    clearTimeout(dismissTimer.current)
    if (type === 'welcome') sessionStorage.setItem(KEY_WELCOME, '1')
    if (type === 'exit')    sessionStorage.setItem(KEY_EXIT, '1')
    setAnimOut(true)
    setTimeout(() => { setOpen(null); setAnimOut(false); setShowDismiss(false) }, 320)
  }

  // ── Inject Kit script into a container (once per popup) ──
  const injectKit = (containerId, key) => {
    if (scriptInjected.current[key]) return
    scriptInjected.current[key] = true
    const container = document.getElementById(containerId)
    if (!container) return
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    container.appendChild(script)
  }

  useEffect(() => {
    if (open === 'welcome') injectKit('kit-embed-welcome', 'welcome')
    if (open === 'exit')    injectKit('kit-embed-exit',    'exit')
  }, [open])

  // ── Attach auto-triggers on mount ────────────────────────
  useEffect(() => {
    // Tab always appears after 1.5s
    const tabTimer = setTimeout(() => setTabVisible(true), 1500)

    // Welcome popup: auto after 5s (once per session)
    let loadTimer
    if (!sessionStorage.getItem(KEY_WELCOME)) {
      loadTimer = setTimeout(() => {
        if (welcomeTriggered.current) return
        welcomeTriggered.current = true
        openPopup('welcome')
      }, 5000)
    }

    // Exit intent: mouse within 20px of top (once per session)
    const onMouseMove = (e) => {
      if (e.clientY < 20 && !exitTriggered.current && !sessionStorage.getItem(KEY_EXIT)) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      clearTimeout(tabTimer)
      clearTimeout(loadTimer)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes epOverlayIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes epOverlayOut { from { opacity:1 } to { opacity:0 } }
        @keyframes epCardIn     { from { opacity:0; transform:translateY(28px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes epCardOut    { from { opacity:1; transform:translateY(0) scale(1) } to { opacity:0; transform:translateY(16px) scale(0.97) } }
        @keyframes epTabIn      { from { opacity:0; transform:translateY(-50%) rotate(180deg) translateX(48px) } to { opacity:1; transform:translateY(-50%) rotate(180deg) translateX(0) } }
        @keyframes epDismissIn  { from { opacity:0; transform:translateY(5px) } to { opacity:1; transform:translateY(0) } }

        /* ── Kit form overrides — both popups ── */
        .kit-popup-wrap .formkit-form {
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
          width: 100% !important;
        }
        /* Force form visible on mobile */
        .kit-popup-wrap [data-sv-form],
        .kit-popup-wrap .formkit-form,
        .kit-popup-wrap form,
        .kit-popup-wrap .formkit-fields,
        .kit-popup-wrap .formkit-field,
        .kit-popup-wrap .formkit-input,
        .kit-popup-wrap input[type="email"],
        .kit-popup-wrap .formkit-submit,
        .kit-popup-wrap button[type="submit"] {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          max-height: none !important;
          overflow: visible !important;
        }
        .kit-popup-wrap input[type="email"] {
          width: 100% !important;
          min-width: 0 !important;
          border-radius: 99px !important;
          border: 1.5px solid rgba(46,46,46,0.18) !important;
          background: white !important;
          padding: 0.75rem 1.25rem !important;
          font-size: 1rem !important;
          box-sizing: border-box !important;
          -webkit-appearance: none !important;
          appearance: none !important;
        }
        .kit-popup-wrap .formkit-submit,
        .kit-popup-wrap button[type="submit"] {
          width: 100% !important;
          background: #7d9e76 !important;
          color: white !important;
          border: none !important;
          border-radius: 99px !important;
          padding: 0.85rem 1.5rem !important;
          font-size: 0.9rem !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin-top: 0.6rem !important;
          -webkit-appearance: none !important;
        }
      `}</style>

      {/* ── Side tab — always visible ─────────────────────── */}
      {tabVisible && (
        <button
          onClick={() => {
            welcomeTriggered.current = true
            openPopup('welcome')
          }}
          style={{
            position:      'fixed',
            top:           '50%',
            right:         0,
            transform:     'translateY(-50%) rotate(180deg)',
            zIndex:        150,
            display:       'flex',
            alignItems:    'center',
            gap:           '0.5rem',
            background:    '#7d9e76',
            color:         'white',
            border:        'none',
            borderRadius:  '0 0 0.75rem 0.75rem',
            padding:       '0.75rem 0.6rem',
            cursor:        'pointer',
            fontFamily:    'var(--font-body)',
            fontSize:      '0.65rem',
            fontWeight:    600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace:    'nowrap',
            writingMode:   'vertical-rl',
            boxShadow:     '-4px 0 18px rgba(125,158,118,0.3)',
            animation:     'epTabIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#6a8e63'}
          onMouseLeave={e => e.currentTarget.style.background = '#7d9e76'}
        >
          <span style={{ fontSize: '0.85rem', writingMode: 'horizontal-tb' }}>🎁</span>
          Get your free guide
        </button>
      )}

      {/* ── Welcome popup (tab + auto) ───────────────────── */}
      {open === 'welcome' && (
        <Overlay animOut={animOut} onClickOutside={() => dismiss('welcome')}>
          <Card animOut={animOut}>
            <IconCircle>🎁</IconCircle>

            <h2 style={headingStyle}>
              Your free perimenopause guide
            </h2>
            <p style={subtextStyle}>
              Get our free checklist:{' '}
              <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>
                5 signs you're in perimenopause
              </strong>{' '}
              and what to do about each one. Straight to your inbox, free.
            </p>

            <div id="kit-embed-welcome" className="kit-popup-wrap" style={{ width: '100%' }} />

            <DismissButton show={showDismiss} onClick={() => dismiss('welcome')} />
          </Card>
        </Overlay>
      )}

      {/* ── Exit-intent popup ────────────────────────────── */}
      {open === 'exit' && (
        <Overlay animOut={animOut} onClickOutside={() => dismiss('exit')}>
          <Card animOut={animOut}>
            <IconCircle>✋</IconCircle>

            <h2 style={headingStyle}>
              Before you go — a free gift
            </h2>
            <p style={subtextStyle}>
              Don't leave empty-handed. Get our free checklist:{' '}
              <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>
                5 signs you're in perimenopause
              </strong>{' '}
              (and what to do about each one). Straight to your inbox.
            </p>

            <div id="kit-embed-exit" className="kit-popup-wrap" style={{ width: '100%' }} />

            <DismissButton show={showDismiss} onClick={() => dismiss('exit')} />
          </Card>
        </Overlay>
      )}
    </>
  )
}

// ── Shared sub-components ─────────────────────────────────

function Overlay({ animOut, onClickOutside, children }) {
  return (
    <div
      onClick={onClickOutside}
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
      {children}
    </div>
  )
}

function Card({ animOut, children }) {
  return (
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
      {children}
    </div>
  )
}

function IconCircle({ children }) {
  return (
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
      {children}
    </div>
  )
}

function DismissButton({ show, onClick }) {
  return (
    <div style={{ marginTop: '1.25rem', minHeight: '1.5rem' }}>
      {show && (
        <button
          onClick={onClick}
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
  )
}

const headingStyle = {
  fontFamily:    'var(--font-display)',
  fontSize:      'clamp(1.6rem, 4vw, 2.1rem)',
  fontWeight:    700,
  color:         'var(--dark)',
  letterSpacing: '-0.02em',
  lineHeight:    1.2,
  marginBottom:  '0.85rem',
}

const subtextStyle = {
  fontFamily:   'var(--font-body)',
  fontSize:     '0.95rem',
  fontWeight:   300,
  lineHeight:   1.75,
  color:        'var(--muted)',
  maxWidth:     400,
  margin:       '0 auto 1.75rem',
}
