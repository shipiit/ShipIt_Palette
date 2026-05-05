// ShipIt Palette logo — a rounded mark with three brand-tinted dots arranged
// like a rocket trail, plus a small spark. Uses CSS variables so it recolors
// with the user's selected palette.
export default function Logo({ size = 36, withWordmark = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" aria-label="ShipIt Palette">
        <defs>
          <linearGradient id="cps-logo-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="var(--brand-500)" />
            <stop offset="100%" stopColor="var(--brand-700)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="40" height="40" rx="10" fill="url(#cps-logo-bg)" />
        <circle cx="13" cy="27" r="3.2" fill="white" opacity="0.95" />
        <circle cx="20" cy="20" r="3.6" fill="white" />
        <circle cx="27" cy="13" r="3.2" fill="white" opacity="0.85" />
        <path
          d="M30 8.5 L32.5 6 M30 11 L33.5 11 M27.5 8.5 L27.5 6"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Studio</span>
          <span className="text-[15px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            ShipIt <span style={{ color: 'var(--brand-600)' }}>Palette</span>
          </span>
        </span>
      )}
    </span>
  );
}
