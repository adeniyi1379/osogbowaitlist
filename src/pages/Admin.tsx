import { useState } from 'react'
import AdminStats from '../components/AdminStats'
import AdminTable from '../components/AdminTable'

export default function Admin() {
  const [adminKey, setAdminKey] = useState<string | null>(() => localStorage.getItem('osogbo_admin_key'))
  const [inputKey, setInputKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: inputKey }),
      })

      if (!res.ok) {
        setError('Invalid key. Try again.')
        setLoading(false)
        return
      }

      localStorage.setItem('osogbo_admin_key', inputKey)
      setAdminKey(inputKey)
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('osogbo_admin_key')
    setAdminKey(null)
    setInputKey('')
  }

  if (!adminKey) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-mist mb-2">Osogbo Live Admin</h1>
            <p className="font-body text-mist-dim text-sm">Enter your admin key to continue.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-key" className="sr-only">Admin key</label>
              <input
                id="admin-key"
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter admin key"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-deep border border-white/10 text-mist placeholder:text-mist-dim font-body text-base focus:border-gold focus:ring-0"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-coral text-sm font-body">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading || !inputKey}
              className="w-full py-3.5 rounded-xl bg-gold text-midnight font-display font-semibold text-base hover:bg-gold/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Checking...' : 'Enter dashboard'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-midnight">
      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-mist">Osogbo Live Admin</h1>
            <p className="font-body text-mist-dim text-sm mt-1">Manage waitlist submissions and view stats.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-deep border border-white/10 text-mist font-body text-sm hover:bg-white/5 transition-colors"
            >
              View site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-white/5 text-mist-dim font-body text-sm hover:bg-coral/20 hover:text-coral transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <AdminStats adminKey={adminKey} />

        {/* Table */}
        <AdminTable adminKey={adminKey} />
      </div>
    </div>
  )
}
