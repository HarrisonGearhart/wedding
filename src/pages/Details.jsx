import Footer from '../components/Footer'
import styles from './Details.module.css'
import { MapPin, Clock, Shirt, Car, Hotel } from 'lucide-react'

export default function Details() {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Wedding Details</h1>
        <p className="page-subtitle">Everything you need to know</p>

        {/* Harwelden photo placeholder */}
        <div className={styles.venuePhoto}>
          <div className={styles.venuePhotoInner}>
            {/* Replace this div with: <img src={harweldenPhoto} alt="Harwelden Mansion" /> */}
            <p className={styles.venuePhotoPlaceholder}>Harwelden Mansion Photo</p>
          </div>
          <p className={styles.venueCaption}>Harwelden Mansion · Tulsa, Oklahoma</p>
        </div>

        <div className={styles.grid}>

          {/* Date & Time */}
          <div className={styles.card}>
            <div className={styles.cardIcon}><Clock size={20} /></div>
            <h2 className={styles.cardTitle}>Date & Time</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardMain}>September 25, 2026</p>
            <p className={styles.cardSub}>5:00 PM – 10:00 PM</p>
          </div>

          {/* Venue */}
          <div className={styles.card}>
            <div className={styles.cardIcon}><MapPin size={20} /></div>
            <h2 className={styles.cardTitle}>Venue</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardMain}>Harwelden Mansion</p>
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
            <h2 className={styles.cardTitle}>Hotel Block</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardMain}>Hotel Name Here</p>
            <p className={styles.cardSub}>
              A room block has been reserved for our guests.
            </p>
            <p className={styles.code}>
              Booking Code: <strong>GEARHART2026</strong>
            </p>
            <a
              href="#"
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
            <h2 className={styles.cardTitle}>Dress Code</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <p className={styles.cardMain}>Cocktail Attire</p>
            <p className={styles.cardSub}>
              Please avoid white and ivory. We'd love to see our wedding colors — deep wines, dusty roses, and warm golds!
            </p>
          </div>

          {/* Parking */}
          <div className={`${styles.card} ${styles.wide}`}>
            <div className={styles.cardIcon}><Car size={20} /></div>
            <h2 className={styles.cardTitle}>Parking</h2>
            <div className={styles.divider}><span className={styles.diamond} /></div>
            <div className={styles.parkingOptions}>
              <div className={styles.parkingOption}>
                <p className={styles.parkingLabel}>On-Site Parking</p>
                <p className={styles.cardSub}>Free parking is available in the venue lot. Enter from Main Street.</p>
              </div>
              <div className={styles.parkingOption}>
                <p className={styles.parkingLabel}>Street Parking</p>
                <p className={styles.cardSub}>Street parking is available on nearby streets at no charge.</p>
              </div>
              <div className={styles.parkingOption}>
                <p className={styles.parkingLabel}>Rideshare</p>
                <p className={styles.cardSub}>Uber and Lyft drop-off at the main entrance.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}