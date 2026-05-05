<div align="center">

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4MmVhNDEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzMjYxMTUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIxMCIgZmlsbD0idXJsKCNnKSIvPjxjaXJjbGUgY3g9IjEzIiBjeT0iMjciIHI9IjMuMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOTUiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIzLjYiIGZpbGw9IndoaXRlIi8+PGNpcmNsZSBjeD0iMjciIGN5PSIxMyIgcj0iMy4yIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC44NSIvPjxwYXRoIGQ9Ik0zMCA4LjVMMzIuNSA2TTMwIDExSDMzLjVNMjcuNSA4LjVWNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iMC45Ii8+PC9zdmc+" alt="ShipIt Palette" width="100" />

# ShipIt Palette

**Pick a color. Ship the palette.**

A modern color-palette studio. Turn one hex into a production-ready design system — full shade scales, live UI previews, a live HTML playground, **18+ tools**, **14 export formats**, and a dedicated **Figma integration** for every framework and platform.

[![Live demo](https://img.shields.io/badge/live%20demo-shipit--palette.vercel.app-brightgreen)](https://shipit-palette.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06b6d4?logo=tailwindcss&logoColor=white)

</div>

---

## 🌐 Pages

| Route | What's there |
|---|---|
| `/` | Main studio — picker, generator, palette, exports, all modals |
| `/tools` | Tools landing — sticky tab filter (All / Palette / Color Tools / Accessibility / Export) with animated SVG icon per tool |
| `/figma` | Figma integration landing — Kigen-style hero with floating cards, feature grid, format picker with one-click "Install on Figma" |

URLs are sharable. `/#48ad67` on the home page preselects a base color.

---

## ✨ Highlights

- **Live recoloring** — pick a color, the entire app + every preview scene + every common UI component instantly recolors via CSS variables.
- **18+ tools** in a categorized launcher (Palette · Color Tools · Accessibility · Export).
- **14 export formats** with one-click Copy / Download / Copy ALL — and 4 color notations (HEX / RGBA / HSL / OKLCH).
- **Live Preview** with 9 polished scenes including a split-view **Playground** for editing real HTML and seeing the result instantly.
- **Figma integration** — Tokens Studio JSON, native Figma Variables, AND a generated custom plugin you can install. **One-click install link** to the Tokens Studio plugin in Figma Community.
- **Light + Dark theme**, persisted to localStorage. Sharable URL hash.
- **Fully responsive** — sticky blurred nav, hamburger sheet on mobile.

---

## 🎨 Generator

- 8 algorithms: Tailwind CSS · Linear HSL · OKLCH · Material 3 · Radix UI · Hue Shift · Saturation Curve · Monochrome
- 8 naming patterns: `50…900` · `1,2,3…20` · `0,1…10` · `10,20,30…200` · `100,200…1000` · `A,B,C…Z` · `light…dark` · `tint/shade`
- 3–15 shades · contrast shift slider · auto color name (26 named colors)
- WCAG 2.1 contrast ratio against white & black with AA / AAA badges
- Save to localStorage · share via URL hash · random color (`Spacebar`) · undo (`Cmd+Z`)

---

## 🪙 Tools (18 modules)

### Palette
- **Semantic Palette** — primary / success / warning / danger / neutral scales
- **Brand Kit** — primary + secondary + tertiary scales
- **Saved Library** — localStorage with import / export JSON
- **Compare Mode** — two palettes side-by-side, with deltas
- **Custom Algorithm** — drag 11 sliders to design your own lightness curve
- **AI Naming** — type a vibe → suggested colors

### Color Tools
- **Image Extractor** — drop an image, pull out 6 dominant colors
- **Color Blindness** — Deuteranopia / Protanopia / Tritanopia simulation
- **Pair Suggestions** — complementary / analogous / triadic / split-comp / tetradic
- **Gradient Builder** — 2-color gradient + CSS / Tailwind v3 / v4 / SCSS export

### Accessibility
- **Auto Text Color** — best text color for every shade
- **Contrast Matrix** — N×N WCAG / APCA grid

### Export
- **Figma Export** — Tokens Studio · Figma Variables · custom plugin generator
- **Tailwind v4 Install** — guided 3-step install with live `@theme` block
- **OG Image** — 1200×630 PNG for social sharing
- **Spec Sheet** — printable / PDF-ready palette spec sheet
- **Embed Code** — `<iframe>` snippet for blogs and docs
- **History · Undo** — `Cmd+Z` support, visual timeline

---

## 🖼 Live Preview (9 scenes)

| Scene | What it is |
|---|---|
| **Playground** | Split-view live HTML editor + iframe preview, syntax-highlighted code, 10 starter templates, Random button |
| **Landing Page** | Hero · stats · features · testimonials · FAQ · CTA |
| **Dashboard** | KPI tiles · sparklines · line chart · timeline · orders table · campaign form |
| **Analytics** | KPIs · traffic chart · devices donut · funnel · hourly distribution |
| **Pricing** | 3 plans · monthly/yearly toggle · comparison table · FAQ |
| **Mobile App** | iPhone frames · Home / Chat / Profile tabs |
| **Email** | Newsletter mock with CTA, stats, footer |
| **Social Cards** | Twitter / LinkedIn / Instagram aspect ratios |
| **Code Editor** | VS Code-themed window with syntax highlighting |

Each non-Playground scene has a **"Test in Playground"** button that loads its source into the live editor.

---

## 📚 Export Formats (14)

| Web | Stylesheets | Code | Native | Visual |
|---|---|---|---|---|
| CSS Variables | SCSS | JSON | Swift (UIColor) | SVG swatches |
| Tailwind v3 config | Less | JS object | Android XML | |
| Tailwind v4 `@theme` | Sass Map | TypeScript | Flutter (Dart) | |
| Design Tokens (JSON) | | | | |

Each output supports **HEX / RGBA / HSL / OKLCH** notation.

---

## 🚀 Getting Started

```bash
git clone https://github.com/shipiit/ShipIt_Palette.git
cd ShipIt_Palette
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

Open `http://localhost:5173/#48ad67` to launch with a specific base color preselected.

---

## 📁 Project Structure

```
shipit-palette/
├── index.html · package.json · vite.config.js
├── README.md · LICENSE · .gitignore
└── src/
    ├── main.jsx · App.jsx · styles.css · router.jsx
    ├── theme/ThemeProvider.jsx
    ├── lib/
    │   ├── color.js          # 8 algorithms · 8 naming patterns
    │   ├── exporters.js      # 14 export formats
    │   └── contrast.js       # WCAG 2.1 + APCA helpers
    ├── components/common/    # 15 reusable UI components (Button, Input, Modal, …)
    ├── pages/
    │   ├── PageShell.jsx     # responsive shell with sticky nav + hamburger
    │   ├── ToolsPage.jsx     # /tools route with filter tabs + animated tool icons
    │   ├── FigmaPage.jsx     # /figma route with hero + features + format picker
    │   ├── _AnimatedHero.jsx # SVG illustration for tools hero
    │   └── _ToolIcon.jsx     # animated SVG icon per tool
    └── features/
        ├── Generator/  Hero/  Swatches/  OutputTabs/
        ├── Showcase/   Usage/  Preview/   Tools/   Footer/   Header/
        ├── SemanticPalette/  BrandKit/  SavedLibrary/
        ├── ImageExtractor/   ColorBlindness/  PairSuggestions/  GradientBuilder/
        ├── Compare/  CustomAlgorithm/  AINaming/
        ├── AccessibilityTools/   Figma/   TailwindInstall/
        ├── OgImage/   SpecSheet/   Embed/   History/
        └── …
```

Every file is kept **≤ 300 lines** for readability and easy copy-paste.

---

## 🎯 How the live recoloring works

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
| `Cmd / Ctrl + Z` | Undo color change |
| `Cmd / Ctrl + Shift + Z` | Redo color change |
| `Esc` | Close any modal / mobile menu |

---

## 📚 Tech Stack

| Tech | Version |
|---|---|
| **React** | 19 |
| **Vite** | 6 |
| **Tailwind CSS** | 4 (CSS-first `@theme`) |
| **TypeScript** | not used — pure JSX (copy-paste friendly) |
| **External UI library** | none — every component is hand-written |
| **Router** | tiny custom hook (~30 lines, no deps) |

---

## 🤝 Contributing

PRs welcome. The `main` branch is protected — push to a feature branch and open a PR.

---

## 🪪 License

[MIT](./LICENSE) — do whatever you want.

---

<div align="center">

Made with ♥ by **Rahul Raj**

</div>
