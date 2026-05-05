import { Button, Card, Badge, Input, Dropdown, Toggle, Tag, Tooltip, Heading, Paragraph, Icon } from '../../components/common';
import { useState } from 'react';
import { LineChart, Donut, Sparkline, Bars } from './_charts.jsx';

const REVENUE = [42, 55, 47, 68, 75, 64, 82, 90, 78, 95, 110, 124];

export default function DashboardPreview({ theme }) {
  const dark = theme === 'dark';
  return (
    <div className={`flex min-h-full ${dark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      <Sidebar dark={dark} />
      <main className="flex-1 p-6 space-y-5 overflow-x-hidden">
        <Topbar />
        <KpiRow />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Heading as="h4">Revenue · last 12 months</Heading>
                <Paragraph size="sm" className="mt-0.5">$1.2M · +24% YoY</Paragraph>
              </div>
              <RangeTabs />
            </div>
            <LineChart data={REVENUE} theme={theme} />
          </Card>
          <Card>
            <Heading as="h4" className="mb-2">Traffic sources</Heading>
            <div className="flex items-center gap-4">
              <Donut values={[42, 28, 18, 12]} labels={['Direct','Search','Social','Email']} />
              <ul className="space-y-1.5 text-xs flex-1">
                {[['Direct',42,'500'],['Search',28,'400'],['Social',18,'600'],['Email',12,'700']].map(([n,v,s]) => (
                  <li key={n} className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--brand-${s})` }} />
                    <span className="flex-1">{n}</span>
                    <span className="font-mono tabular-nums">{v}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        <Timeline />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <OrdersTable />
          <FormCard />
        </div>
        <SmallKpiRow />
      </main>
    </div>
  );
}

