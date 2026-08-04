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
      <section className="pt-32 pb-16 bg-brand-grayLight/40 dark:bg-brand-dark/40 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-sm text-brand-gray dark:text-gray-400 mb-4 font-semibold">
            <Link href="/" className="hover:text-brand-purple transition-colors">Home</Link> / {breadcrumbLabel}
          </div>
          {eyebrow && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse"></span>
              {eyebrow}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-brand-dark dark:text-white tracking-tight mb-4">{title}</h1>
          {lead && <p className="text-lg text-brand-gray dark:text-gray-300 max-w-3xl leading-relaxed mb-6">{lead}</p>}
          {children}
        </div>
      </section>
    </>
  );
}
