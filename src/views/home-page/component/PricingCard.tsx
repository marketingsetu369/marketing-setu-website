import React from "react";
import { PricingPlan } from "../data/plans";
import Link from "next/link";
import { AppButton } from "@/components/library";

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: (message: string) => void;
  href?: string;
  isCompact?: boolean;
}

export default function PricingCard({
  plan,
  onSelect,
  href,
  isCompact = false,
}: PricingCardProps) {
  const displayFeatures = isCompact && plan.compactFeatures ? plan.compactFeatures : plan.features;

  return (
    <div className={`group p-8 rounded-[24px] transition-all duration-300 relative flex flex-col justify-between border ${
      plan.featured 
        ? "bg-gradient-to-br from-brand-dark to-brand-darker text-white border-brand-main shadow-z12 md:-translate-y-4 lg:scale-105 z-10 hover:shadow-z24 hover:-translate-y-6" 
        : "bg-paper text-primary border-outline shadow-card hover:shadow-z16 hover:-translate-y-1.5"
    }`}>
      {plan.badge && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-z4 whitespace-nowrap ${
          plan.featured 
            ? "bg-[#10C85A] text-white" 
            : "bg-brand-dark text-white dark:bg-brand-lighter dark:text-brand-darker"
        }`}>
          {plan.badge}
        </div>
      )}
      <div>
        <h3 className={`text-2xl font-bold mb-2 ${plan.featured ? "text-white" : "text-primary"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mb-6 ${plan.featured ? "text-white/70" : "text-secondary"}`}>
          {plan.description}
        </p>
        <div className="mb-6 flex items-baseline gap-1">
          <span className={`text-5xl font-extrabold tracking-tight ${plan.featured ? "text-white" : "text-primary"}`}>
            {plan.price}
          </span>
          <span className={`text-xs font-medium ${plan.featured ? "text-white/50" : "text-disabled"}`}>/year</span>
        </div>
        <ul className="space-y-4 mb-8">
          {displayFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className={`font-bold flex-shrink-0 mt-0.5 ${plan.featured ? "text-[#10C85A]" : "text-brand-main"}`}>✓</span>
              <span className={plan.featured ? "text-white/90" : "text-secondary"}>
                <strong className="font-semibold text-primary dark:text-white">{feature.bold}</strong>
                {!isCompact && feature.desc && (
                  <span className={`block text-xs mt-1 ${plan.featured ? "text-white/60" : "text-disabled"}`}>
                    {feature.desc}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {href ? (
          <Link
            href={href}
            className={`w-full py-3.5 rounded-xl text-center text-sm font-semibold transition-all inline-block ${
              plan.featured 
                ? "bg-[#10C85A] hover:bg-[#0EB551] text-white shadow-z8" 
                : "bg-neutral hover:bg-neutral/80 text-primary border border-outline"
            }`}
          >
            View Plan
          </Link>
        ) : (
          onSelect && (
            <AppButton
              onClick={() => onSelect(plan.whatsappMessage)}
              variant={plan.featured ? "primary" : "ghost"}
              fullWidth
            >
              Get Started
            </AppButton>
          )
        )}
      </div>
    </div>
  );
}

