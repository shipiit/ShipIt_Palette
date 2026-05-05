import { Icon } from '../../components/common';

export default function FigmaHero({ palette, name, onScrollToFormats }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 px-6 py-12 md:px-12 md:py-20">
      <BackgroundBlobs />
      <FloatingCards palette={palette} />

      <div className="relative text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs font-semibold mb-6 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: 'var(--brand-500)' }} />
          <span style={{ color: 'var(--brand-700)' }}>Live · {name} palette</span>
          <Icon name="arrow" size={11} style={{ color: 'var(--brand-500)' }} />
        </span>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-100">
          Create Design System
          <br />
          <GradientWord text="Variables" gradient={['#3b82f6', '#8b5cf6']} /> and{' '}
          <GradientWord text="Styles" gradient={['#f97316', '#ef4444']} /> Fast
        </h1>

        <p className="mt-5 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          A faster way to start design systems. Use ShipIt Palette to create
          your core variables and styles in just a few clicks.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma"
            target="_blank" rel="noopener noreferrer"
            className="group relative flex items-center gap-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 text-sm font-semibold shadow-lg transition hover:scale-[1.03]"
          >
            <FigmaIcon /> Install on Figma
            <span className="absolute inset-0 rounded-full opacity-0 blur-md transition group-hover:opacity-50"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ef4444)' }} />
          </a>
          <button
            onClick={onScrollToFormats}
            className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 transition"
          >
            See export formats ↓
          </button>
        </div>
        <p className="mt-3 text-xs text-neutral-500">Free · 200k+ designers · opens in Figma</p>

        <FigmaWindow palette={palette} name={name} />
      </div>

      <style>{`
        @keyframes fh-float-1 { 0%,100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-10px) rotate(-4deg); } }
        @keyframes fh-float-2 { 0%,100% { transform: translateY(0) rotate(5deg);  } 50% { transform: translateY(-12px) rotate(3deg); } }
        @keyframes fh-float-3 { 0%,100% { transform: translateY(0) rotate(8deg);  } 50% { transform: translateY(8px)   rotate(6deg); } }
        @keyframes fh-float-4 { 0%,100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(10px)  rotate(-3deg); } }
        .fh-card-1 { animation: fh-float-1 6s ease-in-out infinite; }
        .fh-card-2 { animation: fh-float-2 7s ease-in-out infinite .5s; }
        .fh-card-3 { animation: fh-float-3 6.5s ease-in-out infinite 1s; }
        .fh-card-4 { animation: fh-float-4 7.5s ease-in-out infinite 1.5s; }
      `}</style>
    </section>
  );
}

function GradientWord({ text, gradient }) {
  return (
    <span className="inline-block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}>
      {text}
    </span>
  );
}

function BackgroundBlobs() {
  return (
    <>
      <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: 'var(--brand-300)' }} />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: 'var(--brand-500)', animationDelay: '1s' }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="fh-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fh-grid)" />
      </svg>
    </>
  );
}

function FloatingCards({ palette }) {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      <PaletteCard palette={palette}     className="fh-card-1" style={{ top: '12%', left: '4%' }} />
      <TypographyCard                    className="fh-card-2" style={{ top: '8%',  right: '6%' }} />
      <IconsCard                         className="fh-card-3" style={{ top: '54%', left: '2%' }} />
      <VariableCard                      className="fh-card-4" style={{ top: '50%', right: '4%' }} />
    </div>
  );
}

function PaletteCard({ palette, className = '', style }) {
  return (
    <div className={`absolute rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl p-3 ${className}`} style={style}>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="ml-1 text-[9px] font-mono text-neutral-500">colors</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {palette.slice(0, 10).map((s) => (
          <span key={s.label} className="h-5 w-5 rounded-md ring-1 ring-black/5" style={{ background: s.hex }} />
        ))}
      </div>
    </div>
  );
}

