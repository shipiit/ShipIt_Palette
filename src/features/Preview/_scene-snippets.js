// HTML snippets for each preview scene — used by the "Open in Playground" button
// so users can edit the code that produced the preview.
// All snippets use the .btn .card .badge .input .row helper classes from _playground-styles.js.

export const SCENE_SNIPPETS = {
  mobile: `<div class="card" style="max-width:380px">
  <span class="badge">📱 Mobile</span>
  <h2>Hi Maya 👋</h2>
  <p>You're on a 12-day streak — keep it going.</p>

  <div class="row" style="margin:18px 0 8px">
    <div class="kpi" style="flex:1">
      <div class="kpi-label">Steps</div>
      <div class="kpi-value">8,431</div>
    </div>
    <div class="kpi" style="flex:1">
      <div class="kpi-label">Calories</div>
      <div class="kpi-value">2,140</div>
    </div>
  </div>

  <div style="display:flex;flex-direction:column;gap:10px;margin-top:12px">
    <div class="row" style="background:var(--brand-50);border-radius:12px;padding:10px 14px">
      <span style="flex:1">🏃 Morning run</span>
      <strong style="color:var(--brand-700)">5.2 km</strong>
    </div>
    <div class="row" style="background:var(--brand-50);border-radius:12px;padding:10px 14px">
      <span style="flex:1">🧘 Meditation</span>
      <strong style="color:var(--brand-700)">15 min</strong>
    </div>
    <div class="row" style="background:var(--brand-50);border-radius:12px;padding:10px 14px">
      <span style="flex:1">💧 Water</span>
      <strong style="color:var(--brand-700)">6 / 8</strong>
    </div>
  </div>

  <button class="btn block" style="margin-top:18px">Log activity</button>
</div>`,

  email: `<div style="background:#f5f5f5;padding:24px">
<table style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06)" cellspacing="0" cellpadding="0">
  <tr>
    <td style="background:var(--brand-600);padding:24px;color:white">
      <strong style="font-size:18px">ShipIt Palette</strong>
    </td>
  </tr>
  <tr>
    <td style="padding:36px 32px">
      <h1 style="font-size:26px;margin:0 0 12px;color:var(--brand-900)">Welcome aboard, Ada 👋</h1>
      <p style="color:var(--brand-700);font-size:15px;line-height:1.6;margin:0 0 24px">
        Thanks for joining us. Your account is ready, and your free trial just kicked off —
        14 days of every premium feature, on us.
      </p>
      <a href="#" class="btn" style="text-decoration:none;display:inline-block">
        Open dashboard →
      </a>
      <hr style="margin:28px 0;border:0;border-top:1px solid var(--brand-200)" />
      <h3 style="color:var(--brand-900);margin:0 0 8px">Quick wins for day one</h3>
      <ul style="color:var(--brand-700);font-size:14px;line-height:1.7;padding-left:20px">
        <li>Invite your team and share your first project</li>
        <li>Connect Slack or email for instant alerts</li>
        <li>Pick a theme color (we recommend ours 😉)</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="padding:18px 32px;background:var(--brand-50);font-size:12px;color:var(--brand-700)">
      You're getting this email because you signed up at shipit-palette.app.
      <a style="color:var(--brand-700)">Unsubscribe</a>
    </td>
  </tr>
</table>
</div>`,

  marketing: `<div style="
  width: 640px; aspect-ratio: 16/9; border-radius: 24px;
  background: linear-gradient(135deg, var(--brand-500), var(--brand-800));
  color: white; padding: 40px; position: relative; overflow: hidden;
  box-shadow: 0 24px 60px -20px var(--brand-500);
">
  <div style="position:absolute;top:-40px;right:-40px;width:240px;height:240px;
              border-radius:50%;background:var(--brand-300);opacity:0.4;filter:blur(60px)"></div>
  <div style="position:absolute;bottom:-60px;left:-30px;width:200px;height:200px;
              border-radius:50%;background:var(--brand-700);opacity:0.5;filter:blur(80px)"></div>

  <div style="position:relative">
    <span style="display:inline-block;background:rgba(255,255,255,0.2);
                 backdrop-filter:blur(8px);padding:6px 14px;border-radius:999px;
                 font-size:12px;font-weight:600">✦ Just shipped</span>

    <h1 style="font-size:48px;font-weight:800;line-height:1.05;
               letter-spacing:-0.025em;margin:24px 0 12px;max-width:520px">
      Build at the speed of thought.
    </h1>
    <p style="font-size:17px;opacity:0.9;max-width:480px;margin:0">
      ShipIt Palette · v4.0 — beautiful color systems in seconds.
    </p>

    <div style="position:absolute;bottom:0;right:0;
                width:48px;height:48px;border-radius:50%;
                background:white;color:var(--brand-700);
                display:flex;align-items:center;justify-content:center;
                font-size:22px;font-weight:700">→</div>
  </div>
</div>`,

  editor: `<div class="card" style="max-width:680px;background:#0b1020;border-color:#1e293b;color:#e2e8f0;padding:0;overflow:hidden">
  <div style="background:#0f172a;padding:10px 14px;border-bottom:1px solid #1e293b;display:flex;align-items:center;gap:8px">
    <span style="width:12px;height:12px;border-radius:50%;background:#ef4444"></span>
    <span style="width:12px;height:12px;border-radius:50%;background:#f59e0b"></span>
    <span style="width:12px;height:12px;border-radius:50%;background:#10b981"></span>
    <span style="margin-left:14px;font-family:monospace;font-size:12px;color:#94a3b8">App.jsx</span>
  </div>
  <pre style="margin:0;padding:18px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;overflow-x:auto"><code><span style="color:#c084fc">import</span> <span style="color:#e2e8f0">{ Button }</span> <span style="color:#c084fc">from</span> <span style="color:#facc15">'./components'</span><span style="color:#94a3b8">;</span>

<span style="color:#c084fc">export default function</span> <span style="color:#34d399">App</span><span style="color:#94a3b8">() {</span>
  <span style="color:#c084fc">return</span> <span style="color:#94a3b8">(</span>
    <span style="color:#94a3b8">&lt;</span><span style="color:#67e8f9">main</span> <span style="color:#a3e635">className</span><span style="color:#94a3b8">=</span><span style="color:#facc15">"hero"</span><span style="color:#94a3b8">&gt;</span>
      <span style="color:#94a3b8">&lt;</span><span style="color:#67e8f9">h1</span><span style="color:#94a3b8">&gt;</span>Hello, <span style="color:#f9a8d4">#82ea41</span><span style="color:#94a3b8">&lt;/</span><span style="color:#67e8f9">h1</span><span style="color:#94a3b8">&gt;</span>
      <span style="color:#94a3b8">&lt;</span><span style="color:#67e8f9">Button</span><span style="color:#94a3b8">&gt;</span>Get started<span style="color:#94a3b8">&lt;/</span><span style="color:#67e8f9">Button</span><span style="color:#94a3b8">&gt;</span>
    <span style="color:#94a3b8">&lt;/</span><span style="color:#67e8f9">main</span><span style="color:#94a3b8">&gt;</span>
  <span style="color:#94a3b8">);</span>
<span style="color:#94a3b8">}</span></code></pre>
</div>`,
};

export const HAS_SNIPPET = (id) => Object.prototype.hasOwnProperty.call(SCENE_SNIPPETS, id);
