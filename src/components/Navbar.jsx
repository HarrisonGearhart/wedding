import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`${styles.navbar} ${scrolled || !isHome ? styles.solid : styles.transparent}`}
      style={{ top: 36 }}
    >
      <div className={styles.inner}>
        <ul className={styles.links}>
          {!isHome && (
            <li><Link to="/" className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}>Home</Link></li>
          )}
          <li><Link to="/rsvp"     className={`${styles.link} ${location.pathname === '/rsvp'     ? styles.active : ''}`}>RSVP</Link></li>
          <li><Link to="/details"  className={`${styles.link} ${location.pathname === '/details'  ? styles.active : ''}`}>Details</Link></li>
          <li><Link to="/registry" className={`${styles.link} ${location.pathname === '/registry' ? styles.active : ''}`}>Registry</Link></li>
        </ul>
      </div>
    </nav>
  )
}