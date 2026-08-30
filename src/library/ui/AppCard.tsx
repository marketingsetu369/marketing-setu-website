import React from "react";

export interface AppCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  hoverElevation?: "none" | "sm" | "md" | "lg" | "xl";
}

export function AppCard({
  children,
  className = "",
  elevation = "md",
  hoverElevation,
  ...props
}: AppCardProps) {
  const shadows = {
    none: "shadow-none",
    sm: "shadow-z4",
    md: "shadow-card", // Default Minimals card shadow
    lg: "shadow-z12",
    xl: "shadow-z24",
  };

  const shadowClass = shadows[elevation];
  const hoverShadowClass = hoverElevation
    ? `hover:${shadows[hoverElevation]} transition-all duration-300`
    : "";

  return (
    <div
      {...props}
      className={`rounded-2xl bg-paper p-4 sm:p-6 ${shadowClass} ${hoverShadowClass} ${className}`}
    >
      {children}
    </div>
  );
}

export default AppCard;
