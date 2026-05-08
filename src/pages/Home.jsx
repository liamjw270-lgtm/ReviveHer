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
      <StackedCards />
      <Timeline />

      {/* ── Full-width lifestyle image strip ── */}
      <div style={{
        width:              '100%',
        height:             '55vh',
        minHeight:          320,
        backgroundImage:    'url(/lifestyle-1.jpg)',
        backgroundSize:     'cover',
        backgroundPosition: 'center 40%',
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
