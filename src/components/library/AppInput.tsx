import React from "react";
import FieldWrapper from "./FieldWrapper";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  fullWidth?: boolean;
  error?: string;
}

export const AppInput: React.FC<AppInputProps> = ({ label, id, fullWidth, className, error, ...props }) => {
  return (
    <FieldWrapper label={label} id={id} fullWidth={fullWidth} className={className} error={error}>
      <input id={id} {...props} />
    </FieldWrapper>
  );
};

export default AppInput;
