import { Card, Badge, Heading, Paragraph, Icon } from '../../components/common';

const FORMATS = [
  {
    icon: 'tokens', label: 'Tokens Studio',
    bestFor: 'Design teams using Tokens Studio plugin',
    pros: ['Theme variants (light/dark)', 'Token aliases', 'Sync with GitHub'],
    cons: ['Requires plugin install'],
    color: 'var(--brand-500)',
  },
  {
    icon: 'palette', label: 'Figma Variables',
    bestFor: 'Native Figma — no third-party plugin',
    pros: ['Built-in to Figma', 'Mode-aware', 'Works with Auto Layout'],
    cons: ['Manual import per file'],
    color: 'var(--brand-600)',
  },
  {
    icon: 'js', label: 'Custom Plugin',
    bestFor: 'One-click Paint Style creation',
    pros: ['Real Paint Styles', 'Run anywhere', 'Customizable code'],
    cons: ['Dev mode required'],
    color: 'var(--brand-700)',
  },
];

export default function FigmaIntro({ palette, name }) {
  return (
    <div className="space-y-4">
      <HeroBanner palette={palette} name={name} />
      <ComparisonGrid />
    </div>
  );
}

function HeroBanner({ palette, name }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 text-white"
      style={{ background: 'linear-gradient(135deg, var(--brand-600), var(--brand-800))' }}
    >
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full blur-3xl opacity-50" style={{ background: 'var(--brand-300)' }} />
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full blur-3xl opacity-40" style={{ background: 'var(--brand-500)' }} />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-bold mb-3">
            <Icon name="sparkle" size={11} /> Figma · Ready to ship
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Take "{name}" into Figma in 30 seconds.
          </h2>
          <p className="mt-2 text-sm opacity-90 max-w-md">
            Three integration paths — pick the one that matches your workflow.
            Every shade ships as a real Figma asset (token, variable, or paint style).
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {palette.slice(0, 6).map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="h-12 w-12 rounded-xl ring-2 ring-white/30" style={{ background: s.hex }} />
              <span className="mt-1 text-[10px] font-mono opacity-80">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-3 text-center">
        <Stat n={palette.length} label="Shades exported" />
        <Stat n="3" label="Integration formats" />
        <Stat n="<1m" label="Setup time" />
      </div>
    </div>
  );
}

function Stat({ n, label }) {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-sm py-2 px-3">
      <div className="text-xl font-bold">{n}</div>
      <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">{label}</div>
    </div>
  );
}

function ComparisonGrid() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Icon name="search" size={14} style={{ color: 'var(--brand-600)' }} />
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500">Which one fits you?</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FORMATS.map((f) => (
          <Card key={f.label} className="!p-4 transition hover:-translate-y-0.5">
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ background: f.color }}
              >
                <Icon name={f.icon} size={15} />
              </span>
              <Heading as="h4" className="!text-base">{f.label}</Heading>
            </div>
            <Paragraph size="sm" className="!text-xs">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Best for:</span> {f.bestFor}
            </Paragraph>
            <div className="mt-3 space-y-1">
              {f.pros.map((p) => (
                <div key={p} className="flex items-start gap-1.5 text-xs">
                  <Icon name="check" size={11} style={{ color: 'var(--brand-500)' }} className="mt-0.5 shrink-0" strokeWidth={2.4} />
                  <span className="text-neutral-700 dark:text-neutral-300">{p}</span>
                </div>
              ))}
              {f.cons.map((c) => (
                <div key={c} className="flex items-start gap-1.5 text-xs">
                  <Icon name="close" size={11} className="mt-0.5 text-neutral-400 shrink-0" strokeWidth={2.4} />
                  <span className="text-neutral-500">{c}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
