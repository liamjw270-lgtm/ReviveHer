/**
 * FAQ — smooth accordion with GSAP height animation.
 */
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from '../lib/gsap'
import { content } from '../content'

function FAQItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  // Animate height when isOpen changes
  useGSAP(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, { dependencies: [isOpen] })

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      overflow:     'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width:       '100%',
          display:     'flex',
          alignItems:  'center',
          justifyContent: 'space-between',
          padding:     '1.5rem 0',
          gap:         '1rem',
          background:  'none',
          border:      'none',
          cursor:      'pointer',
          textAlign:   'left',
        }}
      >
        <span style={{
          fontFamily:    'var(--font-body)',
          fontSize:      '1rem',
          fontWeight:    500,
          color:         'var(--dark)',
          lineHeight:    1.4,
        }}>
          {item.q}
        </span>
        <span style={{
          width:        28,
          height:       28,
          borderRadius: '50%',
          border:       '1.5px solid var(--border)',
          display:      'flex',
          alignItems:   'center',
          justifyContent: 'center',
          flexShrink:   0,
          fontSize:     '1.1rem',
          color:        isOpen ? 'var(--primary)' : 'var(--muted)',
          fontWeight:   300,
          transform:    isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition:   'transform 0.3s var(--ease-expo), color 0.2s, border-color 0.2s',
          borderColor:  isOpen ? 'var(--primary)' : 'var(--border)',
        }}>
          +
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{
          fontSize:    '0.92rem',
          lineHeight:  1.75,
          fontWeight:  300,
          color:       'var(--muted)',
          paddingBottom: '1.5rem',
        }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef(null)
  const [open, setOpen] = useState(null)

  useGSAP(() => {
    gsap.from(sectionRef.current.querySelectorAll('.faq-fade'), {
      opacity:  0,
      y:        24,
      duration: 0.7,
      stagger:  0.08,
      ease:     'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top 75%',
        once:    true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} style={{
      background: 'var(--bg)',
      padding:    '7rem 3rem',
      borderTop:  '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <div className="faq-fade" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="eyebrow">Got questions?</span>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(2rem, 4vw, 3rem)',
            fontWeight:    700,
            color:         'var(--dark)',
            letterSpacing: '-0.02em',
            lineHeight:    1.1,
          }}>
            Frequently asked
          </h2>
        </div>

        {/* Items */}
        {content.faq.map((item, i) => (
          <div key={i} className="faq-fade">
            <FAQItem
              item={item}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
