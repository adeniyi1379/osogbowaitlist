import { useState, useEffect, useCallback } from 'react'

interface Submission {
  id: number
  email: string
  whatsapp: string | null
  role: string | null
  interests: string | null
  source: string | null
  created_at: string | null
}

interface SubmissionsResponse {
  total: number
  page: number
  per_page: number
  data: Submission[]
}

const roleOptions = [
  { value: '', label: 'All roles' },
  { value: 'student', label: 'Student' },
  { value: 'venue_organizer', label: 'Venue / event organizer' },
  { value: 'tour_handler', label: 'Tour handler / guide' },
  { value: 'visitor', label: 'Visitor' },
  { value: 'other', label: 'Other' },
]

const editRoleOptions = [
  { value: '', label: '—' },
  { value: 'student', label: 'Student' },
  { value: 'venue_organizer', label: 'Venue / event organizer' },
  { value: 'tour_handler', label: 'Tour handler / guide' },
  { value: 'visitor', label: 'Visitor' },
  { value: 'other', label: 'Other' },
]

export default function AdminTable({ adminKey }: { adminKey: string }) {
  const [data, setData] = useState<SubmissionsResponse | null>(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editRole, setEditRole] = useState('')
  const [editInterests, setEditInterests] = useState('')
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ key: adminKey, page: String(page), per_page: '20' })
    if (search) params.set('search', search)
    if (roleFilter) params.set('role', roleFilter)
    try {
      const res = await fetch(`/api/admin/submissions?${params}`)
      const json = await res.json()
      setData(json)
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [adminKey, page, search, roleFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    setPage(1)
  }, [search, roleFilter])

  const handleExport = () => {
    window.open(`/api/admin/export?key=${adminKey}&format=csv`, '_blank')
  }

  const startEdit = (s: Submission) => {
    setEditingId(s.id)
    setEditRole(s.role || '')
    setEditInterests(s.interests || '')
  }

  const saveEdit = async () => {
    if (editingId === null) return
    await fetch(`/api/admin/submissions/${editingId}?key=${adminKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: editRole || null, interests: editInterests || null }),
    })
    setEditingId(null)
    fetchData()
  }

  const confirmDelete = async () => {
    if (deletingId === null) return
    await fetch(`/api/admin/submissions/${deletingId}?key=${adminKey}`, {
      method: 'DELETE',
    })
    setDeletingId(null)
    fetchData()
  }

  const totalPages = data ? Math.ceil(data.total / data.per_page) : 0

  const formatDate = (iso: string | null) => {
    if (!iso) return '—'
    const d = new Date(iso)
    return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-deep border border-white/10 text-mist placeholder:text-mist-dim font-body text-sm focus:border-gold focus:ring-0"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-deep border border-white/10 text-mist font-body text-sm appearance-none cursor-pointer focus:border-gold"
        >
          {roleOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <button
          onClick={handleExport}
          className="px-5 py-2.5 rounded-xl bg-gold text-midnight font-display font-semibold text-sm hover:bg-gold/90 transition-colors cursor-pointer whitespace-nowrap"
        >
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-deep/40 border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider">#</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">WhatsApp</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Interests</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Source</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="px-4 py-3 font-display text-mist-dim text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && !data && (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td colSpan={8} className="px-4 py-4">
                      <div className="h-4 bg-midnight rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              )}
              {data?.data.map((s, i) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-midnight/30 transition-colors">
                  <td className="px-4 py-3 font-body text-mist-dim text-sm">{(page - 1) * 20 + i + 1}</td>
                  <td className="px-4 py-3 font-body text-mist text-sm">{s.email}</td>
                  <td className="px-4 py-3 font-body text-mist-dim text-sm hidden sm:table-cell">{s.whatsapp || '—'}</td>
                  <td className="px-4 py-3 font-body text-sm">
                    {editingId === s.id ? (
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="px-2 py-1 rounded-lg bg-midnight border border-white/10 text-mist text-sm focus:border-gold"
                      >
                        {editRoleOptions.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-mist">{s.role ? (roleOptions.find((o) => o.value === s.role)?.label || s.role) : '—'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-body text-mist-dim text-sm hidden md:table-cell">
                    {editingId === s.id ? (
                      <input
                        type="text"
                        value={editInterests}
                        onChange={(e) => setEditInterests(e.target.value)}
                        className="w-full px-2 py-1 rounded-lg bg-midnight border border-white/10 text-mist text-sm focus:border-gold"
                        placeholder="nightlife,tours"
                      />
                    ) : (
                      s.interests || '—'
                    )}
                  </td>
                  <td className="px-4 py-3 font-body text-mist-dim text-sm hidden lg:table-cell">{s.source || '—'}</td>
                  <td className="px-4 py-3 font-body text-mist-dim text-sm hidden lg:table-cell">{formatDate(s.created_at)}</td>
                  <td className="px-4 py-3">
                    {editingId === s.id ? (
                      <div className="flex gap-2">
                        <button onClick={saveEdit} className="text-grove text-xs font-display font-semibold hover:underline cursor-pointer">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-mist-dim text-xs font-display hover:underline cursor-pointer">Cancel</button>
                      </div>
                    ) : deletingId === s.id ? (
                      <div className="flex gap-2">
                        <button onClick={confirmDelete} className="text-coral text-xs font-display font-semibold hover:underline cursor-pointer">Confirm</button>
                        <button onClick={() => setDeletingId(null)} className="text-mist-dim text-xs font-display hover:underline cursor-pointer">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button onClick={() => startEdit(s)} className="text-gold text-xs font-display font-semibold hover:underline cursor-pointer">Edit</button>
                        <button onClick={() => setDeletingId(s.id)} className="text-coral text-xs font-display font-semibold hover:underline cursor-pointer">Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {data && data.data.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center font-body text-mist-dim text-sm">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl bg-slate-deep border border-white/10 text-mist font-body text-sm hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          <span className="font-body text-mist-dim text-sm">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl bg-slate-deep border border-white/10 text-mist font-body text-sm hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
