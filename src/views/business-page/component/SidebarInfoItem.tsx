import React from "react";
import Link from "next/link";
import { ContactIconType } from "@/enums";
import type { ContactItem } from "@/types/businessPage";

interface SidebarInfoItemProps extends ContactItem {
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function SidebarInfoItem({ label, value, href, icon, onClick }: SidebarInfoItemProps) {
  return (
    <div className="info-item">
      <div className="info-icon-wrapper">{icon}</div>
      <div className="info-content">
        <span className="info-label">{label}</span>
        {href ? (
          <Link href={href} className="info-value" onClick={onClick}>{value}</Link>
        ) : (
          <span className="info-value">{value}</span>
        )}
      </div>
    </div>
  );
}

// Re-export enum for co-location convenience
export { ContactIconType };
