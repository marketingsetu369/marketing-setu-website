import { AppButton } from "@/components/library";
import Link from "next/link";
import { PricingPlan } from "../data/plans";

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
  const isDarkCard = plan.featured;

  return (
    <div className={`group p-10 rounded-[24px] transition-all duration-300 relative flex flex-col justify-between ${
      isDarkCard 
        ? "bg-grey-900 text-white shadow-z12" + (plan.featured ? " md:-translate-y-4 lg:scale-105 z-10 hover:shadow-z24 hover:-translate-y-6" : " hover:shadow-z16 hover:-translate-y-1.5")
        : "bg-paper text-primary shadow-card hover:shadow-z12 hover:-translate-y-1.5"
    }`}>
      {plan.badge && (
        <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-z4 whitespace-nowrap ${
          plan.featured 
            ? "bg-[#10C85A] text-white" 
            : isDarkCard
              ? "bg-brand-dark text-white"
              : "bg-brand-dark text-white dark:bg-brand-lighter dark:text-brand-darker"
        }`}>
          {plan.badge}
        </div>
      )}
      <div>
        <h3 className={`text-2xl font-semibold mb-3 tracking-tight ${isDarkCard ? "text-white" : "text-primary"}`}>
          {plan.name}
        </h3>
        <p className={`text-sm mb-8 leading-relaxed ${isDarkCard ? "text-white/70" : "text-secondary"}`}>
          {plan.description}
        </p>
        <div className="mb-8 flex items-baseline gap-1">
          <span className={`text-5xl font-bold tracking-tight ${isDarkCard ? "text-white" : "text-primary"}`}>
            {plan.price}
          </span>
          <span className={`text-xs font-medium ${isDarkCard ? "text-white/50" : "text-disabled"}`}>/year</span>
        </div>
        <ul className="space-y-5 mb-10">
          {displayFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-4 text-sm leading-relaxed">
              <span className={`font-semibold flex-shrink-0 mt-0.5 ${isDarkCard ? "text-[#10C85A]" : "text-brand-main"}`}>✓</span>
              <span className={isDarkCard ? "text-white/90" : "text-secondary"}>
                <strong className={`font-medium ${isDarkCard ? "text-white" : "text-primary dark:text-white"}`}>{feature.bold}</strong>
                {!isCompact && feature.desc && (
                  <span className={`block text-xs mt-1 leading-normal ${isDarkCard ? "text-white/60" : "text-disabled"}`}>
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
                : isDarkCard
                  ? "bg-white hover:bg-white/90 text-gray-950 shadow-z4"
                  : "bg-neutral hover:bg-neutral/80 text-primary border border-outline"
            }`}
          >
            View Plan
          </Link>
        ) : (
          onSelect && (
            <AppButton
              onClick={() => onSelect(plan.whatsappMessage)}
              variant={plan.featured ? "primary" : isDarkCard ? "secondary" : "ghost"}
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

