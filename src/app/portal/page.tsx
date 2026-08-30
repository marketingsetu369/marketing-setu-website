"use client";

import {
  AnalyticsData,
  BusinessPageData,
  EnquiryItem,
  UserDashboardApi,
} from "@/api/repositories/userDashboardApi";
import {
  PortalActionCard,
  PortalCard,
  PortalEmptyState,
  PortalPageHeader,
  PortalStatCard,
} from "@/components/portal";
import { AppButton } from "@/library/ui";
import { useAuthStore } from "@/store/authStore";
import {
  CallIcon,
  CheckmarkCircle01Icon,
  Copy01Icon,
  CreditCardIcon,
  LinkSquare01Icon,
  Location01Icon,
  Mail01Icon,
  TaskEdit02Icon,
  ViewIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function OverviewPage() {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [businessPage, setBusinessPage] = useState<BusinessPageData | null>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [dashRes, pageRes, enqRes] = await Promise.allSettled([
          UserDashboardApi.getAnalytics(),
          UserDashboardApi.getBusinessPage(),
          UserDashboardApi.getEnquiries(),
        ]);

        if (dashRes.status === "fulfilled" && dashRes.value.data) {
          setAnalytics(dashRes.value.data);
        }
        if (pageRes.status === "fulfilled" && pageRes.value.data) {
          setBusinessPage(pageRes.value.data);
        }
        if (enqRes.status === "fulfilled" && enqRes.value.data) {
          const raw = enqRes.value.data;
          if (Array.isArray(raw)) {
            setRecentEnquiries(raw);
          } else if (raw && "enquiries" in raw && Array.isArray(raw.enquiries)) {
            setRecentEnquiries(raw.enquiries);
          }
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const businessSlug = businessPage?.slug || user?.businessSlug;

  const handleCopyLink = () => {
    if (!businessSlug) {
      toast.error("Business page link is not configured yet.");
      return;
    }
    const fullUrl = `${window.location.origin}/${businessSlug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    toast.success("Business link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Hero Header Section */}
      <PortalPageHeader
        title={`Welcome back, ${user?.firstName || "there"} ✨`}
        description="Track your real-time customer traffic, monitor incoming WhatsApp leads, and manage your digital storefront from one intuitive dashboard."
        actions={
          businessSlug ? (
            <div className="flex items-center gap-2.5">
              <AppButton
                type="button"
                onClick={handleCopyLink}
                variant="outline"
                size="sm"
              >
                {copied ? (
                  <>
                    <span className="text-success-main">
                      <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
                    </span>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={Copy01Icon} size={16} />
                    <span>Copy Link</span>
                  </>
                )}
              </AppButton>

              <Link href={`/${businessSlug}`} target="_blank">
                <AppButton variant="primary" size="sm">
                  <span>View Live Page</span>
                  <HugeiconsIcon icon={LinkSquare01Icon} size={16} />
                </AppButton>
              </Link>
            </div>
          ) : undefined
        }
      />

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <PortalStatCard
          label="TOTAL PAGE VIEWS"
          value={loading ? "..." : (analytics?.views ?? analytics?.totalViews ?? 0)}
          icon={<HugeiconsIcon icon={ViewIcon} size={20} />}
          iconBgColor="bg-[#F3F0FF] dark:bg-purple-950/40 text-brand-main"
          subtext="Unique business page visitors"
        />

        <PortalStatCard
          label="WHATSAPP CLICKS"
          value={loading ? "..." : (analytics?.whatsappClicks ?? analytics?.totalWhatsApp ?? 0)}
          icon={<HugeiconsIcon icon={WhatsappIcon} size={20} />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
          subtext="Direct WhatsApp inquiries"
        />

        <PortalStatCard
          label="CALL INQUIRIES"
          value={loading ? "..." : (analytics?.callClicks ?? analytics?.totalCalls ?? 0)}
          icon={<HugeiconsIcon icon={CallIcon} size={20} />}
          iconBgColor="bg-amber-50 dark:bg-amber-950/40 text-amber-600"
          subtext="Direct phone calls from visitors"
        />

        <PortalStatCard
          label="MAP DIRECTIONS"
          value={loading ? "..." : (analytics?.directionsClicks ?? analytics?.totalDirections ?? 0)}
          icon={<HugeiconsIcon icon={Location01Icon} size={20} />}
          iconBgColor="bg-rose-50 dark:bg-rose-950/40 text-rose-600"
          subtext="Store location taps"
        />
      </div>

      {/* 3. Quick Launchpad Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <PortalActionCard
          title="Business Page"
          description="Update branding, photos, catalog, pricing, contact details & reviews."
          icon={<HugeiconsIcon icon={TaskEdit02Icon} size={20} />}
          iconBgColor="bg-[#EEEBFF] text-brand-main"
          actionText="Open Profile Editor"
          href="/portal/business-page"
        />

        <PortalActionCard
          title="Customer Leads"
          description="View customer messages submitted via your digital page and respond directly."
          icon={<HugeiconsIcon icon={Mail01Icon} size={20} />}
          iconBgColor="bg-[#E6FAF5] text-[#059669]"
          actionText="View Inquiries"
          href="/portal/enquiries"
        />

        <PortalActionCard
          title="Plan & Features"
          description="Check your current subscription tier, validity dates, and plan benefits."
          icon={<HugeiconsIcon icon={CreditCardIcon} size={20} />}
          iconBgColor="bg-[#FFFBEB] text-[#D97706]"
          actionText="Manage Subscription"
          href="/portal/billing"
        />
      </div>

      {/* 4. Bottom Box: Latest Customer Inquiries */}
      <PortalCard
        title="Latest Customer Inquiries"
        subtitle="Recent visitor contacts from your business page"
        action={
          <Link
            href="/portal/enquiries"
            className="text-xs font-medium text-brand-main hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </Link>
        }
      >
        {recentEnquiries.length === 0 ? (
          <PortalEmptyState
            title="No inquiries received yet"
            description="When customers contact you from your business page, their details and messages will appear here in real time."
          />
        ) : (
          <div className="divide-y divide-outline">
            {recentEnquiries.slice(0, 5).map((item) => {
              const itemInitials = item.name ? item.name.slice(0, 2).toUpperCase() : "CU";
              return (
                <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-lighter text-brand-main flex items-center justify-center font-bold text-xs shrink-0">
                      {itemInitials}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary">
                        {item.name || "Customer Lead"}
                      </p>
                      <p className="text-xs text-secondary mt-0.5">
                        {item.phone || item.message || "Direct lead"}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-disabled font-medium">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })
                        : "Recent"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </PortalCard>
    </div>
  );
}
