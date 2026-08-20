export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px]">
      {/* Phone frame */}
      <div className="relative rounded-[2rem] border-2 border-white/10 bg-midnight p-2 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-midnight rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="rounded-[1.5rem] overflow-hidden bg-slate-deep">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <span className="text-[10px] text-mist-dim font-body">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-2 rounded-sm bg-mist-dim" />
              <div className="w-3 h-2 rounded-sm bg-mist-dim" />
              <div className="w-3 h-2 rounded-sm bg-grove" />
            </div>
          </div>
          {/* Header */}
          <div className="px-4 pb-3">
            <p className="font-display text-gold text-sm font-semibold">Osogbo Live</p>
            <p className="text-[10px] text-mist-dim font-body">Fri 22 — Sat 23 Aug</p>
          </div>
          {/* Event cards */}
          <div className="space-y-2 px-3 pb-3">
            <div className="rounded-lg bg-midnight/60 p-2.5 border border-white/5">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-coral/20 flex items-center justify-center shrink-0">
                  <span className="text-coral text-xs">🎵</span>
                </div>
                <div className="min-w-0">
                  <p className="text-mist text-[11px] font-display font-medium leading-tight">Club Night @ Images</p>
                  <p className="text-mist-dim text-[9px] font-body">10 PM — GRA Estate</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-midnight/60 p-2.5 border border-white/5">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-grove/20 flex items-center justify-center shrink-0">
                  <span className="text-grove text-xs">⚽</span>
                </div>
                <div className="min-w-0">
                  <p className="text-mist text-[11px] font-display font-medium leading-tight">5-a-side Football</p>
                  <p className="text-mist-dim text-[9px] font-body">4 PM — UNIOSUN Sports Complex</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-midnight/60 p-2.5 border border-white/5">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-gold/20 flex items-center justify-center shrink-0">
                  <span className="text-gold text-xs">🌿</span>
                </div>
                <div className="min-w-0">
                  <p className="text-mist text-[11px] font-display font-medium leading-tight">Sacred Grove Tour</p>
                  <p className="text-mist-dim text-[9px] font-body">8 AM — Pickup at Clock Tower</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-midnight/60 p-2.5 border border-white/5">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-md bg-coral/20 flex items-center justify-center shrink-0">
                  <span className="text-coral text-xs">🎮</span>
                </div>
                <div className="min-w-0">
                  <p className="text-mist text-[11px] font-display font-medium leading-tight">Gaming Meetup</p>
                  <p className="text-mist-dim text-[9px] font-body">6 PM — Faculty Lounge, UNIOSUN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Glow */}
      <div className="absolute -inset-8 bg-gold/5 rounded-full blur-3xl -z-10" />
    </div>
  )
}
