import { useEffect, useRef } from 'react'

export default function EmailSignup() {
  const scriptInjected = useRef(false)

  useEffect(() => {
    if (scriptInjected.current) return
    scriptInjected.current = true

    const script = document.createElement('script')
    script.async = true
    script.setAttribute('data-uid', 'c7d19d862b')
    script.src = 'https://reviveher.kit.com/c7d19d862b/index.js'
    document.getElementById('kit-embed-c7d19d862b')?.appendChild(script)
  }, [])

  return (
    <section style={{
      background:   'var(--bg)',
      borderTop:    '1px solid var(--border)',
      padding:      'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3rem)',
      textAlign:    'center',
    }}>
      <div style={{ maxWidth: 580, margin: '0 auto' }}>

        {/* Eyebrow */}
        <span style={{
          display:       'block',
          fontSize:      '0.65rem',
          fontWeight:    600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color:         'var(--primary)',
          marginBottom:  '1.1rem',
        }}>
          Free Resources
        </span>

        {/* Heading */}
        <h2 style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.9rem, 4vw, 2.75rem)',
          fontWeight:    700,
          color:         'var(--dark)',
          letterSpacing: '-0.02em',
          lineHeight:    1.15,
          marginBottom:  '1rem',
        }}>
          Get free perimenopause tips
        </h2>

        {/* Subtext */}
        <p style={{
          fontFamily:  'var(--font-body)',
          fontSize:    '1rem',
          fontWeight:  300,
          lineHeight:  1.7,
          color:       'var(--muted)',
          marginBottom: '2.25rem',
        }}>
          Join women navigating this together. No spam, ever.
        </p>

        {/* Kit embed */}
        <div id="kit-embed-c7d19d862b" />

      </div>
    </section>
  )
}
