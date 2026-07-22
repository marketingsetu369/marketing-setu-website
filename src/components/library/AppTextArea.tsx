import React from "react";
import FieldWrapper from "./FieldWrapper";

interface AppTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  fullWidth?: boolean;
  error?: string;
}

export const AppTextArea: React.FC<AppTextAreaProps> = ({ 
  label, 
  id, 
  fullWidth, 
  className, 
  error,
  ...props 
}) => {
  return (
    <FieldWrapper label={label} id={id} fullWidth={fullWidth} className={className} error={error}>
      <textarea id={id} {...props} />
    </FieldWrapper>
  );
};

export default AppTextArea;
