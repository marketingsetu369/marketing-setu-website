import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SmartphoneNfcIcon,
  ShoppingBag01Icon,
  Image01Icon,
  StarsIcon,
  WhatsappIcon,
  CheckmarkCircle02Icon,
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
  // Map icons from @hugeicons/core-free-icons
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "digital-business-card":
        return SmartphoneNfcIcon;
      case "products-services":
        return ShoppingBag01Icon;
      case "photo-gallery":
        return Image01Icon;
      case "testimonials-reviews":
        return StarsIcon;
      case "whatsapp-marketing":
        return WhatsappIcon;
      default:
        return SmartphoneNfcIcon;
    }
  };

  const getServiceColor = (id: string) => {
    switch (id) {
      case "digital-business-card":
        return "text-[#4F46E5] bg-[#EDEAFC] dark:bg-[#4F46E5]/15";
      case "products-services":
        return "text-brand-main bg-brand-lighter dark:bg-brand-main/15";
      case "photo-gallery":
        return "text-blue-500 bg-blue-50 dark:bg-blue-950/15";
      case "testimonials-reviews":
        return "text-warning-dark bg-warning-lighter dark:bg-warning-dark/15";
      case "whatsapp-marketing":
        return "text-[#10C85A] bg-[#D8FBDE] dark:bg-[#10C85A]/15";
      default:
        return "text-brand-main bg-brand-lighter";
    }
  };

  const IconComponent = getServiceIcon(service.id);
  const colorClasses = getServiceColor(service.id);

  return (
    <section id={service.id} className="py-16 md:py-24 bg-background border-b border-outline last:border-b-0">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className={`space-y-6 ${service.reversed ? "md:order-2" : "md:order-1"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-z4 ${colorClasses}`}>
                <HugeiconsIcon icon={IconComponent} size={24} strokeWidth={1.8} />
              </div>
              {service.badge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-paper border border-outline text-[10px] font-bold uppercase tracking-wider text-secondary">
                  {service.badge}
                </span>
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight leading-tight">
              {service.title}
            </h2>
            
            <p className="text-base sm:text-lg text-secondary leading-relaxed font-normal">
              {service.lead}
            </p>

            <div className="space-y-3 pt-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#10C85A] mt-0.5 shrink-0">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} />
                  </span>
                  <p className="text-sm font-medium text-primary/95">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Vector Card Mockup (Replacing photography images) */}
          <div className="w-full flex items-center justify-center py-6 md:py-10">
            <div className={`bg-paper text-primary border border-outline rounded-[24px] shadow-z12 p-10 w-52 h-52 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 ${colorClasses} ${service.reversed ? "rotate-6" : "-rotate-6"}`}>
              <HugeiconsIcon icon={IconComponent} size={96} strokeWidth={1.2} />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

