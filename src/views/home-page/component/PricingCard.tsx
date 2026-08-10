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
    <div className={`group p-8 rounded-3xl transition-all duration-300 relative flex flex-col justify-between backdrop-blur-md ${
      plan.featured 
        ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/30 md:-translate-y-4 lg:scale-105 z-10 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-6" 
        : "bg-white text-gray-950 shadow-card hover:shadow-z16 hover:-translate-y-1.5"
    }`}>
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-950 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
          {plan.badge}
        </div>
      )}
      <div>
        <h3 className={`text-2xl font-heading font-bold mb-2 ${plan.featured ? "text-white" : "text-gray-950"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mb-6 ${plan.featured ? "text-gray-300" : "text-gray-600"}`}>
          {plan.description}
        </p>
        <div className="mb-6 flex items-baseline">
          <span className={`text-5xl font-heading font-extrabold ${plan.featured ? "text-white" : "text-gray-950"}`}>
            {plan.price}
          </span>
          <span className={`text-sm font-normal ml-2 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>/year</span>
        </div>
        <ul className="space-y-4 mb-8">
          {displayFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-sm">
              <span className={`font-bold flex-shrink-0 ${plan.featured ? "text-green-400" : "text-green-600"}`}>✓</span>
              <span className={plan.featured ? "text-gray-200" : "text-gray-800"}>
                <strong className="font-semibold">{feature.bold}</strong>
                {!isCompact && feature.desc && (
                  <span className={`block text-xs mt-0.5 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
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
            className={`w-full py-3.5 rounded-full text-center text-sm font-semibold transition-all inline-block ${
              plan.featured 
                ? "bg-brand-purple hover:bg-brand-dark-shade text-white shadow-lg shadow-brand-purple/20" 
                : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-brand-dark dark:text-white"
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
