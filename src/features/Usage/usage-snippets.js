import { slugify } from '../../lib/color.js';
import { exportCSS, exportTailwindV3, exportTailwindV4 } from '../../lib/exporters.js';

export function buildSnippets({ palette, name, format }) {
  const slug = slugify(name);
  const camel = slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  const tailwindButton = (extraDark = false) => `<button class="
  inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
  bg-${slug}-600 text-white shadow-sm
  hover:bg-${slug}-700 active:bg-${slug}-800
  focus:outline-none focus:ring-2 focus:ring-${slug}-500/40
  transition${extraDark ? `\n  dark:bg-${slug}-500 dark:hover:bg-${slug}-400` : ''}
">
  Get started →
</button>`;

  const cssVars = exportCSS({ palette, name, format });
  const tw3 = exportTailwindV3({ palette, name, format });
  const tw4 = exportTailwindV4({ palette, name, format });

  return [
    {
      id: 'next',
      title: 'Next.js (App Router)',
      hint: 'Drop the CSS into globals.css, then use Tailwind classes anywhere.',
      files: [
        { name: 'app/globals.css', lang: 'css', code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${cssVars}` },
        { name: 'tailwind.config.js', lang: 'js', code: tw3.replace('module.exports = {', `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: 'class',\n  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],`) },
        { name: 'app/page.jsx', lang: 'jsx', code: nextPage(slug, name) },
      ],
    },

    {
      id: 'next-darkmode',
      title: 'Next.js · Dark Mode Setup',
      hint: 'Class-based dark mode without flicker on first paint.',
      files: [
        { name: 'tailwind.config.js', lang: 'js', code: `/** @type {import('tailwindcss').Config} */\nmodule.exports = { darkMode: 'class', content: ['./app/**/*.{js,ts,jsx,tsx}'] };\n` },
        { name: 'app/layout.jsx', lang: 'jsx', code: nextLayout() },
        { name: 'components/ThemeToggle.jsx', lang: 'jsx', code: themeToggle(slug) },
      ],
    },

    {
      id: 'react-vite',
      title: 'React + Vite',
      hint: 'Same Tailwind setup as Next.js, but with Vite.',
      files: [
        { name: 'src/index.css', lang: 'css', code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${cssVars}` },
        { name: 'tailwind.config.js', lang: 'js', code: tw3.replace('module.exports = {', `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: 'class',\n  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],`) },
        { name: 'src/App.jsx', lang: 'jsx', code: viteApp(slug, name) },
      ],
    },

    {
      id: 'tailwind-v3',
      title: 'Tailwind v3',
      hint: 'Pick your framework — Tailwind v3 with the palette extended in the config.',
      variants: [
        { id: 'react-vite', label: 'React + Vite', icon: 'js', files: [
          { name: 'tailwind.config.js', lang: 'js', code: tw3.replace('module.exports = {', `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: 'class',\n  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],`) },
          { name: 'src/index.css', lang: 'css', code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n` },
          { name: 'src/App.jsx', lang: 'jsx', code: tw3React(slug, name) },
        ]},
        { id: 'nextjs', label: 'Next.js', icon: 'sparkle', files: [
          { name: 'tailwind.config.js', lang: 'js', code: tw3.replace('module.exports = {', `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  darkMode: 'class',\n  content: ['./app/**/*.{js,ts,jsx,tsx}'],`) },
          { name: 'app/globals.css', lang: 'css', code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n` },
          { name: 'app/page.jsx', lang: 'jsx', code: tw3Next(slug, name) },
        ]},
        { id: 'html', label: 'Plain HTML', icon: 'css', files: [
          { name: 'index.html', lang: 'html', code: tw3Html(slug, name) },
        ]},
      ],
    },

    {
      id: 'tailwind-v4',
      title: 'Tailwind v4 (@theme)',
      hint: 'Tailwind v4 reads CSS variables directly inside @theme — no JS config needed.',
      variants: [
        { id: 'react-vite', label: 'React + Vite', icon: 'js', files: [
          { name: 'src/app.css', lang: 'css', code: `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));\n\n${tw4}` },
          { name: 'src/main.jsx', lang: 'jsx', code: `import './app.css';\nimport React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);\n` },
          { name: 'src/App.jsx', lang: 'jsx', code: tw4React(slug, name) },
        ]},
        { id: 'nextjs', label: 'Next.js', icon: 'sparkle', files: [
          { name: 'app/globals.css', lang: 'css', code: `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));\n\n${tw4}` },
          { name: 'app/page.jsx', lang: 'jsx', code: tw4Next(slug, name) },
        ]},
        { id: 'html', label: 'Plain HTML', icon: 'css', files: [
          { name: 'app.css', lang: 'css', code: `@import "tailwindcss";\n@custom-variant dark (&:where(.dark, .dark *));\n\n${tw4}` },
          { name: 'index.html', lang: 'html', code: tw4Html(slug, name) },
        ]},
        { id: 'darkmode', label: 'Dark Mode JS', icon: 'moon', files: [
          { name: 'toggle-dark.js', lang: 'js', code: tw4DarkJs() },
        ]},
      ],
    },

    {
      id: 'plain-html',
      title: 'Plain HTML + CSS',
      hint: 'Single file, no build step. Just open in a browser.',
      files: [{ name: 'index.html', lang: 'html', code: plainHtml(slug, name, cssVars) }],
    },

    {
      id: 'plain-js',
      title: 'Plain JavaScript',
      hint: 'Use the JS object anywhere — Node, browser, vanilla, anywhere.',
      files: [{ name: 'colors.js', lang: 'js', code: plainJs(slug, camel, palette) }],
    },
  ];
}

