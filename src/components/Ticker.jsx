import styles from './Ticker.module.css'

const MESSAGE = "✦ New Gearhart coming soon! ✦ Harrison & Daelyn ✦ September 25, 2026 ✦ New Gearhart coming soon! ✦ Harrison & Daelyn ✦ September 25, 2026 ✦ New Gearhart coming soon! ✦ Harrison & Daelyn ✦ September 25, 2026 ✦"

export default function Ticker() {
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        <span>{MESSAGE}</span>
        <span aria-hidden="true">{MESSAGE}</span>
      </div>
    </div>
  )
}