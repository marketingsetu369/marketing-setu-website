"use client";

import { AppCard } from "@/components/library/AppCard";
import Link from "next/link";
import React, { ReactNode } from "react";

export interface PortalActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  iconBgColor?: string;
  actionText?: string;
  href: string;
  className?: string;
}

export function PortalActionCard({
  title,
  description,
  icon,
  iconBgColor = "bg-brand-lighter text-brand-main",
  actionText = "Open",
  href,
  className = "",
}: PortalActionCardProps) {
  return (
    <AppCard
      elevation="md"
      hoverElevation="lg"
      className={`flex flex-col justify-between space-y-4 ${className}`}
    >
      <div className="space-y-2.5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBgColor}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-primary">
            {title}
          </h3>
          <p className="text-xs text-secondary font-normal leading-relaxed mt-1">
            {description}
          </p>
        </div>
      </div>

      <Link
        href={href}
        className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-neutral hover:bg-brand-lighter/50 dark:hover:bg-neutral text-xs font-semibold text-secondary hover:text-brand-main transition-colors"
      >
        <span>{actionText}</span>
        <span>&rarr;</span>
      </Link>
    </AppCard>
  );
}

export default PortalActionCard;
