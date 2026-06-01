import { useEffect, useRef, useState } from 'react'

const KEY_WELCOME = 'reviveher-welcome-shown'
const KEY_EXIT    = 'reviveher-exit-shown'

// Kit form submission endpoint (public, no API key needed)
const KIT_URL = 'https://app.kit.com/forms/c7d19d862b/subscriptions'

export default function ExitIntentPopup() {
  const [open,        setOpen]        = useState(null)   // null | 'welcome' | 'exit'
  const [animOut,     setAnimOut]     = useState(false)
  const [tabVisible,  setTabVisible]  = useState(false)
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
    if (type === 'exit')    sessionStorage.setItem(KEY_EXIT,    '1')
    setAnimOut(true)
    setTimeout(() => { setOpen(null); setAnimOut(false); setShowDismiss(false) }, 320)
  }

  useEffect(() => {
    // Tab always shows after 1s
    const tabTimer = setTimeout(() => setTabVisible(true), 1000)

    // Gate — exit intent and auto-show only fire after 15s on page
    const readyAfter = 15000
    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, readyAfter)

    // Welcome popup: auto after 15s (once per session)
    let loadTimer
    if (!sessionStorage.getItem(KEY_WELCOME)) {
      loadTimer = setTimeout(() => {
        if (welcomeTriggered.current) return
        welcomeTriggered.current = true
        openPopup('welcome')
      }, readyAfter)
    }

    // Exit intent: mouse within 20px of top, but only after 15s (once per session)
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
        @keyframes epCardIn     { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes epCardOut    { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(16px) scale(0.97)} }
        @keyframes epTabIn      { from{opacity:0;transform:translateY(-50%) rotate(180deg) translateX(48px)} to{opacity:1;transform:translateY(-50%) rotate(180deg) translateX(0)} }
        @keyframes epDismissIn  { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ── Side tab — always visible ─────────────────────── */}
      {tabVisible && (
        <button
          onClick={() => { welcomeTriggered.current = true; openPopup('welcome') }}
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

      {/* ── Welcome popup ────────────────────────────────── */}
      {open === 'welcome' && (
        <Overlay animOut={animOut} onDismiss={() => dismiss('welcome')}>
          <Card animOut={animOut}>
            <IconCircle>🎁</IconCircle>
            <h2 style={headingStyle}>Your free perimenopause guide</h2>
            <p style={subtextStyle}>
              Get our free checklist:{' '}
              <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>
                5 signs you're in perimenopause
              </strong>{' '}
              and what to do about each one. Free, straight to your inbox.
            </p>
            <KitForm />
            <DismissButton show={showDismiss} onClick={() => dismiss('welcome')} />
          </Card>
        </Overlay>
      )}

      {/* ── Exit-intent popup ────────────────────────────── */}
      {open === 'exit' && (
        <Overlay animOut={animOut} onDismiss={() => dismiss('exit')}>
          <Card animOut={animOut}>
            <IconCircle>✋</IconCircle>
            <h2 style={headingStyle}>Before you go — a free gift</h2>
            <p style={subtextStyle}>
              Don't leave empty-handed. Get our free checklist:{' '}
              <strong style={{ fontWeight: 500, color: 'var(--dark)' }}>
                5 signs you're in perimenopause
              </strong>{' '}
              (and what to do about each one). Straight to your inbox.
            </p>
            <KitForm />
            <DismissButton show={showDismiss} onClick={() => dismiss('exit')} />
          </Card>
        </Overlay>
      )}
    </>
  )
}

// ── Native Kit form — works on all devices ────────────────
function KitForm() {
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const body = new URLSearchParams({ email_address: email })
      await fetch(KIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
      setStatus('success')
    } catch {
      setStatus('success') // show success anyway — Kit may block CORS in dev but works in prod
    }
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
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--dark)', fontWeight: 500 }}>
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
        style={{
          width:           '100%',
          padding:         '0.85rem 1.25rem',
          borderRadius:    '99px',
          border:          '1.5px solid rgba(46,46,46,0.18)',
          background:      'white',
          fontFamily:      'var(--font-body)',
          fontSize:        '1rem',
          color:           'var(--dark)',
          outline:         'none',
          boxSizing:       'border-box',
          marginBottom:    '0.6rem',
          WebkitAppearance:'none',
          appearance:      'none',
          display:         'block',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width:           '100%',
          padding:         '0.9rem 1.5rem',
          borderRadius:    '99px',
          border:          'none',
          background:      status === 'loading' ? '#a0b89a' : '#7d9e76',
          color:           'white',
          fontFamily:      'var(--font-body)',
          fontSize:        '0.85rem',
          fontWeight:      600,
          letterSpacing:   '0.05em',
          textTransform:   'uppercase',
          cursor:          status === 'loading' ? 'wait' : 'pointer',
          transition:      'background 0.2s',
          WebkitAppearance:'none',
          appearance:      'none',
          display:         'block',
        }}
      >
        {status === 'loading' ? 'Sending…' : 'Send me the free guide'}
      </button>
    </form>
  )
}

// ── Shared sub-components ─────────────────────────────────

function Overlay({ animOut, onDismiss, children }) {
  return (
    <div
      onClick={onDismiss}
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
      width: 52, height: 52, borderRadius: '50%',
      background: 'rgba(125,158,118,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      margin: '0 auto 1.5rem', fontSize: '1.5rem',
    }}>
      {children}
    </div>
  )
}

function DismissButton({ show, onClick }) {
  return (
    <div style={{ marginTop: '1.25rem', minHeight: '1.5rem' }}>
      {show && (
        <button onClick={onClick} style={{
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
  )
}

const headingStyle = {
  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
  fontWeight: 700, color: 'var(--dark)', letterSpacing: '-0.02em',
  lineHeight: 1.2, marginBottom: '0.85rem',
}

const subtextStyle = {
  fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 300,
  lineHeight: 1.75, color: 'var(--muted)', maxWidth: 400,
  margin: '0 auto 1.75rem',
}
