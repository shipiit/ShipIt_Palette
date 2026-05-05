import { useEffect, useMemo, useState } from 'react';
import { ToastProvider } from './components/common/Toast.jsx';
import Button from './components/common/Button.jsx';
import Tooltip from './components/common/Tooltip.jsx';
import Icon from './components/common/Icon.jsx';
import Logo from './components/common/Logo.jsx';
import Generator from './features/Generator/Generator.jsx';
import Hero from './features/Generator/Hero.jsx';
import Swatches from './features/Generator/Swatches.jsx';
import OutputTabs from './features/OutputTabs/OutputTabs.jsx';
import ShowcaseModal from './features/Showcase/ShowcaseModal.jsx';
import UsageModal from './features/Usage/UsageModal.jsx';
import PreviewModal from './features/Preview/PreviewModal.jsx';
import Footer from './features/Footer/Footer.jsx';
import ToolsModal from './features/Tools/ToolsModal.jsx';
import SemanticPaletteModal from './features/SemanticPalette/SemanticPaletteModal.jsx';
import BrandKitModal from './features/BrandKit/BrandKitModal.jsx';
import SavedLibraryModal from './features/SavedLibrary/SavedLibraryModal.jsx';
import ImageExtractorModal from './features/ImageExtractor/ImageExtractorModal.jsx';
import ColorBlindnessModal from './features/ColorBlindness/ColorBlindnessModal.jsx';
import PairSuggestionsModal from './features/PairSuggestions/PairSuggestionsModal.jsx';
import GradientBuilderModal from './features/GradientBuilder/GradientBuilderModal.jsx';
import TextOnShadeModal from './features/AccessibilityTools/TextOnShadeModal.jsx';
import ContrastMatrixModal from './features/AccessibilityTools/ContrastMatrixModal.jsx';
import { buildPalette, nearestColorName } from './lib/color.js';
import { useTheme } from './theme/ThemeProvider.jsx';

