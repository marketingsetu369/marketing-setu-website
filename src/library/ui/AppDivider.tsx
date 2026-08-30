import React from "react";

export interface AppDividerProps {
  label?: string;
  className?: string;
}

export function AppDivider({ label, className = "" }: AppDividerProps) {
  if (!label) {
    return <hr className={`border-t border-outline w-full my-4 ${className}`} />;
  }

  return (
    <div className={`relative flex items-center justify-center my-4 ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-outline" />
      </div>
      <div className="relative px-3 bg-paper text-xs font-semibold uppercase tracking-wider text-disabled">
        {label}
      </div>
    </div>
  );
}

export default AppDivider;
