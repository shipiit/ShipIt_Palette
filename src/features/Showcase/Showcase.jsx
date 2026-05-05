import { useState } from 'react';
import {
  Button, Input, Textarea, Card, Badge, Tag, Tooltip, Dropdown,
  MultiSelect, SearchableDropdown, Toggle, Paragraph, Heading, Modal, Icon,
} from '../../components/common';

function PreviewBlock({ label, theme, children }) {
  const dark = theme === 'dark';
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${dark ? 'border-neutral-800 bg-neutral-950 text-neutral-100' : 'border-neutral-200 bg-white text-neutral-900'}`}>
      <div className={`flex items-center justify-between border-b px-4 py-2 text-xs font-semibold ${dark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'}`}>
        <span>{label}</span>
        <span className="rounded-full px-2 py-0.5" style={{ background: 'var(--brand-500)', color: 'white' }}>{theme.toUpperCase()}</span>
      </div>
      <div className={`p-5 ${dark ? 'dark' : ''}`}>{children}</div>
    </div>
  );
}

function ShowcaseInner() {
  const [text, setText] = useState('');
  const [drop, setDrop] = useState('Option B');
  const [tags, setTags] = useState(['React', 'Vite']);
  const [search, setSearch] = useState('emerald');
  const [toggleOn, setToggleOn] = useState(true);
  const [modal, setModal] = useState(false);

  const dropOptions = ['Option A', 'Option B', 'Option C'];
  const multiOptions = ['React', 'Vite', 'Next.js', 'Tailwind', 'Astro'];
  const searchOptions = ['amber','emerald','sapphire','ruby','onyx','jade','coral','indigo','rose','pearl'];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="brand">Primary action</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Tooltip content="Click for fun"><Button variant="brand" size="sm">Hover me</Button></Tooltip>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="brand">New</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Failed</Badge>
        <Badge variant="outline">Draft</Badge>
        <Tag>Cricket</Tag>
        <Tag onRemove={() => {}}>Removable</Tag>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Email" placeholder="you@example.com" leftIcon={<Icon name="search" />} value={text} onChange={(e)=>setText(e.target.value)} />
        <Input label="Password" type="password" placeholder="••••••••" hint="At least 8 characters" />
        <Dropdown label="Choose option" value={drop} onChange={setDrop} options={dropOptions} />
        <MultiSelect label="Tech stack" value={tags} onChange={setTags} options={multiOptions} />
        <SearchableDropdown label="Search a color name" value={search} onChange={setSearch} options={searchOptions} />
        <Textarea label="Notes" placeholder="Tell us something…" rows={3} />
      </div>

      <Card accent>
        <Heading as="h3" accent>This card uses your brand color</Heading>
        <Paragraph className="mt-2">
          Every component on this page recolors itself the moment you change the color picker above.
          Buttons, focus rings, badges, tags, dropdown checks, tooltip backgrounds, modal accents — all
          driven by the same CSS variables: <code className="font-mono text-xs px-1 rounded bg-neutral-100 dark:bg-neutral-800">--brand-50</code> through
          <code className="font-mono text-xs px-1 rounded bg-neutral-100 dark:bg-neutral-800"> --brand-950</code>.
        </Paragraph>
        <div className="mt-3 flex items-center gap-3">
          <Toggle checked={toggleOn} onChange={setToggleOn} label="Notifications" />
          <Button variant="brand" size="sm" onClick={() => setModal(true)}>Open modal</Button>
        </div>
      </Card>

      <Modal open={modal} onClose={() => setModal(false)} title="Live brand modal" size="md"
        footer={<>
          <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
          <Button variant="brand" onClick={() => setModal(false)}>Confirm</Button>
        </>}
      >
        <Paragraph>
          This modal also uses your selected color. Pick a new shade and reopen — every accent, focus ring,
          and dot updates instantly.
        </Paragraph>
        <div className="mt-4">
          <Input label="Type something" placeholder="brand colors look great" />
        </div>
      </Modal>
    </div>
  );
}

export default function Showcase({ embedded = false }) {
  return (
    <div className="space-y-4">
      {!embedded && (
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Live UI Showcase</p>
            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">All common components in your color</h3>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PreviewBlock label="Light theme" theme="light"><ShowcaseInner /></PreviewBlock>
        <PreviewBlock label="Dark theme" theme="dark"><ShowcaseInner /></PreviewBlock>
      </div>
    </div>
  );
}
