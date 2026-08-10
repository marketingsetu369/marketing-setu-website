import Link from "next/link";
import React from "react";

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
    <section className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-background border-b border-outline">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-lighter/30 dark:bg-brand-dark/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="text-xs sm:text-sm text-secondary mb-4 font-medium tracking-tight">
          <Link href="/" className="hover:text-brand-main transition-colors">Home</Link>
          <span className="mx-2 text-disabled">/</span>
          <span className="text-primary font-semibold">{breadcrumbLabel}</span>
        </div>

        {/* Eyebrow Badge */}
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-outline text-[11px] font-semibold text-secondary mb-5 shadow-z1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-main animate-pulse" />
            {eyebrow}
          </div>
        )}

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary tracking-tight leading-[1.15] mb-5 max-w-4xl">
          {title}
        </h1>

        {/* Lead Subtitle */}
        {lead && (
          <p className="text-base sm:text-lg text-secondary max-w-3xl leading-relaxed mb-6 font-normal">
            {lead}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}

