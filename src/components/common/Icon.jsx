// Tiny stroke-based icon set — monoline, currentColor, 20×20.
// Add new ones by name and they're available everywhere as <Icon name="…" />.
const P = (d) => <path d={d} />;

const ICONS = {
  // brand / formats
  css:        <><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 8h6M7 12h4"/></>,
  tailwind:   <path d="M5 11c1-3 3-4 5-4 3 0 3 2 5 2s2-1 0-3c-1 3-3 4-5 4-3 0-3-2-5-2s-2 1 0 3zm0 4c1-3 3-4 5-4 3 0 3 2 5 2s2-1 0-3c-1 3-3 4-5 4-3 0-3-2-5-2s-2 1 0 3z"/>,
  tokens:     <><circle cx="10" cy="10" r="3"/><circle cx="10" cy="10" r="6"/></>,
  scss:       <path d="M3 13s2-3 7-3 7 3 7 3M5 7c2 1 5 1 7 0M3 16c4 1 10 1 14 0"/>,
  less:       <path d="M5 6h2v8H5zM9 6h2v8H9zM13 6h2v8h-2z"/>,
  map:        <path d="M3 5l5-2 4 2 5-2v12l-5 2-4-2-5 2zM8 3v14M12 5v14"/>,
  json:       <path d="M7 4c-2 1-2 3-2 6s0 5 2 6M13 4c2 1 2 3 2 6s0 5-2 6"/>,
  js:         <><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M8 9v4a1 1 0 01-2 0M11 13c0 1 1 1 2 1s2-.5 2-1.5-1-1.2-2-1.5-2-.5-2-1.5 1-1.5 2-1.5 2 .5 2 1"/></>,
  ts:         <><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M6 9h4M8 9v5M12 13c0 1 1 1.2 2 1.2s2-.5 2-1.4c0-1.7-4-1.2-4-3 0-.9 1-1.4 2-1.4s2 .5 2 1.2"/></>,
  swift:      <path d="M5 5l8 4-3 4 5 2-3-3 4-3-6-2 3-4z"/>,
  android:    <><path d="M5 9a5 5 0 0110 0v5H5z"/><circle cx="8" cy="11" r=".5"/><circle cx="12" cy="11" r=".5"/><path d="M6 5l1 2M14 5l-1 2M3 11v3M17 11v3M8 14v3M12 14v3"/></>,
  flutter:    <path d="M11 3L4 10l3 3 7-7zM7 13l4 4 7-7-4-4z"/>,
  svg:        <><rect x="3" y="3" width="14" height="14" rx="2"/><circle cx="7" cy="9" r="1.5"/><path d="M3 15l4-3 4 3 6-5"/></>,

  // generic UI
  search:     <><circle cx="9" cy="9" r="5"/><path d="M14 14l3 3"/></>,
  copy:       <><rect x="6" y="6" width="9" height="9" rx="1.5"/><path d="M11 6V5a1 1 0 00-1-1H5a1 1 0 00-1 1v6a1 1 0 001 1h1"/></>,
  download:   <path d="M10 3v9m0 0l-3-3m3 3l3-3M4 15h12"/>,
  check:      <path d="M4 10l4 4 8-8"/>,
  close:      <path d="M5 5l10 10M15 5L5 15"/>,
  sun:        <><circle cx="10" cy="10" r="3.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.5 4.5l1.5 1.5M14 14l1.5 1.5M4.5 15.5L6 14M14 6l1.5-1.5"/></>,
  moon:       <path d="M16 12.5A6.5 6.5 0 017.5 4 6.5 6.5 0 1016 12.5z"/>,
  shuffle:    <path d="M3 6h3l8 8h3M3 14h3l3-3M14 5l3 1-1 3M14 17l3-1-1-3"/>,
  arrow:      <path d="M4 10h12m-4-4l4 4-4 4"/>,
  palette:    <><path d="M10 3a7 7 0 100 14c1 0 2-.5 2-1.5S11 14 11 13s.5-1.5 2-1.5h2a2 2 0 002-2A6 6 0 0010 3z"/><circle cx="6" cy="9" r="1"/><circle cx="9" cy="6" r="1"/><circle cx="14" cy="7" r="1"/></>,
  sparkle:    <path d="M10 3v4M10 13v4M3 10h4M13 10h4M5 5l2 2M13 13l2 2M15 5l-2 2M5 15l2-2"/>,
};

export default function Icon({ name, size = 16, className = '', strokeWidth = 1.6, ...rest }) {
  const node = ICONS[name];
  if (!node) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${className}`}
      {...rest}
    >
      {node}
    </svg>
  );
}
