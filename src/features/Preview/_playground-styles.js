export const BASE_STYLES = `*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; padding: 32px; font-family: 'Inter', system-ui, sans-serif;
       background: var(--brand-50); color: var(--brand-900);
       min-height: 100vh; line-height: 1.55; }
a { color: var(--brand-600); text-decoration: none; cursor: pointer; }
a:hover { text-decoration: underline; }

/* Hero */
.hero { max-width: 720px; }
.hero h1 { font-size: 48px; font-weight: 800; line-height: 1.04;
           margin: 18px 0 14px; letter-spacing: -0.025em; color: var(--brand-900); }
.hero h1 em { color: var(--brand-600); font-style: normal; }
.hero .lead { color: var(--brand-700); font-size: 16.5px; max-width: 540px; }
.hero .row { margin-top: 24px; }
.avatars { display: flex; align-items: center; gap: 12px; margin-top: 28px;
           font-size: 13px; color: var(--brand-700); }
.avatar { width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg, var(--brand-400), var(--brand-700));
          margin-left: -8px; border: 2px solid white; }
.avatar:first-child { margin-left: 0; }
.avatar.large { width: 40px; height: 40px; }
.avatars strong { font-weight: 700; color: var(--brand-700); }

/* Card */
.card { background: white; border: 1px solid var(--brand-200); padding: 28px;
        border-radius: 18px; max-width: 460px;
        box-shadow: 0 12px 40px -24px var(--brand-500); }
.card h2 { color: var(--brand-900); margin: 12px 0 6px; font-size: 24px; letter-spacing: -0.01em; }
.card h3 { color: var(--brand-900); margin: 0 0 12px; font-size: 18px; }
.card p { color: var(--brand-700); margin: 0 0 16px; }
.card .price { font-size: 28px; font-weight: 800; color: var(--brand-900); }
.card .price small { font-size: 13px; font-weight: 500; color: var(--brand-600); }

/* Badges */
.badge { display: inline-flex; align-items: center; gap: 4px;
         background: var(--brand-100); color: var(--brand-700);
         padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; }
.badge.soft { background: color-mix(in srgb, var(--brand-500) 14%, transparent); color: var(--brand-700); }
.badge.popular { background: var(--brand-600); color: white; position: absolute;
                 top: -12px; left: 50%; transform: translateX(-50%); }

/* Buttons */
.btn { background: var(--brand-600); color: white; border: 0;
       padding: 11px 18px; border-radius: 12px; cursor: pointer;
       font-weight: 600; font-size: 14px; transition: 0.15s ease;
       box-shadow: 0 8px 24px -10px var(--brand-500); display: inline-flex;
       align-items: center; gap: 6px; font-family: inherit; }
.btn:hover { background: var(--brand-700); transform: translateY(-1px); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.btn.ghost { background: transparent; color: var(--brand-700); box-shadow: none; }
.btn.ghost:hover { background: var(--brand-100); }
.btn.outline { background: transparent; color: var(--brand-700);
               border: 1px solid var(--brand-300); box-shadow: none; }
.btn.outline:hover { border-color: var(--brand-500); background: var(--brand-50); }
.btn.danger { background: #dc2626; box-shadow: 0 8px 24px -10px #dc2626; }
.btn.danger:hover { background: #b91c1c; }
.btn.small { padding: 7px 12px; font-size: 12.5px; border-radius: 10px; }
.btn.large { padding: 14px 22px; font-size: 15px; border-radius: 14px; }
.btn.block { width: 100%; justify-content: center; }
.btn.loading { opacity: 0.7; cursor: wait; }

/* Rows */
.row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
.row.tiny { gap: 6px; margin: 12px 0 16px; }
.row.between { justify-content: space-between; margin-top: 18px; }

/* Form */
.form label { display: block; font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
              color: var(--brand-700); margin: 14px 0 6px; text-transform: uppercase; }
.input { width: 100%; padding: 11px 14px; border-radius: 10px; font-size: 14px;
         border: 1px solid var(--brand-200); outline: none; transition: 0.15s;
         background: white; color: var(--brand-900); font-family: inherit; }
.input:focus { border-color: var(--brand-500);
               box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-500) 22%, transparent); }
.check { display: flex; align-items: flex-start; gap: 8px; font-size: 13px;
         color: var(--brand-700); margin: 16px 0; }
.check input { accent-color: var(--brand-500); margin-top: 3px; }
.tiny { font-size: 12px; }
.center { text-align: center; }

/* KPIs / stats */
.stats { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 14px; max-width: 900px; }
.kpi { background: white; border: 1px solid var(--brand-200); padding: 18px; border-radius: 16px; }
.kpi-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--brand-600); }
.kpi-value { font-size: 28px; font-weight: 800; margin-top: 6px; color: var(--brand-900); }
.kpi-delta { margin-top: 4px; font-size: 12px; font-weight: 600; color: var(--brand-600); }

/* Features */
.features { max-width: 1000px; }
.features-header { text-align: center; max-width: 560px; margin: 0 auto 32px; }
.features-header h2 { font-size: 30px; letter-spacing: -0.02em; margin: 12px 0 6px; color: var(--brand-900); }
.features-header p { color: var(--brand-700); }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap: 16px; }
.feature { background: white; border: 1px solid var(--brand-200); padding: 22px; border-radius: 16px;
           transition: 0.18s; }
.feature:hover { transform: translateY(-3px); box-shadow: 0 16px 40px -24px var(--brand-500); }
.feature h3 { margin: 14px 0 4px; font-size: 17px; color: var(--brand-900); }
.feature p { font-size: 13.5px; color: var(--brand-700); }
.feature-icon { width: 40px; height: 40px; border-radius: 12px;
                background: color-mix(in srgb, var(--brand-500) 14%, transparent);
                color: var(--brand-600); display: flex; align-items: center;
                justify-content: center; font-size: 18px; }

/* Testimonial */
.testimonial { position: relative; max-width: 540px; background: white;
               border: 1px solid var(--brand-200); padding: 30px; border-radius: 18px; margin: 0;
               box-shadow: 0 12px 40px -24px var(--brand-500); }
.testimonial .quote-mark { position: absolute; top: 12px; left: 18px;
                          font-size: 64px; line-height: 1; color: var(--brand-300);
                          font-family: Georgia, serif; }
.testimonial p { position: relative; font-size: 17px; color: var(--brand-900);
                 margin: 0 0 18px; line-height: 1.55; }
.testimonial footer { display: flex; align-items: center; gap: 12px; }
.testimonial footer strong { display: block; color: var(--brand-900); }
.testimonial footer span { font-size: 12.5px; color: var(--brand-600); }

/* Alert */
.alert { display: flex; align-items: flex-start; gap: 12px;
         border-left: 4px solid var(--brand-500); border-radius: 10px;
         padding: 14px 16px; background: var(--brand-50); max-width: 640px; }
.alert.warn { border-left-color: #f59e0b; background: #fffbeb; }
.alert .alert-icon { width: 24px; height: 24px; border-radius: 50%;
                     background: var(--brand-500); color: white;
                     display: flex; align-items: center; justify-content: center;
                     font-weight: 700; flex-shrink: 0; font-size: 13px; }
.alert.warn .alert-icon { background: #f59e0b; }
.alert .alert-body { flex: 1; }
.alert .alert-body strong { color: var(--brand-900); }
.alert .alert-body p { font-size: 13px; color: var(--brand-700); margin: 4px 0 0; }

/* Pricing card */
.pricing { position: relative; max-width: 320px; }
.pricing.featured { border-color: var(--brand-500);
                    box-shadow: 0 24px 60px -28px var(--brand-500); }
.price-row { display: flex; align-items: baseline; gap: 6px; margin: 6px 0 4px; }
.price-big { font-size: 48px; font-weight: 800; letter-spacing: -0.025em; color: var(--brand-900); }
.price-period { color: var(--brand-600); }
.checklist { list-style: none; padding: 0; margin: 18px 0 0; font-size: 13.5px; }
.checklist li { padding: 6px 0 6px 26px; position: relative; color: var(--brand-700); }
.checklist li::before { content: "✓"; position: absolute; left: 0; top: 6px;
                        width: 18px; height: 18px; border-radius: 50%;
                        background: var(--brand-500); color: white;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 10px; font-weight: 700; }

/* Navbar */
.navbar { display: flex; align-items: center; justify-content: space-between;
          padding: 14px 24px; background: white; border: 1px solid var(--brand-200);
          border-radius: 16px; max-width: 1000px; }
.nav-logo { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.logo-mark { width: 28px; height: 28px; border-radius: 8px;
             background: linear-gradient(135deg, var(--brand-500), var(--brand-700)); }
.nav-links { display: flex; gap: 22px; font-size: 14px; }
.nav-links a { color: var(--brand-700); }
`;
