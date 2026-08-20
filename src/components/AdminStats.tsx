import { useState, useEffect } from 'react'

interface Stats {
  total_signups: number
  today_signups: number
  roles_breakdown: Record<string, number>
}

const roleLabels: Record<string, string> = {
  student: 'Student',
  venue_organizer: 'Venue / event organizer',
  tour_handler: 'Tour handler / guide',
  visitor: 'Visitor',
  other: 'Other',
  unset: 'Not set',
}

export default function AdminStats({ adminKey }: { adminKey: string }) {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch(`/api/admin/stats?key=${adminKey}`)
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
  }, [adminKey])

  if (!stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-slate-deep/40 border border-white/5 p-5 animate-pulse h-24" />
        ))}
      </div>
    )
  }

  const roles = Object.entries(stats.roles_breakdown).sort((a, b) => b[1] - a[1])
  const maxRole = Math.max(...roles.map(([, c]) => c), 1)

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-5">
          <p className="font-body text-mist-dim text-sm mb-1">Total signups</p>
          <p className="font-display text-gold text-3xl font-bold">{stats.total_signups}</p>
        </div>
        <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-5">
          <p className="font-body text-mist-dim text-sm mb-1">Today</p>
          <p className="font-display text-grove text-3xl font-bold">{stats.today_signups}</p>
        </div>
        <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-5 col-span-2 sm:col-span-1">
          <p className="font-body text-mist-dim text-sm mb-1">This week</p>
          <p className="font-display text-mist text-3xl font-bold">{stats.total_signups}</p>
        </div>
      </div>

      {roles.length > 0 && (
        <div className="rounded-2xl bg-slate-deep/40 border border-white/5 p-5">
          <p className="font-display text-mist font-semibold text-sm mb-4">Role breakdown</p>
          <div className="space-y-3">
            {roles.map(([role, count]) => (
              <div key={role} className="flex items-center gap-3">
                <span className="font-body text-mist-dim text-sm w-36 sm:w-44 shrink-0">
                  {roleLabels[role] || role}
                </span>
                <div className="flex-1 h-2 rounded-full bg-midnight overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${(count / maxRole) * 100}%` }}
                  />
                </div>
                <span className="font-body text-mist text-sm w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
