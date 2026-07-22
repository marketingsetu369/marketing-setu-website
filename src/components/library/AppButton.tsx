import React from "react";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "whatsapp" | "ghost";
  fullWidth?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({ 
  children, 
  variant, 
  fullWidth, 
  className, 
  ...props 
}) => {
  // Safe format to avoid double btn- prefixes if they are already in the passed className
  const hasBtn = className?.includes("btn");
  const baseClass = hasBtn ? "" : "btn";
  const variantClass = variant && !className?.includes(`btn-${variant}`) ? `btn-${variant}` : "";
  const blockClass = fullWidth && !className?.includes("btn-block") ? "btn-block" : "";

  const btnClass = `${baseClass} ${variantClass} ${blockClass} ${className || ""}`.replace(/\s+/g, " ").trim();

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};

export default AppButton;
