export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div>
        <div className="text-sm font-medium text-white">Plant A / Line 1</div>
        <div className="text-xs text-slate-400">실시간 연결 상태 · 정상</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          System Healthy
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-right">
          <div className="text-sm text-white">Admin Lee</div>
          <div className="text-xs uppercase text-slate-400">admin</div>
        </div>
      </div>
    </header>
  );
}
