import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useHistory — generic undo/redo stack hook.
 *
 *   const { undo, redo, canUndo, canRedo, history, jumpTo, currentIndex, clear } =
 *     useHistory(value, setValue, { max: 30 });
 *
 * - Pushes `value` to an internal stack whenever it changes by external means.
 * - undo() / redo() call setValue with the prior / next value.
 * - jumpTo(index) calls setValue with history[index].
 * - Wires global Cmd/Ctrl+Z (undo) and Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y (redo).
 *   Skips while INPUT/TEXTAREA/contentEditable elements are focused.
 */
export function useHistory(value, setValue, opts = { max: 30 }) {
  const max = Math.max(2, opts?.max ?? 30);

  // The stack of past values. Index of the "current" value lives in `indexRef`.
  const [history, setHistory] = useState(() => [value]);
  const indexRef = useRef(0);
  const [, force] = useState(0);
  const rerender = useCallback(() => force((x) => x + 1), []);

  // Internal flag: when WE call setValue from undo/redo, we should NOT push.
  const internalRef = useRef(false);
  const lastSeenRef = useRef(value);

  // External value change -> push onto stack (unless it's our own undo/redo).
  useEffect(() => {
    if (Object.is(lastSeenRef.current, value)) return;
    lastSeenRef.current = value;

    if (internalRef.current) {
      internalRef.current = false;
      return;
    }

    setHistory((prev) => {
      // Drop any "future" entries when a new branch starts.
      const truncated = prev.slice(0, indexRef.current + 1);
      truncated.push(value);
      // Cap length: drop oldest entries.
      while (truncated.length > max) truncated.shift();
      indexRef.current = truncated.length - 1;
      return truncated;
    });
    rerender();
  }, [value, max, rerender]);

  const applyAt = useCallback(
    (nextIndex) => {
      const clamped = Math.max(0, Math.min(history.length - 1, nextIndex));
      if (clamped === indexRef.current) return;
      indexRef.current = clamped;
      const next = history[clamped];
      internalRef.current = true;
      lastSeenRef.current = next;
      setValue(next);
      rerender();
    },
    [history, setValue, rerender]
  );

  const undo = useCallback(() => applyAt(indexRef.current - 1), [applyAt]);
  const redo = useCallback(() => applyAt(indexRef.current + 1), [applyAt]);
  const jumpTo = useCallback((i) => applyAt(i), [applyAt]);

  const clear = useCallback(() => {
    setHistory([lastSeenRef.current]);
    indexRef.current = 0;
    rerender();
  }, [rerender]);

  // Global keyboard shortcuts.
  useEffect(() => {
    const isEditable = (el) => {
      if (!el) return false;
      const tag = (el.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
      if (el.isContentEditable) return true;
      return false;
    };

    const onKey = (e) => {
      if (isEditable(e.target) || isEditable(document.activeElement)) return;
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const key = (e.key || '').toLowerCase();

      if (key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((key === 'z' && e.shiftKey) || key === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [undo, redo]);

  const currentIndex = indexRef.current;
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return { undo, redo, canUndo, canRedo, history, jumpTo, currentIndex, clear };
}

export default useHistory;
