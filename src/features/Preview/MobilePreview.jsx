import { useState } from 'react';
import { Button, Card, Badge, Tag, Heading, Paragraph, Icon } from '../../components/common';

const TABS = [
  { key: 'home',    label: 'Home',    icon: 'sparkle' },
  { key: 'chat',    label: 'Chat',    icon: 'json' },
  { key: 'profile', label: 'Profile', icon: 'palette' },
];

export default function MobilePreview({ theme }) {
  const dark = theme === 'dark';
  return (
    <div className={`min-h-full px-6 py-12 ${dark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-100 text-neutral-900'}`}>
      <div className="text-center mb-10">
        <Badge variant="brand"><Icon name="flutter" size={12} /> Native preview</Badge>
        <Heading as="h2" className="mt-3 !text-3xl">Your brand, on every device</Heading>
        <Paragraph className="mt-2 max-w-md mx-auto">
          Three tabs, one source of truth. Tap a tab on any phone to switch views.
        </Paragraph>
      </div>

      {/* Desktop: 3 phones side-by-side, each locked to one tab */}
      <div className="hidden xl:flex items-start justify-center gap-8">
        {TABS.map((t) => (
          <Phone key={t.key} dark={dark} active={t.key} locked />
        ))}
      </div>

      {/* Mobile/tablet: single phone with switchable tabs */}
      <div className="xl:hidden flex justify-center">
        <PhoneWithSwitcher dark={dark} />
      </div>
    </div>
  );
}

function PhoneWithSwitcher({ dark }) {
  const [active, setActive] = useState('home');
  return <Phone dark={dark} active={active} onTab={setActive} />;
}

function Phone({ dark, active, onTab, locked }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative rounded-[44px] p-3 shadow-2xl"
        style={{
          width: 375,
          background: dark ? '#0a0a0a' : '#1a1a1a',
          boxShadow: '0 30px 80px -20px rgba(0,0,0,0.4), 0 0 0 2px rgba(255,255,255,0.06) inset',
        }}
      >
        <div
          className={`relative overflow-hidden rounded-[32px] ${dark ? 'bg-neutral-950' : 'bg-white'}`}
          style={{ height: 700 }}
        >
          {/* Status bar */}
          <div className={`flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold ${dark ? 'text-neutral-200' : 'text-neutral-900'}`}>
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 -translate-x-1/2 h-5 w-24 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border border-current" />
              <span className="inline-block h-2.5 w-3 rounded-sm border border-current" />
              <span className="inline-block h-2 w-5 rounded-sm border border-current" />
            </span>
          </div>

          {/* Content */}
          <div className="h-[600px] overflow-y-auto px-5 pt-4 pb-2">
            {active === 'home'    && <HomeTab />}
            {active === 'chat'    && <ChatTab dark={dark} />}
            {active === 'profile' && <ProfileTab dark={dark} />}
          </div>

          {/* Tab bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 flex items-center justify-around border-t pt-2 pb-5 ${
              dark ? 'border-neutral-800 bg-neutral-950/90' : 'border-neutral-200 bg-white/90'
            } backdrop-blur`}
          >
            {TABS.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  disabled={locked}
                  onClick={() => onTab && onTab(t.key)}
                  className="flex flex-col items-center gap-0.5 px-3 py-1"
                  style={isActive ? { color: 'var(--brand-600)' } : { color: dark ? '#737373' : '#9ca3af' }}
                >
                  <Icon name={t.icon} size={20} />
                  <span className="text-[10px] font-semibold">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Home indicator */}
          <div className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-32 rounded-full bg-black/70 dark:bg-white/40" />
        </div>
      </div>
      {locked && (
        <Tag className="capitalize">{active}</Tag>
      )}
    </div>
  );
}

