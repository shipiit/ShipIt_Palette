// Animated SVG illustration for the Tools page hero.
// Pure CSS animations — no JS, no deps. GPU-accelerated transforms.

export default function AnimatedHero() {
  return (
    <div className="relative h-44 md:h-60 mb-6 flex items-center justify-center pointer-events-none">
      <svg viewBox="0 0 480 240" className="w-full max-w-2xl mx-auto" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ah-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="var(--brand-300)" />
            <stop offset="100%" stopColor="var(--brand-700)" />
          </linearGradient>
          <linearGradient id="ah-grad-2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="ah-grad-3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="ah-glow"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>

        {/* central palette window */}
        <g className="ah-window">
          <rect x="170" y="70" width="140" height="100" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="1.5" />
          <circle cx="180" cy="82" r="2" fill="#ef4444" />
          <circle cx="188" cy="82" r="2" fill="#f59e0b" />
          <circle cx="196" cy="82" r="2" fill="#10b981" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={`r1-${i}`} x={180 + i * 24} y="100" width="20" height="20" rx="4" fill="url(#ah-grad-1)" opacity={1 - i * 0.16} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={`r2-${i}`} x={180 + i * 24} y="124" width="20" height="20" rx="4" fill="url(#ah-grad-2)" opacity={0.4 + i * 0.15} />
          ))}
          <rect x="180" y="148" width="120" height="14" rx="3" fill="#f5f5f5" />
        </g>

        {/* Orbiting color circles */}
        <g className="ah-orbit">
          <circle cx="100" cy="60" r="22" fill="url(#ah-grad-1)" filter="url(#ah-glow)" opacity="0.5" />
          <circle cx="100" cy="60" r="22" fill="url(#ah-grad-1)" />
          <text x="100" y="65" fontSize="11" fontWeight="800" fill="white" textAnchor="middle">A</text>
        </g>

        <g className="ah-orbit-2">
          <circle cx="380" cy="60" r="22" fill="url(#ah-grad-2)" filter="url(#ah-glow)" opacity="0.5" />
          <circle cx="380" cy="60" r="22" fill="url(#ah-grad-2)" />
          <text x="380" y="65" fontSize="11" fontWeight="800" fill="white" textAnchor="middle">V</text>
        </g>

        <g className="ah-orbit-3">
          <circle cx="100" cy="180" r="22" fill="url(#ah-grad-3)" filter="url(#ah-glow)" opacity="0.5" />
          <circle cx="100" cy="180" r="22" fill="url(#ah-grad-3)" />
          <text x="100" y="185" fontSize="11" fontWeight="800" fill="white" textAnchor="middle">S</text>
        </g>

        <g className="ah-orbit-4">
          <circle cx="380" cy="180" r="22" fill="var(--brand-500)" filter="url(#ah-glow)" opacity="0.5" />
          <circle cx="380" cy="180" r="22" fill="var(--brand-500)" />
          <text x="380" y="185" fontSize="11" fontWeight="800" fill="white" textAnchor="middle">T</text>
        </g>

        {/* Connection lines */}
        <g stroke="#e5e5e5" strokeDasharray="3 3" strokeWidth="1" fill="none" className="ah-lines">
          <line x1="120" y1="78" x2="170" y2="100" />
          <line x1="360" y1="78" x2="310" y2="100" />
          <line x1="120" y1="162" x2="170" y2="140" />
          <line x1="360" y1="162" x2="310" y2="140" />
        </g>

        {/* Floating tokens */}
        <g className="ah-token-1">
          <rect x="40" y="110" width="46" height="16" rx="8" fill="white" stroke="#e5e5e5" />
          <text x="63" y="121" fontSize="9" fontWeight="700" fill="#666" textAnchor="middle">--500</text>
        </g>
        <g className="ah-token-2">
          <rect x="394" y="110" width="46" height="16" rx="8" fill="white" stroke="#e5e5e5" />
          <text x="417" y="121" fontSize="9" fontWeight="700" fill="#666" textAnchor="middle">#hex</text>
        </g>

        {/* Sparkles */}
        <g className="ah-sparkle ah-sparkle-1" fill="var(--brand-500)">
          <circle cx="240" cy="35" r="2" />
        </g>
        <g className="ah-sparkle ah-sparkle-2" fill="#a78bfa">
          <circle cx="280" cy="200" r="2.5" />
        </g>
        <g className="ah-sparkle ah-sparkle-3" fill="#fb923c">
          <circle cx="200" cy="200" r="2" />
        </g>
      </svg>

      <style>{`
        @keyframes ah-float-y    { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes ah-float-y-r  { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        @keyframes ah-pulse-soft { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes ah-twinkle    { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.6); } }
        @keyframes ah-dash       { to { stroke-dashoffset: -12; } }

        .ah-window { animation: ah-pulse-soft 4s ease-in-out infinite; transform-origin: 240px 120px; }
        .ah-orbit  { animation: ah-float-y 4s ease-in-out infinite; transform-origin: 100px 60px; }
        .ah-orbit-2{ animation: ah-float-y-r 4s ease-in-out infinite .5s; transform-origin: 380px 60px; }
        .ah-orbit-3{ animation: ah-float-y-r 4s ease-in-out infinite 1s; transform-origin: 100px 180px; }
        .ah-orbit-4{ animation: ah-float-y 4s ease-in-out infinite 1.5s; transform-origin: 380px 180px; }
        .ah-token-1{ animation: ah-float-y 5s ease-in-out infinite .3s; transform-origin: 63px 118px; }
        .ah-token-2{ animation: ah-float-y-r 5s ease-in-out infinite .8s; transform-origin: 417px 118px; }
        .ah-lines  { animation: ah-dash 1.5s linear infinite; }
        .ah-sparkle{ animation: ah-twinkle 2s ease-in-out infinite; }
        .ah-sparkle-1 { animation-delay: 0s; }
        .ah-sparkle-2 { animation-delay: .6s; }
        .ah-sparkle-3 { animation-delay: 1.2s; }
      `}</style>
    </div>
  );
}
