import React from "react";

export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "solid" | "dashed";
  className?: string;
}

export function SectionCard({
  children,
  variant = "solid",
  className = "",
  ...props
}: SectionCardProps) {
  const borderClass =
    variant === "dashed"
      ? "border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-main dark:hover:border-brand-secondary"
      : "border border-outline shadow-card";

  return (
    <div
      className={`bg-paper rounded-3xl p-8 sm:p-10 transition-all duration-300 ${borderClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SectionBadgeProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function SectionBadge({ children, icon, className = "" }: SectionBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light text-brand-secondary border border-brand-secondary/20 text-xs font-bold uppercase tracking-wider ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

export interface ColorPickerSwatchProps {
  colors: { hex: string; name: string }[];
  selectedColor: string;
  onSelect: (hex: string) => void;
  label?: string;
}

export function ColorPickerSwatch({
  colors,
  selectedColor,
  onSelect,
  label = "Accent Color Theme",
}: ColorPickerSwatchProps) {
  return (
    <div className="flex flex-col gap-2 pt-2 border-t border-outline/30">
      {label && (
        <label className="text-xs font-bold text-secondary uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        {colors.map((c) => (
          <button
            key={c.hex}
            type="button"
            onClick={() => onSelect(c.hex)}
            style={{ backgroundColor: c.hex }}
            title={c.name}
            className={`w-7 h-7 rounded-full transition-all cursor-pointer ${
              selectedColor.toLowerCase() === c.hex.toLowerCase()
                ? "ring-2 ring-offset-2 ring-brand-main dark:ring-brand-secondary scale-110 shadow-sm"
                : "hover:scale-105 opacity-80 hover:opacity-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
