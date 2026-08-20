import { useState, useEffect, type FormEvent } from 'react'
import AdirePattern from '../components/AdirePattern'

const roles = [
  { value: '', label: 'Which best describes you?' },
  { value: 'student', label: 'Student' },
  { value: 'venue_organizer', label: 'Venue or event organizer' },
  { value: 'tour_handler', label: 'Tour handler or guide' },
  { value: 'visitor', label: 'Visitor to Osogbo' },
  { value: 'other', label: 'Other' },
]

const interests = [
  { id: 'nightlife', label: 'Nightlife & parties' },
  { id: 'uni_events', label: 'University events' },
  { id: 'gaming', label: 'Gamers & gaming' },
  { id: 'football', label: '5-a-side football & sports' },
  { id: 'tours', label: 'Local tours & experiences' },
  { id: 'all', label: 'All of the above' },
]

export default function ThankYou() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('osogbo_email')
    if (stored) setEmail(stored)
  }, [])

  const handleInterestToggle = (id: string) => {
    if (id === 'all') {
      setSelectedInterests(selectedInterests.length === interests.length ? [] : interests.map((i) => i.id))
      return
    }
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev.filter((i) => i !== 'all'), id]
    )
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/segment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, interests: selectedInterests }),
      })
      setSaved(true)
    } catch {
      // silent — non-critical
    }
  }

  const referralText = "I just joined the Osogbo Live waitlist — events, parties, meetups & tours in Osogbo, all in one app. Join me: https://osogbolive.com"

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(referralText)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-midnight relative overflow-hidden">
      <AdirePattern />
      <div className="relative max-w-lg mx-auto px-5 pt-20 pb-16 text-center">
        {/* Success message */}
        <div className="animate-fade-up mb-10">
          <div className="w-16 h-16 rounded-full bg-grove/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-mist mb-3">
            You're on the list!
          </h1>
          <p className="font-body text-mist-dim text-lg">
            We'll email you when early access opens.
          </p>
        </div>

        {/* Segmentation form */}
        {!saved && (
          <form onSubmit={handleSave} className="animate-fade-up delay-100 text-left space-y-5 mb-12 opacity-0">
            <div>
              <label htmlFor="role-select" className="block font-display text-mist font-medium text-sm mb-2">
                Quick question — which best describes you?
              </label>
              <select
                id="role-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-deep border border-white/10 text-mist font-body text-base appearance-none cursor-pointer focus:border-gold"
              >
                {roles.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-display text-mist font-medium text-sm mb-3">What are you most interested in?</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interests.map((i) => (
                  <label
                    key={i.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedInterests.includes(i.id)
                        ? 'border-gold bg-gold/10 text-mist'
                        : 'border-white/10 bg-slate-deep/60 text-mist-dim hover:border-white/20'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(i.id)}
                      onChange={() => handleInterestToggle(i.id)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      selectedInterests.includes(i.id) ? 'bg-gold border-gold' : 'border-white/30'
                    }`}>
                      {selectedInterests.includes(i.id) && (
                        <svg className="w-3 h-3 text-midnight" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="font-body text-sm">{i.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold text-midnight font-display font-semibold text-base hover:bg-gold/90 active:scale-[0.98] transition-all cursor-pointer"
            >
              Save my preferences
            </button>
          </form>
        )}

        {saved && (
          <div className="animate-fade-up mb-12">
            <p className="font-body text-grove text-sm">Preferences saved — thanks!</p>
          </div>
        )}

        {/* Share */}
        <div className="animate-fade-up delay-200 rounded-2xl bg-slate-deep/60 border border-white/5 p-6 text-center opacity-0">
          <h2 className="font-display text-mist font-semibold text-lg mb-2">
            Invite friends to jump the queue
          </h2>
          <p className="font-body text-mist-dim text-sm mb-5">
            The more people who join, the faster we launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleWhatsApp}
              className="px-5 py-3 rounded-xl bg-grove/20 text-grove font-display font-medium text-sm hover:bg-grove/30 transition-colors cursor-pointer"
            >
              Share on WhatsApp
            </button>
            <button
              onClick={handleCopy}
              className="px-5 py-3 rounded-xl bg-white/5 text-mist font-display font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy invite link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
