/**
 * BuyButton — a plain link straight to the Payhip checkout in one tap.
 * No cart, no drawer, no quantity stepper, no JS SDK. Opens in the same tab
 * and lands the buyer directly on the Payhip payment page.
 * Fires the Meta Pixel InitiateCheckout event on click.
 */
import { content } from '../content'
import { fbqTrack } from '../lib/pixel'

const CHECKOUT_URL = content.pricing.checkoutUrl

export default function BuyButton({
  label = 'Get Instant Access — $19.99',
  className = 'btn btn-sage',
  style,
  block = false,
  note = true,   // small reassurance line under the button
  dark = false,  // note colour for dark backgrounds
}) {
  const onClick = () => {
    fbqTrack('InitiateCheckout', { value: 19.99, currency: 'AUD' })
  }

  const anchor = (
    <a
      href={CHECKOUT_URL}
      onClick={onClick}
      className={className}
      style={{ textDecoration: 'none', ...(block ? { width: '100%' } : {}), ...style }}
    >
      {label}
    </a>
  )

  if (!note) return anchor

  return (
    <div style={{ display: block ? 'block' : 'inline-block', width: block ? '100%' : undefined, textAlign: 'center' }}>
      {anchor}
      <div style={{
        marginTop: '0.5rem',
        fontSize:  '0.72rem',
        fontWeight: 500,
        color: dark ? 'rgba(255,255,255,0.55)' : 'var(--muted)',
      }}>
        🔒 Secure checkout · 30-day money-back guarantee
      </div>
    </div>
  )
}
