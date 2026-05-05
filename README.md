# 🎨 ShipIt Palette

> **Pick a color. Ship the palette.**
>
> A modern, fully-local color-palette studio built with React + Vite + Tailwind. Turn one hex into a production-ready design system — full shade scales, live UI previews, a live HTML playground, and **14 export formats** for every framework and platform.

🌐 **Live demo:** https://shipit-palette.vercel.app · **Repo:** https://github.com/shipiit/ShipIt_Palette

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-06b6d4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e)

---

## ✨ Features

### Generator
- **Live color picker** — click swatch, type hex, drag RGB / HSL / Hue sliders
- **Three algorithms** — Tailwind CSS curve · Linear HSL · OKLCH (perceptual)
- **Three naming patterns** — `50…950` · numeric `0…N` · semantic `light/base/dark`
- **3–15 shades** with `+` / `−` controls
- **Contrast shift** — push extremes lighter / darker (-15…+15)
- **Auto color naming** — picks the closest of 26 known colors (Emerald, Crimson, Sapphire, …)
- **Spacebar** for a random color

### Hero panel
- Click swatch to copy hex
- Live **WCAG 2.1 contrast ratio** vs. white & black with AA / AAA badges
- **Save** colors to localStorage and recall them via a swatch row
- **Share** — copies a URL with the color hash; opening that URL restores the palette

### Export — 14 formats
Each with one-click **Copy / Download / Copy ALL**, in **HEX / RGBA / HSL / OKLCH** notation.

| Web | Stylesheets | Code | Native | Visual |
|---|---|---|---|---|
| CSS Variables | SCSS | JSON | Swift (UIColor) | SVG swatches |
| Tailwind v3 config | Less | JS object | Android XML | |
| Tailwind v4 `@theme` | Sass Map | TypeScript | Flutter (Dart) | |
| Design Tokens (JSON) | | | | |

The **Export Format** dropdown is a categorized, searchable picker with custom SVG icons.

### Live UI Showcase (modal)
Every common component (Button, Input, Dropdown, MultiSelect, SearchableDropdown, Tag, Badge, Card, Modal, Tooltip, Toggle, Toast, Paragraph) rendered in **both light & dark themes** with your selected palette — instant visual feedback on contrast and feel.

### Live Preview (modal)
A full-screen preview of your palette in real product UIs:
- **Landing Page** — hero, features, stats, testimonials, FAQ, CTA
- **Dashboard** — sidebar nav, KPI cards with sparklines, line chart, donut chart, timeline, orders table, campaign form
- **Analytics** — KPI tiles, traffic chart with legend, devices donut, top pages, conversion funnel, hourly distribution
- **Pricing** — three plans with monthly/yearly toggle, feature comparison table, testimonial, FAQ, CTA

Each scene has its own light / dark toggle.

### Playground (split-view live editor)
Edit production-quality HTML on the left, see the iframe-rendered preview on the right — instantly. Includes 10 starter templates (Hero · Card · Buttons · Form · Stats · Features · Testimonial · Alert · Pricing · Navbar) plus a **Random** button. The code editor is fully syntax-highlighted while remaining editable. Snippets from Mobile / Email / Social Cards / Code Editor scenes can be opened directly in the playground for tweaking.

### Tools (advanced features)
A categorized launcher accessible from the header:
- **Palette** — Semantic Palette · Brand Kit · Saved Library
- **Color Tools** — Image Extractor · Color Blindness Simulator · Pair Suggestions · Gradient Builder
- **Accessibility** — Auto Text Color · Contrast Matrix (WCAG / APCA toggle)

### How to Use (modal)
Copy-paste-ready snippets for **every framework**, switchable via tab + sub-tab:
- **Next.js (App Router)** — globals.css, tailwind.config.js, page.jsx
- **Next.js · Dark Mode Setup** — flicker-free theme toggle pattern
- **React + Vite** — index.css, config, App.jsx
- **Tailwind v3** → React + Vite, Next.js, Plain HTML (CDN — no build)
- **Tailwind v4 (@theme)** → React + Vite, Next.js, Plain HTML, Dark Mode JS
- **Plain HTML + CSS** — single-file, no build step
- **Plain JavaScript** — ES module export

