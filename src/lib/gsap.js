/**
 * Central GSAP configuration — import from here, never directly from 'gsap'.
 * Registers all plugins once to avoid duplicate-registration warnings.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Performance: GPU-composite everything, skip 3D only when not needed ──────
gsap.config({
  force3D:        'auto',   // lets GSAP choose GPU compositing per-element
  nullTargetWarn: false,    // silence null-ref warnings in dev
})

// ── Global animation defaults ─────────────────────────────────────────────────
gsap.defaults({
  ease:     'power3.out',
  duration: 0.9,
})

// ── ScrollTrigger: mobile touch and refresh tuning ───────────────────────────
ScrollTrigger.config({
  limitCallbacks:  true,    // only fire callbacks when necessary (perf)
  ignoreMobileResize: true, // prevents address-bar resize from re-calculating
})

// ── Recompute trigger positions after late layout shifts ─────────────────────
// Web fonts and images (book art, lifestyle photos) finish loading *after*
// ScrollTrigger first measures the page. On mobile especially this shifts every
// section down, leaving scroll-reveal/scrub triggers (e.g. the Timeline line)
// pinned to stale positions — so they appear already-finished or never fire.
// Refreshing once everything has settled fixes it.
if (typeof window !== 'undefined') {
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('load', refresh)
  if (document.fonts?.ready) document.fonts.ready.then(refresh)
  // Catch any images that decode slightly later than the load event.
  window.addEventListener('load', () => setTimeout(refresh, 300))
}

// Smooth scrub constant — low value = snappy, minimal post-scroll lag
export const SCRUB = 0.5

export { ScrollTrigger, useGSAP }
export default gsap