function HomeTab() {
  const kpis = [
    { label: 'Steps',     value: '8,421', delta: '+12%' },
    { label: 'Calories',  value: '1,840', delta: '+4%' },
  ];
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--brand-600)' }}>
          Tuesday · May 5
        </p>
        <h3 className="text-2xl font-bold mt-0.5">Hey, Rahul 👋</h3>
        <Paragraph size="sm" className="mt-1">You're 76% to your daily goal.</Paragraph>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl p-4 text-white"
            style={{ background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))' }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{k.label}</div>
            <div className="text-2xl font-bold tabular-nums mt-1">{k.value}</div>
            <div className="mt-1 text-[11px] opacity-90">{k.delta} vs yesterday</div>
          </div>
        ))}
      </div>

      <Card className="!p-4">
        <div className="flex items-center justify-between mb-2">
          <Heading as="h5">Today's plan</Heading>
          <Badge variant="brand">3 left</Badge>
        </div>
        <ul className="space-y-2 text-sm">
          {['Stand-up at 9:30', 'Design review at 11:00', 'Ship v2.4 by 4pm'].map((it) => (
            <li key={it} className="flex items-center gap-2">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{ background: 'var(--brand-500)' }}
              >
                <Icon name="check" size={11} strokeWidth={2.4} />
              </span>
              {it}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="brand" size="sm">+ Log workout</Button>
        <Button variant="outline" size="sm">View week</Button>
      </div>
    </div>
  );
}

function ChatTab({ dark }) {
  const messages = [
    { from: 'them', who: 'Maya', text: 'Hey! Did you ship the new palette feature yet?' },
    { from: 'me',   text: 'Just merged it 5 mins ago. Going live in prod tonight.' },
    { from: 'them', who: 'Maya', text: 'Amazing 🎉 Customers will love it.' },
    { from: 'me',   text: 'Thanks! Couldn\'t have done it without your review.' },
    { from: 'them', who: 'Maya', text: 'Want to grab coffee tomorrow to celebrate?' },
    { from: 'me',   text: 'Absolutely. 10am at the usual spot?' },
  ];
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'var(--brand-500)' }}>M</span>
        <div className="flex-1">
          <div className="text-sm font-semibold">Maya Chen</div>
          <div className="text-[11px]" style={{ color: 'var(--brand-600)' }}>● Online now</div>
        </div>
        <Icon name="search" size={18} />
      </div>

      <div className="flex-1 overflow-y-auto py-3 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                m.from === 'me'
                  ? 'text-white rounded-br-sm'
                  : `rounded-bl-sm ${dark ? 'bg-neutral-800 text-neutral-100' : 'bg-neutral-100 text-neutral-900'}`
              }`}
              style={m.from === 'me' ? { background: 'var(--brand-600)' } : undefined}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className={`flex items-center gap-2 rounded-full px-4 py-2 mb-2 ${dark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
        <span className="text-xs flex-1 text-neutral-500">Type a message…</span>
        <button
          className="h-7 w-7 rounded-full flex items-center justify-center text-white"
          style={{ background: 'var(--brand-600)' }}
        >
          <Icon name="arrow" size={14} />
        </button>
      </div>
    </div>
  );
}

function ProfileTab({ dark }) {
  const stats = [['142', 'Posts'], ['8.2k', 'Followers'], ['324', 'Following']];
  const settings = [
    { i: 'palette', l: 'Appearance' },
    { i: 'tokens',  l: 'Notifications' },
    { i: 'json',    l: 'Privacy' },
    { i: 'css',     l: 'Storage' },
    { i: 'less',    l: 'Help & support' },
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center text-center pt-2">
        <div
          className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
          style={{
            background: 'linear-gradient(135deg, var(--brand-400), var(--brand-700))',
            boxShadow: '0 0 0 4px color-mix(in srgb, var(--brand-300) 60%, transparent)',
          }}
        >
          R
        </div>
        <h3 className="mt-3 text-xl font-bold">Rahul Raj</h3>
        <Paragraph size="sm" className="!mt-0.5">Designer · Builder</Paragraph>
        <Button variant="brand" size="sm" className="mt-3">Edit profile</Button>
      </div>

      <div className={`grid grid-cols-3 rounded-2xl ${dark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
        {stats.map(([v, l]) => (
          <div key={l} className="py-3 text-center">
            <div className="text-lg font-bold tabular-nums" style={{ color: 'var(--brand-600)' }}>{v}</div>
            <div className="text-[11px] text-neutral-500">{l}</div>
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {settings.map((s) => (
          <button
            key={s.l}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm ${
              dark ? 'hover:bg-neutral-900' : 'hover:bg-neutral-100'
            }`}
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: 'var(--brand-500)' }}
            >
              <Icon name={s.i} size={14} />
            </span>
            <span className="flex-1">{s.l}</span>
            <Icon name="arrow" size={14} className="text-neutral-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
