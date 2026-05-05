import { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Card from '../../components/common/Card.jsx';
import Tag from '../../components/common/Tag.jsx';
import Badge from '../../components/common/Badge.jsx';
import Heading from '../../components/common/Heading.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import { nearestColorName } from '../../lib/color.js';

const VIBES = {
  forest:    { hex: '#2d5016', name: 'Forest Floor' },
  woods:     { hex: '#3a5a40', name: 'Deep Woods' },
  pine:      { hex: '#1f3a2e', name: 'Pine Needle' },
  moss:      { hex: '#606c38', name: 'Mossy Stone' },
  meadow:    { hex: '#84a98c', name: 'Spring Meadow' },
  spring:    { hex: '#a7c957', name: 'Spring Bud' },
  cabin:     { hex: '#7f5539', name: 'Pine Cabin' },
  wood:      { hex: '#8b5a2b', name: 'Aged Wood' },
  ocean:     { hex: '#006994', name: 'Open Ocean' },
  sea:       { hex: '#0077b6', name: 'Calm Sea' },
  midnight:  { hex: '#03045e', name: 'Midnight Tide' },
  sky:       { hex: '#48cae4', name: 'Open Sky' },
  ice:       { hex: '#caf0f8', name: 'Ice Sheet' },
  winter:    { hex: '#cad2c5', name: 'Winter Morning' },
  snow:      { hex: '#e9ecef', name: 'Fresh Snow' },
  frost:     { hex: '#dfe7fd', name: 'Frosted Glass' },
  sunset:    { hex: '#f97316', name: 'Sunset Glow' },
  sunrise:   { hex: '#ffb703', name: 'Morning Sunrise' },
  beach:     { hex: '#ffc8a2', name: 'Sandy Beach' },
  sand:      { hex: '#e7d2a4', name: 'Warm Sand' },
  desert:    { hex: '#c08552', name: 'Desert Dune' },
  fire:      { hex: '#dc2f02', name: 'Open Flame' },
  ember:     { hex: '#9d0208', name: 'Burning Ember' },
  neon:      { hex: '#00ffff', name: 'Neon Pulse' },
  arcade:    { hex: '#ff006e', name: 'Arcade Glow' },
  cyber:     { hex: '#7209b7', name: 'Cyber Night' },
  retro:     { hex: '#ef476f', name: 'Retro Wave' },
  pastel:    { hex: '#ffd6e0', name: 'Pastel Bloom' },
  lavender:  { hex: '#a78bfa', name: 'Lavender Field' },
  rose:      { hex: '#f43f5e', name: 'Garden Rose' },
  cherry:    { hex: '#b71c1c', name: 'Wild Cherry' },
  berry:     { hex: '#7b2cbf', name: 'Wild Berry' },
  mint:      { hex: '#98ff98', name: 'Cool Mint' },
  lime:      { hex: '#bfff00', name: 'Lime Slice' },
  lemon:     { hex: '#fff44f', name: 'Lemon Zest' },
  honey:     { hex: '#f59e0b', name: 'Wild Honey' },
  coffee:    { hex: '#6f4e37', name: 'Coffee Bean' },
  chocolate: { hex: '#3e2723', name: 'Dark Chocolate' },
  steel:     { hex: '#64748b', name: 'Brushed Steel' },
  charcoal:  { hex: '#36454f', name: 'Charcoal Smoke' },
  storm:     { hex: '#495057', name: 'Storm Cloud' },
  rain:      { hex: '#6c757d', name: 'Soft Rain' },
};

const FALLBACK_KEYS = ['ocean', 'sunset', 'forest', 'lavender', 'mint', 'rose', 'sky', 'honey', 'arcade', 'storm'];

const QUICK_VIBES = ['forest cabin', 'neon arcade', 'sunset beach', 'winter morning', 'spring meadow', 'midnight ocean'];

function scoreVibe(input, key) {
  if (!input) return 0;
  const i = input.toLowerCase();
  const k = key.toLowerCase();
  if (i.includes(k)) return k.length;
  if (k.includes(i) && i.length >= 3) return Math.max(1, i.length - 1);
  return 0;
}

function pickSuggestions(input) {
  const trimmed = (input || '').trim();
  const scored = Object.entries(VIBES).map(([k, v]) => ({ key: k, ...v, score: scoreVibe(trimmed, k) }));
  const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);

  if (matched.length >= 6) return matched.slice(0, 6);

  if (matched.length === 0 && trimmed.length === 0) {
    return FALLBACK_KEYS.slice(0, 6).map((k) => ({ key: k, ...VIBES[k] }));
  }

  const taken = new Set(matched.map((m) => m.key));
  const pool = FALLBACK_KEYS.filter((k) => !taken.has(k));
  // pseudo-random shuffle seeded by input length
  const seeded = [...pool].sort((a, b) => ((a.charCodeAt(0) + trimmed.length) % 7) - ((b.charCodeAt(0) + trimmed.length) % 7));
  const out = [...matched];
  for (const k of seeded) {
    if (out.length >= 6) break;
    out.push({ key: k, ...VIBES[k] });
  }
  return out.slice(0, 6);
}

function SuggestionCard({ s, onPick }) {
  const nearest = nearestColorName(s.hex);
  return (
    <Card className="!p-3 flex flex-col gap-2">
      <div
        className="h-24 w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
        style={{ background: s.hex }}
        aria-label={`Swatch ${s.name}`}
      />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{s.name}</div>
          <div className="text-[11px] text-neutral-500 font-mono">{s.hex}</div>
        </div>
        <Badge variant="outline">{nearest}</Badge>
      </div>
      <Button size="sm" variant="brand" onClick={() => onPick?.(s.hex)}>Use this</Button>
    </Card>
  );
}

export default function AINamingModal({ open, onClose, onPick }) {
  const [vibe, setVibe] = useState('');

  useEffect(() => { if (open) setVibe(''); }, [open]);

  const suggestions = useMemo(() => pickSuggestions(vibe), [vibe]);

  const handlePick = (hex) => {
    onPick?.(hex);
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title="AI Naming — Vibe to Color" size="lg"
      footer={<Button variant="ghost" onClick={onClose}>Close</Button>}
    >
      <div className="space-y-5">
        <div>
          <Heading as="h4" className="mb-1">Describe the vibe</Heading>
          <Paragraph>Type any mood, place, or feeling. We'll match keywords to suggested base colors.</Paragraph>
        </div>

        <Input
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
          placeholder="e.g. forest cabin, neon arcade, sunset beach…"
          className="text-base"
        />

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-neutral-500 self-center mr-1">Try:</span>
          {QUICK_VIBES.map((v) => (
            <button key={v} onClick={() => setVibe(v)} className="focus:outline-none">
              <Tag>{v}</Tag>
            </button>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Heading as="h4">Suggestions</Heading>
            <span className="text-xs text-neutral-500">
              {vibe.trim() ? `${suggestions.filter(s => scoreVibe(vibe, s.key) > 0).length} match${suggestions.filter(s => scoreVibe(vibe, s.key) > 0).length === 1 ? '' : 'es'}` : 'curated picks'}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {suggestions.map((s) => (
              <SuggestionCard key={s.key} s={s} onPick={handlePick} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
