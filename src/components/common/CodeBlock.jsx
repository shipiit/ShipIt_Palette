// Lightweight syntax highlighter — regex tokenizer with theme-aware colors.
// Supports: css, scss, less, html, xml, js, ts, jsx, json, swift, dart.
// Bonus: inline swatch next to hex colors.

const PALETTE = {
  comment:  '#7c8a99',
  keyword:  '#c084fc',
  type:     '#60a5fa',
  string:   '#facc15',
  number:   '#fb923c',
  prop:     '#f472b6',
  selector: '#22d3ee',
  atrule:   '#a78bfa',
  fn:       '#34d399',
  punct:    '#94a3b8',
  text:     '#e2e8f0',
  hex:      '#f9a8d4',
  bool:     '#fb7185',
  attr:     '#a3e635',
  tag:      '#67e8f9',
};

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const HEX_RX = /#[0-9a-f]{3,8}\b/gi;

function span(cls, text) { return `<span style="color:${PALETTE[cls]}">${escape(text)}</span>`; }

function highlightHex(s) {
  return s.replace(HEX_RX, (m) => `<span style="color:${PALETTE.hex}"><span style="display:inline-block;width:.7em;height:.7em;border-radius:3px;background:${m};margin-right:.25em;vertical-align:middle;border:1px solid rgba(255,255,255,.2)"></span>${escape(m)}</span>`);
}

/* ------------- per-language tokenizers ------------- */

