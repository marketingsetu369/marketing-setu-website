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
      className={`group p-8 sm:p-10 rounded-[28px] bg-paper text-primary transition-all duration-300 relative flex flex-col justify-between ${isFeatured
          ? "border-2 border-[#5B3DF5] shadow-z20 md:-translate-y-3 z-10 hover:shadow-z24 hover:-translate-y-5"
          : "border border-outline shadow-card hover:shadow-z16 hover:-translate-y-2"
        }`}
    >
      {/* Top Badge (Hostinger Style) */}
      {plan.badge && (
        <div
          className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider shadow-z4 whitespace-nowrap flex items-center gap-1.5 ${isFeatured
              ? "bg-gradient-to-r from-[#5B3DF5] to-[#10C85A] text-white"
              : "bg-brand-dark text-white dark:bg-brand-lighter dark:text-brand-darker"
            }`}
        >
          {isFeatured && <span>🔥</span>}
          <span>{plan.badge}</span>
        </div>
      )}

      <div>
        {/* Title & Description */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold tracking-tight text-primary mb-2">
            {plan.name}
          </h3>
          <p className="text-xs sm:text-sm leading-relaxed text-secondary">
            {plan.description}
          </p>
        </div>

        {/* Hostinger Price Lockup (Clean theme, no block background fill) */}
        <div className="mb-8 pb-6 border-b border-outline/60">
          {plan.originalPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium line-through text-disabled">
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
            <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-primary">
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
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">
            {t?.pricing_whats_included || "What's included:"}
          </span>
        </div>

        {/* Features Checklist */}
        <ul className="space-y-4 mb-8">
          {displayFeatures.map((feature, index) => (
            <li key={index} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
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

      {/* CTA Action Button */}
      <div>
        {href ? (
          <Link
            href={href}
            className={`w-full py-4 rounded-2xl text-center text-sm font-bold tracking-wide transition-all inline-block shadow-z4 cursor-pointer ${isFeatured
                ? "bg-gradient-to-r from-[#5B3DF5] to-[#10C85A] hover:opacity-95 text-white shadow-z12 hover:shadow-z20 hover:scale-[1.02]"
                : "bg-primary text-background hover:opacity-90 border border-outline hover:scale-[1.02]"
              }`}
          >
            {t?.pricing_choose_plan || "Choose Plan"}
          </Link>
        ) : (
          onSelect && (
            <AppButton
              onClick={() => onSelect(plan.whatsappMessage)}
              variant={isFeatured ? "primary" : "secondary"}
              fullWidth
            >
              {t?.pricing_choose_plan || "Choose Plan"}
            </AppButton>
          )
        )}
      </div>
    </div>
  );
}
