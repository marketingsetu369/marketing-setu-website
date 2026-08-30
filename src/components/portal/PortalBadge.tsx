"use client";

import { AppBadge, AppBadgeProps, BadgeVariant } from "@/library/ui/AppBadge";
import React from "react";

export type { BadgeVariant };

export interface PortalBadgeProps extends AppBadgeProps {
  icon?: React.ReactNode;
}

export default function PortalBadge({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}: PortalBadgeProps) {
  return (
    <AppBadge variant={variant} size={size} className={className} {...props}>
      {icon}
      {children}
    </AppBadge>
  );
}
