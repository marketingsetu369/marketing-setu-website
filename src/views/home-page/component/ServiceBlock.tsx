import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WhatsappIcon,
  BrowserIcon,
  CallMissedIcon,
  Message01Icon,
  GoogleIcon,
  InstagramIcon,
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
  // Renders a custom premium vector Hugeicon mockup based on the service ID
  const renderVectorMockup = (id: string) => {
    let iconToRender = null;
    let colorClass = "text-brand-purple";

    switch (id) {
      case "whatsapp-marketing":
        iconToRender = WhatsappIcon;
        colorClass = "text-brand-purple";
        break;
      case "landing-pages":
        iconToRender = BrowserIcon;
        colorClass = "text-blue-500";
        break;
      case "missed-call":
        iconToRender = CallMissedIcon;
        colorClass = "text-red-500";
        break;
      case "auto-whatsapp":
        iconToRender = Message01Icon;
        colorClass = "text-green-500";
        break;
      case "google-business":
        iconToRender = GoogleIcon;
        colorClass = "text-orange-500";
        break;
      case "social-media":
        iconToRender = InstagramIcon;
        colorClass = "text-pink-500";
        break;
    }

    if (iconToRender) {
      return (
        <span className={colorClass}>
          <HugeiconsIcon icon={iconToRender} size={80} strokeWidth={1.5} />
        </span>
      );
    }

    return (
      <span className="text-6xl">{service.icon}</span>
    );
  };

  const renderHeaderIcon = (id: string) => {
    let iconToRender = null;
    let colorClass = "text-brand-purple";

    switch (id) {
      case "whatsapp-marketing":
        iconToRender = WhatsappIcon;
        colorClass = "text-brand-purple";
        break;
      case "landing-pages":
        iconToRender = BrowserIcon;
        colorClass = "text-blue-500";
        break;
      case "missed-call":
        iconToRender = CallMissedIcon;
        colorClass = "text-red-500";
        break;
      case "auto-whatsapp":
        iconToRender = Message01Icon;
        colorClass = "text-green-500";
        break;
      case "google-business":
        iconToRender = GoogleIcon;
        colorClass = "text-orange-500";
        break;
      case "social-media":
        iconToRender = InstagramIcon;
        colorClass = "text-pink-500";
        break;
    }

    if (iconToRender) {
      return (
        <span className={colorClass}>
          <HugeiconsIcon icon={iconToRender} size={48} strokeWidth={1.5} />
        </span>
      );
    }

    return (
      <span className="text-4xl">{service.icon}</span>
    );
  };

  const getMockupBgClass = (id: string) => {
    switch (id) {
      case "whatsapp-marketing":
        return "bg-green-50/80 dark:bg-green-950/15";
      case "landing-pages":
        return "bg-blue-50/80 dark:bg-blue-950/15";
      case "missed-call":
        return "bg-red-50/80 dark:bg-red-950/15";
      case "auto-whatsapp":
        return "bg-emerald-50/80 dark:bg-emerald-950/15";
      case "google-business":
        return "bg-orange-50/80 dark:bg-orange-950/15";
      case "social-media":
        return "bg-pink-50/80 dark:bg-pink-950/15";
      default:
        return "bg-brand-grayLight dark:bg-brand-dark/40";
    }
  };

  return (
    <section id={service.id} className="py-24 bg-white dark:bg-brand-dark/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className={`space-y-6 ${service.reversed ? "md:order-2" : "md:order-1"}`}>
            <div className="mb-4">
              {renderHeaderIcon(service.id)}
            </div>
            {service.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-purpleLight text-brand-purple text-xs font-bold uppercase tracking-wider">
                {service.badge}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark dark:text-white leading-tight">
              {service.title}
            </h2>
            <p className="text-lg text-brand-gray dark:text-gray-300 leading-relaxed">
              {service.lead}
            </p>
            <div className="space-y-3 pt-2">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-sm font-medium text-brand-dark/90 dark:text-gray-200">{feat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Mockup UI (No photographic images) */}
          <div className={`w-full h-[360px] md:h-[450px] rounded-3xl flex items-center justify-center p-8 border border-gray-100 dark:border-gray-800/60 ${getMockupBgClass(service.id)} ${service.reversed ? "md:order-1" : "md:order-2"}`}>
            <div className={`bg-white dark:bg-brand-dark rounded-3xl shadow-lg p-10 w-48 h-48 flex items-center justify-center border border-gray-50 dark:border-gray-800/80 aspect-square transform transition-transform duration-300 hover:scale-105 ${service.reversed ? "rotate-6" : "-rotate-6"}`}>
              {renderVectorMockup(service.id)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
