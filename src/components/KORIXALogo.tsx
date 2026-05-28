import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}

export function KORIXAIcon({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={`${sizeClasses[size]} ${className}`}
      aria-label="KORIXA Icon"
    >
      <defs>
        {/* Left Green/Teal Gradient */}
        <linearGradient id="korixaGreen" x1="0%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#0ea5e9" /> {/* Cyan/Teal base */}
          <stop offset="40%" stopColor="#10b981" /> {/* Rich Green */}
          <stop offset="100%" stopColor="#a7f3d0" /> {/* Pastel Green highlight */}
        </linearGradient>

        {/* Top/Right Purple/Blue Gradient */}
        <linearGradient id="korixaPurple" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#2563eb" /> {/* Vivid Blue */}
          <stop offset="60%" stopColor="#8b5cf6" /> {/* Deep Purple */}
          <stop offset="100%" stopColor="#d946ef" /> {/* Bright Magenta */}
        </linearGradient>

        {/* Bottom Orange/Red Gradient */}
        <linearGradient id="korixaOrange" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" /> {/* Vivid Amber */}
          <stop offset="50%" stopColor="#f97316" /> {/* Bright Orange */}
          <stop offset="100%" stopColor="#ef4444" /> {/* Electric Red */}
        </linearGradient>

        {/* Subtle drop shadows for depth */}
        <filter id="korixaShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* 3D Isometric Locker Cube Symbol with flowing organic curves */}
      <g filter="url(#korixaShadow)">
        {/* Left Face - Green Ribbon (with locker-like modern grooves) */}
        <path
          d="M 120,250 
             C 120,160 170,120 230,110
             C 210,130 195,170 195,220
             C 195,280 235,320 250,380
             C 180,425 120,380 120,250 Z"
          fill="url(#korixaGreen)"
          className="transition-all duration-500 hover:opacity-90"
        />
        {/* Thin digital accent inside left face */}
        <path
          d="M 145,245 
             C 145,185 180,155 210,145
             C 200,165 190,200 190,240
             C 190,285 220,315 230,360
             C 185,395 145,360 145,245 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeOpacity="0.4"
        />

        {/* Top & Right Face - Purple Ribbon */}
        <path
          d="M 250,70
             C 330,70 380,120 380,220
             C 340,220 300,190 250,190
             C 180,190 150,110 250,70 Z"
          fill="url(#korixaPurple)"
        />
        {/* Inside groove in Top face */}
        <path
          d="M 265,95
             C 315,95 345,130 350,190
             C 320,185 290,165 255,165
             C 205,165 185,115 265,95 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeOpacity="0.45"
        />

        {/* Bottom Face - Orange Ribbon */}
        <path
          d="M 380,250
             C 380,310 330,380 250,420
             C 260,390 270,360 270,320
             C 270,270 230,245 190,245
             C 280,245 380,210 380,250 Z"
          fill="url(#korixaOrange)"
        />
        {/* Inside groove in bottom face */}
        <path
          d="M 355,260
             C 355,300 315,350 260,380
             C 270,355 280,335 280,310
             C 280,275 255,260 220,260
             C 285,260 355,235 355,260 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          strokeOpacity="0.4"
        />
      </g>
    </svg>
  );
}

export default function KORIXALogo({
  className = "",
  iconOnly = false,
  size = "md",
  light = false,
}: LogoProps) {
  const containerClasses = "flex items-center gap-3 select-none";

  const sizeTextClasses = {
    sm: "text-lg font-black tracking-tight",
    md: "text-2xl font-black tracking-tighter",
    lg: "text-4xl font-extrabold tracking-tighter",
    xl: "text-6xl font-black tracking-tightest",
  };

  if (iconOnly) {
    return <KORIXAIcon size={size} className={className} />;
  }

  return (
    <div className={`${containerClasses} ${className}`} id="korixa-logo-wrapper">
      <KORIXAIcon size={size} className="shrink-0" />
      {/* Sleek, futuristic geometric logo text representing KORIXA */}
      <div className={`flex flex-col justify-center`}>
        <div className="flex items-baseline">
          <span className={`${sizeTextClasses[size]} ${light ? "text-white" : "text-slate-900"} font-sans tracking-tight leading-none`}>
            KORI
          </span>
          <span className={`${sizeTextClasses[size]} text-violet-600 font-sans tracking-tight leading-none`}>
            X
          </span>
          <span className={`${sizeTextClasses[size]} text-orange-500 font-sans tracking-tight leading-none`}>
            A
          </span>
        </div>
        <span className={`text-[10px] md:text-[11px] ${light ? "text-emerald-400" : "text-emerald-500"} font-mono font-bold tracking-widest mt-0.5 leading-none uppercase`}>
          Smart Locker Systems
        </span>
      </div>
    </div>
  );
}
