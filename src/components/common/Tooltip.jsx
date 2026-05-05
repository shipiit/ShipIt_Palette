import { useState } from 'react';

export default function Tooltip({ content, children, side = 'top' }) {
  const [open, setOpen] = useState(false);
  const sides = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };
  return (
    <span className="relative inline-flex" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-white shadow-md ${sides[side]}`}
          style={{ background: 'var(--brand-700)' }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