function Sidebar({ dark }) {
  const items = [
    { i: 'sparkle', l: 'Overview', active: true },
    { i: 'tokens',  l: 'Analytics', badge: '12' },
    { i: 'palette', l: 'Customers' },
    { i: 'css',     l: 'Reports' },
    { i: 'json',    l: 'Integrations' },
    { i: 'flutter', l: 'Mobile app' },
    { i: 'less',    l: 'Settings' },
  ];
  return (
    <aside className={`hidden md:flex w-56 flex-col border-r ${dark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-white'}`}>
      <div className="p-5 font-bold flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ background: 'var(--brand-500)' }}><Icon name="palette" size={14} /></span>
        Acme Studio
      </div>
      <nav className="px-3 py-2 space-y-1 text-sm">
        {items.map((it) => (
          <button key={it.l}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left"
            style={it.active ? { background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)', color: 'var(--brand-700)' } : {}}
          >
            <Icon name={it.i} size={14} />
            <span className="flex-1">{it.l}</span>
            {it.badge && <Badge variant="brand">{it.badge}</Badge>}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-3">
        <Card accent className="!p-3">
          <div className="font-semibold text-sm" style={{ color: 'var(--brand-700)' }}>Upgrade to Pro</div>
          <Paragraph size="sm" className="mt-1">Unlock advanced reports & SSO.</Paragraph>
          <Button variant="brand" size="sm" className="mt-2 w-full">Upgrade</Button>
        </Card>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div>
        <Heading as="h2">Welcome back, Rahul 👋</Heading>
        <Paragraph size="sm" className="mt-0.5">Here's what's happening today</Paragraph>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-56"><Input placeholder="Search anything…" leftIcon={<Icon name="search" />} /></div>
        <Tooltip content="Notifications"><Button variant="outline" size="md"><Icon name="sparkle" /></Button></Tooltip>
        <Button variant="brand">+ New project</Button>
      </div>
    </div>
  );
}

function RangeTabs() {
  const [r, setR] = useState('12M');
  return (
    <div className="flex gap-1 rounded-lg border border-neutral-200 dark:border-neutral-800 p-0.5 text-xs">
      {['1W','1M','3M','12M','ALL'].map((t) => (
        <button key={t} onClick={() => setR(t)} className="rounded-md px-2 py-1" style={r === t ? { background: 'var(--brand-500)', color: 'white' } : {}}>{t}</button>
      ))}
    </div>
  );
}

function KpiRow() {
  const kpis = [
    { label: 'Revenue',     value: '$48,239', delta: '+12.4%', spark: [22,18,28,32,30,35,42] },
    { label: 'Active Users', value: '2,841',  delta: '+8.2%',  spark: [12,15,14,18,16,20,22] },
    { label: 'Conversion',  value: '3.42%',  delta: '+0.6%',  spark: [58,60,62,65,68,70,72] },
    { label: 'NPS',         value: '72',      delta: '+4',     spark: [10,14,12,18,16,22,28,25] },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k) => (
        <Card key={k.label} className="!p-4">
          <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-500">{k.label}</div>
          <div className="mt-1.5 flex items-end justify-between">
            <span className="text-2xl font-bold tabular-nums">{k.value}</span>
            <Sparkline data={k.spark} />
          </div>
          <Badge variant="brand" className="mt-1">{k.delta} ↗</Badge>
        </Card>
      ))}
    </div>
  );
}

function Timeline() {
  const items = [
    { t: '09:14', who: 'Maya',  what: 'shipped v2.4 to production',   tag: 'Deploy' },
    { t: '10:02', who: 'Theo',  what: 'opened pull request #234',     tag: 'Code' },
    { t: '11:20', who: 'Rahul', what: 'invited 3 teammates',          tag: 'Team' },
    { t: '12:48', who: 'Aria',  what: 'closed 12 issues',             tag: 'Issues' },
    { t: '14:15', who: 'Kai',   what: 'launched campaign "Spring"',   tag: 'Marketing' },
    { t: '16:30', who: 'Maya',  what: 'merged feature/oauth',          tag: 'Code' },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <Heading as="h4">Today's timeline</Heading>
        <Button variant="ghost" size="sm">View all <Icon name="arrow" /></Button>
      </div>
      <ol className="relative border-l-2 ml-3 space-y-4" style={{ borderColor: 'color-mix(in srgb, var(--brand-500) 30%, transparent)' }}>
        {items.map((it, i) => (
          <li key={i} className="ml-4">
            <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full ring-4 ring-white dark:ring-neutral-900" style={{ background: 'var(--brand-500)' }} />
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-xs tabular-nums" style={{ color: 'var(--brand-700)' }}>{it.t}</span>
              <span className="font-medium">{it.who}</span>
              <Paragraph size="sm" className="!leading-tight">{it.what}</Paragraph>
              <Tag className="ml-auto">{it.tag}</Tag>
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function OrdersTable() {
  const rows = [
    ['#1492', 'Linear',  'Pro',  'Active',  '$120', [10,14,18,22,28]],
    ['#1491', 'Vercel',  'Team', 'Active',  '$340', [22,18,24,28,32]],
    ['#1490', 'Stripe',  'Pro',  'Pending', '$120', [8,12,10,16,14]],
    ['#1489', 'Notion',  'Free', 'Trialing','$0',   [4,6,8,7,12]],
    ['#1488', 'Figma',   'Team', 'Active',  '$340', [15,20,22,28,30]],
  ];
  const variant = (s) => s === 'Active' ? 'brand' : s === 'Pending' ? 'warning' : 'neutral';
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <Heading as="h4">Recent orders</Heading>
        <Button variant="ghost" size="sm"><Icon name="download" /> CSV</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase font-bold tracking-wider text-neutral-500">
              <th className="pb-2">ID</th><th>Customer</th><th>Plan</th><th>Status</th><th className="text-right">Amount</th><th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-t border-neutral-100 dark:border-neutral-800">
                <td className="py-2.5 font-mono text-xs">{r[0]}</td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td><Badge variant={variant(r[3])}>{r[3]}</Badge></td>
                <td className="text-right font-mono tabular-nums">{r[4]}</td>
                <td><Sparkline data={r[5]} w={60} h={20} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function FormCard() {
  const [name, setName] = useState('Spring sale 2026');
  const [budget, setBudget] = useState('$2,400');
  const [channel, setChannel] = useState('email');
  const [notify, setNotify] = useState(true);
  return (
    <Card>
      <Heading as="h4" className="mb-3">Create campaign</Heading>
      <div className="space-y-3">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
          <Dropdown label="Channel" value={channel} onChange={setChannel}
            options={[{ value:'email', label:'Email'},{ value:'push', label:'Push'},{ value:'sms', label:'SMS'}]} />
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">Hourly distribution</p>
          <Bars data={[3,5,8,12,18,22,28,32,30,26,20,14,10,6,4]} height={56} />
        </div>
        <div className="flex items-center justify-between pt-1">
          <Toggle checked={notify} onChange={setNotify} label="Send notifications" />
          <Button variant="brand">Launch <Icon name="arrow" /></Button>
        </div>
      </div>
    </Card>
  );
}

function SmallKpiRow() {
  const items = [
    { title: 'New signups', value: '342', spark: [12,15,11,18,22,28,25,32] },
    { title: 'API calls', value: '1.4M', spark: [40,38,42,45,50,48,55,60] },
    { title: 'Errors', value: '0.04%', spark: [8,5,7,3,4,2,1,2] },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((c) => (
        <Card key={c.title} className="!p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{c.title}</div>
          <div className="mt-1 flex items-end justify-between">
            <span className="text-2xl font-bold tabular-nums">{c.value}</span>
            <Sparkline data={c.spark} />
          </div>
        </Card>
      ))}
    </div>
  );
}
