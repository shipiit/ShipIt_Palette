import { useRef, useState } from 'react';
import { Button, Card, Heading, Paragraph, Icon, CodeBlock } from '../../components/common';
import Modal from '../../components/common/Modal.jsx';
import { useToast } from '../../components/common/Toast.jsx';
import { slugify } from '../../lib/color.js';
import { tokensStudio, figmaVariables, pluginCode, pluginManifest } from './figma-exporters.js';
import FigmaHero from './_FigmaHero.jsx';
import FigmaFeatures from './_FigmaFeatures.jsx';
import FigmaGuide, { FigmaFAQ } from './_FigmaGuide.jsx';

const TABS = [
  { id: 'tokens',    label: 'Tokens Studio',   icon: 'tokens',  hint: 'Drop into the Tokens Studio Figma plugin', filename: 'tokens.json',    lang: 'json' },
  { id: 'variables', label: 'Figma Variables', icon: 'palette', hint: 'Native Figma variables (REST API or import plugin)', filename: 'variables.json', lang: 'json' },
  { id: 'plugin',    label: 'Custom Plugin',   icon: 'js',      hint: 'Generate a real Figma plugin that creates Paint Styles', filename: 'code.ts', lang: 'ts' },
];

export default function FigmaExportModal({ open, onClose, palette, name }) {
  const [tab, setTab] = useState('tokens');
  const { toast } = useToast();
  const meta = TABS.find((t) => t.id === tab);
  const formatsRef = useRef(null);
  const scrollToFormats = () => formatsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const code = tab === 'tokens'    ? tokensStudio({ palette, name })
             : tab === 'variables' ? figmaVariables({ palette, name })
             : pluginCode({ palette, name });

  const copy = () => { navigator.clipboard.writeText(code); toast(`Copied ${meta.label}`); };
  const download = () => downloadFile(meta.filename, code);
  const downloadPluginBundle = () => {
    const slug = slugify(name);
    downloadFile(`${slug}-figma-plugin.txt`,
`Figma Plugin Bundle for "${name}"
=========================================

Save the two sections below as separate files in the same folder, then:
Figma → Plugins → Development → Import plugin from manifest…

----- manifest.json -----
${pluginManifest({ name })}

----- code.ts -----
${pluginCode({ palette, name })}
`);
    toast('Downloaded plugin bundle');
  };

  return (
    <Modal open={open} onClose={onClose} title="Figma Export — bring your palette into Figma" size="full">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
        <Sidebar palette={palette} name={name} />

        <main className="space-y-8 min-w-0">
          <FigmaHero palette={palette} name={name} onScrollToFormats={scrollToFormats} />
          <FigmaFeatures />

          <div ref={formatsRef} className="pt-2">
            <div className="text-center mb-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Pick your format</span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Three integration paths · pick yours
              </h2>
            </div>
            <Tabs tab={tab} setTab={setTab} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
            <CodePanel
              meta={meta}
              code={code}
              showBundle={tab === 'plugin'}
              onCopy={copy}
              onDownload={download}
              onBundle={downloadPluginBundle}
            />
            <FigmaGuide tab={tab} />
          </div>

          <FigmaFAQ />

          <div className="text-center pb-2 pt-1 text-xs text-neutral-500">
            Need a different format? Check the main <strong>Export</strong> panel for CSS, Tailwind, SCSS, JSON, and 10+ more.
          </div>
        </main>
      </div>
    </Modal>
  );
}

function Sidebar({ palette, name }) {
  return (
    <aside className="space-y-4">
      <Card>
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md"
            style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' }}
          >
            <Icon name="palette" size={22} />
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">Palette</p>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{name}</h4>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-6 gap-1">
          {palette.map((s) => (
            <span key={s.label} className="aspect-square rounded-md ring-1 ring-black/5"
              style={{ background: s.hex }} title={`${s.label} · ${s.hex}`} />
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-500">{palette.length} shades · ready to ship</p>
      </Card>

      <Card padded={false}>
        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
          <Icon name="arrow" size={14} style={{ color: 'var(--brand-600)' }} />
          <span className="text-sm font-semibold">Workflow</span>
        </div>
        <ol className="p-4 space-y-3">
          {[
            'Pick the format that matches your Figma setup',
            'Copy code or download the file',
            'Open Figma → run the matching importer',
            'Paint styles / variables appear in your file',
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-bold"
                style={{ background: 'var(--brand-500)' }}>{i + 1}</span>
              <span className="text-xs text-neutral-700 dark:text-neutral-300">{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card accent>
        <div className="flex items-center gap-2 mb-2">
          <Icon name="sparkle" size={14} style={{ color: 'var(--brand-600)' }} />
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--brand-700)' }}>Pro tip</span>
        </div>
        <Paragraph size="sm" className="!text-[13px]">
          For native Figma — no plugin install needed — choose <strong>Variables</strong>.
          It supports light/dark modes out of the box.
        </Paragraph>
      </Card>

      <Card padded={false}>
        <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 text-sm font-semibold">Resources</div>
        <ul className="p-2">
          {[
            { l: 'Tokens Studio docs',  i: 'tokens'  },
            { l: 'Figma Variables guide', i: 'palette' },
            { l: 'Plugin API reference', i: 'js' },
          ].map((r) => (
            <li key={r.l}>
              <a className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                <Icon name={r.i} size={12} style={{ color: 'var(--brand-600)' }} />
                {r.l}
                <Icon name="arrow" size={11} className="ml-auto opacity-50" />
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
}

function Tabs({ tab, setTab }) {
  return (
    <div className="flex gap-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-1 overflow-x-auto">
      {TABS.map((t) => {
        const active = t.id === tab;
        return (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition whitespace-nowrap"
            style={active
              ? { background: 'var(--brand-500)', color: 'white', boxShadow: '0 4px 14px -4px var(--brand-500)' }
              : { color: 'rgb(115 115 115)' }}
          >
            <Icon name={t.icon} size={14} /> {t.label}
          </button>
        );
      })}
    </div>
  );
}

function CodePanel({ meta, code, showBundle, onCopy, onDownload, onBundle }) {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-2">
        <span className="font-mono text-xs text-neutral-700 dark:text-neutral-200">{meta.filename}</span>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onDownload}><Icon name="download" /> Download</Button>
          <Button size="sm" variant="brand" onClick={onCopy}><Icon name="copy" /> Copy</Button>
          {showBundle && (
            <Button size="sm" variant="secondary" onClick={onBundle}>
              <Icon name="download" /> Plugin bundle
            </Button>
          )}
        </div>
      </div>
      <CodeBlock code={code} lang={meta.lang} maxHeight="32rem" className="rounded-none" />
    </Card>
  );
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
