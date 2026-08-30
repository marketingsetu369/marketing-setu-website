"use client";

import { AppCard } from "@/components/library/AppCard";
import React from "react";

export interface PortalCardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerIcon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  hoverElevation?: "none" | "sm" | "md" | "lg" | "xl";
}

const paddingStyles = {
  none: "!p-0",
  sm: "!p-4",
  md: "!p-5 sm:!p-6",
  lg: "!p-6 sm:!p-8",
};

export default function PortalCard({
  title,
  subtitle,
  action,
  headerIcon,
  children,
  className = "",
  padding = "md",
  elevation = "md",
  hoverElevation,
}: PortalCardProps) {
  const hasHeader = Boolean(title || action || headerIcon);

  return (
    <AppCard
      elevation={elevation}
      hoverElevation={hoverElevation}
      className={`${paddingStyles[padding]} ${className}`}
    >
      {hasHeader && (
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            {headerIcon && (
              <div className="w-8 h-8 rounded-xl bg-brand-lighter text-brand-main flex items-center justify-center shrink-0">
                {headerIcon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-base font-semibold text-primary tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-secondary font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children}
    </AppCard>
  );
}
