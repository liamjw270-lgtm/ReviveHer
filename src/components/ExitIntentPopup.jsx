import { useEffect, useRef, useState } from 'react'

const KEY_WELCOME = 'reviveher-welcome-shown'
const KEY_EXIT    = 'reviveher-exit-shown'

export default function ExitIntentPopup() {
  const [open,        setOpen]        = useState(null)   // null | 'welcome' | 'exit'
  const [visible,     setVisible]     = useState(false)
  const [showDismiss, setShowDismiss] = useState(false)

  const welcomeTriggered = useRef(false)
  const exitTriggered    = useRef(false)
  const dismissTimer     = useRef(null)
  const kitInjected      = useRef(false)

  // ── Inject Kit script once on mount ──────────────────────────────────────
  // #ep-kit-container is always in the DOM (overlay uses visibility:hidden,
  // not display:none) so Kit finds it immediately, renders the full form,
  // and attaches submit handlers — all before the popup is ever shown.
  useEffect(() => {
    if (kitInjected.current) return
    kitInjected.current = true
    const container = document.getElementById('ep-kit-container')
    if (!container) return
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    container.appendChild(script)
  }, [])

  const openPopup = (type) => {
    if (open) return
    setOpen(type)
    setShowDismiss(false)
    // Double-rAF ensures CSS transition fires after visibility change
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
    dismissTimer.current = setTimeout(() => setShowDismiss(true), 3000)
  }

  const dismiss = (type) => {
    clearTimeout(dismissTimer.current)
    if (type === 'welcome') sessionStorage.setItem(KEY_WELCOME, '1')
    if (type === 'exit')    sessionStorage.setItem(KEY_EXIT, '1')
    setVisible(false)
    setShowDismiss(false)
    setTimeout(() => setOpen(null), 320)
  }

  useEffect(() => {
    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 15000)

    // ── Auto-show after 15 s — fires on BOTH desktop and mobile ──────────
    let loadTimer
    if (!sessionStorage.getItem(KEY_WELCOME)) {
      loadTimer = setTimeout(() => {
        if (welcomeTriggered.current) return
        welcomeTriggered.current = true
        openPopup('welcome')
      }, 15000)
    }

    // ── Desktop exit intent: mouse near top edge, after 15 s ─────────────
    const onMouseMove = (e) => {
      if (!ready) return
      if (e.clientY < 20 && !exitTriggered.current && !sessionStorage.getItem(KEY_EXIT)) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    document.addEventListener('mousemove', onMouseMove)

    // ── Mobile exit intent: fast scroll back to top after 15 s ───────────
    let lastScrollY = window.scrollY
    const onScroll = () => {
      if (!ready) return
      const delta = lastScrollY - window.scrollY  // positive = scrolling up
      lastScrollY = window.scrollY
      if (
        delta > 60 &&
        window.scrollY < 80 &&
        !exitTriggered.current &&
        !sessionStorage.getItem(KEY_EXIT)
      ) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Hero banner click → open welcome popup ────────────────────────────
    const onBannerClick = () => {
      welcomeTriggered.current = true
      openPopup('welcome')
    }
    window.addEventListener('reviveher:open-popup', onBannerClick)

    return () => {
      clearTimeout(readyTimer)
      clearTimeout(loadTimer)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('reviveher:open-popup', onBannerClick)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes epDismissIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        /*
         * ── Kit form overrides ─────────────────────────────────────────────
         *
         * Kit injects its own CSS. We must override every layer:
         *   - The form wrapper (display, overflow, min/max width)
         *   - The fields container (flex direction)
         *   - Individual inputs (font-size MUST be 16px on iOS — any smaller
         *     triggers Safari auto-zoom which breaks position:fixed overlays)
         *   - The submit button (tap target, appearance reset)
         *
         * All selectors scoped to #ep-kit-container so they don't bleed.
         */

        #ep-kit-container {
          display: block !important;
          width: 100% !important;
          min-width: 0 !important;
          overflow: visible !important;
        }

        #ep-kit-container > * {
          max-width: 100% !important;
          min-width: 0 !important;
          box-sizing: border-box !important;
        }

        #ep-kit-container [data-sv-form],
        #ep-kit-container .formkit-form {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          overflow: visible !important;
          /* Disable Kit's own slide-in animation which can freeze on mobile */
          animation: none !important;
          transform: none !important;
        }

        /* ── Fields / layout containers ── */
        #ep-kit-container .formkit-fields,
        #ep-kit-container .formkit-column,
        #ep-kit-container .formkit-row,
        #ep-kit-container .seva-fields {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          gap: 0.5rem !important;
          box-sizing: border-box !important;
        }

        /* ── Individual field wrapper ── */
        #ep-kit-container .formkit-field,
        #ep-kit-container .seva-field {
          display: block !important;
          visibility: visible !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
        }

        /* ── Email input ── */
        #ep-kit-container input[type="email"],
        #ep-kit-container input[type="text"],
        #ep-kit-container .formkit-input {
          display: block !important;
          visibility: visible !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          /* 16px minimum prevents iOS Safari auto-zoom on focus */
          font-size: 16px !important;
          padding: 0.85rem 1.25rem !important;
          border-radius: 99px !important;
          border: 1.5px solid rgba(46,46,46,0.18) !important;
          background: #fff !important;
          color: #2e2e2e !important;
          box-sizing: border-box !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          margin: 0 !important;
          /* Prevent iOS from rounding inputs */
          border-radius: 99px !important;
        }

        /* ── Submit button ── */
        #ep-kit-container .formkit-submit,
        #ep-kit-container button[type="submit"],
        #ep-kit-container input[type="submit"] {
          display: block !important;
          visibility: visible !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          /* 44px minimum = Apple HIG touch target */
          min-height: 44px !important;
          padding: 0.9rem 1.5rem !important;
          border-radius: 99px !important;
          border: none !important;
          background: #7d9e76 !important;
          color: #fff !important;
          font-size: 0.9rem !important;
          font-weight: 600 !important;
          letter-spacing: 0.05em !important;
          text-transform: uppercase !important;
          cursor: pointer !important;
          box-sizing: border-box !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          margin: 0 !important;
        }

        /* ── Hide Kit chrome we don't need inside popup ── */
        #ep-kit-container .formkit-powered-by-convertkit-container,
        #ep-kit-container .formkit-guarantee,
        #ep-kit-container h1,
        #ep-kit-container h2,
        #ep-kit-container p.formkit-subheader {
          display: none !important;
        }

        /* ── Overlay & card layout ── */
        #ep-popup-overlay {
          /* overflow-y:auto lets the card scroll when the iOS keyboard
             opens and shrinks the visible viewport */
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        #ep-popup-card {
          /* Prevent card from exceeding viewport height; allow internal
             scroll so Kit form is always reachable */
          max-height: calc(100dvh - 3rem);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        @media (max-width: 480px) {
          #ep-popup-overlay {
            /* Align card to top on small screens so keyboard doesn't push
               it off-screen */
            align-items: flex-start !important;
            padding: 1rem !important;
          }
          #ep-popup-card {
            /* Tighter padding on small phones */
            padding: 1.75rem 1.25rem !important;
            border-radius: 1.25rem !important;
          }
        }
      `}</style>

      {/*
       * ── Overlay ────────────────────────────────────────────────────────
       *
       * IMPORTANT: we use visibility + pointer-events (not display:none) to
       * hide the overlay when closed. display:none removes the node from
       * layout entirely — Kit then can't compute the container width and
       * renders form inputs with 0px width on mobile. Keeping display:flex
       * always (with visibility:hidden when unused) fixes this.
       */}
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
          // Conditionally apply backdrop-filter only when visible —
          // computing blur on a hidden element wastes mobile GPU budget.
          background:     visible ? 'rgba(30,36,32,0.72)' : 'transparent',
          backdropFilter: visible ? 'blur(4px)'           : 'none',
          WebkitBackdropFilter: visible ? 'blur(4px)'    : 'none',
          // Hide via visibility + pointer-events, not display:none
          visibility:     visible ? 'visible'   : 'hidden',
          pointerEvents:  visible ? 'auto'       : 'none',
          opacity:        visible ? 1            : 0,
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
            margin: '0 auto 1.25rem', fontSize: '1.4rem',
            flexShrink: 0,
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
            {open === 'exit'
              ? 'Before you go — a free gift'
              : 'Your free perimenopause guide'}
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

          {/* Kit form — always in DOM; script injected on mount above */}
          <div id="ep-kit-container" style={{ width: '100%' }} />

          {/* Delayed dismiss link */}
          <div style={{ marginTop: '1.1rem', minHeight: '1.5rem' }}>
            {showDismiss && (
              <button
                onClick={() => dismiss(open)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '0.75rem', color: 'rgba(46,46,46,0.38)',
                  fontFamily: 'var(--font-body)', textDecoration: 'underline',
                  textUnderlineOffset: '3px', transition: 'color 0.2s',
                  animation: 'epDismissIn 0.4s ease forwards',
                  padding: '0.5rem', // larger tap target
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