/* ---------- snippet builders ---------- */

const card = (slug, name) => `<div className="rounded-2xl border border-${slug}-200 dark:border-${slug}-800 bg-${slug}-50 dark:bg-${slug}-900/40 p-6">
  <span className="inline-block rounded-full bg-${slug}-100 dark:bg-${slug}-900/60 px-3 py-1 text-xs font-medium text-${slug}-700 dark:text-${slug}-300">New</span>
  <h1 className="mt-3 text-3xl font-bold text-${slug}-900 dark:text-${slug}-100">${name}</h1>
  <p className="mt-2 text-${slug}-700 dark:text-${slug}-300">Built with the ${name} palette.</p>
  <button className="mt-4 rounded-xl bg-${slug}-600 hover:bg-${slug}-700 dark:bg-${slug}-500 dark:hover:bg-${slug}-400 text-white px-4 py-2.5 text-sm font-semibold transition">
    Get started →
  </button>
</div>`;

const nextPage = (slug, name) => `export default function Page() {
  return (
    <main className="min-h-screen bg-${slug}-50 dark:bg-neutral-950 p-10">
      ${card(slug, name).split('\n').join('\n      ')}
    </main>
  );
}
`;

const viteApp = (slug, name) => `import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-${slug}-50 to-white dark:from-neutral-950 dark:to-${slug}-950 p-10">
      ${card(slug, name).split('\n').join('\n      ')}
    </div>
  );
}
`;

const tw3React = (slug, name) => `import './index.css';

export default function App() {
  return (
    <main className="min-h-screen bg-${slug}-50 dark:bg-neutral-950 p-10">
      ${card(slug, name).split('\n').join('\n      ')}
    </main>
  );
}
`;

const tw3Next = (slug, name) => `export default function Page() {
  return (
    <main className="min-h-screen bg-${slug}-50 dark:bg-neutral-950 p-10">
      ${card(slug, name).split('\n').join('\n      ')}
    </main>
  );
}
`;

const tw3Html = (slug, name) => `<!doctype html>
<html lang="en" class="">
<head>
<meta charset="utf-8" />
<title>${name}</title>
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: { extend: { colors: { '${slug}': { /* your palette here */ } } } },
  };
</script>
</head>
<body class="bg-${slug}-50 dark:bg-neutral-950 p-10">
  <div class="rounded-2xl border border-${slug}-200 bg-white p-6">
    <h1 class="text-2xl font-bold text-${slug}-900">${name}</h1>
    <p class="text-${slug}-700">Built with Tailwind CDN — instant.</p>
    <button class="mt-3 rounded-xl bg-${slug}-600 hover:bg-${slug}-700 text-white px-4 py-2 text-sm font-semibold">
      Get started
    </button>
  </div>
</body>
</html>
`;

const tw4React = (slug, name) => `export default function App() {
  return (
    <main className="min-h-screen bg-${slug}-50 dark:bg-neutral-950 p-10">
      ${card(slug, name).split('\n').join('\n      ')}
    </main>
  );
}
`;

const tw4Next = (slug, name) => `export default function Page() {
  return (
    <main className="min-h-screen bg-${slug}-50 dark:bg-neutral-950 p-10">
      ${card(slug, name).split('\n').join('\n      ')}
    </main>
  );
}
`;

const tw4Html = (slug, name) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${name}</title>
<link rel="stylesheet" href="./app.css" />
</head>
<body class="bg-${slug}-50 dark:bg-neutral-950 p-10">
  <div class="rounded-2xl border border-${slug}-200 bg-white p-6">
    <h1 class="text-2xl font-bold text-${slug}-900">${name}</h1>
    <button class="mt-3 rounded-xl bg-${slug}-600 hover:bg-${slug}-700 text-white px-4 py-2 text-sm font-semibold dark:bg-${slug}-500 dark:hover:bg-${slug}-400">
      Get started
    </button>
  </div>
</body>
</html>
`;

const tw4DarkJs = () => `// Class-based dark mode for Tailwind v4
const setTheme = (mode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  localStorage.setItem('theme', mode);
};

const saved = localStorage.getItem('theme') ||
  (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(saved);

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark');
});
`;

const nextLayout = () => `'use client';
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: \`
          const t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
          document.documentElement.classList.toggle('dark', t === 'dark');
        \` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
`;

const themeToggle = (slug) => `'use client';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };
  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-${slug}-200 dark:border-${slug}-800 bg-white dark:bg-neutral-900 p-2 hover:bg-${slug}-50 dark:hover:bg-${slug}-900/40"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}
`;

const plainHtml = (slug, name, cssVars) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${name}</title>
<style>
${cssVars}
* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; padding: 40px; margin: 0;
       background: var(--${slug}-50); color: var(--${slug}-900); }
.btn { background: var(--${slug}-600); color: white; border: 0;
       padding: 12px 20px; border-radius: 12px; cursor: pointer;
       font-weight: 600; }
.btn:hover { background: var(--${slug}-700); }
.card { background: white; border: 1px solid var(--${slug}-200);
        padding: 24px; border-radius: 16px; max-width: 480px; }
</style>
</head>
<body>
  <div class="card">
    <h1>${name}</h1>
    <button class="btn">Get started →</button>
  </div>
</body>
</html>
`;

const plainJs = (slug, camel, palette) => `// Drop this anywhere — works in Node, browser, ES modules
export const ${camel} = {
${palette.map((s) => `  '${s.label}': '${s.hex}',`).join('\n')}
};

import { ${camel} } from './colors.js';
document.body.style.background = ${camel}['50'];
`;
