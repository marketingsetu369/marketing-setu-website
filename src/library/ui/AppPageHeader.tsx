import React from "react";

export interface AppPageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function AppPageHeader({
  title,
  description,
  badge,
  actions,
  className = "",
}: AppPageHeaderProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${className}`}
    >
      <div className="space-y-1">
        {badge && <div className="mb-1.5">{badge}</div>}
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-secondary font-normal max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
          {actions}
        </div>
      )}
    </div>
  );
}

export default AppPageHeader;
