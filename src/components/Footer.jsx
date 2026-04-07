import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.names}>Harrison & Daelyn</p>
        <p className={styles.date}>September 25, 2026</p>
        <nav className={styles.nav}>
          <Link to="/"         className={styles.link}>Home</Link>
          <span className={styles.dot}>✦</span>
          <Link to="/rsvp"     className={styles.link}>RSVP</Link>
          <span className={styles.dot}>✦</span>
          <Link to="/details"  className={styles.link}>Details</Link>
          <span className={styles.dot}>✦</span>
          <Link to="/registry" className={styles.link}>Registry</Link>
        </nav>
        <p className={styles.copy}>Made with Love © Harrison Gearhart</p>
      </div>
    </footer>
  )
}