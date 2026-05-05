import { useEffect, useMemo, useState } from 'react';
import { ToastProvider } from './components/common/Toast.jsx';
import Generator from './features/Generator/Generator.jsx';
import Hero from './features/Generator/Hero.jsx';
import Swatches from './features/Generator/Swatches.jsx';
import OutputTabs from './features/OutputTabs/OutputTabs.jsx';
import ShowcaseModal from './features/Showcase/ShowcaseModal.jsx';
import UsageModal from './features/Usage/UsageModal.jsx';
import PreviewModal from './features/Preview/PreviewModal.jsx';
import Footer from './features/Footer/Footer.jsx';
import Header from './features/Header/Header.jsx';
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
import FigmaExportModal from './features/Figma/FigmaExportModal.jsx';
import CompareModal from './features/Compare/CompareModal.jsx';
import CustomAlgorithmModal from './features/CustomAlgorithm/CustomAlgorithmModal.jsx';
import AINamingModal from './features/AINaming/AINamingModal.jsx';
import OgImageModal from './features/OgImage/OgImageModal.jsx';
import SpecSheetModal from './features/SpecSheet/SpecSheetModal.jsx';
import EmbedModal from './features/Embed/EmbedModal.jsx';
import TailwindInstallModal from './features/TailwindInstall/TailwindInstallModal.jsx';
import HistoryModal from './features/History/HistoryModal.jsx';
import { useHistory } from './features/History/useHistory.js';
import { buildPalette, nearestColorName } from './lib/color.js';
import { useTheme } from './theme/ThemeProvider.jsx';
import { usePath } from './router.jsx';
import FigmaPage from './pages/FigmaPage.jsx';
import ToolsPage from './pages/ToolsPage.jsx';

