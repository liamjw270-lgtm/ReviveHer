import { Link } from 'react-router-dom'
import { content } from '../content'

export default function Footer() {
  return (
    <footer style={{
      background:  'var(--dark-bg)',
      padding:     '4rem 3rem 2.5rem',
      color:       'rgba(255,255,255,0.5)',
    }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display:        'flex',
          alignItems:     'flex-start',
          justifyContent: 'space-between',
          flexWrap:       'wrap',
          gap:            '2rem',
          paddingBottom:  '2.5rem',
          borderBottom:   '1px solid rgba(255,255,255,0.08)',
          marginBottom:   '2rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '1.2rem',
              fontWeight:    700,
              color:         'white',
              marginBottom:  '0.6rem',
              display:       'flex',
              alignItems:    'center',
              gap:           '0.4rem',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.5 8.5L20 7L15.5 11.5L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 11.5L4 7L10.5 8.5L12 2Z" fill="var(--primary)" />
              </svg>
              {content.brand.name}
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.65, maxWidth: 260 }}>
              {content.brand.tagline}
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.8rem' }}>Navigate</div>
              {[
                { label: 'Why ReviveHer', to: '/why' },
                { label: 'About',         to: '/about' },
                { label: 'Get the Book',  to: '/buy' },
              ].map(l => (
                <div key={l.label} style={{ marginBottom: '0.5rem' }}>
                  <Link to={l.to} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >{l.label}</Link>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.8rem' }}>Legal</div>
              {['Privacy Policy', 'Terms of Use', 'Contact'].map(l => (
                <div key={l} style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >{l}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
            © {new Date().getFullYear()} {content.brand.name}. All rights reserved.
          </p>
          <p style={{ fontSize: '0.72rem' }}>
            Made with care for women everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
