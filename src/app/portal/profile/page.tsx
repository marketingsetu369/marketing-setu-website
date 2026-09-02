"use client";

import { UserAuthApi, UserProfile } from "@/api/repositories/userAuthApi";
import {
  AppButton,
  AppCard,
  AppInput,
  PortalBadge,
  PortalCard,
  PortalPageHeader,
} from "@/components/portal";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UserProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await UserAuthApi.getProfile();
      if (res.data) {
        setProfile(res.data);
        setFirstName(res.data.firstName || "");
        setLastName(res.data.lastName || "");
        setEmail(res.data.email || "");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      toast.error("First name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      const res = await UserAuthApi.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim() || undefined,
      });

      if (res.data) {
        setProfile(res.data);
        updateUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
        });
        toast.success("Profile updated successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const initials =
    ((firstName?.[0] || profile?.firstName?.[0] || user?.firstName?.[0] || "U") +
      (lastName?.[0] || profile?.lastName?.[0] || user?.lastName?.[0] || "")).toUpperCase();

  const formattedJoinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Member";

  const formattedPlanExpiry = profile?.planExpiresAt
    ? new Date(profile.planExpiresAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Active";

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Header */}
      <PortalPageHeader
        title="Account Profile & Settings 👤"
        description="Manage your personal information, subscription plan details, and integration access keys."
      />

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-brand-main border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-disabled uppercase tracking-wider">
            Loading your profile...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Card & Plan Overview */}
          <div className="space-y-6">
            {/* User Identity Card */}
            <AppCard elevation="md" className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-brand-lighter dark:bg-brand-darker text-brand-main flex items-center justify-center font-bold text-2xl mx-auto shadow-inner">
                  {initials}
                </div>
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-success-main border-2 border-paper rounded-full" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary">
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <p className="text-xs text-secondary font-medium">{profile?.phone}</p>
                {profile?.email && (
                  <p className="text-xs text-disabled font-medium truncate mt-0.5">{profile.email}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <PortalBadge variant="primary" size="md">
                  {profile?.plan?.toUpperCase() || "STARTER"} PLAN
                </PortalBadge>
                <PortalBadge variant="success" size="md">
                  Verified
                </PortalBadge>
              </div>

              <div className="pt-4 border-t border-outline text-left text-xs space-y-2.5 text-secondary">
                <div className="flex justify-between items-center">
                  <span className="text-disabled">Member Since:</span>
                  <span className="font-medium text-primary">{formattedJoinDate}</span>
                </div>
              </div>
            </AppCard>

            {/* Subscription & Billing Quick Card */}
            <PortalCard
              title="Subscription Status"
              action={
                <Link
                  href="/portal/billing"
                  className="text-xs font-bold text-brand-main hover:underline"
                >
                  Manage →
                </Link>
              }
            >
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-disabled font-medium">Current Tier:</span>
                    <span className="font-bold text-primary uppercase">
                      {profile?.plan || "Starter Plan"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-disabled font-medium">Valid Until:</span>
                    <span className="font-semibold text-secondary">
                      {formattedPlanExpiry}
                    </span>
                  </div>
                </div>

                <Link
                  href="/portal/billing"
                  className="block w-full py-2.5 rounded-xl bg-brand-lighter/60 hover:bg-brand-lighter text-brand-main text-xs font-bold text-center transition-colors"
                >
                  Upgrade or Renew Plan
                </Link>
              </div>
            </PortalCard>
          </div>

          {/* Right Column: Edit Profile & Security Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Personal Information Card */}
            <PortalCard
              title="Personal Information"
              subtitle="Update your contact details and account information."
            >
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AppInput
                    label="First Name *"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Your First Name"
                  />

                  <AppInput
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Your Last Name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
                      Registered Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value={profile?.phone || user?.phone || ""}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-outline bg-neutral/50 text-disabled text-sm font-medium outline-none cursor-not-allowed"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-bold text-success-main bg-success-lighter dark:bg-success-darker/40 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                  </div>

                  <AppInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@business.com"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <AppButton
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={saving}
                  >
                    {saving ? "Saving Changes..." : "Save Profile Details"}
                  </AppButton>
                </div>
              </form>
            </PortalCard>

            {/* API & Access Key Card */}
            {profile?.accessKey && (
              <PortalCard
                title="Integration Access Key"
                subtitle="Use this unique key to connect external webhooks or automation tools."
                action={
                  <span className="w-8 h-8 rounded-xl bg-brand-lighter text-brand-main flex items-center justify-center">
                    🔑
                  </span>
                }
              >
                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral border border-outline">
                  <code className="flex-1 font-mono text-xs text-primary truncate select-all">
                    {profile.accessKey}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(profile.accessKey!, "Access Key")}
                    className="px-3 py-1.5 rounded-lg bg-paper border border-outline text-xs font-semibold text-primary hover:bg-neutral transition-colors shrink-0 cursor-pointer"
                  >
                    Copy Key
                  </button>
                </div>
              </PortalCard>
            )}

            {/* Business Quick Link Card */}
            <AppCard
              elevation="md"
              hoverElevation="lg"
              className="bg-gradient-to-br from-brand-lighter/30 via-paper to-paper dark:from-brand-darker/30 dark:via-paper dark:to-paper flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <h4 className="text-base font-bold text-primary">
                  Ready to update your public business page?
                </h4>
                <p className="text-xs text-secondary font-medium">
                  Add photos, customer testimonials, products, and WhatsApp contact channels.
                </p>
              </div>
              <Link
                href="/portal/business-page"
                className="px-5 py-2.5 rounded-xl bg-brand-main hover:bg-brand-dark text-white text-xs font-bold shadow-z4 whitespace-nowrap transition-all"
              >
                Edit Business Page →
              </Link>
            </AppCard>
          </div>
        </div>
      )}
    </div>
  );
}
