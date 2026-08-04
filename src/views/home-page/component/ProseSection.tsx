import React, { ReactNode } from "react";

interface ProseSectionProps {
  children: ReactNode;
}

export default function ProseSection({ children }: ProseSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-brand-dark text-brand-dark dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose dark:prose-invert max-w-none text-base leading-relaxed space-y-6">
          {children}
        </article>
      </div>
    </section>
  );
}
