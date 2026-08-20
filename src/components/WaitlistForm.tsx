import { useState, type FormEvent } from 'react'

interface WaitlistFormProps {
  onSuccess?: () => void
  compact?: boolean
}

export default function WaitlistForm({ onSuccess, compact }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          whatsapp: whatsapp.trim() || null,
          source: 'landing_page',
        }),
      })

      if (res.status === 409) {
        setError('This email is already on the list.')
        setLoading(false)
        return
      }

      if (!res.ok) throw new Error('Something went wrong. Try again.')

      localStorage.setItem('osogbo_email', email.toLowerCase().trim())
      onSuccess?.()
    } catch {
      setError('Network error. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'space-y-3' : 'space-y-4'}>
      <div>
        <label htmlFor="email" className="sr-only">Email address</label>
        <input
          id="email"
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl bg-slate-deep border border-white/10 text-mist placeholder:text-mist-dim font-body text-base focus:border-gold focus:ring-0 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="whatsapp" className="sr-only">WhatsApp number (optional)</label>
        <input
          id="whatsapp"
          type="tel"
          placeholder="WhatsApp number (optional) — 080... or +234..."
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl bg-slate-deep border border-white/10 text-mist placeholder:text-mist-dim font-body text-base focus:border-gold focus:ring-0 transition-colors"
        />
      </div>
      {error && (
        <p className="text-coral text-sm font-body">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gold text-midnight font-display font-semibold text-base hover:bg-gold/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? 'Joining...' : 'Join the waitlist'}
      </button>
    </form>
  )
}
