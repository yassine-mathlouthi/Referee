import { useId } from 'react'

export function PitchArt({ variant = 0, className = '' }: { variant?: number; className?: string }) {
  const id = useId().replaceAll(':', '')
  return <div className={`pitch-art pitch-variant-${variant} ${className}`} aria-hidden="true">
    <div className="stadium-halo" />
    <svg viewBox="0 0 800 800" fill="none" className="pitch-drawing">
      <defs><linearGradient id={id} x1="80" y1="100" x2="700" y2="750" gradientUnits="userSpaceOnUse"><stop stopColor="#c7ff36" stopOpacity=".85"/><stop offset="1" stopColor="#c7ff36" stopOpacity=".06"/></linearGradient></defs>
      <g stroke={`url(#${id})`} strokeWidth="1.5">
        <path d="M140 70h520v660H140zM140 400h520" />
        <circle cx="400" cy="400" r="92" />
        <circle cx="400" cy="400" r="4" fill="#c7ff36" />
        <path d="M250 70v135h300V70M320 70v55h160V70M250 730V595h300v135M320 730v-55h160v55"/>
        <path d="M340 205a70 70 0 0 0 120 0M340 595a70 70 0 0 1 120 0"/>
        <path d="M120 50h30m-15-15v30M650 50h30m-15-15v30M120 750h30m-15-15v30M650 750h30m-15-15v30" opacity=".5" />
      </g>
    </svg>
    <div className="pitch-orbit orbit-one"/><div className="pitch-orbit orbit-two"/>
    <span className="pitch-cross cross-one">+</span><span className="pitch-cross cross-two">+</span>
  </div>
}
