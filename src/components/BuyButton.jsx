/**
 * BuyButton — takes the user straight to the Shopify checkout in one tap.
 * No cart drawer, no cart page, no quantity stepper.
 *
 * The real one-click destination is the cart's `checkoutUrl` (fetched on mount).
 * The href falls back to a cart permalink only so the button works with zero JS
 * — but for real clicks we ALWAYS send the user to the direct checkoutUrl:
 *   • if it's loaded, the href already is it → normal navigation;
 *   • if it's not loaded yet, we block the click, fetch it, then redirect —
 *     so nobody ever lands on the intermediate cart page.
 * Fires the Meta Pixel InitiateCheckout event on click.
 */
import { useEffect, useRef, useState } from 'react'
import { fetchCheckoutUrl, CART_PERMALINK } from '../lib/checkout'
import { fbqTrack } from '../lib/pixel'

export default function BuyButton({
  label = 'Get Instant Access — $19.99',
  className = 'btn btn-sage',
  style,
  block = false,
  note = true,   // small reassurance line under the button
  dark = false,  // note colour for dark backgrounds
}) {
  const [checkoutUrl, setCheckoutUrl] = useState(null)
  const navigating = useRef(false)

  useEffect(() => {
    let alive = true
    fetchCheckoutUrl().then(u => { if (alive) setCheckoutUrl(u) })
    return () => { alive = false }
  }, [])

  const onClick = async (e) => {
    // Fire InitiateCheckout before the checkout redirect.
    fbqTrack('InitiateCheckout', { value: 19.99, currency: 'AUD' })
    // Real checkout URL already in the href → let the browser navigate normally.
    if (checkoutUrl) return
    // Not ready yet: don't fall back to the cart page. Block, fetch, then go
    // straight to checkout.
    e.preventDefault()
    if (navigating.current) return
    navigating.current = true
    try {
      window.location.href = await fetchCheckoutUrl()
    } catch {
      navigating.current = false
    }
  }

  const anchor = (
    <a
      href={checkoutUrl || CART_PERMALINK}
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
