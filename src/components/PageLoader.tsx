export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#070312]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-fuchsia-400/30 border-t-fuchsia-400 rounded-full animate-spin" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#b8b3e0]">Loading</span>
      </div>
    </div>
  )
}
