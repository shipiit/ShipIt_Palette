import { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Dropdown from '../../components/common/Dropdown.jsx';
import Badge from '../../components/common/Badge.jsx';
import Card from '../../components/common/Card.jsx';
import Heading from '../../components/common/Heading.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import { ALGORITHMS, buildPalette, hexToRgb } from '../../lib/color.js';
import { wcagRatio, wcagBadge } from '../../lib/contrast.js';

const HEX_RE = /^#?[0-9a-fA-F]{6}$/;
const ALGO_OPTIONS = Object.keys(ALGORITHMS).map((k) => ({ value: k, label: k }));
const SHADE_LABELS = ['50','100','200','300','400','500','600','700','800','900','950'];

function luminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const f = (c) => { const cs = c / 255; return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function ColumnEditor({ label, hex, setHex, algo, setAlgo, palette }) {
  const [draft, setDraft] = useState(hex);
  useEffect(() => { setDraft(hex); }, [hex]);

  const commit = (val) => {
    const v = val.startsWith('#') ? val : `#${val}`;
    if (HEX_RE.test(v)) setHex(v.toLowerCase());
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading as="h4">Color {label}</Heading>
        <Badge variant="outline">{algo}</Badge>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          className="h-11 w-14 cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent"
          aria-label={`Pick color ${label}`}
        />
        <div className="flex-1">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={(e) => commit(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') commit(e.currentTarget.value); }}
            placeholder="#3b82f6"
          />
        </div>
      </div>
      <Dropdown label="Algorithm" value={algo} onChange={setAlgo} options={ALGO_OPTIONS} />
      <div>
        <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">Palette</div>
        <div className="grid grid-cols-11 gap-1 rounded-xl overflow-hidden">
          {palette.map((s) => (
            <div key={s.label} className="flex flex-col">
              <div className="aspect-square w-full" style={{ background: s.hex }} title={`${s.label} ${s.hex}`} />
              <div className="text-[9px] text-center mt-1 text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function DiffRow({ label, a, b }) {
  const lumA = luminance(a) * 100;
  const lumB = luminance(b) * 100;
  const ratio = wcagRatio(a, b);
  return (
    <div className="grid grid-cols-12 items-center gap-2 px-3 py-2 text-xs border-b border-neutral-100 dark:border-neutral-800 last:border-b-0">
      <div className="col-span-1 font-mono text-neutral-500">{label}</div>
      <div className="col-span-3 flex items-center gap-2">
        <span className="h-5 w-5 rounded border border-neutral-200 dark:border-neutral-800" style={{ background: a }} />
        <span className="font-mono text-neutral-700 dark:text-neutral-300">{a}</span>
      </div>
      <div className="col-span-3 flex items-center gap-2">
        <span className="h-5 w-5 rounded border border-neutral-200 dark:border-neutral-800" style={{ background: b }} />
        <span className="font-mono text-neutral-700 dark:text-neutral-300">{b}</span>
      </div>
      <div className="col-span-2 text-neutral-600 dark:text-neutral-400">
        ΔL: <span className="font-mono">{(lumB - lumA).toFixed(1)}</span>
      </div>
      <div className="col-span-3 flex items-center gap-2">
        <span className="text-neutral-500">Ratio</span>
        <span className="font-mono">{ratio.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function CompareModal({ open, onClose, baseHex = '#3b82f6' }) {
  const [hexA, setHexA] = useState(baseHex);
  const [hexB, setHexB] = useState('#ef4444');
  const [algoA, setAlgoA] = useState('Tailwind CSS');
  const [algoB, setAlgoB] = useState('OKLCH');

  useEffect(() => { if (open) setHexA(baseHex); }, [open, baseHex]);

  const paletteA = useMemo(() => buildPalette({
    baseHex: hexA, algorithm: algoA, namingPattern: '50,100…900', count: 11, contrastShift: 0,
  }), [hexA, algoA]);

  const paletteB = useMemo(() => buildPalette({
    baseHex: hexB, algorithm: algoB, namingPattern: '50,100…900', count: 11, contrastShift: 0,
  }), [hexB, algoB]);

  const baseRatio = useMemo(() => wcagRatio(hexA, hexB), [hexA, hexB]);
  const baseBadge = wcagBadge(baseRatio);

  const swap = () => {
    setHexA(hexB); setHexB(hexA);
    setAlgoA(algoB); setAlgoB(algoA);
  };

  return (
    <Modal open={open} onClose={onClose} title="Compare Mode" size="full"
      footer={<>
        <Button variant="ghost" onClick={onClose}>Close</Button>
        <Button variant="secondary" onClick={swap}>Swap colors</Button>
      </>}
    >
      <div className="space-y-5">
        <Paragraph>Compare two base colors, their algorithm-generated 11-shade palettes, and per-shade differences.</Paragraph>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ColumnEditor label="A" hex={hexA} setHex={setHexA} algo={algoA} setAlgo={setAlgoA} palette={paletteA} />
          <ColumnEditor label="B" hex={hexB} setHex={setHexB} algo={algoB} setAlgo={setAlgoB} palette={paletteB} />
        </div>

        <Card className="!p-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-4 py-3">
            <Heading as="h4">Differences</Heading>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">Base contrast</span>
              <span className="font-mono text-sm">{baseRatio.toFixed(2)}:1</span>
              <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ background: baseBadge.color }}>{baseBadge.tag}</span>
            </div>
          </div>
          <div className="grid grid-cols-12 px-3 py-2 text-[11px] uppercase tracking-wide text-neutral-500 border-b border-neutral-100 dark:border-neutral-800">
            <div className="col-span-1">Shade</div>
            <div className="col-span-3">A</div>
            <div className="col-span-3">B</div>
            <div className="col-span-2">Δ Luminance %</div>
            <div className="col-span-3">WCAG A↔B</div>
          </div>
          {SHADE_LABELS.map((label, i) => (
            <DiffRow key={label} label={label} a={paletteA[i].hex} b={paletteB[i].hex} />
          ))}
        </Card>
      </div>
    </Modal>
  );
}
