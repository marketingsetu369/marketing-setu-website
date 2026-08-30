import React from "react";

export interface AppTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export function AppTextArea({
  className = "",
  error,
  label,
  id,
  rows = 3,
  ...props
}: AppTextAreaProps) {
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
      <textarea
        id={id}
        rows={rows}
        {...props}
        className={`w-full px-3.5 py-2.5 rounded-lg border bg-transparent text-primary placeholder:text-disabled text-sm font-medium outline-none transition-all focus:border-brand-main focus:ring-1 focus:ring-brand-main ${
          error ? "border-error-main" : "border-outline"
        } ${className}`}
      />
      {error && <p className="text-xs font-medium text-error-main">{error}</p>}
    </div>
  );
}

export default AppTextArea;
