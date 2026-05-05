export default function Textarea({ label, hint, error, rows = 4, className = '', ...rest }) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>}
      <textarea
        rows={rows}
        className={`w-full rounded-xl border bg-white dark:bg-neutral-900 px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]/40 ${error ? 'border-red-400' : 'border-neutral-200 dark:border-neutral-800'}`}
        {...rest}
      />
      {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
