import { useCallback, useRef, useState } from 'react';
import { Modal, Button, Card, Heading, Paragraph, Badge, useToast } from '../../components/common';
import { rgbToHex } from '../../lib/color';

/**
 * ImageExtractorModal
 * Drop or pick an image, extract 6 dominant colors via bucketed RGB quantization,
 * and let the user pick one as a base color.
 *
 * Props: { open, onClose, onPick }
 */
export default function ImageExtractorModal({ open, onClose, onPick }) {
  const { toast } = useToast();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const reset = () => {
    setImgUrl(null);
    setColors([]);
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const extractFromImage = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const MAX = 240;
    const scale = Math.min(1, MAX / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    let data;
    try {
      data = ctx.getImageData(0, 0, w, h).data;
    } catch (e) {
      toast('Could not read image pixels (CORS?)');
      setLoading(false);
      return;
    }

    const buckets = new Map();
    const STEP = 32;
    for (let i = 0; i < data.length; i += 4) {
      const a = data[i + 3];
      if (a < 128) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Skip near-pure white/black to avoid background dominance
      if (r > 245 && g > 245 && b > 245) continue;
      if (r < 10 && g < 10 && b < 10) continue;
      const br = Math.round(r / STEP) * STEP;
      const bg = Math.round(g / STEP) * STEP;
      const bb = Math.round(b / STEP) * STEP;
      const key = `${br},${bg},${bb}`;
      const prev = buckets.get(key);
      if (prev) {
        prev.count += 1;
        prev.r += r;
        prev.g += g;
        prev.b += b;
      } else {
        buckets.set(key, { count: 1, r, g, b });
      }
    }

    const sorted = [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, 6);
    const top = sorted.map((s) => {
      const r = Math.round(s.r / s.count);
      const g = Math.round(s.g / s.count);
      const b = Math.round(s.b / s.count);
      return { hex: rgbToHex({ r, g, b }), count: s.count };
    });
    setColors(top);
    setLoading(false);
  }, [toast]);

  const loadFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast('Please drop a valid image file');
      return;
    }
    setLoading(true);
    setColors([]);
    const url = URL.createObjectURL(file);
    setImgUrl(url);
    const img = new Image();
    img.onload = () => extractFromImage(img);
    img.onerror = () => {
      toast('Failed to load image');
      setLoading(false);
    };
    img.src = url;
  }, [extractFromImage, toast]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) loadFile(file);
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  const handlePick = (hex) => {
    onPick?.(hex);
    toast(`Using ${hex} as base`);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Extract from image" size="lg">
      <div className="space-y-4">
        <Heading as="h4">Drop an image or pick a file</Heading>
        <Paragraph size="sm" className="text-neutral-500 dark:text-neutral-400">
          We sample pixels and bucket RGB values to nearest 32, then keep the 6 most common.
        </Paragraph>

        {!imgUrl && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 cursor-pointer rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${dragOver ? 'border-[var(--brand-500)] bg-[color-mix(in_srgb,var(--brand-500)_8%,transparent)]' : 'border-neutral-300 dark:border-neutral-700'}`}
          >
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ background: 'var(--brand-100)', color: 'var(--brand-700)' }}>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16l4-4 4 4 4-6 4 6"/><circle cx="9" cy="9" r="1.5" fill="currentColor"/><rect x="3" y="4" width="18" height="16" rx="2"/></svg>
            </div>
            <div>
              <div className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Drop image here</div>
              <div className="text-xs text-neutral-500">or click to browse — PNG, JPG, WEBP</div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        )}

        {imgUrl && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card padded={false} className="overflow-hidden">
              <img src={imgUrl} alt="source" className="w-full h-56 object-cover" />
              <div className="flex items-center justify-between p-3">
                <Badge>{loading ? 'Analyzing…' : 'Ready'}</Badge>
                <Button variant="ghost" size="sm" onClick={reset}>Replace</Button>
              </div>
            </Card>

            <div>
              <div className="mb-2 text-xs font-medium text-neutral-700 dark:text-neutral-300">Dominant colors</div>
              {loading && <div className="text-xs text-neutral-500">Extracting…</div>}
              {!loading && colors.length === 0 && (
                <div className="text-xs text-neutral-500">No colors found.</div>
              )}
              <div className="grid grid-cols-2 gap-2">
                {colors.map((c) => (
                  <div key={c.hex} className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900">
                    <button
                      onClick={() => handlePick(c.hex)}
                      title="Use as base"
                      className="block w-full h-14"
                      style={{ background: c.hex }}
                    />
                    <div className="flex items-center justify-between gap-2 px-2 py-2">
                      <code className="text-[11px] font-mono text-neutral-700 dark:text-neutral-200">{c.hex}</code>
                      <Button size="sm" variant="brand" onClick={() => handlePick(c.hex)}>Use</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Modal>
  );
}
