/**
 * Simple, honest policy + contact pages. Trust-checkers look for these; keeping
 * them plain and truthful is the point. Copy is deliberately short.
 */
import { content } from '../content'

const EMAIL = content.brand.email

function LegalLayout({ title, children }) {
  return (
    <main style={{ paddingTop: 68, background: 'var(--bg)', minHeight: '100vh' }}>
      <section style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 2rem) 5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 700, color: 'var(--dark)', letterSpacing: '-0.02em',
          lineHeight: 1.1, marginBottom: '1.5rem',
        }}>{title}</h1>
        <div style={{ fontSize: '1rem', lineHeight: 1.8, fontWeight: 300, color: 'var(--dark)' }}>
          {children}
        </div>
      </section>
    </main>
  )
}

const p = { marginBottom: '1.25rem' }
const strong = { fontWeight: 600 }

export function ContactPage() {
  return (
    <LegalLayout title="Contact us">
      <p style={p}>
        Questions about the guide, your download, or a refund? We're a small team and
        we read every message.
      </p>
      <p style={p}>
        Email us any time at{' '}
        <a href={`mailto:${EMAIL}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{EMAIL}</a>.
        We aim to reply within 1–2 business days.
      </p>
      <p style={{ ...p, color: 'var(--muted)', fontSize: '0.9rem' }}>
        For refunds, just email us within 30 days of purchase — no forms, no questions asked.
      </p>
    </LegalLayout>
  )
}

export function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund policy">
      <p style={p}>
        <span style={strong}>Every purchase is covered by a 30-day money-back guarantee.</span> If
        The Peri-Menopause Reset doesn't genuinely help you, email us at{' '}
        <a href={`mailto:${EMAIL}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{EMAIL}</a>{' '}
        within 30 days of your purchase and we'll refund every cent.
      </p>
      <p style={p}>
        There are no forms to fill in and no questions asked, and you keep the free bonuses.
      </p>
      <p style={p}>
        We can only refund purchases made through this website; please include the email
        address you used at checkout so we can find your order.
      </p>
    </LegalLayout>
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy">
      <p style={p}>
        We only collect the information needed to deliver your purchase and, if you ask for it,
        our free guide — that means your email address and the order details handled by our
        payment processor.
      </p>
      <p style={p}>
        Payments are processed securely by Shopify; we never see or store your full card
        details. Email sign-ups are managed by our email provider (Kit) and are used only to
        send you the resources you requested and occasional related tips.
      </p>
      <p style={p}>
        We don't sell your personal information. You can unsubscribe at any time, or ask us to
        delete your details, by emailing{' '}
        <a href={`mailto:${EMAIL}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  )
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms of use">
      <p style={p}>
        The Peri-Menopause Reset is a digital product for your personal use. When you buy it,
        you receive a licence to download and use it yourself — please don't resell or
        redistribute it.
      </p>
      <p style={p}>
        <span style={strong}>This guide is educational content only. It is not medical advice</span> and
        does not replace care from a qualified healthcare professional. Always consult your
        doctor about your individual situation, especially if symptoms are severe or persistent.
      </p>
      <p style={p}>
        Every purchase is covered by our{' '}
        <span style={strong}>30-day money-back guarantee</span>. Questions? Email{' '}
        <a href={`mailto:${EMAIL}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  )
}
