"use client";

import React from "react";

export interface AppTabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  unreadCount?: number;
}

export interface AppTabsProps<T extends string = string> {
  tabs: AppTabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
}

export function AppTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = "",
}: AppTabsProps<T>) {
  return (
    <div
      className={`inline-flex p-1 rounded-2xl bg-paper border border-outline shadow-z1 self-start select-none ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              isActive
                ? "bg-brand-lighter dark:bg-brand-darker/60 text-brand-main shadow-z1"
                : "text-secondary hover:text-primary hover:bg-neutral"
            }`}
          >
            <span>{tab.label}</span>

            {typeof tab.count === "number" && (
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

            {Boolean(tab.unreadCount && tab.unreadCount > 0) && (
              <span className="w-2 h-2 rounded-full bg-error-main" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default AppTabs;
