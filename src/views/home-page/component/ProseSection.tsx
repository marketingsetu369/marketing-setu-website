import React, { ReactNode } from "react";

interface ProseSectionProps {
  children: ReactNode;
}

/**
 * Shared wrapper for long-form prose content pages
 * (Privacy Policy, Terms of Service, blog articles, etc.)
 */
export default function ProseSection({ children }: ProseSectionProps) {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <article className="post reveal">{children}</article>
      </div>
    </section>
  );
}
