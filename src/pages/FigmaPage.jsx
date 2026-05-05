import { useRef, useState } from 'react';
import { Button, Card, Icon, CodeBlock } from '../components/common';
import { useToast } from '../components/common/Toast.jsx';
import PageShell from './PageShell.jsx';
import { tokensStudio, figmaVariables, pluginCode, pluginManifest, FIGMA_LINKS } from '../features/Figma/figma-exporters.js';
import FigmaHero from '../features/Figma/_FigmaHero.jsx';
import FigmaFeatures from '../features/Figma/_FigmaFeatures.jsx';
import FigmaGuide, { FigmaFAQ } from '../features/Figma/_FigmaGuide.jsx';
import { slugify } from '../lib/color.js';

const TABS = [
  { id: 'tokens',    label: 'Tokens Studio',   icon: 'tokens',  hint: 'Drop into the Tokens Studio Figma plugin', filename: 'tokens.json',    lang: 'json', figmaLink: FIGMA_LINKS.tokens,    figmaCta: 'Open Tokens Studio in Figma' },
  { id: 'variables', label: 'Figma Variables', icon: 'palette', hint: 'Native Figma variables (REST API or import plugin)', filename: 'variables.json', lang: 'json', figmaLink: FIGMA_LINKS.variables, figmaCta: 'Get a Variables importer plugin' },
  { id: 'plugin',    label: 'Custom Plugin',   icon: 'js',      hint: 'Generate a real Figma plugin that creates Paint Styles', filename: 'code.ts', lang: 'ts', figmaLink: FIGMA_LINKS.pluginDocs, figmaCta: 'Read plugin manifest docs' },
];

export default function FigmaPage({ palette, name, onAction }) {
  const [tab, setTab] = useState('tokens');
  const { toast } = useToast();
  const meta = TABS.find((t) => t.id === tab);
  const formatsRef = useRef(null);

  const code = tab === 'tokens'    ? tokensStudio({ palette, name })
             : tab === 'variables' ? figmaVariables({ palette, name })
             : pluginCode({ palette, name });

  const copy = () => { navigator.clipboard.writeText(code); toast(`Copied ${meta.label}`); };
  const download = () => downloadFile(meta.filename, code);
  const scrollToFormats = () => formatsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <PageShell onAction={onAction}>
      <FigmaHero palette={palette} name={name} onScrollToFormats={scrollToFormats} />
      <FigmaFeatures />

      <section ref={formatsRef} className="space-y-5">
        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Pick your format</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Three integration paths · pick yours
          </h2>
        </div>

        <Tabs tab={tab} setTab={setTab} />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">
          <Card padded={false} className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-2">
              <span className="font-mono text-xs text-neutral-700 dark:text-neutral-200">{meta.filename}</span>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={download}><Icon name="download" /> Download</Button>
                <Button size="sm" variant="brand" onClick={copy}><Icon name="copy" /> Copy</Button>
                {tab === 'plugin' && (
                  <Button size="sm" variant="secondary" onClick={() => downloadBundle(palette, name)}>
                    <Icon name="download" /> Plugin bundle
                  </Button>
                )}
              </div>
            </div>
            <CodeBlock code={code} lang={meta.lang} maxHeight="28rem" className="rounded-none" />
            <a
              href={meta.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 border-t border-neutral-100 dark:border-neutral-800 bg-gradient-to-r from-neutral-900 to-neutral-800 dark:from-white dark:to-neutral-100 text-white dark:text-neutral-900 px-4 py-3 text-sm font-semibold transition hover:opacity-90"
            >
              <span className="flex items-center gap-2">
                <Icon name="arrow" size={14} /> {meta.figmaCta}
              </span>
              <span className="text-xs opacity-70">Opens figma.com →</span>
            </a>
          </Card>
          <FigmaGuide tab={tab} />
        </div>
      </section>

      <FigmaFAQ />
    </PageShell>
  );
}

function Tabs({ tab, setTab }) {
  return (
    <div className="flex gap-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-1 overflow-x-auto max-w-2xl mx-auto">
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

function downloadBundle(palette, name) {
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
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
