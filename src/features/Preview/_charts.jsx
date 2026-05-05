// Tiny SVG chart helpers — all use the brand CSS variables.

export function LineChart({ data = [], height = 160, theme = 'light' }) {
  const max = Math.max(...data), min = Math.min(...data);
  const W = 600, H = height;
  const x = (i) => (i / (data.length - 1)) * W;
  const y = (v) => H - ((v - min) / Math.max(1, max - min)) * (H - 20) - 10;
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(v)}`).join(' ');
  const area = `${path} L ${W},${H} L 0,${H} Z`;
  const grid = theme === 'dark' ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.06)';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cps-line-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="var(--brand-500)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--brand-500)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <line key={p} x1="0" x2={W} y1={p * H} y2={p * H} stroke={grid} strokeWidth="1" />
      ))}
      <path d={area} fill="url(#cps-line-fill)" />
      <path d={path} fill="none" stroke="var(--brand-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" fill="var(--brand-600)" />
      ))}
    </svg>
  );
}

export function Donut({ values, labels, size = 160 }) {
  const total = values.reduce((a, b) => a + b, 0);
  const r = size / 2 - 12, c = size / 2, circ = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="14" />
      {values.map((v, i) => {
        const len = (v / total) * circ;
        const dash = `${len} ${circ - len}`;
        const offset = -acc;
        acc += len;
        const shade = ['400', '500', '600', '700'][i % 4];
        return (
          <circle
            key={i}
            cx={c} cy={c} r={r}
            fill="none"
            stroke={`var(--brand-${shade})`}
            strokeWidth="14"
            strokeDasharray={dash}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${c} ${c})`}
            strokeLinecap="butt"
          />
        );
      })}
      <text x={c} y={c - 2} textAnchor="middle" fontSize="20" fontWeight="700" fill="currentColor">{total}</text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">total</text>
    </svg>
  );
}

export function Sparkline({ data, color = 'var(--brand-500)', w = 80, h = 24 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const x = (i) => (i / (data.length - 1)) * w;
  const y = (v) => h - ((v - min) / Math.max(1, max - min)) * h;
  const d = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)},${y(v)}`).join(' ');
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}><path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
}

export function Bars({ data, height = 80 }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm transition hover:opacity-80"
          style={{ height: `${(v / max) * 100}%`, background: `var(--brand-${500 + (i % 3) * 100})` }}
        />
      ))}
    </div>
  );
}