function TypographyCard({ className = '', style }) {
  return (
    <div className={`absolute rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl px-4 py-3 ${className}`} style={style}>
      <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Heading XL</div>
      <div className="text-2xl font-bold leading-none">
        <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #3b82f6, #f97316)' }}>Aa</span>
      </div>
      <div className="mt-1 text-[9px] font-mono text-neutral-500">Inter · 700</div>
    </div>
  );
}

function IconsCard({ className = '', style }) {
  return (
    <div className={`absolute rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl p-3 ${className}`} style={style}>
      <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Components</div>
      <div className="flex items-center gap-2">
        <button className="h-6 px-2 rounded-md text-[10px] font-semibold text-white" style={{ background: 'var(--brand-500)' }}>Btn</button>
        <span className="h-5 w-5 rounded-full border-2" style={{ borderColor: 'var(--brand-500)' }} />
        <span className="h-2 w-10 rounded-full" style={{ background: 'var(--brand-300)' }} />
      </div>
    </div>
  );
}

function VariableCard({ className = '', style }) {
  return (
    <div className={`absolute rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl px-3 py-2.5 ${className}`} style={style}>
      <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Variables</div>
      <div className="space-y-1">
        {[['--bg', 'var(--brand-50)'], ['--accent', 'var(--brand-500)'], ['--text', 'var(--brand-900)']].map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm ring-1 ring-black/10" style={{ background: color }} />
            <span className="text-[10px] font-mono text-neutral-700 dark:text-neutral-300">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FigmaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4z" fill="#0acf83"/>
      <path d="M4 12c0-2.21 1.79-4 4-4h4v8H8c-2.21 0-4-1.79-4-4z" fill="#a259ff"/>
      <path d="M4 4c0-2.21 1.79-4 4-4h4v8H8C5.79 8 4 6.21 4 4z" fill="#f24e1e"/>
      <path d="M12 0h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V0z" fill="#ff7262"/>
      <path d="M20 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z" fill="#1abcfe"/>
    </svg>
  );
}

function FigmaWindow({ palette, name }) {
  return (
    <div className="relative mt-12 mx-auto max-w-3xl">
      <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950/40">
          <div className="flex items-center gap-2">
            <FigmaIcon />
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{name} · Figma</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0">
          <aside className="col-span-3 border-r border-neutral-100 dark:border-neutral-800 p-3 bg-neutral-50/50 dark:bg-neutral-950/30 hidden sm:block">
            <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Pages</div>
            <div className="space-y-1.5">
              {['Cover', 'Variables', 'Components', 'Tokens'].map((p, i) => (
                <div key={p} className="flex items-center gap-1.5 text-[10px]">
                  <span className="h-2 w-2 rounded-sm" style={{ background: i === 1 ? 'var(--brand-500)' : '#d4d4d8' }} />
                  <span className={i === 1 ? 'font-semibold' : 'text-neutral-500'}>{p}</span>
                </div>
              ))}
            </div>
          </aside>

          <div
            className="col-span-12 sm:col-span-9 relative h-44 md:h-56"
            style={{ background: `linear-gradient(135deg, ${palette[3]?.hex || 'var(--brand-300)'}, ${palette[7]?.hex || 'var(--brand-700)'})` }}
          >
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <filter id="fh-noise"><feTurbulence baseFrequency="0.9" numOctaves="2" seed="2" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" /></filter>
                <rect width="100%" height="100%" filter="url(#fh-noise)" />
              </svg>
            </div>
            <div className="absolute top-3 left-3 text-white/90 text-xs font-bold tracking-wide">{name.toUpperCase()}</div>
            <div className="absolute bottom-3 right-3 text-white/70 text-[10px] font-mono">{palette.length} variables</div>
          </div>
        </div>

        <div className="px-4 py-3 flex items-center justify-between bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            {palette.slice(0, 8).map((s) => (
              <span key={s.label} className="h-5 w-5 rounded-md ring-1 ring-black/5" style={{ background: s.hex }} title={s.hex} />
            ))}
          </div>
          <span className="text-[11px] font-mono text-neutral-500">colors / {name.toLowerCase()}</span>
        </div>
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-3/4 rounded-full blur-2xl opacity-30"
        style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ef4444)' }} />
    </div>
  );
}
