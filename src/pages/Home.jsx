import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import styles from './Home.module.css'

// Replace these imports with your actual photos later:
// import photo1 from '../assets/placeholder1.jpg'
// import photo2 from '../assets/placeholder2.jpg'
// import photo3 from '../assets/placeholder3.jpg'
// import harwelden from '../assets/harwelden.jpg'

const SLIDES = [
  { label: 'Photo 1',   color: '#2A1525' },
  { label: 'Photo 2',   color: '#3F1521' },
  { label: 'Photo 3',   color: '#63001F' },
  { label: 'Harwelden', color: '#4a1a2a' },
]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [showPopup, setShowPopup]     = useState(false)

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Only show popup if user hasn't seen it this session
  useEffect(() => {
    if (!sessionStorage.getItem('welcomeSeen')) {
      const t = setTimeout(() => setShowPopup(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const dismissPopup = () => {
    setShowPopup(false)
    sessionStorage.setItem('welcomeSeen', '1')
  }

  return (
    <div className={styles.home}>
      {/* Slideshow background */}
      <div className={styles.slideshow}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === activeSlide ? styles.slideActive : ''}`}
            style={{
              background: `linear-gradient(135deg, ${slide.color} 0%, #3F1521 40%, #781727 100%)`,
              // Once you add real photos swap the line above for:
              // backgroundImage: `url(${[photo1,photo2,photo3,harwelden][i]})`,
              // backgroundSize: 'cover',
              // backgroundPosition: 'center',
            }}
          />
        ))}
        <div className={styles.overlay} />
      </div>

      {/* Slide indicators */}
      <div className={styles.indicators}>
        {SLIDES.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`} />
        ))}
      </div>

      {/* Hero content */}
      <div className={styles.hero}>
        <p className={styles.preTitle}>You are invited to the wedding of</p>
        <h1 className={styles.names}>Harrison & Daelyn</h1>
        <div className={styles.dateLine}>
          <span className={styles.dateBar} />
          <span className={styles.dateText}>September 25, 2026 &nbsp;·&nbsp; 5:00 – 10:00 PM</span>
          <span className={styles.dateBar} />
        </div>
        <p className={styles.location}>Harwelden Mansion · Tulsa, Oklahoma</p>

        <nav className={styles.ctaNav}>
          <Link to="/rsvp"     className={styles.cta}>RSVP</Link>
          <span className={styles.ctaDivider}>✦</span>
          <Link to="/details"  className={styles.cta}>Details</Link>
          <span className={styles.ctaDivider}>✦</span>
          <Link to="/registry" className={styles.cta}>Registry</Link>
        </nav>
      </div>

      {/* Welcome popup — only shows once per session */}
      {showPopup && (
        <div className={styles.popupOverlay} onClick={dismissPopup}>
          <div className={styles.popup} onClick={e => e.stopPropagation()}>
            <div className={styles.popupGold}>✦</div>
            <h2 className={styles.popupTitle}>Welcome!</h2>
            <p className={styles.popupText}>
              Welcome to Harrison and Daelyn's wedding website! Click the links to RSVP, check out our registry, and find more details about our wedding!
            </p>
            <button className={styles.popupBtn} onClick={dismissPopup}>
              Let's Celebrate
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}