import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

import HD1 from '../assets/HD-1.webp'
import HD2 from '../assets/HD-2.webp'
import HD3 from '../assets/HD-3.webp'
import HD10 from '../assets/HD-10.webp'
import HD7 from '../assets/HD-7.webp'

const SLIDES = [HD1, HD2, HD3, HD10, HD7]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [showPopup, setShowPopup]     = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(s => (s + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

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
      <div className={styles.slideshow}>
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${i === activeSlide ? styles.slideActive : ''}`}
          >
            <img src={slide} alt="" className={styles.slideImg} />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>

      <div className={styles.indicators}>
        {SLIDES.map((_, i) => (
          <span key={i} className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ''}`} />
        ))}
      </div>

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
    </div>
  )
}
