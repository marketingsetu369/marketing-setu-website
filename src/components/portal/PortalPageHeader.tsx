"use client";

import { AppPageHeader, AppPageHeaderProps } from "@/library/ui/AppPageHeader";
import React from "react";

export interface PortalPageHeaderProps extends AppPageHeaderProps {
  children?: React.ReactNode;
}

export default function PortalPageHeader({
  title,
  description,
  badge,
  actions,
  children,
  className = "",
}: PortalPageHeaderProps) {
  const mergedActions = actions || children ? (
    <>
      {actions}
      {children}
    </>
  ) : undefined;

  return (
    <AppPageHeader
      title={title}
      description={description}
      badge={badge}
      actions={mergedActions}
      className={className}
    />
  );
}
