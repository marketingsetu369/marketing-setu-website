import React from "react";

export interface FeatureCardProps {
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "solid" | "dashed";
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon,
  badge,
  title,
  description,
  footer,
  variant = "solid",
  className = "",
  onClick,
}: FeatureCardProps) {
  const borderStyles =
    variant === "dashed"
      ? "border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-brand-main dark:hover:border-brand-secondary"
      : "border border-outline/70 hover:border-brand-main dark:hover:border-brand-secondary";

  return (
    <div
      onClick={onClick}
      className={`group bg-paper rounded-[22px] p-6 sm:p-7 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${borderStyles} ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div>
        {(icon || badge) && (
          <div className="flex items-center justify-between mb-4">
            {icon && (
              <div className="w-11 h-11 rounded-xl bg-brand-light text-brand-main dark:text-brand-secondary flex items-center justify-center border border-brand-secondary/20 shrink-0 transition-transform duration-300 group-hover:scale-105">
                {icon}
              </div>
            )}
            {badge && (
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-secondary bg-neutral border border-outline/50 uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>
        )}

        <h3 className="text-base sm:text-lg font-bold text-primary mb-2 leading-snug group-hover:text-brand-main transition-colors">
          {title}
        </h3>

        <div className="text-secondary text-xs sm:text-[13px] leading-relaxed">
          {description}
        </div>
      </div>

      {footer && <div className="pt-4 mt-5 border-t border-outline/30">{footer}</div>}
    </div>
  );
}

export interface SectionHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-3xl mx-auto mb-10 sm:mb-12 ${center ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <div className={`mb-3.5 ${center ? "flex justify-center" : ""}`}>
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-light text-brand-secondary border border-brand-secondary/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-primary leading-tight mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-secondary text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
