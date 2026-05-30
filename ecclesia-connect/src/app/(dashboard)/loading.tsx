export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1e3f6b]">
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12 animate-pulse">
          <path d="M30 6 L30 54 M16 22 L44 22" stroke="#b8923a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="w-6 h-6 border-2 border-white/20 border-t-[#b8923a] rounded-full animate-spin" />
      </div>
    </div>
  )
}
