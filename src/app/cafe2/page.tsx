"use client";

import React from "react";
import BusinessView from "@/views/business-page";
import { cafeMock } from "@/views/business-page/mock/cafe.mock";
import type { BusinessPageData } from "@/types/businessPage";

export default function Cafe2PreviewPage() {
  // Override slug so the router picks Cafe2View
  const mockData: BusinessPageData = {
    ...cafeMock,
    slug: "preview-cafe2",
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <BusinessView data={mockData} businessName={mockData.business_name} />
    </div>
  );
}
