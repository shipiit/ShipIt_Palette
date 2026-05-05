export default function Tag({ children, onRemove, variant = 'brand', className = '' }) {
  const styles = variant === 'brand'
    ? { background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)', borderColor: 'color-mix(in srgb, var(--brand-500) 30%, transparent)' }
    : {};
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${className}`}
      style={styles}
    >
      {children}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 rounded-full opacity-70 hover:opacity-100" aria-label="Remove">
          ×
        </button>
      )}
    </span>
  );
}
