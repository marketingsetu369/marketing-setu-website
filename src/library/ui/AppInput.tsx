import React from "react";

export interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function AppInput({
  className = "",
  error,
  label,
  id,
  ...props
}: AppInputProps) {
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
      <input
        id={id}
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-lg border bg-transparent text-primary placeholder:text-disabled text-sm font-medium outline-none transition-all focus:border-brand-main focus:ring-1 focus:ring-brand-main ${
          error ? "border-error-main" : "border-outline"
        } ${className}`}
      />
      {error && <p className="text-xs font-medium text-error-main">{error}</p>}
    </div>
  );
}

export default AppInput;
