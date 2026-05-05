import { useMemo, useState } from 'react';
import {
  Modal,
  Card,
  Button,
  Input,
  Dropdown,
  Heading,
  Paragraph,
  Badge,
  CodeBlock,
  useToast,
} from '../../components/common';
import { hexToRgb, slugify } from '../../lib/color';

/* ------------------------------------------------------------------ *
 * Options
 * ------------------------------------------------------------------ */
const THEME_OPTIONS = [
  { value: 'auto',  label: 'Auto (matches site)' },
  { value: 'light', label: 'Light' },
  { value: 'dark',  label: 'Dark' },
];
const LAYOUT_OPTIONS = [
  { value: 'Strip', label: 'Strip — single horizontal bar' },
  { value: 'Grid',  label: 'Grid — labelled tiles' },
  { value: 'Card',  label: 'Card — title + swatches' },
];

function readableText(bgHex) {
  const { r, g, b } = hexToRgb(bgHex);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.55 ? '#0a0a0a' : '#ffffff';
}

/* ------------------------------------------------------------------ *
 * Build embed HTML (full standalone document)
 * ------------------------------------------------------------------ */
function buildEmbedHtml({ palette, name, baseHex, theme, layout }) {
  const slug = slugify(name || 'palette');
  const isDark = theme === 'dark';
  const bg = theme === 'auto' ? 'transparent' : (isDark ? '#0a0a0a' : '#ffffff');
  const fg = theme === 'auto' ? 'inherit' : (isDark ? '#fafafa' : '#0a0a0a');
  const muted = isDark ? '#a3a3a3' : '#525252';
  const border = isDark ? '#262626' : '#e5e5e5';

  const cssVars = palette
    .map((s) => `    --${slug}-${s.label}: ${s.hex};`)
    .join('\n');

  const swatchCells = palette.map((s) => {
    const tc = readableText(s.hex);
    if (layout === 'Strip') {
      return `<div class="cell" style="background:${s.hex};color:${tc}" title="${s.label} ${s.hex}"></div>`;
    }
    return `
      <div class="cell" style="background:${s.hex};color:${tc}">
        <span class="lbl">${s.label}</span>
        <span class="hex">${s.hex.toUpperCase()}</span>
      </div>`;
  }).join('');

  const layoutClass = layout.toLowerCase();

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — Palette</title>
<style>
  :root {
${cssVars}
  }
  ${theme === 'auto' ? '@media (prefers-color-scheme: dark){body{background:#0a0a0a;color:#fafafa}}' : ''}
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;height:100%;background:${bg};color:${fg};font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
  .wrap{padding:16px;height:100%;display:flex;flex-direction:column;gap:12px}
  .head{display:flex;align-items:center;justify-content:space-between;gap:8px}
  .title{font-size:14px;font-weight:600;margin:0}
  .sub{font-size:11px;color:${muted};font-family:ui-monospace,Menlo,monospace}
  .dot{width:10px;height:10px;border-radius:50%;background:${baseHex};display:inline-block;margin-right:6px}
  .grid{display:grid;grid-template-columns:repeat(${palette.length},minmax(0,1fr));gap:6px;flex:1;min-height:0}
  .strip{display:flex;flex:1;border-radius:10px;overflow:hidden;border:1px solid ${border}}
  .strip .cell{flex:1;height:100%}
  .grid .cell{border-radius:8px;padding:8px;display:flex;flex-direction:column;justify-content:flex-end;font-size:11px;font-weight:600}
  .grid .cell .lbl{display:block}
  .grid .cell .hex{display:block;font-family:ui-monospace,Menlo,monospace;font-weight:500;opacity:.85;font-size:10px;margin-top:2px}
  .card{border:1px solid ${border};border-radius:12px;padding:12px;display:flex;flex-direction:column;gap:8px;flex:1}
  .card .grid{flex:0 0 auto;height:80px}
  .foot{font-size:10px;color:${muted};text-align:right}
  a{color:inherit;text-decoration:none}
</style>
</head>
<body>
  <div class="wrap">
    <div class="head">
      <h1 class="title"><span class="dot"></span>${name}</h1>
      <span class="sub">${(baseHex || '').toUpperCase()} · ${palette.length} shades</span>
    </div>
    ${
      layout === 'Strip'
        ? `<div class="strip">${swatchCells}</div>`
        : layout === 'Grid'
        ? `<div class="grid">${swatchCells}</div>`
        : `<div class="card"><div class="sub">Palette preview</div><div class="grid">${swatchCells}</div></div>`
    }
    <div class="foot"><a href="https://shipit-palette.app" target="_blank" rel="noopener">shipit-palette.app</a></div>
  </div>
</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * base64 (utf-8 safe)
 * ------------------------------------------------------------------ */
function toBase64(str) {
  if (typeof window === 'undefined') return '';
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
}

/* ------------------------------------------------------------------ *
 * Modal
 * ------------------------------------------------------------------ */
export default function EmbedModal({
  open,
  onClose,
  palette = [],
  name = 'My Palette',
  baseHex = '#3b82f6',
}) {
  const { toast } = useToast();
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(220);
  const [theme, setTheme] = useState('auto');
  const [layout, setLayout] = useState('Grid');

  const html = useMemo(
    () => buildEmbedHtml({ palette, name, baseHex, theme, layout }),
    [palette, name, baseHex, theme, layout],
  );

  const dataUrl = useMemo(() => `data:text/html;base64,${toBase64(html)}`, [html]);

  const snippet = useMemo(() => {
    const w = Math.max(120, Number(width) || 640);
    const h = Math.max(80, Number(height) || 220);
    return `<iframe
  src="${dataUrl}"
  width="${w}"
  height="${h}"
  style="border:0;border-radius:12px;max-width:100%"
  loading="lazy"
  title="${name} palette">
</iframe>`;
  }, [dataUrl, width, height, name]);

  const copyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast('Embed copied');
    } catch {
      toast('Copy failed');
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slugify(name || 'palette')}-embed.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast('HTML downloaded');
  };

  return (
    <Modal open={open} onClose={onClose} size="xl" title="Embed Code Builder">
      <div className="flex flex-col gap-4">
        <Card accent>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <Heading as="h3" accent>Embed in your blog</Heading>
              <Paragraph size="sm" className="mt-1">
                Generate a self-contained iframe snippet. No external assets required.
              </Paragraph>
            </div>
            <Badge variant="brand">{layout} · {theme}</Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="Width (px)"
              type="number"
              value={width}
              min={120}
              onChange={(e) => setWidth(e.target.value)}
            />
            <Input
              label="Height (px)"
              type="number"
              value={height}
              min={80}
              onChange={(e) => setHeight(e.target.value)}
            />
            <Dropdown
              label="Theme"
              value={theme}
              onChange={setTheme}
              options={THEME_OPTIONS}
            />
            <Dropdown
              label="Layout"
              value={layout}
              onChange={setLayout}
              options={LAYOUT_OPTIONS}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="brand" onClick={copyEmbed}>Copy embed</Button>
            <Button variant="outline" onClick={downloadHtml}>Download HTML</Button>
          </div>
        </Card>

        <Card padded>
          <Heading as="h4">Live preview</Heading>
          <Paragraph size="sm" className="mt-1">
            Rendered exactly as it will appear in your blog post.
          </Paragraph>
          <div className="mt-3 overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4">
            <iframe
              key={dataUrl.slice(-32)}
              src={dataUrl}
              width={Math.max(120, Number(width) || 640)}
              height={Math.max(80, Number(height) || 220)}
              style={{ border: 0, borderRadius: 12, maxWidth: '100%' }}
              title={`${name} palette preview`}
              loading="lazy"
            />
          </div>
        </Card>

        <Card padded>
          <Heading as="h4">Embed code</Heading>
          <Paragraph size="sm" className="mt-1">
            Paste this snippet into any HTML or Markdown that allows raw HTML.
          </Paragraph>
          <div className="mt-3">
            <CodeBlock code={snippet} lang="html" />
          </div>
        </Card>
      </div>
    </Modal>
  );
}
