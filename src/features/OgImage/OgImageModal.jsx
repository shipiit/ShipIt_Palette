import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Modal,
  Button,
  Card,
  Dropdown,
  Toggle,
  Heading,
  Paragraph,
  Badge,
  useToast,
} from '../../components/common';
import { hexToRgb, rgbToHex, slugify } from '../../lib/color';

/* ------------------------------------------------------------------ *
 * Layout presets — width, height, swatch sizing
 * ------------------------------------------------------------------ */
const LAYOUTS = {
  Wide:   { w: 1200, h: 630,  titleSize: 96,  captionSize: 28 },
  Square: { w: 1080, h: 1080, titleSize: 110, captionSize: 32 },
  Story:  { w: 1080, h: 1920, titleSize: 130, captionSize: 36 },
};

const LAYOUT_OPTIONS = [
  { value: 'Wide',   label: 'Wide (1200×630)' },
  { value: 'Square', label: 'Square (1080×1080)' },
  { value: 'Story',  label: 'Story 9:16 (1080×1920)' },
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */
function lighten(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({
    r: r + (255 - r) * amt,
    g: g + (255 - g) * amt,
    b: b + (255 - b) * amt,
  });
}
function darken(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex({ r: r * (1 - amt), g: g * (1 - amt), b: b * (1 - amt) });
}
function readableText(bgHex) {
  const { r, g, b } = hexToRgb(bgHex);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.55 ? '#0a0a0a' : '#ffffff';
}

/* ------------------------------------------------------------------ *
 * Canvas painter
 * ------------------------------------------------------------------ */
function paint(canvas, { palette, name, baseHex, layout, theme }) {
  if (!canvas) return;
  const { w, h, titleSize, captionSize } = LAYOUTS[layout];
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Background gradient from baseHex variants
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (theme === 'Dark') {
    grad.addColorStop(0, darken(baseHex, 0.55));
    grad.addColorStop(0.5, darken(baseHex, 0.2));
    grad.addColorStop(1, baseHex);
  } else {
    grad.addColorStop(0, lighten(baseHex, 0.85));
    grad.addColorStop(0.5, lighten(baseHex, 0.55));
    grad.addColorStop(1, lighten(baseHex, 0.2));
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Soft radial glow
  const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 1.5);
  glow.addColorStop(0, theme === 'Dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.4)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const fg = theme === 'Dark' ? '#ffffff' : '#0a0a0a';
  const muted = theme === 'Dark' ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.6)';

  // Title (palette name) centered above swatches
  ctx.fillStyle = fg;
  ctx.font = `700 ${titleSize}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const titleY = layout === 'Story' ? h * 0.32 : h * 0.4;
  ctx.fillText(name || 'Untitled Palette', w / 2, titleY);

  // Subtitle: base hex
  ctx.font = `500 ${captionSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.fillStyle = muted;
  ctx.fillText((baseHex || '').toUpperCase(), w / 2, titleY + titleSize * 0.85);

  // Swatch row
  const shades = palette || [];
  const n = shades.length || 1;
  const padX = w * 0.08;
  const swatchAreaW = w - padX * 2;
  const gap = layout === 'Story' ? 14 : 10;
  const sw = (swatchAreaW - gap * (n - 1)) / n;
  const sh = layout === 'Story' ? h * 0.18 : h * 0.22;
  const swY = layout === 'Story' ? h * 0.55 : h * 0.6;
  const radius = Math.min(28, sw / 4);

  shades.forEach((s, i) => {
    const x = padX + i * (sw + gap);
    ctx.fillStyle = s.hex;
    roundRect(ctx, x, swY, sw, sh, radius);
    ctx.fill();
    // Label
    ctx.fillStyle = readableText(s.hex);
    ctx.font = `600 ${Math.max(14, sw * 0.22)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(s.label || ''), x + sw / 2, swY + sh - sh * 0.18);
  });

  // Caption at bottom
  ctx.font = `500 ${captionSize}px ui-sans-serif, system-ui, sans-serif`;
  ctx.fillStyle = muted;
  ctx.textAlign = 'center';
  ctx.fillText('shipit-palette.app', w / 2, h - captionSize * 1.4);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ------------------------------------------------------------------ *
 * Modal
 * ------------------------------------------------------------------ */
export default function OgImageModal({
  open,
  onClose,
  palette = [],
  name = 'My Palette',
  baseHex = '#3b82f6',
}) {
  const { toast } = useToast();
  const canvasRef = useRef(null);
  const [layout, setLayout] = useState('Wide');
  const [theme, setTheme] = useState('Light'); // 'Light' | 'Dark'

  const settings = useMemo(
    () => ({ palette, name, baseHex, layout, theme }),
    [palette, name, baseHex, layout, theme],
  );

  useEffect(() => {
    if (!open) return;
    paint(canvasRef.current, settings);
  }, [open, settings]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slugify(name || 'palette')}-og.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast('PNG downloaded');
    }, 'image/png');
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
      if (!blob) throw new Error('No blob');
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        toast('Copied to clipboard');
      } else {
        toast('Clipboard not supported');
      }
    } catch {
      toast('Copy failed');
    }
  };

  const dim = LAYOUTS[layout];

  return (
    <Modal open={open} onClose={onClose} size="lg" title="OG Image Generator">
      <div className="flex flex-col gap-4">
        <Card accent>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Heading as="h3" accent>Share preview</Heading>
              <Paragraph size="sm" className="mt-1">
                Generate an Open Graph image for social previews. Downloads as PNG.
              </Paragraph>
            </div>
            <Badge variant="brand">{dim.w} × {dim.h}</Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Dropdown
              label="Layout"
              value={layout}
              onChange={setLayout}
              options={LAYOUT_OPTIONS}
            />
            <div className="flex items-end">
              <Toggle
                checked={theme === 'Dark'}
                onChange={(v) => setTheme(v ? 'Dark' : 'Light')}
                label={theme === 'Dark' ? 'Dark theme' : 'Light theme'}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="brand" onClick={downloadPng}>Download PNG</Button>
            <Button variant="outline" onClick={copyToClipboard}>Copy to clipboard</Button>
          </div>
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div
            className="flex w-full items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-4"
            style={{ minHeight: 240 }}
          >
            <canvas
              ref={canvasRef}
              className="h-auto w-full max-w-full rounded-xl shadow-lg"
              style={{ aspectRatio: `${dim.w} / ${dim.h}`, maxHeight: '60vh', objectFit: 'contain' }}
            />
          </div>
        </Card>
      </div>
    </Modal>
  );
}
