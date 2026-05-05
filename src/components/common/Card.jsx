export default function Card({ children, className = '', padded = true, accent = false, ...rest }) {
  return (
    <div
      className={`rounded-2xl border bg-white dark:bg-neutral-900 shadow-sm transition ${padded ? 'p-5' : ''} ${className}`}
      style={accent ? { borderColor: 'var(--brand-300)', boxShadow: '0 4px 24px -8px color-mix(in srgb, var(--brand-500) 20%, transparent)' } : { borderColor: 'rgb(229 229 229 / 1)' }}
      {...rest}
    >
      {children}
    </div>
  );
}
