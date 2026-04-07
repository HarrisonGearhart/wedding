import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Ticker from './components/Ticker'
import FontPicker from './components/FontPicker'
import Home from './pages/Home'
import Details from './pages/Details'
import Registry from './pages/Registry'
import RSVP from './pages/RSVP'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  const [displayFont, setDisplayFont] = useState('Cormorant Garamond')
  const [bodyFont, setBodyFont]       = useState('Montserrat')

  const handleFontChange = (fontName, fontBody) => {
    setDisplayFont(fontName)
    setBodyFont(fontBody)
  }

  // Inline style object applied to root wrapper — React re-renders this on every font change
  const fontStyle = {
    '--font-display': `'${displayFont}', serif`,
    '--font-body':    `'${bodyFont}', sans-serif`,
    fontFamily:       `'${bodyFont}', sans-serif`,
  }

  return (
    <BrowserRouter>
      <div style={fontStyle}>
        <ScrollToTop />
        <Ticker />
        <Navbar />
        <FontPicker currentFont={displayFont} onFontChange={handleFontChange} />
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/details"  element={<Details />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/rsvp"     element={<RSVP />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}