function tokenize(code, lang) {
  const out = [];
  let rest = code;
  const push = (cls, text) => out.push(span(cls, text));
  const pushText = (text) => out.push(escape(text));

  const rules = LANGS[lang] || LANGS.txt;

  while (rest.length) {
    let matched = false;
    for (const [cls, rx] of rules) {
      rx.lastIndex = 0;
      const m = rx.exec(rest);
      if (m && m.index === 0) {
        if (cls === 'hex') {
          out.push(`<span style="color:${PALETTE.hex}"><span style="display:inline-block;width:.7em;height:.7em;border-radius:3px;background:${m[0]};margin-right:.25em;vertical-align:middle;border:1px solid rgba(255,255,255,.2)"></span>${escape(m[0])}</span>`);
        } else if (cls === '_pass') {
          pushText(m[0]);
        } else {
          push(cls, m[0]);
        }
        rest = rest.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      pushText(rest[0]);
      rest = rest.slice(1);
    }
  }
  return out.join('');
}

const LANGS = {
  css: [
    ['comment',  /\/\*[\s\S]*?\*\//],
    ['atrule',   /@[\w-]+/],
    ['hex',      /#[0-9a-fA-F]{3,8}\b/],
    ['fn',       /\b(rgb|rgba|hsl|hsla|oklch|color-mix|var|calc|linear-gradient|radial-gradient)\b/],
    ['number',   /\d+(\.\d+)?(%|px|em|rem|deg|s|ms)?/],
    ['prop',     /--[\w-]+/],
    ['string',   /"[^"]*"|'[^']*'/],
    ['selector', /\.[\w-]+|#[\w-]+|:root|::?[\w-]+/],
    ['punct',    /[{};:,()\[\]]/],
    ['keyword',  /\b(true|false|null|none|inherit|initial)\b/],
    ['_pass',    /\s+/],
    ['text',     /[\w-]+/],
  ],
  scss: undefined, // populated below
  less: undefined,
  json: [
    ['comment', /\/\/.*$/m],
    ['string',  /"(?:[^"\\]|\\.)*"/],
    ['number',  /-?\d+(\.\d+)?/],
    ['bool',    /\b(true|false|null)\b/],
    ['punct',   /[{}\[\]:,]/],
    ['_pass',   /\s+/],
    ['text',    /\w+/],
  ],
  js: [
    ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ['string',  /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/],
    ['hex',     /#[0-9a-fA-F]{3,8}\b/],
    ['keyword', /\b(import|export|from|const|let|var|function|return|if|else|for|while|class|extends|new|this|async|await|default|typeof|in|of|null|undefined|true|false|as)\b/],
    ['type',    /\b(Color|UIColor|Map|Record|String|Number|Boolean|Array)\b/],
    ['number',  /-?\b\d+(\.\d+)?\b/],
    ['fn',      /\b[a-zA-Z_$][\w$]*(?=\s*\()/],
    ['punct',   /[{}\[\]();,.=>:?!&|+\-*/<>]/],
    ['_pass',   /\s+/],
    ['text',    /[a-zA-Z_$][\w$]*/],
  ],
  xml: [
    ['comment', /<!--[\s\S]*?-->/],
    ['string',  /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/],
    ['hex',     /#[0-9a-fA-F]{3,8}\b/],
    ['tag',     /<\/?[\w:-]+/],
    ['attr',    /\b[\w:-]+(?==)/],
    ['punct',   /[<>\/=]/],
    ['_pass',   /\s+/],
    ['text',    /[^<>\s]+/],
  ],
  swift: [
    ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ['string',  /"(?:[^"\\]|\\.)*"/],
    ['keyword', /\b(import|extension|let|var|static|class|struct|enum|func|return|if|else|public|private|internal)\b/],
    ['type',    /\b(UIColor|UIKit|Color|String|Int|Double|Float|Bool)\b/],
    ['number',  /-?\b\d+(\.\d+)?\b/],
    ['fn',      /\b[a-zA-Z_][\w]*(?=\s*\()/],
    ['punct',   /[{}\[\]():,.=]/],
    ['_pass',   /\s+/],
    ['text',    /[a-zA-Z_][\w]*/],
  ],
  dart: [
    ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
    ['string',  /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/],
    ['keyword', /\b(import|class|static|const|final|var|return|if|else|new|extends|with|as)\b/],
    ['type',    /\b(Color|MaterialApp|Widget|String|int|double|bool|void)\b/],
    ['number',  /-?\b(0x[0-9A-Fa-f]+|\d+(\.\d+)?)\b/],
    ['fn',      /\b[a-zA-Z_][\w]*(?=\s*\()/],
    ['punct',   /[{}\[\]():,.;=]/],
    ['_pass',   /\s+/],
    ['text',    /[a-zA-Z_][\w]*/],
  ],
  txt: [['_pass', /\s+/], ['text', /\S+/]],
};

LANGS.scss = [
  ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
  ['atrule',  /@[\w-]+/],
  ['prop',    /\$[\w-]+/],
  ['hex',     /#[0-9a-fA-F]{3,8}\b/],
  ['fn',      /\b(rgb|rgba|hsl|hsla|map-get|map-merge|var)\b/],
  ['number',  /-?\d+(\.\d+)?(%|px|em|rem)?/],
  ['string',  /"[^"]*"|'[^']*'/],
  ['punct',   /[{};:,()\[\]]/],
  ['_pass',   /\s+/],
  ['text',    /[\w-]+/],
];
LANGS.less = [
  ['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//],
  ['atrule',  /@[\w-]+/],
  ['hex',     /#[0-9a-fA-F]{3,8}\b/],
  ['number',  /-?\d+(\.\d+)?(%|px|em|rem)?/],
  ['string',  /"[^"]*"|'[^']*'/],
  ['punct',   /[{};:,()\[\]]/],
  ['_pass',   /\s+/],
  ['text',    /[\w-]+/],
];
LANGS.html = LANGS.xml;
LANGS.ts = LANGS.js;
LANGS.jsx = LANGS.js;
LANGS.svg = LANGS.xml;

const LANG_FROM_FORMAT = {
  CSS: 'css', 'Tailwind 4': 'css', SCSS: 'scss', Less: 'less', 'Sass Map': 'scss',
  Tailwind: 'js', JS: 'js', TS: 'ts', JSON: 'json', Tokens: 'json',
  Swift: 'swift', Android: 'xml', Flutter: 'dart', SVG: 'xml',
  jsx: 'jsx', html: 'html', css: 'css', js: 'js', json: 'json', xml: 'xml',
};

export default function CodeBlock({ code, lang, format, className = '', maxHeight = '24rem' }) {
  const language = LANG_FROM_FORMAT[lang || format] || 'txt';
  const html = tokenize(code, language);
  return (
    <pre
      className={`overflow-auto rounded-xl bg-[#0b1020] p-4 text-[12px] leading-[1.65] font-mono ${className}`}
      style={{ maxHeight, color: PALETTE.text }}
    >
      <code dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}
