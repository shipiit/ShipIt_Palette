import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  Card,
  Button,
  Input,
  Heading,
  Paragraph,
  Badge,
  Tooltip,
  useToast,
} from '../../components/common';
import { buildPalette, hexToRgb, rgbToHex } from '../../lib/color';

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const ROLES = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'tertiary', label: 'Tertiary' },
];

const VALID_HEX = /^#?[0-9a-fA-F]{6}$/;

function normalizeHex(value, fallback) {
  if (!value) return fallback;
  const v = value.trim();
  if (VALID_HEX.test(v)) {
    return rgbToHex(hexToRgb(v.startsWith('#') ? v : `#${v}`));
  }
  return fallback;
}

function getReadableTextColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.6 ? '#0a0a0a' : '#ffffff';
}

function buildAll(colors) {
  const out = {};
  for (const role of ROLES) {
    out[role.key] = buildPalette({
      baseHex: colors[role.key],
      algorithm: 'Tailwind CSS',
      namingPattern: '50,100…900',
      count: 11,
      contrastShift: 0,
      name: role.key,
    });
  }
  return out;
}

function buildCss(palettes) {
  const lines = [':root {'];
  for (const role of ROLES) {
    for (const shade of palettes[role.key]) {
      lines.push(`  --${role.key}-${shade.label}: ${shade.hex};`);
    }
    lines.push('');
  }
  while (lines[lines.length - 1] === '') lines.pop();
  lines.push('}');
  return lines.join('\n');
}

function buildTailwind(palettes) {
  const lines = ['// tailwind.config.js', 'module.exports = {', '  theme: {', '    extend: {', '      colors: {'];
  for (const role of ROLES) {
    lines.push(`        ${role.key}: {`);
    for (const shade of palettes[role.key]) {
      lines.push(`          '${shade.label}': '${shade.hex}',`);
    }
    lines.push('        },');
  }
  lines.push('      },', '    },', '  },', '};');
  return lines.join('\n');
}

/* ------------------------------------------------------------------ *
 * Sub-components
 * ------------------------------------------------------------------ */

function ColorPicker({ label, value, onChange }) {
  const [text, setText] = useState(value);

  // Keep local text in sync if parent value changes (e.g. native picker).
  useEffect(() => setText(value), [value]);

  const commit = (raw) => {
    const next = normalizeHex(raw, value);
    setText(next);
    onChange(next);
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {label}
        </span>
        <input
          type="color"
          value={value}
          onChange={(e) => {
            setText(e.target.value);
            onChange(e.target.value);
          }}
          className="h-10 w-12 cursor-pointer rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent"
          aria-label={`${label} color picker`}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Hex"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commit(e.target.value);
          }}
          placeholder="#3b82f6"
        />
      </div>
    </div>
  );
}

function PaletteRow({ role, shades }) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-neutral-900 shadow"
            style={{ background: shades[5]?.hex }}
          />
          <span className="text-sm font-semibold capitalize text-neutral-900 dark:text-neutral-100">
            {role}
          </span>
          <Badge variant="outline">{shades[5]?.hex.toUpperCase()}</Badge>
        </div>
      </div>
      <div className="grid grid-cols-11 gap-1 p-3">
        {shades.map((s) => {
          const text = getReadableTextColor(s.hex);
          return (
            <Tooltip key={s.label} content={`${role}-${s.label} · ${s.hex.toUpperCase()}`}>
              <button
                type="button"
                onClick={() => navigator.clipboard?.writeText(s.hex)}
                className="flex h-16 w-full flex-col items-center justify-end rounded-lg border border-neutral-200/60 dark:border-neutral-800 transition hover:scale-[1.03]"
                style={{ background: s.hex, color: text }}
              >
                <span className="px-1 pb-1 text-[10px] font-semibold tracking-wide opacity-90">
                  {s.label}
                </span>
              </button>
            </Tooltip>
          );
        })}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * Main modal
 * ------------------------------------------------------------------ */

export default function BrandKitModal({ open, onClose, baseHex = '#3b82f6' }) {
  const { toast } = useToast();
  const [colors, setColors] = useState({
    primary: baseHex,
    secondary: '#22d3ee',
    tertiary: '#a855f7',
  });

  // When the parent's baseHex changes, refresh primary (only when modal opens).
  useEffect(() => {
    if (open) setColors((c) => ({ ...c, primary: baseHex }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, baseHex]);

  const palettes = useMemo(() => buildAll(colors), [colors]);

  const setRole = (key) => (next) => setColors((c) => ({ ...c, [key]: next }));

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`Copied ${label}`);
    } catch {
      toast('Copy failed');
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="full" title="Brand Kit">
      <div className="flex flex-col gap-4">
        <Card accent>
          <Heading as="h3" accent>
            Three-color brand kit
          </Heading>
          <Paragraph size="sm" className="mt-1">
            Pick a primary, secondary and tertiary color. We generate full
            11-step Tailwind scales for each, ready to drop into your design
            system.
          </Paragraph>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {ROLES.map((r) => (
              <ColorPicker
                key={r.key}
                label={r.label}
                value={colors[r.key]}
                onChange={setRole(r.key)}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="brand"
              onClick={() => copy(buildCss(palettes), 'CSS variables')}
            >
              Copy as CSS
            </Button>
            <Button
              variant="outline"
              onClick={() => copy(buildTailwind(palettes), 'Tailwind config')}
            >
              Copy as Tailwind
            </Button>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          {ROLES.map((r) => (
            <PaletteRow key={r.key} role={r.key} shades={palettes[r.key]} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
