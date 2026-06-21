import { Link } from 'react-router-dom'
import Hero            from '../components/Hero'
import StickySection   from '../components/StickySection'
import StackedCards    from '../components/StackedCards'
import Timeline        from '../components/Timeline'
import Transformations from '../components/Transformations'
import Testimonials    from '../components/Testimonials'
import FAQ             from '../components/FAQ'
import CTA             from '../components/CTA'
import TrustBadges     from '../components/TrustBadges'
import Marquee         from '../components/Marquee'
import { MagneticButton } from '../components/FX'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <StickySection />

      {/* ── Mid-page CTA ── */}
      <div style={{
        background: 'var(--dark-bg)',
        padding:    'clamp(3.5rem, 8vw, 4.5rem) clamp(1.5rem, 5vw, 2rem)',
        textAlign:  'center',
        borderTop:  '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: '1.1rem', letterSpacing: '0.08em', color: '#f4b942', marginBottom: '0.75rem' }}>★★★★★</div>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight:    700,
            color:         'white',
            letterSpacing: '-0.02em',
            lineHeight:    1.2,
            marginBottom:  '0.75rem',
          }}>
            Ready to feel like yourself again?
          </h2>
          <p style={{
            color:        'rgba(255,255,255,0.5)',
            fontSize:     '0.95rem',
            fontWeight:   300,
            lineHeight:   1.7,
            marginBottom: '1.75rem',
          }}>
            One guide. Everything you need to understand and support your body through perimenopause.
          </p>
          <MagneticButton>
            <Link
              to="/buy"
              className="btn btn-sage"
              style={{ fontSize: '0.82rem', padding: '1.1rem 2.5rem', display: 'inline-flex' }}
            >
              Get the Guide →
            </Link>
          </MagneticButton>
          <div style={{ marginTop: '0.9rem', fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', fontWeight: 400 }}>
            <span style={{ textDecoration: 'line-through', opacity: 0.6, marginRight: '0.45rem' }}>$19.99</span>
            <span style={{ color: 'white', fontWeight: 700 }}>$9.99</span> · 50% off · Instant PDF download
          </div>
          <TrustBadges dark compact style={{ marginTop: '1.25rem' }} />
        </div>
      </div>

      <StackedCards />
      <Timeline />

      {/* ── Full-width lifestyle image strip ── */}
      <div style={{
        width:              '100%',
        height:             '55vh',
        minHeight:          320,
        backgroundImage:    'url(/lifestyle-1.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center 60%',
        position:           'relative',
        overflow:           'hidden',
      }}>
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(244,241,235,0.55) 0%, transparent 30%, transparent 70%, rgba(244,241,235,0.55) 100%)',
        }} />
      </div>

      <Transformations />
      <Marquee
        dark
        reverse
        items={['★★★★★ "I feel like myself again"', '★★★★★ "Sleeping through the night"', '★★★★★ "Brain fog cleared"', '★★★★★ "Honestly can\'t recommend it enough"']}
        speed={34}
      />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  )
}
