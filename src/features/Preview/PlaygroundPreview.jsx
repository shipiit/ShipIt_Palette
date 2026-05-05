import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Icon, Dropdown, Badge } from '../../components/common';
import { useToast } from '../../components/common/Toast.jsx';
import { TEMPLATES } from './_playground-templates.js';
import { BASE_STYLES } from './_playground-styles.js';
import HighlightedEditor from './_HighlightedEditor.jsx';

const TEMPLATE_OPTIONS = Object.entries(TEMPLATES).map(([value, t]) => ({ value, label: t.label }));
const TEMPLATE_KEYS = Object.keys(TEMPLATES);

export default function PlaygroundPreview({ theme, initialCode, initialLabel }) {
  const dark = theme === 'dark';
  const [template, setTemplate] = useState(initialCode ? 'custom' : 'hero');
  const [code, setCode] = useState(initialCode || TEMPLATES.hero.code);

  useEffect(() => {
    if (initialCode) { setCode(initialCode); setTemplate('custom'); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);
  const iframeRef = useRef(null);
  const { toast } = useToast();
  const css = useMemo(() => readBrandVars(), []);

  useEffect(() => {
    const t = setTimeout(() => render(iframeRef, code, css, dark), 120);
    return () => clearTimeout(t);
  }, [code, css, dark]);

  const loadTemplate = (id) => { setTemplate(id); setCode(TEMPLATES[id].code); };
  const reset = () => loadTemplate(template);
  const random = () => {
    const next = TEMPLATE_KEYS[Math.floor(Math.random() * TEMPLATE_KEYS.length)];
    loadTemplate(next);
    toast(`Loaded "${TEMPLATES[next].label}"`);
  };
  const copy = () => { navigator.clipboard.writeText(code); toast('Copied HTML'); };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 p-4 ${dark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
      <div className="flex flex-col gap-2 min-h-[68vh]">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ background: 'var(--brand-500)' }}
            >
              <Icon name="js" size={14} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">Code</span>
            <Badge variant="brand">{template === 'custom' ? (initialLabel || 'Custom') : TEMPLATES[template].label}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-44">
              <Dropdown value={template} onChange={loadTemplate} options={TEMPLATE_OPTIONS} />
            </div>
            <Button size="sm" variant="outline" onClick={random}><Icon name="shuffle" /> Random</Button>
            <Button size="sm" variant="outline" onClick={reset}><Icon name="close" /> Reset</Button>
            <Button size="sm" variant="brand" onClick={copy}><Icon name="copy" /> Copy</Button>
          </div>
        </div>

        <HighlightedEditor value={code} onChange={setCode} dark={dark} />

        <p className="text-xs text-neutral-500 px-1">
          Use <Chip>var(--brand-500)</Chip> · <Chip>.btn</Chip> · <Chip>.card</Chip> · <Chip>.badge</Chip> · <Chip>.input</Chip> · <Chip>.row</Chip>. Edit on the left → live preview on the right.
        </p>
      </div>

      <div className="flex flex-col gap-2 min-h-[68vh]">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">Live preview</span>
            <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'var(--brand-600)' }}>
              <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: 'var(--brand-500)' }} />
              auto-rendering
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2">playground.shipit-palette.app</span>
          </div>
        </div>
        <iframe
          ref={iframeRef}
          title="playground"
          className={`flex-1 rounded-2xl border ${dark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-white'}`}
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <code
      className="font-mono px-1.5 py-0.5 rounded text-[11px] mx-0.5"
      style={{ background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)' }}
    >
      {children}
    </code>
  );
}

function readBrandVars() {
  if (typeof window === 'undefined') return '';
  const styles = getComputedStyle(document.documentElement);
  const lines = [];
  ['50','100','200','300','400','500','600','700','800','900','950'].forEach((k) => {
    const v = styles.getPropertyValue(`--brand-${k}`).trim();
    if (v) lines.push(`  --brand-${k}: ${v};`);
  });
  return `:root {\n${lines.join('\n')}\n}\n`;
}

function render(ref, html, brandVars, dark) {
  if (!ref.current) return;
  ref.current.srcdoc = `<!doctype html>
<html lang="en"${dark ? ' class="dark"' : ''}>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
${brandVars}
${BASE_STYLES}
${dark ? `body { background: var(--brand-950); color: var(--brand-100); }
.card { background: var(--brand-900); border-color: var(--brand-800); color: var(--brand-100); }
.card h2, .card h3 { color: var(--brand-50); }
.card p, .hero p { color: var(--brand-300); }
.input { background: var(--brand-950); color: var(--brand-100); border-color: var(--brand-800); }
.badge.soft { background: color-mix(in srgb, var(--brand-500) 22%, transparent); color: var(--brand-200); }
.kpi { background: var(--brand-900); border-color: var(--brand-800); }
.kpi .kpi-label { color: var(--brand-400); }
.kpi .kpi-value { color: var(--brand-50); }
.testimonial { background: var(--brand-900); border-color: var(--brand-800); }
.feature-icon { background: color-mix(in srgb, var(--brand-500) 24%, transparent); color: var(--brand-200); }` : ''}
</style>
</head>
<body>
${html}
</body>
</html>`;
}