All snippets use your live palette name (e.g. `bg-emerald-600`, `dark:bg-emerald-500`, `focus:ring-emerald-500/40`).

---

## 🚀 Getting Started

```bash
git clone <this-repo>
cd shipit-palette
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the build
```

Open `http://localhost:5173/#48ad67` to launch with a specific base color preselected.

---

## 📁 Project Structure

```
shipit-palette/
├── index.html
├── package.json · vite.config.js · tailwind.config.js · postcss.config.js
├── README.md · LICENSE
└── src/
    ├── main.jsx · App.jsx · styles.css
    ├── theme/
    │   └── ThemeProvider.jsx              # dark/light context
    ├── lib/
    │   ├── color.js                       # hex/rgb/hsl/oklch math + algorithms + naming
    │   ├── exporters.js                   # 14 export formats
    │   └── contrast.js                    # WCAG 2.1 + APCA contrast helpers
    ├── components/common/                 # reusable UI library
    │   ├── Button · Input · Textarea · Card · Badge · Tag
    │   ├── Tooltip · Dropdown · MultiSelect · SearchableDropdown
    │   ├── Toggle · Paragraph · Heading · Modal · Toast
    │   ├── Icon · CodeBlock · Logo
    │   └── index.js                       # barrel export
    └── features/
        ├── Generator/                     # ColorPicker · Hero · Generator (controls) · Swatches
        ├── OutputTabs/                    # FormatPicker · format meta · OutputTabs panel
        ├── Showcase/                      # ShowcaseModal · all common UI in both themes
        ├── Usage/                         # UsageModal · usage-snippets builder
        ├── Preview/                       # PreviewModal + scenes:
        │   ├── LandingPreview · DashboardPreview · AnalyticsPreview · PricingPreview
        │   ├── MobilePreview · EmailPreview · MarketingCardPreview · CodeEditorPreview
        │   ├── PlaygroundPreview         # split-view editable HTML + iframe live preview
        │   └── _charts.jsx               # SVG line / donut / sparkline / bars
        ├── Footer/                        # branded footer with newsletter
        ├── SemanticPalette/               # primary/success/warning/danger/neutral scales
        ├── BrandKit/                      # 3-color brand kit generator
        ├── SavedLibrary/                  # localStorage-backed palette library
        ├── ImageExtractor/                # extract dominant colors from an image
        ├── ColorBlindness/                # simulate Deuteranopia / Protanopia / Tritanopia
        ├── PairSuggestions/               # color-theory pairings (complementary, triadic, …)
        ├── GradientBuilder/               # 2-color gradient + CSS / Tailwind / SCSS export
        └── AccessibilityTools/            # auto text-color picker · contrast matrix
```

Every file is kept **≤ 300 lines** for readability and easy copy-paste.

---

## 🧩 How the live recoloring works

When you pick a color, `App.jsx` writes CSS variables `--brand-50` … `--brand-950` onto `<html>`. Every component reads those variables — so the entire UI recolors instantly without re-rendering or prop drilling.

```css
:root {
  --brand-50:  #f6fff0;
  --brand-500: #82ea41;
  --brand-900: #0f2304;
}
```

```jsx
<button style={{ background: 'var(--brand-600)' }}>Click me</button>
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Space` | Random color |
| `Esc`   | Close any modal |

---

## 📚 Tech Stack

- **React 18** — no TypeScript, copy-paste friendly
- **Vite 5** — fast HMR, < 1s startup
- **Tailwind CSS 3** — utility-first styling, dark mode via `class` strategy
- **CSS Custom Properties** — for live theming
- **No external UI library** — every component is hand-written and dependency-free

---

## 🪪 License

MIT — do whatever you want. See [LICENSE](./LICENSE).

---

## 🙌 Credits

Made with ♥ by **Rahul Raj**.
