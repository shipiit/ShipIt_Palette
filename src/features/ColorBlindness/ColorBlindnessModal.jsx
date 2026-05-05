import { Modal, Heading, Paragraph, Badge, Tooltip } from '../../components/common';
import { hexToRgb, rgbToHex, clamp } from '../../lib/color';

/**
 * ColorBlindnessModal
 * Simulates 4 vision types over the current palette using transform matrices.
 *
 * Props: { open, onClose, palette: Array<{label, hex, rgb}> }
 */

const MATRICES = {
  Normal: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  // Standard hardcoded approximations
  Deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  Protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  Tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
};

const DESCRIPTIONS = {
  Normal: 'Reference — no color transformation applied.',
  Deuteranopia: 'Green-blind. ~6% of males. Reds and greens are confused.',
  Protanopia: 'Red-blind. ~1% of males. Reds appear darker.',
  Tritanopia: 'Blue-blind. Very rare. Blues and yellows are confused.',
};

function applyMatrix(rgb, m) {
  const r = m[0][0] * rgb.r + m[0][1] * rgb.g + m[0][2] * rgb.b;
  const g = m[1][0] * rgb.r + m[1][1] * rgb.g + m[1][2] * rgb.b;
  const b = m[2][0] * rgb.r + m[2][1] * rgb.g + m[2][2] * rgb.b;
  return {
    r: clamp(Math.round(r)),
    g: clamp(Math.round(g)),
    b: clamp(Math.round(b)),
  };
}

function simulate(hex, type) {
  const rgb = hexToRgb(hex);
  const out = applyMatrix(rgb, MATRICES[type]);
  return rgbToHex(out);
}

export default function ColorBlindnessModal({ open, onClose, palette = [] }) {
  const types = Object.keys(MATRICES);

  return (
    <Modal open={open} onClose={onClose} title="Color blindness simulator" size="xl">
      <div className="space-y-4">
        <div>
          <Heading as="h4">Simulated views</Heading>
          <Paragraph size="sm" className="text-neutral-500 dark:text-neutral-400">
            Each row applies a vision-type transform matrix to your current palette.
          </Paragraph>
        </div>

        {palette.length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-center text-sm text-neutral-500">
            No palette to simulate yet.
          </div>
        )}

        {palette.length > 0 && (
          <div className="space-y-4">
            {types.map((type) => (
              <div key={type} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-900">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{type}</span>
                    <Tooltip content={DESCRIPTIONS[type]}>
                      <Badge>info</Badge>
                    </Tooltip>
                  </div>
                  <span className="text-[11px] text-neutral-500">{palette.length} swatches</span>
                </div>
                <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${palette.length}, minmax(0, 1fr))` }}>
                  {palette.map((sw) => {
                    const simHex = simulate(sw.hex, type);
                    return (
                      <div key={`${type}-${sw.label}-${sw.hex}`} className="flex flex-col items-stretch">
                        <div
                          className="h-12 rounded-md border border-black/5 dark:border-white/10"
                          style={{ background: simHex }}
                          title={`${sw.label} • ${sw.hex} → ${simHex}`}
                        />
                        <div className="mt-1 text-center">
                          <div className="text-[10px] font-medium text-neutral-700 dark:text-neutral-300 leading-tight">{sw.label}</div>
                          <code className="text-[9px] font-mono text-neutral-500 leading-tight block truncate">{simHex}</code>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
