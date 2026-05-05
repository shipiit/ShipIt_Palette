import { Card } from '../../components/common';

const FEATURES = [
  {
    title: 'Color Palette',
    body: 'A collection of primitive color palettes ready to use and extend. Sourced from popular design systems like Material, Tailwind, Polaris, and Atlassian.',
    Illustration: ColorPaletteIllustration,
  },
  {
    title: 'Predefined Variables',
    body: 'Start fast with a ready-to-use variable set built on best practices — easily customizable, so you never have to worry about how to begin.',
    Illustration: VariablesIllustration,
  },
  {
    title: 'Semantic / Alias',
    body: 'A ready-to-use set of semantics and aliases — Success, Error, Warning, Info — designed for accessible and consistent UI communication.',
    Illustration: SemanticIllustration,
  },
  {
    title: 'Typography Tokens',
    body: 'Tokenized font sizes, weights, and line heights ensure scalable and consistent text styling across your entire product.',
    Illustration: TypographyIllustration,
  },
  {
    title: 'Size & Spacing',
    body: 'Standardized spacing scale and size variables for padding, margins, and layout dimensions — fully bound to your design tokens.',
    Illustration: SizeIllustration,
  },
  {
    title: 'Documentation',
    body: 'Export everything in JSON, CSS, Tailwind v4, SCSS — also print all token details for review, sharing, or developer handoff.',
    Illustration: DocsIllustration,
  },
];

export default function FigmaFeatures() {
  return (
    <div>
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Everything inside</span>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Built to ship complete design systems
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => {
          const Illu = f.Illustration;
          return (
            <Card key={f.title} className="group relative overflow-hidden hover:-translate-y-1 transition">
              <div className="h-44 -mx-5 -mt-5 mb-4 flex items-end justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border-b border-neutral-100 dark:border-neutral-800 overflow-hidden">
                <Illu />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{f.body}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Animated SVG illustrations -------- */

function ColorPaletteIllustration() {
  const brands = [
    { x: 30, y: 20, fill: '#10b981', icon: 'S' },
    { x: 70, y: 20, fill: '#06b6d4', icon: 'T' },
    { x: 110, y: 14, fill: '#0052cc', icon: 'A', highlight: true },
    { x: 150, y: 20, fill: '#a259ff', icon: 'F' },
    { x: 190, y: 20, fill: '#ff5722', icon: 'F' },
  ];
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className="-mb-4">
      <style>{`@keyframes brand-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }`}</style>
      {brands.map((b, i) => (
        <g key={i} style={{ animation: `brand-bob 2.4s ease-in-out infinite ${i * 0.3}s`, transformOrigin: `${b.x}px ${b.y}px` }}>
          <circle cx={b.x} cy={b.y} r="14" fill="white" stroke={b.highlight ? '#ec4899' : '#e5e5e5'} strokeWidth={b.highlight ? '2' : '1'} />
          <text x={b.x} y={b.y + 4} fontSize="11" fontWeight="700" textAnchor="middle" fill={b.fill}>{b.icon}</text>
          {b.highlight && <line x1={b.x} y1={b.y + 14} x2="120" y2="80" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2 2">
            <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="0.7s" repeatCount="indefinite" />
          </line>}
        </g>
      ))}
      <rect x="40" y="70" width="160" height="80" rx="10" fill="white" stroke="#e5e5e5" />
      <circle cx="50" cy="80" r="2" fill="#ef4444" /><circle cx="58" cy="80" r="2" fill="#f59e0b" /><circle cx="66" cy="80" r="2" fill="#10b981" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`top${i}`} x={50 + i * 30} y="95" width="22" height="22" rx="4" fill="var(--brand-700)" opacity={1 - i * 0.12} />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`bot${i}`} x={50 + i * 30} y="121" width="22" height="22" rx="4" fill="var(--brand-300)" opacity={1 - i * 0.15} />
      ))}
    </svg>
  );
}

function VariablesIllustration() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className="-mb-2">
      <rect x="40" y="30" width="160" height="36" rx="8" fill="white" stroke="#e5e5e5" />
      <circle cx="56" cy="48" r="9" fill="var(--brand-100)" stroke="var(--brand-500)" />
      <rect x="74" y="42" width="80" height="5" rx="2.5" fill="#e5e5e5" />
      <rect x="74" y="51" width="50" height="4" rx="2" fill="#f5f5f5" />
      <rect x="40" y="76" width="160" height="36" rx="8" fill="white" stroke="#e5e5e5" />
      <rect x="50" y="89" width="14" height="14" rx="3" fill="var(--brand-300)" />
      <rect x="74" y="88" width="60" height="5" rx="2.5" fill="#e5e5e5" />
      <rect x="74" y="97" width="40" height="4" rx="2" fill="#f5f5f5" />
      <rect x="40" y="122" width="100" height="20" rx="6" fill="white" stroke="#e5e5e5" />
      <text x="50" y="135" fontSize="10" fontFamily="monospace" fill="#999">T</text>
      <rect x="62" y="129" width="60" height="6" rx="3" fill="#f5f5f5" />
    </svg>
  );
}

