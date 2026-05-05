import { useMemo, useState } from 'react';
import { Modal, Toggle, Paragraph, Tag } from '../../components/common';
import { wcagRatio, apca } from '../../lib/contrast.js';

/**
 * Contrast Matrix.
 * Props: { open, onClose, palette }
 *   palette: array of { label, hex, rgb? } (typically 11 shades).
 *
 * Cell (row=text, col=background) shows the contrast value of the row's
 * shade rendered as text on the column's shade as background.
 *
 * Top-left toggle switches between WCAG 2.1 ratios and APCA Lc values.
 */
export default function ContrastMatrixModal({ open, onClose, palette = [] }) {
  const [useApca, setUseApca] = useState(false);

  const matrix = useMemo(() => {
    if (!palette || palette.length === 0) return [];
    return palette.map((rowShade) =>
      palette.map((colShade) => {
        if (useApca) return apca(rowShade.hex, colShade.hex);
        return wcagRatio(rowShade.hex, colShade.hex);
      })
    );
  }, [palette, useApca]);

  return (
    <Modal open={open} onClose={onClose} title="Contrast Matrix" size="full">
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Paragraph size="sm" className="!mb-0">
            Each cell shows {useApca ? 'APCA Lc' : 'WCAG 2.1 ratio'} for the row
            shade rendered as text on the column shade as background.
          </Paragraph>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${!useApca ? 'font-semibold text-neutral-900 dark:text-neutral-100' : 'text-neutral-500'}`}>
              WCAG 2.1
            </span>
            <Toggle checked={useApca} onChange={setUseApca} />
            <span className={`text-sm ${useApca ? 'font-semibold text-neutral-900 dark:text-neutral-100' : 'text-neutral-500'}`}>
              APCA
            </span>
          </div>
        </div>

        <Legend useApca={useApca} />

        {palette.length === 0 ? (
          <Paragraph>No palette to inspect.</Paragraph>
        ) : (
          <div className="flex-1 overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="border-separate border-spacing-0 text-xs">
              <thead>
                <tr>
                  <th className="sticky left-0 top-0 z-30 bg-neutral-50 dark:bg-neutral-900 border-b border-r border-neutral-200 dark:border-neutral-800 px-3 py-2 text-left font-medium text-neutral-500">
                    text \\ bg
                  </th>
                  {palette.map((s) => (
                    <th
                      key={`h-${s.label}-${s.hex}`}
                      className="sticky top-0 z-20 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-2 py-2 text-center font-medium"
                    >
                      <HeaderCell shade={s} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {palette.map((rowShade, i) => (
                  <tr key={`r-${rowShade.label}-${rowShade.hex}`}>
                    <th className="sticky left-0 z-10 bg-neutral-50 dark:bg-neutral-900 border-r border-b border-neutral-200 dark:border-neutral-800 px-2 py-1.5 text-left font-medium">
                      <HeaderCell shade={rowShade} />
                    </th>
                    {palette.map((colShade, j) => {
                      const value = matrix[i][j];
                      return (
                        <td
                          key={`c-${i}-${j}`}
                          className="border-b border-neutral-200 dark:border-neutral-800 p-1 text-center align-middle"
                          style={{ minWidth: 64 }}
                        >
                          <MatrixCell
                            value={value}
                            useApca={useApca}
                            textHex={rowShade.hex}
                            bgHex={colShade.hex}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Modal>
  );
}

function HeaderCell({ shade }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="inline-block h-4 w-8 rounded border border-black/10"
        style={{ background: shade.hex }}
      />
      <span className="text-[11px] font-semibold">{shade.label}</span>
      <span className="font-mono text-[10px] text-neutral-500">{shade.hex}</span>
    </div>
  );
}

function cellColorWcag(ratio) {
  if (ratio >= 7) return { bg: '#16a34a', fg: '#ffffff' };       // AAA - green
  if (ratio >= 4.5) return { bg: '#86efac', fg: '#064e3b' };     // AA  - light green
  if (ratio >= 3) return { bg: '#fbbf24', fg: '#3f2d00' };       // AA Large - amber
  return { bg: '#ef4444', fg: '#ffffff' };                       // Fail - red
}

function cellColorApca(lc) {
  const v = Math.abs(lc);
  if (v >= 75) return { bg: '#16a34a', fg: '#ffffff' };
  if (v >= 60) return { bg: '#86efac', fg: '#064e3b' };
  if (v >= 45) return { bg: '#fbbf24', fg: '#3f2d00' };
  if (v >= 30) return { bg: '#fdba74', fg: '#3a1d00' };
  return { bg: '#ef4444', fg: '#ffffff' };
}

function MatrixCell({ value, useApca, textHex, bgHex }) {
  const colors = useApca ? cellColorApca(value) : cellColorWcag(value);
  const display = useApca
    ? `${value >= 0 ? '' : '-'}${Math.abs(value).toFixed(0)}`
    : `${value.toFixed(2)}`;
  const title = useApca
    ? `APCA Lc ${value.toFixed(1)} — ${textHex} on ${bgHex}`
    : `WCAG ${value.toFixed(2)}:1 — ${textHex} on ${bgHex}`;
  return (
    <span
      title={title}
      className="inline-flex h-7 w-full min-w-[56px] items-center justify-center rounded font-mono text-[11px] font-semibold tabular-nums"
      style={{ background: colors.bg, color: colors.fg }}
    >
      {display}
    </span>
  );
}

function Legend({ useApca }) {
  const items = useApca
    ? [
        { label: 'Body ≥75', color: '#16a34a' },
        { label: 'Headlines ≥60', color: '#86efac' },
        { label: 'Large UI ≥45', color: '#fbbf24' },
        { label: 'Spot ≥30', color: '#fdba74' },
        { label: 'Fail', color: '#ef4444' },
      ]
    : [
        { label: 'AAA ≥7', color: '#16a34a' },
        { label: 'AA ≥4.5', color: '#86efac' },
        { label: 'AA Large ≥3', color: '#fbbf24' },
        { label: 'Fail <3', color: '#ef4444' },
      ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((it) => (
        <Tag
          key={it.label}
          variant="neutral"
          className="border-transparent"
        >
          <span
            className="inline-block h-2.5 w-2.5 rounded-sm"
            style={{ background: it.color }}
          />
          <span className="ml-1">{it.label}</span>
        </Tag>
      ))}
    </div>
  );
}
