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
    <div className={`plan ${plan.featured ? "featured" : ""} reveal`}>
      {plan.badge && <div className="plan-name">{plan.badge}</div>}
      <h3>{plan.name}</h3>
      <p style={{ fontSize: "14px" }}>{plan.description}</p>
      <div className="price">
        {plan.price} <span>/year</span>
      </div>
      <ul>
        {displayFeatures.map((feature, index) => (
          <li key={index}>
            <span className="tick">✓</span>
            <span>
              <b>{feature.bold}</b>
              {!isCompact && feature.desc && (
                <>
                  <br />
                  {feature.desc}
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
      {href ? (
        <Link
          href={href}
          className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"} btn-block`}
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
  );
}
