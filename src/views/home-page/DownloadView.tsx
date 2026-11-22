"use client";

export default function DownloadView() {
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.marketingsetu";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(playStoreUrl)}&color=090a0f&bgcolor=ffffff&qzone=1`;

  return (
    <div className="py-20 md:py-28 px-4 sm:px-6 max-w-[1200px] mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available on Google Play
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
          Get <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MarketingSetu</span> on Google Play
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          Automate customer follow-ups, manage business inquiries, create digital catalogs, and grow your sales from the official Android app.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
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
                <p className="text-xs text-gray-500 dark:text-gray-400">Install and receive app updates through Google Play.</p>
              </div>
            </div>

            <div className="space-y-3.5 my-8">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs mt-0.5 font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Missed-Call WhatsApp Auto-Reply</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Respond to potential customers when you cannot answer a call.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs mt-0.5 font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Digital Store Catalog</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Showcase your products, pricing, and services on your business page.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs mt-0.5 font-bold">✓</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Cashbook & Lead CRM</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Record transactions, create receipts, and track enquiries.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all text-center flex items-center justify-center gap-2.5 text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.5 2.8c-.3.3-.5.8-.5 1.4v15.6c0 .6.2 1.1.5 1.4l8.2-9.2L3.5 2.8Zm1.1-.8 9.5 8.2 2.8-3.1L6 1.4c-.5-.3-1-.2-1.4.1ZM4.6 22c.4.2.9.2 1.4-.1l10.9-5.7-2.8-3.1L4.6 22Zm15.1-12.8-3.4-1.8-3.1 3.5 3.1 3.5 3.4-1.8c1.7-.9 1.7-2.5 0-3.4Z" />
              </svg>
              View on Google Play
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/40 dark:shadow-none flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-200/60 mb-5">
            <img
              src={qrCodeUrl}
              alt="Scan to open MarketingSetu on Google Play"
              className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5">Scan to Open Google Play</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
            Scan this code with your phone to open the official app listing.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-gradient-to-b from-gray-50/80 to-white/80 dark:from-gray-900/40 dark:to-gray-900/20 border border-gray-200/60 dark:border-gray-800 rounded-3xl p-8 sm:p-12">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Install in 3 Easy Steps
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">1</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">Open the Listing</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Visit MarketingSetu in Google Play from the button or QR code.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">2</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">Install the App</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Tap Install on the official Google Play listing.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">3</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5">Get Updates</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Google Play will deliver compatible app updates to your device.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
