"use client";

import type { BusinessPageData } from "@/types/businessPage";
import CafeView from "./templates/cafe";
import DoctorView from "./templates/doctor";
import LawerView from "./templates/lawer";
import BusinessView from "./templates/starterTemplate";

interface BusinessViewProps {
  data: BusinessPageData | null;
  businessName: string;
}

export default function MainBusinessView({ data, businessName }: BusinessViewProps) {
  const templateKey = data?.template_key || "starter";

  if (templateKey === "doctor") {
    return <DoctorView data={data} businessName={businessName} />;
  }

  if (templateKey === "lawer") {
    return <LawerView data={data} businessName={businessName} />;
  }

  if (templateKey === "cafe") {
    return <CafeView data={data} businessName={businessName} />;
  }

  return <BusinessView data={data} businessName={businessName} />;
}
