import { useEffect, useRef, useState } from 'react';
import Tag from './Tag.jsx';

export default function MultiSelect({ value = [], onChange, options = [], label, placeholder = 'Select multiple…' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const toggle = (v) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  return (
    <div ref={ref} className="relative w-full">
      {label && <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 transition hover:border-[var(--brand-400)] focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
      >
        <div className="flex flex-wrap gap-1">
          {value.length === 0 && <span className="text-neutral-400">{placeholder}</span>}
          {value.map((v) => {
            const opt = options.find((o) => (typeof o === 'string' ? o === v : o.value === v));
            const l = typeof opt === 'string' ? opt : opt?.label || v;
            return <Tag key={v} onRemove={(e) => { e?.stopPropagation?.(); toggle(v); }}>{l}</Tag>;
          })}
        </div>
        <svg className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
      </button>
      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const v = typeof opt === 'string' ? opt : opt.value;
            const l = typeof opt === 'string' ? opt : opt.label;
            const active = value.includes(v);
            return (
              <button
                key={v}
                onClick={() => toggle(v)}
                className="flex w-full items-center justify-between px-3 py-2 text-sm transition text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="inline-flex h-4 w-4 items-center justify-center rounded border"
                    style={active ? { background: 'var(--brand-500)', borderColor: 'var(--brand-500)' } : { borderColor: 'rgb(212 212 216 / 1)' }}
                  >
                    {active && <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-7.4 7.4a1 1 0 01-1.4 0L3.3 9.5a1 1 0 011.4-1.4l3.9 3.9 6.7-6.7a1 1 0 011.4 0z" clipRule="evenodd"/></svg>}
                  </span>
                  {l}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
