import Modal from '../../components/common/Modal.jsx';
import Icon from '../../components/common/Icon.jsx';
import Badge from '../../components/common/Badge.jsx';

const TOOLS = [
  // Palette
  { id: 'semantic',     icon: 'palette',  title: 'Semantic Palette',  body: 'Auto-generate primary / success / warning / danger / neutral scales from your color.', group: 'Palette' },
  { id: 'brandkit',     icon: 'tokens',   title: 'Brand Kit',         body: 'Pick three colors and generate full scales for primary + secondary + tertiary.', group: 'Palette' },
  { id: 'saved',        icon: 'sparkle',  title: 'Saved Library',     body: 'Save & restore palettes with custom names. Export / import as JSON.', group: 'Palette' },

  // Color Tools
  { id: 'image',        icon: 'svg',      title: 'Image Extractor',   body: 'Drop an image and pull out its 6 dominant colors automatically.', group: 'Color Tools' },
  { id: 'blindness',    icon: 'sun',      title: 'Color Blindness',   body: 'Preview your palette as Deuteranopia / Protanopia / Tritanopia.', group: 'Color Tools' },
  { id: 'pairs',        icon: 'shuffle',  title: 'Pair Suggestions',  body: 'Color-theory pairings: complementary, analogous, triadic, split-comp, tetradic.', group: 'Color Tools' },
  { id: 'gradient',     icon: 'arrow',    title: 'Gradient Builder',  body: 'Combine two shades into a gradient. Export as CSS, Tailwind v3 / v4, SCSS.', group: 'Color Tools' },
  { id: 'compare',      icon: 'json',     title: 'Compare Mode',      body: 'Pick two base colors and compare their palettes side-by-side, with deltas.', group: 'Color Tools', badge: 'New' },
  { id: 'custom',       icon: 'css',      title: 'Custom Algorithm',  body: 'Drag 11 sliders to design your own lightness curve.', group: 'Color Tools', badge: 'New' },
  { id: 'ai',           icon: 'sparkle',  title: 'AI Naming',         body: 'Type a vibe — “forest cabin”, “neon arcade” — and get suggested colors.', group: 'Color Tools', badge: 'New' },

  // Accessibility
  { id: 'textcolor',    icon: 'check',    title: 'Auto Text Color',   body: 'Find the most readable text color for every shade in your palette.', group: 'Accessibility' },
  { id: 'matrix',       icon: 'tokens',   title: 'Contrast Matrix',   body: 'Grid of every text-on-background combination, color-coded by WCAG / APCA.', group: 'Accessibility' },

  // Export
  { id: 'figma',        icon: 'sparkle',  title: 'Figma Export',      body: 'Tokens Studio JSON · Figma Variables · custom Figma plugin generator.', group: 'Export' },
  { id: 'tailwind',     icon: 'tailwind', title: 'Tailwind v4 Install', body: 'Guided 3-step install with live @theme block + example usage.', group: 'Export', badge: 'New' },
  { id: 'og',           icon: 'svg',      title: 'OG Image',          body: 'Generate a beautiful 1200×630 PNG for social sharing.', group: 'Export', badge: 'New' },
  { id: 'specsheet',    icon: 'json',     title: 'Spec Sheet',        body: 'Printable / PDF-ready palette spec sheet with hex / RGB / HSL / WCAG.', group: 'Export', badge: 'New' },
  { id: 'embed',        icon: 'css',      title: 'Embed Code',        body: 'Generate an <iframe> snippet for blogs and docs.', group: 'Export', badge: 'New' },
  { id: 'history',      icon: 'shuffle',  title: 'History · Undo',    body: 'Cmd+Z support · visual timeline of every color change.', group: 'Export', badge: 'New' },
];

const GROUPS = ['Palette', 'Color Tools', 'Accessibility', 'Export'];

export default function ToolsModal({ open, onClose, onPick }) {
  return (
    <Modal open={open} onClose={onClose} title="Tools — pick a feature to launch" size="xl">
      <div className="space-y-6">
        {GROUPS.map((g) => {
          const items = TOOLS.filter((t) => t.group === g);
          return (
            <div key={g}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500 mb-3">{g}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { onPick(t.id); onClose(); }}
                    className="group flex flex-col items-start gap-2 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 text-left transition hover:-translate-y-0.5"
                    style={{ boxShadow: '0 4px 24px -16px var(--brand-500)' }}
                  >
                    <span className="flex items-center gap-2 w-full">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-white transition group-hover:scale-110"
                        style={{ background: 'var(--brand-500)' }}
                      >
                        <Icon name={t.icon} size={16} />
                      </span>
                      {t.badge && <Badge variant="brand" className="ml-auto">{t.badge}</Badge>}
                    </span>
                    <div className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">{t.title}</div>
                    <p className="text-xs text-neutral-500 leading-relaxed">{t.body}</p>
                    <span className="mt-1 text-xs font-semibold inline-flex items-center gap-1" style={{ color: 'var(--brand-600)' }}>
                      Open <Icon name="arrow" size={11} />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
