import React from "react";

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "whatsapp";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function AppButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: AppButtonProps) {
  const sizeStyles = {
    sm: "px-3.5 py-2 text-xs font-semibold rounded-lg",
    md: "px-5 py-3 text-sm font-bold rounded-lg",
    lg: "px-7 py-3.5 text-base font-bold rounded-lg",
  };

  const variantStyles = {
    primary:
      "bg-brand-main text-white hover:bg-brand-dark shadow-z4 hover:shadow-z8 active:scale-[0.99]",
    secondary:
      "bg-neutral text-primary hover:bg-brand-lighter/50 dark:hover:bg-neutral hover:text-brand-main border border-outline active:scale-[0.99]",
    outline:
      "bg-transparent text-primary border border-outline hover:bg-neutral hover:border-brand-main active:scale-[0.99]",
    ghost:
      "bg-transparent text-secondary hover:text-primary hover:bg-neutral active:scale-[0.99]",
    danger:
      "bg-error-main text-white hover:bg-error-dark shadow-z4 hover:shadow-z8 active:scale-[0.99]",
    success:
      "bg-success-main text-white hover:bg-success-dark shadow-z4 hover:shadow-z8 active:scale-[0.99]",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-z4 hover:shadow-z8 active:scale-[0.99]",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default AppButton;
