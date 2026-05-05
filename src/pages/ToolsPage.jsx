import { useState } from 'react';
import { Card, Badge, Icon, Button } from '../components/common';
import PageShell from './PageShell.jsx';
import AnimatedHero from './_AnimatedHero.jsx';
import ToolIcon from './_ToolIcon.jsx';
import { Link, navigate } from '../router.jsx';

const TOOLS = [
  { id: 'semantic',  title: 'Semantic Palette',  body: 'Auto-generate primary / success / warning / danger / neutral scales from your color.', group: 'Palette' },
  { id: 'brandkit',  title: 'Brand Kit',         body: 'Pick three colors, generate full scales for primary + secondary + tertiary.', group: 'Palette' },
  { id: 'saved',     title: 'Saved Library',     body: 'Save & restore palettes with custom names. Export / import as JSON.', group: 'Palette' },
  { id: 'compare',   title: 'Compare Mode',      body: 'Pick two base colors and compare their palettes side-by-side, with deltas.', group: 'Palette', badge: 'New' },
  { id: 'custom',    title: 'Custom Algorithm',  body: 'Drag 11 sliders to design your own lightness curve.', group: 'Palette', badge: 'New' },
  { id: 'ai',        title: 'AI Naming',         body: 'Type a vibe — “forest cabin”, “neon arcade” — and get suggested colors.', group: 'Palette', badge: 'New' },
  { id: 'image',     title: 'Image Extractor',   body: 'Drop an image and pull out its 6 dominant colors automatically.', group: 'Color Tools' },
  { id: 'blindness', title: 'Color Blindness',   body: 'Preview your palette as Deuteranopia / Protanopia / Tritanopia.', group: 'Color Tools' },
  { id: 'pairs',     title: 'Pair Suggestions',  body: 'Color-theory pairings: complementary, analogous, triadic, split-comp, tetradic.', group: 'Color Tools' },
  { id: 'gradient',  title: 'Gradient Builder',  body: 'Combine two shades into a gradient. Export as CSS, Tailwind v3 / v4, SCSS.', group: 'Color Tools' },
  { id: 'textcolor', title: 'Auto Text Color',   body: 'Find the most readable text color for every shade in your palette.', group: 'Accessibility' },
  { id: 'matrix',    title: 'Contrast Matrix',   body: 'Grid of every text-on-background combination, color-coded by WCAG / APCA.', group: 'Accessibility' },
  { id: 'figma',     title: 'Figma Export',      body: 'Tokens Studio JSON · Figma Variables · custom Figma plugin generator.', group: 'Export', featured: true },
  { id: 'tailwind',  title: 'Tailwind v4 Install', body: 'Guided 3-step install with live @theme block + example usage.', group: 'Export' },
  { id: 'og',        title: 'OG Image',          body: 'Generate a beautiful 1200×630 PNG for social sharing.', group: 'Export' },
  { id: 'specsheet', title: 'Spec Sheet',        body: 'Printable / PDF-ready palette spec sheet with hex / RGB / HSL / WCAG.', group: 'Export' },
  { id: 'embed',     title: 'Embed Code',        body: 'Generate an <iframe> snippet for blogs and docs.', group: 'Export' },
  { id: 'history',   title: 'History · Undo',    body: 'Cmd+Z support · visual timeline of every color change.', group: 'Export' },
];

const GROUPS = [
  { name: 'All',           icon: 'sparkle', body: 'Everything in one place.' },
  { name: 'Palette',       icon: 'palette', body: 'Generate, save, compare, customize.' },
  { name: 'Color Tools',   icon: 'svg',     body: 'Theory, vision, gradients, extraction.' },
  { name: 'Accessibility', icon: 'check',   body: 'WCAG, APCA, readable text, contrast matrices.' },
  { name: 'Export',        icon: 'arrow',   body: 'Figma, Tailwind, social, embeds.' },
];

