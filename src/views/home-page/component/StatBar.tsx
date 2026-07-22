import React from "react";

export interface Stat {
  value: string;
  label: string;
}

interface StatBarProps {
  stats: Stat[];
}

export default function StatBar({ stats }: StatBarProps) {
  return (
    <div className="hero-stats">
      {stats.map((s, i) => (
        <div key={i} className="stat reveal">
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
