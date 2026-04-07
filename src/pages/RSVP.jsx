import { useState, useMemo } from 'react'
import emailjs from '@emailjs/browser'
import Footer from '../components/Footer'
import styles from './RSVP.module.css'
import { Search, X, ChevronLeft, ChevronRight, Check } from 'lucide-react'

// ─────────────────────────────────────────────
// GUEST LIST
// Each entry has a display name for the list,
// and a members array for the form.
// For a single guest: members: ['First Last']
// For a couple:       members: ['Name 1', 'Name 2']
// For a family:       members: ['Parent 1', 'Parent 2', 'Child 1', ...]
// ─────────────────────────────────────────────
const GUESTS = [
  { id: 1,  name: 'Chris & Cara Gearhart',        members: ['Chris Gearhart', 'Cara Gearhart', 'Gabe Gearhart', 'Evelyn Gearhart', 'Eleanor Gearhart'] },
  { id: 2,  name: 'James & Margaret Thompson',    members: ['James Thompson', 'Margaret Thompson'] },
  { id: 3,  name: 'Robert Calloway',              members: ['Robert Calloway'] },
  { id: 4,  name: 'Susan & David Martinez',       members: ['Susan Martinez', 'David Martinez'] },
  { id: 5,  name: 'Emily Hargrove',               members: ['Emily Hargrove'] },
  { id: 6,  name: 'Thomas & Patricia Weston',     members: ['Thomas Weston', 'Patricia Weston'] },
  { id: 7,  name: 'Christopher Nguyen',           members: ['Christopher Nguyen'] },
  { id: 8,  name: 'Rebecca & Jonathan Ashford',   members: ['Rebecca Ashford', 'Jonathan Ashford'] },
  { id: 9,  name: 'Michael Sterling',             members: ['Michael Sterling'] },
  { id: 10, name: 'Laura & Brian Fontaine',       members: ['Laura Fontaine', 'Brian Fontaine'] },
  { id: 11, name: 'Daniel Kowalski',              members: ['Daniel Kowalski'] },
  { id: 12, name: 'Stephanie & Kevin Okafor',     members: ['Stephanie Okafor', 'Kevin Okafor'] },
  { id: 13, name: 'Andrew Prescott',              members: ['Andrew Prescott'] },
  { id: 14, name: 'Natalie & Ryan Belcher',       members: ['Natalie Belcher', 'Ryan Belcher'] },
  { id: 15, name: 'William Chambers',             members: ['William Chambers'] },
  { id: 16, name: 'Amanda & Scott Tillman',       members: ['Amanda Tillman', 'Scott Tillman'] },
  { id: 17, name: 'Jessica Moreau',               members: ['Jessica Moreau'] },
  { id: 18, name: 'Brandon & Tiffany Hollis',     members: ['Brandon Hollis', 'Tiffany Hollis'] },
  { id: 19, name: 'Cynthia Park',                 members: ['Cynthia Park'] },
  { id: 20, name: 'Gregory & Diane Sutherland',   members: ['Gregory Sutherland', 'Diane Sutherland'] },
]

const PER_PAGE = 8

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

// Build a blank attendees array from a guest's members list
const buildAttendees = (members) =>
  members.map(name => ({ name, attending: '' }))