export default function ToolsPage({ onPickTool, onAction }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? TOOLS : TOOLS.filter((t) => t.group === filter);

  const launch = (id) => { onPickTool(id); navigate('/'); };
  const groupCount = (g) => (g === 'All' ? TOOLS.length : TOOLS.filter((t) => t.group === g).length);

  const groupsToRender = filter === 'All'
    ? GROUPS.filter((g) => g.name !== 'All')
    : GROUPS.filter((g) => g.name === filter);

  return (
    <PageShell onAction={onAction}>
      <Hero />
      <FilterTabs filter={filter} setFilter={setFilter} count={groupCount} />

      {groupsToRender.map((g) => {
        const items = filtered.filter((t) => t.group === g.name);
        if (items.length === 0) return null;
        return (
          <section key={g.name} id={g.name.toLowerCase().replace(/\s+/g, '-')} className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-white"
                style={{ background: 'var(--brand-500)' }}
              >
                <Icon name={g.icon} size={16} />
              </span>
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{g.name}</h2>
                <p className="text-sm text-neutral-500">{g.body}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((t) => (
                <ToolCard key={t.id} tool={t} onLaunch={() => launch(t.id)} />
              ))}
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 px-6 py-12 md:px-12 md:py-16 text-center">
      <div className="absolute -top-12 left-1/4 h-64 w-64 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: 'var(--brand-300)' }} />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: 'var(--brand-500)', animationDelay: '1s' }} />
      <div className="relative">
        <AnimatedHero />
        <Badge variant="brand" className="mb-4"><Icon name="sparkle" size={11} /> {TOOLS.length} tools · all free</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 max-w-2xl mx-auto">
          Everything you need to ship a design system.
        </h1>
        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Tools for designers and developers — generate palettes, check accessibility, export to any platform.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button variant="brand" onClick={() => navigate('/')}>
            <Icon name="arrow" /> Open the Studio
          </Button>
          <Link to="/figma" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 transition">
            <Icon name="sparkle" /> Figma integration
          </Link>
        </div>
      </div>
    </section>
  );
}

function FilterTabs({ filter, setFilter, count }) {
  return (
    <div className="sticky top-[68px] z-20 -mx-2 sm:-mx-0">
      <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur p-1.5 shadow-sm">
        {GROUPS.map((g) => {
          const active = g.name === filter;
          const n = count(g.name);
          return (
            <button
              key={g.name}
              onClick={() => setFilter(g.name)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition whitespace-nowrap"
              style={active
                ? { background: 'var(--brand-500)', color: 'white', boxShadow: '0 4px 14px -4px var(--brand-500)' }
                : { color: 'rgb(115 115 115)' }}
            >
              <Icon name={g.icon} size={13} />
              {g.name}
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                style={active
                  ? { background: 'rgba(255,255,255,.25)', color: 'white' }
                  : { background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)' }}
              >{n}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToolCard({ tool, onLaunch }) {
  return (
    <button
      onClick={onLaunch}
      className="group flex flex-col items-start gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 text-left transition hover:-translate-y-1"
      style={tool.featured
        ? { boxShadow: '0 12px 40px -16px var(--brand-500)', borderColor: 'var(--brand-500)' }
        : { boxShadow: '0 4px 24px -16px var(--brand-500)' }}
    >
      <div className="flex items-center justify-between w-full">
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md transition group-hover:scale-110 group-hover:rotate-3"
          style={{ background: tool.featured ? 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' : 'linear-gradient(135deg, var(--brand-400), var(--brand-600))' }}
        >
          <ToolIcon id={tool.id} size={22} />
        </span>
        {tool.badge && <Badge variant="brand">{tool.badge}</Badge>}
        {tool.featured && <Badge variant="brand">★ Featured</Badge>}
      </div>
      <div>
        <h3 className="font-semibold text-base text-neutral-900 dark:text-neutral-100">{tool.title}</h3>
        <p className="mt-1 text-sm text-neutral-500 leading-relaxed">{tool.body}</p>
      </div>
      <span className="text-xs font-semibold inline-flex items-center gap-1" style={{ color: 'var(--brand-600)' }}>
        Launch <Icon name="arrow" size={11} />
      </span>
    </button>
  );
}
