import React from "react";

interface BridgeDividerProps {
  tinted?: boolean;
}

export default function BridgeDivider({ tinted = false }: BridgeDividerProps) {
  return (
    <div className="w-full flex items-center justify-center py-2 bg-background">
      <svg 
        className={`w-full max-w-[1280px] h-12 stroke-current ${tinted ? "text-brand-light/35 dark:text-brand-dark/20" : "text-outline"}`}
        viewBox="0 0 1180 44" 
        preserveAspectRatio="none" 
        aria-hidden="true"
      >
        <path d="M0 6 Q 295 40 590 6 T 1180 6" fill="none" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

