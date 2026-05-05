import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Ticker from './components/Ticker'
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
  return (
    <BrowserRouter>
      <div>
        <ScrollToTop />
        <Ticker />
        <Navbar />
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