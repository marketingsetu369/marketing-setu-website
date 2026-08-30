import React from "react";

export interface AppAvatarProps {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  status?: "online" | "offline" | "busy" | "away";
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs font-semibold",
  md: "w-10 h-10 text-sm font-bold",
  lg: "w-14 h-14 text-lg font-bold",
  xl: "w-20 h-20 text-2xl font-bold",
};

const statusColors = {
  online: "bg-success-main",
  offline: "bg-disabled",
  busy: "bg-error-main",
  away: "bg-warning-main",
};

export function AppAvatar({
  name = "User",
  src,
  size = "md",
  className = "",
  status,
}: AppAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="relative inline-block select-none shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={`rounded-full object-cover border border-outline ${sizeStyles[size]} ${className}`}
        />
      ) : (
        <div
          className={`rounded-full bg-brand-lighter/70 dark:bg-brand-darker/60 text-brand-main flex items-center justify-center shadow-inner ${sizeStyles[size]} ${className}`}
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-paper ${statusColors[status]}`}
        />
      )}
    </div>
  );
}

export default AppAvatar;
