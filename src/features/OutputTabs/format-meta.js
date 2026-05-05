// Metadata for each export format — icon name (from common/Icon.jsx), label, hint.
export const FORMAT_META = {
  CSS:          { icon: 'css',      label: 'CSS Variables', hint: ':root { --color-500 } variables' },
  Tailwind:     { icon: 'tailwind', label: 'Tailwind v3',   hint: 'tailwind.config.js extend.colors' },
  'Tailwind 4': { icon: 'tailwind', label: 'Tailwind v4',   hint: '@theme block in your stylesheet' },
  Tokens:       { icon: 'tokens',   label: 'Design Tokens', hint: 'JSON design-tokens spec' },
  SCSS:         { icon: 'scss',     label: 'SCSS / Sass',   hint: '$variable declarations' },
  Less:         { icon: 'less',     label: 'Less',          hint: '@variable declarations' },
  'Sass Map':   { icon: 'map',      label: 'Sass Map',      hint: 'map-get($palette, 500)' },
  JSON:         { icon: 'json',     label: 'JSON',          hint: 'plain JSON object' },
  JS:           { icon: 'js',       label: 'JavaScript',    hint: 'export const palette = { … }' },
  TS:           { icon: 'ts',       label: 'TypeScript',    hint: 'typed Record<Shade, string>' },
  Swift:        { icon: 'swift',    label: 'Swift (UIColor)', hint: 'iOS UIColor extension' },
  Android:      { icon: 'android',  label: 'Android (XML)', hint: 'res/values/colors.xml' },
  Flutter:      { icon: 'flutter',  label: 'Flutter (Dart)', hint: 'Color(0xFFRRGGBB) constants' },
  SVG:          { icon: 'svg',      label: 'SVG Swatches',  hint: 'visual swatches as SVG' },
};

export const FORMAT_KEYS = Object.keys(FORMAT_META);
