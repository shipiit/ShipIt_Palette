// Unique animated SVG icon for every tool. CSS animations only (GPU-friendly).

const COMMON = {
  width: 28, height: 28, viewBox: '0 0 28 28', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
};

export default function ToolIcon({ id, size = 28 }) {
  const svgProps = { ...COMMON, width: size, height: size };
  const node = ICONS[id];
  if (!node) return <svg {...svgProps}><circle cx="14" cy="14" r="6" /></svg>;
  return <svg {...svgProps}><style>{KEYFRAMES}</style>{node}</svg>;
}

const KEYFRAMES = `
@keyframes ti-spin { to { transform: rotate(360deg); } }
@keyframes ti-bob  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
@keyframes ti-pulse { 0%,100% { transform: scale(1); opacity:1; } 50% { transform: scale(1.18); opacity:.7; } }
@keyframes ti-fade  { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
@keyframes ti-dash  { to { stroke-dashoffset: -10; } }
@keyframes ti-slide { 0%,100% { transform: translateX(0); } 50% { transform: translateX(2px); } }
.ti-spin   { animation: ti-spin 6s linear infinite; transform-origin: 14px 14px; }
.ti-bob    { animation: ti-bob 2.4s ease-in-out infinite; }
.ti-bob-1  { animation: ti-bob 2.4s ease-in-out .2s infinite; }
.ti-bob-2  { animation: ti-bob 2.4s ease-in-out .4s infinite; }
.ti-bob-3  { animation: ti-bob 2.4s ease-in-out .6s infinite; }
.ti-pulse  { animation: ti-pulse 2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
.ti-fade   { animation: ti-fade 1.6s ease-in-out infinite; }
.ti-fade-1 { animation: ti-fade 1.6s ease-in-out .3s infinite; }
.ti-fade-2 { animation: ti-fade 1.6s ease-in-out .6s infinite; }
.ti-dash   { stroke-dasharray: 4 3; animation: ti-dash 1.5s linear infinite; }
.ti-slide  { animation: ti-slide 1.6s ease-in-out infinite; }
`;

