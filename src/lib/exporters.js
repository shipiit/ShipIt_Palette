// Build the export strings for CSS / Tailwind / Tokens / SCSS / JS object,
// in the user-selected color format (HEX/RGBA/HSL/OKLCH).
import { fmtHex, fmtRgba, fmtHsl, fmtOklch, slugify } from './color.js';

const FORMATTERS = {
  HEX: (rgb) => fmtHex(rgb),
  RGBA: (rgb) => fmtRgba(rgb, 1),
  HSL: (rgb) => fmtHsl(rgb),
  OKLCH: (rgb) => fmtOklch(rgb),
};

export function getValue(rgb, format) {
  return (FORMATTERS[format] || FORMATTERS.HEX)(rgb);
}

export function exportCSS({ name, palette, format }) {
  const slug = slugify(name);
  const lines = palette.map((s) => `  --${slug}-${s.label}: ${getValue(s.rgb, format)};`);
  return `/* CSS Variables — Color Palette Studio */\n:root {\n${lines.join('\n')}\n}\n\n.dark {\n${lines.join('\n')}\n}\n`;
}

export function exportTailwindV3({ name, palette, format }) {
  const slug = slugify(name);
  const lines = palette.map((s) => `        '${s.label}': '${getValue(s.rgb, format)}',`);
  return `// tailwind.config.js — extend.colors\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '${slug}': {\n${lines.join('\n')}\n        },\n      },\n    },\n  },\n};\n`;
}

export function exportTailwindV4({ name, palette, format }) {
  const slug = slugify(name);
  const lines = palette.map((s) => `  --color-${slug}-${s.label}: ${getValue(s.rgb, format)};`);
  return `/* Tailwind v4 — paste into your global stylesheet */\n@theme {\n${lines.join('\n')}\n}\n`;
}

export function exportTokens({ name, palette, format }) {
  const slug = slugify(name);
  const obj = {
    [slug]: Object.fromEntries(
      palette.map((s) => [s.label, { value: getValue(s.rgb, format), type: 'color' }])
    ),
  };
  return JSON.stringify(obj, null, 2);
}

export function exportSCSS({ name, palette, format }) {
  const slug = slugify(name);
  const lines = palette.map((s) => `$${slug}-${s.label}: ${getValue(s.rgb, format)};`);
  return `// SCSS — Color Palette Studio\n${lines.join('\n')}\n`;
}

export function exportJSObject({ name, palette, format }) {
  const slug = slugify(name).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const lines = palette.map((s) => `  '${s.label}': '${getValue(s.rgb, format)}',`);
  return `// JS / TS object — import & use anywhere\nexport const ${slug} = {\n${lines.join('\n')}\n};\n`;
}

export function exportLess({ name, palette, format }) {
  const slug = slugify(name);
  const lines = palette.map((s) => `@${slug}-${s.label}: ${getValue(s.rgb, format)};`);
  return `// Less — Color Palette Studio\n${lines.join('\n')}\n`;
}

export function exportSassMap({ name, palette, format }) {
  const slug = slugify(name);
  const lines = palette.map((s) => `  '${s.label}': ${getValue(s.rgb, format)},`);
  return `// Sass Map — use map-get($${slug}, '500')\n$${slug}: (\n${lines.join('\n')}\n);\n`;
}

export function exportJSON({ name, palette, format }) {
  const slug = slugify(name);
  return JSON.stringify({ [slug]: Object.fromEntries(palette.map((s) => [s.label, getValue(s.rgb, format)])) }, null, 2);
}

export function exportTypeScript({ name, palette, format }) {
  const slug = slugify(name);
  const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const keys = palette.map((s) => `  '${s.label}'`).join(' | ');
  const lines = palette.map((s) => `  '${s.label}': '${getValue(s.rgb, format)}',`);
  return `// TypeScript — typed color palette\nexport type ${camel.charAt(0).toUpperCase() + camel.slice(1)}Shade =\n${keys};\n\nexport const ${camel}: Record<${camel.charAt(0).toUpperCase() + camel.slice(1)}Shade, string> = {\n${lines.join('\n')}\n};\n`;
}

export function exportSwift({ name, palette }) {
  const slug = slugify(name);
  const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const lines = palette.map((s) => {
    const r = (s.rgb.r / 255).toFixed(3), g = (s.rgb.g / 255).toFixed(3), b = (s.rgb.b / 255).toFixed(3);
    return `    static let ${camel}${s.label} = UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: 1.0)`;
  });
  return `// Swift — iOS UIColor\nimport UIKit\n\nextension UIColor {\n${lines.join('\n')}\n}\n`;
}

export function exportAndroid({ name, palette }) {
  const slug = slugify(name).replace(/-/g, '_');
  const lines = palette.map((s) => `    <color name="${slug}_${s.label}">${fmtHex(s.rgb)}</color>`);
  return `<!-- Android — res/values/colors.xml -->\n<resources>\n${lines.join('\n')}\n</resources>\n`;
}

export function exportFlutter({ name, palette }) {
  const slug = slugify(name);
  const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const lines = palette.map((s) => {
    const hex = fmtHex(s.rgb).replace('#', '');
    return `  static const ${camel}${s.label} = Color(0xFF${hex.toUpperCase()});`;
  });
  return `// Flutter / Dart — Color constants\nimport 'package:flutter/material.dart';\n\nclass ${camel.charAt(0).toUpperCase() + camel.slice(1)}Palette {\n${lines.join('\n')}\n}\n`;
}

export function exportSVG({ name, palette }) {
  const w = 80, h = 80, gap = 4;
  const total = palette.length * (w + gap) - gap;
  const rects = palette.map((s, i) => {
    const x = i * (w + gap);
    return `  <rect x="${x}" y="0" width="${w}" height="${h}" rx="10" fill="${s.hex}"/>\n  <text x="${x + 8}" y="20" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="rgba(0,0,0,.55)">${s.label}</text>\n  <text x="${x + 8}" y="${h - 8}" font-family="JetBrains Mono, monospace" font-size="10" fill="rgba(0,0,0,.6)">${s.hex}</text>`;
  });
  return `<!-- ${name} — Color Palette Studio -->\n<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${h}" viewBox="0 0 ${total} ${h}">\n${rects.join('\n')}\n</svg>\n`;
}

export const EXPORTERS = {
  CSS: exportCSS,
  Tailwind: exportTailwindV3,
  'Tailwind 4': exportTailwindV4,
  Tokens: exportTokens,
  SCSS: exportSCSS,
  Less: exportLess,
  'Sass Map': exportSassMap,
  JSON: exportJSON,
  JS: exportJSObject,
  TS: exportTypeScript,
  Swift: exportSwift,
  Android: exportAndroid,
  Flutter: exportFlutter,
  SVG: exportSVG,
};
