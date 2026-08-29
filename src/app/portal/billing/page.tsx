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
      "Priority Customer Support",
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
    <div className="space-y-8 max-w-5xl pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Membership & Billing</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Subscription & Plan Details
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your MarketingSetu membership, validity, and plan features.
          </p>
        </div>

        <Link
          href="/pricing"
          target="_blank"
          className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-brand-main to-brand-dark hover:from-brand-dark hover:to-brand-darker text-white font-semibold text-xs shadow-md shadow-brand-main/20 hover:shadow-lg transition-all text-center inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Explore Upgrade Plans</span>
          <span>&rarr;</span>
        </Link>
      </div>

      {/* Plan Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Current Active Tier
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white capitalize mt-0.5">
                {planName} Plan
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold text-xs border border-emerald-500/20 shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Valid Until</p>
              <p className="text-slate-900 dark:text-white font-semibold text-sm mt-0.5">{planExpiresAt}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Account Verification</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mt-0.5">Fully Verified ✓</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Included Benefits & Features
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              {currentFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-2 font-medium p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-semibold text-[10px] shrink-0">
                    ✓
                  </span>
                  <span className="truncate font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support & Assistance */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </div>
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">Need Plan Help or Upgrades?</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Connect with our dedicated support team on WhatsApp for renewals, plan expansion, custom domains, and marketing assistance.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20MarketingSetu%20Team%2C%20I%20need%20help%20with%20my%20subscription%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs text-center block shadow-sm hover:shadow-md transition-all"
          >
            Connect on WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
