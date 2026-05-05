import { useEffect, useState } from 'react';
import { Logo, Button, Icon } from '../components/common';
import Footer from '../features/Footer/Footer.jsx';
import { Link, navigate } from '../router.jsx';

const NAV_LINKS = [
  { to: '/',      label: 'Studio', icon: 'palette' },
  { to: '/tools', label: 'Tools',  icon: 'tokens' },
  { to: '/figma', label: 'Figma',  icon: 'sparkle' },
];

export default function PageShell({ title, children, onAction }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 py-3.5">
          <Link to="/" className="flex items-center shrink-0">
            <Logo size={32} />
          </Link>

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((l) => <NavLink key={l.to} {...l} />)}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button variant="brand" onClick={() => navigate('/')}>
              <Icon name="arrow" /> Open the Studio
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <Button variant="ghost" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <MenuIcon />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 pb-20">
        {title && (
          <div className="text-center pt-2 pb-4">
            <Link to="/" className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-[var(--brand-600)] transition mb-3">
              <Icon name="arrow" size={11} className="rotate-180" /> Back to home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h1>
          </div>
        )}
        {children}
        <Footer onAction={onAction} />
      </main>

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </div>
  );
}

function NavLink({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
    >
      <Icon name={icon} size={13} /> {label}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  );
}

function MobileMenu({ onClose }) {
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
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to} to={l.to} onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-600)' }}
              >
                <Icon name={l.icon} size={15} />
              </span>
              <span className="flex-1">{l.label}</span>
              <Icon name="arrow" size={13} className="opacity-40" />
            </Link>
          ))}
        </nav>
        <div className="border-t border-neutral-100 dark:border-neutral-800 px-5 py-3 text-center">
          <p className="text-xs text-neutral-500">Made with <span style={{ color: 'var(--brand-500)' }}>♥</span> · ShipIt Palette</p>
        </div>
      </aside>
      <style>{`@keyframes slideLeft { from { transform: translateX(100%); } to { transform: none; } }`}</style>
    </div>
  );
}
