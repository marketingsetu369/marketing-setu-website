import React from "react";

interface PageHeroProps {
  breadcrumbLabel?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
  center = false,
}: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-brand-lighter/30 dark:bg-brand-dark/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      
      <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${center ? "text-center" : ""}`}>
        {eyebrow && (
          <div className={`mb-3.5 ${center ? "flex justify-center" : ""}`}>
            <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-light text-brand-secondary border border-brand-secondary/20 text-xs font-bold uppercase tracking-wider">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1 className={`text-3xl sm:text-4xl lg:text-[44px] font-bold text-primary tracking-tight leading-[1.18] mb-4 ${center ? "max-w-4xl mx-auto" : "max-w-4xl"}`}>
          {title}
        </h1>

        {/* Lead Subtitle */}
        {lead && (
          <div className={`text-sm sm:text-base text-secondary leading-relaxed mb-6 font-normal ${center ? "max-w-2xl mx-auto" : "max-w-3xl"}`}>
            {lead}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}

