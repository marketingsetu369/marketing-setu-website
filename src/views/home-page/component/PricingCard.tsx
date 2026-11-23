import { AppButton } from "@/components/library";
import Link from "next/link";
import { PricingPlan } from "../data/plans";
import { TranslationDictionary } from "@/translation";

interface PricingCardProps {
  plan: PricingPlan;
  onSelect?: (message: string) => void;
  href?: string;
  isCompact?: boolean;
  t?: TranslationDictionary;
}

export default function PricingCard({
  plan,
  onSelect,
  href,
  isCompact = false,
  t,
}: PricingCardProps) {
  const displayFeatures = isCompact && plan.compactFeatures ? plan.compactFeatures : plan.features;
  const isFeatured = plan.featured;

  const currentPrice = plan.price;
  const periodLabel = "/year";

  return (
    <div
      className={`group p-7 sm:p-8 rounded-[26px] bg-paper text-primary transition-all duration-300 relative flex flex-col justify-between ${isFeatured
          ? "border-2 border-brand-main shadow-z20 md:-translate-y-3 z-10 hover:shadow-z24 hover:-translate-y-5"
          : "border-2 border-dashed border-outline hover:border-brand-main/40 shadow-card hover:shadow-z16 hover:-translate-y-2"
        }`}
    >
      {/* Top Badge (Hostinger Style) */}
      {plan.badge && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10.5px] font-semibold uppercase tracking-wider shadow-z4 whitespace-nowrap flex items-center gap-1.5 ${isFeatured
              ? "bg-brand-main text-white"
              : "bg-brand-dark text-white dark:bg-brand-lighter dark:text-brand-darker"
            }`}
        >
          {isFeatured && <span>🔥</span>}
          <span>{plan.badge}</span>
        </div>
      )}

      <div>
        {/* Title & Description */}
        <div className="mb-5">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-primary mb-1.5">
            {plan.name}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-secondary">
            {plan.description}
          </p>
        </div>

        {/* Hostinger Price Lockup (Clean theme, no block background fill) */}
        <div className="mb-6 pb-5 border-b border-outline/60">
          {plan.originalPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs sm:text-sm font-medium line-through text-disabled">
                {plan.originalPrice}
              </span>
              {plan.discountBadge && (
                <span className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {plan.discountBadge}
                </span>
              )}
            </div>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-primary">
              {currentPrice}
            </span>
            <span className="text-xs font-semibold text-disabled">
              {periodLabel}
            </span>
          </div>
          <p className="text-[11px] mt-1 font-medium text-secondary">
            {t?.pricing_billed_annually || "Billed annually • Zero setup fees"}
          </p>
        </div>

        {/* Feature List Header */}
        <div className="mb-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            {t?.pricing_whats_included || "What's included:"}
          </span>
        </div>

        {/* Features Checklist */}
        <ul className="space-y-3.5">
          {displayFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                ✓
              </span>
              <span className="text-secondary">
                <strong className="font-semibold text-primary">
                  {feature.bold}
                </strong>
                {!isCompact && feature.desc && (
                  <span className="block text-[11px] mt-0.5 leading-normal text-disabled">
                    {feature.desc}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
