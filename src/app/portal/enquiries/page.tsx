"use client";

import {
  EnquiryItem,
  UserDashboardApi,
} from "@/api/repositories/userDashboardApi";
import {
  PortalEmptyState,
  PortalLeadCard,
  PortalPageHeader,
  PortalStatCard,
  PortalTabItem,
  PortalTabs,
} from "@/components/portal";
import { AppButton, AppConfirmDialog } from "@/library/ui";
import {
  Chatting01Icon,
  Mail01Icon,
  RefreshIcon,
  Search01Icon,
  ShoppingBag01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type TabType = "all" | "product" | "general";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteEnquiryId, setDeleteEnquiryId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const res = await UserDashboardApi.getEnquiries({ limit: 100 });
      if (res.data) {
        if (Array.isArray(res.data)) {
          setEnquiries(res.data);
        } else if (res.data.enquiries) {
          setEnquiries(res.data.enquiries || []);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await UserDashboardApi.markEnquiryRead(id);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isRead: true } : e))
      );
      toast.success("Marked as read");
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const confirmDelete = async () => {
    if (!deleteEnquiryId) return;
    try {
      setIsDeleting(true);
      await UserDashboardApi.deleteEnquiry(deleteEnquiryId);
      setEnquiries((prev) => prev.filter((e) => e.id !== deleteEnquiryId));
      toast.success("Lead enquiry deleted");
      setDeleteEnquiryId(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete enquiry");
    } finally {
      setIsDeleting(false);
    }
  };

  // Counts for tabs & badges
  const counts = useMemo(() => {
    const totalAll = enquiries.length;
    const totalProduct = enquiries.filter((e) => e.isProduct).length;
    const totalGeneral = enquiries.filter((e) => !e.isProduct).length;

    const unreadAll = enquiries.filter((e) => !e.isRead).length;
    const unreadProduct = enquiries.filter((e) => e.isProduct && !e.isRead).length;
    const unreadGeneral = enquiries.filter((e) => !e.isProduct && !e.isRead).length;

    return {
      all: { total: totalAll, unread: unreadAll },
      product: { total: totalProduct, unread: unreadProduct },
      general: { total: totalGeneral, unread: unreadGeneral },
    };
  }, [enquiries]);

  const tabs: PortalTabItem<TabType>[] = [
    { id: "all", label: "All Leads", count: counts.all.total, unreadCount: counts.all.unread },
    { id: "product", label: "Product Interest", count: counts.product.total, unreadCount: counts.product.unread },
    { id: "general", label: "General", count: counts.general.total, unreadCount: counts.general.unread },
  ];

  // Filtered by tab and search
  const filteredEnquiries = useMemo(() => {
    let list = enquiries;

    if (activeTab === "product") {
      list = list.filter((e) => e.isProduct);
    } else if (activeTab === "general") {
      list = list.filter((e) => !e.isProduct);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((e) => {
        const nameMatch = e.name?.toLowerCase().includes(q);
        const phoneMatch = e.phone?.toLowerCase().includes(q);
        const productMatch = e.productName?.toLowerCase().includes(q);
        const messageMatch = e.message?.toLowerCase().includes(q);
        return nameMatch || phoneMatch || productMatch || messageMatch;
      });
    }

    return list;
  }, [enquiries, activeTab, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <PortalPageHeader
        title="Customer Leads & Inquiries"
        description="Manage incoming product requests and direct messages received from your digital business page."
        actions={
          <AppButton
            type="button"
            onClick={loadEnquiries}
            variant="outline"
            size="md"
          >
            <span className="text-brand-main">
              <HugeiconsIcon icon={RefreshIcon} size={16} />
            </span>
            <span>Refresh Leads</span>
          </AppButton>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <PortalStatCard
          label="TOTAL INQUIRIES"
          value={counts.all.total}
          icon={<HugeiconsIcon icon={Mail01Icon} size={20} />}
          iconBgColor="bg-[#F3F0FF] dark:bg-purple-950/40 text-brand-main"
          subtext={counts.all.unread > 0 ? `${counts.all.unread} unread leads` : "All caught up"}
        />

        <PortalStatCard
          label="PRODUCT LEADS"
          value={counts.product.total}
          icon={<HugeiconsIcon icon={ShoppingBag01Icon} size={20} />}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
          subtext={`${counts.product.unread} unread product leads`}
        />

        <PortalStatCard
          label="GENERAL INQUIRIES"
          value={counts.general.total}
          icon={<HugeiconsIcon icon={Chatting01Icon} size={20} />}
          iconBgColor="bg-sky-50 dark:bg-sky-950/40 text-sky-600"
          subtext={`${counts.general.unread} unread direct contacts`}
        />
      </div>

      {/* Main Tabbed Container & Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PortalTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id)}
          />

          <div className="relative w-full sm:w-72">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-disabled">
              <HugeiconsIcon icon={Search01Icon} size={16} />
            </span>
            <input
              type="text"
              placeholder="Search by customer or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-paper border border-outline text-primary placeholder:text-disabled outline-none focus:border-brand-main transition-colors"
            />
          </div>
        </div>

        {/* Content Listing Grid */}
        {loading ? (
          <div className="p-16 text-center text-secondary text-sm font-medium border-2 border-dashed border-outline rounded-3xl bg-neutral/30">
            <div className="w-8 h-8 border-3 border-brand-main border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading incoming customer leads...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <PortalEmptyState
            title={
              searchQuery
                ? "No matching leads found"
                : activeTab === "product"
                ? "No product interest leads yet"
                : activeTab === "general"
                ? "No general inquiries yet"
                : "No customer leads received yet"
            }
            description={
              searchQuery
                ? "Try searching with a different customer name, phone number, or product keyword."
                : "When visitors click 'Contact' or 'Product Inquiry' on your public page, their submissions will appear here."
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredEnquiries.map((item) => (
              <PortalLeadCard
                key={item.id}
                enquiry={item}
                onMarkRead={handleMarkRead}
                onDelete={(id) => setDeleteEnquiryId(id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Reusable Delete Confirmation Dialog */}
      <AppConfirmDialog
        isOpen={Boolean(deleteEnquiryId)}
        onClose={() => setDeleteEnquiryId(null)}
        onConfirm={confirmDelete}
        title="Delete Customer Lead?"
        description="Are you sure you want to permanently delete this lead inquiry? This action cannot be undone."
        confirmText="Delete Lead"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
