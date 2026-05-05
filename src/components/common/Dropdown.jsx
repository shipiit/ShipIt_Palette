import { useEffect, useRef, useState } from 'react';

export default function Dropdown({ value, onChange, options = [], label, placeholder = 'Select…', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = options.find((o) => (typeof o === 'string' ? o === value : o.value === value));
  const display = current ? (typeof current === 'string' ? current : current.label) : placeholder;

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      {label && <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition hover:border-[var(--brand-400)] focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
      >
        <span className={current ? '' : 'text-neutral-400'}>{display}</span>
        <svg className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const v = typeof opt === 'string' ? opt : opt.value;
            const l = typeof opt === 'string' ? opt : opt.label;
            const active = v === value;
            return (
              <button
                key={v}
                onClick={() => { onChange(v); setOpen(false); }}
                className="flex w-full items-center justify-between px-3 py-2 text-sm transition text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                style={active ? { background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)' } : undefined}
              >
                <span>{l}</span>
                {active && <span style={{ color: 'var(--brand-500)' }}>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
