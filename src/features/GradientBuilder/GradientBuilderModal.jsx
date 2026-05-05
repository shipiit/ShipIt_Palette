import { useEffect, useMemo, useState } from 'react';
import { Modal, Button, Dropdown, Heading, Paragraph, CodeBlock, useToast } from '../../components/common';

/**
 * GradientBuilderModal
 * Two color pickers + direction dropdown + multi-format snippet output.
 *
 * Props: { open, onClose, fromHex, toHex }
 */

const DIRECTIONS = [
  { value: '0',   label: '0° (to top)' },
  { value: '45',  label: '45° (to top-right)' },
  { value: '90',  label: '90° (to right)' },
  { value: '135', label: '135° (to bottom-right)' },
  { value: '180', label: '180° (to bottom)' },
  { value: 'radial', label: 'Radial' },
];

const TABS = ['CSS', 'Tailwind v3', 'Tailwind v4', 'SCSS'];

function buildGradient(from, to, dir) {
  if (dir === 'radial') {
    return `radial-gradient(circle, ${from}, ${to})`;
  }
  return `linear-gradient(${dir}deg, ${from}, ${to})`;
}

// Map angles to closest Tailwind v3 directional class
function tailwindDirClass(dir) {
  if (dir === 'radial') return 'bg-gradient-radial';
  const map = {
    '0': 'bg-gradient-to-t',
    '45': 'bg-gradient-to-tr',
    '90': 'bg-gradient-to-r',
    '135': 'bg-gradient-to-br',
    '180': 'bg-gradient-to-b',
  };
  return map[dir] || 'bg-gradient-to-r';
}

function snippetFor(tab, from, to, dir) {
  const grad = buildGradient(from, to, dir);
  if (tab === 'CSS') {
    return `.gradient {\n  background: ${grad};\n}`;
  }
  if (tab === 'Tailwind v3') {
    const cls = tailwindDirClass(dir);
    if (dir === 'radial') {
      return `<!-- requires custom plugin or arbitrary value -->\n<div class="bg-[radial-gradient(circle,${from},${to})]"></div>`;
    }
    return `<div class="${cls} from-[${from}] to-[${to}]"></div>`;
  }
  if (tab === 'Tailwind v4') {
    if (dir === 'radial') {
      return `<div class="bg-radial-[circle] from-[${from}] to-[${to}]"></div>`;
    }
    return `<div class="bg-linear-${dir} from-[${from}] to-[${to}]"></div>`;
  }
  if (tab === 'SCSS') {
    return `$grad-from: ${from};\n$grad-to:   ${to};\n\n.gradient {\n  background: ${grad};\n}`;
  }
  return grad;
}

const LANG_FOR_TAB = {
  'CSS': 'css',
  'Tailwind v3': 'html',
  'Tailwind v4': 'html',
  'SCSS': 'scss',
};

function ColorField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>
      <div className="flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1.5">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded-md border border-neutral-200 dark:border-neutral-800 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-2 py-1 text-sm font-mono text-neutral-900 dark:text-neutral-100 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function GradientBuilderModal({ open, onClose, fromHex, toHex }) {
  const { toast } = useToast();
  const [from, setFrom] = useState(fromHex || '#93c5fd');
  const [to, setTo] = useState(toHex || '#1d4ed8');
  const [dir, setDir] = useState('135');
  const [tab, setTab] = useState('CSS');

  // Sync incoming defaults when modal opens
  useEffect(() => {
    if (open) {
      if (fromHex) setFrom(fromHex);
      if (toHex) setTo(toHex);
    }
  }, [open, fromHex, toHex]);

  const previewBg = useMemo(() => buildGradient(from, to, dir), [from, to, dir]);
  const code = useMemo(() => snippetFor(tab, from, to, dir), [tab, from, to, dir]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast('Copied to clipboard');
    } catch {
      toast('Copy failed');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Gradient builder" size="lg">
      <div className="space-y-4">
        <div>
          <Heading as="h4">Build a gradient</Heading>
          <Paragraph size="sm" className="text-neutral-500 dark:text-neutral-400">
            Pick two colors and a direction. Snippets update live.
          </Paragraph>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <ColorField label="From" value={from} onChange={setFrom} />
          <ColorField label="To" value={to} onChange={setTo} />
          <Dropdown
            label="Direction"
            value={dir}
            onChange={setDir}
            options={DIRECTIONS}
          />
        </div>

        {/* Preview 16:9 */}
        <div
          className="w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
          style={{ aspectRatio: '16 / 9', background: previewBg }}
        />

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 dark:border-neutral-800">
          {TABS.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-2 text-xs font-medium border-b-2 -mb-px transition ${active ? '' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                style={active ? { color: 'var(--brand-700)', borderColor: 'var(--brand-500)' } : undefined}
              >
                {t}
              </button>
            );
          })}
          <div className="ml-auto pb-1">
            <Button size="sm" variant="brand" onClick={copy}>Copy</Button>
          </div>
        </div>

        <CodeBlock code={code} lang={LANG_FOR_TAB[tab]} />
      </div>
    </Modal>
  );
}
