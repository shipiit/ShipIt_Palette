// Color math: hex/rgb/hsl/oklch + palette generation algorithms + naming patterns + color names.

/* ---------- Parsing & format conversion ---------- */

export function clamp(n, min = 0, max = 255) { return Math.max(min, Math.min(max, n)); }
const pad2 = (n) => n.toString(16).padStart(2, '0');

export function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (h.length !== 6) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }) {
  return `#${pad2(clamp(Math.round(r)))}${pad2(clamp(Math.round(g)))}${pad2(clamp(Math.round(b)))}`;
}

export function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function hslToRgb({ h, s, l }) {
  h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

/* ---------- OKLCH (sRGB → linear → LMS → OKLab → OKLCH) ---------- */

const srgbToLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const linToSrgb = (c) => { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return clamp(Math.round(v * 255)); };

export function rgbToOklch({ r, g, b }) {
  const lr = srgbToLin(r), lg = srgbToLin(g), lb = srgbToLin(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.sqrt(a * a + bb * bb);
  let H = (Math.atan2(bb, a) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { l: L, c: C, h: H };
}

export function oklchToRgb({ l: L, c: C, h: H }) {
  const a = Math.cos((H * Math.PI) / 180) * C;
  const b = Math.sin((H * Math.PI) / 180) * C;
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  return { r: linToSrgb(lr), g: linToSrgb(lg), b: linToSrgb(lb) };
}

/* ---------- Format strings ---------- */

export const fmtHex = (rgb) => rgbToHex(rgb);
export const fmtRgba = (rgb, a = 1) => `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${a})`;
export const fmtHsl = (rgb) => { const { h, s, l } = rgbToHsl(rgb); return `hsl(${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`; };
export const fmtOklch = (rgb) => { const { l, c, h } = rgbToOklch(rgb); return `oklch(${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(1)})`; };

/* ---------- Naming patterns & shade counts ---------- */

export const NAMING_PATTERNS = {
  '50,100…900': (count) => {
    const labels = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
    if (count <= labels.length) return labels.slice(0, count);
    const out = [...labels];
    for (let i = labels.length; i < count; i++) out.push(`${i * 100}`);
    return out;
  },
  '1,2,3…20': (count) => Array.from({ length: count }, (_, i) => String(i + 1)),
  '0,1…10':   (count) => Array.from({ length: count }, (_, i) => String(i)),
  '10,20,30…200': (count) => Array.from({ length: count }, (_, i) => String((i + 1) * 10)),
  '100,200…1000': (count) => Array.from({ length: count }, (_, i) => String((i + 1) * 100)),
  'A,B,C…Z':  (count) => Array.from({ length: count }, (_, i) => String.fromCharCode(65 + (i % 26))),
  'light…dark': (count) => {
    if (count === 3) return ['light', 'base', 'dark'];
    if (count === 5) return ['lightest', 'light', 'base', 'dark', 'darkest'];
    return Array.from({ length: count }, (_, i) => `step-${i + 1}`);
  },
  'tint/shade': (count) => {
    const mid = Math.floor(count / 2);
    return Array.from({ length: count }, (_, i) => {
      if (i === mid) return 'base';
      return i < mid ? `tint-${mid - i}` : `shade-${i - mid}`;
    });
  },
};

/* ---------- Algorithms ----------
 * each returns array of { name, hex, rgb }
 */

const LIGHTNESS_TARGETS_TAILWIND = [97, 92, 84, 73, 60, 47, 38, 30, 22, 15, 9]; // 50..950
const LIGHTNESS_TARGETS_LINEAR = (count) => Array.from({ length: count }, (_, i) => 95 - (90 * i) / (count - 1));

function buildShadesByLightnessHsl(baseHex, count) {
  const baseRgb = hexToRgb(baseHex);
  const { h, s } = rgbToHsl(baseRgb);
  const targets = count <= 11
    ? LIGHTNESS_TARGETS_TAILWIND.slice(0, count)
    : [...LIGHTNESS_TARGETS_TAILWIND, ...Array.from({ length: count - 11 }, (_, i) => 9 - (i + 1) * 1.5)];
  return targets.map((l) => {
    const rgb = hslToRgb({ h, s, l });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesByLightnessLinear(baseHex, count) {
  const baseRgb = hexToRgb(baseHex);
  const { h, s } = rgbToHsl(baseRgb);
  return LIGHTNESS_TARGETS_LINEAR(count).map((l) => {
    const rgb = hslToRgb({ h, s, l });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesByOklch(baseHex, count) {
  const baseRgb = hexToRgb(baseHex);
  const { c, h } = rgbToOklch(baseRgb);
  const lightness = Array.from({ length: count }, (_, i) => 0.97 - (0.92 * i) / (count - 1));
  return lightness.map((l) => {
    const rgb = oklchToRgb({ l, c, h });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesByMaterial(baseHex, count) {
  // Material 3-inspired: ease-out lightness curve through OKLCH chroma reduction at extremes
  const baseRgb = hexToRgb(baseHex);
  const { c, h } = rgbToOklch(baseRgb);
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const eased = 1 - Math.pow(1 - t, 1.6);                       // ease-out
    const l = 0.98 - eased * 0.94;
    const chromaScale = 1 - Math.abs(t - 0.5) * 1.4;              // less chroma at extremes
    const rgb = oklchToRgb({ l, c: c * Math.max(0.15, chromaScale), h });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesByRadix(baseHex, count) {
  // Radix-style: tighter contrast in mid-tones, smoother near extremes
  const baseRgb = hexToRgb(baseHex);
  const { h, s } = rgbToHsl(baseRgb);
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const sigmoid = 1 / (1 + Math.exp(-10 * (t - 0.5)));          // S-curve
    const l = 96 - sigmoid * 88;
    const rgb = hslToRgb({ h, s: s * (1 - Math.abs(t - 0.5) * 0.4), l });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesByHueShift(baseHex, count) {
  // Slight hue shift: warmer tints, cooler shades (designers' favorite trick)
  const baseRgb = hexToRgb(baseHex);
  const { h, s } = rgbToHsl(baseRgb);
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const l = 96 - t * 90;
    const hueOffset = (0.5 - t) * 24;                              // ±12° rotation
    const rgb = hslToRgb({ h: h + hueOffset, s, l });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesByMonochrome(baseHex, count) {
  // Pure greyscale, ignores hue/sat
  const baseRgb = hexToRgb(baseHex);
  const { l: bl } = rgbToHsl(baseRgb);
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const l = 96 - t * 90;
    const rgb = hslToRgb({ h: 0, s: 4, l }); // tiny saturation for warmth
    return { rgb, hex: rgbToHex(rgb) };
  });
}

function buildShadesBySaturationCurve(baseHex, count) {
  // Saturation increases towards mid-shades, fades at extremes
  const baseRgb = hexToRgb(baseHex);
  const { h, s } = rgbToHsl(baseRgb);
  const lightness = Array.from({ length: count }, (_, i) => 95 - (90 * i) / (count - 1));
  return lightness.map((l, i) => {
    const t = i / (count - 1);
    const satMul = 0.4 + Math.sin(t * Math.PI) * 0.7;
    const rgb = hslToRgb({ h, s: clamp(s * satMul, 0, 100), l });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

export const ALGORITHMS = {
  'Tailwind CSS':       buildShadesByLightnessHsl,
  'Linear HSL':         buildShadesByLightnessLinear,
  'OKLCH':              buildShadesByOklch,
  'Material 3':         buildShadesByMaterial,
  'Radix UI':           buildShadesByRadix,
  'Hue Shift':          buildShadesByHueShift,
  'Saturation Curve':   buildShadesBySaturationCurve,
  'Monochrome':         buildShadesByMonochrome,
};

/* ---------- Contrast shift (positive = push extremes) ---------- */
export function applyContrastShift(shades, shift) {
  if (!shift) return shades;
  return shades.map((s, i) => {
    const t = i / (shades.length - 1); // 0..1
    const dir = t < 0.5 ? -1 : 1;
    const amt = shift * Math.abs(0.5 - t) * 2;
    const hsl = rgbToHsl(s.rgb);
    const newL = clamp(hsl.l + dir * amt, 0, 100);
    const rgb = hslToRgb({ ...hsl, l: newL });
    return { rgb, hex: rgbToHex(rgb) };
  });
}

/* ---------- Build full palette ---------- */
export function buildPalette({ baseHex, algorithm, namingPattern, count, contrastShift, name }) {
  const algoFn = ALGORITHMS[algorithm] || ALGORITHMS['Tailwind CSS'];
  const namesFn = NAMING_PATTERNS[namingPattern] || NAMING_PATTERNS['50,100…900'];
  const labels = namesFn(count);
  let shades = algoFn(baseHex, count);
  shades = applyContrastShift(shades, contrastShift);
  return shades.map((s, i) => ({ label: labels[i], hex: s.hex, rgb: s.rgb }));
}

/* ---------- Color name (rough nearest-name lookup) ---------- */

const NAMED_COLORS = [
  ['Screamin Green', '#76ff7a'], ['Lime', '#bfff00'], ['Emerald', '#10b981'],
  ['Forest', '#228B22'], ['Mint', '#98ff98'],
  ['Sky Blue', '#38bdf8'], ['Royal Blue', '#1e40af'], ['Navy', '#0a1f44'], ['Cyan', '#06b6d4'],
  ['Indigo', '#4f46e5'], ['Violet', '#8b5cf6'], ['Magenta', '#ec4899'], ['Rose', '#f43f5e'],
  ['Crimson', '#dc143c'], ['Cherry', '#b71c1c'], ['Coral', '#ff7f50'],
  ['Tangerine', '#f97316'], ['Amber', '#f59e0b'], ['Gold', '#d4af37'], ['Lemon', '#fff44f'],
  ['Olive', '#808000'], ['Teal', '#0d9488'], ['Slate', '#64748b'],
  ['Charcoal', '#36454f'], ['Snow', '#f8fafc'], ['Sand', '#e7d2a4'],
];

function distance(a, b) {
  return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

export function nearestColorName(hex) {
  const rgb = hexToRgb(hex);
  let best = NAMED_COLORS[0], bestD = Infinity;
  for (const [name, h] of NAMED_COLORS) {
    const d = distance(rgb, hexToRgb(h));
    if (d < bestD) { bestD = d; best = [name, h]; }
  }
  return best[0];
}

/* ---------- slug helper for variable names ---------- */
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
