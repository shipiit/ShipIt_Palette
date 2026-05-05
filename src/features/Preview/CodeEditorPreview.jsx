import { useState } from 'react';
import { Badge, Heading, Paragraph, Icon } from '../../components/common';

/* ----------------------- Files ----------------------- */

const FILES = [
  { name: 'App.jsx', lang: 'jsx', code:
`import { useState } from 'react';
import { Button, Card } from './components';

export default function App() {
  const [count, setCount] = useState(0);
  const colors = ['indigo', 'amber', 'rose'];

  return (
    <main className="grid">
      <Card accent>
        <h1 className="title">Hello, world</h1>
        <p>You have clicked {count} times.</p>
        <Button
          variant="brand"
          onClick={() => setCount(count + 1)}
        >
          Click me
        </Button>
        <ul>
          {colors.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </Card>
    </main>
  );
}` },
  { name: 'styles.css', lang: 'css', code:
`:root {
  --brand-500: #6366f1;
  --brand-600: #4f46e5;
  --brand-700: #4338ca;
  --radius: 12px;
}

.title {
  color: var(--brand-600);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.grid {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: var(--brand-50);
  border-radius: var(--radius);
}

.button {
  background: var(--brand-600);
  color: white;
  padding: 10px 16px;
  transition: opacity 200ms ease;
}

.button:hover { opacity: 0.9; }` },
];

const TREE = [
  { i: 'flutter', l: 'src',           depth: 0 },
  { i: 'js',      l: 'App.jsx',       depth: 1, file: 'App.jsx' },
  { i: 'js',      l: 'main.jsx',      depth: 1 },
  { i: 'css',     l: 'styles.css',    depth: 1, file: 'styles.css' },
  { i: 'flutter', l: 'components',    depth: 1 },
  { i: 'js',      l: 'Button.jsx',    depth: 2 },
  { i: 'js',      l: 'Card.jsx',      depth: 2 },
  { i: 'json',    l: 'package.json',  depth: 0 },
  { i: 'json',    l: 'tsconfig.json', depth: 0 },
];

/* ------------------ Tokenizer ------------------ */

const KW_JSX = new Set([
  'import','from','export','default','function','const','let','var','return',
  'if','else','for','while','class','extends','new','this','true','false','null',
]);
const KW_CSS = new Set(['true','false','none']);

