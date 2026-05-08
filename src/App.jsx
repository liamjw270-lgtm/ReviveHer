import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/next'
import './styles/global.css'

import Nav      from './components/Nav'
import Footer   from './components/Footer'
import Home     from './pages/Home'
import BuyPage  from './pages/BuyPage'
import AboutPage from './pages/AboutPage'
import WhyPage  from './pages/WhyPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/buy"   element={<BuyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/why"   element={<WhyPage />} />
      </Routes>
      <Footer />
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
