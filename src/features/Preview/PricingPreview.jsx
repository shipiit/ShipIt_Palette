import { useState } from 'react';
import { Button, Card, Badge, Heading, Paragraph, Icon, Toggle } from '../../components/common';

const PLANS = [
  { name: 'Starter', monthly: 0,   yearly: 0,   features: ['1 project', 'Community support', 'Basic analytics', '500 MB storage'] },
  { name: 'Pro',     monthly: 24,  yearly: 19,  featured: true, features: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Custom domains', '50 GB storage'] },
  { name: 'Team',    monthly: 99,  yearly: 79,  features: ['Everything in Pro', 'SSO + SAML', 'Audit log', 'Dedicated CSM', '500 GB storage'] },
];

const COMPARE_ROWS = [
  ['Projects',           '1', 'Unlimited', 'Unlimited'],
  ['Team members',       '1', '5',         'Unlimited'],
  ['Custom domain',      false, true, true],
  ['Analytics',          'Basic', 'Advanced', 'Advanced + Cohorts'],
  ['SSO & SAML',         false, false, true],
  ['Audit log',          false, false, true],
  ['Priority support',   false, true, true],
  ['Dedicated CSM',      false, false, true],
];

const FAQS = [
  ['Can I cancel anytime?', 'Yes — cancel from your dashboard, no questions asked.'],
  ['Do you offer refunds?', '30-day money-back guarantee, no hassle.'],
  ['What payment methods?', 'All major credit cards, ACH, and invoicing on annual.'],
  ['Education discount?',   '50% off for verified students and educators.'],
];

export default function PricingPreview({ theme }) {
  const dark = theme === 'dark';
  const [yearly, setYearly] = useState(false);
  return (
    <div className={`px-8 py-14 ${dark ? 'bg-neutral-950 text-neutral-100' : 'bg-white text-neutral-900'}`}>
      <Hero yearly={yearly} setYearly={setYearly} />
      <Plans yearly={yearly} />
      <Compare dark={dark} />
      <Testimonial />
      <FAQList dark={dark} />
      <CTA />
    </div>
  );
}

function Hero({ yearly, setYearly }) {
  return (
    <div className="text-center mb-10">
      <Badge variant="brand"><Icon name="sparkle" size={12} /> Simple pricing</Badge>
      <Heading as="h2" className="mt-3 !text-4xl">Pick the plan that fits</Heading>
      <Paragraph className="mt-3 max-w-xl mx-auto">Always upgrade or downgrade. No hidden fees.</Paragraph>
      <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2">
        <span className={`text-sm ${!yearly ? 'font-semibold' : 'opacity-60'}`}>Monthly</span>
        <Toggle checked={yearly} onChange={setYearly} />
        <span className={`text-sm ${yearly ? 'font-semibold' : 'opacity-60'}`}>Yearly</span>
        <Badge variant="success">Save 20%</Badge>
      </div>
    </div>
  );
}

function Plans({ yearly }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
      {PLANS.map((p) => {
        const price = yearly ? p.yearly : p.monthly;
        const featured = p.featured;
        return (
          <div
            key={p.name}
            className="relative rounded-3xl border p-7 transition hover:-translate-y-1 bg-white dark:bg-neutral-900"
            style={featured ? {
              borderColor: 'var(--brand-500)',
              boxShadow: '0 20px 60px -20px var(--brand-500)',
              background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand-100) 70%, transparent), white)',
            } : { borderColor: 'rgb(229 229 229)' }}
          >
            {featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[11px] font-bold text-white" style={{ background: 'var(--brand-600)' }}>
                MOST POPULAR
              </span>
            )}
            <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--brand-600)' }}>{p.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight">${price}</span>
              <span className="text-neutral-500">{price === 0 ? '/forever' : yearly ? '/mo, billed yearly' : '/month'}</span>
            </div>
            <Button variant={featured ? 'brand' : 'secondary'} className="mt-6 w-full">Get {p.name} <Icon name="arrow" /></Button>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: 'var(--brand-500)' }}>
                    <Icon name="check" size={11} strokeWidth={2.4} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Compare({ dark }) {
  return (
    <Card className="mt-14 max-w-5xl mx-auto !p-0 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
        <Heading as="h3">Compare plans</Heading>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-3 px-6 font-medium text-neutral-500"></th>
              <th className="py-3 px-6 font-semibold">Starter</th>
              <th className="py-3 px-6 font-semibold" style={{ color: 'var(--brand-700)' }}>Pro</th>
              <th className="py-3 px-6 font-semibold">Team</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((r) => (
              <tr key={r[0]} className="border-t border-neutral-100 dark:border-neutral-800">
                <td className="py-3 px-6 font-medium">{r[0]}</td>
                {r.slice(1).map((cell, i) => (
                  <td key={i} className="py-3 px-6">
                    {typeof cell === 'boolean'
                      ? (cell
                          ? <span className="flex h-5 w-5 items-center justify-center rounded-full text-white" style={{ background: 'var(--brand-500)' }}><Icon name="check" size={11} strokeWidth={2.4}/></span>
                          : <span className="text-neutral-400">—</span>)
                      : <span>{cell}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function Testimonial() {
  return (
    <Card accent className="mt-14 max-w-3xl mx-auto text-center">
      <div className="text-3xl mb-2" style={{ color: 'var(--brand-500)' }}>"</div>
      <Paragraph size="lg" className="font-medium">
        Switching to Pro paid for itself within the first week. We ship faster, and our customers notice.
      </Paragraph>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-9 w-9 rounded-full" style={{ background: 'var(--brand-500)' }} />
        <div className="text-left">
          <div className="text-sm font-semibold">Maya Chen</div>
          <div className="text-xs text-neutral-500">CTO, Linear</div>
        </div>
      </div>
    </Card>
  );
}

function FAQList({ dark }) {
  return (
    <div className="mt-14 max-w-3xl mx-auto">
      <Heading as="h3" className="text-center mb-6">Frequently asked</Heading>
      <div className="space-y-2">
        {FAQS.map(([q, a], i) => (
          <details key={i} className={`group rounded-xl border px-4 py-3 ${dark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              {q}
              <span className="text-xl transition group-open:rotate-45" style={{ color: 'var(--brand-500)' }}>+</span>
            </summary>
            <Paragraph size="sm" className="mt-2">{a}</Paragraph>
          </details>
        ))}
      </div>
    </div>
  );
}

function CTA() {
  return (
    <div className="mt-14 max-w-3xl mx-auto text-center text-white rounded-3xl p-10" style={{ background: 'linear-gradient(135deg, var(--brand-600), var(--brand-800))' }}>
      <Heading as="h3" className="!text-white">Still not sure?</Heading>
      <Paragraph className="!text-white/90 mt-2">Talk to a human — no sales pitch, just answers.</Paragraph>
      <Button variant="secondary" size="lg" className="mt-5">Book a 15-min demo</Button>
    </div>
  );
}
