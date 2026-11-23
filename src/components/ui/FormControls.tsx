import React from "react";

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: React.ReactNode;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, hint, id, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-bold text-primary tracking-wide">
            {label}
            {required && <span className="text-error-main ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-grey-900/50 text-primary placeholder:text-secondary/50 font-medium text-sm transition-all duration-300 outline-none ${
            error
              ? "border-red-500/80 focus:border-red-500"
              : "border-gray-300 dark:border-gray-700 focus:border-brand-main"
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {hint && !error && <div className="text-xs text-secondary font-normal">{hint}</div>}
        {error && <span className="text-xs font-semibold text-error-main animate-fade-in">{error}</span>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: React.ReactNode;
  charCount?: number;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, required, hint, charCount, id, rows = 4, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {(label || charCount !== undefined) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={id} className="text-sm font-bold text-primary tracking-wide">
                {label}
                {required && <span className="text-error-main ml-1">*</span>}
              </label>
            )}
            {charCount !== undefined && (
              <span className="text-xs text-secondary font-medium">{charCount} chars</span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-grey-900/50 text-primary placeholder:text-secondary/50 font-medium text-sm transition-all duration-300 outline-none resize-none ${
            error
              ? "border-red-500/80 focus:border-red-500"
              : "border-gray-300 dark:border-gray-700 focus:border-brand-main"
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {hint && !error && <div className="text-xs text-secondary font-normal">{hint}</div>}
        {error && <span className="text-xs font-semibold text-error-main animate-fade-in">{error}</span>}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, required, options, id, children, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-bold text-primary tracking-wide">
            {label}
            {required && <span className="text-error-main ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={`w-full px-4 py-3.5 rounded-xl border bg-gray-50 dark:bg-grey-900/50 text-primary placeholder:text-secondary/50 font-medium text-sm transition-all duration-300 outline-none appearance-none cursor-pointer ${
            error
              ? "border-red-500/80 focus:border-red-500"
              : "border-gray-300 dark:border-gray-700 focus:border-brand-main"
          } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-background text-primary">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <span className="text-xs font-semibold text-error-main animate-fade-in">{error}</span>}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";
