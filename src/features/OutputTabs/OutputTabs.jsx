import { useState } from 'react';
import { EXPORTERS } from '../../lib/exporters.js';
import { FORMAT_META, FORMAT_KEYS } from './format-meta.js';
import { useToast } from '../../components/common/Toast.jsx';
import Button from '../../components/common/Button.jsx';
import Icon from '../../components/common/Icon.jsx';
import CodeBlock from '../../components/common/CodeBlock.jsx';
import FormatPicker from './FormatPicker.jsx';

const COLOR_FORMATS = ['HEX', 'RGBA', 'HSL', 'OKLCH'];

export default function OutputTabs({ palette, name, onTestInUI, onPreview }) {
  const [active, setActive] = useState('CSS');
  const [colorFormat, setColorFormat] = useState('HEX');
  const { toast } = useToast();
  const meta = FORMAT_META[active];
  const code = EXPORTERS[active]({ palette, name, format: colorFormat });

  const copyAll = () => { navigator.clipboard.writeText(code); toast(`Copied ${meta.label}`); };
  const copyEverything = () => {
    const blob = FORMAT_KEYS.map((k) => `/* === ${FORMAT_META[k].label} (${colorFormat}) === */\n${EXPORTERS[k]({ palette, name, format: colorFormat })}`).join('\n\n');
    navigator.clipboard.writeText(blob);
    toast('Copied ALL formats');
  };
  const download = () => {
    const ext = { CSS: 'css', SCSS: 'scss', Less: 'less', 'Sass Map': 'scss', JSON: 'json', JS: 'js', TS: 'ts', Swift: 'swift', Android: 'xml', Flutter: 'dart', SVG: 'svg', Tailwind: 'js', 'Tailwind 4': 'css', Tokens: 'json' }[active] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${name.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
    a.click(); URL.revokeObjectURL(url);
    toast(`Downloaded ${a.download}`);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
      <div className="flex flex-wrap items-end gap-3 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3">
        <div className="flex-1 min-w-[260px]">
          <FormatPicker value={active} onChange={setActive} />
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Color Notation</label>
          <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-1">
            {COLOR_FORMATS.map((f) => (
              <button
                key={f}
                onClick={() => setColorFormat(f)}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold transition"
                style={colorFormat === f
                  ? { background: 'var(--brand-500)', color: 'white' }
                  : { color: 'rgb(115 115 115)' }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Try it</label>
          <div className="flex gap-2">
            {onTestInUI && (
              <Button size="sm" variant="outline" onClick={onTestInUI}>
                <Icon name="palette" /> Test in UI
              </Button>
            )}
            {onPreview && (
              <Button size="sm" variant="brand" onClick={onPreview}>
                <Icon name="sparkle" /> Preview
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="relative p-3">
        <CodeBlock code={code} format={active} maxHeight="26rem" />
        <div className="absolute right-5 top-5 flex gap-2">
          <Button size="sm" variant="secondary" onClick={download}><Icon name="download" /> Download</Button>
          <Button size="sm" variant="secondary" onClick={copyAll}><Icon name="copy" /> Copy</Button>
          <Button size="sm" variant="brand" onClick={copyEverything}><Icon name="sparkle" /> Copy ALL</Button>
        </div>
      </div>

      <p className="border-t border-neutral-100 dark:border-neutral-800 px-4 py-2 text-center text-xs text-neutral-500">
        Hit <kbd className="rounded bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 font-mono">Space</kbd> for a random color · drag any slider to remix
      </p>
    </div>
  );
}
