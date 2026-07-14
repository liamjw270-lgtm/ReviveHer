/**
 * Meta Pixel helpers.
 *
 * The base pixel (init + first PageView) lives in index.html and loads on every
 * page unconditionally — there are NO environment checks, so it runs in
 * production too. These helpers just fire standard events on top of it, and are
 * safe no-ops if fbq hasn't loaded yet (e.g. blocked by an ad blocker), so they
 * never throw. They never call fbq('init') again, so there's no duplicate init.
 */
export function fbqTrack(event, params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params)
  }
}

export function fbqPageView() {
  fbqTrack('PageView')
}
