import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, clamp } from '../../lib/color.js';

export default function ColorPicker({ baseHex, onChange }) {
  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb);

  const setHex = (v) => onChange(v);
  const setRgb = (k, v) => {
    const next = { ...rgb, [k]: clamp(Number(v) || 0) };
    onChange(rgbToHex(next));
  };
  const setHue = (v) => onChange(rgbToHex(hslToRgb({ ...hsl, h: Number(v) })));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="relative inline-flex h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 border-white shadow-md ring-2 ring-neutral-200 dark:ring-neutral-700">
          <span className="block h-full w-full" style={{ background: baseHex }} />
          <input
            type="color"
            value={baseHex}
            onChange={(e) => setHex(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </label>
        <input
          value={baseHex.toUpperCase()}
          onChange={(e) => setHex(e.target.value)}
          className="font-mono text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 bg-transparent focus:outline-none w-44"
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {['r', 'g', 'b'].map((k) => (
          <div key={k} className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">{k}</span>
            <input
              type="number" min={0} max={255}
              value={Math.round(rgb[k])}
              onChange={(e) => setRgb(k, e.target.value)}
              className="w-full bg-transparent text-sm font-mono focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <input
          type="range" min={0} max={360}
          value={hsl.h}
          onChange={(e) => setHue(e.target.value)}
          className="brand-slider w-full"
          style={{ background: 'linear-gradient(90deg,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)' }}
        />
        <input
          type="range" min={0} max={100}
          value={hsl.s}
          onChange={(e) => onChange(rgbToHex(hslToRgb({ ...hsl, s: Number(e.target.value) })))}
          className="brand-slider w-full"
          style={{ background: `linear-gradient(90deg, hsl(${hsl.h} 0% ${hsl.l}%), hsl(${hsl.h} 100% ${hsl.l}%))` }}
        />
        <input
          type="range" min={0} max={100}
          value={hsl.l}
          onChange={(e) => onChange(rgbToHex(hslToRgb({ ...hsl, l: Number(e.target.value) })))}
          className="brand-slider w-full"
          style={{ background: `linear-gradient(90deg, #000, hsl(${hsl.h} ${hsl.s}% 50%), #fff)` }}
        />
      </div>
    </div>
  );
}
