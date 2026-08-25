"use client";

import { useThemeStore } from "@/store/themeStore";
import { translations } from "@/views/home-page/data";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DownloadView() {
  const { language } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const apkUrl = "https://api.marketingsetu.com/uploads/apps/user-latest.apk";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(apkUrl)}&color=090a0f&bgcolor=ffffff&qzone=1`;

  const copyDownloadLink = () => {
    navigator.clipboard.writeText(apkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-20 md:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto">
      {/* Top Badge & Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Official Mobile Application
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
          Download <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MarketingSetu</span> App
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Automate your customer follow-ups on missed calls, manage business inquiries, create digital business catalogs, and grow your sales on autopilot.
        </p>
      </div>

      {/* Main Download Card & QR Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Direct APK Download & Feature List */}
        <div className="lg:col-span-7 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/logo.svg"
                alt="MarketingSetu Logo"
                className="w-16 h-16 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">MarketingSetu Android App</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Latest Stable Version • Android 8.0 & Above</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>✓ 100% Safe & Verified</span>
                  <span>•</span>
                  <span>✓ In-App Auto Updates</span>
                </div>
              </div>
            </div>

            {/* Quick Benefits Bullet points */}
            <div className="space-y-3.5 my-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs mt-0.5 font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Instant Missed-Call WhatsApp Auto-Reply</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Never lose a potential customer when your phone is busy or unattended.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs mt-0.5 font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Mini Website & Digital Store Catalog</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Showcase your products, pricing, and services directly on your branded link.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs mt-0.5 font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Built-in Cashbook & Lead CRM</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Record customer transactions, generate PDF receipts, and track enquiries.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3">
            <a
              href={apkUrl}
              download
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all text-center flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download APK Directly
            </a>

            <button
              onClick={copyDownloadLink}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-3.5 px-5 rounded-2xl transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Scan to Download QR Code Card */}
        <div className="lg:col-span-5 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-200/60 mb-5">
            <img
              src={qrCodeUrl}
              alt="Scan to download MarketingSetu APK"
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">Scan to Download</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mb-4">
            Point your mobile phone camera or any QR scanner app at this code to install instantly.
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] font-medium">
            <span>📷 Camera Scan Supported</span>
          </div>
        </div>
      </div>

      {/* How to Install 3 Easy Steps */}
      <div className="mt-16 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-gray-900/40 dark:to-gray-900/20 border border-gray-200/60 dark:border-gray-800 rounded-3xl p-8 sm:p-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
          How to Install in 3 Easy Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              1
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">Download APK</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Click the Download button or scan the QR code above to get the latest APK package.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
              2
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">Allow Install</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              When prompted by Android, tap "Settings" and enable "Allow from this source".
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
              3
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">Open & Enjoy</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Launch MarketingSetu, log in with your phone number, and automate your business growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
