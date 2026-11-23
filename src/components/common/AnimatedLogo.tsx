"use client";

import React from "react";

interface AnimatedLogoProps {
  className?: string;
}

export default function AnimatedLogo({ className = "h-9 sm:h-10 w-auto" }: AnimatedLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="150 95 480 235"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="bridgeFlowGrad" x1="150" y1="310" x2="620" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#003058" />
          <stop offset="45%" stopColor="#089848" />
          <stop offset="100%" stopColor="#089848" />
        </linearGradient>

        <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#089848" />
          <stop offset="100%" stopColor="#089848" />
        </linearGradient>

        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#089848" />
          <stop offset="100%" stopColor="#089848" />
        </linearGradient>

        <clipPath id="pathwaySweepClip">
          <rect className="sweep-rect" x="220" y="90" width="0" height="240" />
        </clipPath>

        <style>{`
          .bridge-structure {
            opacity: 0;
            transform: translateY(10px);
            animation: riseFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          }
          .bridge-cable {
            stroke-dasharray: 360;
            stroke-dashoffset: 360;
            animation: drawCable 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.3s forwards;
          }
          .suspender-line {
            opacity: 0;
            animation: simpleFade 0.5s ease-out 0.6s forwards;
          }
          .growth-bar {
            transform: scaleY(0);
            animation: growBar 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .bar-1 {
            transform-origin: 430px 226px;
            animation-delay: 0.55s;
          }
          .bar-2 {
            transform-origin: 462px 220px;
            animation-delay: 0.68s;
          }
          .bar-3 {
            transform-origin: 494px 208px;
            animation-delay: 0.8s;
          }
          .sweep-rect {
            animation: sweepOpen 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.8s forwards;
          }

          @keyframes riseFade {
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes drawCable {
            to { stroke-dashoffset: 0; }
          }
          @keyframes simpleFade {
            to { opacity: 1; }
          }
          @keyframes growBar {
            to { transform: scaleY(1); }
          }
          @keyframes sweepOpen {
            to { width: 420px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .bridge-structure,
            .bridge-cable,
            .suspender-line,
            .growth-bar,
            .sweep-rect {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              stroke-dashoffset: 0 !important;
              width: 420px !important;
            }
          }
        `}</style>
      </defs>

      <g id="marketing-setu-emblem">
        {/* 1. Bold Bridge Towers & Upper/Lower Braces in Primary Navy Blue #003058 */}
        <g className="bridge-structure">
          {/* Main Left Pillar (Bolder width) */}
          <path d="M280 108 H298 L303 252 H275 Z" fill="#003058" />
          {/* Main Right Pillar (Bolder width) */}
          <path d="M342 108 H360 L365 232 H337 Z" fill="#003058" />
          
          {/* Horizontal Bridge Tower Crossbars */}
          <rect x="290" y="136" width="60" height="13" rx="2" fill="#003058" />
          <rect x="288" y="174" width="64" height="10" rx="2" fill="#003058" />
          
          {/* Roadbed Deck - Bolder stroke */}
          <path d="M165 262 H300 L368 244" fill="none" stroke="#003058" strokeWidth="9" strokeLinecap="round" />
        </g>

        {/* 2. Bold Main Suspension Cables */}
        <path className="bridge-cable" d="M170 258 C225 235, 268 182, 288 114" fill="none" stroke="#003058" strokeWidth="7" strokeLinecap="round" />
        <path className="bridge-cable" d="M288 114 C308 178, 332 178, 351 114" fill="none" stroke="#003058" strokeWidth="6.5" strokeLinecap="round" />
        <path className="bridge-cable" d="M351 114 C372 178, 408 214, 452 225" fill="none" stroke="#003058" strokeWidth="6.5" strokeLinecap="round" />

        {/* Vertical Suspender Cables - Bolder stroke */}
        <g className="suspender-line" stroke="#003058" strokeWidth="3.5" strokeLinecap="round">
          <line x1="205" y1="244" x2="205" y2="262" />
          <line x1="228" y1="226" x2="228" y2="262" />
          <line x1="250" y1="198" x2="250" y2="262" />
          <line x1="272" y1="156" x2="272" y2="262" />
          <line x1="312" y1="152" x2="312" y2="242" />
          <line x1="330" y1="152" x2="330" y2="236" />
          <line x1="375" y1="158" x2="375" y2="226" />
          <line x1="398" y1="184" x2="398" y2="224" />
          <line x1="420" y1="206" x2="420" y2="224" />
        </g>

        {/* 3. Rising Growth Analytics Bars in Primary Growth Green #089848 */}
        <rect className="growth-bar bar-1" x="424" y="174" width="22" height="52" rx="3.5" fill="#089848" />
        <rect className="growth-bar bar-2" x="456" y="148" width="22" height="72" rx="3.5" fill="#089848" />
        <rect className="growth-bar bar-3" x="488" y="118" width="22" height="92" rx="3.5" fill="#089848" />

        {/* 4. Bold Sweeping Pathway & Arrow in Primary Growth Green #089848 */}
        <g clipPath="url(#pathwaySweepClip)">
          {/* Main sweeping dynamic growth arrow */}
          <path
            d="M240 315 C295 250, 385 252, 460 228 C518 208, 560 174, 595 132 L574 122 L634 94 L626 158 L608 144 C568 196, 520 236, 450 258 C378 280, 318 276, 280 315 Z"
            fill="#089848"
          />
          {/* Subtle bridge undertone swoosh in #003058 */}
          <path
            d="M298 315 C330 278, 392 280, 460 258 C505 244, 540 222, 568 194 C546 228, 510 256, 458 273 C396 294, 350 290, 326 315 Z"
            fill="#003058"
          />
        </g>
      </g>
    </svg>
  );
}
