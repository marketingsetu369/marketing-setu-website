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
    <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-lighter/30 dark:bg-brand-dark/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-semibold text-primary tracking-tight leading-[1.15] mb-5 max-w-4xl">
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

