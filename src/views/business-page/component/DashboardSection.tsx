import React from "react";

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <section className="dashboard-section">
      <div className="section-header-wrap">
        <h2 className="section-main-title">{title}</h2>
        <span className="section-accent-line" />
      </div>
      {children}
    </section>
  );
}
