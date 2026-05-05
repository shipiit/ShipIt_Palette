import { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import Heading from '../../components/common/Heading.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import Badge from '../../components/common/Badge.jsx';
import CodeBlock from '../../components/common/CodeBlock.jsx';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../../lib/color.js';

const TAILWIND_LS = [97, 92, 84, 73, 60, 47, 38, 30, 22, 15, 9];
const SHADE_LABELS = ['50','100','200','300','400','500','600','700','800','900','950'];
const linearLs = () => Array.from({ length: 11 }, (_, i) => Math.round(95 - (90 * i) / 10));

function buildPreview(baseHex, ls) {
  const baseRgb = hexToRgb(baseHex);
  const { h, s } = rgbToHsl(baseRgb);
  return ls.map((l) => {
    const rgb = hslToRgb({ h, s, l });
    return rgbToHex(rgb);
  });
}

function CurveChart({ ls }) {
  const W = 480, H = 140, P = 16;
  const stepX = (W - P * 2) / (ls.length - 1);
  const points = ls.map((l, i) => {
    const x = P + i * stepX;
    const y = P + (1 - l / 100) * (H - P * 2);
    return [x, y];
  });
  const path = points.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-36 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40">
      {[0, 25, 50, 75, 100].map((g) => {
        const y = P + (1 - g / 100) * (H - P * 2);
        return <line key={g} x1={P} x2={W - P} y1={y} y2={y} stroke="currentColor" strokeOpacity="0.08" />;
      })}
      <path d={path} fill="none" stroke="var(--brand-500)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.5} fill="var(--brand-600)" />
      ))}
    </svg>
  );
}

function Slider({ label, value, onChange }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="text-[10px] font-mono text-neutral-500">{label}</div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="vertical-slider"
        style={{
          writingMode: 'bt-lr',
          WebkitAppearance: 'slider-vertical',
          width: 24, height: 120,
          accentColor: 'var(--brand-500)',
        }}
        aria-label={`Lightness ${label}`}
      />
      <div className="text-[10px] font-mono w-8 text-center rounded bg-neutral-100 dark:bg-neutral-800 py-0.5">
        {Math.round(value)}
      </div>
    </div>
  );
}

export default function CustomAlgorithmModal({ open, onClose, baseHex = '#3b82f6', onApply }) {
  const [ls, setLs] = useState([...TAILWIND_LS]);
  const [copied, setCopied] = useState(false);

  useEffect(() => { if (open) { setLs([...TAILWIND_LS]); setCopied(false); } }, [open]);

  const preview = useMemo(() => buildPreview(baseHex, ls), [baseHex, ls]);

  const setAt = (i, v) => {
    setLs((cur) => { const nx = [...cur]; nx[i] = v; return nx; });
  };

  const resetTailwind = () => setLs([...TAILWIND_LS]);
  const resetLinear = () => setLs(linearLs());

  const apply = () => {
    onApply?.([...ls]);
    onClose?.();
  };

  const copyJson = async () => {
    const json = JSON.stringify({ lightnessCurve: ls.map(Math.round), shades: SHADE_LABELS }, null, 2);
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  const json = useMemo(() => JSON.stringify({
    lightnessCurve: ls.map(Math.round),
    shades: SHADE_LABELS,
  }, null, 2), [ls]);

  return (
    <Modal open={open} onClose={onClose} title="Custom Algorithm — Lightness Curve" size="xl"
      footer={<>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="secondary" onClick={resetLinear}>Reset to Linear</Button>
        <Button variant="secondary" onClick={resetTailwind}>Reset to Tailwind</Button>
        <Button variant="outline" onClick={copyJson}>{copied ? 'Copied!' : 'Copy curve as JSON'}</Button>
        <Button variant="brand" onClick={apply}>Apply</Button>
      </>}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Paragraph>Drag each slider to set the L (HSL lightness) for the corresponding shade. Live preview updates instantly.</Paragraph>
          <Badge variant="outline">base {baseHex}</Badge>
        </div>

        <CurveChart ls={ls} />

        <Card>
          <div className="flex items-end justify-between gap-2">
            {ls.map((v, i) => (
              <Slider key={i} label={SHADE_LABELS[i]} value={v} onChange={(nv) => setAt(i, nv)} />
            ))}
          </div>
        </Card>

        <div>
          <Heading as="h4" className="mb-2">Live preview</Heading>
          <div className="grid grid-cols-11 gap-1 rounded-xl overflow-hidden">
            {preview.map((hex, i) => (
              <div key={i} className="flex flex-col">
                <div className="aspect-square w-full" style={{ background: hex }} title={`${SHADE_LABELS[i]} ${hex}`} />
                <div className="text-[10px] text-center mt-1 text-neutral-500 font-mono">{SHADE_LABELS[i]}</div>
                <div className="text-[9px] text-center text-neutral-400 font-mono">{hex}</div>
              </div>
            ))}
          </div>
        </div>

        <details className="text-sm">
          <summary className="cursor-pointer text-neutral-700 dark:text-neutral-300 font-medium">Show JSON</summary>
          <div className="mt-2">
            <CodeBlock lang="json" code={json} />
          </div>
        </details>
      </div>
    </Modal>
  );
}