const ICONS = {
  semantic: (
    <g>
      {[6, 11, 16, 21].map((y, i) => (
        <rect key={i} x="5" y={y - 2} width={[14, 12, 16, 10][i]} height="3" rx="1.5" fill="currentColor" opacity={0.4 + i * 0.18} className={`ti-fade-${i % 3}`} />
      ))}
    </g>
  ),
  brandkit: (
    <g>
      <circle cx="10" cy="10" r="5" fill="currentColor" opacity="0.85" className="ti-pulse" />
      <circle cx="18" cy="11" r="5" fill="currentColor" opacity="0.55" className="ti-pulse" style={{ animationDelay: '.2s' }} />
      <circle cx="14" cy="18" r="5" fill="currentColor" opacity="0.7" className="ti-pulse" style={{ animationDelay: '.4s' }} />
    </g>
  ),
  saved: (
    <g className="ti-bob">
      <path d="M8 5h12v18l-6-4-6 4z" fill="currentColor" opacity="0.85" />
      <path d="M14 9l1.5 3 3.3.3-2.5 2.2.8 3.2-3.1-1.7-3.1 1.7.8-3.2-2.5-2.2 3.3-.3z" fill="white" opacity="0.9" />
    </g>
  ),
  compare: (
    <g>
      <rect x="3"  y="6" width="13" height="13" rx="2" fill="currentColor" opacity="0.5" className="ti-slide" />
      <rect x="12" y="9" width="13" height="13" rx="2" fill="currentColor" opacity="0.85" />
    </g>
  ),
  custom: (
    <g>
      <line x1="6" y1="7" x2="22" y2="7" stroke="currentColor" opacity="0.3" strokeWidth="1.2" />
      <line x1="6" y1="14" x2="22" y2="14" stroke="currentColor" opacity="0.3" strokeWidth="1.2" />
      <line x1="6" y1="21" x2="22" y2="21" stroke="currentColor" opacity="0.3" strokeWidth="1.2" />
      <circle cx="10" cy="7"  r="2.5" fill="currentColor" className="ti-bob" />
      <circle cx="17" cy="14" r="2.5" fill="currentColor" className="ti-bob-1" />
      <circle cx="13" cy="21" r="2.5" fill="currentColor" className="ti-bob-2" />
    </g>
  ),
  ai: (
    <g>
      <path d="M14 4l1.5 4.5L20 10l-4.5 1.5L14 16l-1.5-4.5L8 10l4.5-1.5z" fill="currentColor" className="ti-pulse" />
      <circle cx="22" cy="20" r="2" fill="currentColor" className="ti-fade-1" />
      <circle cx="6"  cy="22" r="1.5" fill="currentColor" className="ti-fade-2" />
    </g>
  ),
  image: (
    <g>
      <rect x="4" y="6" width="20" height="16" rx="2.5" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
      <circle cx="10" cy="12" r="2" fill="currentColor" className="ti-pulse" />
      <path d="M4 19l5-4 4 3 4-2 7 5" stroke="currentColor" fill="none" strokeWidth="1.6" />
      <circle cx="22" cy="8" r="1.5" fill="currentColor" className="ti-fade" />
    </g>
  ),
  blindness: (
    <g>
      <ellipse cx="14" cy="14" rx="11" ry="6.5" stroke="currentColor" fill="currentColor" fillOpacity="0.12" />
      <circle cx="14" cy="14" r="3.5" fill="currentColor" className="ti-pulse" />
      <circle cx="14" cy="14" r="1.5" fill="white" />
    </g>
  ),
  pairs: (
    <g>
      <circle cx="7"  cy="14" r="3" fill="currentColor" className="ti-bob" />
      <circle cx="21" cy="14" r="3" fill="currentColor" className="ti-bob-2" />
      <line x1="10" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="1.6" className="ti-dash" />
    </g>
  ),
  gradient: (
    <g>
      <defs>
        <linearGradient id="ti-grad-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <rect x="4" y="9" width="20" height="10" rx="3" fill="url(#ti-grad-1)" />
      <circle cx="6" cy="14" r="2" fill="white" stroke="currentColor" />
      <circle cx="22" cy="14" r="2" fill="currentColor" />
    </g>
  ),
  textcolor: (
    <g className="ti-bob">
      <text x="14" y="20" fontSize="18" fontWeight="800" textAnchor="middle" fill="currentColor">Aa</text>
      <circle cx="22" cy="6" r="2.5" fill="currentColor" className="ti-pulse" />
    </g>
  ),
  matrix: (
    <g>
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
        <rect key={`${r}-${c}`} x={5 + c * 6} y={5 + r * 6} width="5" height="5" rx="1" fill="currentColor"
          opacity={0.3 + ((r + c) % 3) * 0.25}
          className={`ti-fade-${(r + c) % 3}`} />
      )))}
    </g>
  ),
  figma: (
    <g className="ti-bob">
      <circle cx="14" cy="9"  r="4" fill="#f24e1e" />
      <circle cx="10" cy="14" r="4" fill="#a259ff" />
      <circle cx="18" cy="14" r="4" fill="#1abcfe" />
      <circle cx="10" cy="19" r="4" fill="#0acf83" />
      <circle cx="14" cy="19" r="2" fill="#ff7262" />
    </g>
  ),
  tailwind: (
    <g className="ti-slide">
      <path d="M5 14c1.5-4 4-5.5 7-5.5 4.5 0 4.5 2 7.5 2 2 0 3-1 4-2.5-1.5 4-4 5.5-7 5.5-4.5 0-4.5-2-7.5-2-2 0-3 1-4 2.5z" fill="currentColor" opacity="0.5" />
      <path d="M5 20c1.5-4 4-5.5 7-5.5 4.5 0 4.5 2 7.5 2 2 0 3-1 4-2.5-1.5 4-4 5.5-7 5.5-4.5 0-4.5-2-7.5-2-2 0-3 1-4 2.5z" fill="currentColor" />
    </g>
  ),
  og: (
    <g>
      <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" fill="currentColor" fillOpacity="0.1" />
      <rect x="6" y="10" width="10" height="3" rx="1" fill="currentColor" />
      <rect x="6" y="15" width="6" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <circle cx="20" cy="14" r="3" fill="currentColor" className="ti-pulse" />
    </g>
  ),
  specsheet: (
    <g>
      <rect x="6" y="3" width="16" height="22" rx="2" stroke="currentColor" fill="currentColor" fillOpacity="0.08" />
      <line x1="9"  y1="9"  x2="19" y2="9"  className="ti-fade" />
      <line x1="9"  y1="13" x2="17" y2="13" className="ti-fade-1" />
      <line x1="9"  y1="17" x2="19" y2="17" className="ti-fade-2" />
      <circle cx="11" cy="21" r="1.5" fill="currentColor" />
      <circle cx="15" cy="21" r="1.5" fill="currentColor" opacity="0.5" />
    </g>
  ),
  embed: (
    <g className="ti-slide">
      <path d="M9 8l-5 6 5 6" />
      <path d="M19 8l5 6-5 6" />
      <line x1="16" y1="6" x2="12" y2="22" />
    </g>
  ),
  history: (
    <g>
      <circle cx="14" cy="14" r="9" stroke="currentColor" fill="none" />
      <line x1="14" y1="14" x2="14" y2="8" stroke="currentColor" strokeWidth="2" className="ti-spin" style={{ transformOrigin: '14px 14px' }} />
      <line x1="14" y1="14" x2="18" y2="14" stroke="currentColor" strokeWidth="2" />
      <path d="M5 5l-1 4 4 1" fill="none" strokeWidth="1.4" />
    </g>
  ),
};
