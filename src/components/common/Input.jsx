export default function Input({ label, hint, error, leftIcon, rightIcon, className = '', ...rest }) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">{label}</label>}
      <div
        className={`relative flex items-center rounded-xl border bg-white dark:bg-neutral-900 transition focus-within:ring-2 ${error ? 'border-red-400' : 'border-neutral-200 dark:border-neutral-800 focus-within:border-[var(--brand-500)]'}`}
        style={{ '--tw-ring-color': 'color-mix(in srgb, var(--brand-500) 35%, transparent)' }}
      >
        {leftIcon && <span className="pl-3" style={{ color: 'var(--brand-500)' }}>{leftIcon}</span>}
        <input
          className="w-full bg-transparent px-3 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
          {...rest}
        />
        {rightIcon && <span className="pr-3" style={{ color: 'var(--brand-500)' }}>{rightIcon}</span>}
      </div>
      {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
