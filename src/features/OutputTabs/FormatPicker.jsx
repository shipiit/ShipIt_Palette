import { useEffect, useRef, useState } from 'react';
import Icon from '../../components/common/Icon.jsx';
import { FORMAT_META } from './format-meta.js';

const GROUPS = [
  { name: 'Web', keys: ['CSS', 'Tailwind', 'Tailwind 4', 'Tokens'] },
  { name: 'Stylesheets', keys: ['SCSS', 'Less', 'Sass Map'] },
  { name: 'Code', keys: ['JSON', 'JS', 'TS'] },
  { name: 'Native', keys: ['Swift', 'Android', 'Flutter'] },
  { name: 'Visual', keys: ['SVG'] },
];

function Tile({ keyName, active, onClick }) {
  const meta = FORMAT_META[keyName];
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-md"
      style={active
        ? { background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', borderColor: 'var(--brand-500)' }
        : { borderColor: 'rgb(229 229 229 / 1)' }}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg transition group-hover:scale-110"
        style={{
          background: active ? 'var(--brand-500)' : 'color-mix(in srgb, var(--brand-500) 16%, transparent)',
          color: active ? 'white' : 'var(--brand-600)',
        }}
      >
        <Icon name={meta.icon} size={16} />
      </span>
      <span className="min-w-0">
        <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">{meta.label}</div>
        <div className="text-[11px] text-neutral-500 truncate">{meta.hint}</div>
      </span>
    </button>
  );
}

export default function FormatPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const meta = FORMAT_META[value];

  const matches = (k) =>
    !query.trim() ||
    k.toLowerCase().includes(query.toLowerCase()) ||
    FORMAT_META[k].label.toLowerCase().includes(query.toLowerCase()) ||
    FORMAT_META[k].hint.toLowerCase().includes(query.toLowerCase());

  return (
    <div ref={ref} className="relative w-full">
      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Export Format</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2.5 transition hover:border-[var(--brand-400)] focus:outline-none focus:ring-2"
        style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: 'var(--brand-500)', color: 'white' }}
          >
            <Icon name={meta.icon} size={14} />
          </span>
          <span className="flex flex-col items-start min-w-0">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">{meta.label}</span>
            <span className="text-[11px] text-neutral-500 truncate">{meta.hint}</span>
          </span>
        </span>
        <span className="flex items-center gap-2 text-xs text-neutral-500">
          <span className="hidden sm:inline">Change</span>
          <svg className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"/></svg>
        </span>
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-[min(720px,90vw)] left-0 overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl">
          <div className="border-b border-neutral-100 dark:border-neutral-800 p-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"><Icon name="search" size={14} /></span>
              <input
                autoFocus
                placeholder="Search formats — Tailwind, Swift, Flutter, JSON…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl bg-neutral-100 dark:bg-neutral-800 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
              />
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-3">
            {GROUPS.map((g) => {
              const items = g.keys.filter(matches);
              if (items.length === 0) return null;
              return (
                <div key={g.name}>
                  <div className="px-1 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">{g.name}</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {items.map((k) => (
                      <Tile key={k} keyName={k} active={k === value} onClick={() => { onChange(k); setOpen(false); setQuery(''); }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
