import { useToast } from '../../components/common/Toast.jsx';
import Tooltip from '../../components/common/Tooltip.jsx';

function getReadableTextColor(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 145 ? '#0a0a0a' : '#fafafa';
}

export default function Swatches({ palette, name }) {
  const { toast } = useToast();

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Generated Palette</p>
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{name}</h3>
        </div>
        <p className="text-xs text-neutral-500">{palette.length} shades · click to copy</p>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-11">
        {palette.map((s) => {
          const fg = getReadableTextColor(s.hex);
          return (
            <Tooltip key={s.label} content={`Copy ${s.hex.toUpperCase()}`}>
              <button
                onClick={() => { navigator.clipboard.writeText(s.hex); toast(`Copied ${s.hex}`); }}
                className="group relative aspect-square w-full overflow-hidden rounded-xl shadow-sm transition hover:scale-[1.04] hover:shadow-lg focus:outline-none"
                style={{ background: s.hex }}
              >
                <span className="absolute left-2 top-2 text-[11px] font-semibold tracking-wide" style={{ color: fg, opacity: 0.85 }}>
                  {s.label}
                </span>
                <span
                  className="absolute bottom-2 left-2 right-2 truncate rounded px-1 py-0.5 text-center text-[10px] font-mono font-semibold uppercase"
                  style={{ background: 'rgba(0,0,0,.18)', color: fg }}
                >
                  {s.hex}
                </span>
              </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
