import Footer from '../components/Footer'
import styles from './Details.module.css'
import { MapPin, Clock, Shirt, Car, Hotel } from 'lucide-react'
import harweldenPhoto from '../assets/harwelden.webp'

export default function Details() {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Wedding Details</h1>
        <p className="page-subtitle">Everything you need to know</p>

        <div className={styles.venuePhoto}>
          <div className={styles.venuePhotoInner}>
            <img src={harweldenPhoto} alt="Harwelden Mansion" />
          </div>
          <p className={styles.venueCaption}>Harwelden Mansion · Tulsa, Oklahoma</p>
        </div>

        <div className={styles.grid}>

          {/* Date & Time */}
          <div className={styles.card}>
            <div className={styles.cardIcon}><Clock size={20} /></div>
            <h2 className={styles.cardTitle}>September 25, 2026</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardSub}>We kindly request all guests arrive around 4:00 PM. The ceremony will begin promptly at 4:30 PM and, to preserve the moment, late arrivals will be welcomed only after the ceremony has concluded.</p>
          </div>

          {/* Venue */}
          <div className={styles.card}>
            <div className={styles.cardIcon}><MapPin size={20} /></div>
            <h2 className={styles.cardTitle}>Harwelden Mansion</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardSub}>
              2210 S Main St<br />
              Tulsa, Oklahoma 74114
            </p>
            <a
              href="https://maps.google.com/?q=Harwelden+Mansion+Tulsa+Oklahoma"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Get Directions →
            </a>
          </div>

          {/* Hotel */}
          <div className={styles.card}>
            <div className={styles.cardIcon}><Hotel size={20} /></div>
            <h2 className={styles.cardTitle}>Brut Hotel</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardSub}>
              A room block has been reserved for our guests.
            </p>
            <a
              href="https://hotels.cloudbeds.com/reservation/CQhAqR?allotment_block_code=b505745#checkin=2026-09-25&checkout=2026-09-26"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              Book Your Room →
            </a>
          </div>

          {/* Dress Code */}
          <div className={styles.card}>
            <div className={styles.cardIcon}><Shirt size={20} /></div>
            <h2 className={styles.cardTitle}>Formal Attire</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardSub}>
              Please avoid white and ivory. We'd love to see you in our wedding colors — plums, pinks, and greens!
            </p>
          </div>

          {/* Parking */}
          <div className={`${styles.card} ${styles.wide}`}>
            <div className={styles.cardIcon}><Car size={20} /></div>
            <h2 className={styles.cardTitle}>Parking</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardSub}>
              Parking is available on the premises and some street parking. The Harwelden also owns the lot on the southwest corner of 21st and Main Street which can be used. Events of 50 or more are required to secure valet. No parking in the adjacent private lots.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}