"use client";

import React from "react";

export interface PortalTabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  unreadCount?: number;
  icon?: React.ReactNode;
}

export interface PortalTabsProps<T extends string = string> {
  tabs: PortalTabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
}

export default function PortalTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: PortalTabsProps<T>) {
  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-2xl bg-paper border border-outline shadow-z1 max-w-full overflow-x-auto select-none ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              isActive
                ? "bg-brand-lighter dark:bg-brand-darker/60 text-brand-main shadow-z1"
                : "text-secondary hover:text-primary hover:bg-neutral"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive
                    ? "bg-paper text-brand-main shadow-2xs"
                    : "bg-neutral text-disabled"
                }`}
              >
                {tab.count}
              </span>
            )}
            {tab.unreadCount !== undefined && tab.unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-error-main" />
            )}
          </button>
        );
      })}
    </div>
  );
}
