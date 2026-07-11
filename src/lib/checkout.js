/**
 * Direct-to-checkout helper.
 *
 * The buy buttons must take the user straight to Shopify's checkout in one tap
 * — no cart drawer, no quantity stepper. We do this two ways so nothing depends
 * on JS finishing before the button works:
 *
 *  1. Every button's href defaults to a Shopify cart permalink, which works
 *     with zero JS (worst case: Shopify's own cart page, one tap to checkout).
 *  2. On mount we create a cart via the Storefront API and swap the href to the
 *     real one-click `checkoutUrl`. Cached module-wide so it runs once.
 */
import { useEffect, useState } from 'react'

const DOMAIN      = 'zcz4an-kd.myshopify.com'
const TOKEN       = '717216c56c30145c9470eec48bed19f5'
const VARIANT_ID  = '48996566827160'
const VARIANT_GID = `gid://shopify/ProductVariant/${VARIANT_ID}`

// No-JS fallback — a Shopify cart permalink for this variant.
export const CART_PERMALINK = `https://${DOMAIN}/cart/${VARIANT_ID}:1`

let cachedPromise = null

export function fetchCheckoutUrl() {
  if (cachedPromise) return cachedPromise
  cachedPromise = fetch(`https://${DOMAIN}/api/2024-04/graphql.json`, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({
      query: `mutation { cartCreate(input: { lines: [{ quantity: 1, merchandiseId: "${VARIANT_GID}" }] }) { cart { checkoutUrl } } }`,
    }),
  })
    .then(r => r.json())
    .then(d => d?.data?.cartCreate?.cart?.checkoutUrl || CART_PERMALINK)
    .catch(() => CART_PERMALINK)
  return cachedPromise
}

/** Returns a checkout URL, starting from the no-JS permalink and upgrading to
 *  the direct one-click checkout URL once the cart is created. */
export function useCheckoutUrl() {
  const [url, setUrl] = useState(CART_PERMALINK)
  useEffect(() => {
    let alive = true
    fetchCheckoutUrl().then(u => { if (alive) setUrl(u) })
    return () => { alive = false }
  }, [])
  return url
}
