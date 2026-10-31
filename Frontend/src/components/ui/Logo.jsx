import React from 'react'

export default function Logo({ className = "h-9 w-auto", showText = true }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Photobooth Aperture + Print Mark */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-square flex-shrink-0"
      >
        <defs>
          <linearGradient id="purpleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="purpleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Back Photo Print (Angled) */}
        <g transform="rotate(12 55 52)" filter="url(#softShadow)">
          <rect x="36" y="22" width="38" height="48" rx="4" fill="url(#purpleGradient2)" />
          <rect x="40" y="26" width="30" height="34" rx="2" fill="#ffffff" fillOpacity="0.25" />
        </g>

        {/* Front Photo Print (Straight) */}
        <g transform="rotate(3 45 52)" filter="url(#softShadow)">
          <rect x="24" y="24" width="40" height="52" rx="4" fill="url(#purpleGradient1)" />
          <rect x="28" y="28" width="32" height="38" rx="2" fill="#ffffff" fillOpacity="0.9" />
        </g>

        {/* Modern Camera Aperture Shutter */}
        <g transform="translate(14, 18)" filter="url(#softShadow)">
          {/* Outer Ring */}
          <circle cx="34" cy="34" r="30" fill="#0f172a" />
          
          {/* Shutter Blade Paths */}
          {/* Center hexagonal opening */}
          <circle cx="34" cy="34" r="8" fill="#ffffff" />
          
          {/* Aperture Blades (White separators) */}
          <path d="M34 10 L44 30" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M55 22 L40 40" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M55 46 L30 42" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 58 L24 38" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M13 46 L28 28" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <path d="M13 22 L38 26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      {/* Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-lg tracking-tight text-slate-900">
            Memento<span className="text-violet-600">Studios</span>
          </span>
          <span className="text-[9px] font-bold tracking-[0.28em] text-slate-500 uppercase mt-0.5">
            Photobooth
          </span>
        </div>
      )}
    </div>
  )
}
