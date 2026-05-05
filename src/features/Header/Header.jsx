import { useEffect, useRef, useState } from 'react';
import Button from '../../components/common/Button.jsx';
import Tooltip from '../../components/common/Tooltip.jsx';
import Icon from '../../components/common/Icon.jsx';
import Logo from '../../components/common/Logo.jsx';
import { Link } from '../../router.jsx';

const VIEW_ITEMS = [
  { id: 'playground', icon: 'js',      label: 'Playground',  hint: 'Live HTML editor + iframe' },
  { id: 'preview',    icon: 'sparkle', label: 'Live Preview', hint: '9 polished UI scenes' },
  { id: 'showcase',   icon: 'palette', label: 'UI Showcase',  hint: 'All common components' },
];

const PAGE_LINKS = [
  { to: '/tools', icon: 'tokens',  label: 'Tools' },
  { to: '/figma', icon: 'sparkle', label: 'Figma' },
];

export default function Header({ theme, onToggleTheme, onRandom, onAction }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 sm:px-6 py-3 sm:py-3.5">
        <Link to="/" className="flex items-center shrink-0">
          <span className="md:hidden"><Logo size={30} withWordmark={false} /></span>
          <span className="hidden md:inline-flex"><Logo size={36} /></span>
        </Link>

        {/* Desktop center nav */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {PAGE_LINKS.map((p) => (
            <PageLink key={p.to} {...p} />
          ))}
          <ViewMenu onAction={onAction} />
        </nav>

        {/* Right cluster */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <Tooltip content="Random color (Space)">
            <Button variant="ghost" onClick={onRandom} aria-label="Random"><Icon name="shuffle" /></Button>
          </Tooltip>
          <Tooltip content={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            <Button variant="ghost" onClick={onToggleTheme} aria-label="Theme">
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </Button>
          </Tooltip>
          <span className="mx-1 h-6 w-px bg-neutral-200 dark:bg-neutral-800" />
          <Button variant="brand" onClick={() => onAction('usage')}>
            <Icon name="arrow" /> How to use
          </Button>
        </div>

        {/* Mobile: 3 utility icons + brand CTA + hamburger */}
        <div className="flex md:hidden items-center gap-0.5">
          <Button variant="ghost" size="sm" onClick={onRandom} aria-label="Random"><Icon name="shuffle" /></Button>
          <Button variant="ghost" size="sm" onClick={onToggleTheme} aria-label="Theme">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </Button>
          <Button variant="brand" size="sm" onClick={() => onAction('usage')}>
            <Icon name="arrow" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setMenuOpen(true)} aria-label="Menu"><MenuIcon /></Button>
        </div>
      </div>

      {menuOpen && <MobileMenu theme={theme} onClose={() => setMenuOpen(false)} onToggleTheme={onToggleTheme} onRandom={onRandom} onAction={onAction} />}
    </header>
  );
}

function PageLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      <Icon name={icon} size={13} /> {label}
    </Link>
  );
}

function ViewMenu({ onAction }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
      >
        <Icon name="palette" size={13} /> View
        <svg className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
          {VIEW_ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => { onAction(it.id); setOpen(false); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-neutral-50 dark:hover:bg-neutral-800"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                style={{ background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-600)' }}
              >
                <Icon name={it.icon} size={15} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{it.label}</div>
                <div className="text-xs text-neutral-500 truncate">{it.hint}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  );
}

function MobileMenu({ theme, onClose, onToggleTheme, onRandom, onAction }) {
  const dispatch = (id) => { onAction(id); onClose(); };
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col animate-[slideLeft_.25s_ease-out]">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-5 py-4">
          <Logo size={32} />
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 px-5 py-3">
          <Button variant="ghost" onClick={() => { onRandom(); onClose(); }} className="flex-1">
            <Icon name="shuffle" /> Random
          </Button>
          <Button variant="ghost" onClick={onToggleTheme} className="flex-1">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} /> {theme === 'dark' ? 'Light' : 'Dark'}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">Pages</div>
          {PAGE_LINKS.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              onClick={onClose}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <ItemIcon name={p.icon} />
              <span className="flex-1">{p.label}</span>
              <Icon name="arrow" size={13} className="opacity-40" />
            </Link>
          ))}

          <div className="px-3 pt-4 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">View</div>
          {VIEW_ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => dispatch(it.id)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <ItemIcon name={it.icon} />
              <span className="flex-1 text-left">{it.label}</span>
              <Icon name="arrow" size={13} className="opacity-40" />
            </button>
          ))}

          <div className="pt-4">
            <Button variant="brand" onClick={() => dispatch('usage')} className="w-full">
              <Icon name="arrow" /> How to use
            </Button>
          </div>
        </nav>

        <div className="border-t border-neutral-100 dark:border-neutral-800 px-5 py-3 text-center">
          <p className="text-xs text-neutral-500">
            Made with <span style={{ color: 'var(--brand-500)' }}>♥</span> · ShipIt Palette
          </p>
        </div>
      </aside>
      <style>{`@keyframes slideLeft { from { transform: translateX(100%); } to { transform: none; } }`}</style>
    </div>
  );
}

function ItemIcon({ name }) {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-xl"
      style={{ background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-600)' }}
    >
      <Icon name={name} size={15} />
    </span>
  );
}