function SemanticIllustration() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className="-mb-2">
      <g>
        <circle cx="50" cy="40" r="9" fill="#ef4444" />
        <rect x="64" y="34" width="58" height="14" rx="7" fill="white" stroke="#e5e5e5" />
        <text x="93" y="44" fontSize="9" fontWeight="600" textAnchor="middle" fill="#ef4444">text-accent</text>
      </g>
      <g>
        <circle cx="200" cy="50" r="9" fill="#a78bfa" />
        <rect x="142" y="44" width="55" height="14" rx="7" fill="white" stroke="#e5e5e5" />
        <text x="170" y="54" fontSize="9" fontWeight="600" textAnchor="middle" fill="#7c3aed">bg-primary</text>
      </g>
      <g>
        <rect x="65" y="80" width="110" height="22" rx="6" fill="white" stroke="#e5e5e5" />
        {['#fbbf24', '#fb923c', '#ec4899', '#8b5cf6', '#10b981'].map((c, i) => (
          <rect key={c} x={75 + i * 18} y="86" width="13" height="10" rx="3" fill={c} />
        ))}
      </g>
      <path d="M 65 91 Q 50 110 70 130" fill="none" stroke="#e5e5e5" strokeDasharray="2 2" />
      <path d="M 175 91 Q 200 110 180 130" fill="none" stroke="#e5e5e5" strokeDasharray="2 2" />
      <g>
        <circle cx="80" cy="135" r="6" fill="#f59e0b" />
        <text x="92" y="138" fontSize="8" fill="#666">icon-acc</text>
      </g>
      <g>
        <circle cx="170" cy="135" r="6" fill="#fda4af" />
        <text x="142" y="138" fontSize="8" fill="#666">border</text>
      </g>
    </svg>
  );
}

function TypographyIllustration() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className="-mb-2">
      <defs>
        <linearGradient id="aa-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <text x="120" y="115" fontSize="100" fontWeight="800" textAnchor="middle" fill="url(#aa-grad)" letterSpacing="-4">Aa</text>
      <rect x="55" y="35" width="44" height="16" rx="8" fill="white" stroke="#e5e5e5" />
      <text x="77" y="46" fontSize="9" fontWeight="600" textAnchor="middle" fill="#555">Label 1</text>
      <rect x="142" y="48" width="58" height="16" rx="8" fill="white" stroke="#e5e5e5" />
      <text x="171" y="59" fontSize="9" fontWeight="600" textAnchor="middle" fill="#555">Heading XS</text>
      <rect x="50" y="125" width="50" height="14" rx="7" fill="white" stroke="#e5e5e5" />
      <text x="75" y="135" fontSize="8" textAnchor="middle" fill="#888">Body SM</text>
    </svg>
  );
}

function SizeIllustration() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className="-mb-2">
      <rect x="35" y="30" width="80" height="100" rx="8" fill="white" stroke="#e5e5e5" />
      <rect x="125" y="30" width="80" height="100" rx="8" fill="white" stroke="#e5e5e5" />
      <rect x="45" y="44" width="60" height="6" rx="3" fill="#f0f0f0" />
      <rect x="45" y="58" width="40" height="4" rx="2" fill="#f5f5f5" />
      <rect x="45" y="72" width="50" height="4" rx="2" fill="#f5f5f5" />
      <rect x="135" y="44" width="60" height="6" rx="3" fill="#f0f0f0" />
      <rect x="135" y="58" width="40" height="4" rx="2" fill="#f5f5f5" />
      <line x1="115" y1="80" x2="125" y2="80" stroke="#ec4899" strokeWidth="1.5" />
      <circle cx="115" cy="80" r="2.5" fill="#ec4899" />
      <circle cx="125" cy="80" r="2.5" fill="#ec4899" />
      <text x="120" y="74" fontSize="8" fontWeight="600" textAnchor="middle" fill="#ec4899">16</text>
    </svg>
  );
}

function DocsIllustration() {
  return (
    <svg width="240" height="160" viewBox="0 0 240 160" className="-mb-2">
      <rect x="40" y="30" width="160" height="110" rx="10" fill="white" stroke="#e5e5e5" />
      <circle cx="50" cy="40" r="2" fill="#ef4444" />
      <circle cx="58" cy="40" r="2" fill="#f59e0b" />
      <circle cx="66" cy="40" r="2" fill="#10b981" />
      <rect x="55" y="60" width="14" height="14" rx="3" fill="#ec4899" />
      <rect x="80" y="62" width="100" height="4" rx="2" fill="#e5e5e5" />
      <rect x="80" y="70" width="80" height="4" rx="2" fill="#f0f0f0" />
      <rect x="55" y="85" width="125" height="4" rx="2" fill="#f5f5f5" />
      <rect x="55" y="94" width="100" height="4" rx="2" fill="#f5f5f5" />
      <rect x="55" y="103" width="120" height="4" rx="2" fill="#f5f5f5" />
      <rect x="55" y="115" width="35" height="14" rx="4" fill="var(--brand-500)" />
      <text x="72" y="125" fontSize="8" fontWeight="700" textAnchor="middle" fill="white">Export</text>
    </svg>
  );
}
