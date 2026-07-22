import React from "react";

interface BridgeDividerProps {
  tinted?: boolean;
}

export default function BridgeDivider({ tinted = false }: BridgeDividerProps) {
  return (
    <svg className={`bridge-divider ${tinted ? "tinted" : ""}`} viewBox="0 0 1180 44" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 6 Q 295 40 590 6 T 1180 6" fill="none" strokeWidth="1.5" />
    </svg>
  );
}
