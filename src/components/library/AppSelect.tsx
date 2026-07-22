import React from "react";
import FieldWrapper from "./FieldWrapper";

interface AppSelectOption {
  value: string;
  label: string;
}

interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  fullWidth?: boolean;
  options: AppSelectOption[];
  error?: string;
}

export const AppSelect: React.FC<AppSelectProps> = ({ 
  label, 
  id, 
  fullWidth, 
  options, 
  className, 
  error,
  ...props 
}) => {
  return (
    <FieldWrapper label={label} id={id} fullWidth={fullWidth} className={className} error={error}>
      <select id={id} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default AppSelect;
