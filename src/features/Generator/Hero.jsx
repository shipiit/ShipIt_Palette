import { useState } from 'react';
import Icon from '../../components/common/Icon.jsx';
import Tooltip from '../../components/common/Tooltip.jsx';
import { useToast } from '../../components/common/Toast.jsx';
import { hexToRgb } from '../../lib/color.js';

function luminance({ r, g, b }) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(hex1, hex2) {
  const a = luminance(hexToRgb(hex1)), b = luminance(hexToRgb(hex2));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}
function wcagBadge(ratio) {
  if (ratio >= 7) return { tag: 'AAA', color: '#16a34a' };
  if (ratio >= 4.5) return { tag: 'AA', color: '#16a34a' };
  if (ratio >= 3) return { tag: 'AA Large', color: '#f59e0b' };
  return { tag: 'Fail', color: '#dc2626' };
}

export default function Hero({ baseHex, name, palette, count, onRandom, onSetHex }) {
  const { toast } = useToast();
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cps-favs') || '[]'); } catch { return []; }
  });

  const onWhite = contrast(baseHex, '#ffffff');
  const onBlack = contrast(baseHex, '#000000');
  const wcagW = wcagBadge(onWhite);
  const wcagB = wcagBadge(onBlack);

  const isFav = favs.includes(baseHex);
  const toggleFav = () => {
    const next = isFav ? favs.filter((h) => h !== baseHex) : [baseHex, ...favs].slice(0, 12);
    setFavs(next);
    localStorage.setItem('cps-favs', JSON.stringify(next));
    toast(isFav ? 'Removed from saved' : 'Saved color');
  };

  const share = async () => {
    const url = `${location.origin}${location.pathname}#${baseHex.replace('#', '')}`;
    try { await navigator.clipboard.writeText(url); toast('Share link copied'); }
    catch { toast('Could not copy'); }
  };

  const copyHex = () => { navigator.clipboard.writeText(baseHex.toUpperCase()); toast(`Copied ${baseHex.toUpperCase()}`); };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <button
            onClick={copyHex}
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg ring-2 ring-white dark:ring-neutral-800 transition hover:scale-105"
            style={{ background: baseHex }}
            aria-label="Copy hex"
          >
            <Icon name="copy" size={16} className="opacity-0 transition group-hover:opacity-100 text-white drop-shadow" />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Base color</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)' }}>
                {name}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="font-mono text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{baseHex.toUpperCase()}</h2>
              <span className="text-xs text-neutral-500">{count} shades</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Stat label="On white" value={onWhite.toFixed(2)} badge={wcagW} />
          <Stat label="On black" value={onBlack.toFixed(2)} badge={wcagB} />
          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />
          <Tooltip content="Save color"><ChipBtn active={isFav} onClick={toggleFav} icon={isFav ? 'check' : 'sparkle'} label={isFav ? 'Saved' : 'Save'} /></Tooltip>
          <Tooltip content="Copy share URL"><ChipBtn onClick={share} icon="arrow" label="Share" /></Tooltip>
          <Tooltip content="Random color (Space)"><ChipBtn onClick={onRandom} icon="shuffle" label="Random" /></Tooltip>
        </div>
      </div>

      {favs.length > 0 && (
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 shrink-0">Saved</span>
          {favs.map((h) => (
            <button
              key={h}
              onClick={() => onSetHex(h)}
              className="h-7 w-7 shrink-0 rounded-lg border-2 transition hover:scale-110"
              style={{ background: h, borderColor: h === baseHex ? 'var(--brand-500)' : 'rgba(0,0,0,0.1)' }}
              aria-label={h}
              title={h}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, badge }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-1.5">
      <div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{label}</div>
        <div className="font-mono text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">{value}</div>
      </div>
      <span
        className="rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white"
        style={{ background: badge.color }}
      >
        {badge.tag}
      </span>
    </div>
  );
}

function ChipBtn({ icon, label, onClick, active }) {
  const base = 'flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition hover:-translate-y-0.5 hover:shadow-sm';
  const inactive = 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800';
  return (
    <button
      onClick={onClick}
      className={`${base} ${active ? '' : inactive}`}
      style={active
        ? { background: 'color-mix(in srgb, var(--brand-500) 16%, transparent)', borderColor: 'var(--brand-500)', color: 'var(--brand-600)' }
        : undefined}
    >
      <Icon name={icon} size={12} /> {label}
    </button>
  );
}
