/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
    lg: "w-24 h-24",
    xl: "w-36 h-36",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={`${sizeClasses[size]} ${className}`}
      aria-label="KORIXA Premium Icon"
    >
      <defs>
        {/* 상단 파란색 -> 보라색 -> 자주색 그라데이션 (정밀 매칭) */}
        <linearGradient id="premiumTopGrad" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#2563eb" /> {/* 선명한 일렉트릭 블루 */}
          <stop offset="35%" stopColor="#3b82f6" /> {/* 선명한 로얄 블루 */}
          <stop offset="65%" stopColor="#8b5cf6" /> {/* 부드러운 퍼플 */}
          <stop offset="100%" stopColor="#ec4899" /> {/* 매혹적인 마젠타 핑크 */}
        </linearGradient>

        {/* 좌측 에메랄드 그린 -> 청록색 -> 민트 그라데이션 (정밀 매칭) */}
        <linearGradient id="premiumLeftGrad" x1="80%" y1="10%" x2="20%" y2="90%">
          <stop offset="0%" stopColor="#3b82f6" /> {/* 상단 블루와 자연스럽게 연결 */}
          <stop offset="25%" stopColor="#10b981" /> {/* 밝은 에메랄드 */}
          <stop offset="65%" stopColor="#059669" /> {/* 딥 에메랄드 그린 */}
          <stop offset="100%" stopColor="#14b8a6" /> {/* 사이언 청록 */}
        </linearGradient>

        {/* 하단 노란색 -> 주황색 -> 하이퍼 레드 -> 마젠타 그라데이션 (정밀 매칭) */}
        <linearGradient id="premiumBottomGrad" x1="10%" y1="10%" x2="90%" y2="80%">
          <stop offset="0%" stopColor="#facc15" /> {/* 골든 옐로우 */}
          <stop offset="30%" stopColor="#f97316" /> {/* 코랄 오렌지 */}
          <stop offset="70%" stopColor="#ef4444" /> {/* 하이퍼 딥 레드 */}
          <stop offset="100%" stopColor="#db2777" /> {/* 핑크 마젠타 팁 */}
        </linearGradient>

        {/* 입체감을 살리는 고급 멀티 레이어 필터 */}
        <filter id="premiumLustreShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodOpacity="0.14" floodColor="#0f172a" />
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.08" floodColor="#3b82f6" />
        </filter>
      </defs>

      {/* 3D Isometric 구조를 직접 수학적 곡선으로 정교하게 재현하여 일그러짐을 완전히 해결 */}
      <g filter="url(#premiumLustreShadow)" strokeLinejoin="round" strokeLinecap="round">
        
        {/* RIGHT/TOP FLUID BAND (Blue to Magenta Pink) */}
        <path
          d="M 182,128 
             C 181,105 210,72 238,76 
             C 285,82 328,102 364,136 
             C 392,162 405,190 398,214 
             C 392,235 375,236 362,218 
             C 334,180 295,152 250,152 
             C 214,152 195,170 184,198 
             C 178,214 162,210 159,198 
             C 155,182 184,148 182,128 Z"
          fill="url(#premiumTopGrad)"
        />

        {/* LEFT/BOTTOM FLUID BAND (Teal to Bright Lime/Emerald) */}
        <path
          d="M 124,196 
             C 112,182 142,126 195,124 
             C 238,122 288,138 312,182 
             C 334,222 322,246 308,252 
             C 294,258 274,252 258,235 
             C 235,212 205,198 178,214 
             C 152,230 148,252 162,285 
             C 170,304 156,312 145,304 
             C 128,292 138,214 124,196 Z"
          transform="rotate(120, 250, 250)"
          fill="url(#premiumLeftGrad)"
        />

        {/* BOTTOM/RIGHT FLUID BAND (Amber Gold to Intense Rose) */}
        <path
          d="M 124,196 
             C 112,182 142,126 195,124 
             C 238,122 288,138 312,182 
             C 334,222 322,246 308,252 
             C 294,258 274,252 258,235 
             C 235,212 205,198 178,214 
             C 152,230 148,252 162,285 
             C 170,304 156,312 145,304 
             C 128,292 138,214 124,196 Z"
          transform="rotate(240, 250, 250)"
          fill="url(#premiumBottomGrad)"
        />

      </g>
    </svg>
  );
}

export function KORIXAText({ className = "", size = "md", light = false }: { className?: string; size?: "sm" | "md" | "lg" | "xl"; light?: boolean }) {
  const sizeClasses = {
    sm: "h-[16px]",
    md: "h-[22px]",
    lg: "h-[36px]",
    xl: "h-[54px]",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 336 60"
      className={`${sizeClasses[size]} ${className}`}
      aria-label="KORIXA Premium Typography"
      fillRule="evenodd"
    >
      <g fill={light ? "#FFFFFF" : "#111314"}>
        
        {/* Letter K */}
        <path d="M 0,0 L 14,0 L 14,24 L 38,0 L 53,0 L 26,27 L 55,60 L 39,60 L 14,31 L 14,60 L 0,60 Z" />
        
        {/* Letter O (Futuristic squircle shape matching the upload) */}
        <path d="M 76,0 L 96,0 C 110,0 114,4 114,18 L 114,42 C 114,56 110,60 96,60 L 76,60 C 62,60 58,56 58,42 L 58,18 C 58,4 62,0 76,0 Z M 78,13 C 74,13 74,16 74,21 L 74,39 C 74,44 74,47 78,47 L 94,47 C 98,47 98,44 98,39 L 98,21 C 98,16 98,13 94,13 Z" />
        
        {/* Letter R */}
        <path d="M 124,0 L 158,0 C 172,0 176,4 176,18 C 176,28 171,32 162,33 L 178,60 L 161,60 L 147,36 L 138,36 L 138,60 L 124,60 Z M 138,12 L 154,12 C 158,12 161,14 161,19 C 161,24 158,26 154,26 L 138,26 Z" />
        
        {/* Letter I */}
        <path d="M 188,0 L 202,0 L 202,60 L 188,60 Z" />
        
        {/* Letter X */}
        <path d="M 214,0 L 232,0 L 242,16 L 252,0 L 270,0 L 253,27 L 271,60 L 253,60 L 242,40 L 231,60 L 213,60 L 232,27 Z" />
        
        {/* Letter A */}
        <path d="M 280,60 L 301,0 L 315,0 L 336,60 L 321,60 L 316,45 L 300,45 L 295,60 Z M 303,34 L 313,34 L 308,17 Z" />
        
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
  const containerClasses = "flex items-center gap-3.5 select-none";

  if (iconOnly) {
    return <KORIXAIcon size={size} className={className} />;
  }

  return (
    <div className={`${containerClasses} ${className}`} id="korixa-logo-wrapper">
      <KORIXAIcon size={size} className="shrink-0 transition-transform duration-300 hover:scale-105" />
      <KORIXAText size={size} light={light} className="shrink-0 transition-opacity duration-300 hover:opacity-90" />
    </div>
  );
}
