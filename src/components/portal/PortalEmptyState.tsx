"use client";

import { AppEmptyState, AppEmptyStateProps } from "@/library/ui/AppEmptyState";
import React from "react";

export interface PortalEmptyStateProps extends AppEmptyStateProps {}

export default function PortalEmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: PortalEmptyStateProps) {
  return (
    <AppEmptyState
      icon={icon}
      title={title}
      description={description}
      action={action}
      className={`rounded-2xl border-2 border-dashed border-outline bg-paper/50 ${className}`}
    />
  );
}
