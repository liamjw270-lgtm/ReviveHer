import { Link } from 'react-router-dom'
import Hero            from '../components/Hero'
import StickySection   from '../components/StickySection'
import StackedCards    from '../components/StackedCards'
import Timeline        from '../components/Timeline'
import Transformations from '../components/Transformations'
import Testimonials    from '../components/Testimonials'
import FAQ             from '../components/FAQ'
import CTA             from '../components/CTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <StickySection />

      {/* ── Mid-page CTA ── */}
      <div style={{
        background:   'var(--dark-bg)',
        padding:      '4rem 2rem',
        textAlign:    'center',
        borderTop:    '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: '1.1rem', letterSpacing: '0.08em', color: '#f4b942', marginBottom: '0.75rem' }}>⭐⭐⭐⭐⭐</div>
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
          <Link
            to="/buy"
            className="btn btn-sage"
            style={{ fontSize: '0.82rem', padding: '1.1rem 2.5rem', display: 'inline-flex' }}
          >
            Get the Guide →
          </Link>
          <div style={{ marginTop: '0.85rem', fontSize: '0.88rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
            $19.99 AUD · Instant digital download
          </div>
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
        {/* Soft dark vignette so it blends with sections above/below */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(to bottom, rgba(244,241,235,0.55) 0%, transparent 30%, transparent 70%, rgba(244,241,235,0.55) 100%)',
        }} />
      </div>

      <Transformations />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  )
}
