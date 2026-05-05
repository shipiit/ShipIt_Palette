import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon.jsx';

export default function SearchableDropdown({
  value, onChange, options = [], label, placeholder = 'Search…',
  renderOption, renderTrigger, leftIcon = 'search',
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const norm = (o) => (typeof o === 'string' ? { value: o, label: o } : o);
  const opts = useMemo(() => options.map(norm), [options]);
  const filtered = useMemo(
    () => opts.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())),
    [opts, query]
  );
  const current = opts.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative w-full">
      {label && <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 transition hover:border-[var(--brand-400)] focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
      >
        {renderTrigger ? renderTrigger(current) : (
          <span className={current ? '' : 'text-neutral-400'}>
            {current?.label || placeholder}
          </span>
        )}
        <Icon name={leftIcon} size={14} style={{ color: 'var(--brand-500)' }} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg">
          <div className="border-b border-neutral-200 dark:border-neutral-800 p-2">
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-neutral-400"><Icon name="search" size={14} /></span>
              <input
                autoFocus
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg bg-neutral-100 dark:bg-neutral-800 pl-8 pr-2 py-1.5 text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 && <div className="p-3 text-sm text-neutral-500">No results</div>}
            {filtered.map((opt) => {
              const active = opt.value === value;
              return (
                <button
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setOpen(false); setQuery(''); }}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2 text-sm transition text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                  style={active ? { background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)' } : undefined}
                >
                  {renderOption ? renderOption(opt, active) : <span>{opt.label}</span>}
                  {active && <Icon name="check" size={14} style={{ color: 'var(--brand-500)' }} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
