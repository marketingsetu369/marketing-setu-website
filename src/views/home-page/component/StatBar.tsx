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
    <div className="flex flex-wrap gap-4 mt-8">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center bg-paper border border-outline rounded-2xl px-8 py-4 shadow-z1 min-w-[110px]"
        >
          <span className="text-2xl font-extrabold text-primary tracking-tight leading-none">
            {s.value}
          </span>
          <span className="text-xs text-secondary mt-1 font-medium text-center">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
