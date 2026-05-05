import { Modal, Button, Heading, Paragraph, Badge, useToast } from '../../components/common';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../../lib/color';

/**
 * PairSuggestionsModal
 * Suggests color theory pairings based on a single base color.
 *
 * Props: { open, onClose, baseHex, onPick }
 */

const SCHEMES = [
  { name: 'Complementary',     offsets: [180] },
  { name: 'Analogous',         offsets: [-30, 30] },
  { name: 'Triadic',           offsets: [120, 240] },
  { name: 'Split-complementary', offsets: [150, 210] },
  { name: 'Tetradic',          offsets: [90, 180, 270] },
];

const DESCRIPTIONS = {
  Complementary: 'Opposite on the wheel — high contrast, vibrant pairings.',
  Analogous: 'Neighbors on the wheel — calm, harmonious blends.',
  Triadic: 'Three evenly-spaced hues — balanced and lively.',
  'Split-complementary': 'Complementary minus the harshness — softer contrast.',
  Tetradic: 'Two complementary pairs — rich, four-color schemes.',
};

function rotateHex(hex, deg) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const next = hslToRgb({ ...hsl, h: hsl.h + deg });
  return rgbToHex(next);
}

function Swatch({ hex, label, onUse, isBase }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 flex flex-col">
      <div
        className="h-20 w-full relative"
        style={{ background: hex }}
      >
        {isBase && (
          <span
            className="absolute top-2 left-2 text-[10px] font-semibold tracking-wide uppercase rounded-full px-2 py-0.5 bg-white/80 dark:bg-neutral-900/80"
            style={{ color: 'var(--brand-700)' }}
          >
            Base
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-2.5 py-2">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-wide text-neutral-500">{label}</div>
          <code className="text-[11px] font-mono text-neutral-800 dark:text-neutral-200">{hex}</code>
        </div>
        {!isBase && (
          <Button size="sm" variant="brand" onClick={onUse}>Use</Button>
        )}
      </div>
    </div>
  );
}

export default function PairSuggestionsModal({ open, onClose, baseHex, onPick }) {
  const { toast } = useToast();

  const handleUse = (hex) => {
    onPick?.(hex);
    toast(`Using ${hex} as base`);
    onClose?.();
  };

  const safeBase = baseHex || '#3b82f6';

  return (
    <Modal open={open} onClose={onClose} title="Color theory pairings" size="xl">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <Heading as="h4">Pair suggestions</Heading>
            <Paragraph size="sm" className="text-neutral-500 dark:text-neutral-400">
              Built from the base hue using classic color-wheel offsets.
            </Paragraph>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500">Base</span>
            <span
              className="inline-block h-6 w-6 rounded-md border border-black/10 dark:border-white/10"
              style={{ background: safeBase }}
            />
            <code className="text-xs font-mono text-neutral-700 dark:text-neutral-300">{safeBase}</code>
          </div>
        </div>

        <div className="space-y-4">
          {SCHEMES.map((scheme) => {
            const items = [
              { label: 'Base', hex: safeBase, isBase: true },
              ...scheme.offsets.map((deg) => ({
                label: `${deg > 0 ? '+' : ''}${deg}°`,
                hex: rotateHex(safeBase, deg),
                isBase: false,
              })),
            ];
            return (
              <div key={scheme.name} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{scheme.name}</span>
                    <Badge>{scheme.offsets.length + 1} colors</Badge>
                  </div>
                  <p className="text-[11px] text-neutral-500 hidden sm:block">{DESCRIPTIONS[scheme.name]}</p>
                </div>
                <div
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
                >
                  {items.map((it, idx) => (
                    <Swatch
                      key={`${scheme.name}-${idx}`}
                      hex={it.hex}
                      label={it.label}
                      isBase={it.isBase}
                      onUse={() => handleUse(it.hex)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
