import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SmartphoneNfcIcon,
  ShoppingBag01Icon,
  Image01Icon,
  StarsIcon,
  WhatsappIcon,
  CheckmarkCircle02Icon,
  MoneyBag01Icon,
  PaintBoardIcon,
  AnalyticsUpIcon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";

export interface ServiceBlockItem {
  id: string;
  icon: string;
  title: string;
  lead: string;
  badge?: string;
  features: string[];
  imageUrl: string;
  imageAlt: string;
  reversed?: boolean;
}

interface ServiceBlockProps {
  service: ServiceBlockItem;
}

export default function ServiceBlock({ service }: ServiceBlockProps) {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "digital-business-card": return SmartphoneNfcIcon;
      case "whatsapp-marketing":    return WhatsappIcon;
      case "poster-maker":          return PaintBoardIcon;
      case "enquiries-manager":     return AnalyticsUpIcon;
      case "advance-bookings":      return Calendar01Icon;
      case "income-expense-log":    return MoneyBag01Icon;
      case "products-services":     return ShoppingBag01Icon;
      default:                      return SmartphoneNfcIcon;
    }
  };

  const getServiceColor = (id: string) => {
    switch (id) {
      case "digital-business-card": return "text-[#4F46E5] bg-[#EDEAFC] dark:bg-[#4F46E5]/15";
      case "whatsapp-marketing":    return "text-[#10C85A] bg-[#D8FBDE] dark:bg-[#10C85A]/15";
      case "poster-maker":          return "text-brand-main bg-brand-lighter dark:bg-brand-main/15";
      case "enquiries-manager":     return "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20";
      case "advance-bookings":      return "text-blue-600 bg-blue-50 dark:bg-blue-950/20";
      case "income-expense-log":    return "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20";
      case "products-services":     return "text-purple-600 bg-purple-50 dark:bg-purple-950/20";
      default:                      return "text-brand-main bg-brand-lighter";
    }
  };

  const IconComponent = getServiceIcon(service.id);
  const colorClasses = getServiceColor(service.id);

  // Text is left (order-1) for normal, right (order-2) for reversed
  // Icon panel is right (order-2) for normal, left (order-1) for reversed
  const textOrder  = service.reversed ? "md:order-2" : "md:order-1";
  const iconOrder  = service.reversed ? "md:order-1" : "md:order-2";
  const iconRotate = service.reversed ? "rotate-6"  : "-rotate-6";

  return (
    <section id={service.id} className="py-16 md:py-20 bg-background border-t border-outline/40">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Text Content: Sober, modern, refined typography with compact subtitle */}
          <div className={`space-y-5 ${textOrder}`}>
            
            {/* Top Eyebrow / Category Tag */}
            {service.badge && (
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-light text-brand-main dark:text-brand-secondary border border-brand-secondary/20 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  {service.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-primary tracking-tight leading-snug">
              {service.title}
            </h2>

            {/* Subtitle - slightly larger, comfortable text size */}
            <p className="text-sm sm:text-base text-secondary leading-relaxed font-normal max-w-xl">
              {service.lead}
            </p>

            {/* Feature Highlights - clean, minimal inline list with subtle check icon */}
            <div className="pt-2">
              <ul className="space-y-3">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-light text-brand-main dark:text-brand-secondary flex items-center justify-center shrink-0 mt-0.5 border border-brand-secondary/30">
                      <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm sm:text-[15px] font-medium text-primary leading-snug">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Icon Mockup Panel */}
          <div className={`w-full flex items-center justify-center py-6 md:py-8 ${iconOrder}`}>
            <div className={`rounded-[36px] shadow-card border border-white/60 dark:border-white/10 p-12 w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${colorClasses} ${iconRotate}`}>
              <HugeiconsIcon icon={IconComponent} size={88} strokeWidth={1.2} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
