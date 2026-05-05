import ColorPicker from './ColorPicker.jsx';
import Dropdown from '../../components/common/Dropdown.jsx';
import { ALGORITHMS, NAMING_PATTERNS } from '../../lib/color.js';

export default function Generator({ state, setState }) {
  const set = (k, v) => setState((s) => ({ ...s, [k]: v }));

  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 lg:grid-cols-3">
      <ColorPicker baseHex={state.baseHex} onChange={(hex) => set('baseHex', hex)} />

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Algorithm</p>
          <Dropdown
            value={state.algorithm}
            onChange={(v) => set('algorithm', v)}
            options={Object.keys(ALGORITHMS)}
          />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Contrast Shift</p>
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-3">
            <div className="text-2xl font-semibold tabular-nums">{state.contrastShift.toFixed(2)}</div>
            <input
              type="range" min={-15} max={15} step={0.5}
              value={state.contrastShift}
              onChange={(e) => set('contrastShift', Number(e.target.value))}
              className="brand-slider mt-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Naming Pattern</p>
          <Dropdown
            value={state.namingPattern}
            onChange={(v) => set('namingPattern', v)}
            options={Object.keys(NAMING_PATTERNS)}
          />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Shade Count</p>
          <div className="flex items-center justify-center gap-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3">
            <button
              onClick={() => set('count', Math.max(3, state.count - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700 hover:scale-110 transition"
            >−</button>
            <div className="text-2xl font-semibold tabular-nums w-10 text-center">{state.count}</div>
            <button
              onClick={() => set('count', Math.min(15, state.count + 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow border border-neutral-200 dark:border-neutral-700 hover:scale-110 transition"
            >+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
