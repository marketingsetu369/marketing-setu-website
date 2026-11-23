"use client";

import React from "react";
import { TranslationDictionary } from "@/translation";
import { useWhatsApp } from "./useWhatsApp";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SmartphoneNfcIcon,
  CallOutgoing01Icon,
  PaintBoardIcon,
  AnalyticsUpIcon,
  GoogleIcon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import { FeatureCard } from "@/components/ui";

interface InteractiveShowcaseProps {
  t: TranslationDictionary;
}

export default function InteractiveShowcase({ t }: InteractiveShowcaseProps) {
  const { openWhatsApp } = useWhatsApp();

  const features = [
    {
      id: "digital-card",
      badge: "IDENTITY",
      title: "Smart Digital Business Card",
      description: "Interactive mini-website with tap-to-call, WhatsApp, location map, and lead capture. Share via QR or link.",
      icon: <HugeiconsIcon icon={SmartphoneNfcIcon} size={21} />,
      action: "Claim Your Card",
    },
    {
      id: "call-automation",
      badge: "AUTO ENGAGE",
      title: "WhatsApp Missed-Call Engine",
      description: "Never lose a customer inquiry. Automatically sends your business profile and catalog via WhatsApp whenever a call is missed.",
      icon: <HugeiconsIcon icon={CallOutgoing01Icon} size={21} />,
      action: "Setup Automation",
    },
    {
      id: "poster-maker",
      badge: "MARKETING",
      title: "Daily Festival Poster Maker",
      description: "Ready-to-share festival greetings and promotional posters with your business logo, phone number, and address.",
      icon: <HugeiconsIcon icon={PaintBoardIcon} size={21} />,
      action: "Explore Posters",
    },
    {
      id: "enquiries-crm",
      badge: "CRM & LEADS",
      title: "Lead & Enquiry Manager",
      description: "Track all incoming customer inquiries, call logs, and WhatsApp interactions in one organized mobile dashboard.",
      icon: <HugeiconsIcon icon={AnalyticsUpIcon} size={21} />,
      action: "View Dashboard",
    },
    {
      id: "google-ranking",
      badge: "LOCAL SEO",
      title: "Google Map & Review Standee",
      description: "Boost local search visibility and collect 5-star Google reviews using customized contactless NFC/QR standees.",
      icon: <HugeiconsIcon icon={GoogleIcon} size={21} />,
      action: "Get Review Standee",
    },
    {
      id: "business-ledger",
      badge: "BUSINESS TOOLS",
      title: "Daily Ledger & Appointments",
      description: "Track daily customer appointments, reminders, and manage daily cash transactions right from your smartphone.",
      icon: <HugeiconsIcon icon={Coins01Icon} size={21} />,
      action: "Start Free Trial",
    },
  ];

  return (
    <div className="py-2">
      {/* 3-COLUMN SOBER COMPACT GRID USING REUSABLE FEATURECARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {features.map((item) => (
          <FeatureCard
            key={item.id}
            icon={item.icon}
            badge={item.badge}
            title={item.title}
            description={item.description}
            variant="dashed"
          />
        ))}
      </div>
    </div>
  );
}
