import React from "react";

export interface FieldWrapperProps {
  label: string;
  id: string;
  fullWidth?: boolean;
  className?: string;
  error?: string;
  children: React.ReactNode;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ 
  label, 
  id, 
  fullWidth, 
  className, 
  error,
  children 
}) => {
  return (
    <div className={`field ${fullWidth ? "full" : ""} ${className || ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="error-text">
          {error}
        </span>
      )}
    </div>
  );
};

export default FieldWrapper;
