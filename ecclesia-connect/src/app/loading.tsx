export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1e3f6b]">
      <div className="flex flex-col items-center gap-6">
        {/* Cross */}
        <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14 animate-pulse">
          <path d="M30 6 L30 54 M16 22 L44 22" stroke="#b8923a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        {/* Name */}
        <div className="text-center">
          <h1 className="font-cathedral text-xl font-bold text-white tracking-wide">
            Ecclesia Connect
          </h1>
          <p className="text-xs text-white/40 tracking-[0.15em] uppercase mt-1">
            Chargement...
          </p>
        </div>
        {/* Simple spinner */}
        <div className="w-8 h-8 border-2 border-white/20 border-t-[#b8923a] rounded-full animate-spin" />
      </div>
    </div>
  )
}
