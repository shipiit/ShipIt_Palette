import { useEffect } from 'react';

export default function Modal({ open, onClose, title, children, size = 'lg', footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-3xl', xl: 'max-w-5xl', full: 'w-[98vw] max-w-none h-[96vh]' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-[fade_.2s_ease-out]" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} ${size === 'full' ? 'flex flex-col' : 'max-h-[90vh]'} overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl animate-[pop_.22s_ease-out]`}>
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-100 dark:border-neutral-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: 'var(--brand-500)' }} />
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{title}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Close">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 10-1.06-1.06L10 8.94 6.28 5.22z"/></svg>
          </button>
        </div>
        <div className={`overflow-y-auto ${size === 'full' ? 'flex-1' : 'max-h-[70vh]'} px-5 py-4`}>{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-neutral-100 dark:border-neutral-800 px-5 py-3 bg-neutral-50/50 dark:bg-neutral-900/40">{footer}</div>}
      </div>
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}@keyframes pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}
