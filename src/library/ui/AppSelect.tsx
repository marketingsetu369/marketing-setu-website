import React from "react";

export interface AppSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  children: React.ReactNode;
}

export function AppSelect({
  className = "",
  error,
  label,
  id,
  children,
  ...props
}: AppSelectProps) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-secondary"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-lg border bg-transparent text-primary text-sm font-medium outline-none transition-all focus:border-brand-main focus:ring-1 focus:ring-brand-main ${
          error ? "border-error-main" : "border-outline"
        } ${className}`}
      >
        {children}
      </select>
      {error && <p className="text-xs font-medium text-error-main">{error}</p>}
    </div>
  );
}

export default AppSelect;
