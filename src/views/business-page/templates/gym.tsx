"use client";

import React from "react";
import Link from "next/link";
import "../styles.css";
import { AppButton } from "@/components/library";
import { trackUniqueAction } from "@/utils";
import { TrackAction, ThemeMode } from "@/enums";
import type { BusinessPageData } from "@/types/businessPage";
import {
  useBusinessPageData,
  useThemeMode,
  useCopyLink,
  usePageTracking,
} from "../hooks";
import {
  SocialLink,
  OfflinePage,
  BusinessLogo,
} from "../component";
import { formatBusinessName } from "@/utils";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function GymView({ data, businessName }: BusinessViewProps) {
  const { theme, setTheme, mounted } = useThemeMode();
  const { copied, handleCopyLink } = useCopyLink(data?.slug);
  usePageTracking(data?.slug);

  const { accentColor, quickActions, productsList, socialsList } =
    useBusinessPageData(data);

  const decodedBusinessName = React.useMemo(
    () => formatBusinessName(businessName, data?.business_name),
    [businessName, data?.business_name]
  );

  if (!data || !data.business_name) {
    return <OfflinePage />;
  }

  const coreOffers = productsList.slice(0, 3);

  return (
    <div
      className="gym-energetic-wrapper"
      style={{
        "--business-primary": accentColor.primary || "#facc15",
        "--business-primary-rgb": accentColor.primaryRgb || "250, 204, 21",
      } as React.CSSProperties}
    >
      <section className="gym-hero-panel">
        <div className="gym-hero-copy">
          <span className="gym-badge">High Performance</span>
          <h1>{decodedBusinessName}</h1>
          <p>
            {data.about_us ||
              "Train harder, move faster, and own every rep with a gym built for peak energy."}
          </p>
          <div className="gym-action-row">
            {quickActions.map((action) => (
              <Link
                key={action.id}
                href={action.href}
                className="gym-action-btn"
                target={action.type !== TrackAction.Call ? "_blank" : undefined}
                rel={action.type !== TrackAction.Call ? "noopener noreferrer" : undefined}
                onClick={() => data.slug && trackUniqueAction(data.slug, action.type)}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="gym-quick-stats">
          <div>
            <strong>70+</strong>
            <span>Classes Weekly</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>Member Satisfaction</span>
          </div>
          <div>
            <strong>1:1</strong>
            <span>Coaching Ratio</span>
          </div>
        </div>
      </section>

      <section className="gym-programs-section">
        <header>
          <h2>Train With Purpose</h2>
          <p>Choose the right program to match your strength goals.</p>
        </header>
        <div className="gym-program-cards">
          {coreOffers.length > 0 ? (
            coreOffers.map((offer) => (
              <article key={offer.id} className="gym-program-card">
                <h3>{offer.name}</h3>
                <p>{offer.description}</p>
                <span>{offer.price}</span>
              </article>
            ))
          ) : (
            <p className="gym-empty">Membership plans will appear here.</p>
          )}
        </div>
      </section>

      <section className="gym-focus-rows">
        <div className="gym-focus-card">
          <h4>Strength Lab</h4>
          <p>Free weights, bars, and coaching for every stage of your journey.</p>
        </div>
        <div className="gym-focus-card gym-focus-bright">
          <h4>Performance Circuit</h4>
          <p>Fast-paced conditioning sessions powered by energy and precision.</p>
        </div>
      </section>

      <footer className="gym-footer">
        <div className="gym-footer-copy">
          <h4>Get in touch</h4>
          <p>Start your first session today and claim your welcome consultation.</p>
        </div>
        <div className="gym-footer-actions">
          <AppButton onClick={handleCopyLink} className="gym-copy-link">
            {copied ? "Copied" : "Copy Page"}
          </AppButton>
          <div className="gym-social-row">
            {socialsList.map((social) => (
              <SocialLink key={social.id} href={social.href} type={social.type} icon={null} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
