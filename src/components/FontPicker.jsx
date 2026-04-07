import { useState } from 'react'
import styles from './FontPicker.module.css'

const FONTS = [
  { name: 'Cormorant Garamond', body: 'Montserrat',  label: 'Cormorant',   desc: 'Elegant & slim' },
  { name: 'Playfair Display',   body: 'Raleway',     label: 'Playfair',    desc: 'Bold & classic' },
  { name: 'Libre Baskerville',  body: 'Jost',        label: 'Baskerville', desc: 'Traditional' },
  { name: 'EB Garamond',        body: 'Montserrat',  label: 'EB Garamond', desc: 'Old-world serif' },
  { name: 'Lora',               body: 'Raleway',     label: 'Lora',        desc: 'Warm & readable' },
]

export default function FontPicker({ currentFont, onFontChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <button className={styles.trigger} onClick={() => setOpen(o => !o)} title="Change font">
        <span className={styles.icon}>Aa</span>
      </button>

      {open && (
        <div className={styles.panel}>
          <p className={styles.label}>Choose a font style</p>
          <div className={styles.options}>
            {FONTS.map(f => (
              <button
                key={f.name}
                className={`${styles.option} ${currentFont === f.name ? styles.selected : ''}`}
                onClick={() => { onFontChange(f.name, f.body); setOpen(false) }}
              >
                <span
                  className={styles.sample}
                  style={{ fontFamily: `'${f.name}', serif` }}
                >
                  Harrison & Daelyn
                </span>
                <span className={styles.meta}>
                  <span className={styles.fontName}>{f.label}</span>
                  <span className={styles.fontDesc}>{f.desc}</span>
                </span>
              </button>
            ))}
          </div>
          <p className={styles.note}>Tell Harrison which one you love!</p>
        </div>
      )}
    </div>
  )
}