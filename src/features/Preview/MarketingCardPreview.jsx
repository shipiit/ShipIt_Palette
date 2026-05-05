import { Badge, Heading, Paragraph, Icon, Logo } from '../../components/common';

const CARDS = [
  {
    platform: 'Twitter',
    aspect: '16 / 9',
    width: 640,
    badge: 'Launch week',
    headline: 'Build palettes 10× faster.',
    sub: 'A new design system on every shade.',
    icon: 'sparkle',
  },
  {
    platform: 'LinkedIn',
    aspect: '1.91 / 1',
    width: 640,
    badge: 'Now hiring',
    headline: 'Engineers who care about craft.',
    sub: 'Join the team behind ShipIt Palette.',
    icon: 'palette',
  },
  {
    platform: 'Instagram',
    aspect: '1 / 1',
    width: 480,
    badge: 'New',
    headline: 'One palette. Every screen.',
    sub: 'Generate, preview, ship.',
    icon: 'tokens',
  },
];

export default function MarketingCardPreview({ theme }) {
  const dark = theme === 'dark';
  return (
    <div className={`min-h-full px-6 py-12 ${dark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <Badge variant="brand">
          <Icon name="palette" size={12} /> Social toolkit
        </Badge>
        <Heading as="h2" className="mt-3 !text-3xl">Marketing cards in your brand</Heading>
        <Paragraph className="mt-2">
          Auto-generated assets for Twitter, LinkedIn, and Instagram — same palette,
          three native aspect ratios.
        </Paragraph>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {CARDS.map((c) => (
          <CardWrapper key={c.platform} card={c} />
        ))}
      </div>

      <div className="mt-12 max-w-3xl mx-auto text-center">
        <Paragraph size="sm">
          Drop a photo, swap copy, ship. Each card exports as PNG, JPG, or SVG.
        </Paragraph>
      </div>
    </div>
  );
}

function CardWrapper({ card }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <SocialCard card={card} />
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span className="font-semibold">{card.platform}</span>
        <span className="opacity-50">·</span>
        <span className="font-mono">{card.aspect.replace(/ /g, '')}</span>
      </div>
    </div>
  );
}

function SocialCard({ card }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl text-white"
      style={{
        width: card.width,
        maxWidth: '100%',
        aspectRatio: card.aspect,
        background: 'linear-gradient(135deg, var(--brand-500), var(--brand-800))',
      }}
    >
      {/* Decorative shapes */}
      <div
        className="absolute -top-20 -right-20 h-80 w-80 rounded-full blur-3xl opacity-50"
        style={{ background: 'var(--brand-300)' }}
      />
      <div
        className="absolute -bottom-24 -left-12 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{ background: 'var(--brand-700)' }}
      />
      <div
        className="absolute top-8 right-8 h-32 w-32 rounded-full opacity-20"
        style={{ background: 'var(--brand-100)' }}
      />

      {/* Grid texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${card.platform}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0 L0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${card.platform})`} />
      </svg>

      {/* Foreground content */}
      <div className="relative h-full w-full flex flex-col justify-between p-7">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Icon name={card.icon} size={11} />
            {card.badge}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">
            shipit.studio
          </span>
        </div>

        {/* Middle */}
        <div className="max-w-[90%]">
          <h3
            className="font-bold tracking-tight leading-[1.05]"
            style={{
              fontSize: card.platform === 'Instagram' ? 36 : 44,
            }}
          >
            {card.headline}
          </h3>
          <p
            className="mt-3 opacity-90"
            style={{ fontSize: card.platform === 'Instagram' ? 14 : 16 }}
          >
            {card.sub}
          </p>
        </div>

        {/* Bottom row: Logo bottom-left + arrow */}
        <div className="flex items-end justify-between">
          <div
            className="rounded-xl px-3 py-2"
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#111',
            }}
          >
            <Logo size={26} withWordmark={true} />
          </div>
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-white"
            style={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.4)',
            }}
          >
            <Icon name="arrow" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
