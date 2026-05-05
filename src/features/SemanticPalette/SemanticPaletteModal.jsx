import { useMemo } from 'react';
import {
  Modal,
  Card,
  Button,
  Heading,
  Paragraph,
  Badge,
  Tooltip,
  useToast,
} from '../../components/common';
import {
  buildPalette,
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHex,
} from '../../lib/color';

/* ------------------------------------------------------------------ *
 * Helpers — derive semantic anchors from a base hex.
 *
 * We anchor each role to a canonical hue (green, amber, red, slate)
 * but borrow saturation from the user's brand color so the system
 * still feels cohesive.
 * ------------------------------------------------------------------ */

const ANCHORS = {
  primary: null, // user color
  success: { hue: 142, fallbackHex: '#16a34a' },
  warning: { hue: 38, fallbackHex: '#f59e0b' },
  danger: { hue: 0, fallbackHex: '#dc2626' },
  neutral: { hue: 215, sat: 14, fallbackHex: '#64748b' }, // slate-ish
};

function deriveAnchorHex(role, baseHex) {
  if (role === 'primary') return baseHex;
  const cfg = ANCHORS[role];
  if (!cfg) return baseHex;

  const baseHsl = rgbToHsl(hexToRgb(baseHex));
  const fallbackHsl = rgbToHsl(hexToRgb(cfg.fallbackHex));

  // Use the canonical lightness for the role; saturation borrows from base
  // (clamped to a reasonable range) — except neutral which is desaturated.
  const sat =
    role === 'neutral'
      ? cfg.sat
      : Math.max(45, Math.min(85, baseHsl.s));

  const rgb = hslToRgb({ h: cfg.hue, s: sat, l: fallbackHsl.l });
  return rgbToHex(rgb);
}

const ROLES = ['primary', 'success', 'warning', 'danger', 'neutral'];

const ROLE_DESCRIPTIONS = {
  primary: 'Your brand color — actions, links, focus.',
  success: 'Confirmations and positive states.',
  warning: 'Cautions and pending states.',
  danger: 'Destructive actions and errors.',
  neutral: 'Surfaces, borders, and body text.',
};

function buildSemantic(baseHex) {
  const result = {};
  for (const role of ROLES) {
    const anchorHex = deriveAnchorHex(role, baseHex);
    result[role] = {
      anchor: anchorHex,
      shades: buildPalette({
        baseHex: anchorHex,
        algorithm: 'Tailwind CSS',
        namingPattern: '50,100…900',
        count: 11,
        contrastShift: 0,
        name: role,
      }),
    };
  }
  return result;
}

function getReadableTextColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  // perceived luminance (Rec. 709)
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.6 ? '#0a0a0a' : '#ffffff';
}

function buildCss(semantic) {
  const lines = [':root {'];
  for (const role of ROLES) {
    for (const shade of semantic[role].shades) {
      lines.push(`  --${role}-${shade.label}: ${shade.hex};`);
    }
    lines.push('');
  }
  // remove trailing blank line
  while (lines[lines.length - 1] === '') lines.pop();
  lines.push('}');
  return lines.join('\n');
}

/* ------------------------------------------------------------------ *
 * UI
 * ------------------------------------------------------------------ */

function ShadeSwatch({ shade }) {
  const text = getReadableTextColor(shade.hex);
  return (
    <Tooltip content={`${shade.label} · ${shade.hex.toUpperCase()}`}>
      <button
        type="button"
        className="group relative flex h-16 w-full flex-col items-center justify-end rounded-lg border border-neutral-200/60 dark:border-neutral-800 transition hover:scale-[1.03] focus:outline-none focus:ring-2"
        style={{
          background: shade.hex,
          color: text,
          '--tw-ring-color': 'var(--brand-500)',
        }}
        onClick={() => {
          navigator.clipboard?.writeText(shade.hex);
        }}
      >
        <span className="px-1 pb-1 text-[10px] font-semibold tracking-wide opacity-90">
          {shade.label}
        </span>
      </button>
    </Tooltip>
  );
}

function RoleRow({ role, data }) {
  return (
    <Card className="overflow-hidden" padded={false}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-4 w-4 rounded-full ring-2 ring-white dark:ring-neutral-900 shadow"
            style={{ background: data.anchor }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold capitalize text-neutral-900 dark:text-neutral-100">
                {role}
              </span>
              <Badge variant="outline">{data.anchor.toUpperCase()}</Badge>
            </div>
            <p className="text-xs text-neutral-500">{ROLE_DESCRIPTIONS[role]}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-11 gap-1 p-3">
        {data.shades.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <ShadeSwatch shade={s} />
            <span className="text-center text-[10px] font-mono text-neutral-500">
              {s.hex.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function SemanticPaletteModal({ open, onClose, baseHex = '#3b82f6' }) {
  const { toast } = useToast();
  const semantic = useMemo(() => buildSemantic(baseHex), [baseHex]);

  const handleCopyAll = async () => {
    const css = buildCss(semantic);
    try {
      await navigator.clipboard.writeText(css);
      toast('Copied semantic system as CSS');
    } catch {
      toast('Copy failed');
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="full" title="Semantic Palette">
      <div className="flex flex-col gap-4">
        <Card accent>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <Heading as="h3" accent>
                A complete semantic system
              </Heading>
              <Paragraph size="sm" className="mt-1">
                We derive five roles — primary, success, warning, danger and
                neutral — from your brand color. Each role has 11 shades
                (50 → 950) generated with the Tailwind algorithm so they stay
                consistent with the rest of your palette.
              </Paragraph>
              <div className="mt-3 flex flex-wrap gap-2">
                {ROLES.map((r) => (
                  <Badge key={r} variant="outline">
                    <span
                      className="mr-1 inline-block h-2 w-2 rounded-full"
                      style={{ background: semantic[r].anchor }}
                    />
                    {r}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="brand" onClick={handleCopyAll}>
                Copy all as CSS
              </Button>
              <span className="text-center text-[11px] text-neutral-500">
                {ROLES.length * 11} variables
              </span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-3">
          {ROLES.map((role) => (
            <RoleRow key={role} role={role} data={semantic[role]} />
          ))}
        </div>
      </div>
    </Modal>
  );
}