const randomHex = () =>
  '#' + Array.from({ length: 6 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');

export default function App() {
  const { theme, toggle } = useTheme();
  const [state, setState] = useState(() => {
    const fromHash = typeof window !== 'undefined' && window.location.hash.replace('#', '');
    const valid = fromHash && /^[0-9a-fA-F]{6}$/.test(fromHash);
    return {
      baseHex: valid ? `#${fromHash.toLowerCase()}` : '#82ea41',
      algorithm: 'Tailwind CSS',
      namingPattern: '50,100…900',
      count: 11,
      contrastShift: 0,
    };
  });
  const [showUsage, setShowUsage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewScene, setPreviewScene] = useState('playground');
  const [showUI, setShowUI] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  const name = useMemo(() => nearestColorName(state.baseHex), [state.baseHex]);
  const palette = useMemo(() => buildPalette({ ...state, name }), [state, name]);

  useEffect(() => {
    const root = document.documentElement;
    palette.forEach((s) => root.style.setProperty(`--brand-${s.label}`, s.hex));
    const lookup = (k, i) => palette.find((s) => s.label === k)?.hex || palette[i]?.hex;
    root.style.setProperty('--brand-100', lookup('100', Math.floor(palette.length * 0.1)));
    root.style.setProperty('--brand-200', lookup('200', Math.floor(palette.length * 0.2)));
    root.style.setProperty('--brand-300', lookup('300', Math.floor(palette.length * 0.3)));
    root.style.setProperty('--brand-400', lookup('400', Math.floor(palette.length * 0.4)));
    root.style.setProperty('--brand-500', lookup('500', Math.floor(palette.length * 0.5)));
    root.style.setProperty('--brand-600', lookup('600', Math.floor(palette.length * 0.6)));
    root.style.setProperty('--brand-700', lookup('700', Math.floor(palette.length * 0.7)));
    root.style.setProperty('--brand-900', lookup('900', palette.length - 2));
    root.style.setProperty('--brand-950', lookup('950', palette.length - 1));
  }, [palette]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.code === 'Space' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        setState((s) => ({ ...s, baseHex: randomHex() }));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const setBaseHex = (hex) => setState((s) => ({ ...s, baseHex: hex }));

  return (
    <ToastProvider>
      <div className="min-h-screen">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Logo size={40} />
          <div className="flex items-center gap-2">
            <Tooltip content="Random color (Spacebar)">
              <Button variant="ghost" onClick={() => setState((s) => ({ ...s, baseHex: randomHex() }))}>
                <Icon name="shuffle" />
              </Button>
            </Tooltip>
            <Tooltip content={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
              <Button variant="ghost" onClick={toggle}>
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
              </Button>
            </Tooltip>
            <Button variant="secondary" onClick={() => setShowTools(true)}>
              <Icon name="tokens" /> Tools
            </Button>
            <Button variant="secondary" onClick={() => { setPreviewScene('playground'); setShowPreview(true); }}>
              <Icon name="js" /> Playground
            </Button>
            <Button variant="secondary" onClick={() => setShowUI(true)}>
              <Icon name="palette" /> UI Showcase
            </Button>
            <Button variant="secondary" onClick={() => { setPreviewScene('landing'); setShowPreview(true); }}>
              <Icon name="sparkle" /> Preview
            </Button>
            <Button variant="brand" onClick={() => setShowUsage(true)}>
              How to use <Icon name="arrow" />
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-6 px-6 pb-20">
          <Hero
            baseHex={state.baseHex}
            name={name}
            palette={palette}
            count={state.count}
            onRandom={() => setBaseHex(randomHex())}
            onSetHex={setBaseHex}
          />
          <Generator state={state} setState={setState} />
          <Swatches palette={palette} name={name} />
          <OutputTabs palette={palette} name={name} onTestInUI={() => setShowUI(true)} onPreview={() => { setPreviewScene('landing'); setShowPreview(true); }} />
          <Footer onAction={(a) => {
            if (a === 'showcase') setShowUI(true);
            else if (a === 'preview') { setPreviewScene('landing'); setShowPreview(true); }
            else if (a === 'usage') setShowUsage(true);
          }} />
        </main>

        <UsageModal open={showUsage} onClose={() => setShowUsage(false)} palette={palette} name={name} format="HEX" />
        <PreviewModal open={showPreview} onClose={() => setShowPreview(false)} initialScene={previewScene} />
        <ShowcaseModal open={showUI} onClose={() => setShowUI(false)} />
        <ToolsModal open={showTools} onClose={() => setShowTools(false)} onPick={setActiveTool} />

        <SemanticPaletteModal  open={activeTool === 'semantic'}  onClose={() => setActiveTool(null)} baseHex={state.baseHex} />
        <BrandKitModal         open={activeTool === 'brandkit'}  onClose={() => setActiveTool(null)} baseHex={state.baseHex} />
        <SavedLibraryModal     open={activeTool === 'saved'}     onClose={() => setActiveTool(null)} currentPalette={palette} currentName={name} currentBaseHex={state.baseHex} onLoad={setBaseHex} />
        <ImageExtractorModal   open={activeTool === 'image'}     onClose={() => setActiveTool(null)} onPick={setBaseHex} />
        <ColorBlindnessModal   open={activeTool === 'blindness'} onClose={() => setActiveTool(null)} palette={palette} />
        <PairSuggestionsModal  open={activeTool === 'pairs'}     onClose={() => setActiveTool(null)} baseHex={state.baseHex} onPick={setBaseHex} />
        <GradientBuilderModal  open={activeTool === 'gradient'}  onClose={() => setActiveTool(null)} fromHex={palette[2]?.hex || state.baseHex} toHex={palette[8]?.hex || state.baseHex} />
        <TextOnShadeModal      open={activeTool === 'textcolor'} onClose={() => setActiveTool(null)} palette={palette} />
        <ContrastMatrixModal   open={activeTool === 'matrix'}    onClose={() => setActiveTool(null)} palette={palette} />
      </div>
    </ToastProvider>
  );
}
