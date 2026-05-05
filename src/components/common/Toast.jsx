import { createContext, useCallback, useContext, useState } from 'react';

const ToastCtx = createContext({ toast: () => {} });

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const toast = useCallback((message, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setItems((s) => [...s, { id, message, ...opts }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), opts.duration || 2200);
  }, []);
  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-2 text-sm shadow-lg animate-[slide_.25s_ease-out]"
          >
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: 'var(--brand-500)' }} />
            <span className="text-neutral-800 dark:text-neutral-100">{t.message}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes slide{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
