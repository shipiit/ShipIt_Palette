import { Logo, Button, Input, Icon, Badge } from '../../components/common';

const PRODUCT = [
  { label: 'Color Generator', action: 'scroll',  target: 'generator', icon: 'palette' },
  { label: 'UI Showcase',     action: 'showcase', icon: 'sparkle' },
  { label: 'Live Preview',    action: 'preview',  icon: 'sparkle' },
  { label: 'Export Formats',  action: 'scroll',  target: 'export',    icon: 'css' },
  { label: 'How to Use',      action: 'usage',    icon: 'arrow' },
];

export default function Footer({ onAction }) {
  return (
    <footer
      className="mt-16 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden"
      style={{ boxShadow: '0 -8px 60px -40px var(--brand-500)' }}
    >
      <Newsletter />
      <LinksGrid onAction={onAction} />
      <BottomBar />
    </footer>
  );
}

function Newsletter() {
  return (
    <div
      className="relative px-6 sm:px-10 py-10 border-b border-neutral-100 dark:border-neutral-800 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--brand-100) 70%, transparent), transparent)' }}
    >
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full blur-3xl opacity-30" style={{ background: 'var(--brand-400)' }} />
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <Badge variant="brand" className="mb-3">
            <Icon name="sparkle" size={12} /> Newsletter
          </Badge>
          <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Get color tips & product updates
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            One short email a week. Unsubscribe anytime.
          </p>
        </div>
        <form
          className="flex w-full md:w-auto items-end gap-2"
          onSubmit={(e) => { e.preventDefault(); }}
        >
          <div className="flex-1 md:w-72">
            <Input placeholder="you@email.com" leftIcon={<Icon name="search" />} />
          </div>
          <Button variant="brand">
            Subscribe <Icon name="arrow" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function LinksGrid({ onAction }) {
  const handle = (it) => {
    if (it.action === 'scroll' && it.target) {
      document.getElementById(it.target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (onAction) {
      onAction(it.action);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 sm:px-10 py-10">
      <div>
        <Logo size={36} />
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
          Pick a color. Ship the palette. Beautiful design systems in seconds.
        </p>
      </div>

      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-3">Product</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRODUCT.map((it) => (
            <li key={it.label}>
              <button
                type="button"
                onClick={() => handle(it)}
                className="group flex w-full items-center gap-2 text-left text-sm text-neutral-700 dark:text-neutral-300 transition hover:text-[var(--brand-600)]"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-md transition group-hover:scale-110"
                  style={{
                    background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)',
                    color: 'var(--brand-600)',
                  }}
                >
                  <Icon name={it.icon} size={11} />
                </span>
                <span>{it.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 dark:border-neutral-800 px-6 sm:px-10 py-5 bg-neutral-50/60 dark:bg-neutral-950/40">
      <p className="text-xs text-neutral-500">
        © 2026 — Made with{' '}
        <span style={{ color: 'var(--brand-500)' }}>♥</span>{' '}
        <span className="font-semibold text-neutral-700 dark:text-neutral-200">ShipIt Palette</span>
      </p>
      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--brand-500)' }} />
          All systems operational
        </span>
        <span className="text-neutral-300 dark:text-neutral-700">·</span>
        <span>v1.0.0</span>
        <span className="text-neutral-300 dark:text-neutral-700">·</span>
        <span className="flex items-center gap-1">
          Hit <kbd className="rounded bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 font-mono text-[10px]">Space</kbd> for a new color
        </span>
      </div>
    </div>
  );
}
