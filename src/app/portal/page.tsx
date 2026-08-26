"use client";

import { AnalyticsData, BusinessPageData, UserDashboardApi } from "@/api/repositories/userDashboardApi";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function OverviewPage() {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [businessPage, setBusinessPage] = useState<BusinessPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [analyticsRes, bpRes] = await Promise.allSettled([
          UserDashboardApi.getAnalytics(),
          UserDashboardApi.getBusinessPage(),
        ]);

        if (analyticsRes.status === "fulfilled" && analyticsRes.value.data) {
          setAnalytics(analyticsRes.value.data);
        }
        if (bpRes.status === "fulfilled" && bpRes.value.data) {
          setBusinessPage(bpRes.value.data);
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const businessSlug = businessPage?.slug || "";
  const publicUrl = businessSlug ? `/${businessSlug}` : "#";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-paper border border-outline shadow-sm">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-brand-lighter text-brand-main text-xs font-bold uppercase tracking-wider">
            Active Merchant
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
            Hello, {user?.firstName || "Merchant"} 👋
          </h1>
          <p className="text-secondary text-sm">
            Here is a snapshot of your digital presence and customer engagements.
          </p>
        </div>

        {businessSlug && (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={publicUrl}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-main hover:bg-brand-dark text-white font-semibold text-xs shadow-sm transition-all"
            >
              <span>View Live Web Page</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Page Views */}
        <div className="p-6 rounded-2xl bg-paper border border-outline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Total Page Views</span>
            <div className="w-8 h-8 rounded-lg bg-info-lighter text-info-main flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-primary">
            {loading ? "..." : analytics?.totalViews ?? 0}
          </div>
          <p className="text-xs text-secondary">Unique visits to your digital card</p>
        </div>

        {/* WhatsApp Enquiries */}
        <div className="p-6 rounded-2xl bg-paper border border-outline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">WhatsApp Clicks</span>
            <div className="w-8 h-8 rounded-lg bg-success-lighter text-success-main flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-primary">
            {loading ? "..." : analytics?.totalWhatsApp ?? 0}
          </div>
          <p className="text-xs text-secondary">Direct chats opened from page</p>
        </div>

        {/* Phone Call Clicks */}
        <div className="p-6 rounded-2xl bg-paper border border-outline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Call Clicks</span>
            <div className="w-8 h-8 rounded-lg bg-warning-lighter text-warning-dark flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-primary">
            {loading ? "..." : analytics?.totalCalls ?? 0}
          </div>
          <p className="text-xs text-secondary">Direct phone calls initiated</p>
        </div>

        {/* Map Directions */}
        <div className="p-6 rounded-2xl bg-paper border border-outline space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Map Directions</span>
            <div className="w-8 h-8 rounded-lg bg-brand-lighter text-brand-main flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <div className="text-3xl font-extrabold text-primary">
            {loading ? "..." : analytics?.totalDirections ?? 0}
          </div>
          <p className="text-xs text-secondary">Navigation requests to your store</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-paper border border-outline flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-brand-lighter text-brand-main flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Edit Business Page</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Update branding, photos, products/services, contact numbers, and social profiles.
            </p>
          </div>
          <Link
            href="/portal/business-page"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-outline hover:border-brand-main text-xs font-semibold text-primary transition-colors"
          >
            <span>Open Profile Editor</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-paper border border-outline flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-info-lighter text-info-main flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Customer Leads</h3>
            <p className="text-xs text-secondary leading-relaxed">
              View customer messages submitted via your digital page and respond directly.
            </p>
          </div>
          <Link
            href="/portal/enquiries"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-outline hover:border-brand-main text-xs font-semibold text-primary transition-colors"
          >
            <span>View Inquiries</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-paper border border-outline flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-warning-lighter text-warning-dark flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-primary">Plan & Features</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Check your current subscription tier, validity dates, and plan benefits.
            </p>
          </div>
          <Link
            href="/portal/billing"
            className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl border border-outline hover:border-brand-main text-xs font-semibold text-primary transition-colors"
          >
            <span>Manage Subscription</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
