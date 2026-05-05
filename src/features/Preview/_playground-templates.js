// Production-quality HTML templates for the Playground.
// All templates use the .btn .card .badge .input .row .kpi .feature-icon .testimonial helper
// classes defined in BASE_STYLES below.

export const TEMPLATES = {
  hero: {
    label: 'Hero section',
    code: `<section class="hero">
  <span class="badge soft">✦ Just shipped · v4.0</span>
  <h1>Build at the speed of <em>thought</em>.</h1>
  <p class="lead">
    Ship beautiful interfaces 10× faster. Used by 50,000+ teams to design,
    prototype, and deliver pixel-perfect products.
  </p>
  <div class="row">
    <button class="btn">Start free trial →</button>
    <button class="btn ghost">▶ Watch demo</button>
  </div>
  <div class="avatars">
    <span class="avatar"></span><span class="avatar"></span>
    <span class="avatar"></span><span class="avatar"></span>
    <strong>4.8k</strong> developers love it
  </div>
</section>`,
  },

  card: {
    label: 'Product card',
    code: `<div class="card">
  <span class="badge">Featured</span>
  <h2>Aurora UI Kit</h2>
  <p>A modern, minimal design system with 120+ components, dark mode, and built-in
     accessibility. Drop into Figma or React in seconds.</p>
  <div class="row tiny">
    <span class="badge soft">React</span>
    <span class="badge soft">Figma</span>
    <span class="badge soft">MIT</span>
  </div>
  <div class="row between">
    <strong class="price">$49 <small>one-time</small></strong>
    <button class="btn">Buy now</button>
  </div>
</div>`,
  },

  buttons: {
    label: 'Button gallery',
    code: `<div class="card">
  <h3>Buttons</h3>
  <div class="row">
    <button class="btn">Primary</button>
    <button class="btn ghost">Ghost</button>
    <button class="btn outline">Outline</button>
    <button class="btn danger">Danger</button>
  </div>
  <div class="row" style="margin-top:14px">
    <button class="btn small">Small</button>
    <button class="btn">Medium</button>
    <button class="btn large">Large</button>
  </div>
  <div class="row" style="margin-top:14px">
    <button class="btn">→ With arrow</button>
    <button class="btn loading">Loading…</button>
    <button class="btn" disabled>Disabled</button>
  </div>
</div>`,
  },

  signup: {
    label: 'Signup form',
    code: `<form class="card form">
  <span class="badge">Join us</span>
  <h2>Create your account</h2>
  <p>Free forever. No credit card required.</p>

  <label>Full name</label>
  <input class="input" placeholder="Ada Lovelace" />

  <label>Work email</label>
  <input class="input" type="email" placeholder="ada@example.com" />

  <label>Password</label>
  <input class="input" type="password" placeholder="••••••••" />

  <label class="check">
    <input type="checkbox" checked />
    <span>I agree to the <a>Terms</a> & <a>Privacy Policy</a></span>
  </label>

  <button class="btn block">Create account →</button>
  <p class="tiny center">Already have one? <a>Sign in</a></p>
</form>`,
  },

  stats: {
    label: 'Stats grid',
    code: `<section class="stats">
  <div class="kpi">
    <div class="kpi-label">Revenue</div>
    <div class="kpi-value">$48,239</div>
    <div class="kpi-delta">+12.4% MoM</div>
  </div>
  <div class="kpi">
    <div class="kpi-label">Active users</div>
    <div class="kpi-value">2,841</div>
    <div class="kpi-delta">+8.2% MoM</div>
  </div>
  <div class="kpi">
    <div class="kpi-label">Conversion</div>
    <div class="kpi-value">3.42%</div>
    <div class="kpi-delta">+0.6% MoM</div>
  </div>
  <div class="kpi">
    <div class="kpi-label">NPS</div>
    <div class="kpi-value">72</div>
    <div class="kpi-delta">+4 vs Q3</div>
  </div>
</section>`,
  },

  features: {
    label: 'Features grid',
    code: `<section class="features">
  <header class="features-header">
    <span class="badge soft">Why us</span>
    <h2>Everything you need, nothing you don't</h2>
    <p>A focused toolkit for teams that ship.</p>
  </header>
  <div class="features-grid">
    <div class="feature">
      <div class="feature-icon">⚡</div>
      <h3>Lightning fast</h3>
      <p>Sub-100ms response time anywhere in the world.</p>
    </div>
    <div class="feature">
      <div class="feature-icon">🎨</div>
      <h3>Beautifully crafted</h3>
      <p>A design system that adapts to your brand instantly.</p>
    </div>
    <div class="feature">
      <div class="feature-icon">🔒</div>
      <h3>Secure by default</h3>
      <p>SOC 2, GDPR, end-to-end encryption.</p>
    </div>
  </div>
</section>`,
  },

  testimonial: {
    label: 'Testimonial',
    code: `<blockquote class="testimonial">
  <div class="quote-mark">"</div>
  <p>Cut our design-to-ship time in half. The closest thing to magic
     in our stack right now — we use it on every project.</p>
  <footer>
    <span class="avatar large"></span>
    <div>
      <strong>Maya Chen</strong>
      <span>CTO · Linear</span>
    </div>
  </footer>
</blockquote>`,
  },

  alert: {
    label: 'Alert / banner',
    code: `<div class="alert">
  <div class="alert-icon">✓</div>
  <div class="alert-body">
    <strong>You're all set.</strong>
    <p>Your account is verified — start exploring the dashboard whenever you're ready.</p>
  </div>
  <button class="btn small ghost">Dismiss</button>
</div>

<div class="alert warn" style="margin-top:14px">
  <div class="alert-icon">!</div>
  <div class="alert-body">
    <strong>Heads up.</strong>
    <p>Your trial ends in 3 days. Upgrade to keep your data and integrations.</p>
  </div>
  <button class="btn small">Upgrade</button>
</div>`,
  },

  pricing: {
    label: 'Pricing card',
    code: `<div class="card pricing featured">
  <span class="badge popular">Most popular</span>
  <h3>Pro</h3>
  <div class="price-row">
    <span class="price-big">$24</span>
    <span class="price-period">/ month</span>
  </div>
  <p>Everything you need to scale, with priority support.</p>
  <button class="btn block">Get Pro →</button>
  <ul class="checklist">
    <li>Unlimited projects</li>
    <li>Priority support</li>
    <li>Advanced analytics</li>
    <li>Custom domains</li>
    <li>50 GB storage</li>
  </ul>
</div>`,
  },

  navbar: {
    label: 'Navbar',
    code: `<nav class="navbar">
  <div class="nav-logo">
    <span class="logo-mark"></span>
    <strong>Northwind</strong>
  </div>
  <div class="nav-links">
    <a>Product</a><a>Pricing</a><a>Docs</a><a>Customers</a><a>Blog</a>
  </div>
  <div class="row">
    <button class="btn ghost small">Sign in</button>
    <button class="btn small">Start free →</button>
  </div>
</nav>`,
  },
};

