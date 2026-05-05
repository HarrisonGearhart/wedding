import { useState, useMemo } from 'react'
import emailjs from '@emailjs/browser'
import Footer from '../components/Footer'
import styles from './RSVP.module.css'
import { Search, X, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const GUESTS = [
  { id: 1,  name: 'Lexi Marroquin & Ben Armstrong',      members: ['Lexi Marroquin', 'Ben Armstrong'] },
  { id: 2,  name: 'Mark & Sarah Antonio',                members: ['Mark Antonio', 'Sarah Antonio'] },
  { id: 3,  name: 'Brenna Allen',                        members: ['Brenna Allen'] },
  { id: 4,  name: 'Leighan & Lance Allen',               members: ['Leighan Allen', 'Lance Allen'] },
  { id: 5,  name: 'Todd Allen & Christine Bovier',        members: ['Todd Allen', 'Christine Bovier'] },
  { id: 6,  name: 'Brady Bean & Reese Charles',          members: ['Brady Bean', 'Reese Charles'] },
  { id: 7,  name: 'Carter & Katie Clancy',               members: ['Carter Clancy', 'Katie Clancy'] },
  { id: 8,  name: 'Teresa Cooper',                       members: ['Teresa Cooper'] },
  { id: 9,  name: 'Kristi Reed & Jason Crouch',          members: ['Kristi Reed', 'Jason Crouch'] },
  { id: 10, name: 'Dale & Carol DeWitt',                 members: ['Dale DeWitt', 'Carol DeWitt'] },
  { id: 11, name: 'Drake DeWitt',                        members: ['Drake DeWitt'] },
  { id: 12, name: 'Kylie & Tyler French',                members: ['Kylie French', 'Tyler French'] },
  { id: 13, name: 'Aaron & Robyn Gearhart',              members: ['Aaron Gearhart', 'Robyn Gearhart'] },
  { id: 14, name: 'Chris & Cara Gearhart',               members: ['Chris Gearhart', 'Cara Gearhart', 'Gabe Gearhart', 'Evelyn Gearhart', 'Eleanor Gearhart'] },
  { id: 15, name: 'Connor Gearhart',                     members: ['Connor Gearhart'] },
  { id: 16, name: 'Harry & Sandy Gearhart',              members: ['Harry Gearhart', 'Sandy Gearhart'] },
  { id: 17, name: 'Pat & Jackie Gearhart',               members: ['Pat Gearhart', 'Jackie Gearhart'] },
  { id: 18, name: 'Phyllis Grell',                       members: ['Phyllis Grell'] },
  { id: 19, name: 'Bob Hill',                            members: ['Bob Hill'] },
  { id: 20, name: 'Steve Hill',                          members: ['Steve Hill'] },
  { id: 21, name: 'Camille & Barclay Holt & Bryan Holt', members: ['Camille Holt', 'Barclay Holt', 'Bryan Holt'] },
  { id: 22, name: 'Kaylee Holt',                         members: ['Kaylee Holt'] },
  { id: 23, name: 'Lynsey Naugle & Seth Hughes',         members: ['Lynsey Naugle', 'Seth Hughes'] },
  { id: 24, name: 'Zach & Katie Johnston',               members: ['Zach Johnston', 'Katie Johnston'] },
  { id: 25, name: 'Brenna & Nathan Major',               members: ['Brenna Major', 'Nathan Major'] },
  { id: 26, name: 'Taylor & Chad Coccaro',               members: ['Taylor Coccaro', 'Chad Coccaro'] },
  { id: 27, name: 'Andrea Puigbo',                       members: ['Andrea Puigbo'] },
  { id: 28, name: 'Hannah & Dom Richert',                members: ['Hannah Richert', 'Dom Richert'] },
  { id: 29, name: 'Fritzie & Barry Roop',                members: ['Fritzie Roop', 'Barry Roop'] },
  { id: 30, name: 'Lisa & Danny Sanchez',                members: ['Lisa Sanchez', 'Danny Sanchez'] },
  { id: 31, name: 'Logan & Kaleb Townsend',              members: ['Logan Townsend', 'Kaleb Townsend'] },
  { id: 32, name: 'Test Harrison',                       members: ['Test Harrison'] },
]

const PER_PAGE = 8
const EMAILJS_SERVICE_ID  = 'service_rnfz7bt'
const EMAILJS_TEMPLATE_ID = 'template_oafmznh'
const EMAILJS_PUBLIC_KEY  = 'V1dhIXrHcH3H3INMH'

const buildAttendees = (members) => members.map(name => ({ name, attending: '' }))

export default function RSVP() {
  const [search, setSearch]           = useState('')
  const [query, setQuery]             = useState('')
  const [page, setPage]               = useState(1)
  const [selected, setSelected]       = useState(null)
  const [attendees, setAttendees]     = useState([])
  const [songRequest, setSongRequest] = useState('')
  const [allergies, setAllergies]     = useState('')
  const [notes, setNotes]             = useState('')
  const [errors, setErrors]           = useState({})
  const [submitting, setSubmitting]   = useState(false)
  const [submitted, setSubmitted]     = useState(false)

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return q ? GUESTS.filter(g => g.name.toLowerCase().includes(q)) : []
  }, [query])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (e) => { setSearch(e.target.value) }
  const handleSearchSubmit = () => { setQuery(search); setPage(1) }
  const handleSearchKey = (e) => { if (e.key === 'Enter') handleSearchSubmit() }

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
    const attendeeSummary = attendees.map(a => `${a.name}: ${a.attending}`).join('\n')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          group_name:   selected.name,
          attendees:    attendeeSummary,
          song_request: songRequest,
          allergies:    allergies || 'None',
          notes:        notes || 'None',
          to_email:     'hgearhart98@gmail.com',
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

        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} onClick={handleSearchSubmit} style={{cursor:'pointer'}} />
          <input
            type="text"
            className={styles.search}
            placeholder="Search guest name here..."
            value={search}
            onChange={handleSearch}
            onKeyDown={handleSearchKey}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => { setSearch(''); setQuery(''); setPage(1) }}>
              <X size={14} />
            </button>
          )}
        </div>
        <button className={styles.searchBtn} onClick={handleSearchSubmit}>
          Search
        </button>

        <div className={styles.list}>
          {!query.trim() ? (
            <div className={styles.prompt}>
              Type your name above and hit <strong>Search</strong> to find your RSVP form.
            </div>
          ) : paginated.length === 0 ? (
            <div className={styles.empty}>
              No guests found matching "{query}".<br />
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

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="song">
                    Song / Favorite Couple Song <span className={styles.required}>*</span>
                  </label>
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