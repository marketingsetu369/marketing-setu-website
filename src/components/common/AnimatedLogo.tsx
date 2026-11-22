"use client";

import React from "react";

interface AnimatedLogoProps {
  className?: string;
}

export default function AnimatedLogo({ className = "h-9 sm:h-10 w-auto" }: AnimatedLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="160 95 465 235"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="bridgeFlowGrad" x1="150" y1="310" x2="620" y2="115" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F2C59" />
          <stop offset="50%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F2C59" />
        </linearGradient>

        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        <linearGradient id="leafGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>

        <clipPath id="pathwaySweepClip">
          <rect className="sweep-rect" x="240" y="100" width="0" height="230" />
        </clipPath>

        <style>{`
          .bridge-structure {
            opacity: 0;
            transform: translateY(12px);
            animation: riseFade 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          }
          .bridge-cable {
            stroke-dasharray: 320;
            stroke-dashoffset: 320;
            animation: drawCable 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.35s forwards;
          }
          .suspender-line {
            opacity: 0;
            animation: simpleFade 0.5s ease-out 0.65s forwards;
          }
          .growth-bar {
            transform: scaleY(0);
            animation: growBar 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          .bar-1 {
            transform-origin: 415px 226px;
            animation-delay: 0.6s;
          }
          .bar-2 {
            transform-origin: 445px 220px;
            animation-delay: 0.72s;
          }
          .bar-3 {
            transform-origin: 475px 208px;
            animation-delay: 0.84s;
          }
          .sweep-rect {
            animation: sweepOpen 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards;
          }
          .leaf-upper {
            opacity: 0;
            transform-origin: 518px 176px;
            transform: scale(0.3) rotate(-18deg);
            animation: unfurlLeaf 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s forwards;
          }
          .leaf-lower {
            opacity: 0;
            transform-origin: 532px 232px;
            transform: scale(0.3) rotate(18deg);
            animation: unfurlLeaf 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.42s forwards;
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
            to { width: 390px; }
          }
          @keyframes unfurlLeaf {
            to { opacity: 1; transform: scale(1) rotate(0deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .bridge-structure,
            .bridge-cable,
            .suspender-line,
            .growth-bar,
            .sweep-rect,
            .leaf-upper,
            .leaf-lower {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
              stroke-dashoffset: 0 !important;
              width: 390px !important;
            }
          }
        `}</style>
      </defs>

      <g id="marketing-setu-emblem">
        {/* 1. Bridge Towers & Deck */}
        <g className="bridge-structure">
          <path d="M276 110 H290 L294 252 H272 Z" fill="#0F2C59" />
          <path d="M332 110 H346 L350 232 H328 Z" fill="#0F2C59" />
          <rect x="284" y="138" width="54" height="10" rx="2" fill="#0F2C59" />
          <rect x="282" y="175" width="58" height="7" rx="1.5" fill="#0F2C59" />
          <path d="M175 262 H295 L355 244" fill="none" stroke="#0F2C59" strokeWidth="7" strokeLinecap="round" />
        </g>

        {/* 2. Main Suspension Cables */}
        <path className="bridge-cable" d="M180 258 C230 235, 265 185, 283 116" fill="none" stroke="#0F2C59" strokeWidth="5.5" strokeLinecap="round" />
        <path className="bridge-cable" d="M283 116 C300 175, 322 175, 339 116" fill="none" stroke="#0F2C59" strokeWidth="5" strokeLinecap="round" />
        <path className="bridge-cable" d="M339 116 C358 175, 392 212, 435 224" fill="none" stroke="#0F2C59" strokeWidth="5" strokeLinecap="round" />

        {/* Vertical Suspender Cables */}
        <g className="suspender-line" stroke="#0F2C59" strokeWidth="2.5" strokeLinecap="round">
          <line x1="210" y1="244" x2="210" y2="262" />
          <line x1="230" y1="228" x2="230" y2="262" />
          <line x1="250" y1="202" x2="250" y2="262" />
          <line x1="268" y1="162" x2="268" y2="262" />
          <line x1="303" y1="156" x2="303" y2="242" />
          <line x1="319" y1="156" x2="319" y2="236" />
          <line x1="362" y1="162" x2="362" y2="225" />
          <line x1="382" y1="188" x2="382" y2="223" />
          <line x1="402" y1="208" x2="402" y2="223" />
        </g>

        {/* 3. Rising Analytics Bars */}
        <rect className="growth-bar bar-1" x="405" y="182" width="20" height="44" rx="3" fill="url(#barGrad1)" />
        <rect className="growth-bar bar-2" x="435" y="160" width="20" height="60" rx="3" fill="url(#barGrad1)" />
        <rect className="growth-bar bar-3" x="465" y="136" width="20" height="72" rx="3" fill="url(#barGrad2)" />

        {/* 4. Organic Growth Leaves */}
        <g className="leaf-upper">
          <path d="M518 176 C502 152, 504 126, 524 112 C538 132, 536 158, 518 176 Z" fill="url(#leafGrad)" />
          <path d="M518 173 C516 154, 519 135, 523 120" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
        </g>

        <g className="leaf-lower">
          <path d="M532 232 C552 204, 586 198, 616 206 C598 232, 566 244, 532 232 Z" fill="url(#leafGrad)" />
          <path d="M536 230 C562 222, 584 214, 606 209" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
        </g>

        {/* 5. Dynamic Connecting Bridge Pathway & Arrow */}
        <g clipPath="url(#pathwaySweepClip)">
          <path
            d="M250 315 C295 255, 375 258, 445 235 C500 217, 540 185, 572 145 L552 136 L608 110 L602 170 L584 157 C546 205, 500 242, 435 262 C368 282, 315 278, 286 315 Z"
            fill="url(#bridgeFlowGrad)"
          />
          <path
            d="M302 315 C330 282, 385 285, 448 265 C488 252, 520 232, 545 206 C526 238, 492 264, 446 279 C388 298, 345 294, 326 315 Z"
            fill="#0D9488"
          />
          <path d="M486 258 C504 275, 515 295, 518 315 H502 C499 296, 490 280, 474 266 Z" fill="#0D9488" />
        </g>
      </g>
    </svg>
  );
}
