import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { fbqPageView } from './lib/pixel'
import { Analytics } from '@vercel/analytics/react'
import './styles/global.css'

import Nav             from './components/Nav'
import Footer          from './components/Footer'
import EmailSignup     from './components/EmailSignup'
import ExitIntentPopup from './components/ExitIntentPopup'
import SaleBanner      from './components/SaleBanner'
import { ScrollProgress, Grain } from './components/FX'
import Home     from './pages/Home'
import BuyPage  from './pages/BuyPage'
import AboutPage from './pages/AboutPage'
import WhyPage  from './pages/WhyPage'
import { ContactPage, RefundPolicyPage, PrivacyPage, TermsPage } from './pages/LegalPages'

function ScrollToTop() {
  const { pathname } = useLocation()
  const firstLoad = useRef(true)
  useEffect(() => {
    window.scrollTo(0, 0)
    // index.html already fires the initial PageView; only fire it for
    // subsequent client-side (SPA) route changes to avoid a double count.
    if (firstLoad.current) { firstLoad.current = false; return }
    fbqPageView()
  }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isBuy  = pathname === '/buy'
  return (
    <>
      <ScrollToTop />
      {/* Decorative scroll bar + film grain add JS/animation cost — skip them
          on the buy page so it paints as fast as possible for ad traffic. */}
      {!isBuy && <ScrollProgress />}
      {!isBuy && <Grain />}
      {isHome && <SaleBanner />}
      <Nav />
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/buy"   element={<BuyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/why"   element={<WhyPage />} />
        <Route path="/contact"       element={<ContactPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/privacy"       element={<PrivacyPage />} />
        <Route path="/terms"         element={<TermsPage />} />
      </Routes>
      {/* /buy has its own native "Not ready yet?" capture (FreeGuideCapture),
          so skip the global Kit-embed signup there — avoids a duplicate form
          and the extra external script on the conversion page. */}
      {!isBuy && <EmailSignup />}
      <Footer />
      <ExitIntentPopup />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Analytics />
    </BrowserRouter>
  )
}
