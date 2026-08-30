"use client";

import {
  AppBadge,
  AppButton,
  AppCard,
  AppPageHeader,
} from "@/library/ui";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React from "react";

export default function BillingPage() {
  const { user } = useAuthStore();

  const planName = user?.plan || "Starter";
  const planExpiresAt = user?.planExpiresAt
    ? new Date(user.planExpiresAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Active (Annual)";

  const daysRemaining = user?.planExpiresAt
    ? Math.max(
        0,
        Math.ceil(
          (new Date(user.planExpiresAt).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 365;

  const features = [
    "Digital Business Landing Page",
    "Customer Lead & Enquiry Tracking",
    "Direct Call & WhatsApp Chat CTAs",
    "Product & Service Catalog Showcase",
    "Storefront QR Code Generator",
    "Realtime Page Sync & Updates",
  ];

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* 1. Header */}
      <AppPageHeader
        title="Plan & Billing"
        description="View your active subscription details, validity, and plan features."
        actions={
          <Link href="/portal/transactions">
            <AppButton variant="outline" size="md">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Transaction History</span>
            </AppButton>
          </Link>
        }
      />

      {/* 2. User Plan Details Card */}
      <AppCard elevation="md" className="!p-6 sm:!p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                Current Plan
              </span>
              <AppBadge variant="success" size="sm">
                Active ✓
              </AppBadge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary capitalize">
              {planName} Plan
            </h2>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20MarketingSetu%20Team%2C%20I%20need%20help%20with%20my%20plan%20renewal."
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppButton variant="primary" size="md">
              <span>Renew / Upgrade Plan</span>
              <span>&rarr;</span>
            </AppButton>
          </a>
        </div>

        {/* Plan Metadata Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-neutral border border-outline">
            <p className="text-xs text-secondary font-medium">Valid Until</p>
            <p className="text-sm font-bold text-primary mt-1">{planExpiresAt}</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral border border-outline">
            <p className="text-xs text-secondary font-medium">Days Remaining</p>
            <p className="text-sm font-bold text-brand-main mt-1">
              {daysRemaining} Days
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral border border-outline">
            <p className="text-xs text-secondary font-medium">Account Status</p>
            <p className="text-sm font-bold text-success-main mt-1">
              Active & Verified
            </p>
          </div>
        </div>

        {/* Active Inclusions List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
            Included in your plan:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2.5 text-xs text-primary font-medium"
              >
                <div className="w-4 h-4 rounded-full bg-success-lighter dark:bg-success-darker/60 text-success-main flex items-center justify-center shrink-0">
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </AppCard>

      {/* 3. Support & Assistance */}
      <AppCard elevation="sm" className="!p-6 bg-neutral/50 border border-outline">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-primary">
              Have questions about your plan?
            </h4>
            <p className="text-xs text-secondary">
              Connect with our support team on WhatsApp for any subscription or billing assistance.
            </p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%20MarketingSetu%20Team%2C%20I%20have%20a%20question%20about%20my%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-full sm:w-auto"
          >
            <AppButton variant="whatsapp" size="md" fullWidth>
              WhatsApp Support &rarr;
            </AppButton>
          </a>
        </div>
      </AppCard>
    </div>
  );
}