function tokenize(code, lang) {
  const out = [];
  let i = 0;
  const push = (kind, text) => out.push({ kind, text });
  const try1 = (rx, kind) => {
    const m = rx.exec(code.slice(i));
    if (m && m.index === 0) { push(kind, m[0]); i += m[0].length; return true; }
    return false;
  };
  while (i < code.length) {
    if (try1(/^\/\/[^\n]*/, 'comment')) continue;
    if (try1(/^\/\*[\s\S]*?\*\//, 'comment')) continue;
    if (try1(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/, 'string')) continue;
    if (lang === 'css') {
      if (try1(/^#[0-9a-fA-F]{3,8}\b/, 'hex')) continue;
      if (try1(/^--[\w-]+/, 'cssvar')) continue;
      if (try1(/^@[\w-]+/, 'atrule')) continue;
      if (try1(/^(:root|::?[\w-]+|\.[\w-]+|#[\w-]+)/, 'selector')) continue;
    }
    if (try1(/^-?\d+(\.\d+)?(%|px|em|rem|ms|s|deg)?/, 'number')) continue;
    const mid = /^[a-zA-Z_$][\w$-]*/.exec(code.slice(i));
    if (mid) {
      const w = mid[0];
      const isJsx = lang === 'jsx';
      const kind = isJsx
        ? (KW_JSX.has(w) ? 'keyword' : /^[A-Z]/.test(w) ? 'type' : code[i + w.length] === '(' ? 'fn' : 'text')
        : (KW_CSS.has(w) ? 'keyword' : 'text');
      push(kind, w); i += w.length; continue;
    }
    if (lang === 'jsx' && try1(/^<\/?[A-Za-z][\w]*/, 'tag')) continue;
    if (/[{}\[\]();,.:?!=<>+\-*/&|]/.test(code[i])) { push('punct', code[i]); i++; continue; }
    push('text', code[i]); i++;
  }
  return out;
}

const COLOR = {
  keyword:  'var(--brand-600)',
  string:   'var(--brand-400)',
  number:   'var(--brand-500)',
  fn:       'var(--brand-500)',
  type:     'var(--brand-400)',
  tag:      'var(--brand-700)',
  hex:      'var(--brand-500)',
  cssvar:   'var(--brand-700)',
  atrule:   'var(--brand-700)',
  selector: 'var(--brand-600)',
  comment:  '#7c8a99',
  punct:    '#94a3b8',
  text:     '#e2e8f0',
};

function renderTokens(tokens) {
  return tokens.map((t, i) => {
    if (t.kind === 'text' && (t.text === '\n' || /^\s+$/.test(t.text))) {
      return t.text;
    }
    return (
      <span key={i} style={{ color: COLOR[t.kind] || COLOR.text }}>
        {t.text}
      </span>
    );
  });
}

/* ------------------ Component ------------------ */

export default function CodeEditorPreview({ theme }) {
  const dark = theme === 'dark';
  const [activeFile, setActiveFile] = useState('App.jsx');
  const file = FILES.find((f) => f.name === activeFile) || FILES[0];
  const tokens = tokenize(file.code, file.lang);
  const lineCount = file.code.split('\n').length;

  return (
    <div className={`min-h-full px-6 py-12 ${dark ? 'bg-neutral-950' : 'bg-neutral-100'}`}>
      <div className="text-center mb-8">
        <Badge variant="brand"><Icon name="js" size={12} /> Editor preview</Badge>
        <Heading as="h2" className="mt-3 !text-3xl">Your palette in code</Heading>
        <Paragraph className="mt-2 max-w-md mx-auto">
          Syntax tokens recoloured live with your brand shades.
        </Paragraph>
      </div>

      <div
        className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: '#0b1020',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center px-3 h-9 border-b"
          style={{
            background: '#1a1f33',
            borderColor: 'rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center text-xs font-medium text-neutral-400">
            shipit-palette — {activeFile}
          </div>
          <div className="w-12" />
        </div>

        {/* File tabs */}
        <div className="flex border-b text-xs" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {FILES.map((f) => {
            const isActive = f.name === activeFile;
            return (
              <button
                key={f.name}
                onClick={() => setActiveFile(f.name)}
                className="flex items-center gap-2 px-4 py-2 border-r"
                style={{
                  borderColor: 'rgba(255,255,255,0.06)',
                  background: isActive ? '#0b1020' : '#161b2e',
                  color: isActive ? '#e2e8f0' : '#94a3b8',
                  borderTop: isActive ? `2px solid var(--brand-500)` : '2px solid transparent',
                }}
              >
                <Icon name={f.lang === 'css' ? 'css' : 'js'} size={12} />
                {f.name}
                <span className="opacity-40 ml-1">×</span>
              </button>
            );
          })}
        </div>

        {/* Body: sidebar + editor */}
        <div className="flex" style={{ minHeight: 460 }}>
          {/* Sidebar / file tree */}
          <div
            className="hidden md:block w-56 border-r py-3 text-[12px]"
            style={{
              background: '#0d1226',
              borderColor: 'rgba(255,255,255,0.06)',
              color: '#cbd5e1',
            }}
          >
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              Explorer
            </div>
            {TREE.map((t, i) => {
              const isActive = t.file === activeFile;
              return (
                <button
                  key={i}
                  onClick={() => t.file && setActiveFile(t.file)}
                  className="flex w-full items-center gap-1.5 px-3 py-1 text-left hover:bg-white/5"
                  style={{
                    paddingLeft: 12 + t.depth * 14,
                    color: isActive ? 'var(--brand-400)' : '#cbd5e1',
                    background: isActive ? 'rgba(255,255,255,0.06)' : undefined,
                  }}
                >
                  <Icon name={t.i} size={12} />
                  <span className="text-xs">{t.l}</span>
                </button>
              );
            })}
          </div>

          {/* Editor */}
          <div
            className="flex-1 overflow-auto flex text-[12.5px] leading-[1.7] font-mono"
            style={{ color: COLOR.text, background: '#0b1020' }}
          >
            <div
              className="select-none text-right pr-4 pl-3 py-3 text-[11px] tabular-nums shrink-0"
              style={{ color: '#475569', borderRight: '1px solid rgba(255,255,255,0.05)' }}
            >
              {Array.from({ length: lineCount }, (_, n) => (
                <div key={n}>{n + 1}</div>
              ))}
            </div>
            <pre className="flex-1 px-4 py-3 m-0 whitespace-pre overflow-x-auto">
              <code>{renderTokens(tokens)}</code>
            </pre>
          </div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center gap-4 px-4 py-1.5 text-[11px] text-white"
          style={{ background: 'var(--brand-600)' }}
        >
          <span className="flex items-center gap-1"><Icon name="check" size={11} /> main</span>
          <span>UTF-8</span>
          <span>{file.lang.toUpperCase()}</span>
          <span className="ml-auto">Ln {lineCount}, Col 1</span>
          <span>Spaces: 2</span>
          <span className="flex items-center gap-1"><Icon name="sparkle" size={11} /> ShipIt</span>
        </div>
      </div>
    </div>
  );
}
