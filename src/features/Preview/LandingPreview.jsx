import { Button, Card, Badge, Heading, Paragraph, Icon } from '../../components/common';
import { Sparkline } from './_charts.jsx';

export default function LandingPreview({ theme }) {
  const dark = theme === 'dark';
  return (
    <div className={dark ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'}>
      <Nav />
      <Hero />
      <Logos />
      <Features />
      <Stats />
      <ProductShot />
      <Testimonials />
      <FAQ dark={dark} />
      <CTA />
      <Footer dark={dark} />
    </div>
  );
}

function Nav() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-2 font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg text-white" style={{ background: 'var(--brand-500)' }}><Icon name="palette" size={16} /></span>
        Northwind
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
        <a>Product</a><a>Solutions</a><a>Pricing</a><a>Docs</a><a>Customers</a><a>Blog</a>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="brand" size="sm">Start free <Icon name="arrow" /></Button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative px-8 py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, color-mix(in srgb, var(--brand-100) 80%, transparent), transparent)' }}>
      <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: 'var(--brand-300)' }} />
      <div className="absolute bottom-0 left-1/4 h-48 w-48 rounded-full blur-3xl opacity-30" style={{ background: 'var(--brand-500)' }} />
      <div className="relative max-w-3xl">
        <Badge variant="brand" className="mb-5"><Icon name="sparkle" size={12} /> v4.0 just shipped</Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] text-neutral-900 dark:text-neutral-100">
          Build at the speed of <span style={{ color: 'var(--brand-600)' }}>thought</span>.
        </h1>
        <Paragraph size="lg" className="mt-5 max-w-xl">
          Ship beautiful interfaces 10× faster. Used by 50,000+ teams to design, prototype, and deliver pixel-perfect products.
        </Paragraph>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="brand" size="lg">Start free trial <Icon name="arrow" /></Button>
          <Button variant="outline" size="lg">▶ Watch 2-min demo</Button>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['400', '500', '600', '700'].map((s) => (<span key={s} className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-neutral-950" style={{ background: `var(--brand-${s})` }} />))}
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Loved by <strong style={{ color: 'var(--brand-700)' }}>4.8k</strong> developers</span>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="px-8 py-10">
      <p className="text-center text-xs font-bold uppercase tracking-wider text-neutral-500">Trusted by teams at</p>
      <div className="mt-4 flex flex-wrap justify-center items-center gap-8 opacity-70">
        {['LINEAR', 'VERCEL', 'STRIPE', 'NOTION', 'FIGMA', 'LOOM', 'RAYCAST'].map((b) => (
          <span key={b} className="text-base font-bold tracking-tight" style={{ color: 'var(--brand-700)' }}>{b}</span>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: 'sparkle', title: 'Lightning fast', body: 'Sub-100ms response time, anywhere in the world.' },
    { icon: 'palette', title: 'Beautifully crafted', body: 'A design system that adapts to your brand instantly.' },
    { icon: 'tokens',  title: 'Built for scale',  body: 'From side project to billion-user product.' },
    { icon: 'json',    title: 'Open & extensible', body: 'Bring your own data, hooks, and integrations.' },
    { icon: 'css',     title: 'Pixel-perfect',     body: 'Every component shipped with all states.' },
    { icon: 'flutter', title: 'Cross-platform',    body: 'Web, iOS, Android — one source of truth.' },
  ];
  return (
    <section className="px-8 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Heading as="h2">Everything you need, nothing you don't</Heading>
        <Paragraph className="mt-2">A focused toolkit for teams that ship.</Paragraph>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((f) => (
          <Card key={f.title} accent className="hover:-translate-y-1 transition">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white mb-4" style={{ background: 'var(--brand-500)' }}><Icon name={f.icon} size={18} /></span>
            <Heading as="h4">{f.title}</Heading>
            <Paragraph size="sm" className="mt-2">{f.body}</Paragraph>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="px-8 py-14">
      <div className="rounded-3xl px-8 py-10 text-white" style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-800))' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['50k+','Teams'],['1.2B','Requests / mo'],['99.99%','Uptime'],['4.8','Average rating']].map(([v, l]) => (
            <div key={l}>
              <div className="text-4xl font-bold tracking-tight">{v}</div>
              <div className="mt-1 text-sm opacity-90">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShot() {
  return (
    <section className="px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <Badge variant="brand" className="mb-3">WHY US</Badge>
        <Heading as="h2">See your data come alive</Heading>
        <Paragraph className="mt-3">Real-time charts, alerts, and audit trails. No queries, no SQL — just answers.</Paragraph>
        <ul className="mt-5 space-y-2 text-sm">
          {['Drag-and-drop dashboards','One-click exports','Custom alert rules','Slack & email digests'].map((it) => (
            <li key={it} className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: 'var(--brand-500)' }}><Icon name="check" size={11} strokeWidth={2.4} /></span>
              {it}
            </li>
          ))}
        </ul>
      </div>
      <Card accent>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--brand-700)' }}>Live MRR</p>
            <p className="text-2xl font-bold tabular-nums">$48.2k</p>
          </div>
          <Badge variant="brand">+12% MoM</Badge>
        </div>
        <Sparkline data={[10,18,14,22,28,24,32,40,38,46,52,60]} w={400} h={80} />
      </Card>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: 'Cut our design-to-ship time in half. Game changer.', who: 'Maya', role: 'CTO, Linear' },
    { quote: 'The closest thing to magic in our stack.', who: 'Theo', role: 'Eng Lead, Vercel' },
    { quote: 'We launched our redesign in two weeks instead of two quarters.', who: 'Aria', role: 'Designer, Stripe' },
  ];
  return (
    <section className="px-8 py-14">
      <Heading as="h2" className="text-center mb-8">Loved by builders</Heading>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((t) => (
          <Card key={t.who}>
            <div className="text-2xl mb-3" style={{ color: 'var(--brand-500)' }}>"</div>
            <Paragraph size="sm">{t.quote}</Paragraph>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-8 w-8 rounded-full" style={{ background: 'var(--brand-500)' }} />
              <div>
                <div className="text-sm font-semibold">{t.who}</div>
                <div className="text-xs text-neutral-500">{t.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ({ dark }) {
  const qs = [
    ['Is there a free plan?', 'Yes — generous free tier, forever.'],
    ['Can I cancel anytime?', 'Absolutely. No questions asked.'],
    ['Do you support SSO?',   'On the Team plan and above.'],
    ['Is my data encrypted?', 'AES-256 at rest, TLS 1.3 in transit.'],
  ];
  return (
    <section className="px-8 py-14 max-w-3xl mx-auto">
      <Heading as="h2" className="text-center mb-8">Frequently asked</Heading>
      <div className="space-y-2">
        {qs.map(([q, a], i) => (
          <details key={i} className={`group rounded-xl border px-4 py-3 ${dark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              {q}
              <span className="text-xl transition group-open:rotate-45" style={{ color: 'var(--brand-500)' }}>+</span>
            </summary>
            <Paragraph size="sm" className="mt-2">{a}</Paragraph>
          </details>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-8 pb-16">
      <div className="rounded-3xl p-10 text-center text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--brand-600), var(--brand-800))' }}>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full blur-3xl opacity-50" style={{ background: 'var(--brand-300)' }} />
        <h2 className="relative text-3xl font-bold">Ready to build the future?</h2>
        <Paragraph className="relative mt-2 text-white opacity-90">Join 50,000 teams already shipping faster.</Paragraph>
        <Button variant="secondary" size="lg" className="relative mt-6">Get started — it's free</Button>
      </div>
    </section>
  );
}

function Footer({ dark }) {
  return (
    <footer className={`px-8 py-10 border-t ${dark ? 'border-neutral-800' : 'border-neutral-200'}`}>
      <div className="flex flex-wrap justify-between gap-6 text-sm">
        <div className="flex items-center gap-2 font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ background: 'var(--brand-500)' }}><Icon name="palette" size={14} /></span>
          Northwind
        </div>
        <div className="grid grid-cols-3 gap-8 text-neutral-500">
          <div className="space-y-1.5"><div className="font-semibold opacity-100">Product</div><div>Features</div><div>Pricing</div><div>Changelog</div></div>
          <div className="space-y-1.5"><div className="font-semibold opacity-100">Company</div><div>About</div><div>Careers</div><div>Press</div></div>
          <div className="space-y-1.5"><div className="font-semibold opacity-100">Legal</div><div>Terms</div><div>Privacy</div><div>Security</div></div>
        </div>
      </div>
      <p className="mt-6 text-xs text-neutral-500">© 2026 Northwind, Inc. All rights reserved.</p>
    </footer>
  );
}
