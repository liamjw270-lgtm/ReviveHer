import { useEffect, useRef, useState } from 'react'

const KEY_WELCOME = 'reviveher-welcome-shown'
const KEY_EXIT    = 'reviveher-exit-shown'

export default function ExitIntentPopup() {
  const [open,        setOpen]        = useState(null)   // null | 'welcome' | 'exit'
  const [animOut,     setAnimOut]     = useState(false)
  const [tabVisible,  setTabVisible]  = useState(false)
  const [showDismiss, setShowDismiss] = useState(false)

  const welcomeTriggered = useRef(false)
  const exitTriggered    = useRef(false)
  const dismissTimer     = useRef(null)
  const scriptInjected   = useRef(false)

  const openPopup = (type) => {
    if (open) return
    setOpen(type)
    setShowDismiss(false)
    dismissTimer.current = setTimeout(() => setShowDismiss(true), 3000)
  }

  const dismiss = (type) => {
    clearTimeout(dismissTimer.current)
    if (type === 'welcome') sessionStorage.setItem(KEY_WELCOME, '1')
    if (type === 'exit')    sessionStorage.setItem(KEY_EXIT,    '1')
    setAnimOut(true)
    setTimeout(() => { setOpen(null); setAnimOut(false); setShowDismiss(false) }, 320)
  }

  // ── Inject Kit script ONCE on mount so the form is ready
  //    before the popup ever opens (fixes iOS timing issues)
  useEffect(() => {
    if (scriptInjected.current) return
    scriptInjected.current = true
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    const tabTimer = setTimeout(() => setTabVisible(true), 1000)

    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 15000)

    let loadTimer
    if (!sessionStorage.getItem(KEY_WELCOME)) {
      loadTimer = setTimeout(() => {
        if (welcomeTriggered.current) return
        welcomeTriggered.current = true
        openPopup('welcome')
      }, 15000)
    }

    const onMouseMove = (e) => {
      if (!ready) return
      if (e.clientY < 20 && !exitTriggered.current && !sessionStorage.getItem(KEY_EXIT)) {
        exitTriggered.current = true
        openPopup('exit')
      }
    }
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      clearTimeout(tabTimer)
      clearTimeout(readyTimer)
      clearTimeout(loadTimer)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes epOverlayIn  { from{opacity:0} to{opacity:1} }
        @keyframes epOverlayOut { from{opacity:1} to{opacity:0} }
        @keyframes epCardIn  { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes epCardOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(16px) scale(0.97)} }
        @keyframes epTabIn   { from{opacity:0;transform:translateY(-50%) rotate(180deg) translateX(48px)} to{opacity:1;transform:translateY(-50%) rotate(180deg) translateX(0)} }
        @keyframes epDismissIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }

        /* ── Kit form inside popup ── */
        .ep-kit-wrap [data-sv-form],
        .ep-kit-wrap .formkit-form { background:transparent!important; padding:0!important; border:none!important; box-shadow:none!important; width:100%!important; }

        .ep-kit-wrap .formkit-form[min-width~="700"] .formkit-fields[data-stacked="false"] { flex-wrap:wrap!important; flex-direction:column!important; }

        .ep-kit-wrap input[type="email"],
        .ep-kit-wrap .formkit-input {
          width:100%!important; display:block!important; visibility:visible!important;
          opacity:1!important; max-height:none!important;
          padding:0.85rem 1.25rem!important; border-radius:99px!important;
          border:1.5px solid rgba(46,46,46,0.18)!important; background:white!important;
          font-size:1rem!important; box-sizing:border-box!important;
          -webkit-appearance:none!important; color:#2e2e2e!important;
          margin-bottom:0.6rem!important;
        }
        .ep-kit-wrap .formkit-submit,
        .ep-kit-wrap button[type="submit"] {
          width:100%!important; display:block!important; visibility:visible!important;
          opacity:1!important; padding:0.9rem 1.5rem!important;
          border-radius:99px!important; border:none!important;
          background:#7d9e76!important; color:white!important;
          font-size:0.85rem!important; font-weight:600!important;
          letter-spacing:0.05em!important; text-transform:uppercase!important;
          cursor:pointer!important; -webkit-appearance:none!important;
          box-sizing:border-box!important;
        }
        /* success/confirmation state */
        .ep-kit-wrap .formkit-alert,
        .ep-kit-wrap [data-element="success"] { color:#2e2e2e!important; font-size:0.95rem!important; }
      `}</style>

      {/* ── Side tab — always visible ─────────────────────── */}
      {tabVisible && (
        <button
          onClick={() => { welcomeTriggered.current = true; openPopup('welcome') }}
          style={{
            position:'fixed', top:'50%', right:0,
            transform:'translateY(-50%) rotate(180deg)',
            zIndex:150, display:'flex', alignItems:'center', gap:'0.5rem',
            background:'#7d9e76', color:'white', border:'none',
            borderRadius:'0 0 0.75rem 0.75rem', padding:'0.75rem 0.6rem',
            cursor:'pointer', fontFamily:'var(--font-body)', fontSize:'0.65rem',
            fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase',
            whiteSpace:'nowrap', writingMode:'vertical-rl',
            boxShadow:'-4px 0 18px rgba(125,158,118,0.3)',
            animation:'epTabIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#6a8e63'}
          onMouseLeave={e => e.currentTarget.style.background = '#7d9e76'}
        >
          <span style={{ fontSize:'0.85rem', writingMode:'horizontal-tb' }}>🎁</span>
          Get your free guide
        </button>
      )}

      {/* ── Popups — always in the DOM so Kit form is pre-rendered ── */}

      {/* Welcome popup */}
      <PopupShell
        visible={open === 'welcome'}
        animOut={animOut}
        onDismiss={() => dismiss('welcome')}
      >
        <IconCircle>🎁</IconCircle>
        <h2 style={headingStyle}>Your free perimenopause guide</h2>
        <p style={subtextStyle}>
          Get our free checklist:{' '}
          <strong style={{ fontWeight:500, color:'var(--dark)' }}>
            5 signs you're in perimenopause
          </strong>{' '}
          and what to do about each one. Free, straight to your inbox.
        </p>
        {/* Kit renders here — container is always in DOM */}
        <div className="ep-kit-wrap" data-uid="c7d19d862b" />
        <DismissButton show={showDismiss && open === 'welcome'} onClick={() => dismiss('welcome')} />
      </PopupShell>

      {/* Exit-intent popup */}
      <PopupShell
        visible={open === 'exit'}
        animOut={animOut}
        onDismiss={() => dismiss('exit')}
      >
        <IconCircle>✋</IconCircle>
        <h2 style={headingStyle}>Before you go — a free gift</h2>
        <p style={subtextStyle}>
          Don't leave empty-handed. Get our free checklist:{' '}
          <strong style={{ fontWeight:500, color:'var(--dark)' }}>
            5 signs you're in perimenopause
          </strong>{' '}
          (and what to do about each one). Straight to your inbox.
        </p>
        <div className="ep-kit-wrap" data-uid="c7d19d862b" />
        <DismissButton show={showDismiss && open === 'exit'} onClick={() => dismiss('exit')} />
      </PopupShell>
    </>
  )
}

// ── PopupShell — always rendered, shown/hidden via CSS ────
function PopupShell({ visible, animOut, onDismiss, children }) {
  if (!visible && !animOut) return null   // unmount only after animation
  return (
    <div
      onClick={onDismiss}
      style={{
        position:'fixed', inset:0, background:'rgba(30,36,32,0.72)',
        backdropFilter:'blur(4px)', zIndex:1000,
        display:'flex', alignItems:'center', justifyContent:'center',
        padding:'1.5rem',
        animation: animOut ? 'epOverlayOut 0.28s ease forwards' : 'epOverlayIn 0.28s ease forwards',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:'#eae6de', borderRadius:'1.75rem',
          padding:'clamp(2rem,5vw,3rem) clamp(1.75rem,5vw,3rem)',
          maxWidth:520, width:'100%',
          boxShadow:'0 32px 80px rgba(30,36,32,0.25)', textAlign:'center',
          animation: animOut ? 'epCardOut 0.28s ease forwards' : 'epCardIn 0.32s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function IconCircle({ children }) {
  return (
    <div style={{
      width:52, height:52, borderRadius:'50%', background:'rgba(125,158,118,0.15)',
      display:'flex', alignItems:'center', justifyContent:'center',
      margin:'0 auto 1.5rem', fontSize:'1.5rem',
    }}>{children}</div>
  )
}

function DismissButton({ show, onClick }) {
  return (
    <div style={{ marginTop:'1.25rem', minHeight:'1.5rem' }}>
      {show && (
        <button onClick={onClick} style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize:'0.75rem', color:'rgba(46,46,46,0.38)',
          fontFamily:'var(--font-body)', textDecoration:'underline',
          textUnderlineOffset:'3px', transition:'color 0.2s',
          animation:'epDismissIn 0.4s ease forwards',
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
  fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,4vw,2.1rem)',
  fontWeight:700, color:'var(--dark)', letterSpacing:'-0.02em',
  lineHeight:1.2, marginBottom:'0.85rem',
}
const subtextStyle = {
  fontFamily:'var(--font-body)', fontSize:'0.95rem', fontWeight:300,
  lineHeight:1.75, color:'var(--muted)', maxWidth:400, margin:'0 auto 1.75rem',
}
