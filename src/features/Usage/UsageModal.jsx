import { useEffect, useState } from 'react';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import CodeBlock from '../../components/common/CodeBlock.jsx';
import { useToast } from '../../components/common/Toast.jsx';
import { buildSnippets } from './usage-snippets.js';

const ICONS = {
  next:            'sparkle',
  'next-darkmode': 'moon',
  'react-vite':    'js',
  'tailwind-v3':   'tailwind',
  'tailwind-v4':   'tailwind',
  'plain-html':    'css',
  'plain-js':      'js',
};

export default function UsageModal({ open, onClose, palette, name, format }) {
  const snippets = buildSnippets({ palette, name, format });
  const [activeId, setActiveId] = useState(snippets[0].id);
  const active = snippets.find((s) => s.id === activeId) || snippets[0];
  const [variantId, setVariantId] = useState(active.variants?.[0]?.id || null);
  const { toast } = useToast();

  useEffect(() => {
    setVariantId(active.variants?.[0]?.id || null);
    // only reset when the parent tab changes — `active.variants` is a fresh array on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const variant = active.variants?.find((v) => v.id === variantId) || active.variants?.[0];
  const files = variant?.files || active.files || [];

  const copy = (code, label) => { navigator.clipboard.writeText(code); toast(`Copied ${label}`); };
  const copyAllFiles = () => {
    const blob = files.map((f) => `/* === ${f.name} === */\n${f.code}`).join('\n\n');
    navigator.clipboard.writeText(blob);
    toast(`Copied all files`);
  };

  return (
    <Modal open={open} onClose={onClose} title={`How to use "${name}" in your project`} size="full">
      <Tabs snippets={snippets} activeId={activeId} setActiveId={setActiveId} />

      <section className="mt-4 space-y-3 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {active.title}{variant ? ` · ${variant.label}` : ''}
            </h4>
            <p className="text-sm text-neutral-500 mt-0.5">{active.hint}</p>
          </div>
          <Button size="sm" variant="brand" onClick={copyAllFiles}>
            <Icon name="copy" /> Copy all files
          </Button>
        </div>

        {active.variants && (
          <SubTabs variants={active.variants} activeId={variantId} setActiveId={setVariantId} />
        )}

        {files.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3 py-1.5">
              <span className="font-mono text-xs text-neutral-700 dark:text-neutral-200 truncate">{f.name}</span>
              <button
                onClick={() => copy(f.code, f.name)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
                style={{ color: 'var(--brand-600)' }}
              >
                <Icon name="copy" size={12} /> Copy
              </button>
            </div>
            <CodeBlock code={f.code} lang={f.lang} maxHeight="20rem" className="rounded-none" />
          </div>
        ))}
      </section>
    </Modal>
  );
}

function Tabs({ snippets, activeId, setActiveId }) {
  return (
    <div className="-mx-1 overflow-x-auto pb-1">
      <div className="flex gap-1 min-w-max p-1 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
        {snippets.map((s) => {
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition whitespace-nowrap"
              style={isActive
                ? { background: 'var(--brand-500)', color: 'white', boxShadow: '0 4px 14px -4px var(--brand-500)' }
                : { color: 'rgb(115 115 115)' }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-md"
                style={{
                  background: isActive ? 'rgba(255,255,255,.22)' : 'color-mix(in srgb, var(--brand-500) 16%, transparent)',
                  color: isActive ? 'white' : 'var(--brand-600)',
                }}
              >
                <Icon name={ICONS[s.id] || 'sparkle'} size={12} />
              </span>
              {s.title}
              {s.variants && (
                <span
                  className="ml-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                  style={isActive
                    ? { background: 'rgba(255,255,255,.25)', color: 'white' }
                    : { background: 'color-mix(in srgb, var(--brand-500) 16%, transparent)', color: 'var(--brand-700)' }}
                >
                  {s.variants.length}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SubTabs({ variants, activeId, setActiveId }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 p-1">
      {variants.map((v) => {
        const isActive = v.id === activeId;
        return (
          <button
            key={v.id}
            onClick={() => setActiveId(v.id)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap"
            style={isActive
              ? { background: 'var(--brand-600)', color: 'white' }
              : { color: 'rgb(82 82 82)' }}
          >
            <Icon name={v.icon || 'sparkle'} size={11} />
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
