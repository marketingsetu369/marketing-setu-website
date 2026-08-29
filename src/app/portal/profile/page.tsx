"use client";

import { UserAuthApi, UserProfile } from "@/api/repositories/userAuthApi";
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
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
          Account Profile & Settings 👤
        </h1>
        <p className="text-sm text-[#667085] dark:text-slate-400 font-normal max-w-2xl leading-relaxed">
          Manage your personal information, subscription plan details, and integration access keys.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#6C5CE7] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Loading your profile...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Card & Plan Overview */}
          <div className="space-y-6">
            {/* User Identity Card */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-[#6C5CE7]/10 dark:bg-[#6C5CE7]/30 text-[#6C5CE7] dark:text-[#A29BFE] flex items-center justify-center font-bold text-2xl mx-auto shadow-inner">
                  {initials}
                </div>
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{profile?.phone}</p>
                {profile?.email && (
                  <p className="text-xs text-slate-400 font-medium truncate mt-0.5">{profile.email}</p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#F0EEFF] text-[#6C5CE7] text-xs font-bold uppercase tracking-wider">
                  {profile?.plan || "Starter"} Plan
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E6FAF5] text-[#059669] text-xs font-bold">
                  Verified
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2.5 text-slate-500">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Account ID:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 font-semibold truncate max-w-[150px]">
                    {profile?.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Member Since:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{formattedJoinDate}</span>
                </div>
              </div>
            </div>

            {/* Subscription & Billing Quick Card */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Subscription Status</h4>
                <Link
                  href="/portal/billing"
                  className="text-xs font-bold text-[#6C5CE7] hover:underline"
                >
                  Manage →
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Current Tier:</span>
                  <span className="font-bold text-slate-900 dark:text-white uppercase">
                    {profile?.plan || "Starter Plan"}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Valid Until:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {formattedPlanExpiry}
                  </span>
                </div>
              </div>

              <Link
                href="/portal/billing"
                className="block w-full py-2.5 rounded-xl bg-[#6C5CE7]/10 hover:bg-[#6C5CE7]/20 text-[#6C5CE7] text-xs font-bold text-center transition-colors"
              >
                Upgrade or Renew Plan
              </Link>
            </div>
          </div>

          {/* Right Column: Edit Profile & Security Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Personal Information Card */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Personal Information
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Update your contact details and account information.
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your First Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Your Last Name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Registered Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled
                        value={profile?.phone || user?.phone || ""}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-500 text-sm font-medium outline-none cursor-not-allowed"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@business.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold outline-none focus:border-[#6C5CE7]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white text-xs font-bold shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {saving ? "Saving Changes..." : "Save Profile Details"}
                  </button>
                </div>
              </form>
            </div>

            {/* API & Access Key Card */}
            {profile?.accessKey && (
              <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Integration Access Key
                    </h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Use this unique key to connect external webhooks or automation tools.
                    </p>
                  </div>
                  <span className="w-8 h-8 rounded-xl bg-[#F0EEFF] text-[#6C5CE7] flex items-center justify-center">
                    🔑
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                  <code className="flex-1 font-mono text-xs text-slate-800 dark:text-slate-200 truncate select-all">
                    {profile.accessKey}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(profile.accessKey!, "Access Key")}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
                  >
                    Copy Key
                  </button>
                </div>
              </div>
            )}

            {/* Business Quick Link Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#6C5CE7]/10 via-[#F8F9FD] to-white dark:from-[#6C5CE7]/20 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#6C5CE7]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Ready to update your public business page?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Add photos, customer testimonials, products, and WhatsApp contact channels.
                </p>
              </div>
              <Link
                href="/portal/business-page"
                className="px-5 py-2.5 rounded-xl bg-[#6C5CE7] hover:bg-[#5850EC] text-white text-xs font-bold shadow-xs whitespace-nowrap transition-all"
              >
                Edit Business Page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