export default function RSVP() {
  const [search, setSearch]         = useState('')
  const [page, setPage]             = useState(1)
  const [selected, setSelected]     = useState(null)
  const [attendees, setAttendees]   = useState([])
  const [songRequest, setSongRequest] = useState('')
  const [allergies, setAllergies]   = useState('')
  const [notes, setNotes]           = useState('')
  const [errors, setErrors]         = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  // Filter + paginate
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return q ? GUESTS.filter(g => g.name.toLowerCase().includes(q)) : GUESTS
  }, [search])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1) }

  const openModal = (guest) => {
    setSelected(guest)
    setAttendees(buildAttendees(guest.members))
    setSongRequest('')
    setAllergies('')
    setNotes('')
    setErrors({})
    setSubmitted(false)
  }

  const closeModal = () => {
    setSelected(null)
    setAttendees([])
    setErrors({})
    setSubmitted(false)
  }

  const setAttendeeStatus = (index, value) => {
    setAttendees(prev => prev.map((a, i) => i === index ? { ...a, attending: value } : a))
    setErrors(er => ({ ...er, [`attending_${index}`]: '' }))
  }

  const validate = () => {
    const e = {}
    attendees.forEach((a, i) => {
      if (!a.attending) e[`attending_${i}`] = 'Please select an option.'
    })
    if (!songRequest.trim()) e.songRequest = 'Please share a song request!'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)

    // Build a readable summary of who's attending
    const attendeeSummary = attendees
      .map(a => `${a.name}: ${a.attending}`)
      .join('\n')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          group_name:    selected.name,
          attendees:     attendeeSummary,
          song_request:  songRequest,
          allergies:     allergies || 'None',
          notes:         notes || 'None',
          to_email:      'hgearhart98@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitted(true)
    } catch (err) {
      console.error('EmailJS error:', err)
      alert('Something went wrong. Please try again or contact Harrison directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">RSVP</h1>
        <p className="page-subtitle">Find your name below and click to respond</p>

        {/* Search */}
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.search}
            placeholder="Search guest name here..."
            value={search}
            onChange={handleSearch}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => { setSearch(''); setPage(1) }}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Guest list */}
        <div className={styles.list}>
          {paginated.length === 0 ? (
            <div className={styles.empty}>
              No guests found matching "{search}".<br />
              Please contact Harrison if your name is missing.
            </div>
          ) : (
            paginated.map((guest, i) => (
              <button
                key={guest.id}
                className={styles.row}
                onClick={() => openModal(guest)}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span className={styles.rowNumber}>{(page - 1) * PER_PAGE + i + 1}</span>
                <span className={styles.rowName}>{guest.name}</span>
                <span className={styles.rowCta}>Click to RSVP →</span>
              </button>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button className={styles.pageBtn} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                className={`${styles.pageNum} ${n === page ? styles.pageActive : ''}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button className={styles.pageBtn} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        <p className={styles.note}>
          Don't see your name? Contact us at{' '}
          <a href="mailto:hgearhart98@gmail.com" className={styles.emailLink}>hgearhart98@gmail.com</a>
        </p>
      </div>

      {/* RSVP Modal */}
      {selected && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={closeModal}><X size={24} /></button>

            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}><Check size={28} /></div>
                <h2 className={styles.successTitle}>Thank You!</h2>
                <p className={styles.successText}>
                  We've received your RSVP. We can't wait to celebrate with you!
                </p>
                <button className={styles.submitBtn} onClick={closeModal}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.modalHeader}>
                  <p className={styles.modalPre}>RSVP for</p>
                  <h2 className={styles.modalName}>{selected.name}</h2>
                  <div className={styles.modalDivider}><span className={styles.modalDiamond} /></div>
                </div>

                {/* One attending toggle per member */}
                <div className={styles.field}>
                  <label className={styles.label}>Attendees <span className={styles.required}>*</span></label>
                  <div className={styles.attendeeList}>
                    {attendees.map((attendee, i) => (
                      <div key={i} className={styles.attendeeRow}>
                        <span className={styles.attendeeName}>{attendee.name}</span>
                        <div className={styles.attendeeToggles}>
                          {['Attending', 'Not Attending'].map(opt => (
                            <label
                              key={opt}
                              className={`${styles.toggleBtn} ${attendee.attending === opt ? styles.toggleActive : ''}`}
                            >
                              <input
                                type="radio"
                                name={`attending_${i}`}
                                value={opt}
                                checked={attendee.attending === opt}
                                onChange={() => setAttendeeStatus(i, opt)}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                        {errors[`attending_${i}`] && (
                          <p className={styles.error}>{errors[`attending_${i}`]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Song Request */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="song">Song / Favorite Couple Song <span className={styles.required}>*</span></label>
                  <input
                    id="song"
                    type="text"
                    className={`${styles.input} ${errors.songRequest ? styles.inputError : ''}`}
                    value={songRequest}
                    onChange={e => { setSongRequest(e.target.value); setErrors(er => ({ ...er, songRequest: '' })) }}
                    placeholder="Artist — Song Title"
                  />
                  {errors.songRequest && <p className={styles.error}>{errors.songRequest}</p>}
                </div>

                {/* Allergies */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="allergies">
                    Dietary Restrictions / Allergies
                    <span className={styles.labelNote}>(optional)</span>
                  </label>
                  <input
                    id="allergies"
                    type="text"
                    className={styles.input}
                    value={allergies}
                    onChange={e => setAllergies(e.target.value)}
                    placeholder="e.g. Gluten-free, Nut allergy, Vegan..."
                  />
                </div>

                {/* Notes */}
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="notes">
                    Notes / Comments
                    <span className={styles.labelNote}>(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    className={styles.textarea}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Anything else you'd like us to know..."
                    rows={3}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? 'Sending...' : 'Submit RSVP'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}