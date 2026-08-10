import React, { ReactNode } from "react";

interface SectionHeadProps {
  eyebrow: string;
  heading: ReactNode;
  subtext?: string;
  center?: boolean;
}

export default function SectionHead({
  eyebrow,
  heading,
  subtext,
  center = true,
}: SectionHeadProps) {
  return (
    <div className={`space-y-4 ${center ? "text-center" : "text-left"}`}>
      {/* Eyebrow Badge */}
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper border border-outline text-[11px] font-semibold text-secondary shadow-z1 ${center ? "mx-auto" : ""}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-main animate-pulse" />
        {eyebrow}
      </span>
      
      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary leading-tight max-w-3xl mx-auto">
        {heading}
      </h2>
      
      {/* Subtext Paragraph */}
      {subtext && (
        <p className="text-base text-secondary max-w-2xl mx-auto leading-relaxed">
          {subtext}
        </p>
      )}
    </div>
  );
}

