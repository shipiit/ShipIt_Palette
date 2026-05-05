// Three Figma-compatible export formats from a palette.
// Each takes { palette, name, slug } and returns a string.
import { slugify } from '../../lib/color.js';

export function tokensStudio({ palette, name }) {
  const slug = slugify(name);
  const obj = {
    [slug]: Object.fromEntries(
      palette.map((s) => [s.label, { value: s.hex, type: 'color' }])
    ),
    $themes: [],
    $metadata: { tokenSetOrder: [slug] },
  };
  return JSON.stringify(obj, null, 2);
}

export function figmaVariables({ palette, name }) {
  const slug = slugify(name);
  return JSON.stringify({
    version: '1.0',
    collections: [{
      name: `${slug}-palette`,
      modes: [{ name: 'Default', modeId: 'default' }],
      variables: palette.map((s) => ({
        name: `${slug}/${s.label}`,
        type: 'COLOR',
        valuesByMode: { default: hexToRgbaObj(s.hex) },
        scopes: ['ALL_FILLS', 'STROKE_COLOR'],
      })),
    }],
  }, null, 2);
}

export function pluginCode({ palette, name }) {
  const slug = slugify(name);
  const styles = palette.map((s) => `  { name: "${slug}/${s.label}", hex: "${s.hex}" }`).join(',\n');
  return `// ${name} palette · paste into Figma plugin code.ts
// Creates a Paint Style for every shade.

const palette = [
${styles}
];

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

palette.forEach((c) => {
  const style = figma.createPaintStyle();
  style.name = c.name;
  style.paints = [{ type: "SOLID", color: hexToRgb(c.hex) }];
});

figma.notify(\`Created \${palette.length} ${name} styles ✓\`);
figma.closePlugin();
`;
}

export function pluginManifest({ name }) {
  const slug = slugify(name);
  return `{
  "name": "${name} Palette Importer",
  "id": "shipit-palette-${slug}",
  "api": "1.0.0",
  "main": "code.js",
  "editorType": ["figma", "figjam"],
  "documentAccess": "dynamic-page"
}
`;
}

export const FIGMA_LINKS = {
  tokens:    'https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma',
  variables: 'https://www.figma.com/community/file/1253571040420050950',
  variablesGuide: 'https://help.figma.com/hc/en-us/articles/15145852043927-Overview-of-variables-collections-and-modes',
  pluginDocs: 'https://www.figma.com/plugin-docs/manifest/',
};

function hexToRgbaObj(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
    a: 1,
  };
}
