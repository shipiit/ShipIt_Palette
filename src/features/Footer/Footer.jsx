import { Logo, Button, Input, Icon, Badge } from '../../components/common';

const COLUMNS = [
  {
    title: 'Product',
    items: [
      { label: 'Color Generator', kind: 'scroll',  target: 'generator', icon: 'palette' },
      { label: 'UI Showcase',     kind: 'action',  action: 'showcase',  icon: 'sparkle' },
      { label: 'Live Preview',    kind: 'action',  action: 'preview',   icon: 'sparkle' },
      { label: 'Playground',      kind: 'action',  action: 'playground', icon: 'js' },
      { label: 'How to Use',      kind: 'action',  action: 'usage',     icon: 'arrow' },
    ],
  },
  {
    title: 'Palette Tools',
    items: [
      { label: 'Semantic Palette', kind: 'tool', tool: 'semantic',  icon: 'palette' },
      { label: 'Brand Kit',        kind: 'tool', tool: 'brandkit',  icon: 'tokens' },
      { label: 'Saved Library',    kind: 'tool', tool: 'saved',     icon: 'sparkle' },
      { label: 'Compare Mode',     kind: 'tool', tool: 'compare',   icon: 'json' },
      { label: 'Custom Algorithm', kind: 'tool', tool: 'custom',    icon: 'css' },
      { label: 'AI Naming',        kind: 'tool', tool: 'ai',        icon: 'sparkle', badge: 'New' },
    ],
  },
  {
    title: 'Color Tools',
    items: [
      { label: 'Image Extractor',   kind: 'tool', tool: 'image',     icon: 'svg' },
      { label: 'Color Blindness',   kind: 'tool', tool: 'blindness', icon: 'sun' },
      { label: 'Pair Suggestions',  kind: 'tool', tool: 'pairs',     icon: 'shuffle' },
      { label: 'Gradient Builder',  kind: 'tool', tool: 'gradient',  icon: 'arrow' },
      { label: 'Auto Text Color',   kind: 'tool', tool: 'textcolor', icon: 'check' },
      { label: 'Contrast Matrix',   kind: 'tool', tool: 'matrix',    icon: 'tokens' },
    ],
  },
  {
    title: 'Export',
    items: [
      { label: 'Figma Export',     kind: 'tool', tool: 'figma',     icon: 'sparkle', badge: 'Hot' },
      { label: 'Tailwind v4',      kind: 'tool', tool: 'tailwind',  icon: 'tailwind' },
      { label: 'OG Image',         kind: 'tool', tool: 'og',        icon: 'svg' },
      { label: 'Spec Sheet',       kind: 'tool', tool: 'specsheet', icon: 'json' },
      { label: 'Embed Code',       kind: 'tool', tool: 'embed',     icon: 'css' },
      { label: 'History · Undo',   kind: 'tool', tool: 'history',   icon: 'shuffle' },
    ],
  },
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
          <Badge variant="brand" className="mb-3"><Icon name="sparkle" size={12} /> Newsletter</Badge>
          <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Get color tips & product updates
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            One short email a week. Unsubscribe anytime.
          </p>
        </div>
        <form
          className="flex w-full md:w-auto items-end gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 md:w-72">
            <Input placeholder="you@email.com" leftIcon={<Icon name="search" />} />
          </div>
          <Button variant="brand">Subscribe <Icon name="arrow" /></Button>
        </form>
      </div>
    </div>
  );
}

function LinksGrid({ onAction }) {
  const handle = (it) => {
    if (it.kind === 'scroll' && it.target) {
      document.getElementById(it.target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (it.kind === 'action' && onAction) {
      onAction(it.action);
    } else if (it.kind === 'tool' && onAction) {
      onAction(`tool:${it.tool}`);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 px-6 sm:px-10 py-10">
      <div className="col-span-2 md:col-span-4 lg:col-span-1">
        <Logo size={36} />
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 max-w-xs leading-relaxed">
          Pick a color. Ship the palette. Beautiful design systems in seconds.
        </p>
        <div className="mt-5 flex flex-wrap gap-1">
          {['palette', 'sparkle', 'tokens', 'css', 'tailwind'].map((i) => (
            <span
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
              style={{ background: 'var(--brand-500)', opacity: 0.6 + Math.random() * 0.4 }}
              aria-hidden
            >
              <Icon name={i} size={12} />
            </span>
          ))}
        </div>
      </div>

      {COLUMNS.map((col) => (
        <Column key={col.title} title={col.title} items={col.items} onClick={handle} />
      ))}
    </div>
  );
}

function Column({ title, items, onClick }) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500 mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.label}>
            <button
              type="button"
              onClick={() => onClick(it)}
              className="group flex w-full items-center gap-2 text-left text-sm text-neutral-700 dark:text-neutral-300 transition hover:text-[var(--brand-600)]"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition group-hover:scale-110"
                style={{
                  background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)',
                  color: 'var(--brand-600)',
                }}
              >
                <Icon name={it.icon} size={11} />
              </span>
              <span className="truncate">{it.label}</span>
              {it.badge && <Badge variant="brand" className="ml-auto !px-1.5 !py-0 !text-[9px]">{it.badge}</Badge>}
            </button>
          </li>
        ))}
      </ul>
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
