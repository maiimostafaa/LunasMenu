// Simple hand-drawn-style line icons, recreated as SVG (not the original
// artwork) so they scale crisply at TV resolution and can be recolored via
// CSS instead of shipping a raster image.

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function CoffeeMug(props) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <path d="M20 35 h45 v35 a10 10 0 0 1 -10 10 h-25 a10 10 0 0 1 -10 -10 z" {...common} />
      <path d="M65 42 h10 a10 10 0 0 1 0 20 h-10" {...common} />
      <path d="M35 12 q5 6 0 12" {...common} strokeWidth="2.5" opacity="0.8" />
      <path d="M48 8 q5 6 0 12" {...common} strokeWidth="2.5" opacity="0.8" />
      <path d="M34 55 l6 6 l10 -10" stroke="var(--accent)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </svg>
  )
}

export function FriedEgg(props) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <path
        d="M50 20 c18 -4 32 8 34 22 c2 12 -6 18 -2 26 c4 9 -4 16 -14 15 c-8 -1 -10 6 -20 6 c-16 0 -30 -10 -30 -26 c0 -20 16 -39 32 -43 z"
        {...common}
      />
      <circle cx="52" cy="48" r="13" fill="var(--accent)" stroke="currentColor" strokeWidth="3" />
      <path d="M46 43 q6 -4 12 0" stroke="#0000" strokeWidth="0" />
    </svg>
  )
}

export function PancakeStack(props) {
  return (
    <svg viewBox="0 0 100 100" {...props}>
      <ellipse cx="50" cy="70" rx="34" ry="8" {...common} />
      <ellipse cx="50" cy="56" rx="30" ry="7" {...common} />
      <ellipse cx="50" cy="43" rx="26" ry="6.5" {...common} />
      <rect x="38" y="26" width="16" height="10" rx="2" fill="var(--accent)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M30 30 q-4 6 -8 4" {...common} strokeWidth="2.5" opacity="0.8" />
      <path d="M62 26 q6 4 10 0" {...common} strokeWidth="2.5" opacity="0.8" />
    </svg>
  )
}

export function OliveBranch(props) {
  return (
    <svg viewBox="0 0 140 90" {...props}>
      <path d="M10 80 Q70 40 130 10" {...common} strokeWidth="2.5" />
      <g stroke="currentColor" strokeWidth="2" fill="none">
        <ellipse cx="35" cy="62" rx="10" ry="5" transform="rotate(-30 35 62)" />
        <ellipse cx="55" cy="50" rx="10" ry="5" transform="rotate(-30 55 50)" />
        <ellipse cx="75" cy="38" rx="10" ry="5" transform="rotate(-30 75 38)" />
        <ellipse cx="95" cy="26" rx="10" ry="5" transform="rotate(-30 95 26)" />
      </g>
      <circle cx="60" cy="66" r="6" fill="var(--accent)" />
      <circle cx="80" cy="58" r="6" fill="var(--accent)" />
    </svg>
  )
}

export function Sparkle(props) {
  return (
    <svg viewBox="0 0 40 40" {...props}>
      <path
        d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16 Z"
        fill="var(--accent)"
      />
    </svg>
  )
}

export function SwirlDivider(props) {
  return (
    <svg viewBox="0 0 300 30" {...props}>
      <path d="M10 15 Q40 0 60 15 T110 15" {...common} strokeWidth="2.5" />
      <path d="M130 15 l8 -8 l8 8 l-8 8 z" fill="var(--accent)" />
      <path d="M190 15 Q220 30 240 15 T290 15" {...common} strokeWidth="2.5" />
    </svg>
  )
}
