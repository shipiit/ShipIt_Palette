import { Card, Badge, Icon, Paragraph } from '../../components/common';

const GUIDES = {
  tokens: {
    title: 'Tokens Studio · Step by step',
    badge: 'Most popular · 200k+ users',
    steps: [
      { title: 'Install Tokens Studio',
        body: 'In Figma: Plugins → Browse all plugins → search "Tokens Studio for Figma" → Install. Free, takes 10s.' },
      { title: 'Open the plugin',
        body: 'Plugins → Tokens Studio for Figma → New file. The plugin panel opens on the right.' },
      { title: 'Paste the JSON',
        body: 'Tools → Import → JSON → paste the Tokens Studio code from the right panel. The token set appears in the sidebar.' },
      { title: 'Apply to your designs',
        body: 'Select any layer → in Tokens Studio panel, click a color token. The fill auto-attaches and stays in sync.' },
    ],
    extras: [
      'Works with light/dark themes via $themes',
      'Supports token aliases ({primary.500} → {gray.50})',
      'Optional GitHub sync to share with team',
    ],
  },
  variables: {
    title: 'Figma Variables · Step by step',
    badge: 'Native · No plugin needed',
    steps: [
      { title: 'Open variables panel',
        body: 'In your Figma file: right-click on canvas → Show variables. Or use the Local variables button in the right sidebar.' },
      { title: 'Install an importer plugin',
        body: 'Plugins → Browse → "Variables Import Export" or "JSON to Variables". One-time install, free.' },
      { title: 'Paste the JSON',
        body: 'Run the plugin → paste the Variables format JSON → click Import. Variables appear in the panel grouped by collection.' },
      { title: 'Use as fills / strokes',
        body: 'Select a layer → fill / stroke → click the variable icon → pick from the imported palette. Updates everywhere when you swap modes.' },
    ],
    extras: [
      'Multi-mode support (light / dark / brand A / brand B)',
      'Compatible with Auto Layout & component variants',
      'Exportable via the Figma REST API for CI/CD',
    ],
  },
  plugin: {
    title: 'Custom Plugin · Step by step',
    badge: 'Power user · Full control',
    steps: [
      { title: 'Download the plugin bundle',
        body: 'Click "Plugin bundle" in the right panel. You get a single info file with manifest + code.ts contents.' },
      { title: 'Save as 2 files',
        body: 'Create a folder. Save the manifest section as manifest.json and the code section as code.ts (or code.js after compiling).' },
      { title: 'Import into Figma',
        body: 'Figma menu → Plugins → Development → Import plugin from manifest… → pick your manifest.json. The plugin appears in your dev plugins.' },
      { title: 'Run it',
        body: 'Plugins → Development → "Palette Importer". The plugin instantly creates a Paint Style for every shade. Done.' },
    ],
    extras: [
      'Creates real Paint Styles (visible in the Color Styles library)',
      'Editable — fork the code.ts to change naming conventions or add gradient styles',
      'Works offline — no network calls',
    ],
  },
};

export default function FigmaGuide({ tab }) {
  const g = GUIDES[tab];
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800 bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
            style={{ background: 'var(--brand-500)' }}
          >
            <Icon name="sparkle" size={14} />
          </span>
          <div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{g.title}</h4>
            <Badge variant="brand" className="mt-1">{g.badge}</Badge>
          </div>
        </div>
      </div>

      <ol className="px-5 py-4 space-y-3">
        {g.steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3 group">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition group-hover:scale-110"
              style={{
                background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)',
                color: 'var(--brand-700)',
              }}
            >{i + 1}</span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{s.title}</div>
              <Paragraph size="sm" className="!mt-0.5 !text-[13px]">{s.body}</Paragraph>
            </div>
          </li>
        ))}
      </ol>

      <div className="border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/40 px-5 py-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Extras</div>
        <ul className="space-y-1">
          {g.extras.map((x) => (
            <li key={x} className="flex items-start gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
              <Icon name="check" size={11} style={{ color: 'var(--brand-500)' }} className="mt-0.5 shrink-0" strokeWidth={2.4} />
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

const FAQS = [
  ['Will it overwrite my existing styles?', 'No — Tokens Studio and Variables are additive. The custom plugin creates new Paint Styles, you can delete or rename them anytime.'],
  ['Can I edit colors after importing?', 'Yes. Once imported, the colors live inside Figma — change them there and the changes propagate to attached layers.'],
  ['Does it support light + dark modes?', 'Tokens Studio: yes via $themes. Figma Variables: yes via modes. Custom plugin: creates one set of Paint Styles per run; run twice with different palettes for two themes.'],
  ['Is my palette uploaded anywhere?', 'No. Everything is generated client-side and stays on your machine.'],
];

export function FigmaFAQ() {
  return (
    <Card padded={false} className="overflow-hidden">
      <div className="px-5 py-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
        <Icon name="search" size={14} style={{ color: 'var(--brand-600)' }} />
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Frequently asked</span>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {FAQS.map(([q, a], i) => (
          <details key={i} className="group">
            <summary className="cursor-pointer flex items-center justify-between px-5 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
              {q}
              <span className="text-xl transition group-open:rotate-45" style={{ color: 'var(--brand-500)' }}>+</span>
            </summary>
            <Paragraph size="sm" className="!text-[13px] px-5 pb-4 -mt-1">{a}</Paragraph>
          </details>
        ))}
      </div>
    </Card>
  );
}
