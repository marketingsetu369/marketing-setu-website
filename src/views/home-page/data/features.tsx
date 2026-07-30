import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  Award01Icon,
  AddMoneyCircleIcon,
  AddTeamIcon,
  Target01Icon,
  Agreement01Icon,
  AnalyticsUpIcon,
} from "@hugeicons/core-free-icons";
export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const whyUsFeatures: FeatureItem[] = [
  {
    icon: <HugeiconsIcon icon={Clock01Icon} size={30} />,
    title: "Fast Delivery",
    description: "Quick turnaround on campaigns and design, so your business never misses a beat.",
  },
  {
    icon: <HugeiconsIcon icon={Award01Icon} size={30} />,
    title: "Proven Results",
    description: "Our clients see real growth in leads, engagement, and conversions within weeks.",
  },
  {
    icon: <HugeiconsIcon icon={AddMoneyCircleIcon} size={30} />,
    title: "Affordable Pricing",
    description: "Premium digital marketing that fits small and growing business budgets.",
  },
  {
    icon: <HugeiconsIcon icon={AddTeamIcon} size={30} />,
    title: "Dedicated Support",
    description: "A personal account manager who understands your business and your goals.",
  },
];

export const aboutValues: FeatureItem[] = [
  {
    icon: <HugeiconsIcon icon={Target01Icon} size={30} />,
    title: "Practical over flashy",
    description: "We recommend what will actually generate leads for your specific business, not the trendiest tool of the month.",
  },
  {
    icon: <HugeiconsIcon icon={Agreement01Icon} size={30} />,
    title: "Plain-language support",
    description: "Every client gets a real person to talk to on WhatsApp, in the language they're comfortable with.",
  },
  {
    icon: <HugeiconsIcon icon={AnalyticsUpIcon} size={30} />,
    title: "Growth you can measure",
    description: "Clear monthly reporting on leads, messages sent, and enquiries received — no vanity metrics.",
  },
];
