export default function Paragraph({ children, size = 'md', className = '' }) {
  const sizes = { sm: 'text-sm leading-6', md: 'text-base leading-7', lg: 'text-lg leading-8' };
  return <p className={`${sizes[size]} text-neutral-700 dark:text-neutral-300 ${className}`}>{children}</p>;
}
