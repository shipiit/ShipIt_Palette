export default function Toggle({ checked, onChange, label, className = '' }) {
  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 ${className}`}>
      <span
        className="relative inline-block h-6 w-11 rounded-full transition"
        style={{ background: checked ? 'var(--brand-500)' : '#d4d4d8' }}
        onClick={() => onChange(!checked)}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition"
          style={{ left: checked ? '1.375rem' : '0.125rem' }}
        />
      </span>
      {label && <span className="text-sm text-neutral-700 dark:text-neutral-200">{label}</span>}
    </label>
  );
}
