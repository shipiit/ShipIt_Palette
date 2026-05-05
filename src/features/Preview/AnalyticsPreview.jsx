import { Button, Card, Badge, Dropdown, Heading, Paragraph, Icon } from '../../components/common';
import { useState } from 'react';
import { LineChart, Donut, Sparkline, Bars } from './_charts.jsx';

const TRAFFIC = [120, 142, 138, 165, 180, 175, 210, 245, 230, 275, 310, 340];

export default function AnalyticsPreview({ theme }) {
  const dark = theme === 'dark';
  return (
    <div className={`min-h-full p-6 space-y-5 ${dark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      <Header />
      <KPIRow />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <TrafficChart theme={theme} />
        <DevicesCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopPagesCard />
        <FunnelCard />
      </div>
      <HourlyCard />
    </div>
  );
}

function Header() {
  const [prop, setProp] = useState('all');
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <Badge variant="brand">Analytics</Badge>
        <Heading as="h2" className="mt-1.5">Performance overview</Heading>
        <Paragraph size="sm">Last 30 days · all properties</Paragraph>
      </div>
      <div className="flex items-end gap-2">
        <div className="w-48">
          <Dropdown value={prop} onChange={setProp} options={[
            { value:'all', label:'All properties'},
            { value:'mkt', label:'Marketing site'},
            { value:'app', label:'App'},
          ]} />
        </div>
        <Button variant="brand"><Icon name="download" /> Export</Button>
      </div>
    </header>
  );
}

function KPIRow() {
  const k = [
    { l: 'Page views', v: '348,290', d: '+18.4%', sp: TRAFFIC.slice(-8) },
    { l: 'Unique visitors', v: '94,120', d: '+11.2%', sp: [22,28,32,30,42,48,55,60] },
    { l: 'Bounce rate', v: '32.1%', d: '-2.4%', sp: [42,40,38,36,34,32,33,32] },
    { l: 'Avg. session', v: '3m 42s', d: '+0.8%', sp: [180,190,195,200,210,215,220,222] },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {k.map((it) => (
        <Card key={it.l} className="!p-4">
          <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-500">{it.l}</div>
          <div className="mt-1.5 flex items-end justify-between">
            <span className="text-2xl font-bold tabular-nums">{it.v}</span>
            <Sparkline data={it.sp} />
          </div>
          <Badge variant="brand" className="mt-1">{it.d}</Badge>
        </Card>
      ))}
    </div>
  );
}

function TrafficChart({ theme }) {
  return (
    <Card className="xl:col-span-2">
      <div className="flex items-center justify-between mb-3">
        <Heading as="h4">Traffic over time</Heading>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: 'var(--brand-600)' }} /> Visitors</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: 'var(--brand-300)' }} /> Sessions</span>
        </div>
      </div>
      <LineChart data={TRAFFIC} theme={theme} height={200} />
    </Card>
  );
}

function DevicesCard() {
  return (
    <Card>
      <Heading as="h4" className="mb-2">Devices</Heading>
      <div className="flex items-center gap-4">
        <Donut values={[62, 28, 10]} labels={['Desktop','Mobile','Tablet']} size={140} />
        <ul className="space-y-1.5 text-xs flex-1">
          {[['Desktop',62,'500'],['Mobile',28,'400'],['Tablet',10,'600']].map(([n,v,s]) => (
            <li key={n} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: `var(--brand-${s})` }} />
              <span className="flex-1">{n}</span>
              <span className="font-mono tabular-nums">{v}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function TopPagesCard() {
  const rows = [
    ['/blog/intro-to-design', 12842, 92],
    ['/pricing', 8214, 78],
    ['/docs/getting-started', 6429, 65],
    ['/changelog', 4128, 45],
    ['/about', 3201, 30],
  ];
  return (
    <Card>
      <Heading as="h4" className="mb-3">Top pages</Heading>
      <div className="space-y-2">
        {rows.map(([path, views, w]) => (
          <div key={path} className="flex items-center gap-3 text-sm">
            <span className="font-mono text-xs flex-1 truncate">{path}</span>
            <span className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'color-mix(in srgb, var(--brand-500) 14%, transparent)' }}>
              <span className="block h-full" style={{ width: `${w}%`, background: 'var(--brand-500)' }} />
            </span>
            <span className="font-mono text-xs tabular-nums w-16 text-right">{views.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FunnelCard() {
  const steps = [['Visited',100],['Added to cart',62],['Started checkout',38],['Completed',24]];
  return (
    <Card>
      <Heading as="h4" className="mb-3">Funnel · checkout</Heading>
      <div className="space-y-2.5">
        {steps.map(([step, pct], i) => (
          <div key={step}>
            <div className="flex justify-between text-xs">
              <span>{step}</span><span className="font-mono tabular-nums">{pct}%</span>
            </div>
            <div className="mt-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,.06)' }}>
              <span className="block h-full" style={{ width: `${pct}%`, background: `var(--brand-${500 + i*100})` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HourlyCard() {
  return (
    <Card>
      <Heading as="h4" className="mb-3">Hourly distribution · last 7 days</Heading>
      <Bars data={[3,2,2,1,2,3,8,15,22,28,32,30,28,26,30,34,38,42,38,30,22,18,12,6]} height={120} />
      <div className="mt-2 flex justify-between text-[10px] text-neutral-500">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
      </div>
    </Card>
  );
}
