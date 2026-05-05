import { useRef } from 'react';

const PALETTE = {
  comment:  '#7c8a99',
  tag:      '#67e8f9',
  attr:     '#a3e635',
  string:   '#facc15',
  punct:    '#94a3b8',
  text:     '#e2e8f0',
  hex:      '#f9a8d4',
};

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const wrap = (cls, text) => `<span style="color:${PALETTE[cls]}">${escape(text)}</span>`;

const RULES = [
  ['comment', /^<!--[\s\S]*?-->/],
  ['string',  /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/],
  ['hex',     /^#[0-9a-fA-F]{3,8}\b/],
  ['tag',     /^<\/?[\w:-]+/],
  ['attr',    /^\b[\w:-]+(?==)/],
  ['punct',   /^[<>\/=]/],
];

function tokenize(code) {
  let rest = code, out = '';
  while (rest.length) {
    let matched = false;
    for (const [cls, rx] of RULES) {
      const m = rest.match(rx);
      if (m) { out += wrap(cls, m[0]); rest = rest.slice(m[0].length); matched = true; break; }
    }
    if (!matched) {
      const len = rest.search(/[<>"'#]/);
      const chunk = len === -1 ? rest : (len === 0 ? rest[0] : rest.slice(0, len));
      out += escape(chunk);
      rest = rest.slice(chunk.length);
    }
  }
  // Trailing newline so the highlighted layer matches textarea height when last char is `\n`
  return out + '\n';
}

export default function HighlightedEditor({ value, onChange, dark }) {
  const taRef  = useRef(null);
  const preRef = useRef(null);

  const onScroll = (e) => {
    if (preRef.current) {
      preRef.current.scrollTop  = e.target.scrollTop;
      preRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const html = tokenize(value);

  const shared = {
    margin: 0,
    padding: 16,
    border: 0,
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
    fontSize: 12.5,
    lineHeight: '1.7',
    whiteSpace: 'pre',
    tabSize: 2,
    overflow: 'auto',
  };

  return (
    <div
      className={`relative flex-1 rounded-2xl border overflow-hidden ${dark ? 'border-neutral-800' : 'border-neutral-200'}`}
      style={{ background: '#0b1020' }}
    >
      <pre
        ref={preRef}
        aria-hidden="true"
        style={{ ...shared, color: PALETTE.text, position: 'absolute', inset: 0, pointerEvents: 'none' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <textarea
        ref={taRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onScroll={onScroll}
        spellCheck={false}
        style={{
          ...shared,
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'transparent',
          color: 'transparent',
          caretColor: 'var(--brand-400)',
          resize: 'none',
          outline: 'none',
        }}
      />
    </div>
  );
}
