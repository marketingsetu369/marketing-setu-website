"use client";

import React from "react";
import AppCard from "./AppCard";

export interface AppStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  subtext?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

export function AppStatCard({
  label,
  value,
  icon,
  iconBgColor = "bg-brand-lighter/70 dark:bg-brand-darker/60 text-brand-main",
  subtext,
  trend,
  onClick,
  className = "",
}: AppStatCardProps) {
  return (
    <AppCard
      elevation="md"
      hoverElevation={onClick ? "lg" : "sm"}
      onClick={onClick}
      className={`!p-5 ${
        onClick ? "cursor-pointer transition-all hover:bg-neutral/50" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              trend.isPositive
                ? "text-success-main bg-success-lighter dark:bg-success-darker/40"
                : "text-error-main bg-error-lighter dark:bg-error-darker/40"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-[11px] text-disabled font-medium">
          {subtext}
        </p>
      )}
    </AppCard>
  );
}

export default AppStatCard;
