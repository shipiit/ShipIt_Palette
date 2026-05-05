import { useMemo } from 'react';
import { Modal, Card, Tag, Heading, Paragraph } from '../../components/common';
import { wcagRatio, wcagBadge, bestTextOn } from '../../lib/contrast.js';

/**
 * Auto Text Color Picker.
 * Props: { open, onClose, palette }
 *   palette: array of { label, hex, rgb? }
 */
export default function TextOnShadeModal({ open, onClose, palette = [] }) {
  const rows = useMemo(() => {
    if (!palette || palette.length === 0) return [];
    const paletteHexes = palette.map((p) => p.hex);
    const candidates = ['#ffffff', '#000000', ...paletteHexes];
    return palette.map((shade) => {
      const best = bestTextOn(shade.hex, candidates);
      const ratio = wcagRatio(shade.hex, best);
      const badge = wcagBadge(ratio);
      // Source description.
      let source = 'palette';
      if (best.toLowerCase() === '#ffffff') source = 'white';
      else if (best.toLowerCase() === '#000000') source = 'black';
      else {
        const matchIdx = paletteHexes.findIndex(
          (h) => h.toLowerCase() === best.toLowerCase()
        );
        if (matchIdx >= 0) source = `shade ${palette[matchIdx].label}`;
      }
      return { shade, best, ratio, badge, source };
    });
  }, [palette]);

  return (
    <Modal open={open} onClose={onClose} title="Auto Text Color Picker" size="xl">
      <div className="space-y-4">
        <Paragraph size="sm">
          For each shade, the highest-contrast text color is chosen from white,
          black, and the palette itself. Tags show the WCAG 2.1 ratio and AA / AAA tier.
        </Paragraph>

        {rows.length === 0 ? (
          <Card>
            <Paragraph>No palette to inspect.</Paragraph>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {rows.map(({ shade, best, ratio, badge, source }) => (
              <ShadeCard
                key={shade.label + shade.hex}
                shade={shade}
                best={best}
                ratio={ratio}
                badge={badge}
                source={source}
              />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

function ShadeCard({ shade, best, ratio, badge, source }) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div
        className="flex h-32 items-center justify-center"
        style={{ background: shade.hex, color: best }}
      >
        <span className="text-5xl font-semibold leading-none">Aa</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <Heading as="h4" className="!text-sm">{shade.label}</Heading>
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {shade.hex}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag variant="neutral" className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
            {ratio.toFixed(2)}:1
          </Tag>
          <Tag
            variant="neutral"
            className="border-transparent text-white"
            // inline style overrides border via class; background via style.
          >
            <span
              className="inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ background: badge.color, color: '#fff' }}
            >
              {badge.tag}
            </span>
          </Tag>
        </div>
        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
          Text: <span className="font-mono">{best}</span>{' '}
          <span className="opacity-70">({source})</span>
        </div>
      </div>
    </Card>
  );
}
