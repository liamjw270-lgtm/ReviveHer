/**
 * FX — shared animation toolkit for the maxed-out design pass.
 *
 * ScrollProgress — thin gradient bar at the very top tracking page scroll.
 * Grain          — fixed film-grain overlay (SVG noise) for editorial texture.
 * MagneticButton — wrapper that pulls its child toward the cursor (desktop).
 * SplitText      — word/char-level staggered reveal driven by ScrollTrigger.
 * TiltCard       — subtle 3D tilt toward the cursor on hover (desktop).
 */
import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'

/* ── Scroll progress bar ─────────────────────────────────────────────── */
export function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 3,
      zIndex: 400, pointerEvents: 'none',
    }}>
      <div ref={barRef} style={{
        height: '100%',
        background: 'linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
      }} />
    </div>
  )
}

/* ── Film grain overlay ──────────────────────────────────────────────── */
export function Grain() {
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: '-50%', width: '200%', height: '200%',
      zIndex: 350, pointerEvents: 'none', opacity: 0.05,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      animation: 'grainShift 0.9s steps(4) infinite',
    }} />
  )
}

/* ── Magnetic button wrapper (desktop only) ──────────────────────────── */
export function MagneticButton({ children, strength = 0.35, style = {} }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
    }
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <div ref={wrapRef} style={{ display: 'inline-block', willChange: 'transform', ...style }}>
      {children}
    </div>
  )
}

/* ── Split-text reveal ───────────────────────────────────────────────── */
export function SplitText({ text, as: Tag = 'span', mode = 'word', delay = 0, style = {}, trigger = true }) {
  const ref = useRef(null)
  const pieces = mode === 'char' ? text.split('') : text.split(' ')

  useGSAP(() => {
    const targets = ref.current.querySelectorAll('.st-piece')
    gsap.set(targets, { yPercent: 110, opacity: 0 })
    gsap.to(targets, {
      yPercent: 0,
      opacity:  1,
      duration: 0.85,
      stagger:  mode === 'char' ? 0.022 : 0.055,
      delay,
      ease:     'power4.out',
      scrollTrigger: trigger ? { trigger: ref.current, start: 'top 88%', once: true } : undefined,
    })
  }, { scope: ref })

  return (
    <Tag ref={ref} style={{ display: 'inline-block', ...style }}>
      {pieces.map((p, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <span className="st-piece" style={{ display: 'inline-block', willChange: 'transform' }}>
            {p === ' ' ? ' ' : p}
          </span>
          {mode === 'word' && i < pieces.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

/* ── 3D tilt card (desktop hover) ────────────────────────────────────── */
export function TiltCard({ children, max = 7, style = {} }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width  - 0.5
      const py = (e.clientY - r.top)  / r.height - 0.5
      gsap.to(el, {
        rotateY: px * max,
        rotateX: -py * max,
        scale:   1.015,
        duration: 0.45,
        ease:    'power2.out',
        transformPerspective: 800,
      })
    }
    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])

  return (
    <div ref={ref} style={{ willChange: 'transform', transformStyle: 'preserve-3d', ...style }}>
      {children}
    </div>
  )
}