const randomHex = () =>
  '#' + Array.from({ length: 6 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');

export default function App() {
  const path = usePath();
  const { theme, toggle } = useTheme();
  const [state, setState] = useState(() => {
    const fromHash = typeof window !== 'undefined' && window.location.hash.replace('#', '');
    const valid = fromHash && /^[0-9a-fA-F]{6}$/.test(fromHash);
    return {
      baseHex: valid ? `#${fromHash.toLowerCase()}` : '#82ea41',
      algorithm: 'Tailwind CSS', namingPattern: '50,100…900', count: 11, contrastShift: 0,
    };
  });
  const setBaseHex = (hex) => setState((s) => ({ ...s, baseHex: hex }));

  const [showUsage, setShowUsage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewScene, setPreviewScene] = useState('playground');
  const [showUI, setShowUI] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  const history = useHistory(state.baseHex, setBaseHex, { max: 30 });

  const name = useMemo(() => nearestColorName(state.baseHex), [state.baseHex]);
  const palette = useMemo(() => buildPalette({ ...state, name }), [state, name]);

  useEffect(() => {
    const root = document.documentElement;
    palette.forEach((s) => root.style.setProperty(`--brand-${s.label}`, s.hex));
    const lookup = (k, i) => palette.find((s) => s.label === k)?.hex || palette[i]?.hex;
    ['100', '200', '300', '400', '500', '600', '700'].forEach((k, i) => {
      root.style.setProperty(`--brand-${k}`, lookup(k, Math.floor(palette.length * (i + 1) / 8)));
    });
    root.style.setProperty('--brand-900', lookup('900', palette.length - 2));
    root.style.setProperty('--brand-950', lookup('950', palette.length - 1));
  }, [palette]);

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (e.code === 'Space' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        setBaseHex(randomHex());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const headerAction = (id) => {
    if (id === 'tools')      setShowTools(true);
    else if (id === 'playground') { setPreviewScene('playground'); setShowPreview(true); }
    else if (id === 'showcase')   setShowUI(true);
    else if (id === 'preview')    { setPreviewScene('landing'); setShowPreview(true); }
    else if (id === 'usage')      setShowUsage(true);
  };

  const closeTool = () => setActiveTool(null);

  const footerAction = (a) => {
    if (a === 'showcase')         setShowUI(true);
    else if (a === 'preview')     { setPreviewScene('landing');    setShowPreview(true); }
    else if (a === 'playground')  { setPreviewScene('playground'); setShowPreview(true); }
    else if (a === 'usage')       setShowUsage(true);
    else if (a.startsWith('tool:')) setActiveTool(a.slice(5));
  };

  if (path === '/figma') {
    return (
      <ToastProvider>
        <FigmaPage palette={palette} name={name} onAction={footerAction} />
      </ToastProvider>
    );
  }
  if (path === '/tools') {
    return (
      <ToastProvider>
        <ToolsPage onPickTool={setActiveTool} onAction={footerAction} />
        <SemanticPaletteModal  open={activeTool === 'semantic'}  onClose={closeTool} baseHex={state.baseHex} />
        <BrandKitModal         open={activeTool === 'brandkit'}  onClose={closeTool} baseHex={state.baseHex} />
        <SavedLibraryModal     open={activeTool === 'saved'}     onClose={closeTool} currentPalette={palette} currentName={name} currentBaseHex={state.baseHex} onLoad={setBaseHex} />
        <ImageExtractorModal   open={activeTool === 'image'}     onClose={closeTool} onPick={setBaseHex} />
        <ColorBlindnessModal   open={activeTool === 'blindness'} onClose={closeTool} palette={palette} />
        <PairSuggestionsModal  open={activeTool === 'pairs'}     onClose={closeTool} baseHex={state.baseHex} onPick={setBaseHex} />
        <GradientBuilderModal  open={activeTool === 'gradient'}  onClose={closeTool} fromHex={palette[2]?.hex || state.baseHex} toHex={palette[8]?.hex || state.baseHex} />
        <CompareModal          open={activeTool === 'compare'}   onClose={closeTool} baseHex={state.baseHex} />
        <CustomAlgorithmModal  open={activeTool === 'custom'}    onClose={closeTool} baseHex={state.baseHex} onApply={() => closeTool()} />
        <AINamingModal         open={activeTool === 'ai'}        onClose={closeTool} onPick={setBaseHex} />
        <TextOnShadeModal      open={activeTool === 'textcolor'} onClose={closeTool} palette={palette} />
        <ContrastMatrixModal   open={activeTool === 'matrix'}    onClose={closeTool} palette={palette} />
        <TailwindInstallModal  open={activeTool === 'tailwind'}  onClose={closeTool} palette={palette} name={name} />
        <OgImageModal          open={activeTool === 'og'}        onClose={closeTool} palette={palette} name={name} baseHex={state.baseHex} />
        <SpecSheetModal        open={activeTool === 'specsheet'} onClose={closeTool} palette={palette} name={name} baseHex={state.baseHex} algorithm={state.algorithm} />
        <EmbedModal            open={activeTool === 'embed'}     onClose={closeTool} palette={palette} name={name} baseHex={state.baseHex} />
        <HistoryModal          open={activeTool === 'history'}   onClose={closeTool} history={history.history} currentIndex={history.currentIndex} onJump={history.jumpTo} onClear={history.clear} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen">
        <Header
          theme={theme}
          onToggleTheme={toggle}
          onRandom={() => setBaseHex(randomHex())}
          onAction={headerAction}
        />

        <main className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 pb-20">
          <Hero
            baseHex={state.baseHex} name={name} palette={palette} count={state.count}
            onRandom={() => setBaseHex(randomHex())} onSetHex={setBaseHex}
          />
          <Generator state={state} setState={setState} />
          <Swatches palette={palette} name={name} />
          <OutputTabs
            palette={palette} name={name}
            onTestInUI={() => setShowUI(true)}
            onPreview={() => { setPreviewScene('landing'); setShowPreview(true); }}
          />
          <Footer onAction={footerAction} />
        </main>

        <UsageModal     open={showUsage}   onClose={() => setShowUsage(false)}   palette={palette} name={name} format="HEX" />
        <PreviewModal   open={showPreview} onClose={() => setShowPreview(false)} initialScene={previewScene} />
        <ShowcaseModal  open={showUI}      onClose={() => setShowUI(false)} />
        <ToolsModal     open={showTools}   onClose={() => setShowTools(false)} onPick={setActiveTool} />

        <SemanticPaletteModal  open={activeTool === 'semantic'}  onClose={closeTool} baseHex={state.baseHex} />
        <BrandKitModal         open={activeTool === 'brandkit'}  onClose={closeTool} baseHex={state.baseHex} />
        <SavedLibraryModal     open={activeTool === 'saved'}     onClose={closeTool} currentPalette={palette} currentName={name} currentBaseHex={state.baseHex} onLoad={setBaseHex} />
        <ImageExtractorModal   open={activeTool === 'image'}     onClose={closeTool} onPick={setBaseHex} />
        <ColorBlindnessModal   open={activeTool === 'blindness'} onClose={closeTool} palette={palette} />
        <PairSuggestionsModal  open={activeTool === 'pairs'}     onClose={closeTool} baseHex={state.baseHex} onPick={setBaseHex} />
        <GradientBuilderModal  open={activeTool === 'gradient'}  onClose={closeTool} fromHex={palette[2]?.hex || state.baseHex} toHex={palette[8]?.hex || state.baseHex} />
        <CompareModal          open={activeTool === 'compare'}   onClose={closeTool} baseHex={state.baseHex} />
        <CustomAlgorithmModal  open={activeTool === 'custom'}    onClose={closeTool} baseHex={state.baseHex} onApply={() => closeTool()} />
        <AINamingModal         open={activeTool === 'ai'}        onClose={closeTool} onPick={setBaseHex} />
        <TextOnShadeModal      open={activeTool === 'textcolor'} onClose={closeTool} palette={palette} />
        <ContrastMatrixModal   open={activeTool === 'matrix'}    onClose={closeTool} palette={palette} />
        <FigmaExportModal      open={activeTool === 'figma'}     onClose={closeTool} palette={palette} name={name} />
        <TailwindInstallModal  open={activeTool === 'tailwind'}  onClose={closeTool} palette={palette} name={name} />
        <OgImageModal          open={activeTool === 'og'}        onClose={closeTool} palette={palette} name={name} baseHex={state.baseHex} />
        <SpecSheetModal        open={activeTool === 'specsheet'} onClose={closeTool} palette={palette} name={name} baseHex={state.baseHex} algorithm={state.algorithm} />
        <EmbedModal            open={activeTool === 'embed'}     onClose={closeTool} palette={palette} name={name} baseHex={state.baseHex} />
        <HistoryModal          open={activeTool === 'history'}   onClose={closeTool} history={history.history} currentIndex={history.currentIndex} onJump={history.jumpTo} onClear={history.clear} />
      </div>
    </ToastProvider>
  );
}
