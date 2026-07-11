/**
 * BuyButton — a plain anchor that takes the user straight to Shopify checkout
 * in one tap. No cart drawer, no quantity stepper, no shipping text.
 *
 * It is a real <a> with a working href from first paint (see checkout.js), so
 * it needs no JS to be clickable — it just upgrades to the direct checkout URL
 * once the cart is ready. Fires the Meta Pixel InitiateCheckout event on click.
 */
import { useCheckoutUrl } from '../lib/checkout'

export default function BuyButton({
  label = 'Get Instant Access',
  className = 'btn btn-sage',
  style,
  block = false,
}) {
  const href = useCheckoutUrl()

  const onClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', { value: 9.99, currency: 'AUD' })
    }
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={{ textDecoration: 'none', ...(block ? { width: '100%' } : {}), ...style }}
    >
      {label}
    </a>
  )
}
