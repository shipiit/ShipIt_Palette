import { useState, useEffect } from 'react';
import Modal from '../../components/common/Modal.jsx';
import Icon from '../../components/common/Icon.jsx';
import Button from '../../components/common/Button.jsx';
import { useToast } from '../../components/common/Toast.jsx';
import LandingPreview from './LandingPreview.jsx';
import DashboardPreview from './DashboardPreview.jsx';
import PricingPreview from './PricingPreview.jsx';
import AnalyticsPreview from './AnalyticsPreview.jsx';
import MobilePreview from './MobilePreview.jsx';
import EmailPreview from './EmailPreview.jsx';
import MarketingCardPreview from './MarketingCardPreview.jsx';
import CodeEditorPreview from './CodeEditorPreview.jsx';
import PlaygroundPreview from './PlaygroundPreview.jsx';
import { SCENE_SNIPPETS, HAS_SNIPPET } from './_scene-snippets.js';

const SCENES = [
  { id: 'playground', label: 'Playground',  icon: 'sparkle' },
  { id: 'landing',    label: 'Landing',     icon: 'palette' },
  { id: 'dashboard',  label: 'Dashboard',   icon: 'tokens' },
  { id: 'analytics',  label: 'Analytics',   icon: 'json' },
  { id: 'pricing',    label: 'Pricing',     icon: 'css' },
  { id: 'mobile',     label: 'Mobile App',  icon: 'flutter' },
  { id: 'email',      label: 'Email',       icon: 'arrow' },
  { id: 'marketing',  label: 'Social Cards', icon: 'svg' },
  { id: 'editor',     label: 'Code Editor', icon: 'js' },
];

const SCENE_MAP = {
  playground: PlaygroundPreview, landing: LandingPreview, dashboard: DashboardPreview,
  analytics: AnalyticsPreview, pricing: PricingPreview, mobile: MobilePreview,
  email: EmailPreview, marketing: MarketingCardPreview, editor: CodeEditorPreview,
};

export default function PreviewModal({ open, onClose, initialScene = 'playground' }) {
  const [scene, setScene] = useState(initialScene);
  const [theme, setTheme] = useState('light');
  const [playgroundCode, setPlaygroundCode] = useState(null);
  const [playgroundLabel, setPlaygroundLabel] = useState('');
  const { toast } = useToast();

  useEffect(() => { if (open) setScene(initialScene); }, [open, initialScene]);

  if (!open) return null;
  const Scene = SCENE_MAP[scene];
  const sceneMeta = SCENES.find((s) => s.id === scene);

  const sendToPlayground = () => {
    setPlaygroundCode(SCENE_SNIPPETS[scene]);
    setPlaygroundLabel(sceneMeta?.label || 'Custom');
    setScene('playground');
    toast(`Loaded ${sceneMeta?.label} into Playground`);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(SCENE_SNIPPETS[scene]);
    toast('Copied HTML to clipboard');
  };

  return (
    <Modal open={open} onClose={onClose} title="Live Preview — your color in real UI" size="full">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 overflow-x-auto">
          {SCENES.map((s) => (
            <button
              key={s.id}
              onClick={() => setScene(s.id)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition whitespace-nowrap"
              style={scene === s.id
                ? { background: 'var(--brand-500)', color: 'white' }
                : { color: 'rgb(115 115 115)' }}
            >
              <Icon name={s.icon} size={14} /> {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {HAS_SNIPPET(scene) && (
            <>
              <Button size="sm" variant="outline" onClick={copyCode}>
                <Icon name="copy" /> Copy code
              </Button>
              <Button size="sm" variant="brand" onClick={sendToPlayground}>
                <Icon name="arrow" /> Test in Playground
              </Button>
            </>
          )}
          <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1">
            {['light', 'dark'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition capitalize"
                style={theme === t
                  ? { background: 'var(--brand-500)', color: 'white' }
                  : { color: 'rgb(115 115 115)' }}
              >
                <Icon name={t === 'dark' ? 'moon' : 'sun'} size={14} /> {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`overflow-hidden rounded-2xl border ${theme === 'dark' ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-neutral-50'}`}>
        <div className={`flex items-center gap-1.5 border-b px-4 py-2 ${theme === 'dark' ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className={`ml-3 text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>preview.shipit-palette.app · {scene}</span>
        </div>
        <div className={theme === 'dark' ? 'dark' : ''}>
          {scene === 'playground'
            ? <PlaygroundPreview theme={theme} initialCode={playgroundCode} initialLabel={playgroundLabel} />
            : <Scene theme={theme} />}
        </div>
      </div>
    </Modal>
  );
}
