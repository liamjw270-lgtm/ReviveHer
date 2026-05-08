import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from '../lib/gsap'
import { content } from '../content'

const links = [
  { label: 'The Book',      href: '/#what-inside' },
  { label: "What's Inside", href: '/#timeline' },
  { label: 'Why ReviveHer', href: '/why' },
  { label: 'About',         href: '/about' },
]

export default function Nav() {
  const navRef  = useRef(null)
  const lastY   = useRef(0)
  const hidden  = useRef(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const nav = navRef.current

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)

      if (y > lastY.current && y > 80 && !hidden.current) {
        gsap.to(nav, { y: -80, duration: 0.35, ease: 'power2.inOut' })
        hidden.current = true
      } else if (y < lastY.current && hidden.current) {
        gsap.to(nav, { y: 0, duration: 0.35, ease: 'power2.inOut' })
        hidden.current = false
      }
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav ref={navRef} style={{
        position:   'fixed',
        top: 0, left: 0, right: 0,
        zIndex:     200,
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:    '0 2rem',
        height:     68,
        background: scrolled ? 'rgba(244,241,235,0.96)' : 'rgba(244,241,235,0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(46,46,46,0.08)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
        willChange: 'transform',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '0.45rem',
          fontFamily: 'var(--font-display)',
          fontSize:   '1.1rem',
          fontWeight: 700,
          color:      'var(--dark)',
          letterSpacing: '-0.01em',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 7L15.5 11.5L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 11.5L4 7L10.5 8.5L12 2Z" fill="var(--primary)" />
          </svg>
          {content.brand.name}
        </Link>

        {/* Desktop links */}
        <ul className="nav-desktop-links" style={{
          display:    'flex',
          alignItems: 'center',
          gap:        '2.2rem',
          listStyle:  'none',
        }}>
          {links.map(l => (
            <li key={l.label}>
              <NavLink href={l.href} label={l.label} />
            </li>
          ))}
        </ul>

        {/* Right: CTA + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/buy"
            className="btn btn-sage"
            style={{ fontSize: '0.7rem', padding: '0.65rem 1.4rem' }}
          >
            Get the Book
          </Link>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--dark)', borderRadius: 2, transition: 'transform 0.25s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--dark)', borderRadius: 2, transition: 'opacity 0.25s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: 'var(--dark)', borderRadius: 2, transition: 'transform 0.25s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:   'fixed',
        top:        68,
        left:       0,
        right:      0,
        zIndex:     199,
        background: 'rgba(244,241,235,0.98)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(46,46,46,0.08)',
        overflow:   'hidden',
        maxHeight:  menuOpen ? 400 : 0,
        transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: '1.5rem 2rem 2rem' }}>
          {links.map(l => (
            <div key={l.label} style={{ borderBottom: '1px solid rgba(46,46,46,0.06)', padding: '0.9rem 0' }}>
              <NavLink href={l.href} label={l.label} mobile onClick={() => setMenuOpen(false)} />
            </div>
          ))}
          <div style={{ marginTop: '1.5rem' }}>
            <Link
              to="/buy"
              className="btn btn-sage"
              onClick={() => setMenuOpen(false)}
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
            >
              Get the Book
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

function NavLink({ href, label, mobile, onClick }) {
  const isHash = href.startsWith('/#')
  const style  = {
    fontFamily:    'var(--font-body)',
    fontSize:      mobile ? '1rem' : '0.72rem',
    fontWeight:    500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color:         'var(--dark)',
    opacity:       0.65,
    transition:    'opacity 0.2s',
    display:       'block',
  }
  const hover = e => e.currentTarget.style.opacity = 1
  const out   = e => e.currentTarget.style.opacity = 0.65

  if (isHash) {
    return <a href={href} style={style} onMouseEnter={hover} onMouseLeave={out} onClick={onClick}>{label}</a>
  }
  return <Link to={href} style={style} onMouseEnter={hover} onMouseLeave={out} onClick={onClick}>{label}</Link>
}
