import { Button, Card, Badge, Heading, Paragraph, Icon, Logo } from '../../components/common';

const STATS = [
  { label: 'Active users',   value: '12,481', delta: '+18%' },
  { label: 'New signups',    value: '1,204',  delta: '+24%' },
  { label: 'Revenue',        value: '$48.2k', delta: '+12%' },
];

export default function EmailPreview({ theme }) {
  // Emails don't have dark mode — always render on neutral canvas.
  void theme;
  return (
    <div className="min-h-full px-6 py-12 bg-neutral-200 dark:bg-neutral-900">
      <div className="max-w-2xl mx-auto">
        {/* Mail-client chrome */}
        <div className="rounded-t-2xl bg-white dark:bg-neutral-100 border border-neutral-200 px-5 py-3 text-xs text-neutral-500 flex items-center gap-3">
          <span className="font-semibold text-neutral-700">From:</span>
          <span>ShipIt Palette &lt;hello@shipit.studio&gt;</span>
          <span className="ml-auto">May 5, 2026 · 9:41 AM</span>
        </div>
        <div className="bg-white dark:bg-neutral-100 border-x border-neutral-200 px-5 py-2 text-xs text-neutral-500">
          <span className="font-semibold text-neutral-700">Subject:</span>{' '}
          Your weekly recap is ready 📊
        </div>

        {/* Email canvas */}
        <div
          className="bg-white border border-neutral-200 rounded-b-2xl overflow-hidden text-neutral-900"
          style={{ maxWidth: 600, margin: '0 auto' }}
        >
          {/* Header band */}
          <div className="px-8 py-6 text-white" style={{ background: 'var(--brand-600)' }}>
            <div className="flex items-center justify-between">
              <Logo size={32} withWordmark={false} />
              <span className="text-xs font-semibold opacity-90 tracking-wider uppercase">
                Weekly Recap
              </span>
            </div>
          </div>

          {/* Hero */}
          <div className="px-8 pt-10 pb-6 text-center">
            <Badge variant="brand" className="mb-4">
              <Icon name="sparkle" size={12} /> Week 18
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight leading-tight">
              You shipped <span style={{ color: 'var(--brand-600)' }}>3 features</span> this week
            </h1>
            <Paragraph className="mt-3 max-w-md mx-auto">
              Here's a quick snapshot of what changed for your team and your customers
              between April 28 and May 4.
            </Paragraph>
            <div className="mt-6">
              <Button
                variant="brand"
                size="lg"
                className="!shadow-md"
              >
                View dashboard <Icon name="arrow" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="px-8 pb-2">
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((s) => (
                <Card key={s.label} accent className="!p-4 text-center">
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: 'var(--brand-700)' }}
                  >
                    {s.label}
                  </div>
                  <div className="mt-1 text-xl font-bold tabular-nums">{s.value}</div>
                  <Badge variant="brand" className="mt-1 !text-[10px]">{s.delta} ↗</Badge>
                </Card>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="px-8 py-8 space-y-5">
            <div>
              <Heading as="h4">What's new</Heading>
              <ul className="mt-3 space-y-3 text-sm text-neutral-700">
                {[
                  'Shipped the new palette generator with 12 export formats',
                  'Cut average page load by 38% with smarter caching',
                  'Rolled out single sign-on for Team-plan customers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: 'var(--brand-500)' }}
                    >
                      <Icon name="check" size={11} strokeWidth={2.4} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlight callout */}
            <div
              className="rounded-2xl p-5"
              style={{
                background:
                  'linear-gradient(135deg, color-mix(in srgb, var(--brand-100) 80%, white), white)',
                border: '1px solid var(--brand-200)',
              }}
            >
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--brand-700)' }}
              >
                Quote of the week
              </div>
              <Paragraph className="mt-2 italic !text-neutral-800">
                "ShipIt cut our design-to-ship time in half. It's the closest thing
                to magic in our stack."
              </Paragraph>
              <div className="mt-3 flex items-center gap-2">
                <span
                  className="h-7 w-7 rounded-full"
                  style={{ background: 'var(--brand-500)' }}
                />
                <div className="text-xs">
                  <div className="font-semibold">Maya Chen</div>
                  <div className="text-neutral-500">CTO, Linear</div>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Button variant="brand">Read the full recap <Icon name="arrow" /></Button>
            </div>
          </div>

          {/* Footer */}
          <div
            className="px-8 py-6 text-xs text-center"
            style={{
              background: 'color-mix(in srgb, var(--brand-100) 60%, white)',
              color: '#525252',
            }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              {['twitter', 'linkedin', 'github'].map((s) => (
                <span
                  key={s}
                  className="h-7 w-7 rounded-full flex items-center justify-center text-white"
                  style={{ background: 'var(--brand-600)' }}
                >
                  <Icon name="sparkle" size={12} />
                </span>
              ))}
            </div>
            <p>
              You're receiving this because you signed up for ShipIt Palette.
            </p>
            <p className="mt-1">
              <a className="underline" style={{ color: 'var(--brand-700)' }}>Unsubscribe</a>
              {' · '}
              <a className="underline" style={{ color: 'var(--brand-700)' }}>Update preferences</a>
              {' · '}
              <a className="underline" style={{ color: 'var(--brand-700)' }}>View in browser</a>
            </p>
            <p className="mt-3 text-neutral-400">
              ShipIt Palette · 535 Mission St, San Francisco, CA 94105
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
