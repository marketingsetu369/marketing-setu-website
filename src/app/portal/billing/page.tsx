"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React from "react";

export default function BillingPage() {
  const { user } = useAuthStore();

  const planName = user?.plan || "starter";
  const planExpiresAt = user?.planExpiresAt
    ? new Date(user.planExpiresAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Active (Annual)";

  const planFeatures: Record<string, string[]> = {
    starter: [
      "Dynamic Digital Business Landing Page",
      "Lead Capture Inquiries Form",
      "Click-to-WhatsApp & Call Direct CTA",
      "Auto SMS Follow-up Module",
      "QR Code Generator",
      "Unlimited Profile Updates",
    ],
    growth: [
      "Everything in Starter Plan",
      "Unlimited Products & Services Showcase",
      "Google Local SEO & Rich Schema Integration",
      "Direct WhatsApp Catalog Order Link",
      "Priority Merchant Support",
    ],
    pro: [
      "Everything in Growth Plan",
      "Full Digital Business Card Hub",
      "Custom Subdomain Branding",
      "Dedicated Account Manager",
      "Advanced Traffic Analytics",
    ],
  };

  const currentFeatures = planFeatures[planName.toLowerCase()] || planFeatures.starter;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-paper border border-outline shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
            Subscription & Plan Details
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Manage your MarketingSetu membership and view features.
          </p>
        </div>

        <Link
          href="/pricing"
          target="_blank"
          className="px-4 py-2 rounded-xl bg-brand-main hover:bg-brand-dark text-white font-semibold text-xs shadow-sm transition-all text-center inline-flex items-center gap-1.5"
        >
          <span>Explore Upgrade Plans</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Plan Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-paper border border-outline space-y-6">
          <div className="flex items-center justify-between border-b border-outline pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                Current Active Tier
              </span>
              <h2 className="text-2xl font-extrabold text-primary capitalize mt-0.5">
                {planName} Plan
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-success-lighter text-success-dark font-bold text-xs">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-secondary font-medium">Valid Until</p>
              <p className="text-primary font-bold text-sm mt-0.5">{planExpiresAt}</p>
            </div>
            <div>
              <p className="text-secondary font-medium">Account Status</p>
              <p className="text-success-main font-bold text-sm mt-0.5">Fully Verified</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-secondary">
              Included Benefits & Features
            </p>
            <ul className="space-y-2 text-xs text-primary">
              {currentFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2 font-medium">
                  <span className="text-success-main font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support & Assistance */}
        <div className="p-6 rounded-2xl bg-paper border border-outline space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="font-bold text-base text-primary">Need Help or Upgrades?</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Contact our Maharashtra support team directly on WhatsApp for plan extensions, addons, or business setup assistance.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20MarketingSetu%20Team%2C%20I%20need%20help%20with%20my%20merchant%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-success-main hover:bg-success-dark text-white font-bold text-xs text-center block shadow-sm transition-colors"
          >
            Connect on WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
