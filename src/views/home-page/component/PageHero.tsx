import Link from "next/link";
import React from "react";
import BridgeDivider from "./BridgeDivider";

interface PageHeroProps {
  breadcrumbLabel: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  children?: React.ReactNode;
}

export default function PageHero({
  breadcrumbLabel,
  eyebrow,
  title,
  lead,
  children,
}: PageHeroProps) {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link> / {breadcrumbLabel}
          </div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </section>

      <BridgeDivider tinted />
    </>
  );
}
