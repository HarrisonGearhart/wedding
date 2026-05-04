import Footer from '../components/Footer'
import styles from './Registry.module.css'
import { Gift } from 'lucide-react'

const REGISTRY_URL = 'https://overthemoon.com/apps/registry/dewitt-gearhart-eb2d/experiences'

export default function Registry() {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Registry</h1>
        <p className="page-subtitle">Your presence is our greatest gift</p>

        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Gift size={28} strokeWidth={1.5} />
          </div>

          <div className={styles.divider}>
            <span className={styles.line} />
            <span className={styles.diamond} />
            <span className={styles.line} />
          </div>

          <p className={styles.sentiment}>
            Your presence at our wedding is the greatest gift we could ask for.
          </p>
          <p className={styles.body}>
            We have been so fortunate in building our life together, and truly, your love and celebration mean everything to us. Should you wish to honor us with a gift, we are deeply grateful — but please know that no gesture is ever expected or required.
          </p>

          <a
            href={REGISTRY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btn}
          >
            Click Here to View Our Registry →
          </a>

          <p className={styles.note}>
            You'll be directed to our registry page in a new tab.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}