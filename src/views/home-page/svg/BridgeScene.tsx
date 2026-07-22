import React from "react";

export default function BridgeScene() {
  return (
    <svg className="bridge-scene" viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bridge arc connecting a shop to a customer, representing MarketingSetu">
      <defs>
        <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--blue)" />
          <stop offset="100%" stopColor="var(--green)" />
        </linearGradient>
      </defs>
      <path className="arc" d="M 40 210 Q 260 40 480 210" />
      <circle className="node" cx="40" cy="210" r="26" />
      <circle className="node-fill" cx="40" cy="210" r="10" />
      <text x="40" y="215" textAnchor="middle" fontSize="14" fill="white" fontFamily="Inter">🏪</text>
      <circle className="node" cx="480" cy="210" r="26" />
      <circle className="node-fill green" cx="480" cy="210" r="10" />
      <text x="480" y="215" textAnchor="middle" fontSize="14" fill="white" fontFamily="Inter">🙋</text>
      <circle className="pulse" r="7" />
      <text x="260" y="30" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="12" fill="var(--slate)">
        setu · your bridge to customers
      </text>
    </svg>
  );
}
