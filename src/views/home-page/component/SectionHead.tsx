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
  const style = center
    ? { marginLeft: "auto", marginRight: "auto", display: "inline-flex" as const }
    : undefined;

  return (
    <div className={`section-head${center ? " center" : ""}`}>
      <span className="eyebrow" style={style}>
        {eyebrow}
      </span>
      <h2>{heading}</h2>
      {subtext && <p style={{ margin: "0 auto" }}>{subtext}</p>}
    </div>
  );
}
