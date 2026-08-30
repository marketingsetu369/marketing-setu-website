import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export interface AppBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary:
    "bg-brand-lighter/70 dark:bg-brand-darker/50 text-brand-main border border-brand-main/20",
  secondary:
    "bg-neutral text-secondary border border-outline",
  success:
    "bg-success-lighter/70 dark:bg-success-darker/50 text-success-main border border-success-main/20",
  warning:
    "bg-warning-lighter/70 dark:bg-warning-darker/50 text-warning-darker dark:text-warning-light border border-warning-main/20",
  danger:
    "bg-error-lighter/70 dark:bg-error-darker/50 text-error-main border border-error-main/20",
  info:
    "bg-info-lighter/70 dark:bg-info-darker/50 text-info-main border border-info-main/20",
  neutral:
    "bg-neutral text-secondary border border-outline",
};

const dotColors: Record<BadgeVariant, string> = {
  primary: "bg-brand-main",
  secondary: "bg-secondary",
  success: "bg-success-main",
  warning: "bg-warning-main",
  danger: "bg-error-main",
  info: "bg-info-main",
  neutral: "bg-secondary",
};

export function AppBadge({
  children,
  variant = "primary",
  size = "md",
  className = "",
  dot = false,
}: AppBadgeProps) {
  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] font-semibold"
      : "px-2.5 py-1 text-xs font-bold";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full uppercase tracking-wider select-none ${sizeClass} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}

export default AppBadge;
