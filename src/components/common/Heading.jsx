export default function Heading({ as: As = 'h2', children, accent = false, className = '' }) {
  const sizes = { h1: 'text-3xl font-bold', h2: 'text-2xl font-semibold', h3: 'text-xl font-semibold', h4: 'text-lg font-semibold' };
  return (
    <As
      className={`tracking-tight text-neutral-900 dark:text-neutral-100 ${sizes[As] || sizes.h2} ${className}`}
      style={accent ? { color: 'var(--brand-600)' } : undefined}
    >
      {children}
    </As>
  );
}
