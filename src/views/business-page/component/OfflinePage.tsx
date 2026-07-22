import React from "react";
import Link from "next/link";

interface OfflinePageProps {
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: React.ReactNode;
}

export default function OfflinePage({
  title = "Business Page Offline",
  message = "This business page has not been configured yet. Please set up your business details in the application.",
  ctaLabel = "Go to Homepage",
  ctaHref = "/",
  icon,
}: OfflinePageProps) {
  return (
    <div className="offline-page-wrapper">
      <div className="offline-page-card">
        {icon && <div className="offline-page-icon">{icon}</div>}
        <h2 className="offline-page-title">{title}</h2>
        <p className="offline-page-message">{message}</p>
        <Link href={ctaHref} className="offline-page-cta">
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
