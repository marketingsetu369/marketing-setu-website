"use client";

import { AppCard } from "@/components/library/AppCard";
import React from "react";

export interface PortalStatCardProps {
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

export default function PortalStatCard({
  label,
  value,
  icon,
  iconBgColor = "bg-brand-lighter text-brand-main",
  subtext,
  trend,
  onClick,
  className = "",
}: PortalStatCardProps) {
  return (
    <AppCard
      elevation="md"
      hoverElevation={onClick ? "lg" : "sm"}
      onClick={onClick}
      className={`!p-5 ${
        onClick ? "cursor-pointer transition-all" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBgColor}`}>
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
