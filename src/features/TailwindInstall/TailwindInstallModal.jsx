import { useMemo, useState } from 'react';
import Modal from '../../components/common/Modal.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import Heading from '../../components/common/Heading.jsx';
import Paragraph from '../../components/common/Paragraph.jsx';
import Badge from '../../components/common/Badge.jsx';
import Icon from '../../components/common/Icon.jsx';
import CodeBlock from '../../components/common/CodeBlock.jsx';
import Dropdown from '../../components/common/Dropdown.jsx';
import { useToast } from '../../components/common/Toast.jsx';

const VARIANTS = [
  { value: 'vite', label: 'Vite' },
  { value: 'next', label: 'Next.js' },
  { value: 'postcss', label: 'PostCSS' },
];

const INSTALL_CMD = {
  vite: 'npm install -D tailwindcss @tailwindcss/vite',
  next: 'npm install -D tailwindcss @tailwindcss/postcss postcss',
  postcss: 'npm install -D tailwindcss @tailwindcss/postcss postcss',
};

const INSTALL_HINT = {
  vite: 'Adds Tailwind v4 with the Vite plugin.',
  next: 'Adds Tailwind v4 + the PostCSS plugin used by Next.js App Router.',
  postcss: 'Generic PostCSS setup for any bundler.',
};

const safeName = (n) => (n || 'brand').toString().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'brand';

function buildThemeBlock(palette, name) {
  const slug = safeName(name);
  const lines = palette.map((s) => `  --color-${slug}-${s.label}: ${s.hex};`).join('\n');
  return `@import "tailwindcss";\n\n@theme {\n${lines}\n}\n`;
}

function buildExample(name) {
  const slug = safeName(name);
  return `<button class="bg-${slug}-600 text-white hover:bg-${slug}-700 dark:bg-${slug}-500 dark:hover:bg-${slug}-400 px-4 py-2 rounded-lg">
  Click me
</button>

<div class="bg-${slug}-50 text-${slug}-900 dark:bg-${slug}-950 dark:text-${slug}-100 p-4 rounded-xl">
  Tinted surface
</div>`;
}

export default function TailwindInstallModal({ open, onClose, palette = [], name = 'brand' }) {
  const [variant, setVariant] = useState('vite');
  const { toast } = useToast();

  const installCmd = INSTALL_CMD[variant];
  const themeBlock = useMemo(() => buildThemeBlock(palette, name), [palette, name]);
  const example = useMemo(() => buildExample(name), [name]);

  const copy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast(`Copied ${label}`);
  };

  const oneLiner = `# 1) Install\n${installCmd}\n\n/* 2) Add to your stylesheet (e.g. src/index.css) */\n${themeBlock}\n/* 3) Use the classes */\n${example}\n`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Install "${name}" into a Tailwind v4 project`}
      size="xl"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="brand" onClick={() => copy(oneLiner, 'install one-liner')}>
            <Icon name="copy" /> Copy install one-liner
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div className="min-w-0">
          <Heading as="h3" accent>3-step Tailwind v4 setup</Heading>
          <Paragraph size="sm" className="mt-1">
            Follow the steps below to wire your <span className="font-semibold">{name}</span> palette
            into a Tailwind v4 project. Switch the framework variant to match your stack.
          </Paragraph>
        </div>
        <div className="w-full max-w-[200px]">
          <Dropdown
            label="Framework variant"
            value={variant}
            onChange={setVariant}
            options={VARIANTS}
          />
        </div>
      </div>

      <div className="space-y-4">
        <StepCard
          n={1}
          title="Install Tailwind"
          hint={INSTALL_HINT[variant]}
          code={installCmd}
          lang="js"
          onCopy={() => copy(installCmd, 'install command')}
          badge={VARIANTS.find((v) => v.value === variant)?.label}
        />
        <StepCard
          n={2}
          title="Add to your stylesheet"
          hint={`Paste into your global CSS (e.g. ${variant === 'next' ? 'app/globals.css' : 'src/index.css'}).`}
          code={themeBlock}
          lang="css"
          onCopy={() => copy(themeBlock, '@theme block')}
        />
        <StepCard
          n={3}
          title="Use the classes"
          hint={`Tailwind generates utilities like bg-${safeName(name)}-600, text-${safeName(name)}-50, etc.`}
          code={example}
          lang="html"
          onCopy={() => copy(example, 'example markup')}
        />
      </div>
    </Modal>
  );
}

function StepCard({ n, title, hint, code, lang, onCopy, badge }) {
  return (
    <Card className="overflow-hidden" padded={false}>
      <div className="flex items-start gap-4 p-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ background: 'var(--brand-600)' }}
        >
          {n}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Heading as="h4">{title}</Heading>
            {badge && <Badge variant="brand">{badge}</Badge>}
          </div>
          <Paragraph size="sm" className="mt-1">{hint}</Paragraph>
        </div>
        <Button size="sm" variant="outline" onClick={onCopy}>
          <Icon name="copy" size={14} /> Copy
        </Button>
      </div>
      <div className="border-t border-neutral-100 dark:border-neutral-800">
        <CodeBlock code={code} lang={lang} maxHeight="16rem" className="rounded-none" />
      </div>
    </Card>
  );
}
